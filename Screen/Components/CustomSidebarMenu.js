
import React from 'react';
import {View, Text, Alert, StyleSheet, Image} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSidebarMenu = (props) => {
  
  // const { user } = route.params;

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
      <Image
                source={require('../../Image/ReviewRewardFullLogo.png')}
                style={{
                  width: '100%',
                  height: 150,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={() => 
            <Text style={{color: 'black'}}>
              Logout
            </Text>
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: async () => {
                    try{
                    const response = await fetch('http://192.168.1.118:5556/logout', {
                      method: 'DELETE'
                    })
                      .then( async r => {
                       
                        if (r.ok) {
                          // Logout successful
                          console.log("hello")
                          // props.setUser(null)
                          navigation.navigate('App')
                          console.log('Logout successful');
                          // Perform any additional logout actions (e.g., clear user data, navigate to login screen)
                        } else {
                          // Logout failed
                          console.log('Logout failed');
                          // Handle the error or display an error message
                        }
                      })
                    }
                      catch(error) {
                        console.error('Error:', error);
                        // Handle the error or display an error message
                      };
                  },
                }
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 15,
    textAlign: 'center',
    alignItems:"center",
    alignContent:'center',
    justifyContent:"center"
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: 'black',
    marginTop: 15,
  },
});