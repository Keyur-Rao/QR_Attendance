import React, { useState, useEffect} from 'react';
import { FlatList, Text, View, style, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

const Show_Barcode_Attendance = ({ navigation })=> {
    const [token, setToken] = useState(null);
    const [isTeacher, setIsTeacher] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('token');
            setToken(token);
        };
        const getIsTeacher = async () => {
            const isTeacher = JSON.parse(await AsyncStorage.getItem('isTeacher'));
            setIsTeacher(isTeacher);
        };
        getToken();
        getIsTeacher();
    }, []);


    console.log("show barcode attendance screen ********************************************",new Date().getDate());
    console.log("!!show barcode attendance screen  !!!!!!!!token!!!!!!!!!!!!!!!!!!!!!!!!!!!!", token);
    console.log('Is teacher '+ isTeacher);

    let Faculty_Name = navigation.getParam('teacherBarcodeData')['faculty_Name'];
    let sam_Name = navigation.getParam('teacherBarcodeData')['sam_Name'];
    let div_Name = navigation.getParam('teacherBarcodeData')['div_Name'];
    let subject_Name = navigation.getParam('teacherBarcodeData')['subject_Name'];
    let unit_Name = navigation.getParam('teacherBarcodeData')['unit_Name'];
    let course_Name = navigation.getParam('teacherBarcodeData')['course_Name'];

    
    let name_Array = []
    let Gr_NO_Array = []
    let today = new Date();
    let all_data = []

    

    // let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    console.log("date::::: ",date);
    let studentData = navigation.getParam('data');
    console.log("Student Data *************************************************** ", studentData);
    studentData.forEach(student => {
        if (Object.keys(JSON.parse(student)).includes("GrNo") && Object.keys(JSON.parse(student)).includes("Name")) {
            Gr_NO_Array.push({ "Id": JSON.parse(student).GrNo, "Name": JSON.parse(student).Name, "Faculty_Name": Faculty_Name, "Samester": sam_Name, "Division" : div_Name, Subject : subject_Name, Unit:unit_Name, "date":date})
            name_Array.push(JSON.parse(student).Name)
            all_data.push([JSON.parse(student).GrNo, JSON.parse(student).Name, date,course_Name, Faculty_Name, sam_Name, div_Name, subject_Name,unit_Name])
        }
    });

    console.log("~~~~~~~~~~~~  Teacher is ~~~~~~~~~~~~~~");
    console.log(navigation.getParam('teacherBarcodeData'));
    console.log("FACULTY NAME "+ Faculty_Name);
    console.log("Div  "+ div_Name);
    console.log("sem "+ sam_Name);
    console.log("subject NAME "+ subject_Name);
    console.log("unit NAME "+ unit_Name);
    console.log("course NAME "+ course_Name);

   
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
            })
        };
        // fetch("https://sheets.googleapis.com/v4/spreadsheets/1M8ywh57PmN1lfQkbRuPpv9Zhr6EAiDg9a_Lrr3_9BDc/values/A1:append?valueInputOption=RAW", requestOptions )
        //     .then(response => console.log("response           "+response.data))

        fetch("https://sheets.googleapis.com/v4/spreadsheets/1M8ywh57PmN1lfQkbRuPpv9Zhr6EAiDg9a_Lrr3_9BDc/values/A1:append?valueInputOption=RAW", requestOptions)
            .then((r) => r.json())
            .then(async (data) => {
                // The response comes here
                console.log("Final sheet data " + data);
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
                    isTeacher ? navigation.push('Attendance_fill_data') : navigation.push('Scan_Teacher_QR');
                }
                
            })
            .catch(async (error) => {
                // Errors are reported there
                console.log(error);
                Alert.alert("Your session Expired. Please login again",);

                await AsyncStorage.clear();
                await GoogleSignin.signOut();
                navigation.navigate('Login')
            });



        
    }

    function canclePressButton(){
        navigation.push('Final_Attendance')
    }

    function createTwoButtonAlert() {
        console.log("okokokok    createTwoButtonAlert");
        Alert.alert("Student Attendance",
            "You have taken attendance of " + sam_Name +" samester", 
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


    return <React.Fragment>
                <View style={{ flex: 2 }}>
                    <View style={{ padding: 10 }}><Text style={{ fontSize: 20, alignSelf: 'center' }}> Total Students :  {name_Array.length}</Text></View>

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
                            justifyContent: 'space-evenly',
                            marginBottom: 6
                        }}
                    >
                    <TouchableOpacity style={styles.btnHome} onPress={() => isTeacher ? navigation.navigate('Attendance_fill_data') : navigation.navigate('Scan_Teacher_QR')}>
                        <Text style={styles.btnHomeText}> Home </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => createTwoButtonAlert()}>
                        <Text style={styles.btnText}> Confirm </Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </React.Fragment>
};

export default Show_Barcode_Attendance;


const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#3C84AB',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#3C84AB",
        margin: 10

    },
    btnText: {
        color: 'white',
        fontSize: 18,
    },
    btnHome: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#3C84AB",
        margin: 10

    },
    btnHomeText: {
        color: '#3C84AB',
        fontSize: 18,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});


