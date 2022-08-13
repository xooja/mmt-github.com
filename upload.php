<?php
$target_dir = $_POST["dir"];
$target_file = $target_dir ."/". basename($_FILES["logo"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if($_FILES["logo"] != "") {
  $check = getimagesize($_FILES["logo"]["tmp_name"]);
  if($check !== false) {
    $uploadOk = 1;
  } else {
    echo -4;
    $uploadOk = 0;
  }
}

// Check file size
if ($_FILES["logo"]["size"] > 5000000) {
  echo 0;
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" && $imageFileType != "ico" && $imageFileType != "icon" ) {
  echo -1;
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {

// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["logo"]["tmp_name"], $target_file)) {
    echo 2;
  } else {
    echo -3;
  }
}

?>