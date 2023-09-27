import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingAbsolute = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        zIndex: 1,
      }}>
      <ActivityIndicator size="large" color={'skyblue'} />
    </View>
  );
};

export default LoadingAbsolute;
