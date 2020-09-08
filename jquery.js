 $(document).ready(function(){
  var msj = {
    action: "",
    item: "",
    listadoProductos: [],
    itemNumber:"",
    change: "",
  }

  var listadoProductos = [];

  var divPrice = $('#desktop_unifiedPrice');

  divPrice.after("<div id='resNS' class='resNS'></div>");

  var resNS = $('#resNS');

  resNS.html("<div id='logo' class='logo'></div>");

  $('#logo').after("<p id='costo' class='costo'></p>").after("<form id='formEnvio' class='formEnvio'></form>");

  $('#logo').html('<img class="logoIMG" src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/stlt2.jpg">');

  $('#formEnvio').html('<label id="formDesc" class="formDesc" for="pais">Costo Envio a :</label>');

  $('#formDesc').after('<img id="bandera" class="logoIMG" src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/col.png">').after('<select name="pais" id="pais">')

  $('#pais').html('<option value="col">Col</option><option value="vzl">Vzl</option>');

  $('#pais').on("change", function(){
    if (document.getElementById('pais').value == "vzl") {
      document.getElementById('bandera').setAttribute("src", "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/ven.png");
    } else if (document.getElementById('pais').value == "col" ) {
      document.getElementById('bandera').setAttribute("src", "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/col.png");
    };
      
  });

  $('#costo').after("<div id='information' class='information'></div>");

  $('#information').html('<img class="logoInformation" src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/info.png">').hover(function(){
      $(this).css("opacity", "0.5");
    },function(){
      $(this).css("opacity", "1");
    }).click(function(){
      $("#masInfo").attr("display", "flex");
      $("#masInfo").slideToggle("slow");
      });
      
  $('#information').after("<div id='shoppingCart' class='information'></div>");

  $('#shoppingCart').html('<img class="logoInformation" title="Agregar al carrito para ver precio de varios productos" src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/SC1.png">').hover(function(){
    $(this).css("opacity", "0.5");
    },function(){
      $(this).css("opacity", "1");
    }).click(function(){
      msj.action = "addItem"
      msj.item = item;
      
      console.log(listadoProductos);
      chrome.runtime.sendMessage(msj);
      
    
      if ($("#shoppingCartResGral").attr("display") == undefined || $("#shoppingCartResGral").attr("display") == "none") {
        mostrarShippingCart();
      };      
    });


  
  resNS.after("<div id='masInfo' class='masInfo'></div>");

  $('#masInfo').append("<h3 id='tituloMasInfo' class='tituloMasInfo'>Desglose del Precio</h3>").append("<div id='medidasPeso' class='medidasPeso'></div>").append("<div id='precioMedidas' class='precioMedidas'></div>").append("<p class='pFinal'>Los precios son referenciales y serán confirmados al recibir la carga en nuestros depositos</p>");

  $('#medidasPeso').append('<table><tr><th class="colCentro">Dimensiones (pulgadas)</th><th class="colCentro" title="Estimación de la Caja de Envio">Caja de Envio</th><th class="colCentro">Cantidad</th><th class="colCentro">Peso <br> Volumétrico</th><th class="colCentro">Peso <br> (libras) </th></tr><tr><td class="colCentro" id="tda1"></td><td class="colCentro" id="tda11"><td class="colCentro" id="tda12"></td></td><td class="colCentro" id="tda2"></td><td class="colCentro" id="tda3"></td></tr></table>');
      
  $('#tda11').html('<img class="logoIMG" id="shippingCart" src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/noShippingBox.png">').hover(function(){
    $(this).css("opacity", "0.6");
    },function(){
      $(this).css("opacity", "1");
    }).click(function(){
        
    if ($('#shippingCart').attr("src") === "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/noShippingBox.png") {
      $('#shippingCart').attr("src", "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/ShippingBox.png");
      item.medidas.shippingBox = true;
      
      $('#tda2').text(item.medidas.volMetAgrandxCant.toFixed(2));
      calculosTotales();

    } else {
      $('#shippingCart').attr("src", "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/noShippingBox.png");
      item.medidas.shippingBox = false;
      
      $('#tda2').text(item.medidas.volMetxCant.toFixed(2));
      calculosTotales();
    }
  });

  $('#tda12').html('<select name="cantidad" id="cantidad">')

  $('#cantidad').html('<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>');

  $('#cantidad').on("change", function(){
    item.cantidad = document.getElementById('cantidad').value;

    calculosTotales();
                      
  });
        


  $('#precioMedidas').append('<table><tr><th>Concepto</th><th class="colCentro">Unidad</th><th>Total</th></tr><tr><td  id="tb1">Flete $2.2</td><td class="colCentro" id="tb2"></td><td  id="tb3"></td></tr><tr><td  id="tc1">Seguro</td><td class="colCentro" id="tc2">$10.00</td><td  id="tc3">$10.00</td></tr><tr><td title="El impuesto se comienza a cobrar cuando el precio sobre pasa los 200$ declarados" id="td1">Impuesto</td><td class="colCentro" id="td2" title="El impuesto se comienza a cobrar cuando el precio sobre pasa los 200$ declarados"></td><td title="El impuesto se comienza a cobrar cuando el precio sobre pasa los 200$ declarados" id="td3"></td></tr><tr><td  id="te1">Dif. Volumen $0.99</td><td class="colCentro" id="te2"></td><td  id="te3"></td></tr><tr><td></td><td class="tf3">TOTAL</td><td class="tf3" id="tf3"></td></tr></table>');


      

//--------------------------------------------------------------------------------
//----------------------------CALCULOS TOTALES -----------------------------------
//--------------------------------------------------------------------------------

  function calculosTotales() {
    calculosIniciales();

    $('#tda1').text(medNum);
    $('#tda3').text(item.medidas.pesoxCant.toFixed(2));
    if (item.medidas.pesoxCant < 10 ) {
      $('#tb2').text('10 (min)');
    } else {
      $('#tb2').text(item.medidas.pesoxCant.toFixed(2));
    }

    $('#tb3').text("$" + item.costoEnvio.flete.toFixed(2));

    if (item.precioxCant*0.6 < 200 ) {
      $('#td2').text("0%");
      $('#td3').text("$0");
    } else {
      $('#td2').text("30%");
      $('#td3').text("$" + item.costoEnvio.impuesto.toFixed(2));
    }
    
    if (item.medidas.shippingBox === false) {
      $('#tda2').text(item.medidas.volMetxCant.toFixed(2));
      if (item.medidas.volMetxCant*1 < 10 ) {
        $('#te2').text("0");
        $('#te3').text("$0");
  
      } else if (item.medidas.volMetxCant*1 > item.medidas.pesoxCant) {
        volumenArreglado = (item.medidas.volMetxCant*1) - item.medidas.pesoxCant;
        item.costoEnvio.fleteAdicional = ((item.medidas.volMetxCant) - item.medidas.pesoxCant) * item.costoEnvio.precLibraAdicional;
        $('#te2').text(volumenArreglado.toFixed(2));
        $('#te3').text("$" + item.costoEnvio.fleteAdicional.toFixed(2));
      
      } else {
        $('#te2').text("0");
        $('#te3').text("$0");
        item.costoEnvio.fleteAdicional = 0;
      };

      $('#costo').text(" $" + item.costoEnvio.costoEnvFinal.toFixed(2));

      $('#tf3').text("$" + item.costoEnvio.costoEnvFinal.toFixed(2));
      
    } else {
      $('#tda2').text(item.medidas.volMetAgrandxCant.toFixed(2));
      if (item.medidas.volMetAgrandxCant*1 < 10 ) {
        $('#te2').text("0");
        $('#te3').text("$0");
        item.costoEnvio.fleteAdicional = 0;
  
      } else if (item.medidas.volMetAgrandxCant*1 > item.medidas.pesoxCant*1) {
        volumenArreglado = (item.medidas.volMetAgrandxCant*1) - item.medidas.pesoxCant;
        item.costoEnvio.fleteAdicional = ((item.medidas.volMetAgrandxCant) - item.medidas.pesoxCant) * item.costoEnvio.precLibraAdicional;
        $('#te2').text(volumenArreglado.toFixed(2));
        $('#te3').text("$" + item.costoEnvio.fleteAdicional.toFixed(2));
      
      } else {
        $('#te2').text("0");
        $('#te3').text("$0");
        item.costoEnvio.fleteAdicional = 0;
      };
      
      $('#costo').text(" $" + item.costoEnvio.costoEnvFinalConSB.toFixed(2));

      $('#tf3').text("$" + item.costoEnvio.costoEnvFinalConSB.toFixed(2));
    }
    
    console.log(item);
  };
//--------------------------------------------------------------------------------

  calculosTotales();

//--------------------------------------------------------------------------------
//----------------------------RECIBIR RESPUESTA -----------------------------------
//--------------------------------------------------------------------------------

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      msj = request;
      function actualizarTabla(){
        $('#tabProdVarios tr').remove(".tdarow");
        var i;
        for (i = 0; i < listadoProductos.length; i++) {
          nombreArreglado = listadoProductos[i].nombre.substr(8,10);
          $('#tabProdVarios').append('<tr class ="tdarow"><td class="colCentro" id="tda'+i+'_1">'+nombreArreglado+'</td><td class="colCentro" id="tda'+i+'_2"><select name="cantidadVarios" id="cantidadVarios'+i+'"></td><td class="colCentro" id="tda'+i+'_3"><input type="checkbox" id="cb'+i+'" class="cbvpro"></td><td class="colCentro" id="tda'+i+'_4">$'+listadoProductos[i].precioxCant.toFixed(2)+'</td><td class="colCentro" id="tda'+i+'_5">'+listadoProductos[i].medidas.pesoxCant.toFixed(2)+'</td><td class="colCentro" id="tda'+i+'_6"></td><td class="colCentro" id="tda'+i+'_7"></td><td class="colCentro" id="tda'+i+'_8"><img width=15px height=15px class="delIcon" id="tdai'+i+'"src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/menos.png"></td></tr>');
          
          $('#cantidadVarios'+i).html('<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>');

          $('#cantidadVarios'+i).val(listadoProductos[i].cantidad);

          $('#cantidadVarios'+i).on("change", function(){
            nombreID = $(this).attr('id');
            numero = nombreID.substr(14,1);
            msj.itemNumber = numero;
            msj.action = "quantityChange";
            msj.change = $(this).val();
            msj.listadoProductos = listadoProductos;
            chrome.runtime.sendMessage(msj);
                              
          });
          
          if ( listadoProductos[i].medidas.shippingBox === false ) {
            $('#cb'+i).prop('checked', false);
            $('#tda'+i+'_6').text(+listadoProductos[i].medidas.volxCant.toFixed(2));
            $('#tda'+i+'_7').text(+listadoProductos[i].medidas.volMetxCant.toFixed(2));
          } else {
            $('#cb'+i).prop('checked', true);
            $('#tda'+i+'_6').text(+listadoProductos[i].medidas.volxCantAgrand.toFixed(2));
            $('#tda'+i+'_7').text(+listadoProductos[i].medidas.volMetAgrandxCant.toFixed(2));
          }

            
          $('#cb'+i).click(function(){
            
            nombreID = $(this).attr('id');
            numero = nombreID.substr(2,1);
            msj.itemNumber = numero;

            if ($(this).prop('checked') === true ) {
              msj.action = "addSBitem";
              
              } else {
              msj.action = "removeSBitem";
              } 

            msj.listadoProductos = listadoProductos;
            chrome.runtime.sendMessage(msj); 
          })
          
          $('#tdai'+i).hover(function(){
            $(this).css("opacity", "0.6");
            },function(){
              $(this).css("opacity", "1");
            }).click(function() {
            nombreID = $(this).attr('id');
            numero = nombreID.substr(4,1);
            msj.itemNumber = numero;
            msj.action = "removeItem";
            msj.listadoProductos = listadoProductos;
            chrome.runtime.sendMessage(msj);
          })
        }
      };

      
      listadoProductos = msj.listadoProductos;
      actualizarTabla();
      

     
      
      // ---------------------------------------------------------
      console.log(msj.action);
      console.log(listadoProductos);
    });
