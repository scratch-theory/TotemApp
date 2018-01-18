import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import sharedConfirmStyles from '../sharedStyles/confirmPopoverStyles';
import sharedPopoverStyles from '../sharedStyles/popoverStyles';

const TermsPopover = ({ close, show }) => (
  <Modal
    transparent
    visible={show}
  >
    <View style={sharedPopoverStyles.container}>
      <View style={sharedConfirmStyles.main}>
        <View style={sharedConfirmStyles.header}>
          <Text style={sharedConfirmStyles.title}>
            Terms of Service
          </Text>
          <TouchableOpacity style={{ height: '100%' }} onPress={close}>
            <Icon name="times" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={sharedConfirmStyles['body-text']}>
          Terms
        </Text>
        <View style={sharedConfirmStyles.footer}>
          <TouchableOpacity
            style={[ sharedConfirmStyles.button, sharedConfirmStyles.ok ]}
            onPress={close}
          >
            <Text style={sharedConfirmStyles['ok-text']}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default TermsPopover;
