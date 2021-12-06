var isTargetFound = false;
  var interacted = false;
  var cuenta2 = 0;
  AFRAME.registerComponent("markerhandler", {
    init: function () {

      markerObj = document.querySelector('a-marker');
      markerObj.hidden = true;

      //dino.setAttribute('animation-mixer', {clip: 'C4D Animation Take', loop: 'repeat'});
    },

    tick: function () {

      if (markerObj != null) {
        if (markerObj.object3D.visible == true) {

          if (isTargetFound)
            return;

          isTargetFound = true;
          //console.log("marker visible");

          cuenta2++;
          if (cuenta2 == 1) {
            document.getElementById("plane").emit("planeout");
            document.getElementById("qr").emit("qrout");

            document.getElementById("plane").emit("planeout2");
            document.getElementById("qr").emit("qrout2");

            document.getElementById("logo").emit("inLogo");
            document.getElementById("planeLogo").emit("subelogo");
            //audFondo.play();
            //gif.play();
            /* document.getElementById("swipe").emit("planein"); */
          }

          //document.getElementById("videoScene").emit("an1");
        }
        else {

          if (!isTargetFound)
            return;

          isTargetFound = false;
          //console.log("marker invisible");

        }
      }
    }
  });