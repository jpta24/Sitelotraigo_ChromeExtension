// Archivo content2.js pasado a jQuery

var item = {
    nombre: "",
    asin: "",
    precio: "",
    precioxCant: "",
    prime: "",
    disponibilidad: "",
    cantidad: 1,
    medidas: {
        shippingBox: false,
        valAgrand: 10,
        dimensiones: "",
        largo: "",
        ancho: "",
        prof: "",
        peso: "",
        pesoxCant: "", 
        volumen: "", 
        voluMetrico: "",
        volxCant: "",
        volMetxCant: "",
        volAgrand: "",
        voluMetricoAgrand: "",
        volMetAgrandxCant: "",
        volxCantAgrand: "",

    },
    precVenta: "",
    costoEnvio: {
        precLibra: 2.2,
        porcentImpuesto: 0.3,
        precLibraAdicional: 0.99,
        flete : "",
        fleteAdicionalSinSB: "",
        fleteAdicionalConSB: "",
        impuesto : "",
        seguro:  10, 
        costoEnvFinal : "",
        costoEnvFinalConSB: "",
    },
    costosML: {
        comML: "",
        impML: "",
        envioInterno: "2.57",
        costoMLFinal: "",
    },
}

if( $('body').find('#priceblock_ourprice').length != 0 ) {
    precioTxt = $('#priceblock_ourprice').text();
} else {
    precioTxt = $('#priceblock_saleprice').text();
};
                
item.precioBruto = precioTxt.substring(precioTxt.indexOf("$")+1);

item.precio = parseFloat(item.precioBruto.replace(",",""));

var nombre = $('#productTitle').text();

item.nombre = nombre;

var asinX = $('.a-size-base'); 
textoAsinX = "\nASIN\n";
var i;
for (i = 0; i < asinX.length; i++) {
    if (asinX[i].innerHTML == textoAsinX) {
        asin = asinX[i].nextElementSibling.innerHTML;
        break
    } else {
        asin = "No ASIN"
    }
}

item.asin = asin





//------------------------DISPONIBILIDAD-------------------------

var disp = $('#availability').text(); 

item.disponibilidad = disp;

// Variables para buscar elementos

var ProdDim = "";


detTipo0 = "";
detTipo1 = ["prodDetails", "detail-bullets", "productOverview_feature_div"];

tipoMed0 = "";
tipoMed1 = ["\nProduct Dimensions\n", "\nPackage Dimensions\n", "Product Dimensions", "Package Dimensions", "Información de producto", "\nInformación de producto\n", "Item Dimensions  LxWxH", "\nItem Dimensions  LxWxH\n",  "Dimensiones del artículo Largo x Ancho x Altura", "\nDimensiones del artículo Largo x Ancho x Altura\n", "Dimensiones del producto", "\nDimensiones del producto\n", "Dimensiones del paquete", "\nDimensiones del paquete\n" ];

uniMedida0 = "";
uniMedida1 = ["inches", "cm" , "mm", "pulgadas", "m"];

tipoPeso0 = "";
tipoPeso1 = ["\nItem Weight\n", "Shipping Weight", "Peso del producto", "\nPeso del producto\n" ];

uniPeso0 = "";
uniPeso1 = ["ounces", "pounds", "Ounces", "Onzas", "lbs", "libras", "kg" , "kgs", "gr", "grs" ];



// tipo de div
var tipoDetalles = $('div');
var i;
var j;
for (i = 0; i < tipoDetalles.length; i++) {
    for (j = 0; j < detTipo1.length; j++) {
        if (detTipo1[j]  == tipoDetalles[i].getAttribute("id")) {
            detTipo0 = detTipo1[j];
            console.log("tipo de div: " + detTipo0);
            break
        } 
        break
    } 
};

