<html>
<head>
<link rel="stylesheet" type="text/css" href="CCC.css?v=<?php echo filemtime('CCC.css') ?>"/>
</head>
<body>
<br>
<?php

$feedURL = $_POST['feedURL'];
$transferParentNode = $_POST['parentnode'];
$transferItemNode = $_POST['itemnode'];


echo "Your url is: ". $feedURL ."<br>";
echo "Your ParentNode is: $transferParentNode <br>";
echo "Your ItemNode is: $transferItemNode <br>";

?>


<?php

$feedURL = $_POST["feedURL"]; //echo "<br>Server logged URL: <br>";

$parentNode = $transferParentNode;
$itemNode = $transferItemNode ;

$xml= simplexml_load_file($feedURL) or die("Error: Cannot create object");
 
/*
 $element_name2 = array();                                    //get all xml element name
 foreach ($xml->xpath("//$parentNode/$itemNode") as $value2) {
	 $element_name2[] = $value2->getName();
	 }
print_r ($element_name2)."<br>";



 
 $element_name3 = array();                                    //get all xml element name
 foreach ($xml->children()->children()->children() as $value3) {
	 $element_name3[] = $value3->getName();
	 }



echo "Preview 1st Level xml Nodes:<br>";
echo $element_name2[0]."<br>";
echo $element_name2[1]."<br>";
echo $element_name2[2]."<br>";
echo $element_name2[3]."<br>";
echo $element_name2[4]."<br>";
echo $element_name2[5]."<br>";
echo "<br>";
echo "<br>";
echo "Preview 2nd Level xml Nodes:<br>";
echo $element_name[0]."<br>";
echo $element_name[1]."<br>";
echo $element_name[2]."<br>";
echo $element_name[3]."<br>";
echo $element_name[4]."<br>";
echo $element_name[5]."<br>";
echo $element_name[6]."<br>";
echo $element_name[7]."<br>";
echo $element_name[8]."<br>";
echo $element_name[9]."<br>";
echo "<br>"; 
echo "<br>"; 
echo "Preview 3nd Level xml Nodes:<br>";
echo $element_name3[0]."<br>";
echo $element_name3[1]."<br>";
echo $element_name3[2]."<br>";
echo $element_name3[3]."<br>";
echo $element_name3[4]."<br>";
echo $element_name3[5]."<br>";
echo $element_name3[6]."<br>";
echo $element_name3[7]."<br>";
echo $element_name3[8]."<br>";
echo $element_name3[9]."<br>";

*/





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



=======================================================================
Test Feeds -----------------X M L --------------------------------
=======================================================================
https://www.neronote.com/feed/shopalike/nnfeedde.xml

https://www.brasty.at/xml/shopalike.xml

----------------------------------------------------------------------------


*/
?>

<table id="FeedTable" class="display" cellspacing="0" width="100%">
<?php
///////////////////////////////////////identify select strings

$xml2 = $xml;
$maxColumns = 0;
$maxLines = 0;
$i = 0;

$item_list = array(); 

foreach ($xml2->$parentNode->$itemNode as $valueNode) {
	 $item_list[] = $valueNode->getName();
	 $maxLines++;
	 }

foreach ($xml2->$parentNode->$itemNode->children as $valueNode) {
	 $item_list[] = $valueNode->getName();
	 $maxColumns++;
	 }


echo "<br>";

echo "Amount of Lines: ".$maxLines."<br>";
echo "Amount of Columns: ".$maxColumns."<br>";
//echo $xml->children()[4]->children()[4]. "<br>";   //first Index Number is ROW /// Second Index Number is Column

$node_name = array();                                    //get all xml element name
foreach ($xml2->$parentNode->$itemNode->children() as $valueNode) {
	 $node_name[] = $valueNode->getName();
	 }

	 
foreach ($node_name as $valueNode) {             //display table head
echo "<select>";
echo "<option>";
echo $valueNode;
echo "</option>";
	for ($j = 0; $j < $maxLines; $j++){
		echo "<option>".$xml->$parentNode->$itemNode[$j]->children()[$i]."</option>"; 
	}
	$i++;
echo "</select>";
}

///////////////////////////////////////END select strings
$element_name = array();                                    //get all xml element name
 foreach ($xml->$parentNode->$itemNode->children() as $value) {
	 $element_name[] = $value->getName();
	 }


echo "<tr> ";
foreach ($element_name as $value) {             //display table head
echo "<th>{$value}</th>";
}
echo "</tr> ";
//-----------------------------------------------------set Table BEGIN
foreach($xml->$parentNode->$itemNode as $items) { 
	   echo "<tr> ";
	   foreach($items->children() as $node) {
		   echo "<td>".htmlentities($node)."</td>";
		}
		
	   echo "</tr> ";
	}




?>
</table>

</body>
</html>