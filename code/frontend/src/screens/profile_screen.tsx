import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';

import GoBack from '../utils/go_back';

const images = {
  student: require('../assets/images/student.png'),
  freelancer: require('../assets/images/freelancer.png'),
  officeworker: require('../assets/images/office_worker.png'),
  others: require('../assets/images/others.png'),
  homemaker: require('../assets/images/homemaker.png'),
  entrepreneur: require('../assets/images/entrepreneur.png'),
};

const CustomDropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.find(option => option.selected));
  const endDate = new Date();
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const handleSelect = (option) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  };


  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setIsOpen(!isOpen)}>
        <Text>{selectedOption.label}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {options.map(option => (
            <TouchableOpacity
              style={styles.dropdownOption}
              key={option.value}
              onPress={() => handleSelect(option)}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const imageLabels = Object.keys(images);

const ProfileScreen = () => {
  const [selectedImage, setSelectedImage] = useState<any>(images.student);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePick = (label: string) => {
    setSelectedImage(images[label]);
    setModalVisible(false);
  };

  const sleepOptions = [
      { label: "Less than 6 hours", value: "1", selected: false },
      { label: "6-8 hours", value: "2", selected: false },
      { label: "8-10 hours", value: "3", selected: true },
      { label: "More than 10 hours", value: "4", selected: false },
  ];

  const handleSleepSelect = (option) => {
    // Handle the selected location option
    console.log('Selected Sleep schedule: ', option.label);
  };

  const challengeOptions = [
      { label: "Inability to concentrate", value: "1", selected: false },
      { label: "Too many tasks", value: "2", selected: false },
      { label: "Lack of prioritisation", value: "3", selected: true },
      { label: "Confusing schedule", value: "4", selected: false },
      { label: "Others", value: "5", selected: false },
  ];

  const handleChallengeSelect = (option) => {
    // Handle the selected location option
    console.log('Selected Challenges: ', option.label);
  };

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <GoBack title="Settings" />
      <View style={styles.container}>
        <Text style={styles.titleText}>My Portrait</Text>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            <Image source={selectedImage} style={styles.portraitImage} />
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editButton}>
              <Text style={styles.editButtonText}>✏️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.dropdownContainer}>
        <CustomDropdown label="Sleep Schedule" options={sleepOptions} onSelect={handleSleepSelect} />
      </View>

      <View style={styles.dropdownContainer}>
        <CustomDropdown label="Main challenge" options={challengeOptions} onSelect={handleChallengeSelect} />
      </View>

      <TouchableOpacity style={styles.saveButton} accessibilityRole="button">
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={imageLabels}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleImagePick(item)} style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    display: 'flex',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    width: '100%',
    textAlign: 'left', // 使标题左对齐
  },
  saveButton: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    width: '90%',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#80B3FF',
    paddingVertical: 11,
    paddingHorizontal: 15,
  },
  saveButtonText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  portraitImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    right: -10,
    bottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
  },
  editButtonText: {
    fontSize: 22,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 18,
    color: '#000',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#80B3FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
inputContainer: {
      marginBottom: 20,
      marginLeft: 20,
    },
    inputLabel: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: 16,
      color: '#A8A6A7',
      fontWeight: '700',
      marginBottom: 8,
      marginLeft: 10,
    },
    input: {
      width: '90%',
      marginHorizontal: 10,
      borderRadius: 10,
      borderColor: '#D6D6D6',
      borderWidth: 1,
      padding: 10,
      marginTop: 5
    },
  dropdown: {
    zIndex: 1, // 设置下拉菜单层级高于输入框
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ProfileScreen;