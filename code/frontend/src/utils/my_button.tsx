import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
// 自定义封装的按钮组件 使用示例：
// <MyButton
//   icon={require('../assets/icons/plus.png')}
//   onPress={() => console.log('Button Pressed')}
//   style={{styles.myButtonStyle}}
// />
const MyButton = ({
  icon,
  onPress,
  style,
  buttonStyle,
  testID,
}: {
  icon?: any;
  onPress?: () => void;
  style?: any;
  buttonStyle?: any;
  testID?: any;
}) => {
  // Assuming icon is a string representing the image path
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} testID={testID} >
      <Image source={icon} style={style}  testID="image-button"/>
    </TouchableOpacity>
//     <TouchableOpacity onPress={onPress} style={buttonStyle} testID="my-button">
//       <Image source={icon} style={style} testID="image-button" />
//     </TouchableOpacity>
  );
};

export default MyButton;
