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

const cubos = document.getElementById('cubos');
let elementoApuntado = 'no';
let statusCubos = []; //array que cambia el estatus del cubo 1=cubo disparado  0=cubo disponible
var hiloRelojId;
var hiloMonitoreoId;


const grupo1 = 5;
const grupo2 = 10;
const grupo3 = 15;
const grupo4 = 16;

const ventanaContent = [
    {
        title: 'Felicidades!',
        desc: 'Haz roto el record! Da click en "ok" para guardar tus datos',
        act: 0,
        but: 'Ok'
    },
    {
        title: 'nickName',
        desc: 'Tus datos se han guardado de forma correcta, ahora eres el titular del nuevo record. FELICIDADES!',
        act: 1,
        but: 'Salir'
    },
    {
        title: 'Partida terminada!',
        desc: 'Conseguiste x puntos, Intentalo de nuevo!',
        act: 2,
        but: 'jugar'
    },
    {
        title: 'no sensor!',
        desc: 'al parecer tu smartphone no cuenta con los sensores necesarios, pero puedes ocupar tu dedo para desplazarte!',
        act: 3,
        but: 'ok'
    }
];
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

    document.getElementById('recordId').setAttribute('text', { value: `Record: ${nameRecord}     Puntaje: ${record}` });
    document.getElementById('recordInst').innerHTML = nameRecord + '  ' + record + 'pts';
});
reproducciones.once("value").then(function (data) {
    let numPlays = data.val().vistas +1;
    reproducciones.set({vistas: numPlays});
});

document.getElementById('balasBan').innerHTML = cantidadBalas;
document.getElementById('tiempoBan').innerHTML = tiempo;
document.getElementById('puntosBan').innerHTML = puntos;


function aleat(desde, hasta) {
    let diferencia = hasta - desde;
    let random = diferencia * Math.random();
    return Math.trunc(desde + random);
}
for (let i = 0; i < cantidadCubos; i++) {
    const posIniX = aleat(-75, 75);
    const posIniY = aleat(0, 360);
    const velocidad = aleat(30000, 60000);
    const distancia = 3//aleat(4, 4);
    /* let ruta = 'src="modelos/muelaCa/carie.obj" mtl="modelos/muelaCa/carie.mtl"'; */
    let ruta = '#carie';
    let prefix = '';
    let size = '.5 .5 .5';
    let shader = '';
    statusCubos.push(0);


    if (i < grupo1) {
        ruta = '#diente';
        prefix = 'not';
        size = '.7 .7 .7';
        shader = 'material="shader: gif"';
    } else if (i < grupo2) {
        ruta = '#cep';
        prefix = 'not';
        size = '1 1 1';
        shader = '';
    } else if (i < grupo3) {
        ruta = '#pasta';
        prefix = 'not';
        size = '.8 .4 .6';
        shader = '';
    } else if (i < grupo4) {
        ruta = '#clock';
        prefix = 'clock';
        size = '.5 .5 .5';
        shader = 'material="shader: gif"';
    }
    //console.log(ruta);

    /* cubos.innerHTML += `<a-entity id="${i}" rotation="${posIniX} ${posIniY} 0">
    <a-entity rotation="0 0 0" animation="property: rotation; from: 0 0 0; to: 360 360 0; dur: ${velocidad}; easing: linear; loop: true;">
         <a-box id="${prefix}cubo${i}" class="cubo" scale=".5 .5 .5" position="0 0 -${distancia}" material="src: ${img}"
             animation="property: rotation; to: 0 360 360; dur: 10000; easing: linear; loop: true;"
             animation__out="startEvents: out; property: scale; to: .001 .001 .001; dur: 500;">
         </a-box>
     </a-entity> 
 </a-entity>`; */

    /*  cubos.innerHTML +=`<a-entity id="${i}" rotation="${posIniX} ${posIniY} 0">
     <a-entity rotation="0 0 0"
         animation="property: rotation; from: 0 0 0; to: 360 360 0; dur: ${velocidad}; easing: linear; loop: true;">
         <a-obj-model ${ruta} id="${prefix}cubo${i}" class="cubo" scale="${size}" position="0 0 -${distancia}"
             animation="property: rotation; to: 0 360 360; dur: 10000; easing: linear; loop: true;"
             animation__out="startEvents: out; property: scale; to: .001 .001 .001; dur: 500;">
         </a-obj-model>
     </a-entity>
    </a-entity>`
    } */
    cubos.innerHTML += `<a-entity id="${i}" rotation="${posIniX} ${posIniY} 0">
 <a-entity rotation="0 0 0"
     animation="property: rotation; from: -30 0 0; to: 30 360 0; dur: ${velocidad}; easing: linear; loop: true; dir: alternate;">
     <a-plane id="${prefix}cubo${i}" class="cubo" scale="${size}" position="0 0 -${distancia}" ${shader} src="${ruta}" opacity=".9"
         animation="property: rotation; to: 0 0 0; dur: 10000; easing: linear; loop: true;"
         animation__out="startEvents: out; property: scale; to: .001 .001 .001; dur: 500;"
         animation__in="startEvents: in; property: scale; to: ${size}; dur: 500;">
     </a-plane>
 </a-entity>
</a-entity>`;
}

