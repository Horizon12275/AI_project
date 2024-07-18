import React from 'react';
import { render, fireEvent, toHaveStyle } from '@testing-library/react-native';
import CalendarHeader from '../src/components/calendar_header';
import { months, weekDays, convertToOrdinal } from '../src/utils/date';
import MyButton from '../src/utils/my_button';
import { TouchableOpacity, Text } from 'react-native';
import '@testing-library/jest-native/extend-expect';

// Mocking MyButton component
jest.mock('../src/utils/my_button', () => {
    const { TouchableOpacity, Text } = require('react-native');
  return ({ onPress, style }) => (
    <TouchableOpacity testID="toggle-button" onPress={onPress} style={style}>
      <Text>Toggle</Text>
    </TouchableOpacity>
  );
});

// Mocking date utility functions
jest.mock('../src/utils/date', () => ({
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  convertToOrdinal: (date) => `${date}${['st', 'nd', 'rd', 'th'][((date % 10) - 1) % 4]}`,
}));

describe('CalendarHeader Component', () => {
  let selectedDate;
  let setSelectedDate;
  let toggleCalendar;

  beforeEach(() => {
    selectedDate = new Date(2023, 6, 15); // July 15, 2023
    setSelectedDate = jest.fn();
    toggleCalendar = jest.fn();
  });

  it('renders the CalendarHeader component correctly', () => {
    const { getByText, getByTestId } = render(
      <CalendarHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate} toggleCalendar={toggleCalendar} />
    );

    // Check if the header text is rendered correctly
    const headerText = `${months[selectedDate.getMonth()]} ${convertToOrdinal(selectedDate.getDate())}, ${selectedDate.getFullYear()}`;
    expect(getByText(headerText)).toBeTruthy();

    // Check if the toggle button is rendered
    expect(getByTestId('toggle-button')).toBeTruthy();
  });

  it('scrolls to the selected date on mount', () => {
    const { getByTestId } = render(
      <CalendarHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate} toggleCalendar={toggleCalendar} />
    );

    // Check if the correct date item is selected
    expect(getByTestId(`date-item-${selectedDate.getDate()}`)).toBeTruthy();
  });


  it('calls toggleCalendar when the toggle button is pressed', () => {
    const { getByTestId } = render(
      <CalendarHeader selectedDate={selectedDate} setSelectedDate={setSelectedDate} toggleCalendar={toggleCalendar} />
    );

    // Simulate pressing the toggle button
    fireEvent.press(getByTestId('toggle-button'));
    expect(toggleCalendar).toHaveBeenCalled();
  });
});
