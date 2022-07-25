import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

// Navigation
import AppNavigation from './src/navigation';

// Redux
import {Provider} from 'react-redux';
import {store} from './src/store';

// Style
import {Colors} from './src/utils/theme';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <AppNavigation />
    </Provider>
  );
};

export default App;
