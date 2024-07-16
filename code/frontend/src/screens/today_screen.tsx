import Calendar from '../components/calendar';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';
import CalendarHeader from '../components/calendar_header';
import EventCard from '../components/event_card';
import {getUser} from '../services/userService';
import {getAllEvents, getEventNums} from '../services/eventService';
import {toDate} from '../utils/date';

const TodayScreen = () => {
  const currentDate = new Date();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [events, setEvents] = useState([]); //当天的事件
  const [eventNums, setEventNums] = useState([]); //这个月每天的事件数量
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(-1); //正在编辑的事件id -1表示没有

  useEffect(() => {
    onRefresh(); //重新渲染时刷新 会有loading图标
  }, [selectedDate]);

  const onRefresh = () => {
    setRefreshing(true);
    setIsEditing(-1); //刷新时取消编辑状态
    Promise.all([
      getAllEvents(toDate(selectedDate)),
      getEventNums(selectedDate.getFullYear(), selectedDate.getMonth() + 1),
    ])
      .then(([events, eventNums]) => {
        setEvents(events);
        setEventNums(eventNums);
        setRefreshing(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={{height: '100%'}}>
      <CalendarHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        toggleCalendar={() => setIsCalendarVisible(!isCalendarVisible)}
        eventNums={eventNums}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsHorizontalScrollIndicator={false}
        style={{
          flex: 1,
          paddingVertical: 20,
          backgroundColor: 'white',
        }}
        data={events}
        renderItem={({item: event}) => (
          <EventCard
            event={event}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )}
        ListHeaderComponent={
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            eventNums={eventNums}
          />
        }
      />
    </View>
  );
};

export default TodayScreen;
