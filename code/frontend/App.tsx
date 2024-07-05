import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/login_screen';
import SignUpScreen from './src/screens/sign_up_screen';
import PortraitIdentityScreen from './src/screens/portrait_identity_screen';
import IdentityDetailsScreen from './src/screens/identity_details_screen';
import PortraitQuestionScreen from './src/screens/portrait_question_screen';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Question1">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Portrait_Identity" component={PortraitIdentityScreen} />
        <Stack.Screen name="Identity_Details" component={IdentityDetailsScreen} />
        <Stack.Screen
          name="Question1"
          component={PortraitQuestionScreen}
          initialParams={{
            question: 'Your usual sleep schedule is like ...',
            options: [
              'Less than 6 hours',
              '6-8 hours',
              '8-10 hours',
              'More than 10 hours',
            ],
            nextScreen: 'Question2',
          }}
        />
        <Stack.Screen
          name="Question2"
          component={PortraitQuestionScreen}
          initialParams={{
            question: 'How often do you exercise?',
            options: [
              'Every day',
              'A few times a week',
              'A few times a month',
              'Rarely',
            ],
            nextScreen: 'Question3'
          }}
        />
        <Stack.Screen
          name="Question3"
          component={PortraitQuestionScreen}
          initialParams={{
            question: 'The main challenges you face \n with time management is ...',
            options: [
                'Inability to concentrate',
                'To many tasks',
                'Lack of prioritisation',
                'Confusing schedule',
                'Others',
            ],
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
