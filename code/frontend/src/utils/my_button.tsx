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
  tintColor,
}: {
  icon?: any;
  onPress?: () => void;
  style?: any;
  buttonStyle?: any;
  tintColor?: string;
}) => {
  // Assuming icon is a string representing the image path
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Image source={icon} style={style} tintColor={tintColor} />
    </TouchableOpacity>
  );
};

export default MyButton;
