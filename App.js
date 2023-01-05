// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   console.log("run");
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



//  working code


import React from 'react'
import AppContainer from './src/navigation'
import {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

// import * as RNFS from 'react-native-fs';

const App = () => {

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'https://spreadsheets.google.com/feeds',
        'https://www.googleapis.com/auth/drive'], // what API you want to access on behalf of the user, default is email and profile
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      androidClientId: '109430246939-hge2rl6hafqbrfd8a1l2s9dhk9f9rf7r.apps.googleusercontent.com'
    });
  }, []);

  return  <AppContainer />;
  
}

export default App
















// import React from 'react';
// import {useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Button
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from 'react-native-google-signin';



// const App = () => {

//   const [loggedIn, setloggedIn] = useState(false);
// const [userInfo, setuserInfo] = useState([]);


//   useEffect(() => {
//    GoogleSignin.configure({
//      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
//      // webClientId:
//        // '289546880485-t49kv90q6fbis3rtaa4gu5q4nvjo8bhj.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
//      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//      androidClientId: '289546880485-uhalio4trs2r10r8b5urb886aoevqem3.apps.googleusercontent.com' 
//    });
//  }, []);


//   const isDarkMode = useColorScheme() === 'dark';
  

//   async function signin() {
  
//     GoogleSignin.hasPlayServices().then((hasPlayService) => {
//         if (hasPlayService) {
//              GoogleSignin.signIn().then( async (userInfo) => {
//                let token = await GoogleSignin.getTokens()
//                console.log("token ====>>>>>>> ", token)

//                        console.log(JSON.stringify(userInfo))
//              }).catch((e) => {
//              console.log("ERROR IS: " + JSON.stringify(e));
//              })
//         }
//     }).catch((e) => {
//         console.log("ERROR IS: " + JSON.stringify(e));
//     })
//   }


//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />

//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <GoogleSigninButton
//                 style={{width: 192, height: 48}}
//                 size={GoogleSigninButton.Size.Wide}
//                 color={GoogleSigninButton.Color.Dark}
//                 onPress={signin()}
//               />
//             </View>
//             <View style={styles.buttonContainer}>
//               {!loggedIn && <Text>You are currently logged out</Text>}
//               {loggedIn && (
//                 <Button
//                   onPress={this.signOut}
//                   title="LogOut"
//                   color="red"></Button>
//               )}
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;



