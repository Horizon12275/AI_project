import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

type OptionProps = {
  text: string;
};

const AnsOption: React.FC<OptionProps> = ({ text, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Text style={styles.optionText}>{text}</Text>
  </TouchableOpacity>
);

type QuestionScreenProps = {
  route: {
    params: {
      question: string;
      options: string[];
      nextScreen?: string;
    };
  };
  navigation: any;
};

const PortraitQuestionScreen: React.FC<QuestionScreenProps> = ({ route, navigation }) => {
  const { question, options, nextScreen } = route.params;

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
            text={option}
            onPress={() => {
              if (nextScreen) {
                navigation.navigate(nextScreen);
              } else {
                alert('This is the last question.');
              }
            }}
          />
        ))}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to previous step</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    maxWidth: 381,
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
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 32,
    fontWeight: 'bold',
  },
  questionContainer: {
    height: 120,
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 20,
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
    fontSize: 16,
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
    fontSize: 16,
  },
});

export default PortraitQuestionScreen;