//agrega evento mouseenter y mouseleave a cubos y elementos disparables
const listCubos = document.getElementsByClassName('cubo');
for (i = 0; i < listCubos.length; i++) {
    listCubos[i].addEventListener("mouseenter", function (ev) {

        elementoApuntado = ev.target.id;
        //console.log('elemento: ' + elementoApuntado);
    });
    listCubos[i].addEventListener("mouseleave", function (ev) {

        elementoApuntado = 'no';
        //console.log('elemento: ' + elementoApuntado);
    });
}
document.getElementById('continuar').addEventListener('mouseenter', function (ev) {
    elementoApuntado = ev.target.id;
    //console.log('elemento: ' + elementoApuntado);
})
document.getElementById('continuar').addEventListener('mouseleave', function (ev) {
    elementoApuntado = 'no';
    //console.log('elemento: ' + elementoApuntado);
})

const pantalla = document.getElementsByTagName('body')[0];
let movimiento = 1;
//desplazamiento
pantalla.addEventListener('touchmove', function () {
    //console.log('moviendo');
    document.getElementById('dedo').emit('out');
});

pantalla.addEventListener('touchstart', function () {
    //console.log('touchstart');
    movimiento = 0;
    window.setTimeout(function () {
        movimiento = 1;
    }, 200);
})
//disparo
pantalla.addEventListener('touchend', function (ev) {
    if (movimiento == 0) {
        if (statusGame == 0) {
            cantidadBalas--;
            if (cantidadBalas <= 0) {
                statusGame = 1;
            }
            //console.log('balas: ' + cantidadBalas);
            document.getElementById('balasBan').innerHTML = cantidadBalas;
        }
        document.getElementById('crashId').emit('anCrash');
        //disparo en cubo
        if (elementoApuntado.indexOf('cubo') == 0) {
            const numCubo = elementoApuntado.substring(elementoApuntado.indexOf('cubo') + 4, elementoApuntado.length);
            if (statusCubos[numCubo] == 0)// si el estatus es cero entonces es un disparo valido
            {
                puntos += valorCubo;
                document.getElementById('puntosId').setAttribute('text', { value: 'Puntaje:' + puntos });
                document.getElementById('puntosBan').innerHTML = puntos;
                statusCubos[numCubo] = 1;
                //console.log('disparo en cubo');
                const cubo = document.getElementById(elementoApuntado);
                cubo.emit('out');
                const padreCubo = document.getElementById(numCubo);

                window.setTimeout(function (ev) {
                    const x = 0;//aleat(0, 360);
                    const y = aleat(0, 360);
                    const z = 0;//aleat(0, 360);
                    const dist = -aleat(4, 4);
                    //console.log(padreCubo);
                    padreCubo.setAttribute('rotation', { x: 0, y: y, z: 0 });
                    //console.log(padreCubo);

                    //console.log('este: ' + numCubo);
                    cubo.emit('in');
                    statusCubos[numCubo] = 0;
                    //console.log('aparece de nuevo--------------------------------------s');
                }, 500);
            }

        }
        //disparo Notcubo
        else if (elementoApuntado.indexOf('not') == 0) {
            navigator.vibrate(40);
            //console.log('disparo en notcubo: ' + elementoApuntado);
            const numCubo = elementoApuntado.substring(elementoApuntado.indexOf('cubo') + 4, elementoApuntado.length);
            if (statusCubos[numCubo] == 0)// si el estatus es cero entonces es un disparo valido
            {
                puntos -= valorResta;
                if (puntos < 0) {
                    puntos = 0;
                }

                document.getElementById('puntosId').setAttribute('text', { value: 'Puntaje:' + puntos });
                document.getElementById('puntosBan').innerHTML = puntos;
                statusCubos[numCubo] = 1;
                //console.log('disparo en cubo');
                const cubo = document.getElementById(elementoApuntado);
                cubo.emit('out');
                const padreCubo = document.getElementById(numCubo);

                window.setTimeout(function (ev) {
                    const x = 0;//aleat(0, 360);
                    const y = aleat(0, 360);
                    const z = 0;//aleat(0, 360);
                    const dist = -aleat(4, 4);

                    padreCubo.setAttribute('rotation', { x: 0, y: y, z: 0 });

                    //console.log(padreCubo);
                    //console.log('este: ' + numCubo);
                    cubo.emit('in');

                    statusCubos[numCubo] = 0;
                    //console.log('aparece de nuevo--------------------------------------s');
                }, 500);
            }
        }
        //disparo clock
        else if (elementoApuntado.indexOf('clock') == 0) {
            //console.log('disparo en reloj: ' + elementoApuntado);
            const numCubo = elementoApuntado.substring(elementoApuntado.indexOf('cubo') + 4, elementoApuntado.length);
            if (statusCubos[numCubo] == 0)// si el estatus es cero entonces es un disparo valido
            {
                tiempo += 4;
                if (tiempo >= tini) {
                    tiempo = tini;
                }
                statusCubos[numCubo] = 1;
                //console.log('disparo en cubo');
                const cubo = document.getElementById(elementoApuntado);
                cubo.emit('out');
                const padreCubo = document.getElementById(numCubo);

                window.setTimeout(function (ev) {
                    const x = 0;//aleat(0, 360);
                    const y = aleat(0, 360);
                    const z = 0;//aleat(0, 360);
                    const dist = -aleat(4, 4);

                    padreCubo.setAttribute('rotation', { x: 0, y: y, z: 0 });

                    //console.log(padreCubo);
                    //console.log('este: ' + numCubo);
                    cubo.emit('in');

                    statusCubos[numCubo] = 0;
                    //console.log('aparece de nuevo--------------------------------------s');
                }, 500);
            }
        }
        //disparo en boton continuar
        else if ((elementoApuntado == 'continuar') && (statusGame != 0)) {
            iniciaJuego();
        }
    }



});

