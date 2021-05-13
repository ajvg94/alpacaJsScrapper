const fs = require('fs');
const puppeteer = require('puppeteer');

let AdjudicaionesUrls= [
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/BienesAdjudicar",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargaCochera",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargaDepartamento",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargaEdificio",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarEntregaLlave",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarLicitacionesDepartamento",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/AprobarOfertaLicitatoria",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarOfertaLicitatoria",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/ConsultarListadoDeLicitaciones",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarBienesALicitar",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarOperacionNoPropietarios",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarOperacionesVentaCochera",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarOperacionSubasta",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarPropietario",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarReglasDeNegocio",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarVentaDeCochera",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarBienesAAdjudicar",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarBienesSorteoDepartamento",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarBienesSorteo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarCochera",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarDepartamento",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarEdificio",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/CargarResultadoDeSorteo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/ListarResultaDeSorteo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/AprobarAdjudicaciones",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/AprobarEntregaDeLlaves",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/AprobarTransferencias",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/ProcesarLicitacion",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/ConsultarResultadosDeAdjudicaciones",
    "https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/ProcedimientoDeSorteo"
];

let CobrosUrls= [
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/VerificarCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ReimprimirComprobantes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/AprobarReversarCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarExportarFacturaAnuladas",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/AdministrarCobrosAprobadosRechazados",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/DetalleBocaCobranza",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarCobrosAutomaticos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ReprogramarFechas",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CambiarMediosCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ModificarMedioCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ModificarDatosCuota",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesarDescuentos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarCuotasContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ClientesExcepciones",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ExcepcionesDescuentos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarCobrosAutomaticosAccionCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/GenerarLlamadaCobranza",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ReprocesarEnvios",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarMorosidad",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesarCobros",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesarCobrosDos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/MasivoModificarMedioCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/MasivoModificarDatosCuota",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/MasivoProcesarDescuentos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/MasivoCargarCuotasContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/MasivoClientesExcepciones",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/MasivoExcepcionesDescuentos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ExcepcionesCotizaciones",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ExcepcionesPagoMinimo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarCobrosAprobadosRechazados",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesoOtrosCobros",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/AgregarCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ImprimirComprobante",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesarCobrosBocasCobranza",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/MasivoDetalleBocaCobranza",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarExcepcionDeCotizacion",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarExcepcionesCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarExcepcionesDePagoMinimo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarExcepcionesDescuentos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarDetallesBocaDeCobranza",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ImprimirComprobante",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarCobros",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesarCobrosGeneral",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesarCobros",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesarCobrosBocaDeCobranza",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesarOtrosCobros",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarCobrosAprobadosYRechazados",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarCuotas",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarCuotasMasivas",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarLlamadasDeCobranza",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarBocaDeCobranza",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarCobrosAutomaticos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarExcepcionDescuentoCuota",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarMorosidad",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ModificarContratoDatosDeLaCuota",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ModificarDatosDeLaCuota",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ModificarMedioCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ModificarMedioDeCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ModificarMediosDeCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ProcesarDescuentos"       ,
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ReprocesarEnvios",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ReprogramarCobros",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/AprobarReversarCobros",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/CargarCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ConsultarCobrosProductosPrincipales",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ReimprimirComprobante",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/VerificarCobro",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/AdministrarCobrosAprobadosRechazados",
    "https://fortalezacoreapp-lab.azurewebsites.net/Cobros/ListarCobro"
];

let ContratosUrls= [
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/AgregarContratoDeClientes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/AprobarContratos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ListarContratos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ContratoPendiente",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarCuotasDeContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarExcepciones",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarExcepcionesDeDescuento",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarExcepcionesDeCotizacion",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarExcepcionesPagoMinimo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarOperacionesContratosDelCliente",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarPuntajes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarReferidos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarTitularesContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ConsultarContratos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ImprimirExportarContratoDelCliente",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/InactivarContratos",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/InactivarContratoDelCliente",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/AdherirTitular",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarClausulaDeContratoDeClientes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarDescomposicionPlanes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ModificarContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ModificarContratoCambioDeTitularidad",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ModificarContratoDatosDeLaCuota",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ModificarContratoDeClientes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarOperacionesCambioDePlanes",  
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CambioDePlanes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarCambioDePlanes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarOperacionesAdherirTitularidad",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarOperacionesAplicarPagoMinimo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarOperacionesAplicarClausula",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ClausulaContratoClientes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ModificarContratoClientes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ModificarPagoMinimo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/CargarOperacionesPagoMinimo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Contratos/ProcesoGestionContratos"
];

let FacturasUrls= [
    "https://fortalezacoreapp-lab.azurewebsites.net/Facturas/GenerarFacturasContado",
    "https://fortalezacoreapp-lab.azurewebsites.net/Facturas/ConsultarFacturasClientes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Facturas/AnularFacturaClientes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Facturas/GeneraNotaCredito"        ,
    "https://fortalezacoreapp-lab.azurewebsites.net/Facturas/CargarFacturasContadoCredito",
    "https://fortalezacoreapp-lab.azurewebsites.net/Facturas/CargarNotaDeCredito",
    "https://fortalezacoreapp-lab.azurewebsites.net/Facturas/AnularFacturas",
    "https://fortalezacoreapp-lab.azurewebsites.net/Facturas/ConsultarFacturas",
    "https://fortalezacoreapp-lab.azurewebsites.net/Facturas/ConsultarFacturasAnuladas"
];

