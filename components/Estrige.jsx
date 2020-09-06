import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Estrige extends Component {
    
    constructor(props){
        super(props);
        this.state ={
            salud: 100
        };
    }

    actualizarEstado = () => {
        var danoEstrige = JSON.parse(localStorage.getItem('danoEstrige'));
        var calculo = this.state.salud - parseInt(danoEstrige);
        if(calculo < 0){
            calculo = 0;
        }
        this.setState({ salud: calculo });
        localStorage.setItem("danoEstrige", JSON.stringify(0));
    }
    
    render() {
        return (
            <View>
                <Text style={estilos.titleText}>Estrige:</Text>
                <View style={estilos.containerColumn}>
                    <Text style={estilos.texto}>Salud:</Text>
                    {
                        this.state.salud > 0 && <Text style={estilos.texto}><h1>{this.state.salud}%</h1></Text>
                    }
                    {
                        this.state.salud <= 0 && <Text style={estilos.texto}><h1>0% (Ha muerto)</h1></Text>
                    }
                    <Button title="Actualizar" color="blue" onPress={this.actualizarEstado} />
                </View>
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    baseText: {
      fontFamily: "Cochin"
    },
    texto: {
        fontSize: 16,
        padding: 5
    },
    containerColumn: {
        flex: 1,
        flexDirection: 'column',
        padding: 1,
        backgroundColor: "pearl"
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    }
});

export default Estrige;