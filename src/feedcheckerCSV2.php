<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
include('common-functions.php');
$msg_id = 0;

echo "<strong>Log:</strong><br>";
ini_set('display_errors', 0);

sendMsg("setting provided Data", $msg_id);
$feedURL = $_POST['feedURL'];
$transferDelimiter = $_POST['delimiter'];
$transferCharset = $_POST['charset'];
$transferEnclosure = $_POST['enclosure'];
?>



<?php
$feedURL = $_POST["feedURL"];

$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=>"Accept-language: en\r\n" .
              "Cookie: foo=bar\r\n"
  )
);



//echo "<hr>";
sendMsg("Downloading...", $msg_id);
$context = stream_context_create($opts);
$handle = fopen($feedURL, "r");
//phpinfo();
$handler = fopen($feedURL, "r");
$tester = fgets($handler,5);
//fclose($handler);

sendMsg("detecting compression", $msg_id);
$feed = detectCompression($feedURL,$tester);

if ($transferCharset == "utf8"){
	$feed = utf8_encode($feed)."\n";
	//echo $sample;
}else if ($transferCharset == "ISO-8859-1"){
	$encoding = mb_convert_encoding($feed, "UTF-8", mb_detect_encoding($feed, "UTF-8, ISO-8859-1, ISO-8859-15", true));
	$feed = $encoding;
}else if ($transferCharset == "windows-1252"){
	$encoding = mb_convert_encoding($feed, "UTF-8", mb_detect_encoding($feed, "UTF-7", true));
	echo $encoding;
}else{
	
}
$array = explode("\n", $feed);
$firstLine = $array[0];
$secondline = $array[1];

/* Test Feeds
http://www.nylons-strumpfhosen-shop.de/affili.csv

http://raw.githubusercontent.com/okfn/datapipes/master/test/data/gla.csv

Comma
http://slf24.de/slf24de.csv

Semicolon
https://www.eleganteinrichten.de/Ladenzeile/LadenzeileArtikelDatenExport.csv

Pipe
https://www.escora-dessous.de/export/ladenzeile-de.csv

Charset Issues
https://get.cpexp.de/gU0fAzClXgFtgEuqRXNKibhslteEPXaKoz9QS-xYxmu31gzyzHnR00Csau069dw3/maciagoffroad_ladenzeilede.csv
*/


//-----------------------------------------------------detect Delimiter END
//echo "<hr>";
if ($transferDelimiter == "auto"){
	
	$delimiterComma = substr_count($feed,',');
	//echo "Amount of Values for Delimiter: Comma(,) : ". substr_count($feed,',') ."<br>";
	$delimiterSemicolon = substr_count($feed,';');
	//echo "Amount of Values for Delimiter: Semicolon(;) : ". substr_count($feed,';') ."<br>";
	$delimiterPipe = substr_count($feed,'|');
	//echo "Amount of Values for Delimiter: Pipe(|) : ". substr_count($feed,'|') ."<br>";
	$delimiterTab = substr_count($feed,"\t");
	//echo "Amount of Values for Delimiter: Tab (  ) : ". substr_count($feed,"\t") ."<br>";
	$topDelimiter = max($delimiterComma, $delimiterSemicolon, $delimiterPipe, $delimiterTab);
	if ($topDelimiter == $delimiterComma) {
		echo "Suggested Delimiter: <strong>Comma</strong>";
		$delimiter = ",";
	} elseif ($topDelimiter == $delimiterSemicolon) {
		echo "Suggested Delimiter: <strong>Semicolon</strong>";
		$delimiter = ";";
	} elseif ($topDelimiter == $delimiterPipe) {
		echo "Suggested Delimiter: <strong>Pipe</strong>";
		$delimiter = "|";
	} elseif ($topDelimiter == $delimiterTab) {
		echo "Suggested Delimiter: <strong>Tab</strong>";
		$delimiter = "\t";
	} else {
		echo "not found";
	}
}elseif ($transferDelimiter == "pipe"){
	$delimiter = "|";
	sendMsg("using Pipe seperator", $msg_id);
}elseif($transferDelimiter == "semicolon"){
	$delimiter = ";";

}elseif($transferDelimiter == "comma"){
	$delimiter = ",";
}elseif($$transferDelimiter == "tab"){
	$delimiter = "\t";
}

if ($transferEnclosure == "double"){
	$enclosure = '"';
}elseif($transferEnclosure == "single"){
	$enclosure = "'";

}elseif($transferEnclosure == "empty"){
	$enclosure = "";
}
echo "<br>";
echo "Your provided url is <strong> $feedURL </strong><br>";
echo "Your provided Delimiter is: <strong> ".$delimiter."</strong> <br>";
echo "Your Charset is: <strong> $transferCharset </strong><br>";
echo "Your Enclosure is: <strong> $enclosure </strong><br>";

echo "<strong><u>First Line Feed: </u></strong><br>".$firstLine;
echo "<br>";
echo "<strong><u>Second Line Feed: </u></strong><br>".$secondline;
echo "<br>";
//-----------------------------------------------------set feed Data into CSV Data BEGIN

sendMsg("create Table", $msg_id);
$csvData = $feed;

$Data = str_getcsv($csvData, "\n",$enclosure); //parse the rows 
foreach($Data as &$Row) $Row = str_getcsv($Row, $delimiter); //parse the items in rows
$maxData = sizeof($Data);
$maxRow = sizeof($Row);

$Data2 = str_getcsv($csvData, "\n",$enclosure); //parse the columns 
foreach($Data2 as &$Column) $Column = str_getcsv($Column, $delimiter); //parse the items in rows


$lines = explode("\n", $csvData);
$array = array();
foreach ($lines as $line) {
    $array[] = str_getcsv($line);
}
//echo "<hr>";
$teile = explode($delimiter, $feed);
$maxTeile = sizeof($teile);
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