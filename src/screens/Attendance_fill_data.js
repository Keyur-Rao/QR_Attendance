
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect } from 'react';
import axios from 'axios';
import GoogleSheet, { batchGet } from 'react-native-google-sheet';
import QRCode from 'react-native-qrcode-svg';
import { AsyncStorage } from 'react-native';

const facultyData = [
    { label: 'Hemal Ram', value: 'Hemal Ram' },
    { label: 'Mandir Nidhi', value: 'Mandir Nidhi' },
    { label: 'Vishal Kasundra', value: 'Vishal Kasundra' },
    { label: 'Shital Upadhyay', value: 'Shital Upadhyay' },
    { label: 'Heena Tilavat', value: 'Heena Tilavat' },
    { label: 'Praful Chavda', value: 'Praful Chavda' },
    { label: 'Deep Raval', value: 'Deep Raval' },
    { label: 'Heta Vasveliya', value: 'Heta Vasveliya' },

];

const semData = [

    { label: '1', value: '1' },
    { label: '3', value: '3' },
    { label: '5', value: '5' },

];

const divData = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },

];

const subjectData = [
    { label: 'MB-101', value: 'MB-101' },
    { label: 'MB-301', value: 'MB-301' },
    { label: 'MB-501', value: 'MB-501' },
    { label: 'MB-502', value: 'MB-502' },
    { label: 'MB-503', value: 'MB-503' },
    { label: 'MB-Lab-101', value: 'MB-Lab-101' },
    { label: 'MB-Lab-301', value: 'MB-Lab-301' },
    { label: 'MB-Lab-501', value: 'MB-Lab-501' },
    { label: 'MB-Lab-502', value: 'MB-Lab-502' },
    { label: 'MB-Lab-503', value: 'MB-Lab-503' },
    { label: 'Zoo-101', value: 'Zoo-101' },
    { label: 'Zoo-301', value: 'Zoo-301' },
    { label: 'Zoo-Lab-101', value: 'Zoo-Lab-101' },
    { label: 'Zoo-Lab-301', value: 'Zoo-Lab-301' },
    { label: 'Ch-101', value: 'Ch-101' },
    { label: 'Ch-301', value: 'Ch-301' },
    { label: 'Ch-501', value: 'Ch-501' },
    { label: 'Ch-502', value: 'Ch-502' },
    { label: 'Ch-503', value: 'Ch-503' },
    { label: 'Ch-Lab-101', value: 'Ch-Lab-101' },
    { label: 'Ch-Lab-301', value: 'Ch-Lab-301' },
    { label: 'Ch-Lab-501', value: 'Ch-Lab-501' },
    { label: 'Ch-Lab-502', value: 'Ch-Lab-502' },
    { label: 'Ch-Lab-503', value: 'Ch-Lab-503' },
    { label: 'Ph-101', value: 'Ph-101' },
    { label: 'Ph-301', value: 'Ph-301' },
    { label: 'Ph-Lab-101', value: 'Ph-Lab-101' },
    { label: 'Ph-Lab-301', value: 'Ph-Lab-301' },
    { label: 'Cs-101', value: 'Cs-101' },
    { label: 'Cs-301', value: 'Cs-301' },
    { label: 'Cs-Lab-101', value: 'Cs-Lab-101' },
    { label: 'Cs-Lab-301', value: 'Cs-Lab-301' },
    { label: 'STCS-101', value: 'STCS-101' },
    { label: 'STCS-301', value: 'STCS-301' },
];

const unitData = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: 'Lab', value: 'Lab' },
];


