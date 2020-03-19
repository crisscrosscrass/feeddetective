<?php
/*

Test Feeds -------------------------------------------------
http://www.nylons-strumpfhosen-shop.de/affili.csv

http://raw.githubusercontent.com/okfn/datapipes/master/test/data/gla.csv

Comma
http://slf24.de/slf24de.csv

Semicolon
https://www.eleganteinrichten.de/Ladenzeile/LadenzeileArtikelDatenExport.csv

Pipe
https://www.escora-dessous.de/export/ladenzeile-de.csv

---
Charset Issues
https://get.cpexp.de/gU0fAzClXgFtgEuqRXNKibhslteEPXaKoz9QS-xYxmu31gzyzHnR00Csau069dw3/maciagoffroad_ladenzeilede.csv

----------------------------------------------------------------------------

*/
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
include('common-functions.php');
$msg_id = 0;

?>
<div id="logStatement">
<?php

/*
error_reporting(~0);
ini_set('display_errors', 1);
*/
echo "<strong>Log:</strong><br>";
sendMsg("Downloading...", $msg_id);
$feedURL = $_POST["feedURL"];
echo "Your provided url is <strong> $feedURL </strong><br>";

/*
$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>"Accept-language: en\r\n" .
              "Cookie: foo=bar\r\n"
  )
);
*/
$opts = array(
  'http'=>array(
    'method'=>"POST",
    'header'=>
      "Accept-language: en\r\n".
      "Content-type: application/x-www-form-urlencoded\r\n",
    'content'=>http_build_query(array('foo'=>'bar'))
  )
);


sendMsg("reading Raw Feed Data", $msg_id);
$context = stream_context_create($opts);
$handle = fopen($feedURL, "r");


//phpinfo();
$handler = fopen($feedURL, "r");
$tester = fgets($handler,5);
//fclose($handler);


sendMsg("detecting compression", $msg_id);
$feed = detectCompression($feedURL,$tester);


sendMsg("detecting Charset", $msg_id);
$array = explode("\n", $feed);
$firstLine = $array[0];
$secondline = $array[1];
//-----------------------------------------------------detect Charset BEGIN
//echo "<h2>Different charset on provided Feed </h2>";
$string = $array[0];
echo "Autodetection Charset: " . mb_detect_encoding($string,"auto","not found") . "<br>";
echo "<br>";


sendMsg("detecting seperator", $msg_id);
echo "<strong><u>First Line Feed: </u></strong><br>".strip_tags($firstLine);
echo "<br>";
echo "<strong><u>Second Line Feed: </u></strong><br>".strip_tags($secondline);
echo "<br>";
$delimiter = detectDelimiter($feed);
echo "<br>";

sendMsg("create Table", $msg_id);
$csvData = $feed;

$Data = str_getcsv($csvData, "\n",'"'); //parse the rows 
foreach($Data as &$Row) $Row = str_getcsv($Row, $delimiter); //parse the items in rows
$maxData = sizeof($Data);
$maxRow = sizeof($Row);

$Data2 = str_getcsv($csvData, "\n",'"'); //parse the columns 
foreach($Data2 as &$Column) $Column = str_getcsv($Column, $delimiter); //parse the items in rows


$lines = explode("\n", $csvData);
$array = array();
foreach ($lines as $line) {
    $array[] = str_getcsv($line);
}
//echo "<hr>";
$maxLines = sizeof($lines);
$maxColumns = sizeof($Column);

?>
</div>
<div id="providedFeedTableContainer">
	<div id="tableHeader">
	<h1> Preview Sheet <span id="greenBG">CSV</span> based on Provided URL </h1>
</div>


<table id="FeedTable" class="display" cellspacing="0" width="100%">
<?php
$count = array();  // create an empty array
$maxLines-=1;
//-----------------------------------------------------set Table BEGIN

$loopcount = 0;



	foreach($Data as $key => $val){
   
		if ($loopcount < 1) {
			echo "<tr>";			
			
			foreach($val as $k=> $v){ 		// $v is string.
				echo "<th>";			
				echo strip_tags($v);
				echo"</th>";
				} 
			echo"</tr>";
			$loopcount++;
			
			} 
		else {
			echo "<tr>";
	  
				foreach($val as $k=> $v){ 		// $v is string. 
				echo "<td>";
				echo strip_tags($v);
				echo "</td>"; 
				} 
	
			echo"</tr>";
	}
	
	
	
}


?>
</table>
</div>
</body>
</html>