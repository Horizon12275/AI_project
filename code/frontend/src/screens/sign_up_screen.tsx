import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
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

function SignUpScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitle}>First create your account</Text>
        <InputField label="Full name" />
        <InputField label="Email" />
        <InputField label="Password" isPassword />
        <InputField label="Confirm your password" isPassword />
      </View>
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#FFF',
    maxWidth: 480,
    width: '100%',
    flexGrow: 1,
  },
  title: {
    color: '#4A90E2',
    textAlign: 'center',
    marginTop: 100,
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
