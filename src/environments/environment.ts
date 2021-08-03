// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyATeJhYeBb8T9xYLdFscT79jV_xPRmhrgY",
    authDomain: "medishop-20b1a.firebaseapp.com",
    projectId: "medishop-20b1a",
    storageBucket: "medishop-20b1a.appspot.com",
    messagingSenderId: "873212789790",
    appId: "1:873212789790:web:b79db7d217d2d93f629a0f",
    measurementId: "G-595S0RF21H"
  },

  WS_PATH: "http://localhost:8080/medishop/rs"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