function Attendance_fill_data({ navigation }) {

    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);
    const [value4, setValue4] = useState(null);
    const [value5, setValue5] = useState(null);
    const [value6, setValue6] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [all, setAll] = useState();
    const [faculityName, setFaculityName] = useState([]);
    const [sem, setSem] = useState([]);
    const [div, setDiv] = useState([]);
    const [sub, setSub] = useState([]);
    const [unit, setUnit] = useState([]);
    const [course, setCourse] = useState([]);
    const [couse_sub, setCourseSub] = useState([])
    const [filter_sub, setFilterSub] = useState([])
    const [token, setToken] = useState(null);
    const [qrValue, setQrValue] = useState("Teacher QR");
    const [qrDisplay, setQrDisplay] = useState('none');
    const [formDisplay, setFormDisplay] = useState('flex');
    const [btnsDisplay, setBtnsDisplay] = useState('flex');


    let temp1 = []
    useEffect(() => {
        getToken();
        console.log("getStudentsName");

    }, []);
 
    const getToken = async () => {
        const value = await AsyncStorage.getItem('token');
        if (value) {
            setToken(value);
        }
        console.log("value", value);
        getAllData(value);
    };


    const getAllData = async (gtoken) => {
        let fac_names_data = []
        let sem_data = []
        let div_data = []
        let sub_data = []
        let filter_sub_data = []
        let unit_data = []
        let course_data = []
        let temp_data = []
        let course_sub_data = []
        try {
            // var result = await axios.get('https://sheet.best/api/sheets/1bba0f70-e195-45e7-bfaa-48948ef1c41b')
            // console.log("result  ", result.data);
            // result.data.forEach(element => {
            //     console.log("!!!!!!!!!!element!!!!!", element.Division);
            //     fac_names_data.push({ "label": element.Faculty_Name, "value": element.Faculty_Name })
            //     sem_data.push({ "label": element.Faculty_Name, "value": element.Faculty_Name })
            //     div_data.push({ "label": element.Faculty_Name, "value": element.Faculty_Name })
            //     sub_data.push({ "label": element.Faculty_Name, "value": element.Faculty_Name })
            //     unit_data.push({ "label": element.Faculty_Name, "value": element.Faculty_Name })
            // })

            const requestOptions = {
                'headers': { 'Authorization': token }
                // 'headers': { 'Authorization': 'ya29.a0ARrdaM9DRfJAKZX8Utp16wgaUq-VD7r78KsHdHUYsBrNU_oog3Eu81JsDKG-1QuOOTo-gsDSS7f7g58Rje4lbXoY_Vrvz5TMU1yLuypq5KBpNqTNBLYQ1YDx-juTqwkmCaTFTh1aTqlMHJy5-w3S0AqzNri7' }     

            }
            // console.log("gTOKEN============", gtoken)
            // var result = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/10mgjKImWlbZWbUxi4SemgqE3DpK4pX_xctFuOSLDd2A/values/A2:E35?key=AIzaSyDG7XnQdQo-HR7hEhkvuX3gW4P4nnXvP2M',requestOptions)
            var result = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/10mgjKImWlbZWbUxi4SemgqE3DpK4pX_xctFuOSLDd2A/values/A2:F200?key=AIzaSyD8s8tc4t1vO6QDiqS-Ji9sFmAhucflnGU', requestOptions)
            // console.log("result**********8*********************************************88", result);
            // console.log("requestOptions::::::", requestOptions);
            // fetch("https://sheets.googleapis.com/v4/spreadsheets/1M8ywh57PmN1lfQkbRuPpv9Zhr6EAiDg9a_Lrr3_9BDc/values/A2:E10?key=AIzaSyDG7XnQdQo-HR7hEhkvuX3gW4P4nnXvP2M", requestOptions)
            // .then((r) => r.json())
            // .then((data) => {
            //     // The response comes here
            //     console.log(data);
            // })
            // .catch((error) => {
            //     // Errors are reported there
            //     console.log(error);
            // });

            // console.log("result !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  ", result.data.values);
            result.data.values.forEach(element => {
                console.log("!!!!!!!!!!element!!!!!", element[0]);
                fac_names_data.push({ "label": element[0], "value": element[0] })
                sem_data.push({ "label": element[1], "value": element[1] })
                div_data.push({ "label": element[2], "value": element[2] })
                sub_data.push({ "label": element[4], "value": element[4] })
                unit_data.push({ "label": element[5], "value": element[5] })
                // course_data.push({ "label": element[3], "value": element[3] })
                temp_data.push(element[3])
                course_sub_data.push({ "course": element[3], "subject": element[4] })
            })
            console.log("[...new Set(course_data)] ::::::::::::", [...new Set(temp_data)]);
            [...new Set(temp_data)].forEach(element => {
                course_data.push({ "label": element, "value": element })
            })

            setFaculityName(fac_names_data)
            setSem(sem_data)
            setDiv(div_data)
            setSub(sub_data)
            setUnit(unit_data)
            setCourse(course_data)
            setCourseSub(course_sub_data)

            console.log("############################", value);


        } catch (error) {
            console.log("Error:", error);
        }
        console.log("faculityName::::::", faculityName);
    }

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    {/* Dropdown labe */}
                </Text>
            );
        }
        return null;
    };

    const setDropDownData = (value) =>{
          // let temp2 = []
          couse_sub.forEach(element => {

            if (element.course == value) {
                console.log("&&&&&&&&&&&&&&&&&&&", element.subject);
                temp1.push({ "label": element.subject, "value": element.subject })
                console.log("temp1 :::::", temp1);
            }  
        })
        setFilterSub(temp1)
    }

    
    
    const generate_qr = () =>{
        let dateTime = new Date();

        let dataObj = {
            faculty_Name: value6,
            sam_Name: value2,
            div_Name : value3,
            subject_Name : value4,
            unit_Name : value5,
            course_Name : value,
            timeStamp: dateTime.toLocaleString()
        }
        console.log(dataObj);
        let dataString = JSON.stringify(dataObj);
        setQrValue(dataString);
        setFormDisplay('none');
        setQrDisplay('flex');
        setBtnsDisplay('none');
    }


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        margin: 10
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    qrcode: {
        display: qrDisplay,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    btns: {
        display: btnsDisplay,
    },
    form: {
        display: formDisplay
    }
});

    return (
        <ScrollView style={styles.container}>
            {renderLabel()}

            <View style={styles.form} id="form">
                <View style={{ margin: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={course}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Course Name' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                            setDropDownData(item.value)
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>



                <View style={{ margin: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={faculityName}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Faculty Name' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue6(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>

                
                {/* {

                    couse_sub.forEach(element => {
                        // console.log("&&&&&&&&&&&&&&&&&&&",element.course);
                        if (element.course == value) {
                            console.log("&&&&&&&&&&&&&&&&&&&", element.subject);
                            let a = { "label": element.subject, "value": element.subject }
                            // setFilterSub(filter_sub => [...filter_sub, a])
                            // setFilterSub([...filter_sub, { "label": element.subject, "value": element.subject }]);
                        }
                    })
                    { setFilterSub(filter_sub.concat(a))         }
                    
                }  */}



                {/* {
                
                    //
                    () => setDropDownData(couse_sub,value) 
                } */}


                <View style={{ margin: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={sem}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select semester' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            
                            setValue2(item.value);
                            setIsFocus(false);

                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>

                <View style={{ margin: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={div}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select division' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue3(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>
                {/* {console.log("course Name :::::@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:::",value6)}
                {console.log("couse_sub Name :::::@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:::",couse_sub)} */}


                <View style={{ margin: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={filter_sub}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Subject Name' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue4(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>

                <View style={{ margin: 10 }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={unit}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Unit Name' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue5(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={isFocus ? 'blue' : 'black'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>
            </View>
            
            
            <View style={styles.btns} id="btns">
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                    <Button
                        title="Next"
                        onPress={() => navigation.navigate('Start_Attendance', { "faculty_Name": value6, "sam_Name": value2, "div_Name": value3, "subject_Name": value4, "unit_Name": value5, "course_Name": value, "token": token })}
                    // onPress={() => { console.log("value", value) ; ;console.log("taker name",value2); }}
                    />
                </View>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                    <Button
                        title="Generate QR Code"
                        onPress={() => generate_qr()}
                        color= "#3C84AB"
                    />
                </View>
            </View>

            <View style={styles.qrcode} id="qrcode">
                
                <QRCode
                //QR code value
                value={qrValue}
                //size of QR Code
                size={250}
                //Color of the QR Code 
                color="black"
                //Background Color of the QR Code 
                backgroundColor="white"
                //Logo of in the center of QR Code 
                logo={{
                    url:
                    'https://media.licdn.com/dms/image/C5603AQG7mktpW1KPYg/profile-displayphoto-shrink_200_200/0/1656673510662?e=1680739200&v=beta&t=76YtL75ihlvczBcS8yXhhnhfQlnJdgP2gDGY5Jl3Tvg',
                }}
                //Center Logo size  
                logoSize={30}
                //Center Logo margin 
                logoMargin={2}
                //Center Logo radius 
                logoBorderRadius={15}
                //Center Logo background 
                // logoBackgroundColor="white"
                /> 
            </View>

        </ScrollView>

    );

    
    
};

export default Attendance_fill_data;



