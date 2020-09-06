import { StatusBar } from 'expo-status-bar';
import React,  { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';

class Tienda extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            tienda:{
                pociones:[
                    {nombre:"Pocion Amarilla", cantidad: this.props.pocionAmarilla},
                    {nombre:"Pocion Azul", cantidad: this.props.pocionAmarilla},
                    {nombre:"Pocion Gris", cantidad: this.props.pocionAmarilla},
                    {nombre:"Pocion Roja", cantidad: this.props.pocionAmarilla},
                    {nombre:"Pocion Verde", cantidad: this.props.pocionAmarilla},
                ],
            },
            carrito:{
                pociones:[
                ],
            }
        }
    }

    componentDidMount() {
        localStorage.setItem("pociones", JSON.stringify([]));
    }

    obtenerListaPocionesTienda = () => {
        const pocionesEnTienda = this.state.tienda.pociones;
        const listado = pocionesEnTienda.find( (elemento) => elemento.cantidad > 0);
        return listado;
    }

    agregarPocion = (nombre) => {
        let encontrado = this.state.carrito.pociones.find(elemento => elemento.nombre === nombre);
        let almacen = this.state.tienda.pociones.find(elemento => elemento.nombre === nombre);
        let arregloCarrito = [];
        let arregloTienda = [];

        if(almacen.cantidad < 1) return;

        if(encontrado !== undefined){
            arregloTienda = this.state.tienda.pociones.map( (pocion) =>{
                if(pocion.nombre === nombre){
                    pocion.cantidad -= 1; 
                }
                return pocion;
            });

            arregloCarrito = this.state.carrito.pociones.map( (pocion) =>{
                if(pocion.nombre === nombre){
                    pocion.cantidad += 1; 
                }
                return pocion;
            });

            this.setState({
                tienda:{pociones: arregloTienda},
                carrito:{pociones: arregloCarrito}
            });
        }else{
            arregloCarrito.push(...this.state.carrito.pociones);
            arregloCarrito.push({nombre: nombre, cantidad: 1});
            arregloTienda = this.state.tienda.pociones.map( (pocion) =>{
                if(pocion.nombre === nombre){
                    pocion.cantidad -= 1; 
                }
                return pocion;
            });
            this.setState({
                carrito:{pociones: arregloCarrito},
                tienda:{pociones: arregloTienda}
            });
        }
    }

    eliminarPocion = (nombre) => {
        let encontrado = this.state.carrito.pociones.find(elemento => elemento.nombre === nombre);
        let arregloCarrito = [];
        let arregloTienda = [];

        if(encontrado.cantidad > 0){
            arregloTienda = this.state.tienda.pociones.map( (pocion) =>{
                if(pocion.nombre === nombre){
                    pocion.cantidad += 1; 
                }
                return pocion;
            });

            arregloCarrito = this.state.carrito.pociones.map( (pocion) =>{
                if(pocion.nombre === nombre){
                    pocion.cantidad -= 1; 
                }
                return pocion;
            });

            this.setState({
                tienda:{pociones: arregloTienda},
                carrito:{pociones: arregloCarrito}
            });
        }else{
            this.setState({
                carrito:{pociones: arregloCarrito},
                tienda:{pociones: arregloTienda}
            });
        }
    }

    mostrarBoton = () => {
        let aprobado = 0;
        this.state.carrito.pociones.map( (pocion) => {
            if(pocion.cantidad > 0){
                aprobado++;
            }
        });
        return (aprobado > 0) ? true : false;
    }

    realizarCompra = (e) => {
        e.preventDefault();
        localStorage.setItem("pociones", JSON.stringify(this.state.carrito.pociones));
        this.setState({
            carrito:{pociones: []},
        })
    }
    
    render() {
        return(
            <View>
                <Text style={estilos.texto}>Tienda:</Text>
                <View style={estilos.containerColumn}>
                    {
                        this.state.tienda.pociones.map((pocion, i) => {
                            if(pocion.cantidad > 0){
                                return(
                                    <View style={{width: 350, height: 40}} key={i}>
                                        <View  style={estilos.containerRow}>
                                            <Text style={estilos.texto}>{i + 1}.- {pocion.nombre}: {pocion.cantidad}</Text>
                                            <Button title="Agregar" color="blue" onPress={() => this.agregarPocion(pocion.nombre) } />
                                        </View>
                                    </View>
                                )
                            }else{
                                return(
                                    <View style={{width: 350, height: 40}} key={i}>
                                        <View  style={estilos.containerRow}>
                                            <Text style={estilos.texto}>{i + 1}.- {pocion.nombre}: (no disponible)</Text>
                                            <Button title="Agregar" color="blue" onPress={() => {} } disabled/>
                                        </View>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
                <Text style={estilos.texto}>Mi Carrito de Compras:</Text>
                <View style={estilos.containerColumn}>
                    {
                        this.state.carrito.pociones.map((pocion, i) => {
                            if(pocion.cantidad > 0){
                                return(
                                    <View style={{width: 350, height: 40}} key={i}>
                                        <View  style={estilos.containerRow}>
                                            <Text style={estilos.texto}>{pocion.nombre}: {pocion.cantidad}</Text>
                                            <Button title="Eliminar" color="#f194ff" onPress={ () => this.eliminarPocion(pocion.nombre) } />
                                        </View>
                                    </View>
                                )
                            }
                        })
                    }
                    <View style={estilos.container}>
                        {
                            this.mostrarBoton() && <Button title="Comprar" color="gray" onPress={this.realizarCompra} /> 
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    texto: {
        fontSize: 16,
        padding: 5
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
    padeo:{
        padding: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 0,
    },
});

export default Tienda;