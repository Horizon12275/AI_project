import React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import EventCard from '../src/components/event_card';
import MyButton from '../src/utils/my_button';
import Divider from '../src/components/divider';
import '@testing-library/jest-native/extend-expect';

// Mocking the required assets and icons
jest.mock('../src/assets/icons/down-arrow.png', () => 'down-arrow-icon');
jest.mock('../src/assets/icons/right-arrow.png', () => 'right-arrow-icon');
jest.mock('../src/assets/icons/checked.png', () => 'checked-icon');
jest.mock('../src/assets/icons/checkbox.png', () => 'checkbox-icon');
jest.mock('../src/assets/icons/delete.png', () => 'delete-icon');

// Mocking the setIsEditing function
const setIsEditingMock = jest.fn();

describe('EventCard', () => {
  const props = {
    isEditing: false,
    setIsEditing: setIsEditingMock,
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    title: 'Meeting with Team',
    location: 'Conference Room A',
    color: 'rgba(235, 235, 245, 0.60)',
    additionalInfo: {
      text: 'Prepare presentation',
      count: 3
    }
  };

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<EventCard {...props} />);
    expect(getByText('10:00 AM')).toBeTruthy();
    expect(getByText('11:00 AM')).toBeTruthy();
    expect(getByText('Meeting with Team')).toBeTruthy();
    expect(getByText('Conference Room A')).toBeTruthy();
    expect(getByText('Prepare presentation')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('handles expand button press', () => {
    const { getByTestId } = render(<EventCard {...props} />);
    // Assuming the MyButton component has a testID of 'event-expand-button'
    const expandButton = getByTestId('event-expand-button');
    fireEvent.press(expandButton);
    expect(props.setIsEditing).toHaveBeenCalledWith(1);
  });

  it('toggles editing state correctly', () => {
    const { getByTestId } = render(<EventCard {...props} isEditing={true} />);
    const expandButton = getByTestId('event-expand-button');
    fireEvent.press(expandButton);
    expect(props.setIsEditing).toHaveBeenCalledWith(null);
  });

  it('displays checklist when editing', () => {
    const { getByTestId } = render(<EventCard {...props} isEditing={true} />);
    expect(getByTestId('checklist')).toBeTruthy();
  });

  it('does not display checklist when not editing', () => {
    const { queryByTestId } = render(<EventCard {...props} />);
    expect(queryByTestId('checklist')).toBeNull();
  });

  it('applies correct styles when not editing', () => {
    const { getByTestId } = render(<EventCard {...props} />);
    const eventCard = getByTestId('event-card');
    expect(eventCard).toHaveStyle({ backgroundColor: props.color });
  });

  it('applies correct styles when editing', () => {
    const { getByTestId } = render(<EventCard {...props} isEditing={true} />);
    const eventCard = getByTestId('event-card');
    expect(eventCard).toHaveStyle({ backgroundColor: 'rgba(235, 235, 245, 0.60)' });
  });
});