import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastConfig';

export default function App() {
  return (
    <>
      <RootNavigator />
      <Toast config={toastConfig} />
    </>
  );
}
