//import haySensor from './aframe.js'

//Parametros de inicio
const cantidadCubos = 25;
let cantidadBalas = 100;
let timePlayAgain = 0;
const valorCubo = 10;
const valorResta = 10;
let tiempo = 60;
let tini = tiempo; //guarda el tiempo con el que se inicia

//Variables globales
let puntos = 0;
let statusGame = 2; //0=iniciado 1=terminado
let record = 0;
let nameRecord = 'holi';

///////FIREBASE//////////////////////////////////////////////////////
var firebaseConfig = {
    apiKey: "AIzaSyBz-0SRk-8mYCqJUGTUw9zmQipko28M5jc",
    authDomain: "ganador-e6710.firebaseapp.com",
    databaseURL: "https://ganador-e6710.firebaseio.com",
    projectId: "ganador-e6710",
    storageBucket: "ganador-e6710.appspot.com",
    messagingSenderId: "384533878152",
    appId: "1:384533878152:web:17c54f184e7a88ba"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var datos = firebase.database().ref("ganador");
var reproducciones = firebase.database().ref("plays");

firebase.database().ref("ganador").once("value").then(function (data) {
    record = data.val().score;
    nameRecord = data.val().nickname;
    console.log('record: ' + nameRecord + '   ' + record);
    document.getElementById('recordInst').innerHTML = nameRecord + '  ' + record + 'pts';
});
reproducciones.once("value").then(function (data) {
    let numPlays = data.val().vistas + 1;
    reproducciones.set({ vistas: numPlays });
});

function verDemo() {
    document.getElementById('videoDemo').style.display = 'flex';
    document.getElementById('vid').play();
}
document.getElementById('salirVideo').addEventListener('touchstart', function () {
    //console.log('salir del video');
    document.getElementById('videoDemo').style.display = 'none';
    document.getElementById('vid').currentTime = 0;
});
