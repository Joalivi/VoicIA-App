import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Gravatar} from 'react-native-gravatar'
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Image
} from 'react-native'
import icone from '../../../assets/img/icone.jpg'

class Header extends Component{

    render() {
        const name = this.props.name || 'Anonymous'
        const gravatar = this.props.email ?
            <Gravatar options={{ email: this.props.email, secure: true }}
                style={styles.avatar} />
            : null
        return (

            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icone} style={styles.image} />
                    <Text style={styles.title}>VoicIA</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.user}>{name}</Text>
                    {gravatar}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: Platform.OS=== 'ios' ? 20:0,
        borderBottomWidth: 1,
        padding: 10,
        borderColor: '#BBB',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        height: 50,
        width:50,
        resizeMode: 'contain'
    },
    title:{
        color:'#000',
        fontFamily:'shelter',
        height: 50,
        fontSize: 42
    },
    userContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    user:{
        fontSize: 10,
        color:'#888'
    },
    avatar:{
        width: 40,
        height:40,
        marginLeft: 10
    }
})

const mapStateToProps = ({user}) => {
    return{
        email: user.email,
        name: user.name,
    }
}
export default connect(mapStateToProps)(Header)