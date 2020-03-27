const userActions = new UserActions();
var table;
var checkingState = false;
let waitingStatement = 0;
var allNames = ["SKU", "Name", "Price", "Description", "Image", "DeepURL", "Top_Category", "Category", "Category_2", "Old_Price", "Base_Price", "Gender", "Brand", "Sizes", "Color", "CPC", "Material", "ShippingCost", "DeliveryTime", "AuxImage", "EnergyLabel", "mCPC", "GTIN"];
var allNamesLength = allNames.length;
var MappingArray = [];
var HeaderArray = [];
var NewMappingArray = [];
var percentArray = [];
var duplicatesArray = [];
var duplicatesPercentArray = [];
var emptyCellsArray = [];
var DuplicateImageSamplesArray = [];
var DuplicateDeepLinkSamplesArray = [];
var validateNew = false;
// was used to fill a second Report into #Content2
var schalter = false;
// check PressedKey condition to prevent show/hide errros
var checkedKey = false;
var feed2;
if (typeof maxSamples == "undefined") {
    var maxSamples = 10;
}
function showLog() {
    $("#logStatement").fadeToggle("slow");
}
function showTableLog() {
    $("#contents").slideToggle("slow");
    //$(".ui-resizable-handle").slideToggle("slow");
}
function replacecarriage(string) {
    var t = string.replace(/\s+/g, ' ').trim();
    return t;
}
function INTERRUPTED(errorMessage) {
    console.log("can't read the table");
    var text;
    switch (errorMessage) {
        case 1:
            text = 'Please enter your valid feed url into the field "InsertFeedURL..." or use the "UploadFile" button and choose the correct format either CSV or XML';
            break;
        case 2:
            text = "There was an error processing your feed url. Please check if the provided url is available and accessable and then please try again." + "<br>" + "<strong>" + "Remember: " + "</strong>" + "choose the correct format either CSV or XML!" + "<br>" + "<strong>" + "Hint: " + "</strong>" + "Sometimes the feed detective is blocked by the external server, you can download the feed manually and upload the feed via the uploadFile button!";
            break;
        case 3:
            text = 'It seems like the feed detective could not read the whole feed, either because its really empty or the feed was loaded wrong' + '<br>' + '<strong>' + 'Remember: ' + '</strong>' + 'choose the correct format either CSV or XML!' + '<br>' + '<strong>' + 'Hint: ' + '</strong>' + 'If the feed was wrongly loaded and you need to specificy some settings check out the <input type="button" value="LOG" onclick="showTableLog()"/> <- CLICK HERE <br><i>e.g. for xml feeds may you need to set "XML Root Node"(mostly 1st Level xml Nodes in the log) &amp; "XML Item Node"(mostly one of the 2nd Level xml Nodes in the log) manually!</i>';
            break;
        default:
            text = 'The feed detective could not find at least 4 Attributes, you can try to change the mapping via Mapping Attribute' + '<br>' + '<strong>' + 'Remember: ' + '</strong>' + 'choose the correct format either CSV or XML!' + '<br>' + '<strong>' + 'Hint: ' + '</strong>' + 'It can also happen the feed was wrongly loaded and you need to specificy some settings e.g. wrong charset, wrong parent node etc. check out the <input type="button" value="LOG" onclick="showTableLog()"/> <- CLICK HERE, if neccessary';
    }
    document.getElementById("errorstatements").innerHTML = text;
    $("#errorstatements").slideDown("slow");
}
function FIXEDINTERRUPTED() {
    //console.log("found values");
    document.getElementById("contents").innerHTML == "";
    waitingStatement = 0;
    $("#contents").fadeOut("fast");
    $("#errorstatements").fadeOut("fast");
}
function clearAllArrays() {
    document.getElementById('dynamicLoadingContent').innerHTML = "";
    checkingState = false;
    userActions.resetTemplate();
    FIXEDINTERRUPTED();
    MappingArray = [];
    HeaderArray = [];
    NewMappingArray = [];
    percentArray = [];
    duplicatesArray = [];
    duplicatesPercentArray = [];
    emptyCellsArray = [];
    DuplicateImageSamplesArray = [];
    DuplicateDeepLinkSamplesArray = [];
}
function getNamingAttribute(value) {
    let selection = {
        0: "SKU",
        1: "Name",
        2: "Price",
        3: "Description",
        4: "Image",
        5: "Deep URL",
        6: "Category",
        7: "Subcategory",
        8: "Subcategory 2",
        9: "Old Price",
        10: "Base Price",
        11: "Gender",
        12: "Brand",
        13: "Size",
        14: "Color",
        15: "CPC",
        16: "Material",
        17: "Shipping",
        18: "Availability",
        19: "AuxImage",
        20: "Energy Label",
        21: "mCPC",
        22: "GTIN",
        "default": "notInList"
    }
    return (selection[value] || selection['default']);
}
function getWaitingInfo(value) {
    let selection = {
        0: "..takes longer..",
        10: "..but still running..",
        20: "..Hmm..",
        30: "I know I know",
        40: "..running...",
        50: "..big data...",
        60: "...",
        "default": "..processing.."
    }
    return (selection[value] || selection['default']);
}
$(document).ready(function () {
    // make stuff draggable
    $("#MappingWrapper").draggable();
    $(".modal_main").draggable();
    // Add Eventlistener
    // buttons
    $('#submit1').click(function (e) {
        new AnalyzeCSV(e);
    });
    $('#submit2').click(function (e) {
        new AnalyzeXML(e);
    });
    $('#submit3').click(function (e) {
        new SettingsAndAnalyzeXML(e);
    });
    $('#submit5').click(function (e) {
        new SettingsAndAnalyzeCSV(e);
    });
    $("#uploadfile").on('submit', (function (e) {
        var uploadCheck = document.getElementById("uploadFormat").value;
        data = new FormData(this);
        if (uploadCheck == "csv") {
            new UploadCSV(e, data)
        } else {
            new UploadXML(e, data)
        }
    }));
    $('#crossSign').click(function () {
        userActions.OpenCloseMainMenu();
    });
    $('#hidePreview').click(function () {
        userActions.OpenCloseMainMenu();
        new FeedPreview();
    });
    $('#PopUpTable').click(function () {
        userActions.OpenCloseMainMenu();
        new DisplayFeedTableViaPopUp();
    });
    $('#mapping').click(function () {
        userActions.OpenCloseMainMenu();
        new DisplayFeedTableViaPopUp();
        new AttributeMapping();
        $("#MappingWrapper").toggle();
    });
    $('#callCostum').click(function () {
        userActions.OpenXMLSettings();
    });
    $('#callCostum2').click(function () {
        userActions.OpenCSVSettings();
    });
    $('#callCostum3').click(function () {
        userActions.OpenUploadFeedSettings();
    });
    $('#callModal').click(function () {
        userActions.OpenCloseMainMenu();
        userActions.OpenFeedbackBuilder();
        checkedKey = true;
    });
    $('.closer').click(function () {
        userActions.CloseFeedbackBuilder();
        checkedKey = false;
    });
    $('.closer2').click(function () {
        userActions.CloseFeedbackBuilder();
        checkedKey = false;
    });
    $('#Jira').click(function () {
        ;
        generateSuggestions();
        openPopUp();
    });
    $('.buttonToolwrapper').click(function () {
        $("#quicklinkswrapper").fadeToggle("slow");
    });
    // ESC Button for Modal Template
    document.onkeyup = function (event) {
        var key_press = String.fromCharCode(event.keyCode);
        //var key_code = event.keyCode;
        //console.log(key_press);
        //console.log(key_code);
        //document.getElementById("KP").innerHTML = key_press;
        //document.getElementById("KC").innerHTML = key_code;
        if (checkedKey == false) {
            if (key_press == "") {
                userActions.OpenFeedbackBuilder();
                checkedKey = true;
            }
        } else {
            if (key_press == "") {
                userActions.CloseFeedbackBuilder();
                checkedKey = false;
            }
        }
    }
});
function toolSign() {
    var toolSign = document.querySelector("#toolSign");
    toolSign.classList.toggle("change");
}
function setMaxSampleItems(number) {
    maxSamples = number;
    return maxSamples;
}
function createAndAdjustSampleItems(maxSamples) {
    var InputSampleField = document.getElementById('InputSampleField');
    maxSamples = setMaxSampleItems(InputSampleField.value);
    // createSampleItems(maxSamples)
    new SampleItems(maxSamples);
}
/*============================================================================================================================
==============================================================================================================================
======================================PopUp Window take Content into new Window ==============================================
==============================================================================================================================
==============================================================================================================================*/
function openPopUp() {
    var divText = document.getElementById("suggestions").outerHTML;
    var myWindow = window.open('  ', 'Suggestions', 'location=no,toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=800,height=800');
    var doc = myWindow.document;
    doc.open();
    myWindow.document.write('<html><head><title>Feedback</title><link rel="stylesheet" type="text/css" href="CCC.css"></head><body>');
    doc.write(divText);
    doc.close();
}
/*============================================================================================================================
==============================================================================================================================
======================================PopUp Window take Content into new Window ENDS==========================================
==============================================================================================================================
==============================================================================================================================*/
// Set Mapping Data to evalute Table by Hand
function MappingOpen() {

}
function MappingClose() {
    $("#MappingWrapper").toggle();
}
function showLoadingAnalyze() {
    document.getElementById("loading2").style.display = "block";
    $(document).ready(function () {
        $('#loading2').show();
    });
}
function MappingValidate() {
    showLoadingAnalyze();
    var delayInMilliseconds = 500;
    setTimeout(function () {
        $(document).ready(function () {
            //document.getElementById("outputMapping").innerHTML += "new check";
            userActions.resetTemplate();
            //============================================================encoding feed structure = flawless
            $('input[id="encodingfeed"]').prop('checked', true);
            $("input[class=encoding][value='flawless']").prop("checked", true);
            $('input[id="feedstructure"]').prop('checked', true);
            $("input[class=feedstructure][value='flawless']").prop("checked", true);
            validateNew = true;
            maxSamples = document.getElementById("InputNumberField").value;
            for (i = 0; i < allNames.length; i++) {
                var checkgetMappingValue = document.getElementById(allNames[i]);
                if (checkgetMappingValue != null) {
                    var getMappingValue = document.getElementById(allNames[i]).value;
                    NewMappingArray[i] = getMappingValue;
                    //console.log(NewMappingArray);
                } else {
                    //console.log("nothing");
                }
            }
            //ValidatePreview();
            new ValidateAndPreview(maxSamples);
            $(document).ready(function () {
                $('#loading2').hide();
            });
        });
    }, delayInMilliseconds);
    validateNew = false;
}
function setMapping() {

}
// hiding content part 
$(document).ready(function () {
    $(".empty")
        .wrap('<div/>')
        .css({
            'overflow': 'hidden'
        })
        .parent()
        .css({
            'display': 'inline-block',
            'overflow': 'hidden',
            'height': function () {
                return $('.empty', this).height();
            },
            'width': function () {
                return $('.empty', this).width();
            },
            'paddingBottom': '12px',
            'paddingRight': '12px'
        }).resizable()
        .find('.empty')
        .css({
            overflow: 'auto',
            width: '100%',
            height: '100%'
        });;
    $(".empty2")
        .wrap('<div/>')
        .css({
            'overflow': 'hidden'
        })
        .parent()
        .css({
            'display': 'inline-block',
            'overflow': 'hidden',
            'height': function () {
                return $('.empty2', this).height();
            },
            'width': function () {
                return $('.empty2', this).width();
            },
            'paddingBottom': '12px',
            'paddingRight': '12px'
        }).resizable()
        .find('.empty2')
        .css({
            overflow: 'auto',
            width: '100%',
            height: '100%'
        });;
});
$(document).ready(function () {
    $("#contents").slideToggle("slow");
    $("#quicklinkswrapper").css('display', 'flex').fadeOut(1);
    $(".ui-resizable-handle").slideToggle("slow");
    userActions.OpenCloseMainMenu();
});

/*================================================================================
add listener to samples get Number from table and show AuxImages - not needed for now
==================================================================================
*/
/*================================================================================
add listener to URL Field to get the FileSize removed because checking and loading at the same time blocked sever
==================================================================================
*/
/*================================================================================
add screenshot function  html2canvas						removed because Screenshot looked like blurred
==================================================================================
*/
/*================================================================================
clusterize Table - removed its not needed and used at all
==================================================================================*/