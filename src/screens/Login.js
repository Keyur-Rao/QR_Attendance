
import React from 'react';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

import { AsyncStorage } from 'react-native';
import axios from 'axios';
import react from 'react';

function Login({ navigation }) {

  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  const isDarkMode = useColorScheme() === 'dark';


  useEffect((props)=> {
    checkLogin()
  })

  const checkLogin = async () => {
    let storedUser =  await AsyncStorage.getItem('token');
    if(storedUser) {
      // await AsyncStorage.setItem('isTeacher', JSON.stringify(false));
      let isTeacher = JSON.parse(await AsyncStorage.getItem('isTeacher'));
      isTeacher ? navigation.navigate('Attendance_fill_data') : navigation.navigate('Scan_Teacher_QR');
    }else{
      signin();
    }
  }


  const signin = async () => {
    try {
      GoogleSignin.hasPlayServices().then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn().then(async (userInfo) => {
            let token = await GoogleSignin.getTokens();
            let email = userInfo['user']['email'];
            console.log("User information email " + email);
            console.log("token in login", token.accessToken);
            if (token.accessToken) {
              try {
                await AsyncStorage.setItem('token', JSON.stringify(token.accessToken));
                //Check user is teacher or not
                let result = await axios.get(`https://script.google.com/macros/s/AKfycbx1wYrX1YgXRoa5f_ZlBJiAGpiem1ph4A-Ti3X4eh6ZycCa0PazZz0pxEsT1IaMk67cAw/exec?sheet=10mgjKImWlbZWbUxi4SemgqE3DpK4pX_xctFuOSLDd2A&subsheet=Teachers&query=select * where A='${email}'`);
                if (Number(JSON.stringify(result['data'].length)) !== 0 ){
                  await AsyncStorage.setItem('isTeacher', JSON.stringify(true));
                  console.log("**** I am Teacher **** " + email);
                }
                else{
                  console.log("**** I am not teacher *****"+ email);
                  await AsyncStorage.setItem('isTeacher', JSON.stringify(false));
                }
                
                let isTeacher = JSON.parse(await AsyncStorage.getItem('isTeacher'));
                isTeacher ? navigation.navigate('Attendance_fill_data') : navigation.navigate('Scan_Teacher_QR');
              } catch (e) {
                console.log('Failed to save the data to the storage', e);
                // alert('Failed to save the data to the storage' ,e)
              }
              
            }
          }).catch((e) => {
            console.log("ERROR IS: " + JSON.stringify(e));
          })
        }
      }).catch((e) => {
        console.log("ERROR IS: " + JSON.stringify(e));
      })
    }
    catch (e) {
      console.log("exception  ", e);
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>


          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={() => { signin() }}
              />
            </View>
            {/* <View style={styles.buttonContainer}>
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <Button
                  onPress={this.signOut}
                  title="LogOut"
                  color="red"></Button>
              )}
            </View> */}
          </View>
        </ScrollView>
      </SafeAreaView>

      
    </>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export default Login
