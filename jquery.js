

 $(document).ready(function(){
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
            chrome.runtime.sendMessage(item);
            });


    
        resNS.after("<div id='masInfo' class='masInfo'></div>");

        $('#masInfo').append("<h3 id='tituloMasInfo' class='tituloMasInfo'>Desglose del Precio</h3>").append("<div id='medidasPeso' class='medidasPeso'></div>").append("<div id='precioMedidas' class='precioMedidas'></div>").append("<h3 id='precioTotalEnvio' class='precioTotalEnvio'></h3>").append("<p class='pFinal'>Los precios son referenciales y serán confirmados al recibir la carga en nuestros depositos</p>");

        $('#medidasPeso').append('<table><tr><th class="colCentro">Dimensiones (pulgadas)</th><th class="colCentro" title="Estimación de la Caja de Envio">Caja de Envio</th><th class="colCentro">Cantidad</th><th class="colCentro">Peso <br> Volumétrico</th><th class="colCentro">Peso <br> (libras) </th></tr><tr><td class="colCentro" id="tda1"></td><td class="colCentro" id="tda11"><td class="colCentro" id="tda12"></td></td><td class="colCentro" id="tda2"></td><td class="colCentro" id="tda3"></td></tr></table>');
        
        $('#tda11').html('<img class="logoIMG" id="shippingCart" src="chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/noShippingBox.png">').click(function(){
          
          if ($('#shippingCart').attr("src") === "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/noShippingBox.png") {
            $('#shippingCart').attr("src", "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/ShippingBox.png");
            item.valAgrand = 3;
            funcionVolumen(item.valAgrand);
            console.log(item.medidas.volMetxCant);

            calculosTotales();
            
            $('#tda2').text(item.medidas.volMetxCant.toFixed(2));

          } else {
            $('#shippingCart').attr("src", "chrome-extension://cfpnkkbkipdpbpnlndfclpokkbkohdkm/img/noShippingBox.png");
            item.valAgrand = 0;
            funcionVolumen(item.valAgrand);

            calculosTotales();
            
            $('#tda2').text(item.medidas.volMetxCant.toFixed(2));
          }
        });

          $('#tda12').html('<select name="cantidad" id="cantidad">')

          $('#cantidad').html('<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>');

          $('#cantidad').on("change", function(){
            item.cantidad = document.getElementById('cantidad').value;

            funcionVolumen(item.valAgrand);

            calculosTotales();
                        
        });
          


        $('#precioMedidas').append('<table><tr><th>Concepto</th><th class="colCentro">Unidad</th><th>Total</th></tr><tr><td  id="tb1">Flete $2.2</td><td class="colCentro" id="tb2"></td><td  id="tb3"></td></tr><tr><td  id="tc1">Seguro</td><td class="colCentro" id="tc2">$10.00</td><td  id="tc3">$10.00</td></tr><tr><td title="El impuesto se comienza a cobrar cuando el precio sobre pasa los 200$ declarados" id="td1">Impuesto</td><td class="colCentro" id="td2" title="El impuesto se comienza a cobrar cuando el precio sobre pasa los 200$ declarados"></td><td title="El impuesto se comienza a cobrar cuando el precio sobre pasa los 200$ declarados" id="td3"></td></tr><tr><td  id="te1">Dif. Volumen $0.99</td><td class="colCentro" id="te2"></td><td  id="te3"></td></tr><tr><td></td><td class="tf3">TOTAL</td><td class="tf3" id="tf3"></td></tr></table>');

//--------------------------------------------------------------------------------
//----------------------------CALCULOS TOTALES -----------------------------------
//--------------------------------------------------------------------------------

        function calculosTotales() {
          calculosIniciales();

          
          $('#tda1').text(medNum);
          $('#tda2').text(item.medidas.volMetxCant.toFixed(2));
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
          
          if (item.medidas.volMetxCant*1 < 10 ) {
            $('#te2').text("0");
            $('#te3').text("$0");
            item.costoEnvio.fleteAdicional = 0;

          } else if (item.medidas.volMetxCant*1 > item.medidas.peso) {
            volumenArreglado = (item.medidas.volMetxCant*1) - item.medidas.peso;
            item.costoEnvio.fleteAdicional = ((item.medidas.volMetxCant) - item.medidas.peso) * item.costoEnvio.precLibraAdicional;
            $('#te2').text(volumenArreglado.toFixed(2));
            $('#te3').text("$" + item.costoEnvio.fleteAdicional.toFixed(2));
          
          } else {
            $('#te2').text("0");
            $('#te3').text("$0");
            item.costoEnvio.fleteAdicional = 0;
          };
          
          // Costo Final

          costoEnvioBruto = item.costoEnvio.flete*1 + item.costoEnvio.fleteAdicional*1 + item.costoEnvio.impuesto*1 + item.costoEnvio.seguro*1;

          item.costoEnvio.costoEnvFinal = costoEnvioBruto.toFixed(2);

          $('#costo').text(" $" + item.costoEnvio.costoEnvFinal);

          $('#tf3').text("$" + item.costoEnvio.costoEnvFinal);

          console.log(item);
        };
//--------------------------------------------------------------------------------




        calculosTotales();

        

      
        chrome.runtime.onMessage.addListener(
          function(request, sender, sendResponse) {
            console.log(request);
          });


        
    
  });


 