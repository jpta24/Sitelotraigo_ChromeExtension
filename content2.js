var item = {
    nombre: "",
    asin: "",
    precio: "",
    prime: "",
    disponibilidad: "",
    medidas: {
        largo: "",
        ancho: "",
        prof: "",
        peso: "",    
    },
    precVenta: "",
    costoEnvio: {
        flete : "",
        impuesto : "",
        seguro:  5, 
        costoEnvFinal : "",
    },
    costosML: {
        comML: "",
        impML: "",
        envioInterno: "2.57",
        costoMLFinal: "",
    }
    

}

var precioTxt = document.getElementById('priceblock_ourprice').innerText;

    item.precioBruto = precioTxt.substring(precioTxt.indexOf("$")+1);

    item.precio = parseFloat(item.precioBruto.replace(",",""));

var nombre = document.getElementById('productTitle').innerText;

    item.nombre = nombre;

var asinX = document.querySelectorAll(".a-size-base");
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

var disp = document.getElementById('availability').innerText;

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
var tipoDetalles = document.querySelectorAll('div');
var i;
var j;
    for (i = 0; i < tipoDetalles.length; i++) {
        for (j = 0; j < detTipo1.length; j++) {
            if (tipoDetalles[i].getAttribute("id") == detTipo1[j]) {
                detTipo0 = detTipo1[j];
                console.log("tipo de div: " + detTipo0);
                break
            } 
        } 
    };

    // Tipo de Detalles del Producto (Med)

 if ( detTipo0 == detTipo1[0]) {
    var x = document.querySelectorAll(".a-size-base");
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
    var tipoLista = document.querySelectorAll('li');
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
    var x = document.querySelectorAll(".a-size-base");
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
    var x = document.querySelectorAll(".a-size-base");
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
            }  else {
                postm1 = null;
            }
        } 
    }
 } else if ( detTipo0 == detTipo1[1] ) {
    var tipoLista = document.querySelectorAll('li');
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
                }  else {
                    postm1 = null;
                }
            } 
        }

 } else if ( detTipo0 == detTipo1[2] ) {
    var x = document.querySelectorAll(".a-size-base");
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
            } else {
                postm1 = null;
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

/*  ----------------------------RESUMEN ------------------------------------------ */




/* var resumen = item.nombre + 'Precio: ' + item.precio + ' \nProduct Dimensions: ' + ProdDim + ' \nASIN: ' + item.asin + ' \nDisponiblidad: ' + item.disponibilidad + " / " + detTipo0 + " / " + tipoMed0 + ": " + medNum + " " + uniMedida0 + " / " + tipoPeso0 + ": " + pesoNum + " " + uniPeso0; */


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

// minimo de peso

if (item.medidas.peso < 4 ) {
    item.medidas.peso = 4;
};


item.costoEnvio.impuesto = item.precio * 0.3 * 0.12;

if (item.medidas.peso * 1.3 > item.medidas.largo * item.medidas.ancho * item.medidas.prof * 0.05) {
    item.costoEnvio.flete = item.medidas.peso * 1.3
} else {
    item.costoEnvio.flete =item.medidas.largo * item.medidas.ancho * item.medidas.prof * 0.05
};

costoEnvioBruto = item.costoEnvio.flete*1 + item.costoEnvio.impuesto*1 + item.costoEnvio.seguro*1;
item.costoEnvio.costoEnvFinal = costoEnvioBruto.toFixed(2) ;


console.log(item);

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

resumen2 = "Ganancia: $" + item.ganancia.toFixed(2) + " / Costo Envio: $" + item.costoEnvio.costoEnvFinal;
  