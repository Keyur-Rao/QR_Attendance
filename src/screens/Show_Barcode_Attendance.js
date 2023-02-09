import React, { useState, useEffect} from 'react';
import { FlatList, Text, View, style, Button, StyleSheet, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import {
  GoogleSignin
} from 'react-native-google-signin';

const Separator = () => (
    <View
        style={{
            borderBottomColor: '#d3d3d3',
            borderBottomWidth: 1,
            marginTop: 20,
            marginBottom: 10,
        }}
    />
)

function Show_Barcode_Attendance({ navigation }) {

    console.log("show barcode attendance screen ********************************************",new Date().getDate());
    console.log("!!show barcode attendance screen  !!!!!!!!token!!!!!!!!!!!!!!!!!!!!!!!!!!!!",navigation.getParam('token'));
    let Faculty_Name = navigation.getParam('faculty_Name');
    let sam_Name = navigation.getParam('sam_Name');
    let div_Name = navigation.getParam('div_Name');
    let subject_Name = navigation.getParam('subject_Name');
    let unit_Name = navigation.getParam('unit_Name');
    let course_Name = navigation.getParam('course_Name');

    const [token, setToken] = useState(null);
    let name_Array = []
    let Gr_NO_Array = []
    let today = new Date();
    let all_data = []
    let google_token=''

    // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    console.log("date:::::",date);
    let barcodeDatas = navigation.getParam('data');
    console.log("barcodeDatas***************************************************", barcodeDatas);
    barcodeDatas.forEach(element => {
        if (Object.keys(JSON.parse(element)).includes("GrNo") && Object.keys(JSON.parse(element)).includes("Name")) {
            Gr_NO_Array.push({ "Id": JSON.parse(element).GrNo, "Name": JSON.parse(element).Name, "Faculty_Name": Faculty_Name, "Samester": sam_Name, "Division" : div_Name, Subject : subject_Name, Unit:unit_Name, "date":date})
            name_Array.push(JSON.parse(element).Name)
            all_data.push([JSON.parse(element).GrNo, JSON.parse(element).Name, date,course_Name, Faculty_Name, sam_Name, div_Name, subject_Name,unit_Name])
        }
    });


   
    // fetch("https://sheet.best/api/sheets/87b86386-6b5f-4143-81d7-fad56272564c", {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(Gr_NO_Array
    //     ),
    // })
    //     .then((r) => r.json())
    //     .then((data) => {
    //         // The response comes here
    //         console.log(data);
    //     })
    //     .catch((error) => {
    //         // Errors are reported there
    //         console.log(error);
    //     });

    async function donePressButon() {
        const token = await AsyncStorage.getItem('token');
        console.log("token got in fill", token)
        // fetch("https://sheet.best/api/sheets/ebb6c341-fc11-475c-ae18-0c6fe4371632", {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(Gr_NO_Array
        //     ),
        // })
        //     .then((r) => r.json())
        //     .then((data) => {
        //         // The response comes here
        //         console.log(data);
        //     })
        //     .catch((error) => {
        //         // Errors are reported there
        //         console.log(error);
        //     });

        const requestOptions = {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                // 'Authorization': 'Bearer ya29.a0ARrdaM9gTGWVEzb5kAA_MFvzFaGxhqHEtMuAUpWX1_eCVzsvD6btMZwcjez44H-SecxtkFO6xg8UzjmGU1Ynt4MM0OCK2DPuMFYzwb9ySY1naGspTUmSU9c9YCMgk4ROsO-PzzOIm2t2uXYQC1uHZPVAwf_s'
                
            },
            body: JSON.stringify({
                "values": 
                    all_data
                    // [
                    //     "11111ssssMEHUL", "paras"
                    // ],
                    // [
                    //     "kkjkjk", "jhkkfjf"
                    // ]
                
            })
        };
        // fetch("https://sheets.googleapis.com/v4/spreadsheets/1M8ywh57PmN1lfQkbRuPpv9Zhr6EAiDg9a_Lrr3_9BDc/values/A1:append?valueInputOption=RAW", requestOptions )
        //     .then(response => console.log("response           "+response.data))

        fetch("https://sheets.googleapis.com/v4/spreadsheets/1M8ywh57PmN1lfQkbRuPpv9Zhr6EAiDg9a_Lrr3_9BDc/values/A1:append?valueInputOption=RAW", requestOptions)
            .then((r) => r.json())
            .then(async (data) => {
                // The response comes here
                console.log(data);
                if(data && data.error){
                    await AsyncStorage.clear();
                    await GoogleSignin.signOut();

                    Alert.alert(
                        "Your session Expired. Please login again",
                    );
                    
                    navigation.navigate('Login')
                }else{
                    Alert.alert(
                        "Attendance has been taken successfully",
                    );
                    navigation.navigate('Attendance_fill_data')
                }
                
            })
            .catch(async (error) => {
                // Errors are reported there
                console.log(error);
                Alert.alert(
                    "Your session Expired. Please login again",
                );

                await AsyncStorage.clear();
                await GoogleSignin.signOut();
                navigation.navigate('Login')
            });



        
    }

    function canclePressButton(){
        navigation.navigate('Final_Attendance')
    }

    function createTwoButtonAlert() {
        console.log("okokokok    createTwoButtonAlert");
        Alert.alert(
            "Student Attendance",
            // "You have taken attendance of " + this.state.className,
            "You have taken attendance of " + sam_Name +"samester", 
            [
                {
                    text: "Retake Attendance",
                    onPress: () => canclePressButton(),
                    // onPress: () => console.log("Retake Attendance"),
                    style: "cancel"
                },
                { text: "Done", onPress: () => donePressButon() }
                // { text: "Done", onPress: () => console.log("done") }
            ]
        );
    }
    return (
        <View style={{ flex: 2 }}>
            <View style={{ padding: 10 }}><Text style={{ fontSize: 20, alignSelf: 'center', borderWidth: 1, borderColor: 'thistle', borderRadius: 50, }}> Total Students :  {name_Array.length}</Text></View>

            {/* <View style={{ paddingHorizontal: 40, paddingVertical: 10 }}> */}

                <FlatList
                    data={name_Array}
                    ItemSeparatorComponent={Separator}
                    keyExtractor={item => item.toString()}
                    renderItem={({ item }) => <Text style={{ fontSize: 16, paddingHorizontal: 20, paddingVertical: 5 }}>{item}</Text>}
                />
            {/* </View> */}
            <View
                style={{
                    // flex: 0.1,                          
                    alignItems: 'center',
                    flexDirection: 'row',
                    display: 'flex',
                    justifyContent: 'space-evenly'
                    // position : 'relative'
                }}
            >
                <Button style={{paddingHorizontal: 20, paddingVertical: 15}}
                    title="Home"
                    onPress={() => navigation.navigate('Attendance_fill_data')}
                />
                <Button style={{paddingHorizontal: 20, paddingVertical: 15}}
                    title="Confirm"
                    // onPress={() => navigation.navigate('Attendance_fill_data')}
                    onPress={() => createTwoButtonAlert()}
                />
            </View>
        </View>
    )
};

export default Show_Barcode_Attendance;


const styles = StyleSheet.create({
    // container: {
    //     top: "50%",
    //     left: "50%"

    // }
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});