// Tipo de Detalles del Producto (Med)

 if ( detTipo0 == detTipo1[0]) {
    var x = $(".a-size-base");
    var i;
    var j;

    for (i = 0; i < x.length; i++) {
        for (j = 0; j < tipoMed1.length; j++) {
            if (x[i].innerHTML == tipoMed1[j]) {
                tipoMed0 = tipoMed1[j];
                postm0 = i;
                console.log("tipo de dim: " + tipoMed0);
                console.log("ubicacion de dim: " + postm0);
                break
            } 
        } 
    }
 } else if ( detTipo0 == detTipo1[1] ) {
    var tipoLista = $('li');
    var i;
    var j;
        for (i = 0; i < tipoLista.length; i++) {
            for (j = 0; j < tipoMed1.length; j++) {
                if (tipoLista[i].innerHTML.search(tipoMed1[j]) !== -1) {
                    tipoMed0 = tipoMed1[j];
                    postm0 = i;
                    console.log("tipo de dim: " + tipoMed0);
                    console.log("ubicacion de dim: " + postm0);
                    break
                } 
            } 
        }

 }  else if ( detTipo0 == detTipo1[2]) {
    var x = $(".a-size-base");
    var i;
    var j;

    for (i = 0; i < x.length; i++) {
        for (j = 0; j < tipoMed1.length; j++) {
            if (x[i].innerHTML == tipoMed1[j]) {
                tipoMed0 = tipoMed1[j];
                postm0 = i;
                console.log("tipo de dim: " + tipoMed0);
                console.log("ubicacion de dim: " + postm0);
                break
            } 
        } 
    }
 } else {
    tipoMed0 = "S/Inf";
    postm0 = null;
 };

 // Tipo de unidad de medida 

 if ( detTipo0 == detTipo1[0] && postm0 != null ) {

    var uniMedida = document.getElementsByClassName("a-size-base")[postm0].nextElementSibling.innerHTML;

    var i;
    for (i = 0; i < uniMedida1.length; i++) {
        if ( uniMedida.search(uniMedida1[i]) !== -1 ) {
            uniMedida0 = uniMedida1[i];
            medNum = uniMedida.substring(1, uniMedida.search(uniMedida0)-1);
            item.medidas.dimensiones = medNum;
            var indices = [];
            var j;
            for(var j=0; i < medNum.length; i++) {
                if (medNum[i] === "x") indices.push(i);
                item.medidas.largo = medNum.substring(0, indices[0]-1);
                item.medidas.ancho = medNum.substring(indices[0]+2, indices[1]-1);
                item.medidas.prof = medNum.substring(indices[1]+2);
                console.log("uni de dim: " + uniMedida);
            }
                
            break
        }  else {
            uniMedida0 = "S/Inf";
        }
    }

} else if ( detTipo0 == detTipo1[1] && postm0 != null ){

    var uniMedida = document.getElementsByTagName('li')[postm0].innerText;

    var i;
    for (i = 0; i < uniMedida1.length; i++) {
        if ( uniMedida.search(uniMedida1[i]) !== -1 ) {
            uniMedida0 = uniMedida1[i];
            medNum = uniMedida.substring(uniMedida.indexOf(":")+2, uniMedida.search(uniMedida0)-1);
            var indices = [];
            var j;
            for(var j=0; i < medNum.length; i++) {
                if (medNum[i] === "x") indices.push(i);
                item.medidas.largo = medNum.substring(0, indices[0]-1);
                item.medidas.ancho = medNum.substring(indices[0]+2, indices[1]-1);
                item.medidas.prof = medNum.substring(indices[1]+2);
                console.log("uni de dim: " + uniMedida);
            }
            break
        }  else {
            uniMedida0 = "S/Inf";
        }
    }


} else if ( detTipo0 == detTipo1[2] && postm0 != null ) {

    var uniMedida = document.getElementsByClassName("a-size-base")[postm0 +1 ].innerHTML;

    var i;
    for (i = 0; i < uniMedida1.length; i++) {
        if ( uniMedida.search(uniMedida1[i]) !== -1 ) {
            uniMedida0 = uniMedida1[i];
            medNum = uniMedida.substring(1, uniMedida.search(uniMedida0)-1);
            var indices = [];
            var j;
            for(var j=0; i < medNum.length; i++) {
                if (medNum[i] === "x") indices.push(i);
                item.medidas.largo = medNum.substring(0, indices[0]-1);
                item.medidas.ancho = medNum.substring(indices[0]+2, indices[1]-1);
                item.medidas.prof = medNum.substring(indices[1]+2);
                console.log("uni de dim: " + uniMedida);
                }
            break
        }  else {
            uniMedida0 = "S/Inf";
        }
    }

};

// Tipo de Envio

