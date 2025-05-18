/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './ToDoList/Home';
import { ScrollView } from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Home />
    </ScrollView>
  );
};

export default App;