let OperacionesUrls= [
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionMercadoSecundarioContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionProductosNoTradicionales",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionProductoContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionDeFusionContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionDePlanes", 
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionDeTitularidad",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionTransferenciaOCambioDeTitularidad",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesDescomponerPlanes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesDeMercadoSecundario",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesDeContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarDetallesPlanes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarGastoAdministrativo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionVentaCochera",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionDescomposicionDePlanesAdelanto",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesDePagoMinimo",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesDeReactivacion",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesDescomposicionPlanes",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesSubastaListar",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesSubasta",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesSubasta2",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesSubasta3",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarOperacionesSubastaActualizarContrato",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/GastosAdministrativosMercadoSecundario",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/MercadoSecundario",
    "https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/CargarReservaMercaSec"
];

let PuntajesUrls= [
    "https://fortalezacoreapp-lab.azurewebsites.net/Puntajes/ConsultarPuntajes"
];

const removeAcentos = (text) =>{       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    text = text.replace("³", "");
    return text;                 
};

const getHtml = async (url,pageName,folderName) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0'});
    try{
        let html  = await page.$eval('.jumbotron', e => e.innerHTML);
        html = removeAcentos(html);
        await fs.writeFileSync(`./scrappedPages/${folderName}/${pageName}.html`, html, function (err) {
            if (err) throw err;
        });
        console.log(`\t${pageName}=>File created successfully.`);
    }catch(error){ 
        let html  = await page.content();
        await browser.close();

        html = removeAcentos(html);
        await fs.writeFileSync(`./scrappedPages/${folderName}/${pageName}.html`, html, function (err) {
            if (err) throw err;
        });
        console.log(`\t${pageName}=>No tiene JUMBOTRON, se descargo HTML`);
    } 
    
    await browser.close();

    
};

const getPages = async () => {
    // Creamos raiz directorio si no existe
    if (!fs.existsSync('./scrappedPages/')) fs.mkdirSync('./scrappedPages/');
    
//Adjudicaciones
    if (!fs.existsSync(`./scrappedPages/Adjudicaciones`)) fs.mkdirSync(`./scrappedPages/Adjudicaciones`);
    console.log(`Adjudicaciones start...`);
    for (i=0;i<AdjudicaionesUrls.length;i++){
        await getHtml(AdjudicaionesUrls[i],AdjudicaionesUrls[i].replace("https://fortalezacoreapp-lab.azurewebsites.net/Adjudicaciones/",""),"Adjudicaciones");
    }
    console.log(`Adjudicaciones finished...`);

//Cobros
    if (!fs.existsSync(`./scrappedPages/Cobros`)) fs.mkdirSync(`./scrappedPages/Cobros`);
    console.log(`Cobros start...`);
    for (i=0;i<CobrosUrls.length;i++){
        await getHtml(CobrosUrls[i],CobrosUrls[i].replace("https://fortalezacoreapp-lab.azurewebsites.net/Cobros/",""),"Cobros");
    }
    console.log(`Cobros finished...`);

// Contratos
    if (!fs.existsSync(`./scrappedPages/Contratos`)) fs.mkdirSync(`./scrappedPages/Contratos`);
    console.log(`Contratos start...`);
    for (i=0;i<ContratosUrls.length;i++){
        await getHtml(ContratosUrls[i],ContratosUrls[i].replace("https://fortalezacoreapp-lab.azurewebsites.net/Contratos/",""),"Contratos");
    }
    console.log(`Contratos finished...`);

// Facturas
    if (!fs.existsSync(`./scrappedPages/Facturas`)) fs.mkdirSync(`./scrappedPages/Facturas`);
    console.log(`Facturas start...`);
    for (i=0;i<FacturasUrls.length;i++){
        await getHtml(FacturasUrls[i],FacturasUrls[i].replace("https://fortalezacoreapp-lab.azurewebsites.net/Facturas/",""),"Facturas");
    }
    console.log(`Facturas finished...`);

// Operaciones
    if (!fs.existsSync(`./scrappedPages/Operaciones`)) fs.mkdirSync(`./scrappedPages/Operaciones`);
    console.log(`Operaciones start...`);
    for (i=0;i<OperacionesUrls.length;i++){
        await getHtml(OperacionesUrls[i],OperacionesUrls[i].replace("https://fortalezacoreapp-lab.azurewebsites.net/Operaciones/",""),"Operaciones");
    }
    console.log(`Operaciones finished...`);

// Puntajes
    if (!fs.existsSync(`./scrappedPages/Puntajes`)) fs.mkdirSync(`./scrappedPages/Puntajes`);
    console.log(`Puntajes start...`);
    for (i=0;i<PuntajesUrls.length;i++){
        await getHtml(PuntajesUrls[i],PuntajesUrls[i].replace("https://fortalezacoreapp-lab.azurewebsites.net/Puntajes/",""),"Puntajes");
    }
    console.log(`Puntajes finished...`);
};

getPages();

