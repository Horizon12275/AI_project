import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form, Input} from '@ant-design/react-native';
import {login, register} from '../services/loginService';

const InputField = ({
  label,
  isPassword,
  props,
}: {
  label: string;
  isPassword?: boolean;
  props?: any;
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

function SignUpScreen() {
  const navigation = useNavigation();
  const [form] = Form.useForm();

  const onSubmit = () => {
    form.submit();
  };

  const handleSignUp = async (values: {
    username: string;
    password: string;
    email: string;
  }) => {
    console.log(values);
    register(values)
      .then(res => {
        login({
          username: values.email,
          password: values.password,
        }).then(res => {
          Alert.alert('Sign up and Log in successfully!');
          navigation.navigate('Portrait');
        });
      })
      .catch(err => {
        Alert.alert('Sign up failed', err);
      });
  };

  return (
    <View style={styles.container}>
      <Form
        onFinish={handleSignUp}
        form={form}
        initialValues={{
          email: '',
          password: '',
        }}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>First create your account</Text>
          <InputField
            label="Full name"
            props={{
              name: 'username',
              rules: [{required: true, message: 'Please input your username!'}],
            }}
          />
          <InputField
            label="Email"
            props={{
              name: 'email',
              rules: [{required: true, message: 'Please input your email!'}],
            }}
          />
          <InputField
            label="Password"
            isPassword
            props={{
              name: 'password',
              rules: [{required: true, message: 'Please input your password!'}],
            }}
          />
          <InputField
            label="Confirm your password"
            isPassword
            props={{
              name: 'confirmPassword',
              rules: [
                {required: true, message: 'Please input your password!'},
                ({getFieldValue}) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords do not match!'),
                    );
                  },
                }),
              ],
            }}
          />
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={onSubmit}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </Text>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    width: '100%',
  },
  title: {
    color: '#4A90E2',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 40,
    fontWeight: '700',
    fontFamily: 'Nunito, sans-serif',
  },
  formContainer: {
    marginTop: 10,
    paddingHorizontal: 25,
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: 'Nunito, sans-serif',
    fontSize: 16,
    color: '#A8A6A7',
    fontWeight: '700',
    marginBottom: 40, // 调整这个值来减少空隙
  },
  inputContainer: {
    marginBottom: 40, // 调整这个值来减少空隙
  },
  inputLabel: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 16,
    color: '#A8A6A7',
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#A8A6A7',
    paddingBottom: 8,
  },
  signUpButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    marginTop: 24,
    marginHorizontal: 25,
    paddingVertical: 17,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '400',
    fontFamily: 'Nunito, sans-serif',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    fontFamily: 'Nunito, sans-serif',
  },
  loginLink: {
    color: '#D87234',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
});

export default SignUpScreen;
