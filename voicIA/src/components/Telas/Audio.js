import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native'
import WaveForm from 'react-native-audiowaveform';

class Audio extends Component {
    render() {
        
        return (
            <View style={styles.container}>
                <Text>Dados extraidos audio 1 usuário {this.props.name}</Text>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height /10,
        resizeMode: 'contain',
        alignItems: 'center',
        
    }
})

const mapStateToProps = ({user}) => {
    return {
        name: user.name
    }
}

export default connect(mapStateToProps)(Audio)