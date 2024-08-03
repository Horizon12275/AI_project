import * as React from 'react';
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
  TextInput,
} from 'react-native';

function MealScreen() {
  return (
    <View style={styles.view1}>
      <View style={styles.view2}>
        <View style={styles.view3}>
          <View style={styles.view4}>
            <Text>New Schedule</Text>
          </View>
          <View style={styles.view5}>
            <Text>What would you like to eat?</Text>
          </View>
          <View style={styles.view6}>
            <TextInput placeholder='Type here'></TextInput>
          </View>
          <Image
            resizeMode="contain"
            source={{
              uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8a22599af180462164ba2b19c0ffd19af420e81a457093d02ca679f507bd7a88?apiKey=9e661a5e0ad74c878ca984d592b3752c&&apiKey=9e661a5e0ad74c878ca984d592b3752c',
            }}
            style={styles.image1}
          />
        </View>
        <View style={styles.view7} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    minHeight: 611,
    maxWidth: 390,
    flexDirection: 'column',
    alignItems: 'stretch',
    fontFamily: 'Inter, sans-serif',
    color: 'rgba(33, 40, 63, 1)',
    fontWeight: '400',
    justifyContent: 'flex-start',
  },
  view2: {
    position: 'relative',
    display: 'flex',
    minHeight: 611,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',

  },
  view3: {
    position: 'relative',
    zIndex: 0,
    display: 'flex',
    minHeight: 308,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: "flex-start",
    marginTop: 50,
  },
  view4: {
    color: '#010618',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'stretch',
    zIndex: 0,
  },
  view5: {
    position: 'absolute',
    minHeight: 164,
    maxWidth: '100%',
    textAlign: 'center',
    bottom: 30,
    height: 164,
    
  },
  view6: {
    fontSize: 16,

  },
  image1: {
    position: 'absolute',
    zIndex: 0,
    display: 'flex',
    maxWidth: '100%',
    left: 26,
    bottom: 47,
    height: 20,
    aspectRatio: '0.05',
  },
  view7: {
    position: 'absolute',
    zIndex: 0,
    display: 'flex',
    minHeight: 70,
    width: 167,
    maxWidth: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
    left: 11,
  },
});

export default MealScreen;