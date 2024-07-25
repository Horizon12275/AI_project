import React from 'react';
import {Modal, View, ActivityIndicator, StyleSheet} from 'react-native';

const Loading = ({visible}: {visible: boolean}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    statusBarTranslucent={true}>
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator animating={visible} size="large" color="#0000ff" />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loading;
