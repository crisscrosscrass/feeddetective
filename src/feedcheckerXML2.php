<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
include('common-functions.php');
$msg_id = 0;

echo "<strong>Log:</strong><br>";
ini_set('display_errors', 0);
$feedURL = $_POST['feedURL'];
$transferParentNode = $_POST['parentnode'];
$transferItemNode = $_POST['itemnode'];

sendMsg("Downloading...", $msg_id);
echo "Your provided url is <strong> $feedURL </strong><br>";
echo "Your provided parentNode is:<strong> $transferParentNode </strong><br>";
echo "Your provided itemNode is:<strong> $transferItemNode </strong><br>";

?>


<?php


sendMsg("reading Raw Feed Data", $msg_id);
sendMsg("detecting xml nodes", $msg_id);
sendMsg("create Table", $msg_id);

$feedURL = $_POST["feedURL"]; //echo "<br>Server logged URL: <br>";
/*
$parentNode = $transferParentNode;
$itemNode = $transferItemNode ;
*/

$xml= simplexml_load_file($feedURL) or die("Error: Cannot create object");
$csv_array = array(); 

// check if parentnode is needed or not
$NODESwithout = count($xml->$transferItemNode->children());
//echo "checkerWithout:".$NODESwithout."<br>";
if($NODESwithout == 0 ){
	//echo "we need a parent<br>";
	$useparent = true;
	$countChild = count($xml->$transferParentNode->$transferItemNode);
	
	foreach ($xml->$transferParentNode->$transferItemNode as $itemNode) {
	$hasChild = count($itemNode->children());
	$hasGChild = count($itemNode->children('g', TRUE));
	
		if ($hasChild > 0 || $hasGChild > 0 ){
				foreach ($itemNode->children() as $itemSubNode) {
					$elementSubNode[] = $itemSubNode->getName();
					$elementItemNode[] = $itemNode;
					$parentNode = $itemSubNode;
					$csvValue = $itemSubNode->getName();
					array_push($csv_array, $csvValue);
					
					$hasChild = count($itemSubNode->children());
					 if ($hasChild > 0){
							foreach ($itemSubNode->children() as $itemSubNode) {
								$elementSubNode[] = $itemSubNode->getName();
								$elementSubItemNode[] = $itemSubNode;
								$csvValue1 = $parentNode->getName();
								$csvValue2 = $itemSubNode->getName();
								$csvValue = $csvValue2;
								array_push($csv_array, $csvValue);
							}
					 }else{
						 $elementSubItemNode[] = $itemSubNode;
					 }
				}
				foreach ($itemNode->children('g', TRUE) as $itemSubNode) {
					$elementSubNode[] = $itemSubNode->getName();
					$elementItemNode[] = $itemNode;
					$parentNode = $itemSubNode;
					$csvValue = $itemSubNode->getName();
					array_push($csv_array, $csvValue);
					
					$hasChild = count($itemSubNode->children());
					 if ($hasChild > 0){
							foreach ($itemSubNode->children() as $itemSubNode) {
								$elementSubNode[] = $itemSubNode->getName();
								$elementSubItemNode[] = $itemSubNode;
								$csvValue1 = $parentNode->getName();
								$csvValue2 = $itemSubNode->getName();
								$csvValue = $csvValue2;
								array_push($csv_array, $csvValue);
							}
					 }else{
						 $elementSubItemNode[] = $itemSubNode;
					 }
				}
		 }else{
			
		 }
	
	}
	
}else{
	//echo "without a parent<br>";
	$useparent = false;
	$countChild = count($xml->$transferItemNode);
	
	foreach ($xml->$transferItemNode as $itemNode) {
	$hasChild = count($itemNode->children());
	$hasGChild = count($itemNode->children('g', TRUE));
	
		if ($hasChild > 0 || $hasGChild > 0 ){
				foreach ($itemNode->children() as $itemSubNode) {
					$elementSubNode[] = $itemSubNode->getName();
					$elementItemNode[] = $itemNode;
					$parentNode = $itemSubNode;
					$csvValue = $itemSubNode->getName();
					array_push($csv_array, $csvValue);
					
					$hasChild = count($itemSubNode->children());
					 if ($hasChild > 0){
							foreach ($itemSubNode->children() as $itemSubNode) {
								$elementSubNode[] = $itemSubNode->getName();
								$elementSubItemNode[] = $itemSubNode;
								$csvValue1 = $parentNode->getName();
								$csvValue2 = $itemSubNode->getName();
								$csvValue = $csvValue2;
								array_push($csv_array, $csvValue);
							}
					 }else{
						 $elementSubItemNode[] = $itemSubNode;
					 }
				}
				foreach ($itemNode->children('g', TRUE) as $itemSubNode) {
					$elementSubNode[] = $itemSubNode->getName();
					$elementItemNode[] = $itemNode;
					$parentNode = $itemSubNode;
					$csvValue = $itemSubNode->getName();
					array_push($csv_array, $csvValue);
					
					$hasChild = count($itemSubNode->children());
					 if ($hasChild > 0){
							foreach ($itemSubNode->children() as $itemSubNode) {
								$elementSubNode[] = $itemSubNode->getName();
								$elementSubItemNode[] = $itemSubNode;
								$csvValue1 = $parentNode->getName();
								$csvValue2 = $itemSubNode->getName();
								$csvValue = $csvValue2;
								array_push($csv_array, $csvValue);
							}
					 }else{
						 $elementSubItemNode[] = $itemSubNode;
					 }
				}
		 }else{
			
		 }
	
	}
}
 