//funcion monitoreo
function hiloMonitoreo() {
    if (statusGame == 1) {// juego terminado
        //console.log('juego terminado');
        document.getElementById('cubos').setAttribute('scale', { x: .001, y: .001, z: .001 });
        if (puntos > record) {
            showVentana(ventanaContent[0]);
        } else {
            ventanaContent[2].desc = `Conseguiste ${puntos} puntos, Intentalo de nuevo!`;
            showVentana(ventanaContent[2]);
        }

        clearInterval(hiloMonitoreoId);
        clearInterval(hiloRelojId);
    }
}
//funcion reloj
function hiloReloj() {
    tiempo--;
    document.getElementById('timeId').setAttribute('text', { value: tiempo });
    document.getElementById('tiempoBan').innerHTML = tiempo;
    if (tiempo <= 0) {
        statusGame = 1;
        clearInterval(hiloRelojId);
    }
    const porcent = (tiempo / tini) * 100;
    document.getElementById('lineaTiempo').style.width = porcent + '%';
    if (porcent < 25) {
        document.getElementById('lineaTiempo').style.background = '#ec5555';
    }
}

//accion de boton de ventana
function accion(num) {
    switch (num) {
        case 0: {
            //console.log('ejecuta accion 0');
            document.getElementById('ventana').style.display = 'none';
            document.getElementById('formulario').style.display = 'flex';
            document.getElementsByTagName('input')[0].focus();
        } break;
        case 1: {
            //console.log('ejecuta accion 1');
            location.reload();
        } break;
        case 2: {
            //console.log('ejecuta accion 2');
            //showVentana(ventanaContent[0]);
            //document.getElementById('ventana').style.display = 'none';
            location.reload();
        } break;
        case 3: {
            //console.log('ejecuta accion 3');
            //showVentana(ventanaContent[0]);
            //document.getElementById('ventana').style.display = 'none';
            document.getElementById('ventana').style.display = 'none';
            iniciaJuego();
            document.getElementById('global').setAttribute('rotation',{x:0, y:0, z:0}); 
        } break;
    }
}
function showVentana(objeto) {
    const content = `<div class="container cont">
    <div class="row items"><h3>${objeto.title}</h3></div>
    <div class="row items"><p>${objeto.desc}</p></div>
    <div class="row items" onClick="accion(${objeto.act})"><button>${objeto.but}</button></div>    
</div>`
    document.getElementById('ventana').innerHTML = content;
    document.getElementById('ventana').style.display = 'flex';
}




