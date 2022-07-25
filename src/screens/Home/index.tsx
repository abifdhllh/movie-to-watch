import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import HomeMovies from '@screens/Home/Movies';
import HomeTVShow from '@screens/Home/TVShow';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Colors} from '@utils/theme';

const TopTab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          textTransform: 'none',
          fontSize: hp('2%'),
          fontWeight: 'bold',
        },
        tabBarIndicatorContainerStyle: {
          marginHorizontal: wp('13%'),
          paddingHorizontal: wp('26%'),
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary,
        },
        swipeEnabled: false,
      }}>
      <TopTab.Screen
        name="HomeMovies"
        component={HomeMovies}
        options={{tabBarLabel: 'Movies'}}
      />
      <TopTab.Screen
        name="HomeTVShow"
        component={HomeTVShow}
        options={{tabBarLabel: 'TV Show'}}
      />
    </TopTab.Navigator>
  );
};

export default Home;
