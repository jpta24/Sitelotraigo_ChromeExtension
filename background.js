/* var listadoProductos = []; */

var respuesta = {
    action: "",
    item: "",
    listadoProductos: []
}

function EnvioRespuesta() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, respuesta);
    });
};


chrome.runtime.onMessage.addListener(function(response, tab, sendResponse) {
    respuesta.action = response.action;

    if ( respuesta.action === "addItem" ){
        respuesta.item = response.item;
        var nuevoProducto = respuesta.item;
        var i;
        var repetido = [];

        for (i = 0; i < respuesta.listadoProductos.length; i++) {
            if (respuesta.listadoProductos[i].asin === nuevoProducto.asin) {
                repetido.push(i);
            };
        };

        console.log(repetido.length);
        if (repetido.length === 0) {
            respuesta.listadoProductos.push(nuevoProducto);
            respuesta.action = "itemAdded";
        } else {
            console.log("Item repetido");
        };
    } else if (respuesta.action === "deleteAll" ){
        respuesta.listadoProductos = [];
        respuesta.action = "productsDeleted"
        
    } else if (respuesta.action === "mostrarSC" ){
        respuesta.action = "mostrarSC"
        
    } else if (respuesta.action === "addAllSB" ){
        respuesta.action = "AllSBadded";
        respuesta.listadoProductos = response.listadoProductos;
        var i;
        for (i = 0; i < respuesta.listadoProductos.length; i++) {
          respuesta.listadoProductos[i].medidas.shippingBox = true;
        }
        
    } else if (respuesta.action === "removeAllSB" ){
        respuesta.action = "AllSBremoved";
        respuesta.listadoProductos = response.listadoProductos;
        var i;
        for (i = 0; i < respuesta.listadoProductos.length; i++) {
          respuesta.listadoProductos[i].medidas.shippingBox = false;
        }
    }
      
    console.log(respuesta.action);
    console.log(respuesta.listadoProductos);

    
    // ---------------------------------------------------------

    EnvioRespuesta();
});
