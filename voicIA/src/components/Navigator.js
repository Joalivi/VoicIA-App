import React from 'react'
import {Dimensions} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createAppContainer } from 'react-navigation'

import Gravador from './Pagina-Gravador'

var tamIcon = Dimensions.get("window").height / 15

const MenuRoutes ={
    Perfil: {
        name: 'Perfil',
        screen: Gravador,
        navigationOptions:{
            title: 'Perfil',
            tabBarIcon: ({tintColor}) =>
                <Icon name='user' size={tamIcon} color={tintColor} />
        }
    },
    
    Gravador: {
        name: 'Gravador',
        screen: Gravador,
        navigationOptions: {
            title:'Gravador',
            tabBarIcon: ({tintColor}) =>
                <Icon name='microphone' size={tamIcon} color={tintColor}/>
        }
    },
    
    Detalhes: {
        name: 'Detalhes',
        screen: Gravador,
        navigationOptions:{
            title: 'Detalhes',
            tabBarIcon: ({tintColor}) =>
                <Icon name="list-alt" size={tamIcon} color={tintColor} />
        }
    }

}

const MenuConfig = {
    initialRouteName: 'Gravador',
    tabBarOptions:{
        showLabel: true,
        style: {
            height: Dimensions.get("window").height / 10
        }
   }
    
}

const MenuNavigator = createAppContainer(createBottomTabNavigator(MenuRoutes, MenuConfig))

export default MenuNavigator