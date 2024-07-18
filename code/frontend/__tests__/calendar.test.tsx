import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Calendar from '../src/components/calendar';
import { months, weekDays } from '../src/utils/date';
import MyButton from '../src/utils/my_button';
import { TouchableOpacity, Text } from 'react-native';

// Mock the imported MyButton component
jest.mock('../src/utils/my_button', () => {
  return ({ onPress }) => (
    <button onClick={onPress} data-testid="button">
      Button
    </button>
  );
});

// Mock the months and weekDays array
jest.mock('../src/utils/date', () => {
  return {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };
});

describe('Calendar Component', () => {
  const selectedDate = new Date(2023, 6, 15);
  const setSelectedDate = jest.fn();

  const renderComponent = () =>
    render(
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    );

  it('renders correctly', () => {
    const { getByText } = renderComponent();

    // Check if month and year are rendered correctly
    expect(getByText('July 2023')).toBeTruthy();

    // Check if week days are rendered correctly
    weekDays.forEach(day => {
      expect(getByText(day)).toBeTruthy();
    });
  });


  it('highlights the current date', () => {
    const { getByText } = renderComponent();

    const todayDate = selectedDate.getDate().toString();

    // Check if today's date is highlighted
    const todayText = getByText(todayDate);
    expect(todayText.props.style).toContainEqual({ color: '#4A90E2', fontWeight: 'bold' });
  });

  it('highlights dates with events', () => {
    const { getByText } = renderComponent();

    // Check if date 22 is highlighted as having an event
    const eventDate = getByText('22');
    expect(eventDate.props.style).toContainEqual({ color: '#121212' });
  });

  it('calls setSelectedDate when a date is pressed', () => {
    const { getByText } = renderComponent();

    const dateToPress = '15';
    fireEvent.press(getByText(dateToPress));

    expect(setSelectedDate).toHaveBeenCalledWith(new Date(2023, 6, 15));
  });
});
