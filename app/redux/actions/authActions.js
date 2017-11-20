import axios from 'axios';
import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import {
  firebaseOn,
  firebaseOnce,
  firebaseSet,
  fetchVenues,
  setVenues,
  updateGroup,
  updateUserData
} from '../actions';

import store from '../../redux/store';

const { dispatch } = store;

export function signin() {
  signinInProgress();

  LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
  .then(fbSigninSuccess)
  .catch(err => console.log('Error on logInWithReadPermissions', err));
}

function fbSigninSuccess(fbSigninResult) {
  if (!fbSigninResult.isCancelled) {
    AccessToken.getCurrentAccessToken()
    .then(({ accessToken }) => {
      const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);

      firebase.auth().signInWithCredential(credential)
      .then(result => fireSigninSuccess(result, accessToken))
      .catch(err => console.log('Error on Firebase Auth', err));
    })
    .catch(err => console.log('Error on getCurrentAccessToken', err));
  }
}

function fireSigninSuccess(result, accessToken) {
  const { uid, displayName, email, photoURL, providerData } = result;

  firebaseSet(`users/${uid}/name`, displayName)
  .then(() => firebaseSet(`users/${uid}/facebookUID`, providerData[0].uid))
  .then(() => firebaseSet(`users/${uid}/img`, photoURL))
  .then(() => firebaseSet(`users/${uid}/email`, email))
  .then(() => firebaseSet(`users/${uid}/lastTimeLoggedIn`, firebase.database.ServerValue.TIMESTAMP))
  .then(() => firebaseOnce('/users', fireUsers => fireUsers)) // get users
  .then(fireUsers => getFriends({ uid, accessToken, fireUsers }))
  .catch(error => console.log('error setting props', error));
}

function getFriends({ uid, accessToken, fireUsers }) {
  const endpoint = `https://graph.facebook.com/me/friends?access_token=${accessToken}`;

  return axios.get(endpoint).then((facebookData) => {
    const facebookFriends = facebookData.data.data;
    const facebookUIDandFirebaseKey = {};
    const friendsWithAccounts = {};

    // FacebookUID: FirebaseKey
    Object.keys(fireUsers).forEach(key => (
      facebookUIDandFirebaseKey[fireUsers[key].facebookUID] = key
    ));

    for (let i = 0; i < facebookFriends.length; i += 1) {
      if (facebookUIDandFirebaseKey[facebookFriends[i].id]) {
        friendsWithAccounts[facebookUIDandFirebaseKey[facebookFriends[i].id]] = true;
      }
    }

    // saves user friends in the database
    return firebaseSet(`users/${uid}/friends`, friendsWithAccounts);
  }).catch((error) => {
    console.log('Error getting friends from facebook', error);
  });
}

export function handleAuthStateChange({ uid }) {
  // geolocate();
  signinSuccess({ uid });
  getUserData(uid);

  // Need FB token
  // firebaseOnce('/users', fireUsers => getFriends(fireUsers));
}

function signinInProgress() {
  return dispatch({ type: 'AUTHENTICATING' });
}

function signinSuccess({ uid }) {
  return dispatch({
    type: 'SIGNIN_SUCCESS',
    payload: { uid }
  });
}

function getUserData(uid) {
  return firebaseOnce(`users/${uid}`, data => {
    const hasGroup = !!data.groupId;

    updateUserData(data);

    if (hasGroup) {
      // Add listener to group for changes
      firebaseOn(`/groups/${data.groupId}`, updateGroup);
    }

    return fetchVenues(venues => {
      setVenues(venues);

      if (!hasGroup) {
        dispatch({ type: 'USER_DATA_RETRIEVED' });
      }
    });
  });
}
