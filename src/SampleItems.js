class SampleItems {
    constructor(maxSamples) {
        if (schalter === true) {
            this.writelocation = document.getElementById("check2");
        } else {
            this.writelocation = document.getElementById("check");
        }
        this.FeedLocation = document.getElementById("FeedTable");
        this.maxSamples = maxSamples;
        this.UL = document.createElement("UL");
        this.Init();
    }
    Init() {
        if (this.FeedLocation.rows[3] != undefined && this.FeedLocation != undefined) {
            this.createSamples();
        }
    }
    createSamples() {
        let writelocation = this.writelocation;
        let maxSamples = this.maxSamples;

        writelocation.innerHTML += "";
        if (document.getElementById("SampleProductSpace") != undefined) {
            document.getElementById("SampleProductSpace").remove();
        }
        var DIV = document.createElement("DIV");
        DIV.setAttribute("id", "SampleProductSpace");
        writelocation.append(DIV);
        writelocation = document.getElementById("SampleProductSpace");
        writelocation.innerHTML = "";
        writelocation.innerHTML += '<h2 id="underlineHeader"><strong style="font-size: 18px;font-family: Raleway;">sample products from feed</strong>' +
            '&nbsp;<input id="InputSampleField" type="number" min="1" max="50">' +
            '&nbsp;<img src="refreshButton.png" onclick="createAndAdjustSampleItems(' + maxSamples + ')" class="refreshButton">' +
            '</h2><br>';
        var InputSampleField = document.getElementById('InputSampleField');
        InputSampleField.value = maxSamples;

        this.UL.setAttribute("id", "Samples");
        this.UL.setAttribute("class", "products");
        writelocation.appendChild(this.UL);

        if (maxSamples <= 0) {
            maxSamples = 1;
        }
        if (maxSamples >= 50) {
            maxSamples = 50;
        }

        var tableLines = document.getElementById('FeedTable').rows.length;
        var randomNumbers = [];
        var initialAttempts = 0;
        if (maxSamples > tableLines) {
            randomNumbers = [1, 2, 3, 4];
        } else {
            while (randomNumbers.length < maxSamples) {
                var randomNumber = Math.floor((Math.random() * tableLines - 1) + 1);
                if (randomNumber == 0) {
                    randomNumber = 1;
                }
                if (!randomNumbers.includes(randomNumber)) {
                    randomNumbers.push(randomNumber);
                } else {
                    //console.log("same Random Number!")
                    ++initialAttempts;
                    if (initialAttempts > 3) {
                        //console.log("Need to break!")
                        break;
                    }
                }
            }
        }

        for (let q = 0; q < maxSamples; q++) {
            var randomNumber = randomNumbers[q];
            // FeedLocation = document.getElementById("FeedTable");
            // UL = document.getElementById("Samples");
            this.createItemSample(randomNumber);
        }
    }
    getIndexByName(name) {
        for (var i = 0; i <= allNames.length; i++) {
            if (name == allNames[i]) {
                return i;
            }
        }
        return null;
    }
    getItemDetails(name, randomNumber) {
        let FeedLocation = this.FeedLocation;
        let index = this.getIndexByName(name);
        let ItemDetails = ""
        if (FeedLocation.rows[randomNumber] != undefined && FeedLocation.rows[randomNumber].cells[MappingArray[index]] != undefined && ItemDetails != null) {
            ItemDetails = FeedLocation.rows[randomNumber].cells[MappingArray[index]].innerHTML;
            if (name == "Name" && name.length > 100) {
                ItemDetails = ItemDetails.substr(0, 100) + "\u2026";
                return ItemDetails;
            }
            if (name == "Image") {
                //replace Ampersand to fix some Image Display Issues
                ItemDetails = ItemDetails.replace(/\&amp\;/gi, "&");
                return ItemDetails;
            }
            return ItemDetails;
        } else {
            return ItemDetails;
        }
    }
    createItemSample(randomNumber) {
        // var allNames = ["SKU", "Name", "Price", "Description", "Image", "DeepURL", "Top_Category", "Category", "Category_2", "Old_Price", "Base_Price", "Gender", "Brand", "Sizes", "Color", "CPC", "Material", "ShippingCost", "DeliveryTime", "AuxImage", "EnergyLabel", "mCPC", "GTIN"];
        var randomImage = this.getItemDetails("Image", randomNumber);
        var randomDeepURL = this.getItemDetails("DeepURL", randomNumber);
        var randomName = this.getItemDetails("Name", randomNumber);
        var randomPrice = this.getItemDetails("Price", randomNumber);
        var randomOld_price = this.getItemDetails("Old_Price", randomNumber);
        var randomShippingCost = this.getItemDetails("ShippingCost", randomNumber);
        var randomDeliveryTime = this.getItemDetails("DeliveryTime", randomNumber);
        var randomColor = this.getItemDetails("Color", randomNumber);
        var randomSKU = this.getItemDetails("SKU", randomNumber);
        var randomAuxImage = this.getItemDetails("AuxImage", randomNumber);


        var LI = document.createElement("LI");
        if(randomAuxImage != "" && randomAuxImage != undefined && randomAuxImage != null){
            LI.addEventListener("mouseenter", function (event) {
                auxImage.style.display = "inherit";
            }, false);
            LI.addEventListener("mouseleave", function (event) {
                auxImage.style.display = "none";;
            }, false);
        }
        var aLink = document.createElement("A");
        aLink.setAttribute("href", randomDeepURL);
        aLink.setAttribute("target", "_blank");
        aLink.setAttribute('class', 'removeAmp');
        var aImage = document.createElement("IMG");
        aImage.setAttribute("src", randomImage);
        aImage.setAttribute("width", "100px");
        aImage.setAttribute("height", "100px");
        var auxImage = document.createElement("IMG");
        auxImage.setAttribute("src", randomAuxImage);
        auxImage.setAttribute("width", "100px");
        auxImage.setAttribute("height", "100px");
        auxImage.style.display = "none";

        var aTitle = document.createElement("H4");
        aTitle.innerHTML += randomName;
        LI.appendChild(aLink);
        aLink.appendChild(aImage);
        aLink.appendChild(auxImage);
        aLink.appendChild(aTitle);

        var aParagraph = document.createElement("P");
        var aSpan = document.createElement("SPAN");
        if (randomOld_price.length > 0) {
            aSpan.setAttribute("class", "red");
        } else {
            aSpan.setAttribute("class", "nothing");
        }
        if (Math.floor(randomOld_price) <= Math.floor(randomPrice)) {
            aSpan.setAttribute("class", "nothing");
        }
        aSpan.innerHTML += "Price: " + randomPrice + "<br>";
        aParagraph.appendChild(aSpan);

        var aSpan = document.createElement("SPAN");
        aSpan.innerHTML += " Old_Price: " + randomOld_price;
        aParagraph.appendChild(aSpan);

        LI.appendChild(aParagraph);

        var aParagraph = document.createElement("P");
        aParagraph.innerHTML += "ShippingCost: " + randomShippingCost;
        LI.appendChild(aParagraph);

        var aParagraph = document.createElement("P");
        aParagraph.innerHTML += "Delivery Time: " + randomDeliveryTime;
        LI.appendChild(aParagraph);

        var aParagraph = document.createElement("P");
        aParagraph.innerHTML += "Color: " + randomColor;
        LI.appendChild(aParagraph);

        var aParagraph = document.createElement("P");
        aParagraph.innerHTML += "SKU: " + randomSKU;
        LI.appendChild(aParagraph);

        return this.UL.appendChild(LI);
    }
}