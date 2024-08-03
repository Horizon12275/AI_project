import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/login_screen.tsx';
import SignUpScreen from './src/screens/sign_up_screen';
import PortraitIdentityScreen from './src/screens/portrait_identity_screen';
import IdentityDetailsScreen from './src/screens/identity_details_screen';
import PortraitQuestionScreen from './src/screens/portrait_question_screen';
import TodayScreen from './src/screens/today_screen';
import {Image, Text} from 'react-native';
import AIScreen from './src/screens/AI_screen.tsx';
import AddOnScreen from './src/screens/add_screen_on';
import StatsScreen from './src/screens/stats_screen';
import ProfileScreen from './src/screens/profile_screen';
import {useEffect, useState} from 'react';

import {
  challengeOptions,
  exerciseOptions,
  sleepOptions,
} from './src/utils/offline.tsx';
import {useNetInfo} from '@react-native-community/netinfo';
import {getObject, storeObject} from './src/services/offlineService.tsx';
import NetworkListener from './src/components/network_listener.tsx';
import AddOffScreen from './src/screens/add_screen_off.tsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {isConnected} = useNetInfo();
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
        component={isConnected ? AddOnScreen : AddOffScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('./src/assets/icons/add.png')}
              style={{width: size, height: size, tintColor: color}}
            />
          ),
          ...options,
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
  const [user, setUser] = useState<null | any>(null);
  const [auth, setAuth] = useState<null | any>(null);
  const [mode, setMode] = useState<null | any>(null);
  const {isConnected} = useNetInfo();

  useEffect(() => {
    Promise.all([getObject('user'), getObject('auth'), getObject('mode')]).then(
      ([user, auth, mode]) => {
        setUser(user);
        setAuth(auth);
        setMode(mode);
      },
    );
    
  }, []);

  const options = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      {/* <Text>{user?.email}</Text>
      <Text>{auth?.username}</Text>
      <Text>{`mode:${mode}`}</Text>
      <Text>{`isConnected:${isConnected}`}</Text> */}
      <NetworkListener />
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={options} />
        <Stack.Screen name="Tabs" component={TabNavigator} options={options} />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={options}
        />
        <Stack.Screen name="AI" component={AIScreen} options={options} />
        <Stack.Screen
          name="Portrait"
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
            type: 'sleep_schedule',
            question: 'Your usual sleep schedule is like ...',
            options: sleepOptions,
            nextScreen: 'Question2',
          }}
          options={options}
        />
        <Stack.Screen
          name="Question2"
          component={PortraitQuestionScreen}
          initialParams={{
            type: 'exercise',
            question: 'How often do you exercise?',
            options: exerciseOptions,
            nextScreen: 'Question3',
          }}
          options={options}
        />
        <Stack.Screen
          name="Question3"
          component={PortraitQuestionScreen}
          initialParams={{
            type: 'challenge',
            question:
              'The main challenges you face \n with time management is ...',
            options: challengeOptions,
          }}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
