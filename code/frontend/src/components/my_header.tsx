import {View, Text, TouchableOpacity} from 'react-native';

const MyHeader = ({
  onCancel,
  onSave,
}: {
  onCancel?: () => void;
  onSave?: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#f0f0f0',
        width: '100%',
      }}>
      <TouchableOpacity onPress={onCancel}>
        <Text style={{fontSize: 16, color: '#007bff'}}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave}>
        <Text style={{fontSize: 16, color: '#007bff'}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyHeader;
