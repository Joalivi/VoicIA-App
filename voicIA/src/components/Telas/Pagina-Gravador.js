import React, {Component} from 'react'
import { StyleSheet, View, Image, Dimensions} from 'react-native'
import Recorder from '../Gravador/Recorder'
import Page from '../Recorder/Principal'
import Header from './Header'

class Gravador extends Component {
    render(){
        return (
           
           <View style = {styles.container}>
                <Header/>
                <Page/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
        
    },
    
})

export default Gravador