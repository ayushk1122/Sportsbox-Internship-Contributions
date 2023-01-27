
//import firebase from 'src/commom/firebase';
//const functions = require('firebase-functions');

// exports.androidPushNotification = functions.firestore.document().onCreate(
//     (snapshot, context) => {
//             result => {
//                 var registrationToken = [];
//                 result.docs.forEach(
//                     tokenDocument => {
//                         registrationToken.push(tokenDocument.data().token);
//                     }
//                 );
//                 admin.messaging().sendMulticast(
//                     {
//                         tokens: registrationToken,
//                         notifcation: {
//                             title: snapshot.data().title, 
//                             body: snapshot.data().body
//                         }
//                     }
                    
//                 );
//             }
//         );
//     }
// );

export {default} from './DevicesController';