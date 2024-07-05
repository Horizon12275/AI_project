import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import PieGraph from '../components/pie_graph';
import SummaryBox from '../components/summary_box';
import MyButton from '../utils/my_button';
import Calendar from '../components/calendar';

const data = [
  {x: 'Learn', y: 25},
  {x: 'Eat', y: 35},
  {x: 'Sleep', y: 40},
];

const summaryData = 'You have been spending most of your time eating!';
const startDate = '2021-01-01';
const endDate = '2021-01-07';

const StatsScreen: React.FC = () => {
  const startDate = new Date();
  const endDate = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.header}>Visualize Time</Text>
        <PieGraph data={data} />
      </View>
      <View style={styles.timeZoneSelector}>
        <Text style={styles.timeZoneText}>Select a time zone</Text>
        <MyButton
          icon={require('../assets/icons/time-select.png')}
          onPress={() => setShowCalendar(!showCalendar)}
          style={styles.timeZoneIcon}
        />
        {showCalendar && (
          <Modal
            animationType="fade" // 动画效果
            transparent={true} // 透明背景
            visible={showCalendar}
            onRequestClose={() => {
              setShowCalendar(!showCalendar);
            }}>
            <View style={styles.modalView}>
              <Text style={styles.calendarSpanTitle}>Start Date</Text>
              <Calendar
                selectedDate={selectedStartDate}
                setSelectedDate={setSelectedStartDate}
              />
              <Text style={styles.calendarSpanTitle}>End Date</Text>
              <Calendar
                selectedDate={selectedEndDate}
                setSelectedDate={setSelectedEndDate}
              />
              <TouchableOpacity
                onPress={() => setShowCalendar(!showCalendar)}
                style={styles.doneButton}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
      <TouchableOpacity style={styles.summaryButton}>
        <Text style={styles.summaryButtonText}>Get your Summary</Text>
      </TouchableOpacity>
      <SummaryBox
        data={summaryData}
        startDate={selectedStartDate.toDateString()}
        endDate={selectedEndDate.toDateString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 29,
    width: 45,
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 50,
  },
  calendarSpanTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#010618',
    marginTop: 10,
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    width: '90%',
    margin: 10,
  },
  doneButtonText: {
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    padding: 3,
    textAlign: 'center',
  },
});

export default StatsScreen;
