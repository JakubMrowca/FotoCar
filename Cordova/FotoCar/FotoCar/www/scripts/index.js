// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );
    var consoleLog = document.getElementById("consoleLog");
    var fileSYstem;

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

            navigator.camera.getPicture(cameraSuccess, cameraError, {
                quality: 50,
                //saveToPhotoAlbum: true,
                //destinationType: Camera.DestinationType.FILE_URI
            });
        });

        search.addEventListener("click", function () {

        });
    };

    function cameraSuccess(imageData) {
        consoleLog.innerHTML = imageData;
       
        movePic(imageData);

    }
    function movePic(file) {
        window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
    }

    //Callback function when the file system uri has been resolved
    function resolveOnSuccess(entry) {
        var d = new Date();
        var n = d.getTime();
        //new file name
        var newFileName = "newPersistentFile.jpg";
        var myFolderApp = "WINTMP12435";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
                //The folder is created if doesn't exist
                fileSYstem = fileSys;
                fileSys.root.getDirectory(myFolderApp,
                    { create: true, exclusive: false },
                    function (directory) {
                        entry.moveTo(directory, newFileName, successMove, resOnError);
                    },
                    resOnError);
            },
            resOnError);
    }

    //Callback function when the file has been moved successfully - inserting the complete path
    function successMove(entry) {
        consoleLog.innerHTML = "działa";
        fileSYstem.root.getFile("newPersistentFile.jpg",
            { create: true, exclusive: false },
            function(fileEntry) {
                //I do my insert with "entry.fullPath" as for the path}
                var image = document.getElementById('image');
                image.src = fileEntry.toURL();
                
            });
    }

    function resOnError(error) {
        consoleLog.innerHTML="nie działa";
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