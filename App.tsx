import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// Navigation
import AppNavigation from './src/navigation';

// Style
import {Colors} from './src/utils/theme';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <AppNavigation />
    </>
  );
};

export default App;
