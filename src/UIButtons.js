// functions before/after Ajax Call
$(document).ajaxStart(function () {
    $('#loading').show();
}).ajaxStop(function () {
    $('#loading').hide();
});
$(document).ajaxStop(function () {
    $('#loading2').show();
    $(document).ready(function () {
        program.OpenCloseMainMenu();
        // ValidatePreview();
        new ValidateAndPreview(maxSamples);
        $('#loading2').hide();
    });
});
function dynamicAjax(phpFile, data, callback) {
    let urlRegex = /\b(?:(?:https?|ftp|file):\/\/\/?|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/;
    if (data.feedURL.length != 0 || data.feedURL.match(urlRegex)) {
        $.ajax({
            type: "POST",
            url: phpFile,
            asynch: true,
            data: data,
            beforeSend: function () {
                serverStateInfo(phpFile);
            },
            success: callback,
            complete: function () {
                source.close();
            },
            error: function () {
                // will fire when timeout is reached
                $("#contents").html("<h1>connection to the server failed!!</h1>");
                source.close();
            },
            timeout: 120000
        });
    } else {
        program.OpenCloseMainMenu();
        INTERRUPTED(1);
    }
}
function serverStateInfo(phpFile) {
    source = new EventSource(phpFile);
    if (typeof (EventSource) !== "undefined") {
        source.onmessage = function (event) {
            if (checkingState == false) {
                document.getElementById('dynamicLoadingContent').innerHTML = event.data;
                // console.log(document.getElementById('dynamicLoadingContent').innerHTML);
                if (document.getElementById('dynamicLoadingContent').innerHTML == "create Table") {
                    checkingState = true;
                }
            } else {
                document.getElementById('dynamicLoadingContent').innerHTML = getWaitingInfo(waitingStatement);
                waitingStatement++;
            }
        };
    } else {
        alert("nono");
    }
}
class AnalyzeCSV {
    constructor(e) {
        var input1 = document.getElementById('feedURL').value;
        input1 = input1.trim();
        clearAllArrays();
        e.preventDefault();
        dynamicAjax('feedcheckerCSV.php', { feedURL: input1 }, function (response) {
            $("#contents").html(response);
        });
    }
}
class SettingsAndAnalyzeCSV {
    constructor(e) {
        clearAllArrays();
        var input1 = document.getElementById('feedURL').value;
        var input2 = document.getElementById('delimiter').value;
        var input3 = document.getElementById('charset').value;
        var input4 = document.getElementById('enclosure').value;
        clearAllArrays();
        e.preventDefault();
        dynamicAjax('feedcheckerCSV2.php', { feedURL: input1, delimiter: input2, charset: input3, enclosure: input4 }, function (response) {
            $("#contents").html(response);
        });
    }
}
class UploadCSV {
    constructor(e, data) {
        clearAllArrays();
        e.preventDefault();
        $.ajax({
            url: "upload.php", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: data, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            asynch: true,
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            beforeSend: function () {
                serverStateInfo("upload.php");
            },
            success: function (data) // A function to be called if request succeeds
            {
                $("#contents").html(data);
            },
            complete: function () {
                source.close();
            },
            error: function () {
                source.close();
            },
        });
    }
}
class AnalyzeXML {
    constructor(e) {
        var input1 = document.getElementById('feedURL').value;
        clearAllArrays();
        e.preventDefault();
        dynamicAjax('feedcheckerXML.php', { feedURL: input1 }, function (response) {
            $("#contents").html(response);
        });
    }
}
class SettingsAndAnalyzeXML {
    constructor(e) {
        var input1 = document.getElementById('feedURL').value;
        input1 = input1.trim();
        var input2 = document.getElementById('parentnode').value;
        input2 = input2.trim();
        var input3 = document.getElementById('itemnode').value;
        input3 = input3.trim();
        clearAllArrays();
        e.preventDefault();
        dynamicAjax('feedcheckerXML2.php', { feedURL: input1, parentnode: input2, itemnode: input3 }, function (response) {
            $("#contents").html(response);
        });
    }
}
class UploadXML {
    constructor(e, data) {
        clearAllArrays();
        e.preventDefault();
        $.ajax({
            url: "XMLUpload.php", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: data, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            asynch: true,
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            beforeSend: function () {
                serverStateInfo("XMLUpload.php");
            },
            success: function (data) // A function to be called if request succeeds
            {
                $("#contents").html(data);
            },
            complete: function () {
                source.close();
            },
            error: function () {
                source.close();
            },
        });
    }
}
class FeedPreview {
    constructor() {
        var tableLength = document.getElementById('FeedTable').rows[0].cells.length;
        var maxLines = document.getElementById('FeedTable').rows.length;
        var value = document.getElementById('FeedTable').rows[0].innerHTML;
        maxLines += -1;
        var writelocation = document.getElementById("clusterizeHeader");
        writelocation.innerHTML = "";
        var TableHeaderRow = document.createElement("TR");
        var TableWindowHeaderValue = document.createElement("TH");
        TableWindowHeaderValue.innerHTML = "Line"
        TableHeaderRow.appendChild(TableWindowHeaderValue);
        for (var i = 0; i < tableLength; i++) {
            var TableWindowHeaderValue = document.createElement("TH");
            TableWindowHeaderValue.innerHTML = document.getElementById('FeedTable').rows[0].cells[i].innerHTML
            TableHeaderRow.appendChild(TableWindowHeaderValue);
        }
        writelocation.appendChild(TableHeaderRow);
        var data = [];
        for (var i = 1; i <= maxLines; i++) {
            var value = document.getElementById('FeedTable').rows[i].innerHTML;
            data.push('<tr>' + '<td>' + i + '</td>' + value + '</tr>');
        }
        var clusterize = new Clusterize({
            rows: data,
            scrollId: 'scrollArea',
            contentId: 'contentArea'
        }),
            dataToggle = false;

        this.numberClick();
    }
    numberClick() {
        // add listener to table get Number from table and highlighted
        var numberCell = document.getElementById("contentArea");
        var maxtableColumns = document.getElementById('FeedTable').rows[0].cells.length;
        numberCell.addEventListener("click", function () {
            var text = $(event.target.cellIndex);
            if (text[0] != undefined) {
                var selectorNumber = text[0];
            } else {
                var selectorNumber = 0;
            }
            for (let i = 0; i <= maxtableColumns; i++) {
                document.querySelectorAll('table#ClusterExample th')[i].style.color = "black";
            }
            document.querySelectorAll('table#ClusterExample th')[selectorNumber].style.color = "cornflowerblue";
        });
    }
}
class DisplayFeedTableViaPopUp {
    constructor() {
        var HeaderAmount = document.getElementById("FeedTable").rows[0].cells.length;
        var tableLines = document.getElementById('FeedTable').rows.length;
        var TableWindow = document.createElement("TABLE");
        TableWindow.setAttribute("id", "NewFeedTable");
        TableWindow.setAttribute("class", "display");
        var TableWindowRow = document.createElement("TR");
        for (var i = 0; i < HeaderAmount; i++) {
            if (document.getElementById('FeedTable').rows[0].cells[i] != undefined) {
                var HeaderValue = document.getElementById('FeedTable').rows[0].cells[i].innerHTML;
            } else {
                var HeaderValue = "-";
            }
            var TableWindowHeaderValue = document.createElement("TH");
            TableWindowHeaderValue.innerHTML += HeaderValue
            TableWindowRow.appendChild(TableWindowHeaderValue);
        }
        TableWindow.appendChild(TableWindowRow);
        tableLines -= 1;
        if (tableLines > 2000) {
            for (var q = 1; q < 2000; q++) {
                var TableWindowRow = document.createElement("TR");
                for (var i = 0; i < HeaderAmount; i++) {
                    if (document.getElementById('FeedTable').rows[q].cells[i] != undefined) {
                        var HeaderValue = document.getElementById('FeedTable').rows[q].cells[i].innerHTML;
                    } else {
                        var HeaderValue = "-";
                    }
                    var TableWindowHeaderValue = document.createElement("TD");
                    TableWindowHeaderValue.innerHTML += HeaderValue
                    TableWindowRow.appendChild(TableWindowHeaderValue);
                }
                TableWindow.appendChild(TableWindowRow);
            }
        } else {
            for (var q = 1; q < tableLines; q++) {
                var TableWindowRow = document.createElement("TR");
                for (var i = 0; i < HeaderAmount; i++) {
                    if (document.getElementById('FeedTable').rows[q].cells[i] != undefined) {
                        var HeaderValue = document.getElementById('FeedTable').rows[q].cells[i].innerHTML;
                    } else {
                        var HeaderValue = "-";
                    }
                    var TableWindowHeaderValue = document.createElement("TD");
                    TableWindowHeaderValue.innerHTML += HeaderValue
                    TableWindowRow.appendChild(TableWindowHeaderValue);
                }
                TableWindow.appendChild(TableWindowRow);
            }
        }
        var myWindowTable = window.open('  ', 'Table', 'location=no,toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=800,height=800');
        var docTable = myWindowTable.document;
        docTable.open();
        docTable.write("<html><head><title>Table</title><link rel='stylesheet' type='text/css' href='CCC.css'></head><body>");
        docTable.write('<div id="PopUpFeedTable"> </div> ');
        TableWindow.setAttribute("id", "FeedTable");
        docTable.body.appendChild(TableWindow);
        docTable.close();
    }
}
class AttributeMapping {
    constructor() {
        document.getElementById("MappingSelection").innerHTML = "<h6>Mapping Setting </h6>"
        var HeaderAmount = document.getElementById("FeedTable").rows[0].cells.length;
        if (HeaderAmount > 100) {
            HeaderAmount = 100;
        }
        for (var i = 0; i < HeaderAmount; i++) {
            var HeaderValues = document.getElementById("FeedTable").rows[0].cells[i].innerHTML;
            HeaderArray.push(HeaderValues);
        }
        for (var i = 0; i < allNames.length; i++) {
            document.getElementById("MappingSelection").innerHTML += allNames[i];
            var alpha = document.createElement("SELECT");
            alpha.setAttribute("id", allNames[i]);
            //document.getElementById("MappingSelection").innerHTML += alpha;
            document.getElementById("MappingSelection").appendChild(alpha);
            for (var j = 0; j <= HeaderAmount; j++) {
                var beta = document.createElement("option");
                beta.setAttribute("id", j);
                beta.value = j;
                beta.innerHTML = HeaderArray[j];
                alpha.appendChild(beta);
            }
            beta.setAttribute("id", "nothing");
            beta.value = "nothing";
            beta.innerHTML = "no Validation";
            alpha.appendChild(beta);
            document.getElementById("MappingSelection").innerHTML += "<br>";
        }
        var button = document.createElement("BUTTON");
        button.setAttribute("id", "MappingValidate");
        button.value = "Validate";
        button.innerHTML = "Validate";
        button.setAttribute('onclick', 'MappingValidate();');
        document.getElementById("MappingSelection").appendChild(button);
        document.getElementById("MappingSelection").innerHTML += "<br>";
        var button2 = document.createElement("BUTTON");
        button2.setAttribute("id", "MappingClose");
        button2.value = "Close";
        button2.innerHTML = "Close";
        button2.setAttribute('onclick', 'MappingClose();');
        document.getElementById("MappingSelection").appendChild(button2);
        document.getElementById("MappingSelection").innerHTML += "<br>";
        document.getElementById("MappingSelection").innerHTML += "&#35; Samples:";
        var InputNumberField = document.createElement("INPUT");
        InputNumberField.setAttribute("id", "InputNumberField");
        InputNumberField.setAttribute("type", "number");
        InputNumberField.setAttribute("min", 1);
        InputNumberField.setAttribute("max", 50);
        InputNumberField.value = maxSamples;
        document.getElementById("MappingSelection").appendChild(InputNumberField);
        for (var q = 0; q < allNames.length; q++) {
            if (MappingArray[q] != undefined) {
                document.getElementById(allNames[q]).selectedIndex = MappingArray[q];
            } else {
                var setNoValidation = HeaderAmount;
                document.getElementById(allNames[q]).selectedIndex = setNoValidation;
            }
        }
    }
}
class UserActions {
    constructor() {
    }
    OpenCloseMainMenu() {
        $("#my_inputs").fadeOut("slow");
        $("#my_inputs2").fadeOut("slow");
        $("#my_inputs3").fadeOut("slow");
        var crossSign = document.querySelector("#crossSign");
        crossSign.classList.toggle("change");
        if ($('.backgroundmenu').hasClass('change')) {
            $(".containermenu").fadeOut("fast");
            $('.backgroundmenu').fadeOut("fast");
            $('.backgroundmenu').removeClass('change');
        } else {
            $('.backgroundmenu').fadeIn("fast");
            $(".containermenu").fadeIn("fast");
            $('.backgroundmenu').addClass('change');
        }
    }
    OpenXMLSettings() {
        $("#my_inputs2").fadeOut();
        $("#my_inputs3").fadeOut();
        $("#my_inputs").slideToggle("slow");
    }
    OpenCSVSettings() {
        $("#my_inputs").fadeOut();
        $("#my_inputs3").fadeOut();
        $("#my_inputs2").slideToggle("slow");
    }
    OpenUploadFeedSettings() {
        $("#my_inputs2").fadeOut();
        $("#my_inputs").fadeOut();
        $("#my_inputs3").slideToggle("slow");
    }
    OpenFeedbackBuilder() {
        $(".modal").fadeIn();
        $(".modal_main").show();
    }
    CloseFeedbackBuilder() {
        $(".response").fadeOut();
        $(".responseBox").fadeOut();
        $(".modal").fadeOut();
        $(".modal_main").fadeOut();
    }
    resetTemplate() {
        //==========================================================first column
        $('input[id="encodingfeed"]').prop('checked', false);
        $('input[id="feedstructure"]').prop('checked', false);
        $('input[id="articlenumber"]').prop('checked', false);
        $('input[id="productname"]').prop('checked', false);
        $('input[id="maincategory"]').prop('checked', false);
        $('input[id="subcategory"]').prop('checked', false);
        $('input[id="2ndsubcategory"]').prop('checked', false);
        $('input[id="gender"]').prop('checked', false);
        $('input[id="color"]').prop('checked', false);
        $('input[id="brand"]').prop('checked', false);
        $('input[id="material"]').prop('checked', false);
        $('input[id="description"]').prop('checked', false);
        $('input[id="price"]').prop('checked', false);
        $('input[id="oldprice"]').prop('checked', false);
        $('input[id="pricesStartFrom"]').prop('checked', false);
        $('input[id="energylabel"]').prop('checked', false);
        $('input[id="pricePerUnit"]').prop('checked', false);
        $('input[id="shippingcosts"]').prop('checked', false);
        $('input[id="shippingtime"]').prop('checked', false);
        $('input[id="size"]').prop('checked', false);
        $('input[id="filters"]').prop('checked', false);
        $('input[id="ImageURL"]').prop('checked', false);
        $('input[id="AuxImageURL"]').prop('checked', false);
        $('input[id="DeepURL"]').prop('checked', false);
        //==========================================================second column 
        $('input[class="encoding"]').prop('checked', false);
        $('input[class="feedstructure"]').prop('checked', false);
        $('input[class="articlenumber"]').prop('checked', false);
        $('input[class="productname"]').prop('checked', false);
        $('input[class="maincategory"]').prop('checked', false);
        $('input[class="subcategory"]').prop('checked', false);
        $('input[class="2ndsubcategory"]').prop('checked', false);
        $('input[class="gender"]').prop('checked', false);
        $('input[class="color"]').prop('checked', false);
        $('input[class="brand"]').prop('checked', false);
        $('input[class="material"]').prop('checked', false);
        $('input[class="description"]').prop('checked', false);
        $('input[class="price"]').prop('checked', false);
        $('input[class="oldprice"]').prop('checked', false);
        $('input[class="pricesStartFrom"]').prop('checked', false);
        $('input[class="energylabel"]').prop('checked', false);
        $('input[class="pricePerUnit"]').prop('checked', false);
        $('input[class="shippingcosts"]').prop('checked', false);
        $('input[class="shippingtime"]').prop('checked', false);
        $('input[class="size"]').prop('checked', false);
        $('input[class="filters"]').prop('checked', false);
        $('input[class="ImageURL"]').prop('checked', false);
        $('input[class="AuxImageURL"]').prop('checked', false);
        $('input[class="DeepURL"]').prop('checked', false);
        //==========================================================third column
        $("#selectArticlenumber").val("yes");
        $("#selectProductname").val("yes");
        $("#selectMaincategory").val("yes");
        $("#selectSubcategory").val("yes");
        $("#select2ndsubcategory").val("yes");
        $("#selectGender").val("yes");
        $("#selectColor").val("yes");
        $("#selectBrand").val("yes");
        $("#selectMaterial").val("yes");
        $("#selectDescription").val("yes");
        $("#selectPrice").val("yes");
        $("#selectOldprice").val("yes");
        $("#selectPricesStartFrom").val("yes");
        $("#selectEnergylabel").val("yes");
        $("#selectPricePerUnit").val("yes");
        $("#selectShippingcosts").val("yes");
        $("#selectShippingtime").val("yes");
        $("#selectSize").val("yes");
        $("#selectFilters").val("yes");
        $("#selectImageURL").val("yes");
        $("#selectAuxImageURL").val("yes");
        $("#selectDeepURL").val("yes");
    }
}
const program = new UserActions();