<html>
<head>
    <title>Feed Detective by Visual Meta</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="description" content="Just a simple tool to convert CSV&amp;XML Files into HTML Tables and evaluate them!" />
    <meta name="keywords" content="VisualMeta,is,the,best">
    <meta name="author" content="Christopher Eckardt">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base target="_top">
    <link rel="shortcut icon" href="http://crisscrosscrass.epizy.com/feed.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script type="text/javascript" src="CCC.js?v=<?php echo filemtime('CCC.js') ?>"></script>
    <script type="text/javascript" src="UIButtons.js?v=<?php echo filemtime('UIButtons.js') ?>"></script>
    <script type="text/javascript" src="ValidateAndPreview.js?v=<?php echo filemtime('ValidateAndPreview.js') ?>"></script>
    <script type="text/javascript" src="SampleItems.js?v=<?php echo filemtime('SampleItems.js') ?>"></script>
    <script type="text/javascript" src="generateSuggestions.js?v=<?php echo filemtime('generateSuggestions.js') ?>"></script>
    <script type="text/javascript" src="reply.js"></script>
    <script type="text/javascript" src="clusterize.js"></script>
    <link rel="stylesheet" type="text/css" href="CCC.css?v=<?php echo filemtime('CCC.css') ?>" />
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Raleway" />
    <link href='https://fonts.googleapis.com/css?family=Raleway:800' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Raleway:100' rel='stylesheet' type='text/css'>
    <style type="text/css">
        :root [href^="http://adfarm.mediaplex.com/"] {
            display: block !important;
        }
    </style>
</head>

<body>
    <?php
