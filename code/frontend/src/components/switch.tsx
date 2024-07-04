import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

type TabProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

const Tab: React.FC<TabProps> = ({label, isActive, onPress}) => (
  <TouchableOpacity
    style={[styles.tab, isActive && styles.activeTab]}
    onPress={onPress}
    accessibilityRole="tab"
    accessibilityState={{selected: isActive}}>
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

type TabBarProps = {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
};

const TabBar: React.FC<TabBarProps> = ({tabs, activeTab, onTabPress}) => (
  <View style={styles.tabBarContainer}>
    <View style={styles.tabBar}>
      {tabs.map(tab => (
        <Tab
          key={tab}
          label={tab}
          isActive={tab === activeTab}
          onPress={() => onTabPress(tab)}
        />
      ))}
    </View>
  </View>
);

const Switch = ({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (tab: string) => void;
}) => {
  const handleTabPress = (tab: string) => {
    setTab(tab);
  };

  return (
    <View style={styles.container}>
      <TabBar
        tabs={['Subtasks', 'Reminders']}
        activeTab={tab}
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 15,
    fontSize: 14,
    textAlign: 'center',
    justifyContent: 'center',
  },
  tabBarContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 24,
    backgroundColor: 'rgba(235, 235, 245, 0.60)',
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  tabBar: {
    alignItems: 'stretch',
    borderRadius: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  activeTab: {
    backgroundColor: '#80B3FF',
    borderRadius: 24,
  },
  tabText: {
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '700',
  },
});

export default Switch;
