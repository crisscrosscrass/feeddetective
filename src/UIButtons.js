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
        OpenCloseMainMenu();
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
        OpenCloseMainMenu();
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
class UserActions{
    constructor(){
    }
    OpenXMLSettings(){
        $("#my_inputs2").fadeOut();
        $("#my_inputs3").fadeOut();
        $("#my_inputs").slideToggle("slow");
    }
    OpenCSVSettings(){
        $("#my_inputs").fadeOut();
        $("#my_inputs3").fadeOut();
        $("#my_inputs2").slideToggle("slow");
    }
    OpenUploadFeedSettings(){
        $("#my_inputs2").fadeOut();
        $("#my_inputs").fadeOut();
        $("#my_inputs3").slideToggle("slow");
    }
    OpenFeedbackBuilder(){
        OpenCloseMainMenu();
        $(".modal").fadeIn();
        $(".modal_main").show();
    }
    CloseFeedbackBuilder(){
        $(".response").fadeOut();
        $(".responseBox").fadeOut();
        $(".modal").fadeOut();
        $(".modal_main").fadeOut();
    }
}