if ( detTipo0 == detTipo1[0] ) {
    var x = $(".a-size-base");
    var i;
    var j;

    for (i = 0; i < x.length; i++) {
        for (j = 0; j < tipoPeso1.length; j++) {
            if (tipoPeso1[j] == x[i].innerHTML) {
                tipoPeso0 = tipoPeso1[j];
                postm1 = i;
                console.log("tipo de envio: " + tipoPeso0);
                console.log("ubicacion de envio: " + postm1);
                break
            }
        } 
    }
 } else if ( detTipo0 == detTipo1[1] ) {
    var tipoLista = $('li');
    var i;
    var j;
        for (i = 0; i < tipoLista.length; i++) {
            for (j = 0; j < tipoPeso1.length; j++) {
                if (tipoLista[i].innerHTML.search(tipoPeso1[j]) !== -1) {
                    tipoPeso0 = tipoPeso1[j];
                    postm1 = i;
                    console.log("tipo de envio: " + tipoPeso0);
                    console.log("ubicacion de envio: " + postm1);
                    break
                }  
            } 
        }

 } else if ( detTipo0 == detTipo1[2] ) {
    var x = $(".a-size-base");
    var i;
    var j;

    for (i = 0; i < x.length; i++) {
        for (j = 0; j < tipoPeso1.length; j++) {
            if (x[i].innerHTML == tipoPeso1[j]) {
                tipoPeso0 = tipoPeso1[j];
                postm1 = i;
                console.log("tipo de envio: " + tipoPeso0);
                console.log("ubicacion de envio: " + postm1);
                break
            } 
        } 
    }
 } else {
    tipoPeso0 = "S/Inf";
    postm1 = null;
 };

 // Tipo de unidad de Envio 
 

 if ( detTipo0 == detTipo1[0] && postm1 != null ) {
    var uniPeso = document.getElementsByClassName("a-size-base")[postm1].nextElementSibling.innerHTML;

    var i;
    for (i = 0; i < uniPeso1.length; i++) {
        if ( uniPeso.search(uniPeso1[i]) !== -1 ) {
            pesoNum = uniPeso.substr(1, uniPeso.indexOf(" ")-1);
            uniPeso0 = uniPeso1[i];
            item.medidas.peso = pesoNum;
            console.log("peso de envio: " + uniPeso);
            break
        }  else {
            uniPeso0 = "S/Inf";
        }
    }
} else if ( detTipo0 == detTipo1[1] && postm1 != null ){

    var uniPeso = document.getElementsByTagName('li')[postm1].innerText;

    var i;
    for (i = 0; i < uniPeso1.length; i++) {
        if ( uniPeso.search(uniPeso1[i]) !== -1 ) {
            uniPeso0 = uniPeso1[i];
            pesoNum = uniPeso.substring(uniPeso.indexOf(":")+2, uniPeso.search(uniPeso0)-1);
            item.medidas.peso = pesoNum;
            console.log("peso de envio: " + uniPeso);
            break
        }  else {
            uniPeso0 = "S/Inf";
        }
    }
} else  if ( detTipo0 == detTipo1[2] && postm1 != null ) {

    var uniPeso = document.getElementsByClassName("a-size-base")[postm1 + 1].innerHTML;

    var i;
    for (i = 0; i < uniPeso1.length; i++) {
        if ( uniPeso.search(uniPeso1[i]) !== -1 ) {
            pesoNum = uniPeso.substr(1, uniPeso.indexOf(" ")-1);
            uniPeso0 = uniPeso1[i];
            item.medidas.peso = pesoNum;
            console.log("peso de envio: " + uniPeso);
            break
        }  else {
            uniPeso0 = "S/Inf";
        }
    }
} else {
    uniPeso0 = "S/Inf";
};

//--------------------------------------------------------------------------------
//----------------------------CALCULOS INICIALES ---------------------------------
//--------------------------------------------------------------------------------

