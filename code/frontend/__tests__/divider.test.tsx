import React from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import Divider from '../src/components/divider';

describe('Divider Component', () => {
  const defaultProps = {
    height: 1,
    direction: 'horizontal',
    color: 'black',
    thickness: 1,
    marginVertical: 0,
    marginHorizontal: 0,
  };

  it('renders without crashing', () => {
    render(<Divider {...defaultProps} />);
  });

  it('applies horizontal styling by default', () => {
    const { getByTestId } = render(<Divider {...defaultProps} />);
    const divider = getByTestId('divider');
    expect(divider).toHaveStyle('width: 100%; borderColor: black; borderWidth: 1; marginVertical: 0; marginHorizontal: 0;');
  });

  it('applies vertical styling when direction is vertical', () => {
    const propsForVertical = { ...defaultProps, direction: 'vertical' };
    const { getByTestId } = render(<Divider {...propsForVertical} />);
    const divider = getByTestId('divider');
    expect(divider).toHaveStyle('borderColor: black; borderWidth: 1; width: 1; marginVertical: 0; marginHorizontal: 0;');
  });

  it('applies custom height', () => {
    const customHeight = 20;
    const propsWithCustomHeight = { ...defaultProps, height: customHeight };
    const { getByTestId } = render(<Divider {...propsWithCustomHeight} />);
    const divider = getByTestId('divider');
    expect(divider).toHaveStyle(`height: ${customHeight}px;`);
  });

  it('applies custom color', () => {
    const customColor = 'red';
    const propsWithCustomColor = { ...defaultProps, color: customColor };
    const { getByTestId } = render(<Divider {...propsWithCustomColor} />);
    const divider = getByTestId('divider');
    expect(divider).toHaveStyle(`borderColor: ${customColor};`);
  });

  it('applies custom thickness', () => {
    const customThickness = 2;
    const propsWithCustomThickness = { ...defaultProps, thickness: customThickness };
    const { getByTestId } = render(<Divider {...propsWithCustomThickness} />);
    const divider = getByTestId('divider');
    expect(divider).toHaveStyle(`borderWidth: ${customThickness};`);
  });

  it('applies custom marginVertical', () => {
    const customMarginVertical = 10;
    const propsWithCustomMarginVertical = { ...defaultProps, marginVertical: customMarginVertical };
    const { getByTestId } = render(<Divider {...propsWithCustomMarginVertical} />);
    const divider = getByTestId('divider');
    expect(divider).toHaveStyle(`marginVertical: ${customMarginVertical}px;`);
  });

  it('applies custom marginHorizontal', () => {
    const customMarginHorizontal = 20;
    const propsWithCustomMarginHorizontal = { ...defaultProps, marginHorizontal: customMarginHorizontal };
    const { getByTestId } = render(<Divider {...propsWithCustomMarginHorizontal} />);
    const divider = getByTestId('divider');
    expect(divider).toHaveStyle(`marginHorizontal: ${customMarginHorizontal}px;`);
  });

  // Add more tests to cover all possible props and interactions
  it('applies default styles when no props are provided', () => {
    const { getByTestId } = render(<Divider />);
    const divider = getByTestId('divider');
    expect(divider).toHaveStyle('height: 100%; borderColor: black; borderWidth: 1;');
  });
});