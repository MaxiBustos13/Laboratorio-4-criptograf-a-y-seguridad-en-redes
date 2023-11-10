// ==UserScript==
// @name         Lab 4 - Cripto
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Maximiliano Bustos
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function() {
    var parrafoElemento = document.querySelector('p');
    var textoParrafo = parrafoElemento.textContent;
    var KEY = textoParrafo.replace(/[^A-Z]/g, '');
    console.log("La llave es: " + KEY);

    var divs = document.getElementsByTagName('div');
    var ids = [];

    for (var i = 0; i < divs.length; i++) {
        var id = divs[i].id;
        if (id) {
            ids.push(id);
        }
    }
    console.log("Los mensajes cifrados son: " + divs.length);

    var TDesId = [];
    var configuracion = {
        mode: CryptoJS.mode.ECB
    };
    var KEYD = CryptoJS.enc.Utf8.parse(KEY);
    for (var j = 0; j < ids.length; j++) {
        var aux = CryptoJS.TripleDES.decrypt(ids[j], KEYD, configuracion).toString(CryptoJS.enc.Utf8);
        TDesId.push(aux);
    }

    for (var w = 0; w < divs.length; w++) {
        console.log(ids[w]+" "+TDesId[w]);
    }
    for (var x = 0; x < TDesId.length; x++) {
        var pElement = document.createElement('p');
        pElement.textContent = TDesId[x]
        document.body.appendChild(pElement);
    }

})();