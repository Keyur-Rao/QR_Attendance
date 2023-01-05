import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert, Modal, Pressable, StyleSheet, TextInput } from 'react-native'
// import { FaceDetector } from 'react-native-camera';
// import * as RNFS from 'react-native-fs';
import { AsyncStorage } from 'react-native';

function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState("");
  const [sessionId, onChangeSessionId] = React.useState(null);


  console.log("token:", navigation.getParam('token'));
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
  useEffect(() => {

    readData();

  }, []);


  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log("value in Home pafge ", value);
      if (value !== null) {
        console.log("call if conditions");
      }
      else {
        console.log("call the else condition");
        navigation.navigate('Login')
      }
    } catch (e) {
      console.log("error", e);
      // alert('Failed to fetch the input from storage');
    }
  };

  const DATA = [
    {
      id: '1',
      title: 'Start Attendance',
      // component: 'Start_Attendance',
      component: 'Attendance_fill_data',

    },
    // {
    //   id: '2',
    //   title: 'Add Student Name',
    //   component: 'Add_Students_Data',
    // },
    {
      id: '3',
      title: 'Students List',
      component: 'Student_List_Drop_Down_list',
    },
    // {
    //   id: '4',
    //   title: 'Classes & Teachers',
    //   component: 'Student_Course_List',
    // },

  ];

  return (
    <View style={{ flex: 2 }}>
      <View style={{ paddingHorizontal: 40, paddingVertical: 20 }}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <TouchableOpacity key={item.id}
              // onPress={() => item.component === "Session_model" ? setModalVisible(!modalVisible) : navigation.navigate(item.component, { item })}>
              // onPress={() => navigation.navigate(item.component, { item })}>
              onPress={() => navigation.navigate(item.component, { 'item': item, 'token': navigation.getParam('token') })}>
              <Text style={{ fontSize: 24 }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default Home