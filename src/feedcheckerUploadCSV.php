<html>
<head>
<link rel="stylesheet" type="text/css" href="CCC.css">
</head>
<body>
<br>
<?php

$fileName = $_FILES['file']['name'];
$fileType = $_FILES['file']['type'];
$fileError = $_FILES['file']['error'];
$fileContent = file_get_contents($_FILES['file']['tmp_name']);

print_r($fileName);
print_r($fileContent);

?>

</body>
</html>