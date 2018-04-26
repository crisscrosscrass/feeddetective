<html>
<head>
<link rel="stylesheet" type="text/css" href="CCC.css?v=<?php echo filemtime('CCC.css') ?>"/>
</head>
<body>
<br>
<?php
echo "<strong>Log:</strong><br>";
/*
$feedURL = $_POST['feedURL'];

echo "Your url is $feedURL <br>";
*/
?>
<div id="logStatement">
<?php

/*
error_reporting(~0);
ini_set('display_errors', 1);
*/

$feedURL = $_POST["feedURL"];
//$feedURL = "ftp://ftp-11577-147765031:15903304@ftp.semtrack.de/ladenzeile_de.csv";
//echo "<br>Server logged URL: <br>";
//echo $feedURL;
//echo "<br><br>";
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

//echo "<hr>";


$context = stream_context_create($opts);

$handle = fopen($feedURL, "r");


//phpinfo();
$handler = fopen($feedURL, "r");
$tester = fgets($handler,5);
//fclose($handler);
if( strpos($tester, 'Rar') !== false){
	echo "detect rar file \n";
	
}else if(strpos($tester, 'PK') !== false){

	echo ("detect zip file \n");
	/*
	$zip = new ZipArchive();
	$opener = $zip->open($_FILES['file']['tmp_name'],ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE);
	if( $opener !== true){
		die("Cannot open for writing.");
	}
	$readFile = zip_entry_read(0);
	print_r($readFile);
	$zip->close();	
	*/
	file_put_contents('tmp.zip', file_get_contents($feedURL, true, $context));
	$zip = zip_open('tmp.zip');
	$entry = zip_read($zip);
	zip_entry_open($zip,$entry,"r");
	$feed = zip_entry_read($entry,zip_entry_filesize($entry));
	//$feed = fwrite($temp, file_get_contents($feedURL, true, $context));
	//$result = file_get_contents('zip://$feedURL', true, $context); 

	
}else if(mb_strpos($tester, "\x1f" . "\x8b" . "\x08", 0, "US-ASCII") !== false){

	echo ("detect gz file \n");
	$z = gzopen($feedURL,'r') or die("can't open: $php_errormsg");
	$string = '';

    while ($line = gzgets($z,1024)) {
        $string .= $line;
    }

    $feed = $string;

    gzclose($z) or die("can't close: $php_errormsg");
	
}else{
	$feed = file_get_contents($feedURL);
	$filename = basename($feedURL);
	
	if ($feed === FALSE) {
				
	   echo ("Error reading source at: ".$feedURL . "<br>"); 
	   
	   die("Error: reading file ".$filename);
	}
	
	
}

$array = explode("\n", $feed);
$firstLine = $array[0];
$secondline = $array[1];
//-----------------------------------------------------detect Charset BEGIN
//echo "<h2>Different charset on provided Feed </h2>";
$string = $array[0];
echo "Autodetection Charset: " . mb_detect_encoding($string,"auto","not found") . "<br>";
/*echo $string."\n";
echo "<br>";

echo "ASCII ::::::::::::::::::::::";
$str = mb_convert_encoding($string, "ASCII", "UTF-8");
echo $str."\n";
echo "<br>";
echo "ISO-8859-1 ::::::::::::::::::::::";
$encoding = mb_detect_encoding(mb_convert_encoding($string, "ISO-8859-1", "UTF-8"));
echo $encoding;
echo "<br>";
echo "Windows (ANSI) ::::::::::::::::::::::";
$encoding = mb_detect_encoding(mb_convert_encoding($string, "UTF-7", "UTF-8"));
echo $encoding;
echo "<br>";
echo "UTF16 (Encoding) ::::::::::::::::::::::";
$encoding = mb_detect_encoding(mb_convert_encoding($string, "UTF-8","UTF-16"));
echo $encoding;
*/
echo "<br>";

/*
echo "(Coding) :::::::::::TEST::::::::::: <br>";
$encoding = iconv("ISO-8859-1", "UTF-8", $string);
echo $encoding;
echo "<br>";
echo "<br>";
echo "(Coding2) :::::::::::TEST2::::::::::: <br>";
$encoding = iconv("UTF-8", "ASCII//TRANSLIT", $string);
echo $encoding;
echo "<br>";
echo "<br>";


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



echo "UTF-8 Encoding:::::::::::::::::::::: <br>";
echo utf8_encode($string)."\n";
echo "<br>";
echo "<hr>";
*/
//-----------------------------------------------------detect Charset END
//-----------------------------------------------------detect largest Line BEGIN





//-----------------------------------------------------detect largest Line END
//-----------------------------------------------------detect Delimiter BEGIN
//echo "<h2>Test different Delimiters on provided Feed </h2>";
//echo "<br>";
echo "<strong><u>First Line Feed: </u></strong><br>".strip_tags($firstLine);
echo "<br>";
echo "<strong><u>Second Line Feed: </u></strong><br>".strip_tags($secondline);
echo "<br>";

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
echo "<br>";
//echo "<br>";


//-----------------------------------------------------detect Delimiter END
//echo "<hr>";

//-----------------------------------------------------set feed Data into CSV Data BEGIN
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
/*
foreach($Data2 as $arr) {  
		$key2 = array_keys($arr); 
        $count[$key2[0]]++;
	}
*/	
//$maxLines = $count[0];
//$maxColumns = count($Data2[0]);

$maxLines-=1;

/*========================================================================================================removed selection due loading time

for ($i = 0; $i < $maxColumns; $i++){ // need the max Number for Data2[][this] or Splitted Columns
	echo "<select>";
	for ($j = 0; $j < $maxLines; $j++){
		echo "<option>".$Data2[$j][$i]."</option>"; 
	}
	echo "</select>";
}


*/

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
</body>
</html>