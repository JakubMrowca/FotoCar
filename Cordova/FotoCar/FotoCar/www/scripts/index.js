// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    var consoleLog = document.getElementById("consoleLog");

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
       
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        var foto = document.getElementById("foto");
        var search = document.getElementById("search");
        foto.addEventListener("click", function () {

            navigator.camera.getPicture(cameraSuccess, cameraError, { cameraOptions });
        });

        search.addEventListener("click", function () {

        });
    };

    function cameraSuccess(imageData) {
        consoleLog.innerHTML = imageData;
        var image = document.getElementById('image');
        image.src = "data:image/jpeg;base64," + imageData;
    }
    function cameraError(parameters) {
        consoleLog.innerHTML = parameters;

    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();