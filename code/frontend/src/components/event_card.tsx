import * as React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Divider from './divider';
import MyButton from '../utils/my_button';

type ScheduleItemProps = {
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  iconUri: string;
  color: string;
  additionalInfo?: {
    text: string;
    count?: number;
  };
};

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  startTime,
  endTime,
  title,
  location,
  color,
  additionalInfo,
}) => {
  return (
    <View style={styles.scheduleItemContainer}>
      <View style={styles.timeContainer}>
        <MyButton
          icon={require('../assets/icons/right-arrow.png')}
          onPress={() => {}}
          style={styles.icon}
        />
        <View style={styles.iconWrapper}>
          <View style={styles.startTimeWrapper}>
            <Text>{startTime}</Text>
          </View>
          <View style={styles.endTimeWrapper}>
            <Text>{endTime}</Text>
          </View>
        </View>
      </View>
      <Divider
        height={50}
        direction="vertical"
        color={color}
        marginHorizontal={15}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, {color}]}>{title}</Text>
        </View>
        <View style={styles.detailsWrapper}>
          <View style={styles.locationWrapper}>
            <Text>{location}</Text>
          </View>
          {additionalInfo && (
            <View style={styles.additionalInfoWrapper}>
              <Divider
                height={15}
                color="black"
                thickness={0.5}
                marginHorizontal={6}
              />
              {additionalInfo.count && (
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{additionalInfo.count}</Text>
                </View>
              )}
              <View style={styles.additionalInfoTextWrapper}>
                <Text>{additionalInfo.text}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const MyComponent: React.FC = () => {
  const scheduleItems: ScheduleItemProps[] = [
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
    <>
      <ScheduleItem {...scheduleItems[0]} />
      <ScheduleItem {...scheduleItems[1]} />
    </>
  );
};

const styles = StyleSheet.create({
  scheduleItemContainer: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(235, 235, 245, 0.60)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 24,
  },
  timeContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontSize: 12,
    color: '#010618',
    fontWeight: '400',
  },
  iconWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  icon: {
    width: 18,
    aspectRatio: 1,
  },
  startTimeWrapper: {
    fontFamily: 'Inter, sans-serif',
  },
  endTimeWrapper: {
    textAlign: 'right',
    fontFamily: 'Inter, sans-serif',
  },
  contentContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginTop: 8,
  },
  titleWrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    fontWeight: '700',
  },
  detailsWrapper: {
    display: 'flex',
    marginTop: 4,
    flexDirection: 'row',
    fontSize: 12,
    fontWeight: '400',
  },
  locationWrapper: {
    color: '#21283F',
    fontFamily: 'Inter, sans-serif',
  },
  additionalInfoWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },

  countBadge: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#3083FD',
    borderRadius: 8,
    alignItems: 'center',
    width: 16,
    justifyContent: 'center',
    height: 16,
    marginRight: 4,
  },
  countText: {
    color: '#FFF',
    fontSize: 10,
  },
  additionalInfoTextWrapper: {
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
  },
});

export default MyComponent;
