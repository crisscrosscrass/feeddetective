<?php
/*
error_reporting(~0);
ini_set('display_errors', 1);
*/
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");

include('common-functions.php');
$msg_id = 0;

echo "<strong>Log:</strong><br>";
sendMsg("Uploading...", $msg_id);


$file = $_FILES['file']['tmp_name'];
$fileName = $_FILES['file']['name'];
$fileType = $_FILES['file']['type'];
$fileError = $_FILES['file']['error'];


echo "Filename: ";
print_r($fileName);
echo "<br>";


// ===========================================================
echo '<div id="logStatement">';
//phpinfo();
echo "Filelocation: ";
print_r($file);
echo "<br>";
echo "Filetype: ";
print_r($fileType);
echo "<br>";



//function to get the remote data


$uploadUrl = $_SERVER['REQUEST_URI'].$file."/".$fileName.'<br/>';
echo '<p><font color="#ff0000" size="4">'.$uploadUrl.'</font></p>';

$post = array(
	'extra_info' => '123456',
	'file_contents' => file_get_contents($_FILES['file']['tmp_name'])
);



//print_r($post['file_contents']);
//print_r("<br/>");
$feed = $post['file_contents'];

// ============================================================
sendMsg("reading Raw Content Data", $msg_id);

/*
$context = stream_context_create();
$feed = file_get_contents($_FILES['file']['tmp_name'], false, $context);

if ($feed === FALSE) {
   die("Error reading file $filename");
}
*/




sendMsg("detecting compression", $msg_id);

$handle = fopen($_FILES['file']['tmp_name'], "r");
$tester = fgets($handle,5);
fclose($handle);
if( strpos($tester, 'Rar') !== false){
	echo "detect rar file \n";
	
}else if(strpos($tester, 'PK') !== false){

	echo ("detect zip file \n");
	
	$zip = zip_open($_FILES['file']['tmp_name']);
	$entry = zip_read($zip);
	zip_entry_open($zip,$entry,"r");
	$feed = zip_entry_read($entry,zip_entry_filesize($entry));

	
}else if(mb_strpos($tester, "\x1f" . "\x8b" . "\x08", 0, "US-ASCII") !== false){

	echo ("detect gz file \n");
	$z = gzopen($_FILES['file']['tmp_name'],'r') or die("can't open: $php_errormsg");
	$string = '';

    while ($line = gzgets($z,1024)) {
        $string .= $line;
    }

    $feed = $string;

    gzclose($z) or die("can't close: $php_errormsg");
	
}else{
	
}
//echo "<hr>";
$array = explode("\n", $feed);
$firstLine = $array[0];
$secondline = $array[1];
//-----------------------------------------------------detect Charset BEGIN
sendMsg("detecting Charset", $msg_id);



//echo "<h2>Different charset on provided Feed </h2>";
$string = $firstLine;
echo "Autodetection Charset: " . mb_detect_encoding($string,"auto","not found") . "<br>";
/*

Test Feeds -------------------------------------------------
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

echo "UTF-8 Encoding:::::::::::::::::::::: <br>";
echo utf8_encode($string)."\n";
echo "<br>";
echo "<hr>";
*/


sendMsg("detecting seperator", $msg_id);

echo "<strong><u>First Line Feed: </u></strong><br>".strip_tags($firstLine);
echo "<br>";
echo "<strong><u>Second Line Feed: </u></strong><br>".strip_tags($secondline);
echo "<br>";
//echo "<br>";

//echo "<br>";
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
//echo "<br>";
//echo "<br>";


//-----------------------------------------------------detect Delimiter END
//echo "<hr>";

//-----------------------------------------------------set feed Data into CSV Data BEGIN

sendMsg("create Table", $msg_id);

$csvData = $feed;

// str_getcsv ( string $input [, string $delimiter = "," [, string $enclosure = '"' [, string $escape = "\\" ]]] ) : array
$Data = str_getcsv($csvData, PHP_EOL);
//$Data = str_getcsv($csvData, PHP_EOL,'"'); //parse the rows 



foreach($Data as &$Row) $Row = str_getcsv($Row, $delimiter); //parse the items in rows

$maxData = sizeof($Data);
$maxRow = sizeof($Row);

$Data2 = str_getcsv($csvData, PHP_EOL,'"'); //parse the columns 
foreach($Data2 as &$Column) $Column = str_getcsv($Column, $delimiter); //parse the items in rows


$lines = explode(PHP_EOL, $csvData);
$array = array();
foreach ($lines as $line) {
    $array[] = str_getcsv($line);
}
//echo "<hr>";
$teile = explode($delimiter, $feed);
$maxTeile = sizeof($teile);
$maxLines = sizeof($lines);
$maxColumns = sizeof($Column);
/*

echo "<hr>";
echo $maxData;
echo $maxRow;
echo "<h1>Data Sring Array[0][1]</h1>";
echo "<hr>";
print_r($Data[0][1]);

echo "<hr>";
echo $maxTeile;
echo $maxLines;
echo "<h1>Data Explode Array[1]</h1>";
echo "<hr>";
print_r($teile[1]);

echo "<br>";
echo "<hr>";
*/
?>
</div>
<div id="providedFeedTableContainer">
<div id="tableHeader">
<h1> Preview Sheet <span id="greenBG">CSV</span> based on Provided URL </h1>
<?php
/*
echo $teile[0]; // Teil1
echo $teile[1]; // Teil2
echo $teile[2]; // Teil3
echo $teile[3]; // Teil4
echo "<hr>";
echo "<hr>";
*/
//-----------------------------------------------------set feed Data into CSV Data END
?>
</div>
<?php


//-----------------------------------------------------set From Values BEGIN

/*
print_r ($Data2);	

*/
$count = array();  // create an empty array
foreach($Data2 as $arr) {  
        $key2 = array_keys($arr); 
        $count[$key2[0]]++;
    }
$maxLines = $count[0];
$maxColumns = count($Data2[0]);



for ($i = 0; $i < $maxColumns; $i++){ // need the max Number for Data2[][this] or Splitted Columns
	echo "<select>";
	for ($j = 0; $j < $maxLines; $j++){
		echo "<option>".$Data2[$j][$i]."</option>"; 
	}
	echo "</select>";
}

//-----------------------------------------------------set From Values end

?>

<table id="FeedTable" class="display" cellspacing="0" width="100%">
<?php
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





//------------------Testing Purpuses-----------------------------------set Table BEGIN
/*$i=0;

	while($i< $maxLines){
		echo  $lines[$i]."<br>".PHP_EOL;
		$i++;
	}

foreach ($line as $line){
	echo "<tr>";
	foreach ($line as $teile){
		echo "<td>$teile</td>";
	}
	echo "</tr>
}

*/
//-----------------------------------------------------set Table END

?>
</table>
</div>



