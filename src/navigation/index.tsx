import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '@screens/Home';
import Search from '@screens/Search';
import {LOGO_WITH_TEXT} from '@utils/images';
import {Colors} from '@utils/theme';
import MovieDetail from '@screens/Movies';
import {RootStackParamList} from './types';
import TVShowDetail from '@screens/TVShow';
import List from '@screens/List';
import WatchList from '@screens/WatchList';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: 'center',
          tabBarActiveTintColor: Colors.primary,
          headerStyle: styles.headerBackgroundHome,
          headerTitle: () => (
            <FastImage
              source={LOGO_WITH_TEXT}
              style={styles.logoImage}
              resizeMode="stretch"
            />
          ),
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerBackgroundContainerStyle: styles.headerBackground,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchList}
        options={{
          headerBackgroundContainerStyle: styles.headerBackground,
          headerTitle: 'Watch List',
          tabBarLabel: 'Watch List',
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({color, size}) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabMenu">
        <Stack.Screen
          name="TabMenu"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="List"
          component={List}
          options={({route}) => ({title: route?.params?.title})}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{title: 'Movie Detail'}}
        />
        <Stack.Screen
          name="TVShowDetail"
          component={TVShowDetail}
          options={{title: 'TV Show Detail'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    height: hp('4%'),
    width: wp('22.5%'),
  },
  headerBackground: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 10,
    borderBottomWidth: 0.1,
  },
  headerBackgroundHome: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
});
