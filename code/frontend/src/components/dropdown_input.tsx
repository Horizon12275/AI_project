import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownInput = ({
  data,
  selectedValue,
  setSelectedValue,
  style,
  placeholder,
}: {
  data: {label: string; value: number}[];
  selectedValue: number|null;
  setSelectedValue: (value: number) => void;
  style?: any;
  placeholder?: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = item => {
    setSelectedValue(item.value);
    setOpen(false); // Close the dropdown
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        autoScroll={true}
        open={open}
        value={selectedValue}
        items={data}
        setOpen={setOpen}
        setValue={setSelectedValue}
        setItems={() => {}} // Since we pass items through props, we don't need to set them here
        placeholder={placeholder}
        style={style}
        onChangeItem={item => handleSelect(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default DropdownInput;
