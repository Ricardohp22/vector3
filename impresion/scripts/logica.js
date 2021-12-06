var botonV = document.getElementById("botonVecId");
var botonW = document.getElementById("botonWaId");

botonW.addEventListener("click", function(e)
{
    window.open("https://api.whatsapp.com/send?phone=+5215584151591&text=Hola!!%20quiero%20saber%20más%20sobre%20el%20marketing%20con%20Realidad%20Aumentada");
});
botonV.addEventListener("click", function(e)
{
    //window.open("https://www.vectorid.mx/");
    var facebookId = "fb://page/299366750897285";
    var urlPage = "https://www.facebook.com/Vectoridmx";

     try {
          startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(facebookId )));
        } catch (e) {
         Log.e(TAG, "Aplicación no instalada.");
         //Abre url de pagina.
         startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(urlPage)));
        }
});