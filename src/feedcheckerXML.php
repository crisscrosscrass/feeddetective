<html>
<head>
<link rel="stylesheet" type="text/css" href="CCC.css?v=<?php echo filemtime('CCC.css') ?>"/>
</head>
<body>
<br>
<?php
echo "<strong>Log:</strong><br>";
$feedURL = $_POST['feedURL'];

echo "Your provided url is <strong> $feedURL </strong><br>";

?>


<?php
ini_set('display_errors', 0);
$feedURL = $_POST["feedURL"]; //echo "<br>Server logged URL: <br>";

//echo $feedURL;
//echo "<br><br>";



//   not really working with Showing Content!!!!
/*
 // load as string
 $get = file_get_contents($feedURL);
 $xml= new SimpleXMLElement($get) or die("Error: Cannot create object");

 $validfilename = '/temp/mylist.xml';
 $xml->asXML($validfilename);    // to a file
 $stringXML = $xml->asXML();             // to a string

	//echo htmlentities($stringXML);
	
	
	testfeeds:
	
	https://www.elegrina.de/export?type=ladenzeile&amp;generate=true
	
	https://feeds.mergado.com/totaldiscount-de-idealo-de-2-bba4bf5b775dd81adf58ae47b78e12f6.xml
*/


 

    


 $xml= simplexml_load_file($feedURL) or die("Error: reading file");
 
 $element_name2 = array();                                    //get all xml element name
 foreach ($xml->children() as $value2) {
	 $element_name2[] = $value2->getName();
	 }

 $element_name = array();                                    //get all xml element name
 foreach ($xml->children()->children() as $value) {
	 $element_name[] = $value->getName();
	 $hasChild = count($value->children());
		 if ($hasChild > 0){
			$element_name[] = $value->children()->getName();
		 }
	 }
 $element_name3 = array();                                    //get all xml element name
 foreach ($xml->children()->children()->children() as $value3) {
	 $element_name3[] = $value3->getName();
	 }

//echo "<hr>";

//$feed = json_decode(json_encode((array) simplexml_load_file($feedURL)), 1);
//print_r($feed);
/*
liste>                   <-----XML
<artikel>				<----- for each children as itemNode!
			!ITEM NODE !  	
			hasChildren????  <artikelnummer>89278</artikelnummer>  NO - get ElementName "artikelnummer" + Element "89278"
							<produktname>
							Werkzeugkoffer Curver 16&quot;&quot; M grau 02925-976
							</produktname>
							<preis>9.6</preis>
							<herstellername>CURVER</herstellername>
							<produkturl>
							http://www.totaldiscount.de/werkzeugkoffer-curver-16-m-grau-02925-976?utm_medium=cpc&utm_source=Ladenzeile.de
							</produkturl>
							<bildlinks>
							<bildurl1>
							http://www.totaldiscount.de/data/product/02925_l.jpg
							</bildurl1>
							</bildlinks>

*/
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
/*
***************************************************************************pure testing
*
foreach($xml->children() as $item){
	foreach($result as $selector){
		echo $selector.":  ";
		if ( $item->xpath("child::node()/$selector")[0] != null ){
			echo strip_tags($item->xpath("child::node()/$selector")[0]);			
		}elseif($item->xpath("$selector")[0] != null){
			echo strip_tags($item->xpath("$selector")[0]);
		}else{
			echo strip_tags($item->children('g', TRUE)->$selector);
		}
		echo "|";
	}
	echo "<hr>";
		
	
}
*
*
*/

/* 
echo "<hr>";
echo '<pre>';
echo "Amount of Attributes: ".$count_Attributes;
//print_r($elementSubItemNode);
echo '</pre>';
echo '<pre>';
//print_r($elementSubNode);
echo '</pre>';

echo '<br>';
echo 'XPath test<br>';


foreach($result as $selector){
echo "<select>";
	foreach ($xml->xpath("/child::node()//$selector") as $key) {
		echo "<option>".$key."</option>";
	}
echo "</select>";
}
echo '<br>';

echo '<table>';
echo "<thead> ";
echo "<tr> ";
foreach ($result as $value) {             //display table head
echo "<th> $value </th>";
}
echo "</tr> ";
echo "</thead> ";
echo "<tbody> ";
$i = 0;
foreach($xml->children() as $item){
echo "<tr>";
		foreach($result as $selector){
			echo "<td>";
			//echo $item->$selector;
			//echo $item->xpath("//$selector/node()")[$i];
			echo "</td>";
		}
	$i++;
echo "</tr>";
}
echo "<t/body> ";
echo '</table>';
*/



/*
echo '<br>';

foreach($xml->children() as $item){
	foreach($result as $selector){
		//var_dump($item->$selector);
		echo "<br>";
		//print_r($item);
		if ($item->xpath("$selector")[0] != null){
			echo $item->xpath("$selector")[0];
		} else{
			echo $item->xpath("child::node()/$selector")[0];
		}
		
		
		//echo $xml->xpath("child::node()//$selector/node()")[$item];
		
	}
	echo '<br>';
}


echo "<table>";

echo "<thead> ";
echo "<tr> ";
foreach ($result as $value) {             //display table head
echo "<th> $value </th>";
}
echo "</tr> ";
echo "</thead> ";

foreach ($xml->children() as $itemTable) {
	echo "<tr> ";
	
			foreach($result as $attribute){
			echo "<td>";
			echo $itemTable->$attribute;
			echo "</td>";
			}
	
	echo "</tr> ";

/*
foreach ($xml->children() as $itemTable) {
	echo "<tr> ";
	
			foreach($result as $attribute){
			echo "<td>";
			echo $itemTable->$attribute;
			echo "</td>";
			}
	
	echo "</tr> ";
}*/

/*
foreach ($xml->xpath("child::node()") as $itemTable) {
	echo "<tr> ";
	foreach($result as $attribute){
		
		foreach($itemTable->xpath("//$attribute") as $key){
			echo "<td>";
			echo $key;
			echo "</td>";
		}
		
	}
	echo "</tr> ";
}
echo "</tbody> ";
echo "</table>";

}*/



echo "<br>";
 
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
/*

echo "<hr>";

echo "<hr>";
*/
?>
<div id="providedFeedTableContainer">
	<div id="tableHeader">
	<h1> Preview Sheet <span id="greenBG">XML</span> based on Provided URL </h1>
	</div>
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



//-----------------------------------------------------set From Values BEGIN

/*
print_r ($Data2);	

*/



/*
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
*/
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

/* 
foreach ($result as $valueNode) {             //display table head
echo "<select>";
echo "<option>";
echo $valueNode;
echo "</option>";
	for ($j = 0; $j < $countChild; $j++){
		echo "<option>".$xml->children()[$j]->children()[$i]."</option>"; 
	}
	$i++;
echo "</select>";
}
*/


/* echo $xml->xpath("child::node()/Produktname")[3]; */


/*
foreach ($result as $valueNode) {             //display table head
	echo "<select>";
	echo "<option>";
	echo $valueNode;
	echo "</option>";
	foreach($xml->children() as $item){	
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
/*
foreach ($xml->children() as $itemTable) {
	echo "<tr> ";
	
		foreach($result as $attribute){

			$str = strlen($itemTable->$attribute);
			
			if ($str > 0){
				echo "<td>";
				echo $itemTable->$attribute;
				echo "</td>";
			}else{
				echo "<td>";
				echo $itemTable->children()->$attribute;
				echo "</td>";
			}
		}
			
	
	echo "</tr> ";
}
*/

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