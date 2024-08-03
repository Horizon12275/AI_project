import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import {Form, Input} from '@ant-design/react-native';
import {login} from '../services/loginService';
import {Alert} from 'react-native';
import {getUser} from '../services/userService';
import {useEffect, useState} from 'react';
import {
  clearAllUnpushed,
  getObject,
  pushAll,
  storeObject,
} from '../services/offlineService';
import {useNetInfo} from '@react-native-community/netinfo';
import Loading from '../components/loading';

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

function LoginScreen({navigation}: {navigation: any}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true); //是否正在加载
  const [logging, setLogging] = useState(false); //是否正在登录
  const [auth, setAuth] = useState<null | any>(null);
  const {isConnected} = useNetInfo(); //是否联网

  //初次进入页面时根据user判断用户是否登录过
  useEffect(() => {
    if (isConnected === null) return;
    setTimeout(() => {
      Promise.all([getObject('auth'), getObject('user')]).then(
        ([auth, user]) => {
          if (!auth) return setLoading(false); //加载完成
          setAuth(auth);
          //替用户隐式的登录
          if (user) {
            form.setFieldsValue(auth);
            if (isConnected) {
              handleLogin(auth);
            } else {
              Alert.alert(
                'Network Error',
                'No network connection. You are logging in offline mode.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      storeObject('mode', 'offline');
                      navigation.replace('Tabs');
                      setLoading(false);
                    },
                  },
                ],
                {
                  cancelable: false,
                },
              );
            }
          } else setLoading(false); //加载完成
        },
      );
    }, 1000);
    
  }, [isConnected]);

  //登录+获取用户信息存储到本地+存储auth
  const handleLogin = async (values: {username: string; password: string}) => {
    if (!isConnected) {
      Alert.alert('Network Error', 'Please check your network connection');
      return;
    }
    setLogging(true);
    login(values)
      .then(() => {
        storeObject('mode', 'online'); //在线模式
        // 登录成功 获取用户信息
        pushAll().then(() => {
          storeObject('auth', {
            username: values.username,
            password: values.password,
          });
          setLogging(false);
          navigation.replace('Tabs');
          setLoading(false);
        }); //上传未上传的数据 保证数据同步
      })
      // 登录失败
      .catch(err => {
        Alert.alert('Login failed', err);
        setLogging(false);
      });
  };

  const onSubmit = () => {
    form.submit();
  };

  return (
    <ScrollView>
      <Form
        onFinish={handleLogin}
        form={form}
        initialValues={{
          username: auth?.username,
          password: auth?.password,
          rememberMe: auth?.rememberMe,
        }}
        style={{display: loading ? 'none' : 'flex', ...styles.container}}>
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
      </Form>
      <Modal
        visible={loading}
        animationType="fade"
        transparent={true}>
        <Image
          source={require('../assets/images/initializing.png')}
          style={{
            backgroundColor: '#7092B1',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Modal>

      <Loading visible={logging && !loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    color: 'blue',

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
    fontSize: 30,
  },
  formContainer: {
    display: 'flex',
    marginTop: 80,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontSize: 12,
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
    fontSize: 16,
  },
  signUpText: {
    color: '#A8A6A7',
    textAlign: 'center',
    fontFamily: 'Nunito',
    marginTop: 75,
    fontSize: 12,
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
