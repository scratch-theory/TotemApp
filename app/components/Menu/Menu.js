import React from 'react';
import {
  Animated,
  Text,
  TouchableHighlight,
} from 'react-native';

import { toggleMenu } from '../../redux/actions';
import MenuItem from './MenuItem';
import menuStyles from './menuStyles';

const Menu = ({ menuItems, history }) => (
  <TouchableHighlight
    style={menuStyles.main}
    underlayColor="transparent"
    onPress={toggleMenu}>
    <Animated.View style={menuStyles.menu}>
      {menuItems.map(item => (
        <MenuItem key={item.path} history={history} {...item} />
      ))}
      <Text style={{ color: 'white', textAlign: 'center' }}>
        v0.0.0
      </Text>
    </Animated.View>
  </TouchableHighlight>
);

export default Menu;
