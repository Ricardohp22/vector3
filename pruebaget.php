<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>página de destino</title>
</head>
<body>
<h1>Al abrir esta página se han pasado las siguientes variables:</h1>
<?php 
$a=$_GET['a'];
$b=$_GET['b'];
echo "<p>variable $a : $a";
echo "<p>variable $b : $b";
?>
</body>
</html>