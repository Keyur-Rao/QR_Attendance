import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Start_Attendance from '../screens/Start_Attendance'
import Attendance_fill_data from '../screens/Attendance_fill_data'
import Final_Attendance from '../screens/Final_Attendance'
import Show_Barcode_Attendance from '../screens/Show_Barcode_Attendance'
import Login from '../screens/Login'
import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { Text, View, Image, StyleSheet } from 'react-native';

const readData = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        console.log("call read data in index js", value);
        if (value !== null) {
            // setInput(value);
        }
    } catch (e) {
        console.log(e);
        alert('Failed to fetch the input from storage');
    }
};



const MainApp = createStackNavigator({

    Login: {
        screen: Login,
        // headerTitle: () => ( <View style={{alignItems: 'center', }}><Text style={{fontSize: 20}}>Login </Text></View>),
        headerShown: false,
        headerBackground: () => (
            <Image
            style={{ width: 50,  height: 50, position: 'absolute', top: 3, right: 0, display:'flex', justifyContent:'flex-end', alignItems: 'center',margin:5, }}
              source={{ uri: 'https://tnraocollege.org/wp-content/themes/shivarjun/assets/images/about-logo.png' }}
            />
          ),
    },
    Home: {
        screen: Home,
        navigationOptions: {
            // headerTitle: 'T.N.Rao Attendance '
            headerShown: false
        }
    },
    Attendance_fill_data: {
        screen: Attendance_fill_data,
        navigationOptions: {
            headerShown: false,
            // headerTitle: () => ( <View style={{alignItems: 'center', }}><Text style={{fontSize: 20}}>Fill Data </Text></View>),
            headerBackground: () => (
                <Image
                style={{ width: 50,  height: 50, position: 'absolute', top: 3, right: 0, display:'flex', justifyContent:'flex-end', alignItems: 'center',margin:5, }}
                  source={{ uri: 'https://tnraocollege.org/wp-content/themes/shivarjun/assets/images/about-logo.png' }}
                />
              ),
        }
    },
    Start_Attendance: {
        screen: Start_Attendance,
        navigationOptions: {
            // headerTitle: () => ( <View style={{alignItems: 'center', }}><Text style={{fontSize: 20}}>Camera Preview </Text></View>),
            headerShown: false,
            headerBackground: () => (
                <Image
                  style={{ width: 50,  height: 50, position: 'absolute', top: 3, right: 0, display:'flex', justifyContent:'flex-end', alignItems: 'center',margin:5, }}
                  source={{ uri: 'https://tnraocollege.org/wp-content/themes/shivarjun/assets/images/about-logo.png' }}
                />
              ),
        }
    },

    

    Final_Attendance: {
        screen: Final_Attendance,
        navigationOptions: {
            // headerTitle: () => ( <View style={{alignItems: 'center', }}><Text style={{fontSize: 25}}>Attendance Screen </Text></View>),
            headerShown: false
            
        }
    },
    Show_Barcode_Attendance: {
        screen: Show_Barcode_Attendance,
        navigationOptions: {
            // headerTitle: () => ( <View style={{alignItems: 'center', }}><Text style={{fontSize: 20}}>Attendance List</Text></View>),
            headerShown: false,
        headerBackground: () => (
            <Image
            style={{ width: 50,  height: 50, position: 'absolute', top: 3, right: 0, display:'flex', justifyContent:'flex-end', alignItems: 'center',margin:5, }}
              source={{ uri: 'https://tnraocollege.org/wp-content/themes/shivarjun/assets/images/about-logo.png' }}
            />
          ),
        }
    },
})

const AppContainer = createAppContainer(MainApp)

export default () => {
    useEffect(() => {
        readData()
    }, [])
    const prefix = 'Attendance://'
    return <AppContainer uriPrefix={prefix} />
}