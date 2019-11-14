import React, {Component} from 'react'
import { StyleSheet, View, Image, Dimensions} from 'react-native'
import gravadorImagem from '../../assets/img/gravadorImagem.png'
import Header from './Header'

class Gravador extends Component {
    render(){
        return (
           
           <View style = {styles.container}>
                <Image onclick  source={gravadorImagem} style = {styles.imagem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    image: {
        
        height: 50,
        width: 50,
        alignItems: "center",
        maxWidth: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width ,
        resizeMode: 'contain',
        borderRadius: 4,
        backgroundColor: "red"
        
    }
})

export default Gravador