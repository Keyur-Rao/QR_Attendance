import React, { useState, useEffect } from 'react'
import { RNCamera } from 'react-native-camera';
// import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { TouchableOpacity, StyleSheet, View, Image,Text,Button } from 'react-native';


function Start_Attendance({ navigation }) {
  console.log("data value::  ",navigation.getParam('class_Name'));
  const class_name = navigation.getParam('class_Name')
  console.log("taker_Name$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4",navigation.getParam('taker_name'))
  console.log("Start Attendance");

  return (
    <RNCamera
    ref={ref => {
            this.camera = ref;
        }}
      captureAudio={false}
      style={{flex: 1}}
      type={RNCamera.Constants.Type.back}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}>
          <View style={styles.btnAlignment}>
            
            <View style={{width:50}}/>

          <TouchableOpacity
              activeOpacity={0.5}
              onPress={()=>PickImage()}
              >
         {/* <Icon name="camera" size={50} color="#fff" /> */}
          </TouchableOpacity>
          <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
          <Button title="Start Attendance" style={styles.btn} onPress = {()=>{navigation.navigate('Final_Attendance', { "faculty_Name": navigation.getParam('faculty_Name'), "sam_Name": navigation.getParam('sam_Name'), "div_Name" : navigation.getParam('div_Name'), "subject_Name" : navigation.getParam('subject_Name'), "unit_Name" : navigation.getParam('unit_Name'),"course_Name" : navigation.getParam('course_Name'), "token" : navigation.getParam('token') })}}/> 
          </View>
          </View>

          

    </RNCamera>



  //   return (
  //   <View
  //     style={{
  //       flexDirection: "row",
  //       height: 100,
  //       padding: 20
  //     }}
  //   >
  //     <View style={{ backgroundColor: "blue", flex: 0.3 }} />
  //     <View style={{ backgroundColor: "red", flex: 0.5 }} />
  //     <Text>Hello World!</Text>
  //   </View>
  // );
    
  
  // return (
  //   <RNCamera
  //     ref={ref => {
  //       this.camera = ref;
  //     }}
  //     captureAudio={false}
  //     style={{ flex: 1 }}
  //     type={RNCamera.Constants.Type.back}
  //     androidCameraPermissionOptions={{
  //       title: 'Permission to use camera',
  //       message: 'We need your permission to use your camera',
  //       buttonPositive: 'Ok',
  //       buttonNegative: 'Cancel',
  //     }}>
  //     <View style={styles.btnAlignment}>

  //       <View style={{ width: 30 }} />

  //       <TouchableOpacity
  //         activeOpacity={0.5}
  //         onPress={() => PickImage()}
  //       >
  //         {/* <Icon name="camera" size={50} color="#fff" /> */}
  //       </TouchableOpacity>

  //       <TouchableOpacity
  //         activeOpacity={0.5}
  //         onPress={() => setFrontCam(!FrontCam)}
  //       >
  //         {/* <Icon */}
  //           {/* // name="flip-camera-ios" size={30} color="#fff" /> */}
  //       </TouchableOpacity>

  //     </View>

  //   </RNCamera>
  // )
  );
}


const styles = StyleSheet.create({
  search_bar: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  input: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    width: "70%",
  },
  button: {
    height: 80,
    margin: 8,
    borderWidth: 1,
  },
  btn: {
    backgroundColor:'red'
  }
});
export default Start_Attendance;