import store from '../store';
const { dispatch } = store;

export function toggleMenu() {
  console.log('lTOGGLE_MENU')
  return dispatch({
    type: 'TOGGLE_MENU',
  });
}
