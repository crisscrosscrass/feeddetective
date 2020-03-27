String.prototype.toNoEmptySpaces = function () {
    return (/\s/.test(this)) ? this.split(" ").join("") : this;
};
function setCountryIndex(value) {
    let selection = {
        "EN": 0,
        "DE": 1,
        "NL": 2,
        "FR": 3,
        "IT": 4,
        "ES": 5,
        "BR": 6,
        "PL": 7,
        "HU": 8,
        "SK": 9,
        "CZ": 10,
        "FI": 11
    }
    return (selection[value]);
}
function aggregateSuggestions(replyDataJSON, headline, language) {
    collectedSuggestions = [];
    collectedSuggestions.push(headline);
    for (attribute in replyDataJSON) {
        if (replyDataJSON.hasOwnProperty(attribute)) {
            // check charset
            if (attribute == "encodingfeed") {
                // if other
                if (document.getElementsByClassName("encoding")[1].checked == true) {
                    collectedSuggestions.push(replyDataJSON.encodingfeed.others[language] + lineBreaks);
                }
            }
            // check feed structure
            if (attribute == "feedstructure") {
                // if CSV Issues
                if (document.getElementsByClassName("feedstructure")[1].checked == true) {
                    collectedSuggestions.push(replyDataJSON.feedstructure.csvissues[language] + lineBreaks);
                }
                // if XML Issues
                if (document.getElementsByClassName("feedstructure")[2].checked == true) {
                    collectedSuggestions.push(replyDataJSON.feedstructure.xmlissues[language] + lineBreaks);
                }
            }
            // check for each selection inside the JSON Data
            for (selection in replyDataJSON[attribute]) {
                // check if Availability is selected via "yes, no , no need"
                if (document.getElementsByClassName(attribute)[0] != undefined && document.getElementsByClassName(attribute)[0].checked == true) {
                    //adjust attribute to match the ID
                    attributeId = "select" + attribute.charAt(0).toUpperCase() + attribute.slice(1);

                    // check if the generated selectAttributeID exist in the DOM
                    if (document.getElementById(attributeId) != null) {
                        if (replyDataJSON[attribute].hasOwnProperty(selection) &&
                            document.getElementById(attributeId).value.toNoEmptySpaces() == selection &&
                            selection != "yes") {
                            collectedSuggestions.push(replyDataJSON[attribute][selection][language] + lineBreaks);
                        }
                    }
                }
                if (document.getElementsByClassName(attribute)[1] != undefined && document.getElementsByClassName(attribute)[1].checked == true) {
                    if (selection == "empty") {
                        collectedSuggestions.push(replyDataJSON[attribute][selection][language] + lineBreaks);
                    }
                }
            }
        }
    }
    return collectedSuggestions;
}
function generateSuggestions() {
    writingLocationSuggestions = document.getElementById("suggestions");
    language = setCountryIndex(document.getElementById("language").value);
    lineBreaks = "<br><br>";
    writingLocationSuggestions.innerHTML = "";
    collectedImportantSuggestions = aggregateSuggestions(replyImportant, "h2. *??important things to fix??*" + lineBreaks, language);
    (collectedImportantSuggestions.length > 1) ? collectedImportantSuggestions.forEach((suggestion) => writingLocationSuggestions.innerHTML += suggestion) : "";
    collectedImprovementSuggestions = aggregateSuggestions(replySuggestions, "<br>h2. ??suggestions for improvement??" + lineBreaks, language);
    (collectedImprovementSuggestions.length > 1) ? collectedImprovementSuggestions.forEach((suggestion) => writingLocationSuggestions.innerHTML += suggestion) : "";
}