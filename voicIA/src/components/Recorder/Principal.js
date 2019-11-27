import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
  } from 'react-native-audio-recorder-player';
  import {
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
  } from 'react-native';

  import React, { Component } from 'react';

  import { ratio, screenWidth } from '../../../assets/utils/Styles';
  import Button from './Button';
  import { getString } from '../../../assets/utils/STRINGS';
  import {connect} from 'react-redux'
  import {addAudio} from '../../store/actions/audios'
  
  //const fs = require('fs')
  
  const styles = StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      flex: 1,
      backgroundColor: '#FFF',
      flexDirection: 'column',
      alignItems: 'center',
      
    },
    titleTxt: {
      marginTop: 80 * ratio,
      color: '#888',
      fontSize: 28 * ratio,
    },
    viewRecorder: {
      marginTop: 40 * ratio,
      width: '100%',
      alignItems: 'center',
    },
    recordBtnWrapper: {
      flexDirection: 'row',
    },
    viewPlayer: {
      marginTop: 20 * ratio,
      alignSelf: 'stretch',
      alignItems: 'center',
    },
    viewBarWrapper: {
      marginTop: 20 * ratio,
      marginHorizontal: 28 * ratio,
      alignSelf: 'stretch',
    },
    viewBar: {
      backgroundColor: '#ccc',
      height: 4 * ratio,
      alignSelf: 'stretch',
    },
    viewBarPlay: {
      backgroundColor: 'black',
      height: 4 * ratio,
      width: 0,
    },
    playStatusTxt: {
      marginTop: 8 * ratio,
      color: '#ccc',
    },
    playBtnWrapper: {
      flexDirection: 'row',
      marginTop: 50 * ratio,
    },
    btn: {
      borderColor: '#888',
      borderWidth: 1 * ratio,
    },
    btnUpload: {
      borderColor: '#900',
      borderWidth: 1 * ratio,
      marginTop: 30 * ratio,
      
    },
    txtUpload: {
      color: '#920',
      fontSize: 50 * ratio,
      fontWeight: 'bold',
      marginHorizontal: 8 * ratio,
      marginVertical: 5 * ratio,
    },
    
    txt: {
      color: '#888',
      fontSize: 30 * ratio,
      marginHorizontal: 8 * ratio,
      marginVertical: 4 * ratio,
    },
    txtRecordCounter: {
      marginTop: 32 * ratio,
      color: '#888',
      fontSize: 40 * ratio,
      textAlignVertical: 'center',
      fontWeight: '200',
      fontFamily: 'Helvetica Neue',
      letterSpacing: 3,
    },
    txtCounter: {
      marginTop: 12 * ratio,
      color: '#888',
      fontSize: 20 * ratio,
      textAlignVertical: 'center',
      fontWeight: '200',
      fontFamily: 'Helvetica Neue',
      letterSpacing: 3,
    },
  });
  
    
  class Page extends Component{
    
  
    constructor(props) {
      super(props);
      this.state = {
        isLoggingIn: false,
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',

      };
  
      this.audioRecorderPlayer = new AudioRecorderPlayer();
      this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }
  
    render() {
      let playWidth =
        (this.state.currentPositionSec / this.state.currentDurationSec) *
        (screenWidth - 56 * ratio);
      if (!playWidth) playWidth = 0;
  
      return (
        <View style = {styles.container}>
          <Text style={styles.txtRecordCounter}>{this.state.recordTime}</Text>
          <View style={styles.viewRecorder}>
            <View style={styles.recordBtnWrapper}>
              <Button
                style={styles.btn}
                onPress={this.onStartRecord}
                textStyle={styles.txt}>
                {getString('RECORD')}
              </Button>
              <Button
                style={[
                  styles.btn,
                  {
                    marginLeft: 12 * ratio,
                  },
                ]}
                onPress={this.onStopRecord}
                textStyle={styles.txt}
              >
                {getString('STOP')}
              </Button>
            </View>
          </View>
          <View style={styles.viewPlayer}>
            <TouchableOpacity
              style={styles.viewBarWrapper}
              onPress={this.onStatusPress}>
              <View style={styles.viewBar}>
                <View style={[styles.viewBarPlay, { width: playWidth }]} />
              </View>
            </TouchableOpacity>
            <Text style={styles.txtCounter}>
              {this.state.playTime} / {this.state.duration}
            </Text>
            <View style={styles.playBtnWrapper}>
              <Button
                style={styles.btn}
                onPress={this.onStartPlay}
                textStyle={styles.txt}
              >
                {getString('PLAY')}
              </Button>
              
            </View>
            <Button
                style={[
                  styles.btnUpload,
                  {
                    marginLeft: 12 * ratio,
                  },
                ]}
                onPress={this.onUpload}
                textStyle={styles.txtUpload}
              >
                {getString('UPLOAD')}
              </Button>
          </View>
        </View>
      );
    }
  
    onStatusPress = (e) => {
      const touchX = e.nativeEvent.locationX;
      console.log(`touchX: ${touchX}`);
      const playWidth =
        (this.state.currentPositionSec / this.state.currentDurationSec) *
        (screenWidth - 56 * ratio);
      console.log(`currentPlayWidth: ${playWidth}`);
  
      const currentPosition = Math.round(this.state.currentPositionSec);
      console.log(`currentPosition: ${currentPosition}`);
  
      if (playWidth && playWidth < touchX) {
        const addSecs = Math.round(currentPosition + 3000);
        this.audioRecorderPlayer.seekToPlayer(addSecs);
        console.log(`addSecs: ${addSecs}`);
      } else {
        const subSecs = Math.round(currentPosition - 3000);
        this.audioRecorderPlayer.seekToPlayer(subSecs);
        console.log(`subSecs: ${subSecs}`);
      }
    };
  
    onStartRecord = async () => {


      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your storage to write a file',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the storage');
          } else {
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'Permissions for write access',
              message: 'Give permission to your storage to write a file',
              buttonPositive: 'ok',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('permission denied');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
      const path = Platform.select({
        ios: 'hello.m4a',
        android: `sdcard/hello.mp4`,
      });
      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };
      console.log('audioSet', audioSet);
      const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
      this.audioRecorderPlayer.addRecordBackListener((e) => {
        this.setState({
          recordSecs: e.current_position,
          recordTime: this.audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ),
        });
      });
      console.log(`uri: ${uri}`);
    };


    onUpload = async () => {
      
      var uri = await `sdcard/hello.mp4`
      var info = audioSet

      this.props.onAddAudio({
        id: Math.random() * 10,
        user_id: this.props.user_id,
        uri: uri,
        info: info
      })
      this.setState({
        isLoggingIn: false,
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
      })
    }


    onStopRecord = async () => {
      const result = await this.audioRecorderPlayer.stopRecorder();
      this.audioRecorderPlayer.removeRecordBackListener();
      this.setState({
        recordSecs: 0,
      });
      console.log(result);
    };
  
    onStartPlay = async () => {
      console.log('onStartPlay');
      const path = Platform.select({
        ios: 'hello.m4a',
        android: 'sdcard/hello.mp4',
      });
      const msg = await this.audioRecorderPlayer.startPlayer(path);
      this.audioRecorderPlayer.setVolume(1.0);
      console.log(msg);
      this.audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.current_position === e.duration) {
          console.log('finished');
          this.audioRecorderPlayer.stopPlayer();
        }
        this.setState({
          currentPositionSec: e.current_position,
          currentDurationSec: e.duration,
          playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
          duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
        return;
      });
    };
  
    onPausePlay = async () => {
      await this.audioRecorderPlayer.pausePlayer();
    };
  
    onStopPlay = async () => {
      console.log('onStopPlay');
      this.audioRecorderPlayer.stopPlayer();
      this.audioRecorderPlayer.removePlayBackListener();
    };
  }

  const mapStateToProps = ({user}) => {
      return{
        name: user.name,
        user_id: user.id,
        email: user.email
      }
  }

  const mapDispatchToProps = dispatch => {
    return{
      
      onAddAudio: audio => dispatch(addAudio(audio))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Page);