import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image
} from 'react-native'
import icone from '../../assets/img/icone.jpg'

class Header extends Component{

    render(){
        return(
            <View style={styles.conteiner}>
                <View style={styles.rowContainer}>
                    <Image source={icone} style={styles.image}/>
                    <Text style={styles.title}>VoicIA</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: Platform.OS=== 'ios' ? 20:0,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB'
    },
    rowContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        height: 30,
        width:30,
        resizeMode: 'contain'
    },
    title:{
        color:'#000',
        fontFamily:'shelter',
        height: 30,
        fontSize: 28
    }
})

export default Header