echo "Amount of discovered Items: <strong>".$countChild."</strong><br>";
echo "<strong> discovered xml tags: </strong>";
//print_r($csv_array);

$result = array_filter(array_unique($csv_array));

$comma_separated = implode(",", $result);
//echo $comma_separated."<br>";
$result = explode(",",$comma_separated);
//print_r($result);
$count_Attributes = count($result);

print_r(array_filter($result, 'strlen'));
echo '<br>';


?>
<div id="providedFeedTableContainer">
<div id="tableHeader">
<h1> Preview Sheet <span id="greenBG">XML</span> based on Provided URL </h1>
</div>
<?php


/* Test Feeds
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



=======================================================================
Test Feeds -----------------X M L --------------------------------
=======================================================================
https://www.neronote.com/feed/shopalike/nnfeedde.xml

https://www.brasty.at/xml/shopalike.xml

https://www.apposta.com/feed/shopalike/nnfeedde.xml?f=nn

https://www.blokhutvillage.nl/feeds/GShopping_blokhut.xml

----------------------------------------------------------------------------


*/

///////////////////////////////////////identify select strings

/*
*###################################################################
*
*
*
* 			xpath first child //$parentNode/*[1]"
*
*
*###################################################################
*/
?>
<table id="FeedTable" class="display" cellspacing="0" width="100%">
<?php
$xml2 = $xml;
$maxColumns = 0;
$maxLines = 0;
$i = 0;
/*
print_r($xml2->$itemNode[1]);
echo "<br>";
echo "<br>";
print_r($xml2->xpath("//$parentNode/*[1]/*[1]"));
*/

/*
$item_list = array(); 
foreach ($xml2->children()->children() as $valueNode) {
	 $item_list[] = $valueNode->getName();
	 $maxColumns++;
	 }
foreach ($xml2->children() as $valueNode) {
	 $item_list[] = $valueNode->getName();
	 $maxLines++;
	 }
	 
	 
	 
$node_name = array();                                    //get all xml element name
foreach ($xml2->children()->children() as $valueNode) {
	 $node_name[] = $valueNode->getName();
	 }
*/

	 
//echo $xml->children()[4]->children()[4]. "<br>";   //first Index Number is ROW /// Second Index Number is Column



