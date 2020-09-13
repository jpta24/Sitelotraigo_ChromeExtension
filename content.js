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
        valAgrand: 3,
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
        fechaEntrega: "",
    },
};

if( $('body').find('#priceblock_ourprice').length != 0 ) {
    precioTxt = $('#priceblock_ourprice').text();
} else {
    precioTxt = $('#priceblock_saleprice').text();
};

if (precioTxt != ""){
    item.precioBruto = precioTxt.substring(precioTxt.indexOf("$")+1);

    item.precio = parseFloat(item.precioBruto.replace(",",""));
}                

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

postm0 = null;
postm1 = null;
detTipo01 = null;
medNum = null;
detTipo0 = "";
detTipo1 = ["prodDetails", "detail-bullets", "productOverview_feature_div", "detailBullets_feature_div"];


tipoMed0 = "";
tipoMed1 = ["\nProduct Dimensions\n", "\nPackage Dimensions\n", "Product Dimensions", "Package Dimensions", "Información de producto", "\nInformación de producto\n", "Item Dimensions  LxWxH", "\nItem Dimensions  LxWxH\n",  "Dimensiones del artículo Largo x Ancho x Altura", "\nDimensiones del artículo Largo x Ancho x Altura\n", "Dimensiones del producto", "\nDimensiones del producto\n", "Dimensiones del paquete", "\nDimensiones del paquete\n" ];

uniMedida0 = "";
uniMedida1 = ["inches", "cm" , "mm", "pulgadas", "m"];

tipoPeso0 = "";
tipoPeso1 = ["\nItem Weight\n", "Shipping Weight", "Peso del producto", "\nPeso del producto\n" ];

uniPeso0 = "";
uniPeso1 = ["Pounds", "pounds", "Libras", "libras", "Ounces", "ounces", "Onzas", "onzas", "lbs", "kg" , "kgs", "gr", "grs" ];



var tipoDetalles = $('div');
var i;

var j;
detTipo0 = [];
for (i = 0; i < tipoDetalles.length; i++) {
    for (j = 0; j < detTipo1.length; j++) {
        if (detTipo1[j]  == tipoDetalles[i].getAttribute("id")) {
            detTipo0.push({"attr":j, "posicion": i});
        };
    }; 
};

// Tipo de Detalles del Producto y Tipo de Peso (Med)
function checkTipoMedByClass (classType, val1){
    var val1 = document.getElementsByClassName(classType);
    var i;
    var j;
    for (i = 0; i < val1.length; i++) {
        for (j = 0; j < tipoMed1.length; j++) {
            
            if (val1[i].innerHTML == tipoMed1[j]) {
                tipoMed0 = tipoMed1[j];
                postm0 = i;
                detTipo01 = detTipo0[k].attr;
                break
            } 
        };

        for (j = 0; j < tipoPeso1.length; j++) {
            if (tipoPeso1[j] == val1[i].innerHTML) {
                tipoPeso0 = tipoPeso1[j];
                postm1 = i;
                detEnv01 = detTipo0[k].attr;
                break
            }
        };
    }
    
};

function checkTipoMedByLi (val1){
    val1 = $('li');
    var i;
    var j;
    
    for (i = 0; i < val1.length; i++) {
        for (j = 0; j < tipoMed1.length; j++) {
            if (val1[i].innerHTML.search(tipoMed1[j]) !== -1) {
                tipoMed0 = tipoMed1[j];
                postm0 = i;
                detTipo01 = detTipo0[k].attr;
                break
            } 
        };

        for (j = 0; j < tipoPeso1.length; j++) {
            if (val1[i].innerHTML.search(tipoPeso1[j]) !== -1) {
                tipoPeso0 = tipoPeso1[j];
                postm1 = i;
                detEnv01 = detTipo0[k].attr;
                break
            }  
        };
    }
};

// Tipo de unidad de medida 
function getMedNumByClass (classType){
    var uniMedida = document.getElementsByClassName(classType)[postm0].nextElementSibling.innerHTML;
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
            }
                
            break
        }  else {
            uniMedida0 = "S/Inf";
        }
    }
};

function getMedNumByLi (){
    var uniMedida = document.getElementsByTagName('li')[postm0].innerText;
    var i;
    for (i = 0; i < uniMedida1.length; i++) {
        if ( uniMedida.search(uniMedida1[i]) !== -1 ) {
            uniMedida0 = uniMedida1[i];
            medNum = uniMedida.substring(uniMedida.indexOf(":")+2, uniMedida.search(uniMedida0)-1);            
            item.medidas.dimensiones = medNum;
            var indices = [];
            var j;
            for(var j=0; i < medNum.length; i++) {
                if (medNum[i] === "x") indices.push(i);
                item.medidas.largo = medNum.substring(0, indices[0]-1);
                item.medidas.ancho = medNum.substring(indices[0]+2, indices[1]-1);
                item.medidas.prof = medNum.substring(indices[1]+2);
            }
            break
        }  else {
            uniMedida0 = "S/Inf";
        }
    }
};

