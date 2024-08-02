import React, {useState} from 'react';
import {
  Modal,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

const SelectModal = ({
  data,
  selectedValue,
  setSelectedValue,
  style,
}: {
  data: {label: string; value: number}[];
  selectedValue: number | null;
  setSelectedValue: (value: number) => void;
  style?: any;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}: {item: {label: string; value: number}}) => {
    const isSelected = item.value === selectedValue;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => {
          setSelectedValue(item.value);
          setModalVisible(false);
        }}>
        <Text style={styles.itemText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...style,
        }}
        onPress={() => setModalVisible(true)}>
        <Text>
          {selectedValue !== null
            ? data.find(item => item.value === selectedValue)?.label
            : 'Select an option'}
        </Text>
        <Image
          source={require('../assets/icons/double-arrow.png')}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.value.toString()}
                extraData={selectedValue}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 300,
    width: '80%',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default SelectModal;
