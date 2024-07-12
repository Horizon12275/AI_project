import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/login_screen';
import SignUpScreen from './src/screens/sign_up_screen';
import PortraitIdentityScreen from './src/screens/portrait_identity_screen';
import IdentityDetailsScreen from './src/screens/identity_details_screen';
import PortraitQuestionScreen from './src/screens/portrait_question_screen';
import TodayScreen from './src/screens/today_screen';
import {Alert, Image, Text, View} from 'react-native';
import AddScreen from './src/screens/add_screen';
import AddOnScreen from './src/screens/add_screen_on';
import AddOffScreen from './src/screens/add_screen_off';
import StatsScreen from './src/screens/stats_screen';
import ProfileScreen from './src/screens/profile_screen';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyHeader from './src/components/my_header';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const options = {
    headerShown: false,
  };
  return (
    <Tab.Navigator
      //initialRouteName='Add'
    >
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./src/assets/icons/today.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
          ...options,
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./src/assets/icons/schedule.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
          ...options,
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddOffScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./src/assets/icons/add.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
          headerTitle: props => <MyHeader />,
          headerStyle: {backgroundColor: '#f0f0f0'},
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./src/assets/icons/settings.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
          ...options,
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  const [initialRoute, setInitialRoute] = useState('Login');
  const [user, setUser] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      if (data) {
        setInitialRoute('Tabs');
        setUser(data);
      } else {
        setInitialRoute('Login');
      }
    });
  }, [initialRoute]);
  const options = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <Text>{user}</Text>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'blue'},
        }}
        initialRouteName={initialRoute}>
        <Stack.Screen name="Tabs" component={TabNavigator} options={options} />
        <Stack.Screen name="Login" component={LoginScreen} options={options} />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={options}
        />
        <Stack.Screen
          name="Portrait_Identity"
          component={PortraitIdentityScreen}
          options={options}
        />
        <Stack.Screen
          name="Identity_Details"
          component={IdentityDetailsScreen}
          options={options}
        />
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
            nextScreen: 'Question3',
          }}
        />
        <Stack.Screen
          name="Question3"
          component={PortraitQuestionScreen}
          initialParams={{
            question:
              'The main challenges you face \n with time management is ...',
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
