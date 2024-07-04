import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

// 定义一个接口来描述props的结构
interface SummaryBoxProps {
  data: string;
  startDate: string;
  endDate: string;
}

const SummaryBox: React.FC<SummaryBoxProps> = ({data, startDate, endDate}) => {
  return (
    <View>
      <Text style={styles.summaryHeader}>Generated Result:</Text>
      <Text style={styles.summaryPeriod}>
        During {startDate} and {endDate}
      </Text>
      <Text style={styles.summaryContent}>{data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryHeader: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 20,
    fontWeight: '700',
    color: '#010618',
    textAlign: 'center',
    marginTop: 10,
  },
  summaryPeriod: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    color: '#737373',
    textAlign: 'center',
    marginTop: 10,
  },
  summaryContent: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    color: '#010618',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SummaryBox;