// Tipo de Envio 2da vuelta y medida
function getTipoEnvByClass (classType){
    var uniPeso = document.getElementsByClassName(classType)[postm0].nextElementSibling.innerHTML;
    var i;
    for (i = 0; i < uniPeso1.length; i++) {
        if ( uniPeso.search(uniPeso1[i]) !== -1 ) {
            uniPeso0 = uniPeso1[i];
            sepDim = uniPeso.search("; ");
            pesoNum = uniPeso.substring(sepDim + 2, uniPeso.search(uniPeso0)-1);
            item.medidas.peso = pesoNum;                
            break
        }  else {
            uniMedida0 = "S/Inf";
        }
    }
};

function getTipoEnvByLi (){
    var uniPeso = document.getElementsByTagName('li')[postm0].innerText;
    var i;
    for (i = 0; i < uniPeso1.length; i++) {
        if ( uniPeso.search(uniPeso1[i]) !== -1 ) {
            uniPeso0 = uniPeso1[i];
            sepDim = uniPeso.search("; ");
            pesoNum = uniPeso.substring(sepDim + 2, uniPeso.search(uniPeso0)-1);
            item.medidas.peso = pesoNum;
            break
        }  else {
            uniMedida0 = "S/Inf";
        }
    }
};

// Tipo de unidad de Envio 
function getPesoByClass (classType){
    var uniPeso = document.getElementsByClassName(classType)[postm1].nextElementSibling.innerHTML;

    var i;
    for (i = 0; i < uniPeso1.length; i++) {
        if ( uniPeso.search(uniPeso1[i]) !== -1 ) {
            pesoNum = uniPeso.substr(1, uniPeso.indexOf(" ")-1);
            uniPeso0 = uniPeso1[i];
            item.medidas.peso = pesoNum;
            break
        }  else {
            uniPeso0 = "S/Inf";
        }
    }
};

function getPesoByLi (){
    var uniPeso = document.getElementsByTagName('li')[postm1].innerText;

    var i;
    for (i = 0; i < uniPeso1.length; i++) {
        if ( uniPeso.search(uniPeso1[i]) !== -1 ) {
            uniPeso0 = uniPeso1[i];
            pesoNum = uniPeso.substring(uniPeso.indexOf(":")+2, uniPeso.search(uniPeso0)-1);
            item.medidas.peso = pesoNum;
            break
        }  else {
            uniPeso0 = "S/Inf";
        }
    }
};

// Tipo de Detalles del Producto (Med)
var k;
for (k = 0; k < detTipo0.length; k++) {
    if ((detTipo0[k].attr == 0) || (detTipo0[k].attr == 2)) {
        checkTipoMedByClass ("a-size-base", "tipoMedida");
    } else if ((detTipo0[k].attr == 1) || (detTipo0[k].attr == 3)) {
        checkTipoMedByLi("tipoLista","li");
    } else {
        tipoMed0 = "S/Inf";
        postm0 = null;
    };
};

// Tipo de unidad de medida 
var k;
for (k = 0; k < detTipo0.length; k++) {
    if ((detTipo01 == 0) || (detTipo01 == 2)) {
        getMedNumByClass ("a-size-base");
    } else if ((detTipo01 == 1) || (detTipo01 == 3)) {
        getMedNumByLi ();
    } else {
        tipoMed0 = "S/Inf";
        postm0 = null;
    };
};


// Tipo de unidad de Envio 
if (postm1 === null) {
    var k;
    for (k = 0; k < detTipo0.length; k++) {
        if ((detTipo01 == 0) || (detTipo01 == 2)) {
           getTipoEnvByClass ("a-size-base");
        } else if ((detTipo01 == 1) || (detTipo01 == 3)) {
           getTipoEnvByLi ();
        } else {
            tipoMed0 = "S/Inf";
            postm0 = null;
        };
    };

} else {
    var k;
    for (k = 0; k < detTipo0.length; k++) {
        if ((detTipo01 == 0) || (detTipo01 == 2)) {
            getPesoByClass ("a-size-base");
        } else if ((detTipo01 == 1) || (detTipo01 == 3)) {
            getPesoByLi ();
        } else {
            tipoMed0 = "S/Inf";
            postm0 = null;
        };
    };
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

    if ( uniPeso0 == uniPeso1[4] || uniPeso0 == uniPeso1[5] || uniPeso0 == uniPeso1[6] || uniPeso0 == uniPeso1[6]) {
    item.medidas.peso *= 0.0625
    } else if ( uniPeso0 == uniPeso1[9] || uniPeso0 == uniPeso1[10] ) {
        item.medidas.peso *= 2.20462
    }else if ( uniPeso0 == uniPeso1[11] || uniPeso0 == uniPeso1[12] ) {
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
    } else if (item.medidas.pesoxCant < 10 ) {
        item.costoEnvio.fleteAdicionalSinSB = ((item.medidas.volMetxCant) - 10) * item.costoEnvio.precLibraAdicional;
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

};

calculosIniciales();

