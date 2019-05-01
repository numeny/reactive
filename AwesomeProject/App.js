/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, WebView, BackHandler} from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {url: 'https://m.sogou.com', backButtonEnabled: false}
    // this.nav = this.props.navigation;//导航
    // 添加返回键监听(对Android原生返回键的处理)
  }

  onNavigationStateChange = navState => {
    this.setState({
      backButtonEnabled: navState.canGoBack
    });
  };


  onBackAndroid = () => {
    if (this.state.backButtonEnabled) {
      this.refs['webView'].goBack();
      return true;
    } else {
      return false;
    }
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      this.backHandler =
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.backHandler.remove();
    }
  }

  render() {
    return (
      <WebView
        source={{uri: 'https://m.sogou.com'}}
        style={{marginTop: 0}}
        allowsInlineMediaPlayback={true}
        ref="webView"
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
