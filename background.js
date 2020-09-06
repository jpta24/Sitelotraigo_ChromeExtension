var listadoProductos = [];

function EnvioActualizacionProductos() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, listadoProductos
        );
    });
};


chrome.runtime.onMessage.addListener(function(response, tab, sendResponse) {
    var nuevoProducto = response;
    var i;
    var repetido = [];

    if (nuevoProducto != "" ) {

        for (i = 0; i < listadoProductos.length; i++) {
            if (listadoProductos[i].asin === nuevoProducto.asin) {
                repetido.push(i);
            };
        };
        console.log(repetido.length);
        if (repetido.length === 0) {
            listadoProductos.push(nuevoProducto);
            console.log("Item Agregado");
            console.log(listadoProductos);
        } else {
            console.log("Item repetido");
            console.log(listadoProductos);
        };
                
    }
    EnvioActualizacionProductos();
});
