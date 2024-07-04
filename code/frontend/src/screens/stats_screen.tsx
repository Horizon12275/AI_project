import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PieGraph from '../components/pie_graph';
import SummaryBox from '../components/summary_box';

const data = [
  {x: 'Learn', y: 25},
  {x: 'Eat', y: 35},
  {x: 'Sleep', y: 40},
];

const summaryData = 'You have been spending most of your time eating!';
const startDate = '2021-01-01';
const endDate = '2021-01-07';

const StatsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.header}>Visualize Time</Text>
        <PieGraph data={data} />
      </View>
      <View style={styles.timeZoneSelector}>
        <Text style={styles.timeZoneText}>Select a time zone</Text>
        <Image
          resizeMode="contain"
          source={require('../img/time_select_icon.png')}
          style={styles.timeZoneIcon}
        />
      </View>
      <TouchableOpacity style={styles.summaryButton}>
        <Text style={styles.summaryButtonText}>Get your Summary</Text>
      </TouchableOpacity>
      <SummaryBox data={summaryData} startDate={startDate} endDate={endDate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    maxWidth: 480,
    width: '100%',
  },
  header: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 25,
    fontWeight: '700',
    color: '#010618',
    textAlign: 'center',
    marginTop: 30,
  },
  timeZoneSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
    height: 50,
  },
  timeZoneText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 19,
    fontWeight: '700',
    color: '#010618',
  },
  timeZoneIcon: {
    width: 46,
  },
  summaryButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  summaryButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito, sans-serif',
    fontSize: 22,
  },
});

export default StatsScreen;
