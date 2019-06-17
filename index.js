/**
 * @format
 */
import React, { Component } from 'react'
import {AppRegistry} from 'react-native';
import RootScene from './src/RootScene';
import {name as appName} from './app.json';
import { Provider } from 'mobx-react'
import Cart from './src/store/Cart'
import SplashScreen from 'react-native-splash-screen';
const cart = new Cart()

class App extends Component {
    componentDidMount() {                   //只需添加componentDidMount(){}就行
        setTimeout(() => {
            SplashScreen.hide();      //关闭启动屏幕
        }, 1000);
    }
	componentWillUnmount() {
    this.timer && clearTimeout(this.timer);         //清除计时器
    }
    render () {
        return (
            <Provider cart={cart}>
                <RootScene></RootScene>
            </Provider>
        )
    }
}

AppRegistry.registerComponent(appName, () => App);
