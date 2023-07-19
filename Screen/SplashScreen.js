
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation,route}) => {
  const user = route.params.user;
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      // AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(
          user === null ? 'Auth' : 'DrawerNavigationRoutes'
        )
      // );
    }, 6000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Image/ReviewRewardFullLogo.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="black"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
    bottom:100
  },
});