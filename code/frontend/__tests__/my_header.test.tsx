import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MyHeader from '../src/components/my_header'; // 确保路径正确

describe('MyHeader', () => {
  const onCancel = jest.fn();
  const onSave = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(<MyHeader onCancel={onCancel} onSave={onSave} />);
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Save')).toBeTruthy();
  });

  it('calls onCancel when cancel button is pressed', () => {
    const { getByText } = render(<MyHeader onCancel={onCancel} onSave={onSave} />);
    fireEvent.press(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('calls onSave when save button is pressed', () => {
    const { getByText } = render(<MyHeader onCancel={onCancel} onSave={onSave} />);
    fireEvent.press(getByText('Save'));
    expect(onSave).toHaveBeenCalled();
  });
});
