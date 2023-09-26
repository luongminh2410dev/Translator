/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AppContainer from '@app/navigators/AppNavigator';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const App = () => {
  return (
    <View style={styles.container}>
      <SafeAreaProvider style={{backgroundColor: '#FFF'}}>
        <SafeAreaView edges={['top']} style={styles.container}>
          <AppContainer />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
