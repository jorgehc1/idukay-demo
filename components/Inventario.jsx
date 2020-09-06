import { StatusBar } from 'expo-status-bar';
import React, {Component, useEffect} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Inventario extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            inventario:{
                pociones: []
            },
            ataques:{
                pociones: []
            }
        }
    }

    sumarItemsIguales = () => {
        var compras = JSON.parse(localStorage.getItem('pociones'));
        return this.state.inventario.pociones.map( (pocion) =>{
            for(var i=0; i< compras.length; i++){
                if(pocion.nombre === compras[i].nombre){
                    pocion.cantidad += compras[i].cantidad;
                }
            }
            return pocion;
        });
    }

    detectarItemInexistente = (arreglos) => {
        var compras = JSON.parse(localStorage.getItem('pociones'));
        var union = [];
        const encontrar = arreglos.find( (elemento) => {
            for(var i=0; compras.length; i++){
                return elemento.nombre === compras[i].nombre;
            }
        });

        if(encontrar === undefined){
            union = [...arreglos, ...compras];
        }else{
            union = [...arreglos];
        }

        return union;
    }

    eliminarDelInventario = (ataques,cantidad) => {
        return this.state.inventario.pociones.map( (pocion) =>{
            for(var i=0; i< cantidad; i++){
                if(pocion.nombre === ataques[i].nombre){
                    pocion.cantidad -= ataques[i].cantidad;
                }
            }
            return pocion;
        });
    }

    mostrarBotonAtacar = () => {
        if(this.state.ataques.pociones.length > 0){
            return true;
        }else{
            return false;
        }
    }

    prepararAtaques = (nombre) => {
        const ataques = this.state.ataques.pociones;
        var pocionAgregar = {nombre: nombre, cantidad: 1};

        const encontrar = ataques.find( (elemento) => {
            for(var i=0; ataques.length; i++){
                return elemento.nombre === ataques[i].nombre;
            }
        });

        if(ataques.length > 0){
            const encontrar = ataques.find( (elemento) => {
                return elemento.nombre === nombre;
            });
            if(encontrar === undefined){
                this.setState({
                    ataques:{pociones:[...ataques, pocionAgregar],
                }});
            }else{
                alert("Solo esta permitido elaborar una estrategia de ataque con pociones distintas");
            }
        }else{
            this.setState({
                ataques:{pociones:[...ataques, pocionAgregar],
            }});
        }

    }

    actualizarTodo = (e) => {
        e.preventDefault();
        var compras = JSON.parse(localStorage.getItem('pociones'));
        var arreglos = [];
        var nuevo = [];

        if(compras.length > 0){
            if(this.state.inventario.pociones.length > 0){    
                arreglos = this.sumarItemsIguales();
                nuevo = this.detectarItemInexistente(arreglos);
                this.setState({inventario:{pociones: nuevo}});
                localStorage.setItem("pociones", "[]");
            }else{
                this.setState({inventario:{pociones: compras}});
                localStorage.setItem("pociones", "[]");   
            }
        }
    }

    causarDanoEstrige = (porcentajeDano) => {
        localStorage.setItem("danoEstrige", JSON.stringify(porcentajeDano));
    }

    ejecutarAtaques = (e) => {
        e.preventDefault();
        const ataques = this.state.ataques.pociones;
        const cantidad = this.state.ataques.pociones.length;
        var pociones = [];
        var inventario = [];

        for(var i=0; i< cantidad; i++){
            pociones.push(this.state.ataques.pociones[i].nombre);
        }
        pociones = pociones.join(" y ");

        switch(cantidad){
            case 1:
                var autorizar = prompt(`Has decidido usar la pocion "${pociones}" y causaras un 3% de dano al Estrige. Escriba "si" para continuar?`, "");
                if(autorizar === "si"){
                    this.causarDanoEstrige(3);
                    inventario = this.eliminarDelInventario(ataques,cantidad);
                    this.setState({
                        ataques:{pociones:[]},
                        inventario:{pociones: inventario} 
                    });
                }
                break;
            case 2:
                var autorizar = prompt(`Has decidido usar la pociones "${pociones}" y causaras un 5% de dano al Estrige. Escriba "si" para continuar?`, "");
                if(autorizar === "si"){
                    this.causarDanoEstrige(5);
                    inventario = this.eliminarDelInventario(ataques,cantidad);
                    this.setState({
                        ataques:{pociones:[]},
                        inventario:{pociones: inventario} 
                    });
                }
                break;
            case 3:
                var autorizar = prompt(`Has decidido usar la pociones "${pociones}" y causaras un 10% de dano al Estrige. Escriba "si" para continuar?`, "");
                if(autorizar === "si"){
                    this.causarDanoEstrige(10);
                    inventario = this.eliminarDelInventario(ataques,cantidad);
                    this.setState({
                        ataques:{pociones:[]},
                        inventario:{pociones: inventario} 
                    });
                }
                break;
            case 4:
                var autorizar = prompt(`Has decidido usar la pociones "${pociones}" y causaras un 20% de dano al Estrige. Escriba "si" para continuar?`, "");
                if(autorizar === "si"){
                    this.causarDanoEstrige(20);
                    inventario = this.eliminarDelInventario(ataques,cantidad);
                    this.setState({
                        ataques:{pociones:[]},
                        inventario:{pociones: inventario} 
                    });
                }
                break;
            case 5:
                var autorizar = prompt(`Has decidido usar la pociones "${pociones}" y causaras un 25% de dano al Estrige. Escriba "si" para continuar?`, "");
                if(autorizar === "si"){
                    this.causarDanoEstrige(25);
                    inventario = this.eliminarDelInventario(ataques,cantidad);
                    this.setState({
                        ataques:{pociones:[]},
                        inventario:{pociones: inventario} 
                    });
                }
                break;
            default:
        }
    }
    
    render() {
        if(this.state.inventario.pociones.length > 0){
            return(
                <View>
                    <Text style={estilos.texto}>Mi Inventario:</Text>
                    <Button title="Actualizar" color="blue" onPress={this.actualizarTodo} />
                    <View style={estilos.containerColumn}>
                    {
                        this.state.inventario.pociones.map( (pocion, i) => {
                            if(pocion.cantidad > 0){
                                return(
                                    <View style={{width: 350, height: 40}} key={i}>
                                        <View  style={estilos.containerRow}>
                                            <Text style={estilos.texto}>{i + 1}.- {pocion.nombre}: {pocion.cantidad}</Text>
                                            <Button title="LANZAR" color="blue" onPress={ () => this.prepararAtaques(pocion.nombre) } />
                                        </View>
                                    </View>
                                )
                            }
                        })
                    }
                    </View>
                    <Text style={estilos.texto}>Mi Estrategia:</Text>
                    <View style={estilos.containerColumn}>
                    {
                        this.state.ataques.pociones.map( (pocion, i) => {
                            return(
                                <View style={{width: 350, height: 40}} key={i}>
                                    <View  style={estilos.containerRow}>
                                        <Text style={estilos.texto}>{i + 1}.- {pocion.nombre}: x{pocion.cantidad}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        this.mostrarBotonAtacar() && <Button title="ATACAR!" color="red" onPress={this.ejecutarAtaques} />
                    }
                    </View>
                </View>
            );
        }else{
            return(
                <View>
                    <Text style={estilos.texto}>Mi Inventario:</Text>
                    <Button title="Actualizar" color="blue" onPress={this.actualizarTodo} />
                    <View style={estilos.containerColumn}>
                        <Text>(Inventario vacio)</Text>
                    </View>
                </View>
            )
        }
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

export default Inventario;