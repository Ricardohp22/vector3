
var isTargetFound = false;
var interacted = false;
var cuenta2 = 0;
var cuenta3 = 0;
AFRAME.registerComponent("markerhandler", {
    init: function () {
        console.log('markerhandler-init');

        markerObj = document.querySelector('a-marker');
        markerObj.hidden = true;
    },

    tick: function () {

        if (markerObj != null) {
            if (markerObj.object3D.visible == true) {

                if (isTargetFound)
                    return;

                isTargetFound = true;
                console.log("marker visible");
                cuenta2++;
                if (cuenta2 == 1) {
                    document.getElementById("qr").emit("qrout");
                    document.getElementById("plane").emit("planeout");
                }
                document.getElementById("ring").emit("ringOut");

                document.getElementById("ring").addEventListener('animationcomplete__gira1', function () {
                    document.getElementById("ring").emit("ringKeepTurn");
                    if (cuenta3 == 0) {
                        document.getElementById("redes").emit("redCrece");
                        window.setTimeout(function () {
                            document.getElementById("box2").emit("boxRueda");
                            document.getElementById("box3").emit("boxRueda");
                            document.getElementById("box4").emit("boxRueda");
                            document.getElementById("box5").emit("boxRueda");
                            document.getElementById("box6").emit("boxRueda");
                            document.getElementById("box7").emit("boxRueda");

                        }, 1500);
                    }
                    cuenta3++;




                });

                document.getElementById('qr').addEventListener('animationcomplete', function (e) {
                    document.getElementById('planoInicial').setAttribute('position', { x: 500, y: 500, z: 500 });//Aleja plano para poder escuchar los clicks
                });
                document.getElementById('box2').addEventListener('animationcomplete', function (e) {
                    document.getElementById('cilbox1').setAttribute('animation', { from: { x: 0, y: 0, z: 0 } });
                    document.getElementById('cilbox1').setAttribute('animation', { to: { x: 0, y: 360, z: 0 } });

                    document.getElementById('cilbox2').setAttribute('animation', { from: { x: 0, y: 0, z: 0 } });
                    document.getElementById('cilbox2').setAttribute('animation', { to: { x: 0, y: 360, z: 0 } });

                    document.getElementById('cilbox3').setAttribute('animation', { from: { x: 0, y: 0, z: 0 } });
                    document.getElementById('cilbox3').setAttribute('animation', { to: { x: 0, y: 360, z: 0 } });

                    document.getElementById('cilbox4').setAttribute('animation', { from: { x: 0, y: 0, z: 0 } });
                    document.getElementById('cilbox4').setAttribute('animation', { to: { x: 0, y: 360, z: 0 } });

                    document.getElementById('cilbox5').setAttribute('animation', { from: { x: 0, y: 0, z: 0 } });
                    document.getElementById('cilbox5').setAttribute('animation', { to: { x: 0, y: 360, z: 0 } });

                    document.getElementById('cilbox6').setAttribute('animation', { from: { x: 0, y: 0, z: 0 } });
                    document.getElementById('cilbox6').setAttribute('animation', { to: { x: 0, y: 360, z: 0 } });

                    document.getElementById('cilbox7').setAttribute('animation', { from: { x: 0, y: 0, z: 0 } });
                    document.getElementById('cilbox7').setAttribute('animation', { to: { x: 0, y: 360, z: 0 } });
                    console.log('Aqui se ejecuta kjhasj');
                });


                document.querySelector('#logoEmpresa').emit('startLogoE');


            }
            else {

                if (!isTargetFound)
                    return;

                isTargetFound = false;
                console.log("marker invisible");

            }
        }
    }
});
let cambioImagen = 0;
window.setInterval(function () {
    document.querySelector('#logoEmpresa').emit('startGiroLogoE');
    if (cambioImagen == 0) {
        document.querySelector('#logoEmpresa').emit('desa');
        document.querySelector('#logoEmpresa').addEventListener('animationcomplete__desa', function () {
            document.querySelector('#logoEmpresa').setAttribute('material', { src: 'images/logo_kapta3.png' });
            document.querySelector('#logoEmpresa').emit('apa');
        });
        cambioImagen = 1;
    } else {
        document.querySelector('#logoEmpresa').emit('desa');
        document.querySelector('#logoEmpresa').addEventListener('animationcomplete__desa', function () {
            document.querySelector('#logoEmpresa').setAttribute('material', { src: 'images/logo_kapta2.png' });
            document.querySelector('#logoEmpresa').emit('apa');
        });
        cambioImagen = 0;
    }

    console.log('Timer giro de logo');
}, 10000);

/*  */
/* document.getElementById('cuerpo').addEventListener('load',function(ev){
    console.log('que pedo wwey');
    document.getElementsByClassName('a-enter-vr-button')[0].style.display = 'none';
}); */
window.setTimeout(function (e) {
    document.getElementsByClassName('a-enter-vr-button')[0].style.display = 'none';
},500);

/*
 */
