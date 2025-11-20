import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabScreens from './BottomTabScreens';
import UserAuth from './UserAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

// Import your full-screen pages
import Settings from '../screens/Settings';
import MyProfile from '../screens/MyProfile';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedLogin = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(storedLogin === 'true');
      } catch (error) {
        console.log('Error checking login:', error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Auth">
            {props => <UserAuth {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <>
            {/* 👇 Tabs live inside their own screen */}
            <Stack.Screen name="MainTabs">
              {props => (
                <BottomTabScreens {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>

            {/* 👇 These appear *above* the tabs (tabs hidden) */}
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: true, title: 'Settings' }}
            />
            <Stack.Screen
              name="MyProfile"
              component={MyProfile}
              options={{ headerShown: true, title: 'My Profile' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import BottomTabScreens from './BottomTabScreens';
// import UserAuth from './UserAuth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ActivityIndicator, View } from 'react-native';

// const Stack = createStackNavigator();

// export default function RootNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading state

//   // ✅ Check login state when app starts
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const storedLogin = await AsyncStorage.getItem('isLoggedIn');
//         if (storedLogin === 'true') {
//           setIsLoggedIn(true);
//         } else {
//           setIsLoggedIn(false);
//         }
//       } catch (error) {
//         console.log('Error checking login:', error);
//         setIsLoggedIn(false);
//       }
//     };
//     checkLoginStatus();
//   }, []);
//   if (isLoggedIn === null) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: '#fff',
//         }}
//       >
//         <ActivityIndicator size="large" color="#000" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {!isLoggedIn ? (
//           <Stack.Screen name="Auth">
//             {props => <UserAuth {...props} setIsLoggedIn={setIsLoggedIn} />}
//           </Stack.Screen>
//         ) : (
//           <Stack.Screen name="MainTabs">
//             {props => (
//               <BottomTabScreens {...props} setIsLoggedIn={setIsLoggedIn} />
//             )}
//           </Stack.Screen>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Handshake from 'react-native-vector-icons/FontAwesome5';
// import HomeScreen from '../screens/HomeScreen';
// import TrendingScreen from '../screens/TrendingScreen';
// import B2BScreen from '../screens/B2BScreen';
// import NewsScreen from '../screens/NewsScreen';
// import Settings from '../screens/Settings';
// import TermsAndConditions from '../screens/TermsAndConditions';
// import PrivacyPolicy from '../screens/PrivacyPolicy';
// import AboutUs from '../screens/AboutUs';
// import Listing from '../screens/Listing'; // ✅ added missing import
// import Notification from '../screens/Notification';
// import Transactions from '../screens/Transactions';
// import Favourites from '../screens/Favourites';
// import Login from '../screens/Login';
// import SignUp from '../screens/SignUp';
// import HelpSupport from '../screens/HelpSupport';
// import RateUs from '../screens/RateUs';
// import More from '../modals/More';

// const Stack = createStackNavigator();
// const Bottom = createBottomTabNavigator();

// function UserAuth() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//     </Stack.Navigator>
//   );
// }

// function MainScreens({ route }) {
//   const defaultScreen = route?.params?.defaultScreen || 'HomeScreen';

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {defaultScreen === 'HomeScreen' && (
//         <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       )}
//       {defaultScreen === 'Trending' && (
//         <Stack.Screen name="Trending" component={TrendingScreen} />
//       )}
//       {defaultScreen === 'B2BScreen' && (
//         <Stack.Screen name="B2BScreen" component={B2BScreen} />
//       )}
//       {defaultScreen === 'NewsScreen' && (
//         <Stack.Screen name="NewsScreen" component={NewsScreen} />
//       )}

//       {/* Other screens remain accessible */}
//       <Stack.Screen name="Settings" component={Settings} />
//       <Stack.Screen
//         name="Notification"
//         component={Notification}
//         options={{ headerShown: true, title: 'Notification' }}
//       />
//       <Stack.Screen
//         name="PrivacyPolicy"
//         component={PrivacyPolicy}
//         options={{ headerShown: true, title: 'Privacy Policy' }}
//       />
//       <Stack.Screen
//         name="AboutUs"
//         component={AboutUs}
//         options={{ headerShown: true, title: 'About Us' }}
//       />
//       <Stack.Screen
//         name="Terms"
//         component={TermsAndConditions}
//         options={{ headerShown: true }}
//       />
//       <Stack.Screen
//         name="Listing"
//         component={Listing}
//         options={{ headerShown: true }}
//       />
//       <Stack.Screen
//         name="Transactions"
//         component={Transactions}
//         options={{ headerShown: true }}
//       />
//       <Stack.Screen
//         name="RateUs"
//         component={RateUs}
//         options={{ headerShown: true }}
//       />
//       <Stack.Screen
//         name="Favourites"
//         component={Favourites}
//         options={{ headerShown: true }}
//       />
//       <Stack.Screen
//         name="HelpSupport"
//         component={HelpSupport}
//         options={{ headerShown: true }}
//       />
//       <Stack.Screen name="Auth" component={UserAuth} />
//       {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
//     </Stack.Navigator>
//   );
// }

// function BottomTabScreens({ navigation }) {
//   const [moreVisible, setMoreVisible] = useState(false);

//   const openMore = () => setMoreVisible(true);
//   const closeMore = () => setMoreVisible(false);

//   return (
//     <>
//       <Bottom.Navigator
//         initialRouteName="Home"
//         screenOptions={({ route }) => ({
//           tabBarActiveTintColor: '#8C1212',
//           tabBarInactiveTintColor: 'gray',
//           tabBarStyle: { height: 60, paddingBottom: 5 },
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => {
//             if (route.name === 'B2B') {
//               return <Handshake name="handshake" color={color} size={size} />;
//             }

//             let iconName;
//             switch (route.name) {
//               case 'Home':
//                 iconName = 'home';
//                 break;
//               case 'Trending':
//                 iconName = 'analytics-outline';
//                 break;
//               case 'News':
//                 iconName = 'newspaper-outline';
//                 break;
//               case 'More':
//                 iconName = 'list';
//                 break;
//               default:
//                 iconName = 'help-outline';
//             }

//             return <Icon name={iconName} size={size} color={color} />;
//           },
//         })}
//       >
//         <Bottom.Screen
//           name="Home"
//           component={MainScreens}
//           initialParams={{ defaultScreen: 'HomeScreen' }}
//         />
//         <Bottom.Screen
//           name="Trending"
//           component={MainScreens}
//           initialParams={{ defaultScreen: 'Trending' }}
//         />
//         <Bottom.Screen
//           name="B2B"
//           component={MainScreens}
//           initialParams={{ defaultScreen: 'B2BScreen' }}
//         />
//         <Bottom.Screen
//           name="News"
//           component={NewsScreen}
//           initialParams={{ defaultScreen: 'News' }}
//         />
//         <Bottom.Screen
//           name="More"
//           component={() => null}
//           listeners={{
//             tabPress: e => {
//               e.preventDefault();
//               openMore();
//             },
//           }}
//         />
//       </Bottom.Navigator>

//       {/* Custom Modal at Bottom */}
//       <More
//         visible={moreVisible}
//         onClose={closeMore}
//         options={[
//           {
//             label: 'History',
//             onPress: () => navigation.navigate('AboutUs'),
//           },
//           { label: 'Subscribe', onPress: () => console.log('Go to subscribe') },
//           { label: 'Lists', onPress: () => navigation.navigate('Listing') },
//         ]}
//       />
//     </>
//   );
// }

// export default function RootNavigator() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Control login state

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {!isLoggedIn ? (
//           // ✅ Show Auth stack if not logged in
//           <Stack.Screen name="Auth">
//             {props => <UserAuth {...props} setIsLoggedIn={setIsLoggedIn} />}
//           </Stack.Screen>
//         ) : (
//           // ✅ Show main bottom tabs if logged in
//           <Stack.Screen name="MainTabs" component={BottomTabScreens} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   backdrop: {
//     flex: 1,
//     backgroundColor: '#00000088',
//   },
//   modalContainer: {
//     backgroundColor: '#f5f5f5',
//     paddingVertical: 20,
//     borderRadius: 10,
//     // borderTopRightRadius: 20,
//     position: 'absolute',
//     bottom: 0,

//     width: '100%',
//     marginBottom: '10%',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   optionButton: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 10,
//     borderWidth: 0.5,
//     borderColor: '#000',
//     width: '25%',
//     alignItems: 'center',
//   },
//   optionText: {
//     color: '#333',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import TrendingScreen from '../screens/TrendingScreen';
// import B2BScreen from '../screens/B2BScreen';
// import NewsScreen from '../screens/NewsScreen';
// import MoreScreen from '../screens/MoreScreen';
// import Icon from 'react-native-vector-icons/Ionicons';
// import Handshake from 'react-native-vector-icons/FontAwesome5';
// import Settings from '../screens/Settings';
// import TermsAndConditions from '../screens/TermsAndConditions';
// import PrivacyPolicy from '../screens/PrivacyPolicy';
// import AboutUs from '../screens/AboutUs';

// const Stack = createStackNavigator();
// const Bottom = createBottomTabNavigator();
// const Drawer = createDrawerNavigator(); // Kept for completeness, but not used in the initial tabs setup

// function MainScreens() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="homeBottom" component={HomeScreen} />
//       <Stack.Screen name="Settings" component={Settings} />
//       <Stack.Screen
//         name="PrivacyPolicy"
//         component={PrivacyPolicy}
//         options={{ headerShown: true, title: 'Privacy Policy' }}
//       />
//       <Stack.Screen
//         name="AboutUs"
//         component={AboutUs}
//         options={{ headerShown: true, title: 'About Us' }}
//       />
//       <Stack.Screen
//         name="Terms"
//         component={TermsAndConditions}
//         options={{ headerShown: true, title: 'Terms and Conditions' }}
//       />
//     </Stack.Navigator>
//   );
// }

// // 1. Define the Bottom Tab Navigator component
// function BottomTabScreens() {
//   return (
//     <Bottom.Navigator
//       initialRouteName="Home"
//       screenOptions={({ route }) => ({
//         tabBarActiveTintColor: '#8C1212',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: { height: 60, paddingBottom: 5 },
//         headerShown: false,
//         tabBarIcon: ({ color, size }) => {
//           // Use Lucide only for B2B
//           if (route.name === 'B2B') {
//             return <Handshake name={'handshake'} color={color} size={size} />;
//           }

//           // Otherwise, use Vector Icon
//           let iconName;
//           switch (route.name) {
//             case 'Home':
//               iconName = 'home';
//               break;
//             case 'Trending':
//               iconName = 'analytics-outline';
//               break;
//             case 'News':
//               iconName = 'newspaper-outline';
//               break;
//             case 'More':
//               iconName = 'list';
//               break;
//             default:
//               iconName = 'help-outline';
//           }

//           return <Icon name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Bottom.Screen name="Home" component={MainScreens} />
//       <Bottom.Screen name="Trending" component={TrendingScreen} />
//       <Bottom.Screen name="B2B" component={B2BScreen} />
//       <Bottom.Screen name="News" component={NewsScreen} />
//       <Bottom.Screen name="More" component={MoreScreen} />
//     </Bottom.Navigator>
//   );
// }

// // 2. Define the Root Navigator (Stack)
// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false, // Hide the header for the main stack container
//         }}
//       >
//         {/* The entire BottomTabScreens component is the initial screen in the stack */}
//         <Stack.Screen name="MainTabs" component={BottomTabScreens} />

//         {/* You can add other screens here that need to be pushed on top of the tabs */}
//         {/* <Stack.Screen name="Details" component={DetailScreen} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
