import React from 'react';
import { View, Text, useWindowDimensions, Animated } from 'react-native';

export const toastConfig = {
  success: ({ text1, text2 }) => {
    const { width } = useWindowDimensions();

    return (
      <Animated.View
        style={{
          width: width - 20,
          marginHorizontal: 10,
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 4,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          overflow: 'hidden',
        }}
      >
        {/* LEFT THIN GREEN BAR */}
        <View
          style={{
            width: 6,
            backgroundColor: '#4BB543', // success green
          }}
        />

        {/* CONTENT */}
        <View style={{ padding: 10, flex: 1 }}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>
            {text1}
          </Text>
          {text2 ? (
            <Text style={{ color: '#000', opacity: 0.8, fontSize: 12 }}>
              {text2}
            </Text>
          ) : null}
        </View>
      </Animated.View>
    );
  },

  error: ({ text1, text2 }) => {
    const { width } = useWindowDimensions();

    return (
      <Animated.View
        style={{
          width: width - 20,
          marginHorizontal: 10,
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 10,
          elevation: 4,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          overflow: 'hidden',
        }}
      >
        {/* LEFT THIN RED BAR */}
        <View
          style={{
            width: 6,
            backgroundColor: '#D9534F', // error red
          }}
        />

        {/* CONTENT */}
        <View style={{ padding: 10, flex: 1 }}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>
            {text1}
          </Text>
          {text2 ? (
            <Text style={{ color: '#000', opacity: 0.8, fontSize: 12 }}>
              {text2}
            </Text>
          ) : null}
        </View>
      </Animated.View>
    );
  },
};
