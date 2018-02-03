# hciContactsManager Installation Guide

## APP Installation ##
Even if you can simply install the apk in the folder APK, you need to install Cordova for compile the app.
### Cordova Installation ###
Following the [official guide](https://cordova.apache.org/docs/en/latest/guide/cli/index.html), 
you can install Cordova with the tool [npm](https://www.npmjs.com/):

> npm install -g cordova

Then you can compile the project (you need the [Android SDK](https://developer.android.com/studio/index.html)), 
moving in "qr_contacts_mgr" directory and lanching this command:

> cordova run android

Note: it will open an emulator if you don't have connected any device.

### Web site setup ###
If you want to edit and the website in your localhost, you must copy the folder "hciContactsManager" in your local "server" (es. [WampServer](http://www.wampserver.com/en/)) and import the database "my_hcicontactsmanager2017".
