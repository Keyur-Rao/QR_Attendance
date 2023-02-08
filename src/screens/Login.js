
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
      navigation.navigate('Attendance_fill_data')
    }else{
      signin();
    }
  }


  const signin = async () => {
    try {
      GoogleSignin.hasPlayServices().then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn().then(async (userInfo) => {
            let token = await GoogleSignin.getTokens()
            console.log("token in login", token);
            if (token.accessToken) {
              try {
                await AsyncStorage.setItem('token', JSON.stringify(token.accessToken));
                navigation.navigate('Attendance_fill_data')
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
