'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');
let dispositivo;

const constraints = {
  audio: false,
  mandatory: {
    "minWidth": 1280,
    "minHeight": 720
  },
  video: {
    optional: [
      {
        sourceId: dispositivo
      }
    ]
  }
};

/* async function init() {

  console.log("id de la fuentey: " + constraints.video.optional[0].sourceId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
} */

var strm;
// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
async function init() {

  console.log("id de la fuentey: " + constraints.video.optional[0].sourceId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
      console.log('paso 2');
    }
    navigator.mediaDevices.enumerateDevices().then(function (e) {
      console.log('paso 3');
      e.forEach(el => {
        if (el.kind == 'videoinput') {
          console.log('id: ' + el.deviceId);
          console.log('index: ' + el.label.indexOf('back'));
          if (el.label.indexOf('back') > 0) {
            constraints.video.optional[0].sourceId = el.deviceId;
            console.log('dispositivo: ' + constraints.video.optional[0].sourceId);
          }
        }
      });
    }).then(async function () {
      console.log('paso 4');
      const stream2 = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream2);
    });

  } catch (e) {
    console.log('no se pudo abrir la camara');
  }
}
//////////////////////

/* window.setTimeout(function () {
  console.log(haySensor);
  
},500); */
function startGame(){
  init();
  document.getElementById('instrucciones').style.display = 'none';
  if (haySensor) {
    iniciaJuego();
  } else {
    /* console.log('ejecuta esto');
    const cielo = document.getElementById('skyCont')//.innerHTML = `<a-sky src="#sky"></a-sky>`;
    cielo.innerHTML = `<a-sky src="#sky"></a-sky>`; */
    //document.getElementById('global').setAttribute('rotation',{x:0, y:0, z:0});  
    showVentana(ventanaContent[3]);
    document.getElementById('dedo').setAttribute('width',.017);
    document.getElementById('dedo').setAttribute('height',.02);
  }
}

