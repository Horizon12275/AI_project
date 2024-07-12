import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownInput = ({
  data,
  onSelect,
  style,
  placeholder,
}: {
  data: {label: string; value: string}[];
  onSelect: (value: string) => void;
  style?: any;
  placeholder?: string;
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSelect = item => {
    setSelectedValue(item.value);
    onSelect(item.value); // Call the onSelect callback with the selected value
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
