
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

//Import moment for date and time
import moment from 'moment';

// import RNFetchBlob from 'react-native-fetch-blob'
import { PermissionsAndroid } from "react-native";
// import SyncStorage from 'sync-storage';
import 'localstorage-polyfill';

// import CompressImage from 'react-native-compress-image';
import { Image } from 'react-native-compressor';
import CompressImage from 'react-native-compress-image';



const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const landmarkSize = 2;

export default class CameraScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      flash: 'off',
      orientation: 2,
      zoom: 0,
      autoFocus: 'on',
      depth: 0,
      type: 'back',
      whiteBalance: 'auto',
      ratio: '16:9',
      recordOptions: {
        mute: false,
        maxDuration: 5,
        quality: RNCamera.Constants.VideoQuality['144p'],
      },
      isRecording: false,
      canDetectFaces: true,
      canDetectText: false,
      canDetectBarcode: true,
      faces: [],
      textBlocks: [],
      barcodes: [],
      inQueue: false,
      initCount: 0,
      studentAllName: [],
      barcodeAllData: [],
      uniueBarcodeData: [],
      uniqueResponseData: [],
      allImageUrl: []
    };
  }




  componentDidMount() {
  }

  toggleFacing() {
    this.setState({
      // type: this.state.type === 'back' ? 'front' : 'back',
      type: this.state.type === 'front' ? 'back' : 'front',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  barcodeMethod = async function (barcodes) {
    barcodes.forEach(barcode => {
      // console.log("barcodes:::::::", (barcode["data"]));

      this.setState({ barcodeAllData: [...this.state.barcodeAllData, barcode["data"]] })
    });
    // console.log("this.state.barcodeAllData:::::::::", [...new Set(this.state.barcodeAllData)]);
    // let uniueBarcodeData = [...new Set(this.state.barcodeAllData)]
    this.setState({ uniueBarcodeData: [...new Set(this.state.barcodeAllData)] })
    // console.log("uniueBarcodeData:", this.setState.uniueBarcodeData);
  }



  // takePicture = async function () {
  //   const { navigation } = this.props;
  //   // if (this.camera) {
  //   //   const data = await this.camera.takePictureAsync();
  //   //   console.log("Final Attendance scteen", navigation.getParam('data'));
  //   //   var date = moment().utcOffset('+05:30').format('YYYY-MM-DD-hh:mm:ss');
  //   //   console.log("data  ", date)
  //   //   let teacher_Name = "Test Teacher"
  //   //   let session_id = "Make_Atten"
  //   //   let formData = new FormData();
  //   //   formData.append('class_name', navigation.getParam('data'));
  //   //   formData.append('file', {
  //   //     name: date + "--" + data.uri.split('/')[9],
  //   //     uri: data.uri,
  //   //     type: 'image/jpeg',
  //   //   });
  //   //   axios({
  //   //     url: 'http://13.233.35.186:8001/Attendance/match',
  //   //     method: 'POST',
  //   //     data: formData,
  //   //     headers: {
  //   //       'Accept': 'application/json',
  //   //       'Access-Control-Allow-Origin': '*',
  //   //       'Content-Type': 'multipart/form-data',
  //   //     }

  //   //   }).then(response => {
  //   //     for (let s_name of response.data['response']) {
  //   //       console.log("In Loop", s_name);
  //   //     }
  //   //     if (response.data["status"] == 200 && response.data['response'].length > 0) {
  //   //       console.log("student Name: ", response.data['response']);
  //   //       this.setState({ studentAllName: response.data['response'] });
  //   //       console.log("first time::::::::;;", JSON.stringify(response.data['response']));
  //   //       for (let s_name of response.data['response']) {
  //   //         if (localStorage.getItem("name") == null) {
  //   //           localStorage.setItem("name", JSON.stringify([]));
  //   //         }
  //   //         else {
  //   //           console.log("else part");
  //   //           var oldData = JSON.parse(localStorage.getItem("name")) || [];
  //   //           console.log("oldData::::::::::", oldData);
  //   //           console.log("Above old data", s_name);
  //   //           console.log("tyoe of old data::::::", typeof (oldData));
  //   //           oldData.push(s_name);
  //   //           localStorage.setItem("name", JSON.stringify(oldData))
  //   //           console.log("oldData:::::::::::::", oldData);
  //   //         }
  //   //       }
  //   //     }
  //   //   }).catch(function (response) {
  //   //     console.log('*****handle failure******');
  //   //     console.log("response in fail", response);
  //   //   });

  //   // }
  // };

  // takeFacePicture = async function () {
  //   console.log("takeFacePicture");
  //   if (this.camera) {
  //     const data = await this.camera.takePictureAsync();
  //     console.log("Previous picture:::::::::", data.uri);
  //     CompressImage.createCompressedImage(data.uri, 'Android/data/com.attendance/cache/face/').then((response) => {
  //       // CompressImage.createCompressedImage(data.uri,'Face').then((response) => { com.attendance/cache/
  //       console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$4", response.uri)
  //       // response.path is the path of the new image
  //       // response.name is the name of the new image with the extension
  //       console.log("response.size#################", response.size)
  //       this.setState({ allImageUrl: [...this.state.allImageUrl, response.uri] })
  //     }).catch((err) => {
  //       // Oops, something went wrong. Check that the filename is correct and
  //       // inspect err to get more details.
  //       console.log("Error:::::::::", err);
  //     });
  //     // const result = await Image.compress(data.uri, {
  //     //   compressionMethod: 'auto',
  //     // });
  //     // console.log("result@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",result);
  //     // CompressImage.createCompressedImage(data.uri, appDirectory).then((response) => {
  //     //   // response.uri is the URI of the new image that can now be displayed, uploaded...
  //     //   // response.path is the path of the new image
  //     //   console.log("Path::::::::::",response.path);
  //     //   // response.name is the name of the new image with the extension
  //     //   // response.size is the size of the new image
  //     // }).catch((err) => {
  //     //   // Oops, something went wrong. Check that the filename is correct and
  //     //   // inspect err to get more details.
  //     // });
  //     // this.setState({ allImageUrl: [...this.state.allImageUrl, data.uri] })
  //   }
  //   // console.log("this.state.allImageUrl::::::::::::::",this.state.allImageUrl);
  // }

  // sendAllDataToServer = async function () {
  //   console.log("this.state.allImageUrl::::::::::::::", this.state.allImageUrl);
  //   const { navigation } = this.props;
  //   this.state.allImageUrl.forEach(element => {
  //     console.log("element::::::::::::::", element)
  //   });
  //   let formData = new FormData();
  //   formData.append('class_name', navigation.getParam('data'));
  //   this.state.allImageUrl.forEach(element => {
  //     console.log("element::::::::::::::", element)
  //     formData.append('file', {
  //       name: element.split('/')[9],
  //       uri: element,
  //       type: 'image/jpeg',
  //     });
  //   });

  //   axios({
  //     url: 'http://192.168.1.135:80/Attendance/match',
  //     method: 'POST',
  //     data: formData,
  //     headers: {
  //       'Accept': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'multipart/form-data',
  //     }

  //   }).then(response => {

  //     // for (let s_name of response.data['response']) {
  //     //   console.log("In Loop", s_name);
  //     // }
  //     if (response.data["status"] == 200 && response.data['response'].length > 0) {
  //       console.log("*****************************************************************************************************************************************************************************", response.data['response']);
  //       let res_Atten_Data = response.data['response']
  //       console.log(typeof (res_Atten_Data));
  //       console.log(res_Atten_Data);
  //       this.setState({ uniqueResponseData: [...new Set(res_Atten_Data)] })
  //       console.log("unique::::::::::::::::", this.state.uniqueResponseData);

  //     }
  //   }).catch(function (response) {
  //     console.log('*****handle failure******');
  //     console.log("response in fail", response);
  //   });
  // }

  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

 
  barcodeRecognized = ({ barcodes }) => {
    if (barcodes && barcodes.length) {
      this.barcodeMethod(barcodes)
    }
    // console.log("barcodes::",barcodes);
    this.setState({ barcodes });
  };

  renderBarcodes = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.barcodes.map(this.renderBarcode)}
    </View>
  );




  renderBarcode = ({ bounds, data, type }) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        {/* <Text style={[styles.textBlock]}>{`${data} ${type}`}</Text> */}
      </View>
    </React.Fragment>
  );

  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode, studentAllName } = this.state;
    const { navigation } = this.props;

    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        trackingEnabled
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : undefined
        }


        onFacesDetected={canDetectFaces ? this.facesDetected : null}
        onTextRecognized={canDetectText ? this.textRecognized : null}
        onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
        googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL}
        googleVisionBarcodeMode={
          RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE
        }
      >
        <View
          style={{
            flex: 0.5,
          }}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
              <Text style={styles.flipText}> FLIP </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
          </View>
        </View>

        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <Slider
            style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          />
        </View>

        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            // alignSelf: 'flex-end',
            alignSelf: 'center',
          }}
        >



          {/* <TouchableOpacity
            style={[
              styles.flipButton,
              {
                flex: 0.3,
                alignSelf: 'flex-end',
                backgroundColor: this.state.isRecording ? 'white' : 'darkred',
              },
            ]}
            onPress={() => { this.setState({ canDetectFaces: false }); navigation.navigate('Show_Attendance', { data: "testing" }) }}
          >
            <Text style={styles.flipText}> END ATTE </Text>

          </TouchableOpacity> */}
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            // alignSelf: 'flex-end',
            alignSelf: 'center',
          }}
        >

          <TouchableOpacity style={[
            styles.flipButton,
            {
              flex: 0.3,
              alignSelf: 'flex-end',
              backgroundColor: this.state.isRecording ? 'white' : 'darkred',
            },
          ]}
            onPress={this.toggle('canDetectBarcode')} >
            <Text style={styles.start_end_button}>
              {!canDetectBarcode ? 'Start' : 'Pause'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.flipButton,
              {
                flex: 0.3,
                alignSelf: 'flex-end',
                backgroundColor: this.state.isRecording ? 'white' : 'darkred',
              },
            ]}
            onPress={() => { this.setState({ canDetectBarcode: false }); navigation.navigate('Show_Barcode_Attendance', { "data": this.state.uniueBarcodeData,  "faculty_Name": navigation.getParam('faculty_Name'), "sam_Name": navigation.getParam('sam_Name'), "div_Name" : navigation.getParam('div_Name'), "subject_Name" : navigation.getParam('subject_Name'), "unit_Name" : navigation.getParam('unit_Name'), "course_Name" : navigation.getParam('course_Name'), "token":navigation.getParam('token')  }) }}
          >
            <Text style={styles.flipText}> END  </Text>

          </TouchableOpacity>




        </View>
        {this.state.zoom !== 0 && (
          <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
        )}
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity> */}
        </View>
        {/* {!!canDetectFaces && this.renderFaces()}
        {!!canDetectFaces && this.renderLandmarks()}
        {!!canDetectText && this.renderTextBlocks()} */}
        {!!canDetectBarcode && this.renderBarcodes()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  start_end_button: {
    color: 'white',
    fontSize: 15,
  },

  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 10,
    borderRadius: 10,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 4,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#008000',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#008000',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});


