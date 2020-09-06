import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Tienda from "./Tienda";
import Inventario from "./Inventario";
import Estrige from "./Estrige";

class Mundo extends Component {
    
    constructor(props){
        super(props);
    }
    
    render() {
      const { pocionAmarilla,pocionAzul,pocionGris,pocionRoja,pocionVerde } = this.props;
        return(
          <View>
            <Text><h1>Idukay Demo</h1></Text>
            <Text><h6>Jorge Hern&aacute;ndez, Correo: jorgehc0429@gmail.com, Github: <a href="https://github.com/jorgehc1">aqui</a></h6></Text>
            <View style={estilos.containerRow}>
              <View style={{width: 500, height: 300, backgroundColor: 'powderblue', padding: 4}}>
                <Tienda pocionAmarilla={pocionAmarilla} pocionAzul={pocionAzul} pocionGris={pocionGris} pocionRoja={pocionRoja} pocionVerde={pocionVerde} />
              </View>
              <View style={{width: 500, height: 300, backgroundColor: 'powderblue', padding: 4}}>
                <Inventario />
              </View>
              <View style={{width: 500, height: 300, backgroundColor: 'powderblue', padding: 4}}>
                <Estrige />
              </View>
            </View>
            <StatusBar style="auto" />
          </View>
        );
    }
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    backgroundColor: "#eaeaea"
  },  
  containerColumn: {
    flex: 1,
    flexDirection: 'column',
    padding: 1,
    backgroundColor: "green"
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Mundo;