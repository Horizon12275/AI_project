import React from 'react';
import {View, StyleSheet} from 'react-native';

type dividerProps = {
  height?: number;
  direction?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  marginVertical?: number;
  marginHorizontal?: number;
};

const Divider = ({
  height,
  direction,
  color,
  thickness,
  marginVertical,
  marginHorizontal,
}: dividerProps) => {
  const containerStyles = [
    {
      height: height || '100%',
      borderColor: color,
      borderWidth: thickness || 1,
    },
  ];

  if (direction === 'horizontal') {
    containerStyles.push({width: '100%', marginVertical: marginVertical || 0});
  } else {
    containerStyles.push({width: 1, marginHorizontal: marginHorizontal || 0});
  }

  return <View style={containerStyles} />;
};

export default Divider;
