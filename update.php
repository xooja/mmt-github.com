<?php

$target_file = "n/".basename($_FILES["zipfile"]["name"]);
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Allow certain file formats
if($imageFileType != "zip" ) {
  echo 0;
} else {
  if (move_uploaded_file($_FILES["zipfile"]["tmp_name"], $target_file)) {
    
  } 
}

?>