import Calendar from '../components/calendar';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import CalendarHeader from '../components/calendar_header';
import EventCard from '../components/event_card';
import {getUser} from '../services/userService';

const TodayScreen = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(null); //正在编辑的事件id

  useEffect(() => {
    getUser("admin").then(user => {
      console.log(user);
      console.log(user.name);
      
    });
  }, []);

  const scheduleItems = [
    {
      startTime: '09:10 AM',
      endTime: '10:00 AM',
      title: 'Class- Principles Macroeconomics',
      location: 'Business School Hall',
      iconUri:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a833a46bfbd76b3e6f6000c822ddfa0b41cf1a62624c8bfb011714b0576e71c4?apiKey=9e661a5e0ad74c878ca984d592b3752c&',
      color: '#4AD2C9',
      additionalInfo: {
        text: 'Uncompleted checklist',
        count: 1,
      },
      handlePress: () => setIsEditing(1),
    },
    {
      startTime: '10:10 AM',
      endTime: '11:00 AM',
      title: 'Meeting- Presentation on LLM',
      location: 'Zoom',
      iconUri:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/a833a46bfbd76b3e6f6000c822ddfa0b41cf1a62624c8bfb011714b0576e71c4?apiKey=9e661a5e0ad74c878ca984d592b3752c&',
      color: '#C44EFB',
    },
  ];

  return (
    <View style={{height: '100%'}}>
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        toggleCalendar={() => setIsCalendarVisible(!isCalendarVisible)}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 1,
          paddingVertical: 20,
          backgroundColor: 'white',
        }}
        data={[1, 2, 3, 4, 5]}
        renderItem={({item}) => (
          <EventCard
            isEditing={isEditing === item}
            setIsEditing={setIsEditing}
            {...scheduleItems[item % 2]}
          />
        )}
        ListHeaderComponent={
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        }
      />
    </View>
  );
};

export default TodayScreen;
