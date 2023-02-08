import React from 'react';
import {
    View,
    Text
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AsyncStorage } from 'react-native';

async function Generate_QR_Code({ navigation }){
    let access_token = await AsyncStorage.getItem('token');

    let dataObj = {
        faculty_Name: navigation.getParam('faculty_Name'),
        sam_Name: navigation.getParam('sam_Name'),
        div_Name : navigation.getParam('div_Name'),
        subject_Name : navigation.getParam('subject_Name'),
        unit_Name : navigation.getParam('unit_Name'),
        course_Name : navigation.getParam('course_Name'),
        token : access_token
    }
    console.log(dataObj);
    let dataString = JSON.stringify(dataObj);
    console.log(dataString);
    let dataJson = JSON.parse(dataString);
    // console.log(dataJson);
    return(
        <>
            <View style={{paddingLeft: 50}}>
            <Text>Generate QR Code</Text>
            
            {/* <QRCode
              //QR code value
              value={dataString}
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
            /> */}
      </View>
        </>
    )
}

export default Generate_QR_Code;
