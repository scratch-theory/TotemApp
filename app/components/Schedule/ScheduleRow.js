import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import rowStyles from './rowStyles';
import sharedRowStyles from '../sharedStyles/scheduleRowStyles';

const ScheduleRow = ({
  name,
  geofence,
  startTime,
  endTime,
  selected,
  toggleItem
}) => (
  <View
    style={
      selected ?
      [ sharedRowStyles.main, rowStyles.selected ]
      : sharedRowStyles.main
    }>
    <View>
      <Text style={sharedRowStyles.label}>
        {name.toUpperCase()}
      </Text>
      <Text style={sharedRowStyles.subtext}>
        {geofence}
      </Text>
      <Text style={sharedRowStyles.subtext}>
        {`${moment(startTime).format('h:mm a')} - ${moment(endTime).format('h:mm a')}`}
      </Text>
    </View>
    <TouchableOpacity onPress={toggleItem} style={sharedRowStyles.icon}>
      <Icon
        style={selected ? rowStyles.removeButton : rowStyles.addButton}
        name={selected ? 'times-circle' : 'plus-circle'}
        size={24}
      />
    </TouchableOpacity>
  </View>
);

export default ScheduleRow;