/*
*
*
*
*
/
// Example CSV File for later tests http://raw.githubusercontent.com/okfn/datapipes/master/test/data/gla.csv
// or this one: ftp://ftp-11208-153387386:35790b38@ftp.semtrack.de/153387386.11208.csv
// nested XML Feed http://www.orsay.com/media/export/google_shopping/google_shopping_cs-cz.xml

/* zip file 
*#######################################################################
*
*https://get.cpexp.de/NEOtLnVxzbQmGeXODm_vd_Ow3d0T13o8ZWkppz3dWzrIkGf2TgqPco_HWm_WtAO6/moebelwohnbar_ladenzeilede.csv
*
*http://productdata-download.affili.net/affilinet_products_4932_480311.zip?auth=b7qBQNW1I1iIlearKG4s&type=CSV
*
**#######################################################################
*/
?>
        <div class="containerheader">
            <div class="header"></div>
            <div id="logoholder">
                <a onclick="window.location.href='.'"><img src="FDLogo.svg"></a>
            </div>
            <div class="title">
                <h1></h1></div>
        </div>

        <div class="buttonwrapper">
            <div class="button" id="crossSign" onclick="OpenCloseMainMenu()">
                <div class="buttonbackground"><img src="mainmenu.svg" class="bar1"></div>
            </div>
        </div>
        <div id="quicklinkswrapper">
            <div id="quicklinkSection">
                <div class="buttontoolbackground">
                    <a href="https://bi.visual-meta.com/spotfire/wp/render/7thju8D2MkIV8ADgR2/analysis?file=/Tech%20Ops%20Dashboards/V2.1%20-%20Sync&waid=C8iubHgVWUSNR3ryMc0jm-0621041c5a7Pi4&wavid=0" target="_blank"><img src="spotfire.svg"></a>
                </div>
                <div class="buttontoolbackground">
                    <a href="https://backoffice.ladenzeile.de/#tab=sync-tool" target="_blank"><img src="synchelper.svg"></a>
                </div>
                <div class="buttontoolbackground">
                    <a href="https://www.w3schools.com/xml/xml_validator.asp" target="_blank"><img src="xml.svg"></a>
                </div>
                <div class="buttontoolbackground">
                    <a href="https://visualmeta.atlassian.net/wiki/spaces/QM/pages/309035012/Feed+Detective" target="_blank"><img src="confluence.svg"></a>
                </div>
                <div class="buttontoolbackground">
                    <a href="https://visualmeta.atlassian.net/secure/BrowseProjects.jspa" target="_blank"><img src="jira.svg"></a>
                </div>
                <div class="buttontoolbackground">
                    <a href="https://login.salesforce.com" target="_blank"><img src="salesforce.svg"></a>
                </div>
            </div>

        </div>
        <div class="buttonToolwrapper">
            <div class="buttonTool" id="toolSign" onclick="toolSign()">
                <div class="toolbuttonbackground"><img src="tools.svg" class="bar4"></div>
            </div>
        </div>
        <div class="containermenu">
            <br>

            <form id="my_form" method="post">
                <div id="menu">

                    <div class="menuwrapper">
                        <input type="text" id="feedURL" name="feedURL" placeholder="Feed URL">
                        <div class="menu">
                            <div id="submit1" class="buttonContainerCSV">
                                <p class="right"><span class="tooltip">&#9432;<span class="tooltiptext">supports any text-based files like csv or txt</span></span>
                                </p>
                                <p class="left">analyze</p>
                                <p class="middle">CSV</p>
                            </div>
                            <div id="submit2" class="buttonContainerXML">
                                <p class="right"><span class="tooltip">&#9432;<span class="tooltiptext">supports only valid XML files</span></span>
                                </p>
                                <p class="left">analyze</p>
                                <p class="middle">XML</p>
                            </div>
                            <div id="callCostum2" class="buttonContainerCSVsettings">
                                <p class="right"><span class="tooltip">&#9432;<span class="tooltiptext">only setup CSV settings manually if you encounter any errors with auto-detection</span></span>
                                </p>
                                <p class="icon">
                                    <img src="settingIcon.svg"></p>
                                <p class="iconText">CSV Settings</p>
                            </div>
                            <div id="callCostum" class="buttonContainerXMLsettings">
                                <p class="right"><span class="tooltip">&#9432;<span class="tooltiptext">only setup XML nodes manually if you encounter any errors with auto-detection</span></span>
                                </p>
                                <p class="icon">
                                    <img src="settingIcon.svg"></p>
                                <p class="iconText">XML Settings</p>
                            </div>
                            <div class="settingwrapper">
                                <div id="my_inputs2" class="settingContainerCSV">
                                    <div class="settingMiddle">
                                        <span class="settingItemCSVMiddle">separator</span>
                                        <span class="settingItemCSVMiddle">charset</span>
                                        <span class="settingItemCSVMiddle">delimiter</span>
                                    </div>
                                    <div class="settingBottom">
                                        <form id="my_form4" method="post" name="delimiter">
                                            <select id="delimiter" name="delimiter" class="settingItemBottom">
                                                <option value="auto">auto</option>
                                                <option value="pipe">pipe</option>
                                                <option value="semicolon">semicolon</option>
                                                <option value="comma">comma</option>
                                                <option value="tab">tab</option>
                                            </select>
                                        </form>
                                        <form id="my_form5" method="post" name="charset">
                                            <select id="charset" name="charset" class="settingItemBottom">
                                                <option value="auto">auto</option>
                                                <option value="utf8">utf8</option>
                                                <option value="ISO-8859-1">ISO-8859-1</option>
                                                <option value="windows-1252">windows-1252</option>
                                            </select>
                                        </form>
                                        <form id="my_form6" method="post" name="enclosure">
                                            <select id="enclosure" name="enclosure" class="settingItemBottom">
                                                <option value="double">"</option>
                                                <option value="single">'</option>
                                                <option value="empty">empty</option>
                                            </select>
                                        </form>
                                    </div>
                                    <div class="settingSubmit">
                                        <input type="button" id="submit5" value="submit &amp; analyze" />
                                    </div>
                                </div>
                                <div id="my_inputs" class="settingContainerXML">
                                    <div class="settingMiddle">
                                        <span class="settingItemMiddle">root node</span>
                                        <span class="settingItemMiddle">item node</span>
                                    </div>
                                    <div class="settingBottom">
                                        <form id="my_form2" method="post" name="parentnode" class="settingItemXMLBottom">
                                            <input type="text" id="parentnode" name="parentnode" placeholder="channel.." class="settingItemMiddle">
                                        </form>
                                        <form id="my_form3" method="post" name="itemnode" class="settingItemXMLBottom">
                                            <input type="text" id="itemnode" name="itemnode" placeholder="item.." class="settingItemMiddle">
                                        </form>
                                    </div>
                                    <div class="settingSubmitXML">
                                        <input type="button" id="submit3" value="submit &amp; analyze" />
                                    </div>
                                </div>

                            </div>

                            <div id="callCostum3" class="buttonContainerUpload">
                                <p class="right"><span class="tooltip">&#9432;<span class="tooltiptext">supports any valid feed, just remember to select the correct type</span></span>
                                </p>
                                <p class="iconUpload">
                                    <img src="uploadIcon.svg"></p>
                                <p class="iconUploadText">Upload feed</p>
                            </div>
                            <div id="my_inputs3" class="settingContainerUpload">
                                <div class="uploadwrapper">
                                    Feed type is
                                    <select id="uploadFormat">
                                        <option value="csv">CSV</option>
                                        <option value="xml">XML</option>
                                    </select>
                                    <form id="uploadfile" action="" method="post" enctype="multipart/form-data">
                                        <div id="selectFile">
                                            <input type="file" name="file" id="file" required />
                                            <input type="submit" value="upload &amp; analyze" class="submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <hr class="trenner">
                    </div>
                    <div class="menuwrapper">
                        <div class="menu">
                            <div id="hidePreview" class="buttonContainerFeed">
                                <p class="right"><span class="tooltip">&#9432;<span class="tooltiptext">displays a clusterized version of the feed below</span></span>
                                </p>
                                <p class="leftFeed">feed</p>
                                <p class="middleFeed">preview</p>
                            </div>
                            <div id="PopUpTable" value="PopUpTable" class="buttonContainerPopup">
                                <p class="right"><span class="tooltip">&#9432;<span class="tooltiptext">displays the first 2000 lines of the feed in a draggable popup window</span></span>
                                </p>
                                <p class="leftFeed">display</p>
                                <p class="middleFeed">feed table</p>
                            </div>
                            <div id="mapping" value="mapping" onclick="MappingOpen()" class="buttonContainerMapping">
                                <p class="right"><span class="tooltip">&#9432;<span class="tooltiptext">adjust feed attribute mapping manually for Feed Analysis (resets feedback builder form)</span></span>
                                </p>
                                <p class="leftFeed">attribute</p>
                                <p class="middleFeed">mapping</p>
                            </div>
                            <div id="callModal" class="buttonContainerFeedPink">
                                <p class="right"><span class="tooltip">&#9432;<span class="tooltiptext">pre-filled in terms of quantity by Feed Analysis, please adjust Quality parameters</span></span>
                                </p>
                                <p class="leftFeed">feedback</p>
                                <p class="middleFeed">builder</p>
                            </div>
                        </div>
                    </div>

                    <?php 
				/*
					<input type="button" id="submit1" value="previewCSV" /><br>
				*/
				?>

                        <?php 
				/*
				<input type="button" id="submit2" value="previewXML" /><br>
				<input type="button" id="callCostum2" value="settingCSV" /><br>
				<input type="button"  id="callCostum" value="settingXML" /><br>
				<input type="button" id="callCostum3" value="Upload File" /><br>
				*/
				?>
                </div>
            </form>
            <?php 
				/*
			<div class="navi">
			<input type="button" id="hide" value="-" class="buttonfloor" /><br>
			<input type="button" id="PopUpTable" value="PopUpTable" class="buttonfloor" onclick="openTablePopUp()" /><br>
			<input type="button" id="validation" value="validate" onclick="ValidatePreview()" class="buttonfloor"/><br>
			<input type="button" id="mapping" value="mapping" onclick="MappingOpen()" class="buttonfloor"/><br>
			<input type="button" id="hidePreview" value="toggle Table" /><br>
			<input type="button" id="callModal" value="FeedChecker" class="buttonfloor"/><br>
			</div>
		*/
				?>
                <div class="backgroundmenu"></div>
        </div>
        <div id="errorstatements"></div>
        <div id="contents"></div>
        <div id="contents2"></div>
        <?php 
