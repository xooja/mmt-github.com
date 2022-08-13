<?php
    require "myphp.php";
    $bol = true;
    $file = "users.xml";
    $datafolder = "Database";

    $dir =     uniqid().time();
    $dateC =   date("Y/m/d");
    $thisdir = $datafolder."/".$dir;


    if(!file_exists($datafolder)){
        mkdir($datafolder);
    }


    $username = decode($_POST["Uname"]);
    $pass =    decode($_POST["pass"]);
    $name =    decode($_POST["name"]);
    $Bname =   decode($_POST["Bname"]);
    $email =   decode($_POST["email"]);
    $number =  decode($_POST["num"]);
    $address = decode($_POST["address"]);
    $acType = decode($_POST["accountType"]);
    $gender = decode($_POST["gender"]);
    $hash = password_hash($pass,PASSWORD_DEFAULT);

    if(file_exists($file)){

        $root = $userdoc->getElementsByTagName("user");
        for ($i=0; $i < count($root) ; $i++) { 
            if($root[$i]->getAttributeNode("username")->nodeValue == $username){
                $bol = false;
            }
        }

        if($bol == false){
            echo 0;
        }
        else{
            $root = $userdoc->documentElement;
            $user = $userdoc->createElement("user");
            $user->setAttribute("username",$username);
            $root->appendChild($user);

            $start = $userdoc->createElement("startup","0");
            $user->appendChild($start);

            $folder = $userdoc->createElement("dir",$dir);
            $user->appendChild($folder);

            $name = $userdoc->createElement("name",$name);
            $user->appendChild($name);

            $BsName = $userdoc->createElement("Bname",$Bname);
            $user->appendChild($BsName);

            $Email = $userdoc->createElement("email",$email);
            $user->appendChild($Email);

            $Mnumber = $userdoc->createElement("num",$number);
            $user->appendChild($Mnumber);

            $Fulladd = $userdoc->createElement("address",$address);
            $user->appendChild($Fulladd);

            $password = $userdoc->createElement("pass",$hash);
            $user->appendChild($password);

            $timeC = $userdoc->createElement("date",$dateC);
            $user->appendChild($timeC);

            $logo = $userdoc->createElement("logo","holder.jpg");
            $logo->setAttribute("status" ,0);
            $user->appendChild($logo);

            $pinvoice = $userdoc->createElement("pinvoice","0");
            $user->appendChild($pinvoice);

            $invoice = $userdoc->createElement("invoice","0");
            $user->appendChild($invoice);

            $pinvoic = $userdoc->createElement("company","0");
            $user->appendChild($pinvoic);

            $invoic = $userdoc->createElement("customer","0");
            $user->appendChild($invoic);

            $item = $userdoc->createElement("item","0");
            $user->appendChild($item);

            mkdir($thisdir);
            mkdir($thisdir."/Items");
            mkdir($thisdir."/Customers");
            mkdir($thisdir."/Records");
            mkdir($thisdir."/Companies");
            mkdir($thisdir."/Assets");

            $cookie_name = "username";
            $cookie_value = $username;
            setcookie($cookie_name, $cookie_value, time() + (86400 * 365), "http://localhost/");

            $myfile = fopen($thisdir."/date.txt", "w");
            $txt = $dateC;
            fwrite($myfile, $txt);
            fclose($myfile);
            echo 1;
            $userdoc->save($file);
        }
    }else{

        $root =  $userdoc->createElement("users");
        $userdoc->appendChild($root);
        $user = $userdoc->createElement("user");

        $user->setAttribute("username",$username);

        $root->appendChild($user);


        $start = $userdoc->createElement("startup","0");
        $user->appendChild($start);

        $folder = $userdoc->createElement("dir",$dir);
        $user->appendChild($folder);

        $name = $userdoc->createElement("name",$name);
        $user->appendChild($name);

        $BsName = $userdoc->createElement("Bname",$Bname);
        $user->appendChild($BsName);

        $Email = $userdoc->createElement("email",$email);
        $user->appendChild($Email);

        $Mnumber = $userdoc->createElement("num",$number);
        $user->appendChild($Mnumber);

        $Fulladd = $userdoc->createElement("address",$address);
        $user->appendChild($Fulladd);

        $password = $userdoc->createElement("pass",$hash);
        $user->appendChild($password);

        $timeC = $userdoc->createElement("date",$dateC);
        $user->appendChild($timeC);

        $logo = $userdoc->createElement("logo","holder.jpg");
        $logo->setAttribute("status" ,0);
        $user->appendChild($logo);

        $pinvoice = $userdoc->createElement("pinvoice","0");
        $user->appendChild($pinvoice);

        $invoice = $userdoc->createElement("invoice","0");
        $user->appendChild($invoice);

        $pinvoic = $userdoc->createElement("company","0");
        $user->appendChild($pinvoic);

        $invoic = $userdoc->createElement("customer","0");
        $user->appendChild($invoic);

        $item = $userdoc->createElement("item","0");
        $user->appendChild($item);

        mkdir($thisdir);
        mkdir($thisdir."/Items");
        mkdir($thisdir."/Customers");
        mkdir($thisdir."/Records");
        mkdir($thisdir."/Assets");
        mkdir($thisdir."/Companies");
        
        $cookie_name = "username";
        $cookie_value = $username;
        setcookie($cookie_name, $cookie_value, time() + (86400 * 365), "http://localhost/");

        $myfile = fopen($thisdir."/date.txt", "w");
        $txt = $dateC;
        fwrite($myfile, $txt);
        fclose($myfile);
        echo 1;
        $userdoc->save($file);
    }

?>