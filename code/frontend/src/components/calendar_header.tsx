import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {convertToOrdinal, months, weekDays} from '../utils/date';
import {useEffect, useRef} from 'react';
import MyButton from '../utils/my_button';

type DateItemProps = {
  day: string;
  date: string;
  isSelected?: boolean;
  hasEvent?: number;
  handlePress: () => void;
};

const DateItem: React.FC<DateItemProps> = ({
  day,
  date,
  isSelected,
  hasEvent,
  handlePress,
}) => (
  <TouchableOpacity
    testID={`date-item-${date}`}
    style={[styles.dateItem, isSelected && styles.selectedDateItem]}
    onPress={handlePress}>
    <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
      {date}
    </Text>
    <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
      {day}
    </Text>
    {hasEvent > 0 && (
      <View style={[styles.circle]}>
        <Text style={styles.circleText}>{hasEvent}</Text>
      </View>
    )}
  </TouchableOpacity>
);

function getDates(selectedDate: Date) {
  // 获取指定年月的日期数组
  let date = new Date(selectedDate);
  let month = date.getMonth();
  let Dates = [];
  date.setDate(1); // 重置日期为本月第一天

  // 填充实际日期部分
  while (date.getMonth() === month) {
    Dates.push({day: date.getDay(), date: date.getDate()});
    date.setDate(date.getDate() + 1); // 增加一天
  }

  return Dates;
}

const CalendarHeader = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) => {
  const flatListRef = useRef<FlatList>(null);
  //通过ref回调 滚动到选中日期
  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: selectedDate.getDate() - 1,
      animated: true,
    });
  }, [selectedDate]);
  const dates = getDates(selectedDate);
  //形如
  //   [
  //     {day: 'Mon', date: '18'},
  //     {day: 'Tue', date: '19'},
  //     {day: 'Wed', date: '20'},
  //     {day: 'Thu', date: '21'},
  //     {day: 'Fri', date: '22'},
  //   ];
  return (
    <View style={styles.content}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{`${
          months[selectedDate.getMonth()]
        } ${convertToOrdinal(
          selectedDate.getDate(),
        )}, ${selectedDate.getFullYear()}`}</Text>
        <MyButton
          testID="toggle-calendar-button"
          icon={require('../assets/icons/down-arrow.png')}
          onPress={() => {}}
          style={styles.headerImage}
        />
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        data={dates}
        style={styles.dateList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <DateItem
            key={index}
            date={item.date.toString()}
            day={weekDays[item.day]}
            isSelected={item.date == selectedDate.getDate()}
            hasEvent={Math.floor(Math.random() * 10)}
            handlePress={() =>
              setSelectedDate(new Date(selectedDate.setDate(item.date)))
            }
          />
        )}
        getItemLayout={(data, index) => ({
          length: 60,
          offset: 60 * index,
          index,
        })}
        initialScrollIndex={selectedDate.getDate() - 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timeText: {
    fontFamily: 'Inter, sans-serif',
  },
  headerImage: {
    width: 12,
    marginLeft: 5,
  },
  content: {
    display: 'flex',
    marginTop: 30,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
    fontSize: 20,
    fontWeight: '700',
  },
  dateList: {
    display: 'flex',
    marginHorizontal: 24,
    marginTop: 16,
    flexDirection: 'row',
  },
  dateItem: {
    width: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 8,
  },
  selectedDateItem: {
    borderRadius: 4,
    backgroundColor: 'rgba(128, 179, 255, 0.43)',
  },
  dayText: {
    color: '#94A3B8',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontWeight: '400',
  },
  selectedDayText: {
    color: '#21283F',
  },
  selectedDateText: {
    color: '#21283F',
  },
  circleText: {
    fontSize: 12,
    color: '#21283F',
    fontWeight: '400',
    textAlign: 'center',
  },
  circle: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: 'rgba(48, 131, 253, 0.71)',
    borderRadius: 8,
    alignItems: 'center',
    width: 16,
    justifyContent: 'center',
    height: 16,
    marginTop: 4,
  },
});

export default CalendarHeader;
