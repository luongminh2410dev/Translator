// In App.js in a new project

import HomeScreen from '@app/screens/Home';
import SelectLanguage from '@app/screens/SelectLanguage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import Router from './Router';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Router.HOME}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Router.HOME} component={HomeScreen} />
        <Stack.Screen
          name={Router.SELECT_LANGUAGE}
          component={SelectLanguage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
