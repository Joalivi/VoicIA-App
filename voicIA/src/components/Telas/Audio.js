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
                <Text style={styles.title}>Id Audio Firebase: </Text>
                <Text style={styles.text}>{this.props.id}</Text>
                <Text style={styles.title}>Data: </Text>
                <Text style={styles.text}>{this.props.data}</Text>
                <Text style={styles.title}>Caminho Audio: </Text>
                <Text style={styles.text}>{this.props.uri}</Text>
                <Text style={styles.title}>Usuário: </Text>
                <Text style={styles.text}>{this.props.user_name}</Text>
                <Text style={styles.title}>Id Usuário Firebase:</Text>
                <Text style={styles.text}>{this.props.user_id}</Text>
                <Text style={styles.title}>Duração Audio: </Text>
                <Text style={styles.text}>{this.props.duracao}</Text>
                <Text style={styles.title}>Formato: </Text>
                <Text style={styles.text}>{this.props.formato}</Text>
                <Text style={styles.title}>Qualidade: </Text>
                <Text style={styles.text}>{this.props.qualidade}</Text>
                <Text style={styles.title}>Número de Canais: </Text>
                <Text style={styles.text}>{this.props.canais}</Text>
                
                
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
      alignItems: 'flex-start',
      paddingTop: 10,
      paddingLeft: 10  
    },
    text: {
        fontSize: 25
    },
    title: {
        fontWeight: 'bold'
    }
})

const mapStateToProps = ({user}) => {
    return {
        
    }
}



export default connect(mapStateToProps)(Audio)