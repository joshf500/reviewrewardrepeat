

// Import React
import React from 'react';

// Import Navigators from React Navigation

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import ReviewsAndRewardsScreen from './DrawerScreens/ReviewsAndRewardsScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation, user}) => {
  // const user = route.params?.user;
  return (
    <Stack.Navigator 
    initialRouteName="HomeScreen"
    screenOptions={{
      headerStyle: {
        backgroundColor: 'black', //Set Header color
      },
      headerTintColor: 'lightgreen', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      }}>
    
      <Stack.Screen
        name="HomeScreen"
        initialParams={{user}}
        component={HomeScreen}
        options={({navigation})=>({
          title: `Submit a review, ${user.first_name}!`, //Set Header Title
          headerLeft: () => 
            <NavigationDrawerHeader navigationProps={navigation} />
        })}
      />
        {/* {() => <HomeScreen user={user} />}
      </Stack.Screen> */}
    </Stack.Navigator>
  );
};

const ReviewsAndRewardsScreenStack = ({navigation,user}) => {
  return (
    <Stack.Navigator
      initialRouteName="ReviewsAndRewardsScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'lightgreen', //Set Header color
        },
        headerTintColor: 'black', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>

      <Stack.Screen
        name="ReviewsAndRewards"
        initialParams={{user}}
        component={ReviewsAndRewardsScreen}
        options={({navigation})=>({
          title: `${user.first_name}'s Rewards!`, //Set Header Title
          headerLeft: () => 
            <NavigationDrawerHeader navigationProps={navigation} />
        })}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigationRoutes = ({ navigation, user, setUser,...props}) => {
  // const user = route.params?.user;
  return (
    <Drawer.Navigator
    initialRouteName="CustomSidebarMenu"
    screenOptions={{
        activeTintColor: 'white',
        color: 'white',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: 'white',
        },
        headerShown:false
      }}
      // component={CustomSidebarMenu}
      drawerContent={CustomSidebarMenu}
      // drawerContent={() => (
      //   <CustomSidebarMenu user={user} setUser={setUser} navigation={navigation}/>
      //  )}
      // initialParams={{user}}

     
      >
        
      
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Leave a review!'}}
        // component={()=><HomeScreenStack user={user}/>}
      >
        {()=><HomeScreenStack user={user}/>}
      </Drawer.Screen>
      
      <Drawer.Screen
        name="ReviewsAndRewardsScreen"
        options={{drawerLabel: 'See Rewards!'}}
        >
        {()=><ReviewsAndRewardsScreenStack user={user}/>}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigationRoutes;