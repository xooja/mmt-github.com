<?php
    require "myphp.php";
    $Uname = "";
    $file = "users.xml";
    if(!isset($_COOKIE["username"])) {
        $Uname = "";
    } else {
        $Uname = $_COOKIE["username"];
    }


    $bol = true;
    $file = "users.xml";
    $datafolder = "Database";

    $userdoc = new DOMDocument();
    $userdoc->preserveWhiteSpace = false;
    $userdoc->formatOutput = true;
    
    $doc = new DOMDocument();
    $doc->preserveWhiteSpace = false;
    $doc->formatOutput = true;

    $doc2 = new DOMDocument();
    $doc2->preserveWhiteSpace = false;
    $doc2->formatOutput = true;

    $dir =     uniqid().time();
    $req =     $_GET["req"];
    $dateC =   date("Y/m/d");
    $thisdir = $datafolder."/".$dir;

    if(file_exists($file)){

        $userdoc->load($file);

        $xpath = new DOMXPath($userdoc);

        $getuser = $xpath->query("user[@username='".$Uname."']")[0];
        $startup = $getuser->getElementsByTagName("startup")[0];
        $userdirnode = $getuser->getElementsByTagName("dir")[0];
        $userdir = "Database/".$userdirnode->nodeValue;
    }


    if($req =="updateitems"){
        $fil = $userdir."/temp3.xml";
        $stxml = $userdir."/startup.xml";
        $itemxml = $userdir."/items.xml";
        $pymentsxml = $userdir."/payments.xml";
        $itemdir = $userdir."/Items";


        $_3 = new DOMDocument();
        $_3->preserveWhiteSpace = false;
        $_3->formatOutput = true;

        $_4 = new DOMDocument();
        $_4->preserveWhiteSpace = false;
        $_4->formatOutput = true;

        $_5 = new DOMDocument();
        $_5->preserveWhiteSpace = false;
        $_5->formatOutput = true;

        $_4->load($stxml);

        $doc->load($fil);

        $TOTAL = floatval($doc->getElementsByTagName("total")[0]->nodeValue);

        $root = $doc->getElementsByTagName("session")[0];
        $ids = count($_4->getElementsByTagName("session"));
        $root->setAttribute("id",$ids);
        $root->setAttribute("time",date("h:i"));
        $root->setAttribute("day",date('d'));
        $root->setAttribute("mon",date('m'));
        $root->setAttribute("year",date('Y'));

        $doc->save($fil);

        //-----------------------------------------------
        // creating payments xml data

        $_5->load($pymentsxml);

        $_5Root = $_5->getElementsByTagName("paymentes")[0];

        $_5purchase = $_5->createElement("payment");
        $_5Root->appendChild($_5purchase);
        $_5purchase->setAttribute("type","received");
        $_5purchase->setAttribute("way","session");
        $_5purchase->setAttribute("session",$ids);
        $_5purchase->setAttribute("time",date("h:i"));
        $_5purchase->setAttribute("day",date('d'));
        $_5purchase->setAttribute("mon",date('m'));
        $_5purchase->setAttribute("year",date('Y'));

        $detail = $_5->createElement("detail","Payment details of update items session No : ".$ids);
        $_5purchase->appendChild($detail);

        $lastpayment = $_5->getElementsByTagName("payment")[count($_5->getElementsByTagName("payment"))-2];

        $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;
        $profit = $_5->createElement("profit",$PP);
        $_5purchase->appendChild($profit);

        $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
        $TCAcom = $_5->createElement("TCAcom",$tcacom);
        $_5purchase->appendChild($TCAcom);
        
        $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
        $TCAcus = $_5->createElement("TCAcus",$tcacus);
        $_5purchase->appendChild($TCAcus);

        $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
        $TNC = $_5->createElement("TNC",$tnc);
        $_5purchase->appendChild($TNC);
        
        $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
        $TIA = $_5->createElement("TIA",$ta+$TOTAL);
        $_5purchase->appendChild($TIA);

        $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
        $TAA = $_5->createElement("TAA",$taa);
        $_5purchase->appendChild($TAA);

        $received = $_5->createElement("whatsnew");
        $_5purchase->appendChild($received);

        $TIA = $_5->createElement("TIA",$TOTAL);
        $received->appendChild($TIA);

        $TAA = $_5->createElement("TAA",0);
        $received->appendChild($TAA);

        $TNC = $_5->createElement("TNC",0);
        $received->appendChild($TNC);

        $profit = $_5->createElement("profit",0);
        $received->appendChild($profit);

        $TCAcom = $_5->createElement("TCAcom",0);
        $received->appendChild($TCAcom);
        
        $TCAcus = $_5->createElement("TCAcus",0);
        $received->appendChild($TCAcus);

        $_5->save($pymentsxml);

        $root = $doc->getElementsByTagName("session")[0];
        
        //-----------------------------------------------
        // creating items xml data if exist

        $_3->load($itemxml);


        $itemMain = $_3->documentElement;
        $items = $doc->getElementsByTagName("item");
        $itemsinrecord = $_3->getElementsByTagName("item");

        for ($i=0; $i < count($items); $i++) {
            $checkitem[$i] = 0;
            $itemIdValue = $items[$i]->getAttributeNode("id")->nodeValue;
            for ($j=0; $j < count($itemsinrecord) ; $j++) { 
                if($itemsinrecord[$j]->getAttributeNode("id")->nodeValue == $itemIdValue){

                    $itemsinrecord[$j]->setAttribute("addwith","session");
                    $itemsinrecord[$j]->setAttribute("session",$ids);
                    $itemsinrecord[$j]->setAttribute("time",date("h:i"));
                    $itemsinrecord[$j]->setAttribute("day",date('d'));
                    $itemsinrecord[$j]->setAttribute("mon",date('m'));
                    $itemsinrecord[$j]->setAttribute("year",date('Y'));

                    $quantityleft = floatval($itemsinrecord[$j]->getElementsByTagName("quntityleft")[0]->nodeValue);
                    $newquantity = floatval($items[$i]->getElementsByTagName("quntity")[0]->nodeValue);
                    $itemsinrecord[$j]->getElementsByTagName("quntityleft")[0]->nodeValue = ($quantityleft + $newquantity);
                    $itemsinrecord[$j]->getElementsByTagName("quntity")[0]->nodeValue = $newquantity;
                    $itemsinrecord[$j]->getElementsByTagName("grate")[0]->nodeValue = $items[$i]->getElementsByTagName("grate")[0]->nodeValue;
                    $itemsinrecord[$j]->getElementsByTagName("hsrate")[0]->nodeValue = $items[$i]->getElementsByTagName("hsrate")[0]->nodeValue;
                    $itemsinrecord[$j]->getElementsByTagName("prate")[0]->nodeValue = $items[$i]->getElementsByTagName("prate")[0]->nodeValue;

                    
                    $_d[$j] = new DOMDocument();
                    $_d[$j]->preserveWhiteSpace = false;
                    $_d[$j]->formatOutput = true;
                
                    $_d[$j]->load($itemdir."/".$itemIdValue.".xml");

                    $Root = $_d[$j]->documentElement;

                    $Root->appendChild($_d[$j]->importNode($itemsinrecord[$j],true));

                    $_d[$j]->save($itemdir."/".$itemIdValue.".xml");

                    $checkitem[$i] = 1;
                }
            }
            if($checkitem[$i] == 0){

                $items[$i]->setAttribute("addwith","session");
                $items[$i]->setAttribute("session",$ids);
                $items[$i]->setAttribute("time",date("h:i"));
                $items[$i]->setAttribute("day",date('d'));
                $items[$i]->setAttribute("mon",date('m'));
                $items[$i]->setAttribute("year",date('Y'));
                $itemMain->appendChild($_3->importNode($items[$i],true));

                $_d[$i] = new DOMDocument();
                $_d[$i]->preserveWhiteSpace = false;
                $_d[$i]->formatOutput = true;

                $Root = $_d[$i]->createElement("days");
                $_d[$i]->appendChild($Root);

                $Root->appendChild($_d[$i]->importNode($items[$i],true));

                $_d[$i]->save($itemdir."/".$itemIdValue.".xml");
            };
        }

        $main = $_4->documentElement;

        $main->appendChild($_4->importNode($root,true));
        $_4->appendChild($main);
        $_4->save($stxml);
        $_3->save($itemxml);

        unlink($fil);
    }


    if($req =="letstart"){
        $fil = $userdir."/temp.xml";
        $stxml = $userdir."/startup.xml";
        $itemxml = $userdir."/items.xml";
        $assetxml = $userdir."/assets.xml";
        $pymentsxml = $userdir."/payments.xml";
        $companiesxml = $userdir."/companies.xml";
        $customerxml = $userdir."/customers.xml";
        $companiesdir = $userdir."/Companies";
        $customerdir = $userdir."/Customers";
        $assetsdir = $userdir."/Assets";
        $itemdir = $userdir."/Items";

        $tnc = $_GET["TNC"];

        $_3 = new DOMDocument();
        $_3->preserveWhiteSpace = false;
        $_3->formatOutput = true;

        $_4 = new DOMDocument();
        $_4->preserveWhiteSpace = false;
        $_4->formatOutput = true;

        $_5 = new DOMDocument();
        $_5->preserveWhiteSpace = false;
        $_5->formatOutput = true;

        
        $doc->load($fil);

        $TOTAL = $doc->getElementsByTagName("total")[0]->nodeValue;

        if($doc->getElementsByTagName("TCAcom")[0] == null){
            $TCAcomany = 0;    
        }else{
            $TCAcomany = floatval($doc->getElementsByTagName("TCAcom")[0]->nodeValue);
        }
        if($doc->getElementsByTagName("TCAcus")[0] == null){
            $TCAcustomer = 0;    
        }else{
            $TCAcustomer = floatval($doc->getElementsByTagName("TCAcus")[0]->nodeValue);
        }
        
        $root = $doc->getElementsByTagName("pinvoice")[0];

        $root->setAttribute("time",date("h:i"));
        $root->setAttribute("day",date('d'));
        $root->setAttribute("mon",date('m'));
        $root->setAttribute("year",date('Y'));

        $TNC = $doc->createElement("TNC",$tnc);
        $root->appendChild($TNC);

        $doc->save($fil);

        //-----------------------------------------------
        // creating company xml data

        if($doc->getElementsByTagName("companies")[0] !== null){
                
            $companiestemp = $doc->getElementsByTagName("companies")[0];

            $_4->appendChild($_4->importNode($companiestemp,true));

            $companies = $_4->getElementsByTagName("company");

            for ($i=0; $i < count($companies); $i++) {
                
                $itemid = $i;
                $companies[$i]->setAttribute("id",$itemid);
                $companies[$i]->setAttribute("type",'add');
                $companies[$i]->setAttribute("credit",'yes');
                $companies[$i]->setAttribute("time",date("h:i"));
                $companies[$i]->setAttribute("day",date('d'));
                $companies[$i]->setAttribute("mon",date('m'));
                $companies[$i]->setAttribute("year",date('Y'));

                $_d[$i] = new DOMDocument();
                $_d[$i]->preserveWhiteSpace = false;
                $_d[$i]->formatOutput = true;

                $Root = $_d[$i]->createElement("histry");
                $_d[$i]->appendChild($Root);

                $day = $_d[$i]->createElement("day");
                $day->setAttribute("addwith",'start');
                $day->setAttribute("credit",'yes');
                $day->setAttribute("time",date("h:i"));
                $day->setAttribute("day",date('d'));
                $day->setAttribute("mon",date('m'));
                $day->setAttribute("year",date('Y'));
                $Root->appendChild($day);

                $tca = $companies[$i]->getElementsByTagName("TCA")[0]->nodeValue;
                $TCA = $_d[$i]->createElement("TCA",$tca);
                $day->appendChild($TCA);

                $_d[$i]->save($companiesdir."/".$itemid.".xml");
            }
            $_4->save($companiesxml);
        }

        if($doc->getElementsByTagName("customers")[0] != null){
                
            $companiestemp = $doc->getElementsByTagName("customers")[0];

            $_5->appendChild($_5->importNode($companiestemp,true));

            $companies = $_5->getElementsByTagName("customer");

            for ($i=0; $i < count($companies); $i++) {
                
                $itemid = $i;
                $companies[$i]->setAttribute("id",$itemid);
                $companies[$i]->setAttribute("addwith",'start');
                $companies[$i]->setAttribute("credit",'yes');
                $companies[$i]->setAttribute("time",date("h:i"));
                $companies[$i]->setAttribute("day",date('d'));
                $companies[$i]->setAttribute("mon",date('m'));
                $companies[$i]->setAttribute("year",date('Y'));

                $_d[$i] = new DOMDocument();
                $_d[$i]->preserveWhiteSpace = false;
                $_d[$i]->formatOutput = true;

                $Root = $_d[$i]->createElement("histry");
                $_d[$i]->appendChild($Root);

                $day = $_d[$i]->createElement("day");
                $day->setAttribute("addwith",'start');
                $day->setAttribute("credit",'yes');
                $day->setAttribute("time",date("h:i"));
                $day->setAttribute("day",date('d'));
                $day->setAttribute("mon",date('m'));
                $day->setAttribute("year",date('Y'));
                $Root->appendChild($day);

                $tca = $companies[$i]->getElementsByTagName("TCA")[0]->nodeValue;
                $TCA = $_d[$i]->createElement("TCA",$tca);
                $day->appendChild($TCA);

                $climit = floatval($companies[$i]->getElementsByTagName("climit")[0]->nodeValue);
                if($climit < floatval($tca)){
                    $climit = $tca;
                    $companies[$i]->getElementsByTagName("climit")[0]->nodeValue = $tca;
                }
                $limit = $_d[$i]->createElement("climit",$climit);
                $day->appendChild($limit);

                $_d[$i]->save($customerdir."/".$itemid.".xml");
            }
            $_5->save($customerxml);
        }

        //-----------------------------------------------
        // creating payments xml data

        $_3Root = $_3->createElement("paymentes");
        $_3->appendChild($_3Root);

        $_3purchase = $_3->createElement("payment");
        $_3Root->appendChild($_3purchase);
        $_3purchase->setAttribute("type","start");
        $_3purchase->setAttribute("time",date("h:i"));
        $_3purchase->setAttribute("day",date('d'));
        $_3purchase->setAttribute("mon",date('m'));
        $_3purchase->setAttribute("year",date('Y'));

        $detail = $_3->createElement("detail","Start up business");
        $_3purchase->appendChild($detail);

        $profit = $_3->createElement("profit","0");
        $_3purchase->appendChild($profit);

        $TCAcom = $_3->createElement("TCAcom",$TCAcomany);
        $_3purchase->appendChild($TCAcom);
        
        $TCAcus = $_3->createElement("TCAcus",$TCAcustomer);
        $_3purchase->appendChild($TCAcus);

        $TNC = $_3->createElement("TNC",$tnc);
        $_3purchase->appendChild($TNC);
        
        $ta = $doc->getElementsByTagName("total")[0]->nodeValue;
        $TIA = $_3->createElement("TIA",$ta);
        $_3purchase->appendChild($TIA);

        if($doc->getElementsByTagName("TAA")[0] == null){
            $taa = 0;    
        }else{
            $taa = $doc->getElementsByTagName("TAA")[0]->nodeValue;
        }
        
        $TAA = $_3->createElement("TAA",$taa);
        $_3purchase->appendChild($TAA);

        $received = $_3->createElement("whatsnew");
        $_3purchase->appendChild($received);

        $TIA = $_3->createElement("TIA",$ta);
        $received->appendChild($TIA);

        $TAA = $_3->createElement("TAA",$taa);
        $received->appendChild($TAA);

        $TNC = $_3->createElement("TNC",$tnc);
        $received->appendChild($TNC);

        $profit = $_3->createElement("profit","0");
        $received->appendChild($profit);

        $TCAcom = $_3->createElement("TCAcom",$TCAcomany);
        $received->appendChild($TCAcom);
        
        $TCAcus = $_3->createElement("TCAcus",$TCAcustomer);
        $received->appendChild($TCAcus);

        $_3->save($pymentsxml);
        
        //-----------------------------------------------
        // creating items xml data

        $_6 = new DOMDocument();
        $_6->preserveWhiteSpace = false;
        $_6->formatOutput = true;
        
        $_6->appendChild($_6->importNode($doc->getElementsByTagName("items")[0],true));

        $itemName = $_6->getElementsByTagName("item");

        for ($i=0; $i < count($itemName) ; $i++) {

            $itemid = $i;
            $itemName[$i]->setAttribute("id",$itemid);
            $itemName[$i]->setAttribute("addwith","start");
            $itemName[$i]->setAttribute("time",date("h:i"));
            $itemName[$i]->setAttribute("day",date('d'));
            $itemName[$i]->setAttribute("mon",date('m'));
            $itemName[$i]->setAttribute("year",date('Y'));

            $_d[$i] = new DOMDocument();
            $_d[$i]->preserveWhiteSpace = false;
            $_d[$i]->formatOutput = true;

            $Root = $_d[$i]->createElement("histry");
            $_d[$i]->appendChild($Root);

            $Root->appendChild($_d[$i]->importNode($itemName[$i],true));

            $_d[$i]->save($itemdir."/".$itemid.".xml");
        }

        $doc2->appendChild($doc2->importNode($doc->documentElement,true));
        $_6->save($itemxml);

        // creating Assets xml data

        if($doc->getElementsByTagName("assets")[0] != null){
            $ast = new DOMDocument();
            $ast->preserveWhiteSpace = false;
            $ast->formatOutput = true;
            
            $ast->appendChild($ast->importNode($doc->getElementsByTagName("assets")[0],true));

            $itemName = $ast->getElementsByTagName("asset");

            for ($i=0; $i < count($itemName) ; $i++) {

                $itemName[$i]->setAttribute("id",$i);
                $itemName[$i]->setAttribute("addwith","start");
                $itemName[$i]->setAttribute("time",date("h:i"));
                $itemName[$i]->setAttribute("day",date('d'));
                $itemName[$i]->setAttribute("mon",date('m'));
                $itemName[$i]->setAttribute("year",date('Y'));

                $_d[$i] = new DOMDocument();
                $_d[$i]->preserveWhiteSpace = false;
                $_d[$i]->formatOutput = true;

                $Root = $_d[$i]->createElement("histry");
                $_d[$i]->appendChild($Root);

                $Root->appendChild($_d[$i]->importNode($itemName[$i],true));

                $_d[$i]->save($assetsdir."/".$i.".xml");

            }
            $ast->save($assetxml);
        }

        $doc2->save($stxml);


        unlink($fil);

        $startup->nodeValue = 1;
    }


    if($req == "deleteCustomers"){
        $fil = $userdir."/temp.xml";
    
        $doc->load($fil);
    
        $root = $doc->getElementsByTagName("customers")[0];
        $items = $doc->getElementsByTagName("pinvoice")[0];
        $items->removeChild($root);
        $child2 = $doc->getElementsByTagName("TCAcus")[0];
        $items->removeChild($child2);
        $doc-> save($fil);
    }

    if($req == "deleteCompanies"){
        $fil = $userdir."/temp.xml";
    
        $doc->load($fil);
    
        $root = $doc->getElementsByTagName("companies")[0];
        $items = $doc->getElementsByTagName("pinvoice")[0];
        $child2 = $doc->getElementsByTagName("TCAcom")[0];
        $items->removeChild($root);$items->removeChild($child2);
        $doc-> save($fil);
    }


    if($req == "updatecus"){
        $fil = $userdir."/temp.xml";
        $cusname = decode($_GET["cusname"]);
        $total = floatval($_GET["total"]);
        $num = decode($_GET["num"]);
        $add = decode($_GET["add"]);
        $credit = $_GET["CC"];
        $limit = $_GET["climit"];
        
        $doc->load($fil);
    
        $root = $doc->getElementsByTagName("customer");
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $cusname){
                $root[$i]->getElementsByTagName("number")[0]->nodeValue = $num;
                $root[$i]->getElementsByTagName("address")[0]->nodeValue = $add;
                $root[$i]->getElementsByTagName("TCA")[0]->nodeValue = $credit;
                $root[$i]->getElementsByTagName("climit")[0]->nodeValue = $limit;
            }
        }
        $doc->getElementsByTagName("TCAcus")[0]->nodeValue = $total;
        $doc-> save($fil);
    }
    
    if($req == "deleteCusTemp"){
        $fil = $userdir."/temp.xml";
        $cusname = decode($_GET["cusname"]);
        $total = $_GET["total"];
    
        $doc->load($fil);
        echo $cusname." has been deleted";
    
        $root = $doc->getElementsByTagName("customer");
        $items = $doc->getElementsByTagName("customers")[0];
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $cusname){
                $items->removeChild($root[$i]);
            }
        }
        $doc->getElementsByTagName("TCAcus")[0]->nodeValue = $total;
        $doc-> save($fil);
    }




if($req == "updatecom"){
    $fil = $userdir."/temp.xml";
    $cusname = decode($_GET["cusname"]);
    $total = floatval($_GET["total"]);
    $num = decode($_GET["num"]);
    $add = decode($_GET["add"]);
    $credit = $_GET["CC"];
    
    $doc->load($fil);

    $root = $doc->getElementsByTagName("company");
    for ($i=0; $i < count($root) ; $i++) {
        if($root[$i]->getAttributeNode("name")->nodeValue == $cusname){
            $root[$i]->getElementsByTagName("number")[0]->nodeValue = $num;
            $root[$i]->getElementsByTagName("address")[0]->nodeValue = $add;
            $root[$i]->getElementsByTagName("TCA")[0]->nodeValue = $credit;
        }
    }
    $doc->getElementsByTagName("TCAcom")[0]->nodeValue = $total;
    $doc-> save($fil);

}

if($req == "deleteComTemp"){
    $fil = $userdir."/temp.xml";
    $cusname = decode($_GET["cusname"]);
    $total = $_GET["total"];

    $doc->load($fil);
    echo $cusname." has been deleted";

    $root = $doc->getElementsByTagName("company");
    $items = $doc->getElementsByTagName("companies")[0];
    for ($i=0; $i < count($root) ; $i++) {
        if($root[$i]->getAttributeNode("name")->nodeValue == $cusname){
            $items->removeChild($root[$i]);
        }
    }
    $doc->getElementsByTagName("TCAcom")[0]->nodeValue = $total;
    $doc-> save($fil);
}
if($req == "addComintemp"){

    $name = decode($_GET["name"]);
    $cusnumber = decode($_GET["number"]);
    $cusaddress = decode($_GET["address"]);
    $cuscredit = $_GET["CC"];
    $total = $_GET["total"];

    $cusxml = $userdir."/temp.xml";

    if(!file_exists($cusxml)){

        $Root = $doc->createElement("pinvoice");
        $doc->appendChild($Root);

        $TCAcom = $doc->createElement("TCAcom",$total);
        $Root->appendChild($TCAcom);

        $cusRoot = $doc->createElement("companies");
        $Root->appendChild($cusRoot);

        $Custag = $doc->createElement("company");
        $Custag->setAttribute("name",$name);
        $Custag->setAttribute("time",date("h:i A"));
        $Custag->setAttribute("day",date('d'));
        $Custag->setAttribute("mon",date('m'));
        $Custag->setAttribute("year",date('Y'));
        $cusRoot->appendChild($Custag);

        $number = $doc->createElement("number",$cusnumber);
        $Custag->appendChild($number);

        $address = $doc->createElement("address",$cusaddress);
        $Custag->appendChild($address);

        $TCA = $doc->createElement("TCA",$cuscredit);
        $Custag->appendChild($TCA);

        $doc->save($cusxml);

    }else{

        $doc->load($cusxml);

        $Root = $doc->documentElement;

        if($doc->getElementsByTagName("companies")[0] == null){
            $cusRoot = $doc->createElement("companies");
            $Root->appendChild($cusRoot);

            $TCAcom = $doc->createElement("TCAcom",$total);
            $Root->appendChild($TCAcom);
        }else{
            $doc->getElementsByTagName("TCAcom")[0]->nodeValue = $total;
            $cusRoot = $doc->getElementsByTagName("companies")[0];
            
        }

        $Custag = $doc->createElement("company");
        $Custag->setAttribute("name",$name);
        $Custag->setAttribute("time",date("h:i A"));
        $Custag->setAttribute("day",date('d'));
        $Custag->setAttribute("mon",date('m'));
        $Custag->setAttribute("year",date('Y'));
        $cusRoot->appendChild($Custag);

        $number = $doc->createElement("number",$cusnumber);
        $Custag->appendChild($number);

        $address = $doc->createElement("address",$cusaddress);
        $Custag->appendChild($address);

        $TCA = $doc->createElement("TCA",$cuscredit);
        $Custag->appendChild($TCA);

        $doc->save($cusxml);
    }
}

if($req == "addCusintemp"){

    $name = decode($_GET["name"]);
    $cusnumber = decode($_GET["number"]);
    $cusaddress = decode($_GET["address"]);
    $cuslimit = $_GET["limit"];
    $cuscredit = $_GET["CC"];
    $total = $_GET["total"];

    $cusxml = $userdir."/temp.xml";

    echo  $cusxml;

    if(!file_exists($cusxml)){

        $Root = $doc->createElement("pinvoice");
        $doc->appendChild($Root);

        $TCAcus = $doc->createElement("TCAcus",$total);
        $Root->appendChild($TCAcus);

        $cusRoot = $doc->createElement("customers");
        $Root->appendChild($cusRoot);

        $Custag = $doc->createElement("customer");
        $Custag->setAttribute("name",$name);
        $Custag->setAttribute("time",date("h:i A"));
        $Custag->setAttribute("day",date('d'));
        $Custag->setAttribute("mon",date('m'));
        $Custag->setAttribute("year",date('Y'));
        $cusRoot->appendChild($Custag);

        $number = $doc->createElement("number",$cusnumber);
        $Custag->appendChild($number);

        $address = $doc->createElement("address",$cusaddress);
        $Custag->appendChild($address);

        $limit = $doc->createElement("climit",$cuslimit);
        $Custag->appendChild($limit);

        $TCA = $doc->createElement("TCA",$cuscredit);
        $Custag->appendChild($TCA);

        $doc->save($cusxml);

    }else{

        $doc->load($cusxml);

        $Root = $doc->documentElement;  

        if($doc->getElementsByTagName("customers")[0] == null){
            $cusRoot = $doc->createElement("customers");
            $Root->appendChild($cusRoot);

            $TCAcus = $doc->createElement("TCAcus",$total);
            $Root->appendChild($TCAcus);
        }else{
            $cusRoot = $doc->getElementsByTagName("customers")[0];
            $doc->getElementsByTagName("TCAcus")[0]->nodeValue = $total;
        }
        $Custag = $doc->createElement("customer");
        $Custag->setAttribute("name",$name);
        $Custag->setAttribute("time",date("h:i A"));
        $Custag->setAttribute("day",date('d'));
        $Custag->setAttribute("mon",date('m'));
        $Custag->setAttribute("year",date('Y'));
        $cusRoot->appendChild($Custag);

        $number = $doc->createElement("number",$cusnumber);
        $Custag->appendChild($number);

        $address = $doc->createElement("address",$cusaddress);
        $Custag->appendChild($address);

        $limit = $doc->createElement("climit",$cuslimit);
        $Custag->appendChild($limit);

        $TCA = $doc->createElement("TCA",$cuscredit);
        $Custag->appendChild($TCA);

        $doc->save($cusxml);
    }
}


$userdoc->save($file);

?>