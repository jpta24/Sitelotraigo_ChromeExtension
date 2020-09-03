

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

        $('#costo').text(" $" + item.costoEnvio.costoEnvFinal);

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


    
        resNS.after("<div id='masInfo' class='masInfo'></div>");

        $('#masInfo').append("<h3 id='tituloMasInfo' class='tituloMasInfo'>Desglose del Precio</h3>").append("<div id='medidasPeso' class='medidasPeso'></div>").append("<div id='precioMedidas' class='precioMedidas'></div>").append("<h3 id='precioTotalEnvio' class='precioTotalEnvio'></h3>").append("<p class='pFinal'>Los precios son referenciales y serán confirmados al recibir la carga en nuestros depositos</p>");

        $('#medidasPeso').append('<table><tr><th class="colCentro">Dimensiones (pulgadas)</th><th class="colCentro">Peso <br> Volumétrico</th><th class="colCentro">Peso <br> (libras) </th></tr><tr><td class="colCentro" id="tda1"></td><td class="colCentro" id="tda2"></td><td class="colCentro" id="tda3"></td></tr></table>');
        

        $('#tda1').text(medNum);
        $('#tda2').text(item.medidas.calculoVoluMetrico);
        $('#tda3').text(item.medidas.peso);

        $('#precioMedidas').append('<table><tr><th>Concepto</th><th class="colCentro">Unidad</th><th>Total</th></tr><tr><td  id="tb1">Flete $2.2</td><td class="colCentro" id="tb2"></td><td  id="tb3"></td></tr><tr><td  id="tc1">Seguro</td><td class="colCentro" id="tc2">$10.00</td><td  id="tc3">$10.00</td></tr><tr><td  id="td1">Impuesto</td><td class="colCentro" id="td2"></td><td  id="td3"></td></tr><tr><td  id="te1">Dif. Volumen $0.99</td><td class="colCentro" id="te2"></td><td  id="te3"></td></tr><tr><td></td><td class="tf3">TOTAL</td><td class="tf3" id="tf3"></td></tr></table>');

        if (item.medidas.peso < 10 ) {
          $('#tb2').text('10 (min)');
        } else {
          $('#tb2').text(item.medidas.peso);
        }

        $('#tb3').text("$" + item.costoEnvio.flete.toFixed(2));

        if (item.precio < 200 ) {
          $('#td2').text("0%");
          $('#td3').text("$0");
        } else {
          $('#td2').text("30%");
          $('#td3').text("$" + item.costoEnvio.impuesto.toFixed(2));
        }

        if (item.medidas.volumen / 166 < 10 ) {
          $('#te2').text("0");
          $('#te3').text("$0");

        } else if (item.medidas.volumen / 166 > item.medidas.peso) {
          volumenArreglado = (item.medidas.volumen / 166) - item.medidas.peso
          $('#te2').text(volumenArreglado.toFixed(2));
          $('#te3').text("$" + item.costoEnvio.fleteAdicional.toFixed(2));
        
        } else {
          $('#te2').text("0");
          $('#te3').text("$0");
        }

        $('#tf3').text("$" + item.costoEnvio.costoEnvFinal)


        
    
  });


 