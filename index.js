const fs = require('fs');
const puppeteer = require('puppeteer');

let AdjudicaionesUrls= [
    
];

let CobrosUrls= [
    
];

let ContratosUrls= [
    
];

let FacturasUrls= [
    
];

let OperacionesUrls= [
    
];

let PuntajesUrls= [
    
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
        await getHtml(AdjudicaionesUrls[i],AdjudicaionesUrls[i].replace(url,""),"Adjudicaciones");
    }
    console.log(`Adjudicaciones finished...`);

let url = ""//your url
//Cobros
    if (!fs.existsSync(`./scrappedPages/Cobros`)) fs.mkdirSync(`./scrappedPages/Cobros`);
    console.log(`Cobros start...`);
    for (i=0;i<CobrosUrls.length;i++){
        await getHtml(CobrosUrls[i],CobrosUrls[i].replace(url,""),"Cobros");
    }
    console.log(`Cobros finished...`);

// Contratos
    if (!fs.existsSync(`./scrappedPages/Contratos`)) fs.mkdirSync(`./scrappedPages/Contratos`);
    console.log(`Contratos start...`);
    for (i=0;i<ContratosUrls.length;i++){
        await getHtml(ContratosUrls[i],ContratosUrls[i].replace(url,""),"Contratos");
    }
    console.log(`Contratos finished...`);

// Facturas
    if (!fs.existsSync(`./scrappedPages/Facturas`)) fs.mkdirSync(`./scrappedPages/Facturas`);
    console.log(`Facturas start...`);
    for (i=0;i<FacturasUrls.length;i++){
        await getHtml(FacturasUrls[i],FacturasUrls[i].replace(url,""),"Facturas");
    }
    console.log(`Facturas finished...`);

// Operaciones
    if (!fs.existsSync(`./scrappedPages/Operaciones`)) fs.mkdirSync(`./scrappedPages/Operaciones`);
    console.log(`Operaciones start...`);
    for (i=0;i<OperacionesUrls.length;i++){
        await getHtml(OperacionesUrls[i],OperacionesUrls[i].replace(url,""),"Operaciones");
    }
    console.log(`Operaciones finished...`);

// Puntajes
    if (!fs.existsSync(`./scrappedPages/Puntajes`)) fs.mkdirSync(`./scrappedPages/Puntajes`);
    console.log(`Puntajes start...`);
    for (i=0;i<PuntajesUrls.length;i++){
        await getHtml(PuntajesUrls[i],PuntajesUrls[i].replace(url,""),"Puntajes");
    }
    console.log(`Puntajes finished...`);
};

getPages();

