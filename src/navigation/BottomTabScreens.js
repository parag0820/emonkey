import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Handshake from 'react-native-vector-icons/FontAwesome5';
import MainScreens from './MainScreens';
import NewsScreen from '../screens/NewsScreen';
import More from '../modals/More';

const Bottom = createBottomTabNavigator();

export default function BottomTabScreens({ navigation, setIsLoggedIn }) {
  const [moreVisible, setMoreVisible] = useState(false);

  const openMore = () => setMoreVisible(true);
  const closeMore = () => setMoreVisible(false);

  return (
    <>
      <Bottom.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#8C1212',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60, paddingBottom: 5 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'B2B')
              return <Handshake name="handshake" color={color} size={size} />;

            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Trending':
                iconName = 'analytics-outline';
                break;
              case 'News':
                iconName = 'newspaper-outline';
                break;
              case 'More':
                iconName = 'list';
                break;
              default:
                iconName = 'help-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Bottom.Screen
          name="Home"
          component={MainScreens}
          initialParams={{ defaultScreen: 'HomeScreen' }}
        />
        <Bottom.Screen
          name="Trending"
          component={MainScreens}
          initialParams={{ defaultScreen: 'Trending' }}
        />
        <Bottom.Screen
          name="B2B"
          component={MainScreens}
          initialParams={{ defaultScreen: 'B2BScreen' }}
        />
        <Bottom.Screen name="News" component={NewsScreen} />
        {/* <Bottom.Screen
          name="More"
          component={() => null}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              openMore();
            },
          }}
        /> */}
      </Bottom.Navigator>

      {/* Custom More Modal */}
      <More
        visible={moreVisible}
        onClose={closeMore}
        options={[
          {
            label: 'History',
            onPress: () => navigation.navigate('Notification'),
          },
          {
            label: 'Subscribe',
            onPress: () => console.log('Subscribe pressed'),
          },
          //   { label: 'Lists', onPress: () => navigation.navigate('Listing') },
          { label: 'Logout', onPress: () => setIsLoggedIn(false) },
        ]}
      />
    </>
  );
}
