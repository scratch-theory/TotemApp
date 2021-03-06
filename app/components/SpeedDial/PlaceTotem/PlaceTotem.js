import React, { Component } from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import sharedConfirmStyles from '../../../sharedStyles/confirmPopoverStyles';
import sharedPopoverStyles from '../../../sharedStyles/popoverStyles';
import totemStyles from './placeTotemStyles';

import totemGif from '../../../img/loading.gif';
import { placeTotemOnPress, setMeetupTime } from '../../../redux/actions';

import MeetupPicker from './MeetupPicker';

class PlaceTotem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hour: '',
      minute: '',
      meridiem: '',
      showPicker: false
    };
  }

  render() {
    const { close } = this.props;
    const { hour, minute, meridiem, showPicker } = this.state;

    return (
      <Modal
        transparent
        visible
      >
        <View style={sharedPopoverStyles.container}>
          <View style={sharedConfirmStyles.main}>
            <View style={totemStyles.header}>
              <View style={totemStyles['title-container']}>
                <Text style={sharedConfirmStyles.title}>
                  Place a Totem
                </Text>
              </View>
              <TouchableOpacity style={{ height: '100%' }} onPress={close}>
                <Icon name="times" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            <View style={[ totemStyles.section, { flex: 1 } ]}>
              <View style={totemStyles['totem-container']}>
                <Image source={totemGif} style={{ height: 125, width: 65 }} />
              </View>
              <Text style={[ totemStyles.section, totemStyles['body-text'] ]}>
                To set a meeting place for your group, touch OK and then anywhere on the map to drop a totem.
              </Text>
              <Text style={totemStyles['option-text']}>
                <Text style={totemStyles.emphasis}>(Optional)</Text> Set a meetup time. The totem will expire 30 minutes after the set time.
              </Text>
              <Text style={totemStyles['body-text']}>
                Meetup at:
              </Text>
              <TouchableOpacity
                onPress={this.openPicker}
                style={totemStyles['meetup-time']}>
                <Text style={totemStyles['body-text']}>
                   <Icon name="clock-o" size={20} color="#FFF" />
                   &nbsp;&nbsp;
                   {this.getDisplayTime()}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={sharedConfirmStyles.footer}>
              <TouchableOpacity
                style={[ sharedConfirmStyles.button, sharedConfirmStyles.cancel ]}
                onPress={close}
              >
                <Text style={sharedConfirmStyles['cancel-text']}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[ sharedConfirmStyles.button, sharedConfirmStyles.ok ]}
                onPress={this.handleConfirmPress}
              >
                <Text style={sharedConfirmStyles['ok-text']}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
            {
              showPicker &&
              <MeetupPicker
                closePicker={this.closePicker}
                hour={hour}
                minute={minute}
                meridiem={meridiem}
                handleHourChange={this.handleHourChange}
                handleMinuteChange={this.handleMinuteChange}
                handleMeridiemChange={this.handleMeridiemChange}
              />
            }
          </View>
        </View>
      </Modal>
    );
  }

  getDisplayTime = () => {
    const { hour, meridiem, minute } = this.state;

    return (
      hour
      ?
      `${hour}:${minute || '00'} ${meridiem || 'AM'}`
      :
      <Text style={[{ color: 'lightslategrey' }, totemStyles.emphasis ]}>
        &nbsp;unset
      </Text>
    );
  }

  handleHourChange = hour => this.setState({ hour })
  handleMinuteChange = minute => this.setState({ minute })
  handleMeridiemChange = meridiem => this.setState({ meridiem })

  handleConfirmPress = () => {
    const { minute, meridiem } = this.state;
    let { hour } = this.state;
    const timeIsSet = hour.length > 0;


    if (timeIsSet) {
      if (Number(hour) === 12) {
        if (meridiem === 'AM') hour = 0;
      } else {
        // If meridiem is unset, AM is assumed
        hour = Number(hour) + (meridiem === 'PM' ? 12 : 0);
      }

      const meetupTime = this.convertToDate(hour, Number(minute));

      setMeetupTime(meetupTime);
    } else {
      setMeetupTime(null);
    }

    placeTotemOnPress(true);
    this.props.close();
  }

  closePicker = () => this.setState({ showPicker: false })
  openPicker = () => this.setState({ showPicker: true })

  convertToDate = (hours, minutes) => {
    const now = new Date();
    const setTime = hours + minutes / 60;
    const currentTime = now.getHours() + (now.getMinutes() / 60);

    let expiresAt = new Date();

    if (currentTime > setTime) {
      expiresAt = new Date(expiresAt.getTime() + (24 * 3600 * 1000));
    }

    expiresAt.setHours(hours);
    expiresAt.setMinutes(minutes);
    expiresAt.setSeconds(0);

    return expiresAt.toUTCString();
  }
}

export default PlaceTotem;