//quitar VR button
/* window.setTimeout(function (ev) {
    const boton = document.getElementsByClassName('a-enter-vr-button')[0];
    boton.style.display = 'none';
}, 1500); */

function validar(e, num) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        if (num == 3) {
            sendData();
        } else {
            document.getElementsByTagName('input')[num + 1].focus();
        }
    }
}
function sendData() {
    document.getElementById('formulario').style.display = 'none';
    showVentana(ventanaContent[1]);


    //console.log("dato enviandose");
    firebase.database().ref("ganador").once("value").then(function (data) {

        var recordActualmente = parseInt(data.val().score);
        /**///console.log("valorActual: " + recordActualmente);
        if (puntos > recordActualmente) {
            const nick = document.getElementById("nickId").value;
            const nombre = document.getElementById("nombreId").value;
            const mail = document.getElementById("mailId").value;
            const tel = document.getElementById("telId").value;

            //console.log(nick + nombre + mail + tel);
            var arrayData = arrayJSON(nombre, tel, mail, nick, puntos);
            datos.set(arrayData);
            //alert("Tus datos se han guardado!");
            /* document.getElementById("newWinner").innerHTML = nick;
            document.getElementById("formulario").style.display = "none";
            document.getElementById("datosGuardados").style.display = "flex"; */
            ventanaContent[1].title = nick;
            showVentana(ventanaContent[1]);

        } else {
            //alert("Ahora ya hay un puntaje mas alto, intentalo de nuevo");
        }

    });
}
function arrayJSON(nombre, telefono, email, nickname, score) {
    var data = {
        nombre: nombre,
        telefono: telefono,
        email: email,
        nickname: nickname,
        score: score
    }
    return data;
}
function iniciaJuego() {
    statusGame = 0;
    console.log('Juego Iniciado');
    //ocultar initial screen
    const listaIniScr = document.getElementsByClassName('initialScreen');
    for (let i = 0; i < listaIniScr.length; i++) {
        listaIniScr[i].emit('out');
    }
    document.getElementById('cubos').setAttribute('scale', { x: 1, y: 1, z: 1 });
    const listaDash = document.getElementsByClassName('dashboard');
    for (let i = 0; i < listaDash.length; i++) {
        listaDash[i].emit('in');
        //console.log('elementos: ' + i);
    }
    //hilo cuenta regresiva
    hiloRelojId = setInterval(hiloReloj, 1000);
    //hilo monitoreo de variables
    hiloMonitoreoId = setInterval(hiloMonitoreo, 500);
}
function verDemo(){
    document.getElementById('videoDemo').style.display = 'flex';
    document.getElementById('vid').play();
}
document.getElementById('salirVideo').addEventListener('touchstart', function(){
    //console.log('salir del video');
    document.getElementById('videoDemo').style.display = 'none';
    document.getElementById('vid').currentTime = 0;
});
