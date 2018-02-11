import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe482',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#000033',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  scrollView: {
    overflow: 'scroll'
  },
  subtext: {
    fontSize: 12,
    color: '#5f6b6d'
  }
});
