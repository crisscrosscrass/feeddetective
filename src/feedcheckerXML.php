<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
include('common-functions.php');
$msg_id = 0;

echo "<strong>Log:</strong><br>";
$feedURL = $_POST['feedURL'];
echo "Your provided url is <strong> $feedURL </strong><br>";
sendMsg("Downloading...", $msg_id);
?>


<?php
ini_set('display_errors', 0);
$feedURL = $_POST["feedURL"]; //echo "<br>Server logged URL: <br>";

/*	testfeeds:
	
	https://www.elegrina.de/export?type=ladenzeile&amp;generate=true
	
	https://feeds.mergado.com/totaldiscount-de-idealo-de-2-bba4bf5b775dd81adf58ae47b78e12f6.xml
*/

//$xml= simplexml_load_file($feedURL);
sendMsg("reading Raw Feed Data", $msg_id);
sendMsg("detecting xml nodes", $msg_id);
sendMsg("create Table", $msg_id);

// after this sendMsg not working for no reason
$xml= getXmlDataViaURL($feedURL);

ob_end_flush();
//echo "<hr>";
foreach ($xml->children() as $itemNode) {
	echo $itemNode;
}
ob_start();

$csv_array = array(); 
foreach ($xml->children() as $itemNode) {
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
					if ($hasChild > 0 ){
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
					$hasGChild = count($itemSubNode->children('g', TRUE));
					if ($hasGChild > 0 ){
						foreach ($itemSubNode->children('g', TRUE) as $itemSubNode) {
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
					$hasGChild = count($itemSubNode->children('g', TRUE));
					if ($hasGChild > 0 ){
						foreach ($itemSubNode->children('g', TRUE) as $itemSubNode) {
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
			$elementNode[] = $itemNode->getName();
			$elementItemNode[] = $itemNode;
		}

}


///how many items`?
$countChild = count($xml->children());
//echo "<hr>"; echo '<pre>';echo '</pre>';
echo "Amount of discovered Items: <strong>".$countChild."</strong><br>";
echo "<strong> discovered xml tags: </strong>";
$result = array_filter(array_unique($csv_array));

$comma_separated = implode(",", $result);
//echo $comma_separated."<br>";
$result = explode(",",$comma_separated);
//print_r(array_filter($result));
$count_Attributes = count($result);


print_r(array_filter($result, 'strlen'));
echo '<br>';
echo "<br>";
$element_name = array();
$element_name2 = array();
$element_name3 = array();

foreach ($xml->children() as $value2) {
	 $element_name2[] = $value2->getName();
}
foreach ($xml->children()->children() as $value) {
	$element_name[] = $value->getName();
	$hasChild = count($value->children());
	if ($hasChild > 0){
		$element_name[] = $value->children()->getName();
	}
}
foreach ($xml->children()->children()->children() as $value3) {
	$element_name3[] = $value3->getName();
}
 
echo "discovered <strong>1st Level</strong> xml Nodes:<br>";
echo $element_name2[0]." ;";
echo $element_name2[1]." ;";
echo $element_name2[2]." ;";
echo $element_name2[3]." ;";
echo $element_name2[4]." ;";
echo $element_name2[5] ;
echo "<br>";
echo "discovered <strong>2nd Level</strong> xml Nodes:<br>";
echo $element_name[0]." ;";
echo $element_name[1]." ;";
echo $element_name[2]." ;";
echo $element_name[3]." ;";
echo $element_name[4]." ;";
echo $element_name[5]." ;";
echo $element_name[6]." ;";
echo $element_name[7]." ;";
echo $element_name[8]." ;";
echo $element_name[9]." ;";
echo "<br>"; 
echo "discovered <strong>3nd Level</strong> xml Nodes:<br>";
echo $element_name3[0]." ;";
echo $element_name3[1]." ;";
echo $element_name3[2]." ;";
echo $element_name3[3]." ;";
echo $element_name3[4]." ;";
echo $element_name3[5]." ;";
echo $element_name3[6]." ;";
echo $element_name3[7]." ;";
echo $element_name3[8]." ;";
echo $element_name3[9]." ;";
echo "<br>"; 


sendMsg("create Table", $msg_id);
?>
<div id="providedFeedTableContainer">
	<div id="tableHeader">
	<h1> Preview Sheet <span id="greenBG">XML</span> based on Provided URL </h1>
	</div>
<?php

?>

<table id="FeedTable" class="display" cellspacing="0" width="100%">
<?php
///////////////////////////////////////identify select strings
$xml2 = $xml;
$maxColumns = 0;
$maxLines=0;
$i=0;

$item_list = array(); 
foreach ($xml2->children()->children() as $valueNode) {
	 $item_list[] = $valueNode->getName();
	 $maxColumns++;
	 }
foreach ($xml2->children() as $valueNode) {
	 $item_list[] = $valueNode->getName();
	 $maxLines++;
	 }
	 
//echo "Amount of Columns: ".$maxColumns."<br>";
//echo "Amount of Lines: ".$maxLines."<br>";
//echo $xml->children()[4]->children()[4]. "<br>";   //first Index Number is ROW /// Second Index Number is Column

$node_name = array();                                    //get all xml element name
foreach ($xml2->children()->children() as $valueNode) {
	 $node_name[] = $valueNode->getName();
	 }


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


foreach($xml->children() as $item){
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
echo "</tbody> ";



?>
</table>
</div>
</body>
</html>