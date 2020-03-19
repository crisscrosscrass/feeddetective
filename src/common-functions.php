<?php
function sendMsg($msg, &$msg_id) {
	echo "id: ".$msg_id."\n";
	echo "data: ".$msg;
    echo "\n";
    echo "\n";
    //ob_end_flush();
    //ob_flush();
    flush();
	//ob_start();
	usleep(250000);
}
function detectCompression($feedURL,$tester){
	if( strpos($tester, 'Rar') !== false){
		echo "detect rar file \n";
		sendMsg("detect rar file ", $msg_id);
		usleep(500000);
		
	}else if(strpos($tester, 'PK') !== false){
	
		echo ("detect zip file \n");
		sendMsg("detect zip file", $msg_id);
		usleep(500000);
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
		sendMsg("detect gz file", $msg_id);
		usleep(500000);
		$z = gzopen($feedURL,'r') or die("can't open: $php_errormsg");
		$string = '';
	
		while ($line = gzgets($z,1024)) {
			$string .= $line;
		}
	
		$feed = $string;
	
		gzclose($z) or die("can't close: $php_errormsg");
		
	}else{
		sendMsg("no compression", $msg_id);
		function url_get_contents ($Url) {
			if (!function_exists('curl_init')){ 
				sendMsg("Loading....", $msg_id);
				die('CURL is not installed!');
			}
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $Url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$output = curl_exec($ch);
			curl_close($ch);
			return $output;
		}

		$post = array(
			'extra_info' => '123456',
			'file_contents' => file_get_contents($feedURL)
		);
		//$feed = file_get_contents($feedURL);
		$feed = $post['file_contents'];		
		
	}
	return $feed;
}
function detectDelimiter($feed){
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
}
function getXmlDataViaURL($feedURL){
	$xml= simplexml_load_file($feedURL);
	return $xml;
}
?>