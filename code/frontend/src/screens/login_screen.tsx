import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form, Input} from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, logout} from '../services/loginService';
import {Alert} from 'react-native';
import {getUser} from '../services/userService';
import {useEffect, useState} from 'react';

const InputField = ({
  label,
  isPassword,
  props,
}: {
  label: string;
  isPassword?: boolean;
  props: any;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <Form.Item {...props}>
      <Input
        style={styles.input}
        secureTextEntry={isPassword}
        accessibilityLabel={label}
      />
    </Form.Item>
  </View>
);

function LoginScreen() {
  const navigation = useNavigation();
  const [form] = Form.useForm();
  const [isLoging, setIsLoging] = useState(false); //是否正在登录 渲染loading

  // useEffect(() => {
  //   AsyncStorage.getItem('auth')
  //     .then(auth => {
  //       if (auth) {
  //         const {rememberMe, username, password} = JSON.parse(auth);
  //         if (rememberMe) {
  //           setIsLoging(true);
  //           login({username, password})
  //             .then(res => {
  //               console.log(res);
  //               getUser()
  //                 .then(user => {
  //                   AsyncStorage.setItem('user', JSON.stringify(user));
  //                   setIsLoging(false);
  //                   navigation.navigate('Tabs');
  //                   //Alert.alert('Welcome back, ' + user.username + '!');
  //                 })
  //                 .catch(err => Alert.alert(err)); //获取用户信息错误
  //             })
  //             .catch(err => Alert.alert(err)); //登录错误
  //         }
  //       }
  //     })
  //     .catch(
  //       err => Alert.alert(err), //读取auth错误
  //     );
  // }, []);

  const onSubmit = () => {
    form.submit();
  };

  const handleLogin = async (values: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) => {
    login(values)
      .then(res => {
        getUser()
          .then(user => {
            AsyncStorage.setItem('user', JSON.stringify(user));
            if (1) {
              //记住我
              let auth = {
                username: values.username,
                password: values.password,
                rememberMe: true,
              };
              AsyncStorage.setItem('auth', JSON.stringify(auth));
            }
            navigation.navigate('Tabs');
          })
          .catch(err => Alert.alert('Error', err));
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };

  return (
    <Form
      onFinish={handleLogin}
      form={form}
      initialValues={{
        email: '',
        password: '',
      }}
      style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formInstructions}>
          Enter your email and password
        </Text>
        <InputField
          label="Email"
          props={{
            name: 'username',
            rules: [
              {
                required: true,
                message: 'Please input your email!',
              },
            ],
          }}
        />
        <InputField
          label="Password"
          isPassword
          props={{
            name: 'password',
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
            ],
          }}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </Text>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <View style={styles.divider} />
      </View>
      <Modal visible={isLoging} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <Text style={{color: '#FFF', fontSize: 20}}>Logging in...</Text>
        </View>
      </Modal>
    </Form>
  );
}

const styles = StyleSheet.create({
  container: {
    color: 'blue',
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  title: {
    color: '#4A90E2',
    textAlign: 'center',
    marginTop: 80,
    width: '100%',
    fontFamily: 'Nunito',
    fontWeight: '700',
    fontSize: 40,
  },
  formContainer: {
    display: 'flex',
    marginTop: 80,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontSize: 16,
    fontWeight: '700',
    padding: 25,
  },
  formInstructions: {
    color: '#A8A6A7',
    textAlign: 'center',
    fontFamily: 'Nunito',
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: 40,
  },
  inputLabel: {
    color: '#A8A6A7',
    fontFamily: 'Nunito',
    marginBottom: 5,
  },
  input: {
    borderBottomColor: '#A8A6A7',
    borderBottomWidth: 1,
    paddingBottom: 5,
    color: '#000',
  },
  forgotPassword: {
    color: '#D87234',
    textAlign: 'right',
    fontFamily: 'Nunito',
    marginTop: 10,
  },
  loginButton: {
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    marginTop: 80,

    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    paddingVertical: 17,
  },
  loginButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito',
    fontSize: 22,
  },
  signUpText: {
    color: '#A8A6A7',
    textAlign: 'center',
    fontFamily: 'Nunito',
    marginTop: 75,
    fontSize: 16,
  },
  signUpLink: {
    color: '#D87234',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    paddingHorizontal: 25,
  },
  divider: {
    borderBottomColor: '#A8A6A7',
    borderBottomWidth: 1,
    width: 135,
  },
});

export default LoginScreen;
