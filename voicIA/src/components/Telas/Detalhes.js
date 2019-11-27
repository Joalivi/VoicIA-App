import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    StyleSheet,
    FlatList,
    View
} from 'react-native'
import Header from './Header'
import Audio from './Audio'
import {fetchAudios} from '../../store/actions/audios'

class Detalhes extends Component {

    componentDidMount = () => {
        this.props.onFetchAudios()
    }
    
    render(){
        return (
            <View style={styles.container}>
            <Header />
            <FlatList
                data={this.props.audios}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) =>
                    <Audio key={item.id} {...item} />} />
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
    }
})
const mapStateToProps = ({ audios }) => {
    return {
        audios: audios.audios
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAudios: () => dispatch(fetchAudios())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detalhes)