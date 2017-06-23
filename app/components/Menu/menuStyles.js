import { Platform, StyleSheet, Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'flex-end',
    position: 'absolute',
    left: 0,
    top: 0,
    width,
    height,
    backgroundColor: 'transparent'
  },
  menu: {
    backgroundColor: 'black',
    width: 150,
    height
  },
  menuItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#2d2e2f'
  },
  'menuItem__text': {
    marginTop: 5,
    color: 'white',
    fontWeight: '500',
    fontFamily: (Platform.OS === 'ios') ? 'Helvetica Neue' : 'Roboto'
  }
});
