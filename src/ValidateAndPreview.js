class ValidateAndPreview {
    constructor(maxSamples) {
        if (document.getElementById('FeedTable') != undefined) {
            this.maxtableColumns = document.getElementById('FeedTable').rows[0].cells.length;
            this.tableLines = document.getElementById('FeedTable').rows.length;            
        } else {
            let urlRegex = /\b(?:(?:https?|ftp|file):\/\/\/?|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/;
            if (document.getElementById('feedURL').value.length == 0 || !document.getElementById('feedURL').value.match(urlRegex)) {
                INTERRUPTED(1);
            } else {
                INTERRUPTED(2);
            }
        }
        // RegEx Section
        this.skuAliases = /^sku|^offer[\s\_\-]*id|art[\s\_\-]*num[mb]er|produ[ck]t[\s\_\-]*id|arti[kc][el][el][\s\_\-]*nu?m?[mb]?e?r|^id|^aid|merchant[\s\_\-]*sku|arti[kc][el][el][\s\_\-]*id|^art\.?nr\.?$|^référence[\s\_\-]*de[\s\_\-]*l\'article|référence\sde l'article|^numéro[\s\_\-]*article|^idproduit$|^identifiant[\s\_\-]*unique|^code[\s\_\-]*article$|^numero[\s\_\-]*articolo|^numero[\s\_\-]*prodotto|^id[\s\_\-]*prodotto|^id[\s\_\-]*articolo|^codice[\s\_\-]*articolo|^codice[\s\_\-]*prodotto|^número[\s\_\-]*de[\s\_\-]*artículo|^identificador|^nome$|^codigo$|^tuotenumero|^numer[\s\_\-]*produktu|^číslo[\s\_\-]*produktu|^gyártási[\s\_\-]*szám|^item\_*id$|^číslo[\s\_\-]*produktu/;
        this.productnameAliases = /produ[ck]t\_*\s*name|art\_*name|artikel\s*name|^name$|^tit[el][el]|^produ[ck]t\-name|^produktbezeichnung|^désignation|^nom[\s\_\-]*d[u|e][\s\_\-]*produit|^titre$|^nome[\s\_\-]*d?e?l?[\s\_\-]*prodotto|^nome[\s\_\-]*articolo|^titolo$|^nombre|^nombre[\s\_\-]*del[\s\_\-]*producto|^título$|^nome[\s\_\-]*do[\s\_\-]*produto|^tuotenimi|^produ[ck]tna[am][nm]|^nazwa[\s\_\-]*produktu|^meno[\s\_\-]*produktu|^názov$|^meno$|^termék[\s\_\-]*név|^jméno[\s\_\-]*produktu/;
        this.priceAliases = /price[\s\_\-]*vat|^price|^preis|^search[\s\_\-]*price|^product[\s\_\-]*price|current[\s\_\-]*price|^prix$|^prix[\s\_\-]*TTC$|^prezzo$|^precio$|^precio[\s\_\-]*rebajado|^preço$|^preco[\s\_\-]*por|^hinta$|^prij?s$|^cena$|^cena[\s\_\-]*dph$|^ár$/;
        this.descriptionAliases = /^description|^beschreibung|^produ[k|t][t|k][\s\_\-]*beschreibung|^i?t?e?m?[\s\_\-]*product[\s\_\-]*description|^desc$|long[\s\_\-]*description|kurz[\s\_\-]*beschreibung|^description[\s\_\-]*du[\s\_\-]*produit|^descrizione|^descripción|^descrição|^tuotekuvaus|^kuvaus|^beskrivning|^produktbeskrivning|^omschrijving|^opis$|^opis[\s\_\-]*produktu|^popis[\s\_\-]*produktu|^leírás$|^popis$/;
        this.imageURLAliases = /^bild|^ima?ge?n?|^item[\s\_\-]*image|^product[\s\_\-]*image[\s\_\-]*url|^picture[\s\_\-]*url|^item[\s\_\-]*bild|^link[\s\_\-]*produktbild|merchant[\s\_\-]*image[\s\_\-]*url|^product[\s\_\-]*images?|large_image|^URL[\s\_\-]*de[\s\_\-]*l\'image|^immagine$|^url[\s\_\-]*immagine|^immagine[\s\_\-]*url|^imagem$|^kuvalinkki$|^linki?[\s\_\-]*do[\s\_\-]*zdjęć|^obrázok$|^fotka[\s\_\-]*url|^link[\s\_\-]*produktu|^kép[\s\_\-]*url$|^url[\s\_\-]*obrázku$/;
        this.deepURLAliases = /^deep|^link|^url|^product\-*producturl|^item\-*deepurl|^produ[ck]t[\s\_\-]*url|^aw[\s\_\-]*deep[\s\_\-]*link|^click[\s\_\-]*url$|^lien[\s\_\-]*produit|^lien[\s\_\-]*profond|^url[\s\_\-]*produit|^url[\s\_\-]*profonde|^url[\s\_\-]*de[\s\_\-]*redirection|^url[\s\_\-]*article|^url[\s\_\-]*prodotto|^url[\s\_\-]*articolo|^url[\s\_\-]*del[\s\_\-]*producto|^tuotelinkki|^syvälinkki|^link[\s\_\-]*do[\s\_\-]*strony|^produktovéurl/;
        this.top_CategoryAliases = /^hauptkategorie|^top[\s\_\-]*category|product[\s\_\-]*t?d?categoryname|^m?a?i?n?\_*[ck]ategor[iy]e?$|^item\-*hauptkategorie|^google\_product\_category|^categorytext|^shop\_*cat|category[\s\_\-]*path|^product[\s\_\-]*category|^categories$|kategorie[\s\_\-]*baum|^produkt[\s\_\-]*typ|^produkt[\s\_\-]*gruppe|^category[\s\_\-]*name|^catégorie[\s\_\-]*principale|^top[\s\_\-]*catégorie|^categor[i|í]a[\s\_\-]*principale?|^categor[i|í]a$|^top[\s\_\-]*categor[i|í]a|^pääkategoria|^huvudkategori|^kategori$|^główna[\s\_\-]*kategoria|^obchod[\s\_\-]*kategória|^kategória[\s\_\-]*meno|^hlavná[\s\_\-]*kategória|^kategórie$|^názov[\s\_\-]*kategórie[\s\_\-]*produktu|^ová[\s\_\-]*[c|k]ategória|^főkategória|^hlavní[\s\_\-]*kategorie/;
        this.categoryAliases = /^1?\.?\s*unterkategorie|^item[\s\_\-]*unterkategorie|^sub[\s\_\-]*categor[y|i]e?s?|^product[\s\_\-]*type|^merchant[\s\_\-]*category|^category1|^sous[\s\_\-]*catégorie|^sub[\s\_\-]*categor[i|í]a|^sottocategoria|^alakategoria|^subkategori|^pod[\s\_\-]*kateg[o|ó]ri[a|e]|^alkategória|^[c|k]ategories?$|^category$|^kategorie[\s\_\-]*baum$/;
        this.category_2Aliases = /^unterkategorie[\s\_\-]*2|^category[\s\_\-]*2|^2\.*t?e?[\s\_\-]*unterkategorie|^2\.*t?e?[\s\_\-]*sub[\s\_\-]*category|sub[\s\_\-]*sub[\s\_\-]*categor[yi]e?s?|^seconde[\s\_\-]*sous[\s\_\-]*catégorie|^sous[\s\_\-]*catégorie[\s\_\-]*2|^seconda[\s\_\-]*sottocategoria|^2a[\s\_\-]*sottocategoria|^2a[\s\_\-]*sub[\s\_\-]*categoria|^seconda[\s\_\-]*sub[\s\_\-]*categoria|^2d?a[\s\_\-]*sub[\s\_\-]*categor[i|í]a|^segunda[\s\_\-]*sub[\s\_\-]*categoría|^2\.[\s\_\-]*alakategoria|^sub[\s\_\-]*sub[\s\_\-]*kategori|^2a[\s\_\-]*sub[\s\_\-]*kategori|^druga[\s\_\-]*podkategoria|^pod[\s\_\-]*pod[\s\_\-]*kategória|^druhá[\s\_\-]*podkategória|^2[\s\_\-]*podkategória|^második[\s\_\-]*alkategória|^2\.[\s\_\-]*pod[\s\_\-]*kategorie|^[c|k]ategories?$|^category$|^kategorie[\s\_\-]*baum$/;
        this.old_PriceAliases = /alter[\s\_\-]*preis|old[\s\_\-]*price|previous[\s\_\-]*price|price[\s\_\-]*old|preis[\s\_\-]*alt|streich[\s\_\-]*preis|^sale[\s\_\-]*price|^uvp$|original[\s\_\-]*price|current[\s\_\-]*price|discount[\s\_\-]*price|sale[\s\_\-]*preis|^ancien[\s\_\-]*prix$|^prezzo[\s\_\-]*vecchio|^prezzo[\s\_\-]*intero|^precio[\s\_\-]*antiguo|^preço[\s\_\-]*antigo|^preco[\s\_\-]*de|^vanha[\s\_\-]*hinta|^alkuperäinen[\s\_\-]*hinta|^ursprungligt[\s\_\-]*pris|^tidigare[\s\_\-]*pris|^ordinarie[\s\_\-]*pris|^ord\.[\s\_\-]*pris|^oude[\s\_\-]*prijs|^poprzednia[\s\_\-]*cena|^star[a|á][\s\_\-]*cena|^cena[\s\_\-]*star[a|á]|^régi[\s\_\-]*ár|^cena[\s\_\-]*před[\s\_\-]*slevou/;
        this.base_PriceAliases = /grundpreis|base\_*price|^ppu$|price[\s\_\-]*per[\s\_\-]*unit|^prix[\s\_\-]*à[\s\_\-]*l'unité|^prezzo[\s\_\-]*al[\s\_\-]*pezzo|^prezzo[\s\_\-]*per[\s\_\-]*unità|^prezzo[\s\_\-]*base|^precio[\s\_\-]*por[\s\_\-]*unidad|^yksikköhinta|^enhetspris|^prijs[\s\_\-]*per[\s\_\-]*eenheid|^cena[\s\_\-]*jednostkowa|^cena[\s\_\-]*za[\s\_\-]*kus|^egységár|^cena[\s\_\-]*jednotky/;
        this.genderAliases = /geschlecht|gender|^sex|^item\-*geschlecht|suitable_for$|^gene?re$|^sexe$|^g[é|ê]nero|^sukupuoli|^kön$|^geslacht|^płeć&|^rodzaj$|^pohlavie$|^nem$|^pohlaví/;
        this.brandAliases = /marke|^brand$|manufacturer|^brand[\s\_\-]*name|^product[\s\_\-]*brand|^hersteller|^supplier|^producer|^marque|^fabricant|^nom[\s\_\-]*de[\s\_\-]*la[\s\_\-]*marque|^m[á]r[c|k]a|^marchio|^nome[\s\_\-]*marca|^marca|^fabricante|^tuotemerkki|^märke$|^this.märke|^merk$|^značka/;
        this.sizeAliases = /^größen?|^sizes?|^ma\ße|^item[\s\_\-]*groessen?|^groe?ssen?|^abmessunge?n?|clothing[\s\_\-\:]*size|fashion[\s\_\-\:]*size|^dimensione?s?$|availablesizes?|^tailles?$|^taglia|^misura|^talla|^tamaño|^tamanhos|^koko$|^koot$|^storlek|^maat$|^rozmiar|^veľkosť|^méret|^velikosti/;
        this.colorAliases = /^farbe|^colou?re?$|^item[\s\_\-]*farbe|product[\s\_\-]*colou?r|^couleur|^cor$|^väri$|^färg$|^kleur$|^kolor|^farba|^szín|^barva/;
        this.cpcAliases = /^cpc$|^de?s?k?t?o?p?[\s\_\-]*cpc$|cpc[\s\_\-]*de?s?k?t?o?p?|^dc$|cpc[\s\_\-]*bidding[\s\_\-]*desktop|cpc[\s\_\-]*bidding$/;
        this.materialAliases = /^materiaa?le?|fashion[\s\_\-\:]*material|clothing[\s\_\-\:]*material|product[\s\_\-]*material|^matériaux|^matériel|^matière|^materiaali|^materi[á][l|ł]|^anyag/;
        this.shippingcostAliases = /versandk[o|s][s|o]ten|^shipping$|shipping[\s\_\-]*costs?|^shipping[\s\_\-]*price|^shipping[\s\_\-]*delay|^de?li?ve?r?y?[\s\_\-]*costs?|^product[\s\_\-]*shippingcost|versand[\s\_\-]*konditionen|^item\-*versandkosten|^versand$|transport[\s\_\-]*cost|standar[d|t][\s\_\-]*versand|^conditions[\s\_\-]*de[\s\_\-]*livraison|^frais[\s\_\-]*de[\s\_\-]*port|^costi[\s\_\-]*di[\s\_\-]*spedizione|^spese[\s\_\-]*di[\s\_\-]*spedizione|^spese[\s\_\-]*di[\s\_\-]*consegna|^costi[\s\_\-]*di[\s\_\-]*consegna|^gastos[\s\_\-]*de[\s\_\-]*envío|^costos[\s\_\-]*de[\s\_\-]*envío|^custo[\s\_\-]*de[\s\_\-]*entrega|^custos[\s\_\-]*de[\s\_\-]*envio|^toimituskulut|^leveranskostnader|^leverans$|^fraktkostnader|^verzend[\s\_\-]*kosten|^koszty[\s\_\-]*wysyłki|^cena[\s\_\-]*poštovného|^szállítási[\s\_\-]*költség/;
        this.deliverytimeAliases = /de?li?ve?r?y?[\s\_\-]*time|liefer[\s\_\-]*zeit|^product\-*deliverytime|^item\-*lieferzeit|de?li?ve?r?y?[\s\_\-]*date|de?li?ve?r?y?[\s\_\-]*period|shipping[\s\_\-]*time|^délais?[\s\_\-]*de[\s\_\-]*livraison|^disponibilité$|^temp[i|o][\s\_\-]*di[\s\_\-]*spedizione|^tempi[\s\_\-]*di[\s\_\-]*consegna|^tiempo[\s\_\-]*de[\s\_\-]*envío|^tiempo[\s\_\-]*de[\s\_\-]*entrega|^prazo[\s\_\-]*de[\s\_\-]*entrega|^toimitusaika|^leveranstid|^levertijd|^czas[\s\_\-]*wysyłki|^czas[\s\_\-]*realizacji|^czas[\s\_\-]*dostawy|^čas[\s\_\-]*dodania|^szállítási[\s\_\-]*idő|^doba[\s\_\-]*lhůta|^availability$|^verfügbarkeit$/;
        this.auxImageAliases = /aux[\s\_\-]*bild|aux[\s\_\-]*ima?ge?|aux[\s\_\-]*url|^product\-*fields\-*imageurl\_*1|bild[\s\_\-]*url[\s\_\-]*2|^picture[\s\_\-]*url[\s\_\-]*2|^ima?ge?[\s\_\-]*url[\s\_\-]*2|^item\-*auxbild\_*2|additional[\s\_\-]*ima?ge?[\s\_\-]*link|^img[\s\_\-]*url[\s\_\-]*[1-2]|alternati?v?e[\s\_\-]*ima?ge?|ima?ge?[\s\_\-]*2|product[\s\_\-]*image[\s\_\-]*url[\s\_\-]*2|^aux[\s\_\-]*picture[\s\_\-]*url|^image[\s\_\-]*auxilliaire|^aux[\s\_\-]*immagine|^immagini[\s\_\-]*supplementari|^imagen[\s\_\-]*auxiliar|^aux[\s\_\-]*kuvat?|^lisäkuvat?|^dodatkowy[\s\_\-]*link[\s\_\-]*do[\s\_\-]*zdjęć|^ďalší[\s\_\-]*obrázok[\s\_\-]*linka|^obrázok[\s\_\-]*url[\s\_\-]*2|^aux[\s\_\-]*kép[\s\_\-]*url/;
        this.eekAliases = /^eek$|^eec$|energie[\s\_\-]*effizienz[\s\_\-]*klasse|energy[\s\_\-]*effici?ency[\s\_\-]*class|energ[i|y]e?[\s\_\-]*label|energy[\s\_\-]*class|^label[\s\_\-]*énergie|^étiquette[\s\_\-]*énergie|^etichetta[\s\_\-]*energetica|^consumo[\s\_\-]*energetico|^etiqueta[\s\_\-]*energética|^energiamerkintä|^energimärkning|^etykieta[\s\_\-]*energetyczna|^energicky[\s\_\-]*efektívna[\s\_\-]*trieda|^energetická[\s\_\-]*trieda|^energia[\s\_\-]*címke|^energia[\s\_\-]*osztály|^energetický[\s\_\-]*štítek/;
        this.mcpcAliases = /mo?b?i?l?e?[\s\_\-]*cpc$|cpc[\s\_\-]*mo?b?i?l?e?|^dc$|^cpc[\s\_\-]*bidding[\s\_\-]*mobile/;
        this.gtinAliases = /^gtin$|^ean$/;
        // Structure all for ForLoops
        this.allAliases = [this.skuAliases, this.productnameAliases, this.priceAliases, this.descriptionAliases, this.imageURLAliases, this.deepURLAliases, this.top_CategoryAliases, this.categoryAliases, this.category_2Aliases, this.old_PriceAliases, this.base_PriceAliases, this.genderAliases, this.brandAliases, this.sizeAliases, this.colorAliases, this.cpcAliases, this.materialAliases, this.shippingcostAliases, this.deliverytimeAliases, this.auxImageAliases, this.eekAliases, this.mcpcAliases, this.gtinAliases];
        this.arrFalse = new Array(23).fill(false);
        this.table = document.getElementById('FeedTable');
        // global config
        this.maxSamples = maxSamples;

        this.Init();
    }
    Init() {
        this.removeXMLhabbits(this.table, this.maxtableColumns);
        this.tableHeadertoLowerCase(this.table, this.maxtableColumns);
        for (var i = 0; i < this.allAliases.length; i++) {
            this.validateTable(allNames[i], this.allAliases[i], this.table, this.tableLines);
        }
        this.preSelectionTemplateCol2False(this.arrFalse);
        this.validationTableWindow(this.tableLines, this.arrFalse);
        this.removeAndReplaceAmperSigns();
    }
    tableHeadertoLowerCase(table, maxtableColumns) {
        for (let i = 0; i < maxtableColumns; i++) {
            let x = table.rows[0].cells[i].innerHTML;
            x = x.toLowerCase();
            //console.log(x);
            table.rows[0].cells[i].innerHTML = x;
        }

    }
    removeXMLhabbits(table, maxtableColumns) {
        let regExStringReplacement = /item-g*:*|offer-g*:*|[Cc][Ff]\_|g:/gms;

        for (let i = 0; i < maxtableColumns; i++) {
            let x = table.rows[0].cells[i].innerHTML;
            x = x.replace(regExStringReplacement, "");
            //console.log(x);
            table.rows[0].cells[i].innerHTML = x;
        }
    }
    roundToTwo(calc100) {
        return +(Math.round(calc100 + "e+2") + "e-2");
    }
    preSelectionTemplateCol1True(Col1) {
        /*
        *
        *- (x) erste Spalte wenn "pattern" gefunden wird + flawless bei encoding&feed structure
        - wenn mind.pattern machted dann checked + record "yes" 
        -> wenn mind. 1 wert fehlt -> partially
        -> wenn komplett voll ist -> yes
        -> wenn komplett leer ist -> no
        -> wenn spalte nicht gefunden wird, dann record existing -> NO			
        */
        $('input[id="encodingfeedbuilder"]').prop('checked', true);
        $("input[class=encoding][value='flawless']").prop("checked", true);
        $('input[id="feedstructurebuilder"]').prop('checked', true);
        $("input[class=feedstructure][value='flawless']").prop("checked", true);
        if (Col1 == allNames[0]) {
            $('input[id="articlenumberbuilder"]').prop('checked', true);
            $("input[class=articlenumber][value='yes']").prop("checked", true);
            this.arrFalse[0] = true;
        }
        if (Col1 == allNames[1]) {
            $('input[id="productnamebuilder"]').prop('checked', true);
            $("input[class=productname][value='yes']").prop("checked", true);
            this.arrFalse[1] = true;
        }
        if (Col1 == allNames[2]) {
            $('input[id="pricebuilder"]').prop('checked', true);
            $("input[class=price][value='yes']").prop("checked", true);
            this.arrFalse[2] = true;
        }
        if (Col1 == allNames[3]) {
            $('input[id="descriptionbuilder"]').prop('checked', true);
            $("input[class=description][value='yes']").prop("checked", true);
            this.arrFalse[3] = true;
        }
        if (Col1 == allNames[4]) {
            $('input[id="ImageURLbuilder"]').prop('checked', true);
            $("input[class=ImageURL][value='yes']").prop("checked", true);
            this.arrFalse[4] = true;
        }
        if (Col1 == allNames[5]) {
            $('input[id="DeepURLbuilder"]').prop('checked', true);
            $("input[class=DeepURL][value='yes']").prop("checked", true);
            this.arrFalse[5] = true;
        }
        if (Col1 == allNames[6]) {
            $('input[id="maincategorybuilder"]').prop('checked', true);
            $("input[class=maincategory][value='yes']").prop("checked", true);
            this.arrFalse[6] = true;
        }
        if (Col1 == allNames[7]) {
            $('input[id="subcategorybuilder"]').prop('checked', true);
            $("input[class=subcategory][value='yes']").prop("checked", true);
            this.arrFalse[7] = true;
        }
        if (Col1 == allNames[8]) {
            $('input[id="2ndsubcategorybuilder"]').prop('checked', true);
            $("input[class=2ndsubcategory][value='yes']").prop("checked", true);
            this.arrFalse[8] = true;
        }
        if (Col1 == allNames[9]) {
            $('input[id="oldpricebuilder"]').prop('checked', true);
            $("input[class=oldprice][value='yes']").prop("checked", true);
            this.arrFalse[9] = true;
        }
        if (Col1 == allNames[10]) {
            $('input[id="pricePerUnitbuilder"]').prop('checked', true);
            $("input[class=pricePerUnit][value='yes']").prop("checked", true);
            this.arrFalse[10] = true;
        }
        if (Col1 == allNames[11]) {
            $('input[id="genderbuilder"]').prop('checked', true);
            $("input[class=gender][value='yes']").prop("checked", true);
            this.arrFalse[11] = true;
        }
        if (Col1 == allNames[12]) {
            $('input[id="brandbuilder"]').prop('checked', true);
            $("input[class=brand][value='yes']").prop("checked", true);
            this.arrFalse[12] = true;
        }
        if (Col1 == allNames[13]) {
            $('input[id="sizebuilder"]').prop('checked', true);
            $("input[class=size][value='yes']").prop("checked", true);
            this.arrFalse[13] = true;
        }
        if (Col1 == allNames[14]) {
            $('input[id="colorbuilder"]').prop('checked', true);
            $("input[class=color][value='yes']").prop("checked", true);
            this.arrFalse[14] = true;
        }
        if (Col1 == allNames[15]) {
            // CPC Suggestions doesn't exist
            this.arrFalse[15] = true;
        }
        if (Col1 == allNames[16]) {
            $('input[id="materialbuilder"]').prop('checked', true);
            $("input[class=material][value='yes']").prop("checked", true);
            this.arrFalse[16] = true;
        }
        if (Col1 == allNames[17]) {
            $('input[id="shippingcostsbuilder"]').prop('checked', true);
            $("input[class=shippingcosts][value='yes']").prop("checked", true);
            this.arrFalse[17] = true;
        }
        if (Col1 == allNames[18]) {
            $('input[id="shippingtimebuilder"]').prop('checked', true);
            $("input[class=shippingtime][value='yes']").prop("checked", true);
            this.arrFalse[18] = true;
        }
        if (Col1 == allNames[19]) {
            $('input[id="AuxImageURLbuilder"]').prop('checked', true);
            $("input[class=AuxImageURL][value='yes']").prop("checked", true);
            this.arrFalse[19] = true;
        }
        if (Col1 == allNames[20]) {
            $('input[id="energylabelbuilder"]').prop('checked', true);
            $("input[class=energylabel][value='yes']").prop("checked", true);
            this.arrFalse[20] = true;
        }
        if (Col1 == allNames[21]) {
            // mCPC Suggestions doesn't exist
            this.arrFalse[21] = true;
        }
        if (Col1 == allNames[22]) {
            $('input[id="GTINbuilder"]').prop('checked', true);
            $("input[class=GTIN][value='yes']").prop("checked", true);
            this.arrFalse[22] = true;
        }

    }
    preSelectionTemplateCol2False(arrFalse) {
        if (arrFalse[0] == false) {
            $('input[id="articlenumberbuilder"]').prop('checked', true);
            $("input[class=articlenumber][value='no']").prop("checked", true);
        }
        if (arrFalse[1] == false) {
            $('input[id="productnamebuilder"]').prop('checked', true);
            $("input[class=productname][value='no']").prop("checked", true);
        }
        if (arrFalse[2] == false) {
            $('input[id="pricebuilder"]').prop('checked', true);
            $("input[class=price][value='no']").prop("checked", true);
        }
        if (arrFalse[3] == false) {
            $('input[id="descriptionbuilder"]').prop('checked', true);
            $("input[class=description][value='no']").prop("checked", true);
        }
        if (arrFalse[4] == false) {
            $('input[id="ImageURLbuilder"]').prop('checked', true);
            $("input[class=ImageURL][value='no']").prop("checked", true);

        }
        if (arrFalse[5] == false) {
            $('input[id="DeepURLbuilder"]').prop('checked', true);
            $("input[class=DeepURL][value='no']").prop("checked", true);

        }
        if (arrFalse[6] == false) {
            $('input[id="maincategorybuilder"]').prop('checked', true);
            $("input[class=maincategory][value='no']").prop("checked", true);

        }
        if (arrFalse[7] == false) {
            $('input[id="subcategorybuilder"]').prop('checked', true);
            $("input[class=subcategory][value='no']").prop("checked", true);

        }
        if (arrFalse[8] == false) {
            $('input[id="2ndsubcategorybuilder"]').prop('checked', true);
            $("input[class=2ndsubcategory][value='no']").prop("checked", true);

        }
        if (arrFalse[9] == false) {
            $('input[id="oldpricebuilder"]').prop('checked', true);
            $("input[class=oldprice][value='no']").prop("checked", true);

        }
        if (arrFalse[10] == false) {
            $('input[id="pricePerUnitbuilder"]').prop('checked', true);
            $("input[class=pricePerUnit][value='no']").prop("checked", true);

        }
        if (arrFalse[11] == false) {
            $('input[id="genderbuilder"]').prop('checked', true);
            $("input[class=gender][value='no']").prop("checked", true);

        }
        if (arrFalse[12] == false) {
            $('input[id="brandbuilder"]').prop('checked', true);
            $("input[class=brand][value='no']").prop("checked", true);

        }
        if (arrFalse[13] == false) {
            $('input[id="sizebuilder"]').prop('checked', true);
            $("input[class=size][value='no']").prop("checked", true);

        }
        if (arrFalse[14] == false) {
            $('input[id="colorbuilder"]').prop('checked', true);
            $("input[class=color][value='no']").prop("checked", true);

        }
        if (arrFalse[15] == false) {
            // CPC Suggestions doesn't exist
            //arrFalse[15] == false
        }
        if (arrFalse[16] == false) {
            $('input[id="materialbuilder"]').prop('checked', true);
            $("input[class=material][value='no']").prop("checked", true);
        }
        if (arrFalse[17] == false) {
            $('input[id="shippingcostsbuilder"]').prop('checked', true);
            $("input[class=shippingcosts][value='no']").prop("checked", true);
        }
        if (arrFalse[18] == false) {
            $('input[id="shippingtimebuilder"]').prop('checked', true);
            $("input[class=shippingtime][value='no']").prop("checked", true);
        }
        if (arrFalse[19] == false) {
            $('input[id="AuxImageURLbuilder"]').prop('checked', true);
            $("input[class=AuxImageURL][value='no']").prop("checked", true);
        }
        if (arrFalse[20] == false) {
            $('input[id="energylabelbuilder"]').prop('checked', true);
            $("input[class=energylabel][value='no']").prop("checked", true);
        }
        if (arrFalse[21] == false) {
            //mCPC
        }
        if (arrFalse[22] == false) {
            $('input[id="GTINbuilder"]').prop('checked', true);
            $("input[class=GTIN][value='no']").prop("checked", true);
        }
    }
    preSelectionTemplateCol3Partially(x, y, z) {
        if (x == allNames[0] && y == true && z < 100) {
            $("#selectArticlenumber").val("partially");
            //console.log("select partially for SKU!!!");
        }
        if (x == allNames[1] && y == true && z < 100) {
            $("#selectProductname").val("partially");
        }
        if (x == allNames[2] && y == true && z < 100) {
            $("#selectPrice").val("partially");
        }
        if (x == allNames[3] && y == true && z < 97) {
            $("#selectDescription").val("partially");
        }
        if (x == allNames[4] && y == true && z < 100) {
            $("#selectImageURL").val("partially");

        }
        if (x == allNames[5] && y == true && z < 100) {
            $("#selectDeepURL").val("partially");

        }
        if (x == allNames[6] && y == true && z < 99) {
            $("#selectMaincategory").val("partially");

        }
        if (x == allNames[7] && y == true && z < 97) {
            $("#selectSubcategory").val("partially");

        }
        if (x == allNames[8] && y == true && z < 80) {
            $("#select2ndsubcategory").val("partially");

        }
        if (x == allNames[10] && y == true && z < 10) {
            $("#selectPricePerUnit").val("partially");

        }
        if (x == allNames[11] && y == true && z < 80) {
            $("#selectGender").val("partially");

        }
        if (x == allNames[12] && y == true && z < 97) {
            $("#selectBrand").val("partially");

        }
        if (x == allNames[13] && y == true && z < 80) {
            $("#selectSize").val("partially");

        }
        if (x == allNames[14] && y == true && z < 80) {
            $("#selectColor").val("partially");

        }
        if (x == allNames[15] && y == true && z > 0) {
            // CPC Suggestions doesn't exist
            //arrFalse[15] = false;
        }
        if (x == allNames[16] && y == true && z < 80) {
            $("#selectMaterial").val("partially");
        }
        if (x == allNames[17] && y == true && z < 100) {
            $("#selectShippingcosts").val("partially");
        }
        if (x == allNames[18] && y == true && z < 100) {
            $("#selectShippingtime").val("partially");
        }
        if (x == allNames[22] && y == true && z < 90) {
            $("#selectGTIN").val("partially");
        }
        if (x == allNames[19] && y == true && z < 75) {
            $("#selectAuxImageURL").val("partially");
        }
        if (x == allNames[20] && y == true && z < 10) {
            $("#selectEnergylabel").val("partially");
        }

    }
    preSelectionTemplateCol3No(x, y, z) {

        if (x == allNames[0] && y == true && z == 0) {
            $("#selectArticlenumber").val("no");
            //console.log("select no for SKU!!!");
        }
        if (x == allNames[1] && y == true && z == 0) {
            $("#selectProductname").val("no");
        }
        if (x == allNames[2] && y == true && z == 0) {
            $("#selectPrice").val("no");
        }
        if (x == allNames[3] && y == true && z == 0) {
            $("#selectDescription").val("no");
        }
        if (x == allNames[4] && y == true && z == 0) {
            $("#selectImageURL").val("no");

        }
        if (x == allNames[5] && y == true && z == 0) {
            $("#selectDeepURL").val("no");

        }
        if (x == allNames[6] && y == true && z == 0) {
            $("#selectMaincategory").val("no");

        }
        if (x == allNames[7] && y == true && z == 0) {
            $("#selectSubcategory").val("no");

        }
        if (x == allNames[8] && y == true && z == 0) {
            $("#select2ndsubcategory").val("no");

        }
        if (x == allNames[9] && y == true && z == 0) {
            $("#selectOldprice").val("no");

        }
        if (x == allNames[10] && y == true && z == 0) {
            $("#selectPricePerUnit").val("no");

        }
        if (x == allNames[11] && y == true && z == 0) {
            $("#selectGender").val("no");

        }
        if (x == allNames[12] && y == true && z == 0) {
            $("#selectBrand").val("no");

        }
        if (x == allNames[13] && y == true && z == 0) {
            $("#selectSize").val("no");

        }
        if (x == allNames[14] && y == true && z == 0) {
            $("#selectColor").val("no");

        }
        if (x == allNames[15] && y == true && z == 0) {
            // CPC Suggestions doesn't exist
            //arrFalse[15] = false;
        }
        if (x == allNames[16] && y == true && z == 0) {
            $("#selectMaterial").val("no");
        }
        if (x == allNames[17] && y == true && z == 0) {
            $("#selectShippingcosts").val("no");
        }
        if (x == allNames[18] && y == true && z == 0) {
            $("#selectShippingtime").val("no");
        }
        if (x == allNames[22] && y == true && z == 0) {
            $("#selectGTIN").val("no");
        }
        if (x == allNames[19] && y == true && z == 0) {
            $("#selectAuxImageURL").val("no");
        }
        if (x == allNames[20] && y == true && z == 0) {
            $("#selectEnergylabel").val("no");
        }
    }
    preSelectionTemplateAgeGroup(x, y) {

        if (x == allNames[11] && y != false) {
            //console.log("gender was found");
            var agegroup = /age\s*\_*group/;
            var table = document.getElementById("FeedTable");

            // look for attribute age group in all headers
            var HeaderAmount = table.rows[0].cells.length;
            for (var i = 0; i < HeaderAmount; i++) {
                var tester = table.rows[0].cells[i].innerHTML;
                if (agegroup.test(tester) == true) {
                    //console.log("found agegroup in Column [i] !!!")

                    //look in all Cells if you find at least one value in AgeGroup
                    var RowAmount = table.rows.length;
                    RowAmount = RowAmount - 1;

                    for (var j = 1; j < RowAmount; j++) {
                        var checkCellValue = table.rows[j].cells.item(i);

                        if (checkCellValue != null) {
                            var checkCellValue = table.rows[j].cells.item(i).innerHTML;
                            checkCellValue = checkCellValue.trim();


                            if (checkCellValue.length < 1) {
                                //console.log("found not a value");
                            } else {
                                //console.log("found a value");
                                //console.log(table.rows[j].cells.item(i).innerHTML);
                                $("#selectGender").val("age group");
                                break
                            }

                        } else {
                            //console.log("found not a value");
                        }
                    }
                }
            }
        }
    }
    preSelectionMultipleInfo(x, y, z, el, table, tableLines) {
        //allNames[2] = price ; allNames[9] = oldprice ; allNames[14] = color ; allNames[16] = material


        if (x == allNames[10] && y != false && el > 1) {
            //console.log("baseprice was found and not empty");

            var table = document.getElementById("FeedTable");
            var RowAmount = table.rows.length;

            for (var j = 1; j < RowAmount; j++) {
                var checkCellValue = table.rows[j].cells.item(z);

                if (checkCellValue != null) {
                    var checkCellValue = table.rows[j].cells.item(z).innerHTML;
                    checkCellValue = checkCellValue.trim();
                    if (checkCellValue.length < 1) {
                        //console.log("found not a value");
                    } else {
                        var countParameter = (checkCellValue.match(/\s*\€|[Ee][Uu][Rr]|�\s*/g) || []).length;
                        //console.log(checkCellValue);
                        //console.log(countParameter);
                        if (countParameter < 1) {
                            //console.log(checkCellValue);
                            $("#selectPricePerUnit").val("currency missing");
                            break
                        }

                    }
                } else {
                    //console.log("skip this unreadable cell");
                }
            }

        }


        if (x == allNames[16] && y != false && el > 1) {
            //console.log("material was found");
            var table = document.getElementById("FeedTable");
            var RowAmount = table.rows.length;

            for (var j = 1; j < RowAmount; j++) {
                var checkCellValue = table.rows[j].cells.item(z);
                if (checkCellValue != null) {
                    var checkCellValue = table.rows[j].cells.item(z).innerHTML;
                    checkCellValue = checkCellValue.trim();
                    checkCellValue = checkCellValue.length;
                    //console.log(checkCellValue);
                    if (checkCellValue > 125) {
                        $("#selectMaterial").val("too precise");
                        break
                    }
                } else {
                    //console.log("skip this unreadable cell");
                }

            }
        }

        if (x == allNames[17] && y != false && el > 1) {
            //console.log("shippingcost was found");
            var table = document.getElementById("FeedTable");
            var RowAmount = table.rows.length;

            for (var j = 1; j < RowAmount; j++) {
                var checkCellValue = table.rows[j].cells.item(z);
                if (checkCellValue != null) {
                    var checkCellValue = table.rows[j].cells.item(z).innerHTML;
                    checkCellValue = checkCellValue.trim();
                    checkCellValue = checkCellValue.length;
                    //console.log(checkCellValue);
                    if (checkCellValue > 22) {
                        $("#selectShippingcosts").val("text only");
                        break
                    }
                } else {
                    //console.log("skip this unreadable cell");
                }

            }
        }

        if (x == allNames[18] && y != false && el > 1) {
            //console.log("shippingtime was found");
            var table = document.getElementById("FeedTable");
            var RowAmount = table.rows.length;
            var tempCounter = 0;


            for (var j = 1; j < RowAmount; j++) {
                var checkCellValue = table.rows[j].cells.item(z);
                if (checkCellValue != null) {
                    var checkCellValue = table.rows[j].cells.item(z).innerHTML;
                    checkCellValue = checkCellValue.trim();
                    checkCellValue = checkCellValue.length;
                    //console.log(checkCellValue);
                    if (checkCellValue > 20) {
                        tempCounter++;
                        var percentTemp = Math.floor((tempCounter / RowAmount) * 100);
                        console.log(percentTemp);
                        //check if pecentTemp größer als 10
                        if (percentTemp > 10) {
                            console.log("10% überschritten! Select shipping time text only");
                            $("#selectShippingtime").val("text only");
                            break
                        }

                    }
                } else {
                    //console.log("skip this unreadable cell");
                }

            }
        }
    }
    mappingArray(x, i) {
        for (var q = 0; q <= allNames.length; q++) {
            if (x == allNames[q]) {
                MappingArray[q] = i;
            }
        }
        //x.map(x => x * 2);
    }
    mappingEmptyArray(x, i, countingEmptyCells, tableLines) {
        if (countingEmptyCells == 0) {
            for (var q = 0; q <= allNames.length; q++) {
                if (x == allNames[q]) {
                    emptyCellsArray[q] = parseInt(tableLines);
                }
            }
        } else {
            for (var q = 0; q <= allNames.length; q++) {
                if (x == allNames[q]) {
                    countingEmptyCells += 1;
                    emptyCellsArray[q] = tableLines - countingEmptyCells;
                }
            }
        }
    }
    mappingPercentArray(x, i, calc100) {

        for (var q = 0; q <= allNames.length; q++) {
            if (x == allNames[q]) {

                if (calc100 == undefined) {
                    percentArray[q] = "100 %";
                } else {
                    percentArray[q] = calc100 + " %";
                }
            }
        }

    }
    mappingDuplicateArray(x, i, amountDuplicates) {
        for (var q = 0; q <= allNames.length; q++) {
            if (x == allNames[q]) {
                if (amountDuplicates == undefined) {
                    duplicatesArray[q] = " ";
                } else {
                    duplicatesArray[q] = amountDuplicates;
                }
            }
        }
    }
    mappingDuplicatePercentArray(x, i, percent) {
        for (var q = 0; q <= allNames.length; q++) {
            if (x == allNames[q]) {
                if (duplicatesPercentArray == undefined) {
                    duplicatesPercentArray[q] = "-";
                } else {
                    duplicatesPercentArray[q] = percent;
                }
            }
        }
    }
    mappingDuplicateImageSamplesArray(x, i, value) {
        for (var q = 0; q <= allNames.length; q++) {
            if (x == allNames[q]) {
                if (value == undefined) {
                    DuplicateImageSamplesArray.push(" ");
                } else {
                    DuplicateImageSamplesArray.push(value);
                }
            }
        }
    }
    mappingDuplicateDeepLinkSamplesArray(x, i, value) {
        for (var q = 0; q <= allNames.length; q++) {
            if (x == allNames[q]) {
                if (value == undefined) {
                    DuplicateDeepLinkSamplesArray.push(" ");
                } else {
                    DuplicateDeepLinkSamplesArray.push(value);
                }
            }
        }
    }
    validateTable(x, y, table, tableLines) { // x = name | y = regEx | i = 
        /*
        if(validateNew == true){
        		document.getElementById("validateContent").innerHTML += "<strong>mapping Check for " + x + " </strong><br>";
        }else{
        		document.getElementById("validateContent").innerHTML += "<strong>Check for " + x + " </strong><br>";
        }
        */
        let countingEmptyCells = 0;



        //console.log("Starting Point RegEx for Name: " + x);
        for (var i = 0; i < this.maxtableColumns; i++) {
            var tableCellValue = document.getElementById('FeedTable').rows[0].cells[i].innerHTML;


            tableCellValue = tableCellValue.replace(/\uFEFF/g, "");
            //console.log(document.getElementById('FeedTable').rows[0].cells[i]);
            //console.log(y.test(tableCellValue));
            if (y.test(tableCellValue) || validateNew == true) {
                /*
                if(validateNew == true){
                document.getElementById("validateContent").innerHTML += "take " + x + " ";
                }else{
                document.getElementById("validateContent").innerHTML += "found " + x + " ";
                }
                */

                if (validateNew == true) {

                    for (var z = 0; z < allNames.length; z++) {
                        if (x == allNames[z]) {
                            i = NewMappingArray[z];
                        }
                    }
                    if (i != "nothing") {
                        //document.getElementById("validateContent").innerHTML += "from HeaderColumn " + i + "<br>";
                    } else {
                        //document.getElementById("validateContent").innerHTML += "for no validation <br>";
                        break
                    }
                } else {
                    //document.getElementById("validateContent").innerHTML += "in HeaderColumn " + i + "<br>";	
                }

                this.preSelectionTemplateCol1True(x);


                this.mappingArray(x, i);
                //console.log(MappingArray);

                /*============================================================================================================================
                =======================================CHECK DUPLUICATES=====================================================================		==============================================================================================================================*/
                if (x == allNames[0] || x == allNames[4] || x == allNames[5]) { // 0 = SKU ; 4 = Image ; 5 = DeepUrl

                    var checkCellValue = document.getElementById('FeedTable').rows[0].cells[i];
                    if (checkCellValue != null) {

                        var textCell = document.getElementById('FeedTable').rows[0].cells[i].innerHTML;

                    } else {
                        //do nothing
                    }




                    var tableCellArray = [];

                    for (var j = 1; j < tableLines; j++) {
                        var checkCellValue = document.getElementById('FeedTable').rows[j].cells[i];
                        if (checkCellValue != null) {
                            var textCell = document.getElementById('FeedTable').rows[j].cells[i].innerHTML;
                            textCell = textCell.trim();
                        }

                        if (textCell.length != 0 && checkCellValue != null) {
                            tableCellArray.push(textCell);
                        }
                    }

                    //document.getElementById("validateContent").innerHTML += "Array is " + tableCellArray + " <br> ";
                    var sorted_arr = tableCellArray.slice().sort();

                    var results = [];
                    for (var l = 0; l < sorted_arr.length - 1; l++) {
                        if (sorted_arr[l + 1] == sorted_arr[l]) {
                            results.push(sorted_arr[l]);
                        }
                    }
                    var amountDuplicates = results.length;
                    if (amountDuplicates > 0) {
                        var percent = ' ' + Math.floor((amountDuplicates / (tableLines - 1)) * 100) + ' %';

                        /*
                        document.getElementById("validateContent").innerHTML += "found <strong class='red'> " + amountDuplicates + percent + " " + x + " Duplicates </strong><br> ";
                        
                        */
                    } else {
                        /*
                        document.getElementById("validateContent").innerHTML += "found <strong class='green'> " + amountDuplicates + " " + x + " Duplicates </strong><br> ";
                        
                        */
                    }

                    this.mappingDuplicateArray(x, i, amountDuplicates);
                    this.mappingDuplicatePercentArray(x, i, percent);;

                    if (amountDuplicates > 0) {
                        // removed
                    }


                }

                if (x == allNames[4]) {


                    var checkCellValue = document.getElementById('FeedTable').rows[0].cells[i];
                    if (checkCellValue != null) {

                        var ImageURLCell = document.getElementById('FeedTable').rows[0].cells[i].innerHTML;

                    } else {
                        //do nothing
                    }

                    var tableImageCellArray = [];
                    // removed
                }
                if (x == allNames[5]) {
                    // removed
                }
                for (var j = 0; j < tableLines; j++) {
                    var checkCellValue = table.rows[j].cells.item(i);

                    if (checkCellValue != null) {
                        var checkCellValue = table.rows[j].cells.item(i).innerHTML.length;

                        if (checkCellValue < 1) {
                            countingEmptyCells++;
                        } else {
                            //do nothing
                        }

                    } else {
                        countingEmptyCells++;
                    }

                }


                this.mappingEmptyArray(x, i, countingEmptyCells, this.tableLines);


                if (countingEmptyCells > 0) {


                    var percent = '  ' + Math.floor((countingEmptyCells / (tableLines)) * 100) + ' %';

                    var calc100 = Math.abs(100 - ((countingEmptyCells / (tableLines - 1)) * 100));

                    calc100 = this.roundToTwo(calc100);
                    /*
                    document.getElementById("validateContent").innerHTML += "found <strong class='red'>" + countingEmptyCells + " " + percent +"</strong> Amount of Empty Values within the Column <br>";
                    
                    */

                } else {
                    /*
                    document.getElementById("validateContent").innerHTML += "found <strong class='green'>" + countingEmptyCells + "</strong> Amount of Empty Values within the Column <br>";	
                    
                    */
                }

                this.mappingPercentArray(x, i, calc100);




                {
                    break;
                }
            } else {

            }
        }

    }
    validationTableWindow(tableLines, arrFalse) {


        tableLines -= 1;
        var HeaderAmount = document.getElementById("FeedTable").rows[0].cells.length;
        var HeaderCheck = HeaderAmount - 1;
        if (schalter === true) {
            var writelocation = document.getElementById("check2");
        } else {
            var writelocation = document.getElementById("check");
        }


        for (var i = 0; i < HeaderAmount; i++) {
            var HeaderValues = document.getElementById("FeedTable").rows[0].cells[i].innerHTML;
            HeaderArray.push(HeaderValues);
        }
        /*
        var Divwindow = document.createElement("DIV");
        Divwindow.setAttribute("id", "html-content-holder");
        writelocation.appendChild(Divwindow);
        var writelocation = document.getElementById("html-content-holder");
        */

        writelocation.innerHTML = '<h2 id="underlineHeader"><strong style="font-size: 30px;font-family: Raleway;">Feed Analysis </strong></h2>';


        var Divwindow = document.createElement("DIV");
        Divwindow.setAttribute("id", "analyzeOverview");
        writelocation.appendChild(Divwindow);

        var SpanWindow = document.createElement("SPAN");
        SpanWindow.setAttribute("id", "analyzeProducts");
        SpanWindow.innerHTML += 'Products <h1 style="margin: 0;">' + tableLines + '</h1>';
        Divwindow.appendChild(SpanWindow);

        var SpanWindow = document.createElement("SPAN");
        SpanWindow.setAttribute("id", "analyzeProducts");
        SpanWindow.innerHTML += 'Attributes <h1 style="margin: 0;">' + this.maxtableColumns + '</h1>';
        Divwindow.appendChild(SpanWindow);

        var SpanWindow = document.createElement("SPAN");
        SpanWindow.setAttribute("id", "analyzeProducts");

        if (arrFalse[22] == true && emptyCellsArray[22] <= 0) {
            SpanWindow.setAttribute("class", "notFound");
            SpanWindow.innerHTML += 'GTIN <h1 style="margin: 0;">' + "&#8275;" + '</h1>';
        } else if (arrFalse[22] == false || emptyCellsArray[22] <= 0) {
            SpanWindow.setAttribute("class", "noDeal");
            SpanWindow.innerHTML += 'GTIN <h1 style="margin: 0;">' + "&#10008;" + '</h1>';
        } else {
            SpanWindow.innerHTML += 'GTIN <h1 style="margin: 0;">' + "&#10004;" + '</h1>';
        }
        Divwindow.appendChild(SpanWindow);

        Divwindow.innerHTML += '<h1 style="font-size: 20px;color: #999999ff;margin-right: 10px;margin-top: 42px;">&#9474;</h1>';

        var SpanWindow = document.createElement("SPAN");
        SpanWindow.setAttribute("id", "analyzeProducts");

        if (arrFalse[15] == true && emptyCellsArray[15] <= 0) {
            SpanWindow.setAttribute("class", "notFound");
            SpanWindow.innerHTML += 'CPC <h1 style="margin: 0;">' + "&#8275;" + '</h1>';
        } else if (arrFalse[15] == false || emptyCellsArray[15] <= 0) {
            SpanWindow.setAttribute("class", "noDeal");
            SpanWindow.innerHTML += 'CPC <h1 style="margin: 0;">' + "&#10008;" + '</h1>';
        } else {
            SpanWindow.innerHTML += 'CPC <h1 style="margin: 0;">' + "&#10004;" + '</h1>';
        }
        Divwindow.appendChild(SpanWindow);

        var SpanWindow = document.createElement("SPAN");
        SpanWindow.setAttribute("id", "analyzeProducts");

        if (arrFalse[21] == true && emptyCellsArray[21] <= 0) {
            SpanWindow.setAttribute("class", "notFound");
            SpanWindow.innerHTML += 'mCPC <h1 style="margin: 0;">' + "&#8275;" + '</h1>';
        } else if (arrFalse[21] == false || emptyCellsArray[21] <= 0) {
            SpanWindow.setAttribute("class", "noDeal");
            SpanWindow.innerHTML += 'mCPC <h1 style="margin: 0;">' + "&#10008;" + '</h1>';
        } else {
            SpanWindow.innerHTML += 'mCPC <h1 style="margin: 0;">' + "&#10004;" + '</h1>';
        }
        Divwindow.appendChild(SpanWindow);

        /*
        writelocation.innerHTML += "Amount of Attributes: "+ maxtableColumns + "<br>";
        writelocation.innerHTML += "Amount of Lines: "+ tableLines + "<br><br>";
        */


        /**************************************************************************************************************************
        setting up the FIRST analyze table 
        */
        var Divwindow = document.createElement("DIV");
        Divwindow.setAttribute("id", "analyzeMandatory");
        writelocation.appendChild(Divwindow);

        var TableWindow = document.createElement("TABLE");
        TableWindow.setAttribute("id", "TableWindow");


        Divwindow.appendChild(TableWindow);

        /**************************************************************************************************************************
        setting up the Header mandatory 
        */
        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "Header");

        var TableWindowHeaderValue = document.createElement("TH");
        TableWindowHeaderValue.innerHTML += "mandatory feed attributes"
        TableWindowRow.appendChild(TableWindowHeaderValue);
        TableWindowHeaderValue.setAttribute("colspan", "5");
        TableWindowHeaderValue.setAttribute("class", "mandatoryfeedattributes");
        TableWindow.appendChild(TableWindowRow);

        /**************************************************************************************************************************
        setting up the Header important 
        */
        var TableWindowHeaderValue = document.createElement("TH");
        TableWindowHeaderValue.innerHTML += "important feed attributes"
        TableWindowRow.appendChild(TableWindowHeaderValue);
        TableWindowHeaderValue.setAttribute("colspan", "5");
        TableWindowHeaderValue.setAttribute("class", "importantfeedattributes");
        TableWindow.appendChild(TableWindowRow);
        /**************************************************************************************************************************
        setting up the Header Field
        */
        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "Header");

        var myNamingNumbers = [0, 1, 2, 4, 5];

        for (var q = 0; q < myNamingNumbers.length; q++) {
            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            TableWindowHeaderValue.innerHTML += getNamingAttribute([myNamingNumbers[q]]);
            TableWindowHeaderValue.setAttribute("class", "mandatoryfeedattributes");
            TableWindowRow.appendChild(TableWindowHeaderValue);
        }
        var myNamingNumbers = [6, 3, 9, 12, 18];
        for (var q = 0; q < myNamingNumbers.length; q++) {
            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            TableWindowHeaderValue.innerHTML += getNamingAttribute([myNamingNumbers[q]]);
            TableWindowHeaderValue.setAttribute("class", "importantfeedattributes");
            TableWindowRow.appendChild(TableWindowHeaderValue);
        }

        TableWindow.appendChild(TableWindowRow);


        /**************************************************************************************************************************
        setting up the 2nd Row
        */
        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "Value");

        var myNamingNumbers = [0, 1, 2, 4, 5];

        for (var q = 0; q < myNamingNumbers.length; q++) {

            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            if (arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.innerHTML += "&#10008;"
            } else {
                TableWindowHeaderValue.innerHTML += "&#10004;"
            }
            if (arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.setAttribute("class", "missing");
            } else {
                TableWindowHeaderValue.setAttribute("class", "found");
            }

            TableWindowRow.appendChild(TableWindowHeaderValue);
        }

        var myNamingNumbers = [6, 3, 9, 12, 18];

        for (var q = 0; q < myNamingNumbers.length; q++) {

            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            if (arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.innerHTML += "&#10008;"
            } else {
                TableWindowHeaderValue.innerHTML += "&#10004;"
            }
            if (arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.setAttribute("class", "missing");
            } else {
                TableWindowHeaderValue.setAttribute("class", "found");
            }

            TableWindowRow.appendChild(TableWindowHeaderValue);
        }

        TableWindow.appendChild(TableWindowRow);


        /************************************************************************************************************************
        setting up the 3rd Row
        */
        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "Value");

        var myNamingNumbers = [0, 1, 2, 4, 5];

        for (var q = 0; q < myNamingNumbers.length; q++) {
            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            if (HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.innerHTML += "" //allNames[MappingArray[q]]
                TableWindowHeaderValue.setAttribute("class", "missing");
            } else {
                TableWindowHeaderValue.innerHTML += "" + HeaderArray[MappingArray[myNamingNumbers[q]]] + "" //allNames[MappingArray[q]]
            }


            TableWindowRow.appendChild(TableWindowHeaderValue);
        }

        var myNamingNumbers = [6, 3, 9, 12, 18];

        for (var q = 0; q < myNamingNumbers.length; q++) {
            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            if (HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.innerHTML += "" //allNames[MappingArray[q]]
                TableWindowHeaderValue.setAttribute("class", "missing");
            } else {
                TableWindowHeaderValue.innerHTML += "" + HeaderArray[MappingArray[myNamingNumbers[q]]] + "" //allNames[MappingArray[q]]
            }

            TableWindowRow.appendChild(TableWindowHeaderValue);
        }

        TableWindow.appendChild(TableWindowRow);

        /************************************************************************************************************************
        setting up the 4th Row //allNames[MappingArray[q]] -> is the Name of Mapping Attributes // tester is % of
        */
        var checkemptycounter = 0;
        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "Value");

        var myNamingNumbers = [0, 1, 2, 4, 5];

        for (var q = 0; q < myNamingNumbers.length; q++) {
            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            if (emptyCellsArray[myNamingNumbers[q]] == 0) {
                checkemptycounter++;
            }
            if (HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false) {
                checkemptycounter++;
                TableWindowHeaderValue.innerHTML += ""
            } else {
                TableWindowHeaderValue.innerHTML += "<strong>" + percentArray[myNamingNumbers[q]] + " </strong>" + "<br> (" + emptyCellsArray[myNamingNumbers[q]] + "/" + tableLines + ") " //allNames[MappingArray[q]]
            }
            var tester = percentArray[myNamingNumbers[q]];
            if (tester != undefined) {
                tester = tester.replace(' %', '');
            }
            if (HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.setAttribute("class", "missing");
            } else if (tester <= Number(10)) {
                TableWindowHeaderValue.setAttribute("class", "missingwithNumber");
            } else if (tester <= Number(50)) {
                TableWindowHeaderValue.setAttribute("class", "missinghalf");
            } else {
                TableWindowHeaderValue.setAttribute("class", "data");
            }


            TableWindowRow.appendChild(TableWindowHeaderValue);
            this.preSelectionTemplateCol3Partially(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]], tester);
            this.preSelectionTemplateCol3No(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]], emptyCellsArray[myNamingNumbers[q]]);
            this.preSelectionTemplateAgeGroup(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]]);
            //console.log(HeaderArray[MappingArray[q]]);
            //console.log(MappingArray[q]);
            this.preSelectionMultipleInfo(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]], MappingArray[myNamingNumbers[q]], emptyCellsArray[myNamingNumbers[q]], this.table, this.tableLines);
        }

        var myNamingNumbers = [6, 3, 9, 12, 18];

        for (var q = 0; q < myNamingNumbers.length; q++) {
            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            if (emptyCellsArray[myNamingNumbers[q]] == 0) {
                checkemptycounter++;
            }
            if (HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false) {
                checkemptycounter++;
                TableWindowHeaderValue.innerHTML += ""
            } else {
                TableWindowHeaderValue.innerHTML += "<strong>" + percentArray[myNamingNumbers[q]] + " </strong>" + "<br> (" + emptyCellsArray[myNamingNumbers[q]] + "/" + tableLines + ") " //allNames[MappingArray[q]]
            }
            var tester = percentArray[myNamingNumbers[q]];
            if (tester != undefined) {
                tester = tester.replace(' %', '');
            }
            if (HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.setAttribute("class", "missing");
            } else if (tester <= Number(10)) {
                TableWindowHeaderValue.setAttribute("class", "missingwithNumber");
            } else if (tester <= Number(50)) {
                TableWindowHeaderValue.setAttribute("class", "missinghalf");
            } else {
                TableWindowHeaderValue.setAttribute("class", "data");
            }


            TableWindowRow.appendChild(TableWindowHeaderValue);
            this.preSelectionTemplateCol3Partially(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]], tester);
            this.preSelectionTemplateCol3No(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]], emptyCellsArray[myNamingNumbers[q]]);
            this.preSelectionTemplateAgeGroup(allNames[q], arrFalse[q]);
            //console.log(HeaderArray[MappingArray[q]]);
            //console.log(MappingArray[q]);
            this.preSelectionMultipleInfo(allNames[q], arrFalse[q], MappingArray[q], emptyCellsArray[q]);
        }

        TableWindow.appendChild(TableWindowRow);

        /**************************************************************************************************************************
        setting up the SECOND analyze table 
        */
        var Divwindow = document.createElement("DIV");
        Divwindow.setAttribute("id", "analyzeOther");
        writelocation.appendChild(Divwindow);

        var TableWindow = document.createElement("TABLE");
        TableWindow.setAttribute("id", "TableWindow");


        Divwindow.appendChild(TableWindow);

        /**************************************************************************************************************************
        setting up the Header other 
        */
        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "otherHeader");

        var TableWindowHeaderValue = document.createElement("TH");
        TableWindowHeaderValue.innerHTML += "other feed attributes"
        TableWindowRow.appendChild(TableWindowHeaderValue);
        TableWindowHeaderValue.setAttribute("colspan", "10");
        TableWindowHeaderValue.setAttribute("class", "otherfeedattributes");
        TableWindow.appendChild(TableWindowRow);


        /**************************************************************************************************************************
        setting up the Header Field
        */
        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "Header");

        var myNamingNumbers = [7, 8, 14, 16, 13, 19, 17, 11, 10, 20];

        for (var q = 0; q < myNamingNumbers.length; q++) {
            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            TableWindowHeaderValue.innerHTML += getNamingAttribute([myNamingNumbers[q]]);
            TableWindowHeaderValue.setAttribute("class", "otherfeedattributes");
            TableWindowRow.appendChild(TableWindowHeaderValue);
        }

        TableWindow.appendChild(TableWindowRow);


        /**************************************************************************************************************************
        setting up the 2nd Row
        */
        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "Value");



        for (var q = 0; q < myNamingNumbers.length; q++) {

            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            if (arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.innerHTML += "&#10008;"
            } else {
                TableWindowHeaderValue.innerHTML += "&#10004;"
            }
            if (arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.setAttribute("class", "othermissing");
            } else {
                TableWindowHeaderValue.setAttribute("class", "otherfound");
            }

            TableWindowRow.appendChild(TableWindowHeaderValue);
        }


        TableWindow.appendChild(TableWindowRow);


        /************************************************************************************************************************
        setting up the 3rd Row
        */
        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "Value");



        for (var q = 0; q < myNamingNumbers.length; q++) {
            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            if (HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.innerHTML += "" //allNames[MappingArray[q]]
            } else {
                TableWindowHeaderValue.innerHTML += "" + HeaderArray[MappingArray[myNamingNumbers[q]]] + "" //allNames[MappingArray[q]]
            }


            TableWindowRow.appendChild(TableWindowHeaderValue);
        }


        TableWindow.appendChild(TableWindowRow);

        /************************************************************************************************************************
        setting up the 4th Row //allNames[MappingArray[q]] -> is the Name of Mapping Attributes // tester is % of
        */

        var TableWindowRow = document.createElement("TR");
        TableWindowRow.setAttribute("id", "Value");



        for (var q = 0; q < myNamingNumbers.length; q++) {
            //TableWindowRow.innerHTML += "<th>MyHeader</th>"
            var TableWindowHeaderValue = document.createElement("TD");
            if (emptyCellsArray[myNamingNumbers[q]] == 0) {
                checkemptycounter++;
            }
            if (HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false) {
                checkemptycounter++;
                TableWindowHeaderValue.innerHTML += ""
            } else {
                TableWindowHeaderValue.innerHTML += "<strong>" + percentArray[myNamingNumbers[q]] + " </strong>" + "<br> (" + emptyCellsArray[myNamingNumbers[q]] + "/" + tableLines + ") " //allNames[MappingArray[q]]
            }
            var tester = percentArray[myNamingNumbers[q]];
            if (tester != undefined) {
                tester = tester.replace(' %', '');
            }
            if (HeaderArray[MappingArray[myNamingNumbers[q]]] == undefined || arrFalse[myNamingNumbers[q]] == false) {
                TableWindowHeaderValue.setAttribute("class", "missingwithNumber");
            } else if (tester <= Number(10)) {
                TableWindowHeaderValue.setAttribute("class", "missingwithNumber");
            } else {
                TableWindowHeaderValue.setAttribute("class", "data");
            }

            TableWindowRow.appendChild(TableWindowHeaderValue);




            this.preSelectionTemplateCol3Partially(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]], tester);
            this.preSelectionTemplateCol3No(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]], emptyCellsArray[myNamingNumbers[q]]);
            this.preSelectionTemplateAgeGroup(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]]);
            //console.log(HeaderArray[MappingArray[q]]);
            //console.log(MappingArray[q]);
            this.preSelectionMultipleInfo(allNames[myNamingNumbers[q]], arrFalse[myNamingNumbers[q]], MappingArray[myNamingNumbers[q]], emptyCellsArray[myNamingNumbers[q]]);
        }



        /*make partially test for GTIN/EAN
         * 
         */
        var tester = percentArray[22];
        if (tester != undefined) {
            tester = tester.replace(' %', '');
        }
        this.preSelectionTemplateCol3Partially(allNames[22], arrFalse[22], tester);
        this.preSelectionTemplateCol3No(allNames[22], arrFalse[22], emptyCellsArray[22]);


        TableWindow.appendChild(TableWindowRow);



        if (allNames.length - checkemptycounter < 4) {
            INTERRUPTED();
        } else {
            FIXEDINTERRUPTED();
        }



        writelocation.innerHTML += "";

        var Divwindow = document.createElement("DIV");
        Divwindow.setAttribute("id", "analyzeDuplicateOverview");
        writelocation.appendChild(Divwindow);


        /************************************************************************************************************************
        setting up Duplicate Image Analysis / Deeplink & SKU Analysis
        var SpanWindow = document.createElement("SPAN");
        SpanWindow.setAttribute("id", "analyzeProducts");
        SpanWindow.innerHTML += 'Attributes <h1 style="margin: 0;">'+ maxtableColumns + '</h1>';
        Divwindow.appendChild(SpanWindow);
        */
        if (arrFalse[0] != false) {
            var SpanWindow = document.createElement("SPAN");
            SpanWindow.setAttribute("id", "analyzeDuplicateProducts");
            SpanWindow.setAttribute("class", "noDeal");

            //SpanWindow.innerHTML += 'Products <h1 style="margin: 0;">'+ tableLines + '</h1>';



            SpanWindow.innerHTML += "SKU duplicates<br>";
            if (duplicatesArray[0] == 0) {
                SpanWindow.innerHTML += '<h1 style="margin: 0;">0%</h1>';
            } else {
                //SpanWindow.innerHTML += duplicatesArray[0];
            }
            if (duplicatesPercentArray[0] != undefined) {
                SpanWindow.innerHTML += '<h1 style="margin: 0;">' + duplicatesPercentArray[0] + '</h1><br>';
                var tester = duplicatesPercentArray[0].replace(' %', '');
                if (tester > 20) {
                    $("#selectArticlenumber").val("duplicate");
                }
            } else {
                SpanWindow.innerHTML += "<br>";
            }

            Divwindow.appendChild(SpanWindow);
        }

        if (arrFalse[4] != false) {
            var SpanWindow = document.createElement("SPAN");
            SpanWindow.setAttribute("id", "analyzeDuplicateProducts");
            SpanWindow.setAttribute("class", "noDeal");

            SpanWindow.innerHTML += "Image duplicates<br>";
            if (duplicatesArray[4] == 0) {
                SpanWindow.innerHTML += '<h1 style="margin: 0;">0%</h1>';
            } else {
                //writelocation.innerHTML += duplicatesArray[4];
            }

            if (duplicatesPercentArray[4] != undefined) {
                SpanWindow.innerHTML += '<h1 style="margin: 0;">' + duplicatesPercentArray[4] + '</h1><br>';
            } else {
                SpanWindow.innerHTML += "<br>";
            }
            if (DuplicateImageSamplesArray.length > 0) {
                SpanWindow.innerHTML += '<strong><i><span style="font-size:0.8em">sample products: </span></i></strong><br> ';
                for (var i = 0; i < DuplicateImageSamplesArray.length; i++) {
                    SpanWindow.innerHTML += '<u><i><span style="font-size:0.8em">' + DuplicateImageSamplesArray[i] + '</span></i></u><br>';
                }
                SpanWindow.innerHTML += "<br> ";
            }
            DuplicateImageSamplesArray = [];

            Divwindow.appendChild(SpanWindow);
        }

        if (arrFalse[5] != false) {
            var SpanWindow = document.createElement("SPAN");
            SpanWindow.setAttribute("id", "analyzeDuplicateProducts");
            SpanWindow.setAttribute("class", "noDeal");


            SpanWindow.innerHTML += "DeepURL duplicates<br>";
            if (duplicatesArray[5] == 0) {
                SpanWindow.innerHTML += '<h1 style="margin: 0;">0%</h1>';
            } else {
                //writelocation.innerHTML += duplicatesArray[5];
            }
            //console.log(duplicatesPercentArray[5]);
            if (duplicatesPercentArray[5] != undefined) {
                SpanWindow.innerHTML += '<h1 style="margin: 0;">' + duplicatesPercentArray[5] + '</h1><br>';

            } else {
                SpanWindow.innerHTML += "<br>";
            }
            if (DuplicateDeepLinkSamplesArray.length > 0) {
                SpanWindow.innerHTML += '<strong><i><span style="font-size:0.8em">samples: </span></i></strong><br> ';
                for (var i = 0; i < DuplicateDeepLinkSamplesArray.length; i++) {
                    SpanWindow.innerHTML += '<u><i><span style="font-size:0.8em">' + DuplicateDeepLinkSamplesArray[i] + '</span></i></u><br>';
                }
                SpanWindow.innerHTML += "<br> ";
            }
            DuplicateDeepLinkSamplesArray = [];

            Divwindow.appendChild(SpanWindow);
        }


        writelocation.innerHTML += "";
        if (schalter === true) {
            var writelocation = document.getElementById("check2");
        } else {
            var writelocation = document.getElementById("check");
        }
        /************************************************************************************************************************
        setting up Sample Table Bild[4]	DeepLink[5] Name[1] Price[2] Old_Price[9] ShippingCost[17] DeliveryTime[18] Color[14]
        */
        // createSampleItems(this.maxSamples);
        new SampleItems(this.maxSamples);


        //writelocation.innerHTML += '<br>';
        //<br><h2><strong>Feed preview</strong></h2>
        if (tableLines < 5) {
            INTERRUPTED(3);
        }
    }
    removeAndReplaceAmperSigns() {
        $(".removeAmp").attr('href', function (i, value) {
            return value.replace(/&amp;/g, "&");
        });
    }
}