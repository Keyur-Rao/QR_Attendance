import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, ToastAndroid, Button } from 'react-native';
import { AsyncStorage } from 'react-native';
import { RNCamera } from 'react-native-camera';

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


const Final_Attendance = (props) => {
  const [isScanTeacherQR, setIsScanTeacherQR] = useState(false);
  const [flash, setFlash] = useState('off');
  const [orientation, setOrientation] = useState(2);
  const [zoom, setZoom] = useState(0);
  const [autoFocus, setAutoFocus] = useState('on');
  const [depth, setDepth] = useState(0);
  const [type, setType] = useState('back');
  const [whiteBalance, setWhiteBalance] = useState('auto');
  const [ratio, setRatio] = useState('16:9');
  const [recordOptions, setRecordOptions] = useState({
    mute: false,
    maxDuration: 5,
    quality: RNCamera.Constants.VideoQuality['144p'],
  });
  const [isRecording, setIsRecording] = useState(false);
  const [canDetectFaces, setCanDetectFaces] = useState(true);
  const [canDetectText, setCanDetectText] = useState(false);
  const [canDetectBarcode, setCanDetectBarcode] = useState(true);
  const [faces, setFaces] = useState([]);
  const [textBlocks, setTextBlocks] = useState([]);
  const [barcodes, setBarcodes] = useState([]);
  const [teacherBarcodes, setTeacherBarcodes] = useState([]);
  const [inQueue, seInQueue] = useState(false);
  const [initCount, setInitCount] = useState(0);
  const [studentAllName, setStudentAllName] = useState([]);
  const [barcodeAllData, setBarcodeAllData] = useState([]);
  const [teacherBarcodeData, setTeacherBarcodeData] = useState([]);
  const [uniueBarcodeData, setUniueBarcodeData] = useState([]);
  const [uniqueTeacherBarcodeData, setUniqueTeacherBarcodeData] = useState([]);
  const [uniqueResponseData, setUniqueResponseData] = useState([]);
  const [allImageUrl, setAllImageUrl] = useState([]);


  const toggle = value => () =>{
        setCanDetectBarcode(!canDetectBarcode)
  }

  const toggleFacing = ()=>{
    setType(type === 'front' ? 'back' : 'front')
  }

  const toggleFlash = ()=>{
    setFlash(flashModeOrder(flash))
  }

  const toggleWB = ()=>{
    setWhiteBalance(wbOrder(whiteBalance))
  }

  const toggleFocus= ()=>{
    setAutoFocus(autoFocus === 'on' ? 'off' : 'on')
  }

  const zoomOut= ()=> {
    setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1)
  }

  const zoomIn= ()=> {
    setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1)
  }

  const setFocusDepth= (depth)=> {
    setDepth(depth);
  }

  const barcodeMethod = async (barcodes)=> {
    barcodes.forEach(barcode => {
      if (! JSON.parse(barcode['data'])['faculty_Name']) {
          setBarcodeAllData([...barcodeAllData, barcode["data"]]);
      }
    });
    setUniueBarcodeData([...new Set(barcodeAllData)])
  }

  const barcodeMethodTeacher = async (barcodes) =>{
    barcodes.forEach(barcode =>{
        if (JSON.parse(barcode['data'])['faculty_Name']) {
          if (!teacherBarcodeData['faculty_Name']) {
              setTeacherBarcodeData(JSON.parse(barcode['data']));
              setIsScanTeacherQR(true);
          }
        }
    });
  }

  const barcodeRecognized = async ({ barcodes }) => {
    if (!isScanTeacherQR) {   
      if (barcodes && barcodes.length) {
        barcodeMethodTeacher(barcodes);
      }
      setUniqueTeacherBarcodeData(barcodes);
    }
    else{
      if (barcodes && barcodes.length) {
        barcodeMethod(barcodes)
      }
      setBarcodes(barcodes);
      }
    };

    const renderBarcodes = () => {
    return <View style={styles.facesContainer} pointerEvents="none">
                {barcodes.map(renderBarcode)}
           </View>
    };

    const renderBarcode = ({ bounds, data, type }) => {
        return <React.Fragment key={data + bounds.origin.x}>
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
    };
    
   const showAlert = (message)=>{
    return <TouchableOpacity style={{backgroundColor: 'grey', padding: 20, opacity: 0.7, bottom: 150, borderRadius: 50, marginHorizontal: 30}}>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>{message}</Text>
    </TouchableOpacity>
    }

  const renderCamera = (props)=>{
    const { navigation } = props;
    let facesDetected = "";
    return (
        <RNCamera
          ref={ref => {
            camera = ref;
          }}
          style={{
            flex: 1,
          }}
          type={type}
          flashMode={flash}
          autoFocus={autoFocus}
          zoom={zoom}
          whiteBalance={whiteBalance}
          ratio={ratio}
          focusDepth={depth}
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
          onFacesDetected={canDetectFaces ? facesDetected : null}
          onTextRecognized={canDetectText ? textRecognized : null}
          onGoogleVisionBarcodesDetected={canDetectBarcode ? barcodeRecognized : null}
          googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ALL}
          googleVisionBarcodeMode={
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE
          }>
  
          <View style={{flex: 0.5,}}>
            <View style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity style={styles.flipButton} onPress={toggleFacing.bind()}>
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
          
          { isScanTeacherQR ? showAlert("Now scan Students QR!"): showAlert("Please scan Teacher QR First!")}
         
  
          <View
            style={{
              flex: 0.4,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <Slider
              style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
              onValueChange={setFocusDepth.bind()}
              step={0.1}
              disabled={autoFocus === 'on'}
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
                  backgroundColor: isRecording ? 'white' : 'darkred',
                },
              ]}
              onPress={() => { this.setState({ canDetectFaces: false }); navigation.navigate('Show_Attendance', { data: "testing" }) }}
            >
              <Text style={styles.flipText}> END ATTE </Text>
  
            </TouchableOpacity> */}
          </View>
          <View style={{
              flex: 0.1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              // alignSelf: 'flex-end',
              alignSelf: 'center',
            }}>
  
            <TouchableOpacity style={[
              styles.flipButton,
              {
                flex: 0.3,
                alignSelf: 'flex-end',
                backgroundColor: isRecording ? 'white' : 'darkred',
              },
            ]}
              onPress={toggle('canDetectBarcode')} >
              <Text style={styles.start_end_button}>
                {!canDetectBarcode ? 'START' : 'PAUSE'}
              </Text>
            </TouchableOpacity>
      
            <TouchableOpacity
              style={[
                styles.flipButton,
                {
                  flex: 0.3,
                  alignSelf: 'flex-end',
                  backgroundColor: isRecording ? 'white' : 'darkred',
                },
              ]}
              onPress={() => { setCanDetectBarcode(false); navigation.navigate('Show_Barcode_Attendance', { "data": uniueBarcodeData,  "faculty_Name": navigation.getParam('faculty_Name'), "sam_Name": navigation.getParam('sam_Name'), "div_Name" : navigation.getParam('div_Name'), "subject_Name" : navigation.getParam('subject_Name'), "unit_Name" : navigation.getParam('unit_Name'), "course_Name" : navigation.getParam('course_Name'), "token":navigation.getParam('token')  }) }}
            >
              <Text style={styles.flipText}> END  </Text>
  
            </TouchableOpacity>
  
          </View>
  
          {zoom !== 0 && (
            <Text style={[styles.flipText, styles.zoomText]}>Zoom: {zoom}</Text>
          )}
  
          <View
            style={{
              flex: 0.1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
  
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={zoomIn.bind()}>
              <Text style={styles.flipText}> + </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
              onPress={zoomOut.bind()}>
              <Text style={styles.flipText}> - </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
              onPress={toggleFocus.bind()}>
              <Text style={styles.flipText}> AF : {autoFocus} </Text>
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
          {!!canDetectBarcode && renderBarcodes()}
        </RNCamera>
      );

  }


  return (
    <>
        <View style={styles.container}>{renderCamera(props)}</View>;
    </>
  )
}

export default Final_Attendance;

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