/*

if( $useparent == true ){
	foreach ($result as $valueNode) {             //display selection head
	echo "<select>";
	echo "<option>";
	echo $valueNode;
	echo "</option>";
	foreach($xml->$transferParentNode->$transferItemNode as $item){	
				echo "<option>";
				if ($item->xpath("$valueNode")[0] != null){
					echo $item->xpath("$valueNode")[0];
					}elseif($item->children('g', TRUE)->$valueNode != null){
						echo strip_tags($item->children('g', TRUE)->$valueNode);
					}else{
						echo $item->xpath("child::node()/$valueNode")[0];
					}
				echo "</option>";
		
	}	
	echo "</select>";
	}
}else{
	foreach ($result as $valueNode) {             //display selection head
	echo "<select>";
	echo "<option>";
	echo $valueNode;
	echo "</option>";
	foreach($xml->$transferItemNode as $item){	
				echo "<option>";
				if ($item->xpath("$valueNode")[0] != null){
					echo $item->xpath("$valueNode")[0];
					}elseif($item->children('g', TRUE)->$valueNode != null){
						echo strip_tags($item->children('g', TRUE)->$valueNode);
					}else{
						echo $item->xpath("child::node()/$valueNode")[0];
					}
				echo "</option>";
		
	}	
	echo "</select>";
	}
}
*/

///////////////////////////////////////END select strings
echo "<thead> ";
echo "<tr> ";
foreach ($result as $value) {             //display table head
echo "<th>{$value}</th>";
}
echo "</tr> ";
echo "</thead> ";
//-----------------------------------------------------set Table BEGIN
echo "<tbody> ";

if( $useparent == true ){
	foreach($xml->$transferParentNode->$transferItemNode as $item){
		echo "<tr> ";
			foreach($result as $selector){
				echo "<td>";
				if ($item->xpath("$selector")[0] != null){
					echo strip_tags($item->xpath("$selector")[0]);
				}elseif($item->children('g', TRUE)->$selector != null){
					echo strip_tags($item->children('g', TRUE)->$selector);
				}else{
					echo strip_tags($item->xpath("child::node()/$selector")[0]);
				}
				echo "</td>";
				
			}
		
	}
}else{
	foreach($xml->$transferItemNode as $item){
		echo "<tr> ";
			foreach($result as $selector){
				echo "<td>";
				
				if ( $item->xpath("child::node()/$selector")[0] != null ){
					echo strip_tags($item->xpath("child::node()/$selector")[0]);
				}elseif($item->xpath("$selector")[0] != null ){
					echo strip_tags($item->xpath("$selector")[0]);
				}else{
					echo strip_tags($item->children('g', TRUE)->$selector);
				}
				
				echo "</td>";
				
			}
		
	}
}
echo "</tbody> ";

/*
$node_name = array();                                    //get all xml element name
foreach ($xml2->$itemNode->children() as $valueNode) {
$node_name[] = $valueNode->getName();
}
foreach ($node_name as $valueNode) {             //display table head
		echo "<select>";
		echo "<option>";
		echo $valueNode;
		echo "</option>";
			for ($j = 0; $j < $maxLines; $j++){
				echo "<option>".$xml->$itemNode[$j]->children()[$i]."</option>";
				}
				$i++;
		echo "</select>";
		}

///////////////////////////////////////END select strings
$element_name = array();                                    //get all xml element name
foreach ($xml->$itemNode->children() as $value) {
	 $element_name[] = $value->getName();
	 }
echo "<tr> ";
foreach ($element_name as $value) {             //display table head
echo "<th>{$value}</th>";
}
echo "</tr> ";
//-----------------------------------------------------set Table BEGIN
foreach($xml->$itemNode as $items) { 
	   echo "<tr> ";
	   foreach($items->children() as $node) {
		   echo "<td>".htmlentities($node)."</td>";
		}
		
	   echo "</tr> ";
	}



*/
?>
</table>
</div>
</body>
</html>