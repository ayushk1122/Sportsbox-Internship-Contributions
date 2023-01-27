import React, { Component, useState } from 'react';
//import {Grid, CircularProgress} from '@material-ui/core';
//import firebase, { axiosWithToken } from '../../common/firebase'
//import {AccountProfile, AccountDetails, AccountNotFound, SessionList} from './components';
//import { withStyles } from '@material-ui/styles';
//import { functionBaseUrl } from '../../common/firebase'
//import { AnalyticsEvent } from 'firebase-functions/v1/analytics';
//import { getAnalytics } from "firebase/analytics";
//import { initializeApp } from 'firebase-admin/app';
//import { admin } from 'googleapis/build/src/apis/admin';
import admin from 'firebase/app';
import 'firebase/firestore';
import firebase from '../../common/firebase'
import {functionBaseUrl, axiosWithToken} from '../../common/firebase';
//import { Button } from '@material-ui/core';
import { CssBaseline, Container, Avatar, Typography, Button, Menu, Grid, Paper, Switch } from '@material-ui/core';
import { async } from 'validate.js';
import { setTokenSourceMapRange } from 'typescript';
//import DevicesController from './DevicesController';
//import { getAnalytics, logEvent } from "firebase/analytics";

const functions = require('firebase-functions');
var connectedDevices = []

function sendNoti(inputToken) {
    axiosWithToken(functionBaseUrl+'/api/sendNoti', {
        method: 'post',
        data: {
            token: inputToken
    }}).then(response => {
        alert('Success');
    })
    .catch(err => {
        console.log(err)
    });
}

const Devices = (props) => {
        //var uid = firebase.auth().currentUser.uid;
    //super(props);
    // var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
    // var analytics = firebase.auth().currentUser.functions.analytics().deviceInfo.deviceId;
    const [stage, setStage] = useState('initial')
    const [devices, setDevices] = useState([])
    const [connectedDev, setConnectedDev] = useState([])
    // var state = {
    //     stage: "initial",
    //     devices: [],
    //     connectedDev: [],
    // }
    console.log(props)

    
    const setUpRemote = () => {
        // var button = document.getElementById('setUp')
        // button.style.display = 'none';
        // var title = document.getElementById('connected devices')
        // title.style.display = 'none'

        var print = async() => {
            console.log('device length ', connectedDev.length)
            for (let i = 0; i <  connectedDev.length; i++) {
                console.log( connectedDev[i]['deviceName'])
            }
        }
        //console.log('setPairing', this.props.setPairing)
        props.setPairing(false)
        return print
        
    }

    const sendConnection = (event, device) => {
        //var button = document.getElementById(devices[i]['deviceId']);
    
        //if (event.target.checked) {
        //console.log(event.target.checked)
        if (event.target.checked == true) {
            sendNoti(device['fcmToken'])
            connectedDevices.push(device)
            console.log(connectedDevices.length)
            setConnectedDev(connectedDevices => [...connectedDevices, device])
            var text = document.getElementById(device['deviceId'])
            text.textContent = "connected"
            console.log(device)
            //console.log(connectedDev.length)
        }
    }

    const readDeviceData = () => {
        const userId = firebase.auth().currentUser.uid;
        console.log(userId);
        // var image = document.getElementById('pairing');
        // image.style.display = 'none ';
        // var but = document.getElementById('Pbutton');
        // but.style.display = 'none';
        var devices = [];
        //var connectedDevices = [];
        
        admin.firestore().collection("users").doc(userId).get().then(result =>{
            if (result.data().devices.length != 0) {
                console.log("Device number: ", result.data().devices.length);
                console.log("Choose which devices to connect to: ");
                
    
                for (let i = 0; i < result.data().devices.length; i++) {
                    console.log(devices.length);
                    // document.body.appendChild(button);
                    devices.push(result.data().devices[i])
                }

                var title = 
                <Typography 
                        id = 'connected devices'
                        style = {{alignItems: 'center', fontWeight: '700', marginLeft: '50px', 
                                marginTop: '100px', marginBottom: '25px', marginLeft: '225px', 
                                fontSize: '34px', display: stage==="initial" ? "block": "none"}}>Connected Devices
                </Typography>


                const deviceElements = devices.map(b=> (    
                    <div style = {{backgroundColor: '#FFFFFF', width: '65%', height: '85%', marginLeft: 'auto', marginRight: 'auto',  alignItems: 'center'}}>
                    
                    <Paper variant="outlined" elevation={7} style = {{alignItems: 'center'}} />
                    
                        <Grid container spacing={10} direction="row" alignItems="center">
                            <Grid item md = {4}>
                                <Typography
                                    //id = {b['deviceId']}
                                    alignItems="center"
                                    style = {{borderRadius: 0, marginTop: '10px', fontWeight: 'bold', marginLeft: '15px'}}
                                    >{b['deviceName']}
                                </Typography>
                            </Grid>

                            <Grid item md = {4}>
                                <Typography id = {b['deviceId']} style = {{alignItems: 'center', fontWeight: 'bold', marginLeft: '50px'}}>Not Connected</Typography>
                            </Grid>

                            <Grid item md = {4}>
                                <Switch 
                                    defaultUnchecked color="secondary" size = 'small' 
                                    
                                    onChange =  {event => {(sendConnection(event, b))}}>
                                </Switch>
                            </Grid>
                            
                        </Grid>

                    <Paper/>  

                    </div> 
                ))
                
                var setUp = 
                <Button
                    id = 'setUp'
                    style = {{width: '25%', marginLeft: '460px', marginTop: '200px', display: stage==="initial" ? "block": "none"}}
                    color = "primary" variant="contained" 
                    onClick = {setUpRemote}
                >SET IT UP NOW</Button>

                deviceElements.unshift(title)
                deviceElements.push(setUp)
                // state.devices = deviceElements
                // state.stage = 'pairing'
                //this.setState({devices: deviceElements, stage: 'pairing'})
                setDevices(deviceElements)
                setStage('pairing')
                //setConnectedDev(connectedDevices)
                //this.setState({connectedDev: connectedDevices})
                console.log('connected devices', connectedDev.length)
                //this.setState({connectedDev: connectedDevices})


            }
    
            // for (let i = 0; i < devices.length; i++) {
            //     //var button = document.getElementById(devices[i]['deviceId']);
            //     var swi = document.getElementById(devices[i]['deviceId']);
            //     swi.onChange = async() =>{
            //         await sendNoti(devices[i]['fcmToken']);
            //         connectedDevices.push(devices[i]);
            //     } 

            // }
    
        })
    }



    //render() {
        // Rendering a button
        //<Button onClick={() => sendNoti()}>Push Noti</Button>

    return (<div style ={{'background-color': '#F4F6F8'}} >
            <img src = "/images/PairingImage.PNG" id = 'pairing' width = "750px" height = "auto" style = {{marginLeft: '250px', marginTop: '100px', backgroundColor: '#F4F6F8', display: stage==="initial" ? "block": "none"}} />


            <div style={{display: stage==="initial" ? "block": "none"}}>
            <Button 
                id = 'Pbutton'
                style = {{width: '25%', marginLeft: '460px', marginTop: '50px'}}
                color = "primary" variant="contained" 
                onClick={readDeviceData}>Start Pairing</Button>
            </div>
            <div style={{display: stage==="pairing" ? "block": "none"}}>
                {devices}    
            </div>  
        </div>
    );
        
    //};
    
};

export default Devices;