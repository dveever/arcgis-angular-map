// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  arcgisServiceUrl: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer',
  firebase: {
    apiKey: "AIzaSyA0P9SPKiKAIFKV6IcBiwZycr7wzYDhQiA",
    authDomain: "angular-arcgis-map.firebaseapp.com",
    projectId: "angular-arcgis-map",
    storageBucket: "angular-arcgis-map.appspot.com",
    messagingSenderId: "626597696908",
    appId: "1:626597696908:web:0e7ce4b1778ca02599f2a9",
    measurementId: "G-THL8NVJVPE"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
