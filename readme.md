## Description
QR based attendance for School and Colleges.

## Features

	- QR based Attendance
	- Attendance entries to Google Sheets (https://docs.google.com/spreadsheets/d/1M8ywh57PmN1lfQkbRuPpv9Zhr6EAiDg9a_Lrr3_9BDc/edit#gid=0)
	- Add Subjects, Class, Semester etc. details from Sheets only (https://docs.google.com/spreadsheets/d/10mgjKImWlbZWbUxi4SemgqE3DpK4pX_xctFuOSLDd2A/edit#gid=0)

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Xcode 12](https://developer.apple.com/xcode) (For IOS)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)
- [RN >= 0.64]

## Folder structure

- `src`: This folder is the main container of all the code inside application.
  - `navigations`: This folder contains all the routes.
  - `screens`: This folder contains all the required screens.
  - `Components`: Contains Components that are used through the app 
  - `App.js`: Main component that starts the whole app.
  - `index.js`: Entry point of the application.

## Run on Device

- Go to project's root folder and run `npm install`.
- If you are using Xcode 12.5 or higher got to /ios and execute `pod install --`repo-update`
- Run `npm run ios` or `npm run android`  or `react-native run-android` to start application!

(Using yarn: `yarn ios` or `yarn android`)

Find the video tutorial of installation here: `https://www.youtube.com/watch?v=bPVjdHY_tuM&feature=emb_title`

### React-Native-Rename to change packange name

You can start by cloning this repository and using [react-native-rename](https://github.com/junedomingo/react-native-rename). In the current state of this project, it should give you no issues at all, just run the script, delete your node modules and reinstall them and you should be good to go.

- react-native-rename "QR Attendance" -b com.comapany.app

Keep in mind that this library can cause trouble if you are renaming a project that uses `Pods` on the iOS side.


## Generate production version

These are the steps to generate `.apk`, `.aab` and `.ipa` files

### Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Execute `./gradlew assemble[Env][BuildType]` (./gradlew assembleRelease)

Note: You have three options to execute the project
`assemble:` Generates an apk that you can share with others.
`install:` When you want to test a release build on a connected device.
`bundle:` When you are uploading the app to the Play Store.

For more info please go to https://reactnative.dev/docs/signed-apk-android

### iOS

1. Go to the Xcode
2. Select the schema
3. Select 'Any iOS device' as target
4. Product -> Archive

For more info please go to https://reactnative.dev/docs/publishing-to-app-store

### Changelog: 
 `Version: 0.0.1` 