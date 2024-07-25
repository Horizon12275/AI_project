import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {portraitUpload} from '../services/userService';
import {login, register} from '../services/loginService';
import {storeObject} from '../services/offlineService';

type OptionProps = {
  text: string;
  onPress: () => void;
};

const AnsOption: React.FC<OptionProps> = ({text, onPress}) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Text style={styles.optionText}>{text}</Text>
  </TouchableOpacity>
);

type QuestionScreenProps = {
  route: {
    params: {
      user: any;
      question: string;
      options: {label: string; value: string}[];
      nextScreen?: string;
      type: string;
    };
  };
  navigation: any;
};

const PortraitQuestionScreen: React.FC<QuestionScreenProps> = ({
  route,
  navigation,
}) => {
  const {type, question, options, nextScreen} = route.params;
  console.log(route.params);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          The more we know,{'\n'}the better for you.
        </Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <AnsOption
            key={index}
            text={option.label}
            onPress={() => {
              if (nextScreen) {
                //不是最后一个问题
                navigation.navigate(nextScreen, {
                  user: {...route.params.user, [type]: option.value},
                });
              } else {
                //是最后一个问题
                let user = route.params.user;
                user[type] = option.value;
                //注册并登录
                register(user)
                  .then(() => {
                    login({
                      username: user.email,
                      password: user.password,
                    })
                      .then(() => {
                        Alert.alert(
                          'Sign up and Log in successfully!',
                          'Welcome to the app!',
                          [
                            {
                              text: 'OK',
                              onPress: () => {
                                storeObject('mode', 'online');
                                storeObject('user', user);
                                navigation.navigate('Tabs');
                              },
                            },
                          ],
                        );
                      })
                      //登录失败
                      .catch(err => {
                        Alert.alert('Login failed', err);
                      });
                  })
                  //注册失败
                  .catch(err => {
                    Alert.alert('Sign up failed', err);
                  });
              }
            }}
          />
        ))}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to previous step</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
  },
  headerText: {
    color: '#4A90E2',
    opacity: 0.8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
    fontSize: 24,
    fontWeight: 'bold',
  },
  questionContainer: {
    height: 90,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    opacity: 0.7,
  },
  optionsContainer: {
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    borderColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 1,
    display: 'flex',
    width: '100%',
    maxWidth: 280,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 46,
    paddingBottom: 5,
  },
  option: {
    borderRadius: 8,
    borderColor: 'rgba(33, 40, 63, 1)',
    borderWidth: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    padding: 8,
    marginBottom: 20,
  },
  optionText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#000103',
    fontWeight: '400',
    textAlign: 'center',
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 33,
  },
  backButtonText: {
    color: 'rgba(0, 0, 0, 0.90)',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontWeight: '300',
    fontSize: 12,
  },
});

export default PortraitQuestionScreen;
