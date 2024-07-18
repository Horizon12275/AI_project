import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyButton from '../src/utils/my_button';

describe('MyButton component', () => {
  it('renders correctly with given props', () => {
    const onPressMock = jest.fn();
    const icon = '../src/assets/icons/add.png';

    const { getByTestId } = render(
      <MyButton
        icon={icon}
        onPress={onPressMock}
        style={{ width: 50, height: 50 }} // Sample style
        buttonStyle={{ backgroundColor: 'blue' }} // Sample button style
        testID="my-button"
      />
    );

    const button = getByTestId('my-button');

    expect(button).toBeDefined();
  });

  it('executes onPress function when button is pressed', () => {
    const onPressMock = jest.fn();
    const icon = '../src/assets/icons/plus.png';

    const { getByTestId } = render(
      <MyButton
        icon={icon}
        onPress={onPressMock}
        style={{ width: 50, height: 50 }} // Sample style
        buttonStyle={{ backgroundColor: 'blue' }} // Sample button style
        testID="my-button"
      />
    );

    const button = getByTestId('my-button');

    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});