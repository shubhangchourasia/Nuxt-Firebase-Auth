# Steps to follow

## Install Auth Dependencies

npm i firebase cookieparser js-cookie jwt-decode

#### firebase - To install firebase

#### cookieparser - To parse cookies stored in string format

#### js-cookie - To set and remove cookie

#### jwt-decode - To decode the token stored in cookie

## Create a project in firebase

## Start firebase commands

1. firebase login (Login with your Gmail account in which the project was ceated)
2. firebase init (Select services and existing project you want to use)

Note - To use custom claims we need Cloud Functions as well. Cloud Functions is a paid service and needs a Blaze Plan (Paid as you go plan) in Firebase

#### Create a folder plugins at root and then create a file firebaseConfig.js inside it and copy the code from that file. And add that path to plugins in nuxt.config.js file.

#### Go through the following files to setup store and state management

- /store/index.js
- /store/user.js
- /helper/index.js
- middleware/auth.js
- layouts/default.vue
- functions/index.js

#### Now deploy function using below commands

Note - Make sure you have Blaze plan to use Functions

### Some basic commands

- Firestore -> firebase deploy --only firestore:rules
- Storage -> firebase deploy --only storage
- All Functions -> firebase deploy --only functions
- Select Functions -> firebase deploy --only functions:addMessage,functions:makeUppercase

Note - Add project id in .firebaserc file inside default key if there is an error or if it does not appear after firebase init step. 