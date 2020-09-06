import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Mundo from "./components/Mundo";

export default function App(){
  return (
    <Mundo
      pocionAmarilla={999}
      pocionAzul={999}
      pocionGris={1000}
      pocionRoja={1000}
      pocionVerde={1000}
    />
  );
}