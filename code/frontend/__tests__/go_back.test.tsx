import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GoBack from '../src/utils/go_back';
import { useNavigation } from '@react-navigation/native';

// Mock the navigation function
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('GoBack Component', () => {
  const mockNavigation = {
    goBack: jest.fn(),
  };

  beforeEach(() => {
    useNavigation.mockReturnValue(mockNavigation);
    jest.clearAllMocks();
  });

  it('renders correctly with given title', () => {
    const title = 'Test Title';
    const { getByText } = render(<GoBack title={title} />);

    // Check if the title is rendered
    expect(getByText(title)).toBeTruthy();
  });

  it('calls handleGoBack when back button is pressed but does nothing', () => {
    const { getByText } = render(<GoBack title="Test Title" />);
    const backButton = getByText('<');

    // Simulate press on the back button
    fireEvent.press(backButton);

    // Check that goBack was not called, because handleGoBack does nothing
    expect(mockNavigation.goBack).not.toHaveBeenCalled();
  });

  it('applies correct styles to header container', () => {
    const { getByTestId } = render(<GoBack title="Test Title" />);
    const headerContainer = getByTestId('go-back');
    const expectedStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      shadowColor: '#000', // IOS
      shadowOffset: { height: 2, width: 2 }, // IOS
      shadowOpacity: 0.2, // IOS
      shadowRadius: 2, // IOS
      elevation: 2, // 安卓
    };

    // Check if the style is applied by comparing styles
    expect(headerContainer.props.style).toMatchObject(expectedStyle);
  });

  it('applies correct styles to back button', () => {
    const { getByText } = render(<GoBack title="Test Title" />);
    const backButton = getByText('<');

    const expectedStyle = {
      fontSize: 18,
      color: '#000',
    };

    // Check if the style is applied by comparing styles
    expect(backButton.props.style).toMatchObject(expectedStyle);
  });

  it('applies correct styles to header title', () => {
    const { getByText } = render(<GoBack title="Test Title" />);
    const headerTitle = getByText('Test Title');

    const expectedStyle = {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 20,
    };

    // Check if the style is applied by comparing styles
    expect(headerTitle.props.style).toMatchObject(expectedStyle);
  });
});
