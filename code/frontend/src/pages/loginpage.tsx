import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const InputField = ({label, isPassword}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      secureTextEntry={isPassword}
      accessibilityLabel={label}
    />
  </View>
);

function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formInstructions}>
          Enter your email and password
        </Text>
        <InputField label="Email" />
        <InputField label="Password" isPassword />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    display: 'flex',
    maxWidth: 480,
    width: '100%',
    paddingBottom: 57,
    flexDirection: 'column',
    margin: '0 auto',
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