/*
<input id="btn-Preview-Image" type="button" value="Preview"/>
    <br/>
<h3>Preview :</h3>
<div id="previewImage">
</div>
*/
?>
            <div id="check"> </div>
            <div id="check2"> </div>
            <div id="preview" cellspacing="0" width="100%">

            </div>

            <div id="MappingWrapper" class="ui-widget-content">
                <div id="MappingSelection"></div>
                <div id="outputMapping"></div>
            </div>

            <div id="demo"></div>
            <div class="clusterize">
                <table id="ClusterExample" class="table">

                    <!— Visual headers —>
                    <thead id="clusterizeHeader">
                    </thead>
                </table>
                <div id="scrollArea" class="clusterize-scroll">
                    <table class="table">

                        <!— Hidden helper headers to keep columns width (specified by css), td’s must be empty —>

                        <tbody id="contentArea" class="clusterize-content">
                            <tr class="clusterize-no-data">

                                <!— Note colspan which forces single td to fill whole table width —>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="empty ui-widget-content">
            </div>
            <div class="empty2 ui-widget-content">
            </div>
            <div id="validateContent"></div>
            <div id="loading">
                <h1 id="dynamicLoadingContent"></h1>
                <div class="socket">
                    <div class="gel center-gel">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c1 r1">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c2 r1">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c3 r1">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c4 r1">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c5 r1">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c6 r1">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>

                    <div class="gel c7 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>

                    <div class="gel c8 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c9 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c10 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c11 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c12 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c13 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c14 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c15 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c16 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c17 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c18 r2">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c19 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c20 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c21 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c22 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c23 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c24 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c25 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c26 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c28 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c29 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c30 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c31 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c32 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c33 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c34 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c35 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c36 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>
                    <div class="gel c37 r3">
                        <div class="hex-brick h1"></div>
                        <div class="hex-brick h2"></div>
                        <div class="hex-brick h3"></div>
                    </div>

                </div>

            </div>
            <div id="loading2">
                <div id="loading2wrapper">
                    <h1>analyzing Feed Data</h1>
                    <div class="cssload-thecube">
                        <div class="cssload-cube cssload-c1"></div>
                        <div class="cssload-cube cssload-c2"></div>
                        <div class="cssload-cube cssload-c4"></div>
                        <div class="cssload-cube cssload-c3"></div>
                    </div>
                </div>
            </div>
            <div id="suggestBox" class="responseBox">
                <div class="message-box">
                    <input type="button" value="close" id="close" />
                    <input type="button" value="PopUp" id="close" onclick="openPopUp()" />
                    <div class="message_content">
                        <div id="suggestions"></div>
                    </div>
                </div>
            </div>
            <div class="modal">
                <div class="modal_bg closer2"></div>
                <div class="modal_main">
                    <p class="closer">&times;</p>
                    <div class="modal_content">
                        <h1 style="font-family:Raleway;font-size:35;margin-top:3;margin-bottom:0;padding:0">Feedback builder</h1>
                        <p style="font-family:Raleway;font-size:13px;margin:0;padding:0">(the Feed Detective needs human help: please check if the validation mapping is correct &amp; data quality is fine) </p>

                        <table id="feedbackBuilder">
                            <div class="feedchecker">

                                <tr>
                                    <th>
                                        <form class="col1">
                                            <div class="sub-entry" style="font-family:Raleway;font-weight:500;padding:5;font-size:20">Attribute</div>
                                        </form>
                                    </th>
                                    <th>
                                        <form class="col2">
                                            <div class="sub-entry" style="font-family:Raleway;font-weight:500;padding:5;font-size:20">Availability</div>
                                        </form>
                                    </th>
                                    <th rowspan="3">
                                        <form class="col3">
                                            <div class="sub-entry" style="font-family:Raleway;font-weight:500;padding:5;font-size:20">Quality &amp;
                                                <br> Coverage</div>
                                        </form>
                                    </th>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" value="encodingfeed" id="encodingfeedbuilder" checked>character set</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="encoding" class="encoding" value="flawless">flawless
                                                <input type="radio" name="encoding" class="encoding" value="other">other</div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" value="feedstructure" id="feedstructurebuilder" checked>feed structure</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="feedstructure" value="flawless" class="feedstructure">flawless
                                                <input type="radio" name="feedstructure" value="csvissues" class="feedstructure">CSV issues
                                                <input type="radio" name="feedstructure" value="xmlissues" class="feedstructure">XML issues</div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="articlenumberbuilder" checked>SKU / item number</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="articlenumber" value="yes" class="articlenumber">yes
                                                <input type="radio" name="articlenumber" value="no" class="articlenumber">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectArticlenumber">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>duplicate</option>
                                                    <option>changed</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="productnamebuilder" checked>product name</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="productname" value="yes" class="productname">yes
                                                <input type="radio" name="productname" value="no" class="productname">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectProductname">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>different language</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="maincategorybuilder" checked>main category</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="maincategory" value="yes" class="maincategory">yes
                                                <input type="radio" name="maincategory" value="no" class="maincategory">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectMaincategory">
                                                    <option>yes</option>
                                                    <option>new home snippet</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>inappropriate</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="subcategorybuilder" checked>sub category</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="subcategory" value="yes" class="subcategory">yes
                                                <input type="radio" name="subcategory" value="no" class="subcategory">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectSubcategory">
                                                    <option>yes</option>
                                                    <option>new home snippet</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>inappropriate</option>   
                                                    <option>identical</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="2ndsubcategorybuilder" checked>2nd sub category</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="2ndsubcategory" value="yes" class="2ndsubcategory">yes
                                                <input type="radio" name="2ndsubcategory" value="no" class="2ndsubcategory">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="select2ndsubcategory">
                                                    <option>yes</option>
                                                    <option>new home snippet</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>inappropriate</option>
                                                    <option>identical</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" value="gender" id="genderbuilder" checked>gender</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="gender" value="yes" class="gender">yes
                                                <input type="radio" name="gender" value="no" class="gender">no
                                                <input type="radio" name="gender" value="no-need" class="gender">no need</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectGender">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>kids inaccurate</option>
                                                    <option>only kids</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="colorbuilder" checked>color</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="color" value="yes" class="color">yes
                                                <input type="radio" name="color" value="no" class="color">no
                                                <input type="radio" name="color" value="no-need" class="color">no need</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectColor">
                                                    <option>yes</option>
                                                    <option>new home snippet</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>inappropriate</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="brandbuilder" checked>brand</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="brand" value="yes" class="brand">yes
                                                <input type="radio" name="brand" value="no" class="brand">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectBrand">
                                                    <option>yes</option>
                                                    <option>new home snippet</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="materialbuilder" checked>material</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="material" value="yes" class="material">yes
                                                <input type="radio" name="material" value="no" class="material">no
                                                <input type="radio" name="material" value="no-need" class="material">no need</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectMaterial">
                                                    <option>yes</option>
                                                    <option>new home snippet</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>inappropriate</option>
                                                    <option>too precise</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="descriptionbuilder" checked>description</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="description" value="yes" class="description">yes
                                                <input type="radio" name="description" value="no" class="description">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectDescription">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>inappropriate</option>
                                                    <option>incomplete</option>
                                                    <option>bad form</option>
                                                    <option>different language</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="pricebuilder" checked>price</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="price" value="yes" class="price">yes
                                                <input type="radio" name="price" value="no" class="price">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectPrice">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>wrong</option>
                                                    <option>with currency</option>
                                                    <option>sale price</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="oldpricebuilder" checked>old price</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="oldprice" value="yes" class="oldprice">yes
                                                <input type="radio" name="oldprice" value="no" class="oldprice">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectOldprice">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>with currency</option>
                                                    <option>wrong</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="pricesStartFrombuilder" checked>starting price</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="pricesStartFrom" value="yes" class="pricesStartFrom">yes
                                                <input type="radio" name="pricesStartFrom" value="no" class="pricesStartFrom">no
                                                <input type="radio" name="pricesStartFrom" value="no-need" class="pricesStartFrom">no need</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectPricesStartFrom">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>wrong</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="energylabelbuilder" checked>energy label</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="energylabel" value="yes" class="energylabel">yes
                                                <input type="radio" name="energylabel" value="no" class="energylabel">no
                                                <input type="radio" name="energylabel" value="no-need" class="energylabel">no need</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectEnergylabel">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="pricePerUnitbuilder" checked>base price / price per unit</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="pricePerUnit" value="yes" class="pricePerUnit">yes
                                                <input type="radio" name="pricePerUnit" value="no" class="pricePerUnit">no
                                                <input type="radio" name="pricePerUnit" value="no-need" class="pricePerUnit">no need</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectPricePerUnit">
                                                    <option>yes</option>
                                                    <option value="no">no</option>
                                                    <option value="partially">partially</option>
                                                    <option>inaccurate</option>
                                                    <option>units</option>
                                                    <option>currency missing</option>
                                                    <option>value divided</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="shippingcostsbuilder" checked>shipping costs</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="shippingcosts" value="yes" class="shippingcosts">yes
                                                <input type="radio" name="shippingcosts" value="no" class="shippingcosts">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectShippingcosts">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>wrong</option>
                                                    <option>text only</option>
                                                    <option>minimum order</option>
                                                    <option>payment method</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="shippingtimebuilder" checked>shipping time</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="shippingtime" value="yes" class="shippingtime">yes
                                                <input type="radio" name="shippingtime" value="no" class="shippingtime">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectShippingtime">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>wrong</option>
                                                    <option>out of stock</option>
                                                    <option>text only</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="sizebuilder" checked>size</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="size" value="yes" class="size">yes
                                                <input type="radio" name="size" value="no" class="size">no
                                                <input type="radio" name="size" value="no-need" class="size">no need</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectSize">
                                                    <option>yes</option>
                                                    <option>new home snippet</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>inaccurate</option>
                                                    <option>inappropriate</option>
                                                    <option>out of stock</option>
                                                    <option>price difference</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="filtersbuilder" checked>filters</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="filters" value="yes" class="filters">yes
                                                <input type="radio" name="filters" value="no" class="filters">no
                                                <input type="radio" name="filters" value="no-need" class="filters">no need</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectFilters">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="GTINbuilder" checked>GTIN / EAN</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="GTIN" value="yes" class="GTIN">yes
                                                <input type="radio" name="GTIN" value="no" class="GTIN">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectGTIN">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="ImageURLbuilder" checked>ImageURL</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="ImageURL" value="yes" class="ImageURL">yes
                                                <input type="radio" name="ImageURL" value="no" class="ImageURL">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectImageURL">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>duplicate content</option>
                                                    <option>big picture</option>
                                                    <option>small picture</option>
                                                    <option>quality</option>
                                                    <option>multiple products</option>
                                                    <option>placeholder</option>
                                                    <option>not working</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="AuxImageURLbuilder" checked>AuxImageURL</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="AuxImageURL" value="yes" class="AuxImageURL">yes
                                                <input type="radio" name="AuxImageURL" value="no" class="AuxImageURL">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectAuxImageURL">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>identical</option>
                                                    <option>big picture</option>
                                                    <option>small picture</option>
                                                    <option>quality</option>
                                                    <option>not working</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>
                                <tr>
                                    <form>
                                        <td>
                                            <div class="col1">
                                                <input type="radio" id="DeepURLbuilder" checked>DeepURL</div>
                                        </td>
                                        <td>
                                            <div class="col2">
                                                <input type="radio" name="DeepURL" value="yes" class="DeepURL">yes
                                                <input type="radio" name="DeepURL" value="no" class="DeepURL">no</div>
                                        </td>
                                        <td>
                                            <div class="col3">
                                                <select id="selectDeepURL">
                                                    <option>yes</option>
                                                    <option>no</option>
                                                    <option>partially</option>
                                                    <option>wrong</option>
                                                    <option>not working</option>
                                                </select>
                                            </div>
                                        </td>
                                    </form>
                                </tr>

                            </div>
                        </table>
                        <p style="font-family:Raleway;font-size:19;font-weight:500;left:303" id="formattingFeedbackBuilder">language
                            <select id="language">
                                <option>EN</option>
                                <option>DE</option>
                                <option>NL</option>
                                <option>FR</option>
                                <option>IT</option>
                                <option>ES</option>
                                <option>BR</option>
                                <option>PL</option>
                                <option>HU</option>
                                <option>SK</option>
                                <option>CZ</option>
                                <option>FI</option>
                            </select>
                            <input type="button" id="Jira" value="display feedback" />
                        </p>
                    </div>

                </div>
</body>

</html>