function calculosIniciales(){
    // Costos de Envio

    // Conversion de medidas a inches

    if ( uniMedida0 == uniMedida1[1] ) {
        item.medidas.largo /= 2.54;
        item.medidas.ancho /= 2.54;
        item.medidas.prof /= 2.54;
    } else if ( uniMedida0 == uniMedida1[2] ) {
        item.medidas.largo /= 25.4;
        item.medidas.ancho /= 25.4;
        item.medidas.prof /= 25.4;
    }else if ( uniMedida0 == uniMedida1[4] ) {
        item.medidas.largo /= 0.0254;
        item.medidas.ancho /= 0.0254;
        item.medidas.prof /= 0.0254;
    };

 
    // Conversion de peso a libras

    if ( uniPeso0 == uniPeso1[0] || uniPeso0 == uniPeso1[2] || uniPeso0 == uniPeso1[3]) {
    item.medidas.peso *= 0.0625
    } else if ( uniPeso0 == uniPeso1[6] || uniPeso0 == uniPeso1[7] ) {
        item.medidas.peso *= 2.20462
    }else if ( uniPeso0 == uniPeso1[6] || uniPeso0 == uniPeso1[7] ) {
        item.medidas.peso *= 0.00220462
    };

      // volumen 

    item.medidas.volumen = (item.medidas.largo*1) * (item.medidas.ancho*1) * (item.medidas.prof*1);

    item.medidas.voluMetrico = item.medidas.volumen / 166;

    item.medidas.volxCant = item.medidas.volumen * item.cantidad;

    item.medidas.volMetxCant = item.medidas.voluMetrico * item.cantidad; 

    item.medidas.volAgrand = (item.medidas.largo*1 + item.medidas.valAgrand) * (item.medidas.ancho*1 + item.medidas.valAgrand) * (item.medidas.prof*1 + item.medidas.valAgrand);

    item.medidas.voluMetricoAgrand = item.medidas.volAgrand / 166;

    item.medidas.volxCantAgrand = item.medidas.volAgrand * item.cantidad;

    item.medidas.volMetAgrandxCant = item.medidas.voluMetricoAgrand * item.cantidad;

    

    // (1) costo por peso evaluando el minimo

    item.medidas.pesoxCant = item.medidas.peso * item.cantidad;

    if (item.medidas.pesoxCant < 10 ) {
        item.costoEnvio.flete = 10 * item.costoEnvio.precLibra;
    } else {
        item.costoEnvio.flete = item.medidas.pesoxCant * item.costoEnvio.precLibra
    }

    //  (1.1) costo libra addicional por volumen

    
    if (item.medidas.volMetxCant < 10 ) {
        item.costoEnvio.fleteAdicionalSinSB = 0;
    } else if (item.medidas.volMetxCant > item.medidas.pesoxCant) {
        item.costoEnvio.fleteAdicionalSinSB = ((item.medidas.volMetxCant) - item.medidas.pesoxCant) * item.costoEnvio.precLibraAdicional;
    } else {
        item.costoEnvio.fleteAdicionalSinSB = 0;
    }

    if (item.medidas.volMetAgrandxCant < 10 ) {
        item.costoEnvio.fleteAdicionalConSB = 0;
    } else if (item.medidas.volMetAgrandxCant > item.medidas.pesoxCant) {
        item.costoEnvio.fleteAdicionalConSB = ((item.medidas.volMetAgrandxCant) - item.medidas.pesoxCant) * item.costoEnvio.precLibraAdicional;
    } else {
        item.costoEnvio.fleteAdicionalConSB = 0;
    }
    
    // (2) Impuesto
    
    item.precioxCant = item.precio * item.cantidad;
    
    

    if (item.precioxCant*0.6 < 200 ) {
        item.costoEnvio.impuesto = 0;
    } else {
        item.costoEnvio.impuesto = item.precioxCant * 0.6 * item.costoEnvio.porcentImpuesto;
    }

    // Costo Final
    
    item.costoEnvio.costoEnvFinal = item.costoEnvio.flete*1 + item.costoEnvio.fleteAdicionalSinSB*1 + item.costoEnvio.impuesto*1 + item.costoEnvio.seguro*1;

    item.costoEnvio.costoEnvFinalConSB = item.costoEnvio.flete*1 + item.costoEnvio.fleteAdicionalConSB*1 + item.costoEnvio.impuesto*1 + item.costoEnvio.seguro*1; 


    // Costos ML

    item.costosML.comML = item.precio * 2.2 * 0.18;

    item.costosML.impML = item.precio * 2.2 * 0.04;

    costoFinalBruto = item.costosML.impML*1 + item.costosML.comML*1 + item.costosML.envioInterno*1;
    item.costosML.costoMLFinal = costoFinalBruto.toFixed(2);


    gastosFinales = item.precio*1 + item.costoEnvio.costoEnvFinal*1 + item.costosML.costoMLFinal*1;
    precioVentaBruto = gastosFinales * 1.2;

    item.costosML.comML = precioVentaBruto * 0.18;

    item.costosML.impML = precioVentaBruto * 0.04;

    gastosFinales = item.precio*1 + item.costoEnvio.costoEnvFinal*1 + item.costosML.costoMLFinal*1;
    precioVentaBruto = gastosFinales * 1.2;

    item.precVenta = precioVentaBruto.toFixed(2);

    item.ganancia = precioVentaBruto*1 - gastosFinales;

};

calculosIniciales();

resumen2 = "Ganancia: $" + item.ganancia.toFixed(2) + " / Costo Envio: $" + item.costoEnvio.costoEnvFinal;
    
