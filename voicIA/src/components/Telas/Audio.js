import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
  } from 'react-native';


class Audio extends Component {

    
    render() {
        
        return (
            <View style = {styles.container}>
                <Text>Id Audio Firebase: {this.props.id}</Text>
                <Text>Caminho Audio: {this.props.uri}</Text>
                <Text>Id Usuário Firebase: {this.props.user_id}</Text>
                
            </View>
        )
    }


  
}

const styles = StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1,
      backgroundColor: '#FFF',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 10
        
    }
})

const mapStateToProps = ({user}) => {
    return {
        name: user.name
    }
}



export default connect(mapStateToProps)(Audio)