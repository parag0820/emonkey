import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TrendingScreen from '../screens/TrendingScreen';
import B2BScreen from '../screens/B2BScreen';
import NewsScreen from '../screens/NewsScreen';
import Settings from '../screens/Settings';
import AboutUs from '../screens/AboutUs';
import Listing from '../screens/Listing';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TermsAndConditions from '../screens/TermsAndConditions';
import Notification from '../screens/Notification';
import Favourites from '../screens/Favourites';
import Transactions from '../screens/Transactions';
import RateUs from '../screens/RateUs';
import HelpSupport from '../screens/HelpSupport';
import AutoMobiles from '../screens/AutoMobiles';
import Machinery from '../screens/Machinery';
import Electronics from '../screens/Electronics';
import TourTravel from '../screens/TourTravel';
import Fashion from '../screens/Fashion';
import Education from '../screens/Education';
import MoreHome from '../screens/MoreHome';
import FoodListing from '../screens/FoodListing';
import Subscription from '../screens/Subscription';
import MyProfile from '../screens/MyProfile';
import Careers from '../screens/Careers';
import ProductGroup from '../screens/ProductGroup';

const Stack = createStackNavigator();

export default function MainScreens({ route }) {
  const defaultScreen = route?.params?.defaultScreen || 'HomeScreen';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {defaultScreen === 'HomeScreen' && (
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      )}
      {defaultScreen === 'Trending' && (
        <Stack.Screen name="Trending" component={TrendingScreen} />
      )}
      {defaultScreen === 'B2BScreen' && (
        <Stack.Screen name="B2BScreen" component={B2BScreen} />
      )}
      {defaultScreen === 'NewsScreen' && (
        <Stack.Screen name="NewsScreen" component={NewsScreen} />
      )}

      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: true, title: 'Privacy Policy' }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ headerShown: true, title: 'About Us' }}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{ headerShown: true, title: 'Subscription' }}
      />
      <Stack.Screen
        name="Careers"
        component={Careers}
        options={{ headerShown: true, title: 'Careers' }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsAndConditions}
        options={{
          headerShown: 'TermsAndConditions',
          title: 'Terms & Conditions',
        }}
      />
      <Stack.Screen
        name="Listing"
        component={Listing}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="MoreHome" component={MoreHome} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ headerShown: true, title: 'Profile' }}
      />
      <Stack.Screen
        name="ProductGroup"
        component={ProductGroup}
        options={{ headerShown: true, title: 'Product Group' }}
      />
      <Stack.Screen
        name="AutoMobiles"
        component={AutoMobiles}
        options={{ headerShown: true, title: 'Auto Mobiles' }}
      />
      <Stack.Screen
        name="Machinery"
        component={Machinery}
        options={{ headerShown: true, title: 'Machinery' }}
      />
      <Stack.Screen
        name="Electronics"
        component={Electronics}
        options={{ headerShown: true, title: 'Electronics' }}
      />
      <Stack.Screen
        name="TourTravel"
        component={TourTravel}
        options={{ headerShown: true, title: 'TourTravel' }}
      />
      <Stack.Screen
        name="Fashion"
        component={Fashion}
        options={{ headerShown: true, title: 'Fashion' }}
      />
      <Stack.Screen
        name="Education"
        component={Education}
        options={{ headerShown: true, title: 'Education' }}
      />
      <Stack.Screen
        name="Favourites"
        component={Favourites}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="RateUs"
        component={RateUs}
        options={{ headerShown: true, title: 'Reviews' }}
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupport}
        options={{ headerShown: true, title: 'Help & Support' }}
      />
      <Stack.Screen
        name="Food"
        component={FoodListing}
        options={{ headerShown: true, title: 'Food Listing' }}
      />
    </Stack.Navigator>
  );
}
