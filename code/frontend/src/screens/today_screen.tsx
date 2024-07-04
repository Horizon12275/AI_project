import Calendar from '../components/calendar';
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import CalendarHeader from '../components/calendar_header';
import EventCard from '../components/event_card';

const TodayScreen = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  return (
    <View style={{height: '100%'}}>
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: 30,
          display: 'flex',
          gap: 20,
        }}>
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{flex: 1, paddingVertical: 30}}
          data={[1, 2, 3, 4, 5]}
          renderItem={({item}) => <EventCard />}
        />
      </View>
    </View>
  );
};

export default TodayScreen;
