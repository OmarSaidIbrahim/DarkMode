import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native';

export default class App extends Component {
  constructor(props){
    super(props)

    this.state={
      pressed: false,
      theme: "Light"
    }
    this.shakeAnimation = new Animated.Value(0);
    this.changeTheme = new Animated.Value(0);
  }

  toggleAnimation = () => {

    this.setState({pressed: !this.state.pressed })

    this.state.pressed ? this.animation.play(60, 120) : this.animation.play(0, 60)

    Animated.timing(this.shakeAnimation, {
      toValue: this.state.pressed ? 0 : 50, 
      duration: 900, 
      useNativeDriver: true
    }).start()

    this.setState({theme: this.state.pressed ? "Light" : "Dark"})

    Animated.timing(this.changeTheme, {
      toValue: this.state.pressed ? 0 : 1, 
      duration: 900, 
      useNativeDriver: false
    }).start()
  }

  render() {

    const boxInterpolation =  this.changeTheme.interpolate({
      inputRange: [0, 1],
      outputRange:["rgb(255,255,255)" , "rgb(0,0,0)"]
    })

    const textInterpolation =  this.changeTheme.interpolate({
      inputRange: [0, 1],
      outputRange:["rgb(0,0,0)", "rgb(255,255,255)"]
    })
  
    const animatedStyle = {
      backgroundColor: boxInterpolation
    }

    const animatedStyle2 = {
      color: textInterpolation
    }

    return (
      <Animated.View style={{...styles.box, ...animatedStyle}}>
        <View style={{alignItems: "flex-end", padding: 20}}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              borderRadius: 25,
              justifyContent: "center",
              borderWidth: 2,
              borderColor: "grey",
            }}
            onPress={this.toggleAnimation}
            activeOpacity={1}
          >
            <Animated.View style={{
              transform: [{translateX: this.shakeAnimation}]
            }}>
              <LottieView 
              style={{
                width: 90, 
                height: 90,
                marginLeft: -11,
              }}
              ref={animation => {
                this.animation = animation;
              }}
              source={require('./32532-day-night.json')}
              loop={false}
            />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <View style={{flex:2,justifyContent:"center", alignItems: "center"}}>
            <Animated.Text style={{...styles.text1, ...animatedStyle2}}>This is a test</Animated.Text>
            <Animated.Text style={{...styles.text2, ...animatedStyle2}}>{this.state.theme} mode</Animated.Text>
        </View>
      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  box:{
    flex: 1,
    backgroundColor: "white"
  },
  text1:{
    fontSize:40,
    color: "black"
  },
  text2:{
    fontSize:20,
    color: "black"
  }
});
