// Switch.test.tsx
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Switch from '../src/components/switch';

describe('Switch component', () => {
  test('Switch renders with default active tab', () => {
    const {getByTestId, getByText} = render(<Switch tab="Subtasks" setTab={() => {}} />);
    expect(getByTestId('switch-container')).toBeTruthy();
    expect(getByTestId('tab-bar-container')).toBeTruthy();
//     expect(getByTestId('tab-subtasks')).toBeTruthy();
//     expect(getByText('Subtasks')).toBeTruthy();
//     expect(getByTestId('tab-reminders')).toBeTruthy();
//     expect(getByText('Reminders')).toBeTruthy();
  });

  test('Switch changes active tab on tab press', () => {
    const setTabMock = jest.fn();
    const {getByText} = render(<Switch tab="Subtasks" setTab={setTabMock} />);
    const remindersTab = getByText('Reminders');
    fireEvent.press(remindersTab);
    expect(setTabMock).toHaveBeenCalledWith('Reminders');
  });
});