//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------
 
//----------------------------------SHOPPING CART----------------------------------

  $('body').append('<div id="shoppingCartResGral" class="shoppingCartResGral"></div>');

  $('body').append('<img class="masIcon" id="masIcon" src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/mas.png">');

  $('#shoppingCartResGral').append("<div><img class='logoIMG' src='chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/stlt2.jpg'><h3 class='tituloMasInfo'>Desglose de Varios Productos</h3></div>").append("<div id='medidasPesoVarios' class='medidasPeso'></div>").append("<div class='separacion'></div>").append("<div id='precioMedidasVarios' class='precioMedidas'></div>").append("<p class='pFinal'>Los precios son referenciales y serán confirmados al recibir la carga en nuestros depositos</p>");

  $('#medidasPesoVarios').append('<table id="tabProdVarios"><tr><th class="colCentro">Nombre</th><th class="colCentro">Cantidad</th><th class="colCentro" title="Estimación de la Caja de Envio" id="thSB"></th><th class="colCentro">Precio</th><th class="colCentro">Peso<br>(libras)</th><th class="colCentro">Volumen<br>(inches<sup>3</sup>)</th><th class="colCentro">Peso<br>VolMetr.</th><th class="colCentro" title="Eliminar Todos" id="thElim"></th></tr></table>');

  $('#precioMedidasVarios').append('<table><tr><th>Concepto</th><th class="colCentro">Unidad</th><th>Total</th></tr><tr><td  id="tb1">Flete $2.2</td><td class="colCentro" id="tb2"></td><td  id="tb3"></td></tr><tr><td  id="tc1">Seguro</td><td class="colCentro" id="tc2">$10.00</td><td  id="tc3">$10.00</td></tr><tr><td title="El impuesto se comienza a cobrar cuando el precio sobre pasa los 200$ declarados" id="td1">Impuesto</td><td class="colCentro" id="td2" title="El impuesto se comienza a cobrar cuando el precio sobre pasa los 200$ declarados"></td><td title="El impuesto se comienza a cobrar cuando el precio sobre pasa los 200$ declarados" id="td3"></td></tr><tr><td  id="te1">Dif. Volumen $0.99</td><td class="colCentro" id="te2"></td><td  id="te3"></td></tr><tr><td></td><td class="tf3">TOTAL</td><td class="tf3" id="tf3"></td></tr></table>');

  $('#thSB').html('<img class="logoIMG active" id="shippingCartVarios" src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/ShippingBox.png">').hover(function(){
    $(this).css("opacity", "0.6");
    },function(){
      $(this).css("opacity", "1");
    }).click(function(){
        
    if ($('#shippingCartVarios').attr("class") == "logoIMG active") {
      $('#shippingCartVarios').removeClass("active");
      msj.action = "addAllSB";
      
      } else {
        $('#shippingCartVarios').addClass("active");
      msj.action = "removeAllSB";
      }
      
      msj.listadoProductos = listadoProductos;
      chrome.runtime.sendMessage(msj);
    
  });

  $('#thElim').html('<img class="logoIMG trashcan" id="trashcan" src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/trashcan.png">').hover(function(){
    $(this).css("opacity", "0.6");
    },function(){
      $(this).css("opacity", "1");
    }).click(function(){

    msj.action = "deleteAll"
    chrome.runtime.sendMessage(msj);

  });

  function mostrarShippingCart() {
    $('#masIcon').attr("src", "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/menos.png");
        $("#shoppingCartResGral").attr("display", "flex");
        $("#shoppingCartResGral").slideToggle("slow");

  };
  
  $('#masIcon').hover(function(){
    $(this).css("opacity", "1");
    },function(){
      $(this).css("opacity", "0.6");
    }).click(function(){

      msj.action = "mostrarSC"
      chrome.runtime.sendMessage(msj);
          
      if ($('#masIcon').attr("src") === "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/mas.png") {
        mostrarShippingCart()

      } else {
        $('#masIcon').attr("src", "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/mas.png");
        $("#shoppingCartResGral").attr("display", "none");
        $("#shoppingCartResGral").slideToggle("slow");
      }
    });



});


/* pasos para saguir un error 
console.log("paso1 enviar mensaje");

console.log("paso2 recibir mensaje y verificar tipo de accion");

console.log("paso3 estoy en la accion");

console.log("paso4 respuesta enviada");
console.log("paso5 respuesta recibida"); */
      

 