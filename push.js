var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BDHO1hYR6S41bWgUCwtCzTFrOwh-hikYAW47nKAYfw-rkuPOOdIfsuIZvshECBKVzAg9mhUhCg7Dog_CCXgSYiw",
   "privateKey": "fIdOpII1mAmElIg0c-U6iDgA13QM0M8WaAmEgSD0MYQ"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fO-DDXHJa2U:APA91bH8tHQ6rSJ5IgMEGoMMSq0Q8-L43Ate5GT_G8RR4Ho9VdoH9V-b71ZpNK-mLoi88sQQpYblSuIlJFbuRpbiR0YDEn1qV1S943X4QRq8TYViHRllr2TOSb_ovs-8CIWUvX8MEg1m",
   "keys": {
       "p256dh": "BA0mK4fFDzrQS8f5nPM6+FUo7UP4jssoqyUzi4dfTgHFHob23Vtrj28LkqJP/sicodsFxqxFwpRmfUqc/8xLgwk=",
       "auth": "E3JZzFHR8DEUc3OxDMq2lA=="
   }
};
var payload = 'Liga akan segera dimulai';
 
var options = {
   gcmAPIKey: '8302141572',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);