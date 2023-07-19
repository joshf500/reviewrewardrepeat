
import 'react-native-gesture-handler';

// Import React and Component
import React,{useState, useEffect} from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Import Screens
import SplashScreen from './Screen/SplashScreen'
import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import DrawerNavigationRoutes from './Screen/DrawerNavigationRoutes';

const Stack = createStackNavigator();

const Auth = ({onLogin}) => {
  // Stack Navigator for Login and Sign up Screen

  // const [user, setUser] = useState(null);
  
  // useEffect(() => {
  //   // auto-login
  //   fetch("http://192.168.1.118:5556:5556:5556:5556:5556:5556:5556:5556:5556:5556/check_session").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        initialParams={{onLogin}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Sign Up!', //Set Header Title
          headerStyle: {
            backgroundColor: 'lightgreen', //Set Header color
          },
          headerTintColor: 'black', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // auto-login
    fetch("http://192.168.1.118:5556/check_session").then((r) => {
      if (r.ok) {
        console.log(r)
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  

  if (!user) return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
          name="Auth"
          options={{headerShown: false}}
          // initialParams={()=>onLogin={setUser}
          >
            {()=><Auth onLogin={setUser}/>}
          </Stack.Screen>  
        </Stack.Navigator>
      </NavigationContainer>
  )
  //   // Define your login logic here
  //   console.log('User logged in');
  // };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          initialParams={{ user }}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        
        {/* Auth Navigator: Include Login and Signup */}
        {/* <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
          onLogin={setUser}
        /> */}
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          // component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
          user={{user}}
          setUser={{setUser}}
        >
          {()=><DrawerNavigationRoutes user={user}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;