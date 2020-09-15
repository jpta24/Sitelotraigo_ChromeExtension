/* var listadoProductos = []; */

var respuesta = {
	action: '',
	item: '',
	listadoProductos: [],
	itemNumber: '',
	change: '',
};

function EnvioRespuesta() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, respuesta);
	});
}

chrome.runtime.onMessage.addListener(function (response, tab, sendResponse) {
	respuesta.action = response.action;

	if (respuesta.action === 'addItem') {
		respuesta.item = response.item;
		var nuevoProducto = respuesta.item;
		var i;
		var repetido = [];

		for (i = 0; i < respuesta.listadoProductos.length; i++) {
			if (respuesta.listadoProductos[i].asin === nuevoProducto.asin) {
				repetido.push(i);
			}
		}

		if (repetido.length === 0) {
			respuesta.listadoProductos.push(nuevoProducto);
			respuesta.action = 'itemAdded';
		} else {
			console.log('Item repetido');
		}
	} else if (respuesta.action === 'deleteAll') {
		respuesta.listadoProductos = [];
		respuesta.action = 'productsDeleted';
	} else if (respuesta.action === 'mostrarSC') {
		respuesta.action = 'mostrarSC';
	} else if (respuesta.action === 'addAllSB') {
		respuesta.action = 'AllSBadded';
		respuesta.listadoProductos = response.listadoProductos;
		var i;
		for (i = 0; i < respuesta.listadoProductos.length; i++) {
			respuesta.listadoProductos[i].medidas.shippingBox = true;
		}
	} else if (respuesta.action === 'removeAllSB') {
		respuesta.action = 'AllSBremoved';
		respuesta.listadoProductos = response.listadoProductos;
		var i;
		for (i = 0; i < respuesta.listadoProductos.length; i++) {
			respuesta.listadoProductos[i].medidas.shippingBox = false;
		}
	} else if (respuesta.action === 'addSBitem') {
		respuesta.action = 'itemSBadded';
		respuesta.listadoProductos = response.listadoProductos;
		respuesta.itemNumber = response.itemNumber;
		respuesta.listadoProductos[respuesta.itemNumber].medidas.shippingBox = true;
	} else if (respuesta.action === 'removeSBitem') {
		respuesta.action = 'itemSBremoved';
		respuesta.listadoProductos = response.listadoProductos;
		respuesta.itemNumber = response.itemNumber;
		respuesta.listadoProductos[
			respuesta.itemNumber
		].medidas.shippingBox = false;
	} else if (respuesta.action === 'removeItem') {
		respuesta.action = 'itemRemoved';
		respuesta.listadoProductos = response.listadoProductos;
		respuesta.itemNumber = response.itemNumber;
		respuesta.listadoProductos.splice(respuesta.itemNumber, 1);
	} else if (respuesta.action === 'quantityChange') {
		respuesta.action = 'quantityChanged';
		respuesta.listadoProductos = response.listadoProductos;
		respuesta.itemNumber = response.itemNumber;
		respuesta.change = response.change;

		itemRes = respuesta.listadoProductos[respuesta.itemNumber];
		itemResMed = respuesta.listadoProductos[respuesta.itemNumber].medidas;

		itemRes.cantidad = respuesta.change;

		itemRes.precioxCant = itemRes.cantidad * itemRes.precio;

		itemResMed.pesoxCant = itemRes.cantidad * itemResMed.peso;
		itemResMed.volxCant = itemRes.cantidad * itemResMed.volumen;
		itemResMed.volMetxCant = itemRes.cantidad * itemResMed.voluMetrico;
		itemResMed.volMetAgrandxCant =
			itemRes.cantidad * itemResMed.volMetAgrandxCant;
		itemResMed.volxCantAgrand = itemRes.cantidad * itemResMed.volxCantAgrand;
	}

	console.log(respuesta.action);
	console.log(respuesta.listadoProductos);

	// ---------------------------------------------------------

	EnvioRespuesta();
});
