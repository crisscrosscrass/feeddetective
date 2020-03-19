function generateSuggestions() {
    /*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		myFunction(this);
    		}
    	};
    xhttp.open("GET", "template.xml", true);
    xhttp.send();
    */
    var valueCheck = document.getElementById("language").value;
    //console.log(valueCheck);
    if (valueCheck == "EN") {
        var language = 0;
    } else if (valueCheck == "DE") {
        var language = 1;
    } else if (valueCheck == "NL") {
        var language = 2;
    } else if (valueCheck == "FR") {
        var language = 3;
    } else if (valueCheck == "IT") {
        var language = 4;
    } else if (valueCheck == "ES") {
        var language = 5;
    } else if (valueCheck == "BR") {
        var language = 6;
    } else if (valueCheck == "PL") {
        var language = 7;
    } else if (valueCheck == "HU") {
        var language = 8;
    } else if (valueCheck == "SK") {
        var language = 9;
    } else if (valueCheck == "CZ") {
        var language = 10;
    } else if (valueCheck == "FI") {
        var language = 11;
    }
    //var xmlDoc = xml.responseXML;
    document.getElementById("suggestions").innerHTML = "h2. *??important things to fix??*<br><br>";
    if (document.getElementById("encodingfeedbuilder").checked == true) { // if Encoding is checked
        // if other
        if (document.getElementsByClassName("encoding")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.encodingfeed.others[language] + "<br><br>";
        }
    }
    if (document.getElementById("feedstructurebuilder").checked == true) { // if feedstructure is checked
        // if CSV Issues
        if (document.getElementsByClassName("feedstructure")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.feedstructure.csvissues[language] + "<br><br>";
        }
        // if XML Issues
        if (document.getElementsByClassName("feedstructure")[2].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.feedstructure.xmlissues[language] + "<br><br>";
        }
    }
    if (document.getElementById("articlenumberbuilder").checked == true) { // if articlenumber is checked
        // if YES
        if (document.getElementsByClassName("articlenumber")[0].checked == true) {
            var valueCheck = document.getElementById("selectArticlenumber").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.articlenumber.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.articlenumber.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.articlenumber.partially[language] + "<br><br>";
            } else if (valueCheck == "duplicate") {
                document.getElementById("suggestions").innerHTML += reply.articlenumber.duplicate[language] + "<br><br>";
            } else if (valueCheck == "changed") {
                document.getElementById("suggestions").innerHTML += reply.articlenumber.changed[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("articlenumber")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.articlenumber.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("productnamebuilder").checked == true) { // if productname is checked
        // if YES
        if (document.getElementsByClassName("productname")[0].checked == true) {
            var valueCheck = document.getElementById("selectProductname").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.productname.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.productname.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.productname.partially[language] + "<br><br>";
            } else if (valueCheck == "different language") {
                document.getElementById("suggestions").innerHTML += reply.productname.differentlanguage[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("productname")[1].checked == true) {
            var x = reply.productname.empty[language] + "&#10;";
            document.getElementById("suggestions").innerHTML += x + "<br><br>";
        }
    }
    if (document.getElementById("genderbuilder").checked == true) { // if gender is checked
        // if YES
        if (document.getElementsByClassName("gender")[0].checked == true) {
            var valueCheck = document.getElementById("selectGender").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.gender.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.gender.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.gender.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.gender.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "kids inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.gender.kidsinaccurate[language] + "<br><br>";
            } else if (valueCheck == "age group") {
                document.getElementById("suggestions").innerHTML += reply.gender.agegroup[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("gender")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.gender.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("pricebuilder").checked == true) { // if price is checked
        // if YES
        if (document.getElementsByClassName("price")[0].checked == true) {
            var valueCheck = document.getElementById("selectPrice").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.price.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.price.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.price.partially[language] + "<br><br>";
            } else if (valueCheck == "wrong") {
                document.getElementById("suggestions").innerHTML += reply.price.wrong[language] + "<br><br>";
            } else if (valueCheck == "sale price") {
                document.getElementById("suggestions").innerHTML += reply.price.saleprice[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("price")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.price.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("pricesStartFrombuilder").checked == true) { // if pricesStartFrom is checked
        // if YES
        if (document.getElementsByClassName("pricesStartFrom")[0].checked == true) {
            var valueCheck = document.getElementById("selectPricesStartFrom").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.partially[language] + "<br><br>";
            } else if (valueCheck == "wrong") {
                document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.wrong[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("pricesStartFrom")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.pricesstartfrom.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("energylabelbuilder").checked == true) { // if energylabel is checked
        // if YES
        if (document.getElementsByClassName("energylabel")[0].checked == true) {
            var valueCheck = document.getElementById("selectEnergylabel").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.energylabel.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.energylabel.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.energylabel.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.energylabel.inaccurate[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("energylabel")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.energylabel.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("pricePerUnitbuilder").checked == true) { // if pricePerUnit is checked
        // if YES
        if (document.getElementsByClassName("pricePerUnit")[0].checked == true) {
            var valueCheck = document.getElementById("selectPricePerUnit").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.priceperunit.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.priceperunit.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.priceperunit.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.priceperunit.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "units") {
                document.getElementById("suggestions").innerHTML += reply.priceperunit.units[language] + "<br><br>";
            } else if (valueCheck == "currency missing") {
                document.getElementById("suggestions").innerHTML += reply.priceperunit.currencymissing[language] + "<br><br>";
            } else if (valueCheck == "value divided") {
                document.getElementById("suggestions").innerHTML += reply.priceperunit.valuedivided[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("pricePerUnit")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.priceperunit.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("shippingcostsbuilder").checked == true) { // if shippingcosts is checked
        // if YES
        if (document.getElementsByClassName("shippingcosts")[0].checked == true) {
            var valueCheck = document.getElementById("selectShippingcosts").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.shippingcosts.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.shippingcosts.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.shippingcosts.partially[language] + "<br><br>";
            } else if (valueCheck == "wrong") {
                document.getElementById("suggestions").innerHTML += reply.shippingcosts.wrong[language] + "<br><br>";
            } else if (valueCheck == "text only") {
                document.getElementById("suggestions").innerHTML += reply.shippingcosts.textonly[language] + "<br><br>";
            } else if (valueCheck == "minimum order") {
                document.getElementById("suggestions").innerHTML += reply.shippingcosts.minimumorder[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("shippingcosts")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.shippingcosts.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("shippingtimebuilder").checked == true) { // if shippingtime is checked
        // if YES
        if (document.getElementsByClassName("shippingtime")[0].checked == true) {
            var valueCheck = document.getElementById("selectShippingtime").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.shippingtime.yes[language];
            } else if (valueCheck == "out of stock") {
                document.getElementById("suggestions").innerHTML += reply.shippingtime.outofstock[language] + "<br><br>";
            }
        }
    }
    if (document.getElementById("sizebuilder").checked == true) { // if size is checked
        // if YES
        if (document.getElementsByClassName("size")[0].checked == true) {
            var valueCheck = document.getElementById("selectSize").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.size.yes[language];
            } else if (valueCheck == "out of stock") {
                document.getElementById("suggestions").innerHTML += reply.size.outofstock[language] + "<br><br>";
            } else if (valueCheck == "price difference") {
                document.getElementById("suggestions").innerHTML += reply.size.pricedifference[language] + "<br><br>";
            }
        }
    }
    if (document.getElementById("ImageURLbuilder").checked == true) { // if ImageURL is checked
        // if YES
        if (document.getElementsByClassName("ImageURL")[0].checked == true) {
            var valueCheck = document.getElementById("selectImageURL").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.partially[language] + "<br><br>";
            } else if (valueCheck == "duplicate content") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.duplicatecontent[language] + "<br><br>";
            } else if (valueCheck == "big picture") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.bigpicture[language] + "<br><br>";
            } else if (valueCheck == "quality") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.quality[language] + "<br><br>";
            } else if (valueCheck == "multiple products") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.multipleproducts[language] + "<br><br>";
            } else if (valueCheck == "placeholder") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.placeholder[language] + "<br><br>";
            } else if (valueCheck == "not working") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.notworking[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("ImageURL")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.imageurl.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("DeepURLbuilder").checked == true) { // if DeepURL is checked
        // if YES
        if (document.getElementsByClassName("DeepURL")[0].checked == true) {
            var valueCheck = document.getElementById("selectDeepURL").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.deepurl.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.deepurl.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.deepurl.partially[language] + "<br><br>";
            } else if (valueCheck == "wrong") {
                document.getElementById("suggestions").innerHTML += reply.deepurl.wrong[language] + "<br><br>";
            } else if (valueCheck == "not working") {
                document.getElementById("suggestions").innerHTML += reply.deepurl.notworking[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("DeepURL")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.deepurl.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("AuxImageURLbuilder").checked == true) { // if AuxURL is checked
        // if YES
        if (document.getElementsByClassName("AuxImageURL")[0].checked == true) {
            var valueCheck = document.getElementById("selectAuxImageURL").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "not working") {
                document.getElementById("suggestions").innerHTML += reply.auximageurl.notworking[language] + "<br><br>";
            }
        }
    }
    //SUGGESTIONS START!
    document.getElementById("suggestions").innerHTML += "<br>h2. ??suggestions for improvement??<br><br>";
    if (document.getElementById("encodingfeedbuilder").checked == true) { // if Encoding is checked
        // if flawless
        if (document.getElementsByClassName("encoding")[0].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.encodingfeed.flawless[language];
        }
    }
    if (document.getElementById("feedstructurebuilder").checked == true) { // if feedstructure is checked
        // if flawless
        if (document.getElementsByClassName("feedstructure")[0].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.feedstructure.flawless[language];
        }
    }
    if (document.getElementById("productnamebuilder").checked == true) { // if productname is checked
        // if YES
        if (document.getElementsByClassName("productname")[0].checked == true) {
            var valueCheck = document.getElementById("selectProductname").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.productname.yes[language];
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.productname.inaccurate[language] + "<br><br>";
            }
        }
    }
    if (document.getElementById("maincategorybuilder").checked == true) { // if maincategory is checked
        // if YES
        if (document.getElementsByClassName("maincategory")[0].checked == true) {
            var valueCheck = document.getElementById("selectMaincategory").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.maincategory.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.maincategory.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.maincategory.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.maincategory.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "inappropriate") {
                document.getElementById("suggestions").innerHTML += reply.maincategory.inappropriate[language] + "<br><br>";
            } else if (valueCheck == "new home snippet") {
                document.getElementById("suggestions").innerHTML += reply.maincategory.homenew[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("maincategory")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.maincategory.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("subcategorybuilder").checked == true) { // if subcategory is checked
        // if YES
        if (document.getElementsByClassName("subcategory")[0].checked == true) {
            var valueCheck = document.getElementById("selectSubcategory").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.subcategory.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.subcategory.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.subcategory.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.subcategory.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "inappropriate") {
                document.getElementById("suggestions").innerHTML += reply.subcategory.inappropriate[language] + "<br><br>";
            } else if (valueCheck == "can be divided") {
                document.getElementById("suggestions").innerHTML += reply.subcategory.canbedivided[language] + "<br><br>";
            } else if (valueCheck == "identical") {
                document.getElementById("suggestions").innerHTML += reply.subcategory.identical[language] + "<br><br>";
            } else if (valueCheck == "new home snippet") {
                document.getElementById("suggestions").innerHTML += reply.subcategory.homenew[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("subcategory")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.subcategory.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("2ndsubcategorybuilder").checked == true) { // if 2ndsubcategory is checked
        // if YES
        if (document.getElementsByClassName("2ndsubcategory")[0].checked == true) {
            var valueCheck = document.getElementById("select2ndsubcategory").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.secondsubcategory.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.secondsubcategory.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.secondsubcategory.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.secondsubcategory.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "inappropriate") {
                document.getElementById("suggestions").innerHTML += reply.secondsubcategory.inappropriate[language] + "<br><br>";
            } else if (valueCheck == "can be divided") {
                document.getElementById("suggestions").innerHTML += reply.secondsubcategory.canbedivided[language] + "<br><br>";
            } else if (valueCheck == "identical") {
                document.getElementById("suggestions").innerHTML += reply.secondsubcategory.identical[language] + "<br><br>";
            } else if (valueCheck == "new home snippet") {
                document.getElementById("suggestions").innerHTML += reply.secondsubcategory.homenew[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("2ndsubcategory")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.secondsubcategory.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("genderbuilder").checked == true) { // if gender is checked
        // if YES
        if (document.getElementsByClassName("gender")[0].checked == true) {
            var valueCheck = document.getElementById("selectGender").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.gender.yes[language];
            } else if (valueCheck == "only kids") {
                document.getElementById("suggestions").innerHTML += reply.gender.onlykids[language] + "<br><br>";
            }
        }
    }
    if (document.getElementById("colorbuilder").checked == true) { // if color is checked
        // if YES
        if (document.getElementsByClassName("color")[0].checked == true) {
            var valueCheck = document.getElementById("selectColor").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.color.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.color.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.color.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.color.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "inappropriate") {
                document.getElementById("suggestions").innerHTML += reply.color.inappropriate[language] + "<br><br>";
            } else if (valueCheck == "multiple information") {
                document.getElementById("suggestions").innerHTML += reply.color.multipleinformation[language] + "<br><br>";
            } else if (valueCheck == "new home snippet") {
                document.getElementById("suggestions").innerHTML += reply.color.homenew[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("color")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.color.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("brandbuilder").checked == true) { // if brand is checked
        // if YES
        if (document.getElementsByClassName("brand")[0].checked == true) {
            var valueCheck = document.getElementById("selectBrand").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.brand.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.brand.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.brand.partially[language] + "<br><br>";
            } else if (valueCheck == "new home snippet") {
                document.getElementById("suggestions").innerHTML += reply.brand.homenew[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("brand")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.brand.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("materialbuilder").checked == true) { // if material is checked
        // if YES
        if (document.getElementsByClassName("material")[0].checked == true) {
            var valueCheck = document.getElementById("selectMaterial").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.material.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.material.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.material.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.material.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "inappropriate") {
                document.getElementById("suggestions").innerHTML += reply.material.inappropriate[language] + "<br><br>";
            } else if (valueCheck == "multiple information") {
                document.getElementById("suggestions").innerHTML += reply.material.multipleinformation[language] + "<br><br>";
            } else if (valueCheck == "too precise") {
                document.getElementById("suggestions").innerHTML += reply.material.tooprecise[language] + "<br><br>";
            } else if (valueCheck == "new home snippet") {
                document.getElementById("suggestions").innerHTML += reply.material.homenew[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("material")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.material.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("descriptionbuilder").checked == true) { // if description is checked
        // if YES
        if (document.getElementsByClassName("description")[0].checked == true) {
            var valueCheck = document.getElementById("selectDescription").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.description.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.description.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.description.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.description.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "inappropriate") {
                document.getElementById("suggestions").innerHTML += reply.description.inappropriate[language] + "<br><br>";
            } else if (valueCheck == "incomplete") {
                document.getElementById("suggestions").innerHTML += reply.description.incomplete[language] + "<br><br>";
            } else if (valueCheck == "bad form") {
                document.getElementById("suggestions").innerHTML += reply.description.badform[language] + "<br><br>";
            } else if (valueCheck == "different language") {
                document.getElementById("suggestions").innerHTML += reply.description.differentlanguage[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("description")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.description.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("pricebuilder").checked == true) { // if price is checked
        // if YES
        if (document.getElementsByClassName("price")[0].checked == true) {
            var valueCheck = document.getElementById("selectPrice").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.price.yes[language];
            } else if (valueCheck == "with currency") {
                document.getElementById("suggestions").innerHTML += reply.price.withcurrency[language] + "<br><br>";
            }
        }
    }
    if (document.getElementById("oldpricebuilder").checked == true) { // if oldprice is checked
        // if YES
        if (document.getElementsByClassName("oldprice")[0].checked == true) {
            var valueCheck = document.getElementById("selectOldprice").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.oldprice.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.oldprice.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.oldprice.partially[language] + "<br><br>";
            } else if (valueCheck == "wrong") {
                document.getElementById("suggestions").innerHTML += reply.oldprice.wrong[language] + "<br><br>";
            } else if (valueCheck == "with currency") {
                document.getElementById("suggestions").innerHTML += reply.oldprice.withcurrency[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("oldprice")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.oldprice.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("shippingcostsbuilder").checked == true) { // if shippingcosts is checked
        // if YES
        if (document.getElementsByClassName("shippingcosts")[0].checked == true) {
            var valueCheck = document.getElementById("selectShippingcosts").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.shippingcosts.yes[language];
            } else if (valueCheck == "payment method") {
                document.getElementById("suggestions").innerHTML += reply.shippingcosts.paymentmethod[language] + "<br><br>";
            }
        }
    }
    if (document.getElementById("shippingtimebuilder").checked == true) { // if shippingtime is checked
        // if YES
        if (document.getElementsByClassName("shippingtime")[0].checked == true) {
            var valueCheck = document.getElementById("selectShippingtime").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.shippingtime.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.shippingtime.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.shippingtime.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.shippingtime.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "wrong") {
                document.getElementById("suggestions").innerHTML += reply.shippingtime.wrong[language] + "<br><br>";
            } else if (valueCheck == "text only") {
                document.getElementById("suggestions").innerHTML += reply.shippingtime.textonly[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("shippingtime")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.shippingtime.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("sizebuilder").checked == true) { // if size is checked
        // if YES
        if (document.getElementsByClassName("size")[0].checked == true) {
            var valueCheck = document.getElementById("selectSize").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.size.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.size.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.size.partially[language] + "<br><br>";
            } else if (valueCheck == "inaccurate") {
                document.getElementById("suggestions").innerHTML += reply.size.inaccurate[language] + "<br><br>";
            } else if (valueCheck == "inappropriate") {
                document.getElementById("suggestions").innerHTML += reply.size.inappropriate[language] + "<br><br>";
            } else if (valueCheck == "new home snippet") {
                document.getElementById("suggestions").innerHTML += reply.size.homenew[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("size")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.size.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("filtersbuilder").checked == true) { // if filters is checked
        // if YES
        if (document.getElementsByClassName("filters")[0].checked == true) {
            var valueCheck = document.getElementById("selectFilters").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.filters.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.filters.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.filters.partially[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("filters")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.filters.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("GTINbuilder").checked == true) { // if GTIN is checked
        // if YES
        if (document.getElementsByClassName("GTIN")[0].checked == true) {
            var valueCheck = document.getElementById("selectGTIN").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.GTIN.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.GTIN.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.GTIN.partially[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("GTIN")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.GTIN.empty[language] + "<br><br>";
        }
    }
    if (document.getElementById("ImageURLbuilder").checked == true) { // if ImageURL is checked
        // if YES
        if (document.getElementsByClassName("ImageURL")[0].checked == true) {
            var valueCheck = document.getElementById("selectImageURL").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.yes[language];
            } else if (valueCheck == "small picture") {
                document.getElementById("suggestions").innerHTML += reply.imageurl.smallpicture[language] + "<br><br>";
            }
        }
    }
    if (document.getElementById("AuxImageURLbuilder").checked == true) { // if AuxImageURL is checked
        // if YES
        if (document.getElementsByClassName("AuxImageURL")[0].checked == true) {
            var valueCheck = document.getElementById("selectAuxImageURL").value;
            //console.log(valueCheck);
            // if YES
            if (valueCheck == "yes") {
                document.getElementById("suggestions").innerHTML += reply.auximageurl.yes[language];
            } else if (valueCheck == "no") {
                document.getElementById("suggestions").innerHTML += reply.auximageurl.no[language] + "<br><br>";
            } else if (valueCheck == "partially") {
                document.getElementById("suggestions").innerHTML += reply.auximageurl.partially[language] + "<br><br>";
            } else if (valueCheck == "identical") {
                document.getElementById("suggestions").innerHTML += reply.auximageurl.identical[language] + "<br><br>";
            } else if (valueCheck == "big picture") {
                document.getElementById("suggestions").innerHTML += reply.auximageurl.bigpicture[language] + "<br><br>";
            } else if (valueCheck == "small picture") {
                document.getElementById("suggestions").innerHTML += reply.auximageurl.smallpicture[language] + "<br><br>";
            } else if (valueCheck == "quality") {
                document.getElementById("suggestions").innerHTML += reply.auximageurl.quality[language] + "<br><br>";
            }
        }
        // if NO
        if (document.getElementsByClassName("AuxImageURL")[1].checked == true) {
            document.getElementById("suggestions").innerHTML += reply.auximageurl.empty[language] + "<br><br>";
        }
    }
}