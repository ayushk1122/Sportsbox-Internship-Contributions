import React, { Component } from 'react';
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
import Devices from './Devices';
import RemoteControl from './Devices'
//import { getAnalytics, logEvent } from "firebase/analytics";

const functions = require('firebase-functions');
var connectedDevices = []




class DevicesController extends Component {
    constructor(props) {
        //var uid = firebase.auth().currentUser.uid;
        super(props);
        // var userStatusDatabaseRef = firebase.database().ref('/status/' + uid);
        // var analytics = firebase.auth().currentUser.functions.analytics().deviceInfo.deviceId;
        this.state = {
            pairing: true,
            devices: [],
            connectedDev: [],
        }

        //Devices(props);

    }

    setConnectedDev = (inputDev) => {
        this.setState({
            connectedDev: inputDev
        })
    }

    setPairing = (input) => {
        this.setState({
            pairing: input
        })
    }

   

    render() {
        return (
            <div>
            { this.state.pairing ? 
            <Devices
                //state = {this.state}
                connectedDev={this.state.connectedDev}
                setConnectedDev={this.setConnectedDev}
                setPairing={this.setPairing}
            /> :
            <RemoteControl
                connectedDev={this.state.connectedDev}
            />}
            </div>
        )
    }
    
};

export default DevicesController;