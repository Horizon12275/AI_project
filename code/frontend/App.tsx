import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './src/screens/login_screen';
import SignUpScreen from './src/screens/sign_up_screen';

import TodayScreen from './src/screens/today_screen';
import {Image, View} from 'react-native';
import AddScreen from './src/screens/add_screen';
import AddOnScreen from './src/screens/add_screen_on';
import AddOffScreen from './src/screens/add_screen_off';
import StatsScreen from './src/screens/stats_screen';
import ProfileScreen from './src/screens/profile_screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const options = {
    headerShown: false,
  };
  return (
    <Tab.Navigator>
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
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'blue'},
        }}>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
