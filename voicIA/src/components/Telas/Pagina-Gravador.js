import React, {Component} from 'react'
import { StyleSheet, View, Image, Dimensions} from 'react-native'
import Recorder from '../Gravador/Recorder'
import Header from './Header'

class Gravador extends Component {
    render(){
        return (
           
           <View style = {styles.container}>
                <Header/>
                <Recorder/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        alignItems: "center",
        
    },
    imagem: {
        
        alignItems: "center",
        alignContent: "center",
        top: Dimensions.get('window').height /6,
        resizeMode: 'contain'
    }
})

export default Gravador