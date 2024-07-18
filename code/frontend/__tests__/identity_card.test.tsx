// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';
// import IdentityCard from '../src/components/identity_card';
// import { NavigationContainer } from '@react-navigation/native';
//
// describe('IdentityCard Component', () => {
//   const mockNavigation = {
//     navigate: jest.fn(),
//   };
//
//   const src = { uri: 'https://example.com/image.png' };
//   const title = 'Test Title';
//
//   const renderComponent = () =>
//     render(
//       <NavigationContainer>
//         <IdentityCard src={src} title={title} navigation={mockNavigation}/>
//       </NavigationContainer>
//     );
//
//   it('renders correctly', () => {
//     const { getByText, getByTestId } = renderComponent();
//
//     expect(getByText(title)).toBeTruthy();
//     expect(getByTestId('image')).toBeTruthy();
//   });
//
//   it('navigates to Identity_Details on press', () => {
//     const { getByText } = renderComponent();
//
//     fireEvent.press(getByText(title));
//
//     expect(mockNavigation.navigate).toHaveBeenCalledWith('Identity_Details', { title });
//   });
//
//   it('applies custom ImageStyle', () => {
//     const customImageStyle = { borderRadius: 10 };
//     const { getByTestId } = render(
//       <NavigationContainer>
//         <IdentityCard src={src} title={title} ImageStyle={customImageStyle} />
//       </NavigationContainer>
//     );
//
//     const image = getByTestId('image');
//     expect(image.props.style).toContainEqual(customImageStyle);
//   });
// });

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IdentityCard from '../src/components/identity_card';
import { useNavigation } from '@react-navigation/native';

// Mock the navigation function
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('IdentityCard Component', () => {
  const src = { uri: 'https://example.com/image.png' };
  const title = 'Test Title';

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<IdentityCard src={src} title={title} />);

    // Check if the title is rendered
    expect(getByText(title)).toBeTruthy();

    // Check if the image is rendered
    expect(getByTestId('image')).toBeTruthy();
  });

  it('navigates to Identity_Details on press', () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    const { getByText } = render(<IdentityCard src={src} title={title} />);

    // Simulate press on the title text
    fireEvent.press(getByText(title));

    // Make sure the navigation was called with correct parameters
    expect(mockNavigate).toHaveBeenCalledWith('Identity_Details', { title });
  });

  it('applies custom ImageStyle', () => {
    const customImageStyle = { borderRadius: 10 };
    const { getByTestId } = render(
      <IdentityCard src={src} title={title} ImageStyle={customImageStyle} />
    );

    const image = getByTestId('image');

    // Check if the custom style is applied by comparing styles
    expect(image.props.style).toContainEqual(customImageStyle);
  });
});

