import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import PieGraph from '../components/pie_graph';
import SummaryBox from '../components/summary_box';
import MyButton from '../utils/my_button';
import Calendar from '../components/calendar';
import {getSummary} from '../services/eventService';
import {toDate} from '../utils/date';
import {categoryOptions} from '../utils/offline';
import {getObject} from '../services/offlineService';
import Loading from '../components/loading';

const summaryData = 'You have been spending most of your time eating!';

const StatsScreen = () => {
  const [data, setData] = useState([{x: 'Example', y: 100}]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSummary = () => {
    getObject('mode').then(mode => {
      if (mode === 'offline') {
        Alert.alert('You are offline, please connect to the internet');
      } else {
        if (startDate > endDate) {
          Alert.alert('Start date should be before end date');
          return;
        }
        setLoading(true);
        getSummary(toDate(startDate), toDate(endDate))
          .then(res => {
            setLoading(false);
            if (res.length === 0)
              Alert.alert('No data found for the selected date range');
            let data = res.map(item => {
              return {
                x: categoryOptions.find(cat => cat.value === item.category)
                  ?.label,
                y: item.percentage.toFixed(2),
              };
            });
            if (data.length > 0) setData(data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Loading visible={loading} />
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
          buttonStyle={styles.timeZoneButton}
        />
        {showCalendar && (
          <Modal
            animationType="fade" // 动画效果
            transparent={true} // 透明背景
            visible={showCalendar}
            onRequestClose={() => {
              setShowCalendar(!showCalendar);
            }}>
            <TouchableWithoutFeedback
              onPress={() => setShowCalendar(!showCalendar)}>
              <View style={styles.modalView}>
                <Text style={styles.calendarSpanTitle}>Start Date</Text>
                <Calendar
                  selectedDate={startDate}
                  setSelectedDate={setStartDate}
                />
                <Text style={styles.calendarSpanTitle}>End Date</Text>
                <Calendar selectedDate={endDate} setSelectedDate={setEndDate} />
                <TouchableOpacity
                  onPress={() => setShowCalendar(!showCalendar)}
                  style={styles.doneButton}>
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
      <TouchableOpacity style={styles.summaryButton} onPress={handleSummary}>
        <Text style={styles.summaryButtonText}>Get your Summary</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.summaryText}
        value={summaryData}
        editable={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 20,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#010618',
  },
  timeZoneIcon: {
    width: 30,
  },
  timeZoneButton: {
    backgroundColor: '#80B3FF',
    height: 40,
    width: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    paddingVertical: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  summaryButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito, sans-serif',
    fontSize: 16,
  },
  summaryText: {
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    height: 200,
  },
  modalView: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    padding: 20,
  },
  calendarSpanTitle: {
    fontSize: 15,
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
    fontSize: 12,
    padding: 3,
    textAlign: 'center',
  },
});

export default StatsScreen;
