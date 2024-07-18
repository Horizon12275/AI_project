import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {months, weekDays} from '../utils/date';
import MyButton from '../utils/my_button';

function getDates(year: number, month: number) {
  // 获取指定年月的日期数组
  let firstDay = new Date(year, month, 1); // 本月第一天
  let lastDay = new Date(year, month + 1, 0); // 本月最后一天
  let daysInMonth = lastDay.getDate(); // 本月总天数
  let Dates = [];

  // 添加一个循环，用于填充月初的空白部分 getDay()返回星期几 0-6代表周日到周六
  for (let i = 0; i < firstDay.getDay(); i++) {
    Dates.push('');
  }

  // 填充实际日期部分
  for (let day = 1; day <= daysInMonth; day++) {
    Dates.push(day);
  }

  // 添加一个循环，用于填充月末的空白部分
  for (let i = lastDay.getDay() + 1; i < 7; i++) {
    Dates.push('');
  }

  return Dates;
}
type DayProps = {
  day: string;
};
// 星期header
const Day: React.FC<DayProps> = ({day}) => (
  <View style={styles.dayContainer} testID={`day-${day}`}>
    <Text style={styles.dayText}>{day}</Text>
  </View>
);

type DateProps = {
  date: string;
  isToday?: boolean;
  hasEvent?: boolean;
  handlePress?: () => void;
};
// 日期cell
const DateCell: React.FC<DateProps> = ({
  date,
  isToday,
  hasEvent,
  handlePress,
}) => (
  <TouchableOpacity
    onPress={handlePress}
    style={[
      styles.dateContainer,
      isToday && styles.todayContainer,
      hasEvent && styles.highlightedContainer,
    ]} testID={`date-cell-${date}`}>
    <Text
      style={[
        styles.dateText,
        isToday && styles.todayText,
        hasEvent && styles.highlightedText,
      ]}>
      {date}
    </Text>
    {hasEvent && <NotificationBadge color="#FF0000" />}
  </TouchableOpacity>
);
// 标记有日程的小红点
const NotificationBadge = ({color}: {color: string}) => {
  return (
    <View style={[styles.badgeContainer, {backgroundColor: color}]}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>●</Text>
      </View>
    </View>
  );
};

const Calendar = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  const goToPreviousMonth = () => {
    setCurrentMonth((currentMonth - 1 + 12) % 12);
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  const goToNextMonth = () => {
    setCurrentMonth((currentMonth + 1) % 12);
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
    }
  };

  const dates = getDates(currentYear, currentMonth);
  function chunk(array: any[], size: number) {
    return Array.from({length: Math.ceil(array.length / size)}, (_, index) =>
      array.slice(index * size, index * size + size),
    );
  }
  const chunkedDates = chunk(dates, 7); //将日期分成7天一组
  return (
    <View style={styles.calendarContainer} testID="calendar-container">
      <View style={styles.headerContainer} testID="header-container">
        <Text style={styles.monthText}>
          {`${months[currentMonth]} ${currentYear}`}{' '}
        </Text>
        <View style={styles.iconContainer}>
          <MyButton
            icon={require('../assets/icons/left-arrow.png')}
            onPress={goToPreviousMonth}
            style={styles.icon}
            testID="previous-month-button"
          />
          <MyButton
            icon={require('../assets/icons/right-arrow.png')}
            onPress={goToNextMonth}
            style={styles.icon}
            testID="next-month-button"
          />
        </View>
      </View>
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <Day key={index} day={day} />
        ))}
      </View>
      <View style={styles.datesContainer}>
        {chunkedDates.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekContainer} testID={`week-${weekIndex}`}>
            {week.map((date, dateIndex) => (
              <DateCell
                key={dateIndex}
                date={date}
                isToday={
                  date == selectedDate.getDate().toString() &&
                  currentMonth == selectedDate.getMonth() &&
                  currentYear == selectedDate.getFullYear()
                }
                hasEvent={date == '22'}
                handlePress={() =>
                  setSelectedDate(
                    new Date(currentYear, currentMonth, parseInt(date)),
                  )
                }
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    alignSelf: 'stretch',
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 23,
    shadowColor: '#969696',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#121212',
    fontFamily: 'Inter, sans-serif',
    marginLeft: 45,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#121212',
    fontFamily: 'Inter, sans-serif',
  },
  datesContainer: {
    flexDirection: 'column',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#858585',
    fontFamily: 'Inter, sans-serif',
  },
  todayContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  todayText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  highlightedContainer: {
    borderRadius: 1000,
  },
  highlightedText: {
    color: '#121212',
  },
  // 通知小红点样式
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    fontSize: 20,
    marginRight: 10,
  },
  badgeContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
    width: 5,
    height: 5,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'transparent',
  },
});

export default Calendar;
