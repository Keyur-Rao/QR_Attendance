import { View, Text, Button, StyleSheet, TouchableOpacity,  } from 'react-native';
import React, { useState } from 'react';


const Scan_Teacher_QR = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Scan Teacher QR Code</Text>
      <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('Final_Attendance')}}>
            <Text style={styles.btnText}>Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 23,
        marginBottom: 20,
        fontWeight: '800',
        textAlign: 'center'
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
        margin: 10
    },
    btn:{
        backgroundColor: '#3C84AB',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#3C84AB",
        margin: 10
    },
    btnText: {
        color : "white",
        fontSize: 20,
        textAlign: 'center'
    }

});

export default Scan_Teacher_QR;