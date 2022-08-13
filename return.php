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

        if($Uname != ""){
            $getuser = $xpath->query("user[@username='".$Uname."']")[0];
            $userinvoice = $getuser->getElementsByTagName("invoice")[0];
            $userpinvoice = $getuser->getElementsByTagName("pinvoice")[0];
            $usercompany = $getuser->getElementsByTagName("company")[0];
            $usercustomer = $getuser->getElementsByTagName("customer")[0];
            $useritem = $getuser->getElementsByTagName("item")[0];
            $startup = $getuser->getElementsByTagName("startup")[0];
            $userdirnode = $getuser->getElementsByTagName("dir")[0];
            $userdir = "Database/".$userdirnode->nodeValue;
        }
    }

    if($req == "comreturn"){ 
    
        $fil = $userdir."/rttemp.xml";
        $rtxml = $userdir."/preturn.xml";
        $inxml = $userdir."/pinvoice.xml";
        $itemxml = $userdir."/items.xml";
        $pymentsxml = $userdir."/payments.xml";
        $companiesxml = $userdir."/companies.xml";
        $companiesdir = $userdir."/Companies";
        $itemdir = $userdir."/Items";
        $id = 0;
        if(file_exists($rtxml)){
            $iddoc = new newDoc();
            $idfil = $iddoc->main($rtxml);
            $id = count(getTag($idfil,"preturn"));
        }

        $company = urldecode($_GET["com"]);
        $sellernum = urldecode($_GET["comnum"]);
        $selleradd = urldecode($_GET["comadd"]);
        $pammount = floatval($_GET["pammount"]);
        $cammount = floatval($_GET["cammount"]);
        $discount = floatval($_GET["discount"]);

        $_3 = new DOMDocument();
        $_3->preserveWhiteSpace = false;
        $_3->formatOutput = true;

        $_4 = new DOMDocument();
        $_4->preserveWhiteSpace = false;
        $_4->formatOutput = true;

        $_5 = new DOMDocument();
        $_5->preserveWhiteSpace = false;
        $_5->formatOutput = true;
        
        $cusdoc = new newDoc();
        $cusfile = $cusdoc->main($companiesxml);
        $cuspath = new DOMXPath($cusfile);
        $custca = floatval(path($cuspath,"company[@name='$company']",0)->getElementsByTagName('TCA')[0]->nodeValue);

        $doc->load($fil);
        $TOTAL = floatval($doc->getElementsByTagName("total")[0]->nodeValue);

        if($pammount == ($TOTAL-$discount)){
            $re_credit = 0;
        }else if($pammount < ($TOTAL-$discount)){
            $re_credit = $TOTAL-($pammount-$discount);
            $left = $re_credit;

            if(file_exists($inxml)){

                $ivdoc = new DOMDocument();
                $ivdoc->preserveWhiteSpace = false;
                $ivdoc->formatOutput = true;
                $ivdoc->load($inxml);
                $ivpath = new DOMXPath($ivdoc);
                $cusinvoices = $ivpath->query("pinvoice[@issuedto='$company'][@credit='yes']");
                for ($i=0; $i < count($cusinvoices) ; $i++) { 
                    $gainamount = floatval($cusinvoices[$i]->getElementsByTagName("cammount")[0]->nodeValue);
                    if($left == 0){
                        #code...
                    }else if($gainamount <= $left){
                        $cusinvoices[$i]->getAttributeNode("credit")->nodeValue = "no";
                        $newtag = $ivdoc->createElement("pammount",$left);
                        $cusinvoices[$i]->appendChild($newtag);
                        setDate($newtag);
                        $cusinvoices[$i]->getElementsByTagName("cammount")[0]->nodeValue = 0;
                        $left -= $gainamount;
                    }else{
                        $newtag = $ivdoc->createElement("pammount",$left);
                        $cusinvoices[$i]->appendChild($newtag);
                        setDate($newtag);
                        $cusinvoices[$i]->getElementsByTagName("cammount")[0]->nodeValue = $gainamount-$left;
                        $left = 0;
                    }
                }
                $ivdoc->save($inxml);
            }

        }

        $root = $doc->getElementsByTagName("preturn")[0];
        if($cammount == "0"){
            $root->setAttribute("credit","no");  
        }else{
            $root->setAttribute("credit","yes");
        }

        $root->setAttribute("returnby",$company);
        $root->setAttribute("time",date("h:i A"));
        $root->setAttribute("day",date('d'));
        $root->setAttribute("mon",date('m'));
        $root->setAttribute("year",date('Y'));

        $creditvalue = ($cammount-$custca)+($pammount+$discount);

        $Paidammount = $doc->createElement("pammount",$pammount);
        $root->appendChild($Paidammount);

        $CreditAmmount = $doc->createElement("cammount",$creditvalue);
        $root->appendChild($CreditAmmount);

        $discountAmmount = $doc->createElement("discount",$discount);
        $root->appendChild($discountAmmount);

        $PCA = $doc->createElement("PCA",$custca);
        $root->appendChild($PCA);

        if(getTag($doc,"company",0) == null){
                
            $Seller = $doc->createElement("company");
            $Seller->setAttribute("name",$company);

            $Snum = $doc->createElement("number",$sellernum);
            $Seller->appendChild($Snum);

            $Sadd = $doc->createElement("address",$selleradd);
            $Seller->appendChild($Sadd);

            $root->appendChild($Seller);
        }
        if(getTag($doc,"TCA",0) == null){
            $Seller = getTag($doc,"company",0);
            $comTCA = $doc->createElement("TCA",$cammount);
            $Seller->appendChild($comTCA);
        }else{
            getTag($doc,"TCA",0,$cammount);
        }
        $doc->save($fil);

        //-----------------------------------------------
        // creating company xml data

        $_4->load($companiesxml);

        $invoiceSeller = $doc->getElementsByTagName("company")[0];

        $Sellers = $_4->getElementsByTagName("company");
        for ($i=0; $i < count($Sellers); $i++) {
            if($Sellers[$i]->getAttributeNode("name")->nodeValue == $company){

                $cusid  = $Sellers[$i]->getAttributeNode("id")->nodeValue;
                $Sellers[$i]->setAttribute("time",date("h:i A"));
                $Sellers[$i]->setAttribute("day",date('d'));
                $Sellers[$i]->setAttribute("mon",date('m'));
                $Sellers[$i]->setAttribute("year",date('Y'));
                
                $Sellers[$i]->getElementsByTagName("number")[0]->nodeValue = $sellernum;
                $Sellers[$i]->getElementsByTagName("address")[0]->nodeValue = $selleradd;

                $_6 = new DOMDocument();
                $_6->preserveWhiteSpace = false;
                $_6->formatOutput = true;

                $_6->load($companiesdir."/".$cusid.".xml");

                $Root6 = $_6->documentElement;

                $_6purchase = $_6->createElement("day");
                $Root6->appendChild($_6purchase);
                $_6purchase->setAttribute("preturn",$id);
                $_6purchase->setAttribute("type","preturn");
                if($cammount == "0"){
                    $_6purchase->setAttribute("credit","no");  
                }else{
                    $_6purchase->setAttribute("credit","yes");
                }
                $_6purchase->setAttribute("time",date("h:i A"));
                $_6purchase->setAttribute("day",date('d'));
                $_6purchase->setAttribute("mon",date('m'));
                $_6purchase->setAttribute("year",date('Y'));


                $Sellers[$i]->getElementsByTagName("TCA")[0]->nodeValue = $cammount;

                $CreditAmmount = $_6->createElement("cammount",$creditvalue);
                $_6purchase->appendChild($CreditAmmount);
                $Paidammount = $_6->createElement("pammount",$pammount);
                $_6purchase->appendChild($Paidammount);
                $total = $_6->createElement("total",$TOTAL);
                $_6purchase->appendChild($total);
                $TCA = $_6->createElement("TCA",$cammount);
                $_6purchase->appendChild($TCA);

                $_6->save($companiesdir."/".$cusid.".xml");
                $_4->save($companiesxml);
            }
        }
        
        //-----------------------------------------------
        // creating payments xml data if exist

        $_5->load($pymentsxml);

        $_5Root = $_5->getElementsByTagName("paymentes")[0];

        $_5purchase = $_5->createElement("payment");
        $_5Root->appendChild($_5purchase);
        $_5purchase->setAttribute("type","received");
        $_5purchase->setAttribute("way","preturn");
        $_5purchase->setAttribute("preturn",$id);
        if($cammount == "0"){
            $_5purchase->setAttribute("credit","no");  
        }else{
            $_5purchase->setAttribute("credit","yes");
        }
        $_5purchase->setAttribute("time",date("h:i A"));
        $_5purchase->setAttribute("day",date('d'));
        $_5purchase->setAttribute("mon",date('m'));
        $_5purchase->setAttribute("year",date('Y'));

        $detail = $_5->createElement("detail","Payment details of items return to company No : ".$id);
        $_5purchase->appendChild($detail);

        $lastpayment = $_5->getElementsByTagName("payment")[count($_5->getElementsByTagName("payment"))-2];
        $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

        $profit = $_5->createElement("profit",$PP-$discount);
        $_5purchase->appendChild($profit);

        $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
        $TCAcom = $_5->createElement("TCAcom",(floatval($tcacom)-($custca+$cammount)));
        $_5purchase->appendChild($TCAcom);
        
        $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
        $TCAcus = $_5->createElement("TCAcus",$tcacus);
        $_5purchase->appendChild($TCAcus);

        $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
        $TNC = $_5->createElement("TNC",floatval($tnc+$pammount));
        $_5purchase->appendChild($TNC);
        
        $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
        $TIA = $_5->createElement("TIA",$ta-$TOTAL);
        $_5purchase->appendChild($TIA);

        $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
        $TAA = $_5->createElement("TAA",$taa);
        $_5purchase->appendChild($TAA);

        $received = $_5->createElement("whatsnew");
        $_5purchase->appendChild($received);

        $TIA = $_5->createElement("TIA",-$TOTAL);
        $received->appendChild($TIA);

        $TAA = $_5->createElement("TAA",0);
        $received->appendChild($TAA);

        $TNC = $_5->createElement("TNC",-$pammount);
        $received->appendChild($TNC);

        $profit = $_5->createElement("profit",-$discount);
        $received->appendChild($profit);

        $TCAcom = $_5->createElement("TCAcom",$creditvalue);
        $received->appendChild($TCAcom);
        
        $TCAcus = $_5->createElement("TCAcus",0);
        $received->appendChild($TCAcus);

        $_5->save($pymentsxml);

        $root = $doc->getElementsByTagName("preturn")[0];
        
        //-----------------------------------------------
        // creating items xml data if exist

        $_3->load($itemxml);

        $items = $doc->getElementsByTagName("item");

        $itemMain = $_3->documentElement;
        $itemsinrecord = $_3->getElementsByTagName("item");

        for ($i=0; $i < count($items); $i++) {
            $checkitem[$i] = 0;
            $itemNameValue = $items[$i]->getAttributeNode("name")->nodeValue;
            for ($j=0; $j < count($itemsinrecord) ; $j++) { 
                if($itemsinrecord[$j]->getAttributeNode("name")->nodeValue == $itemNameValue){

                    $itemid = $itemsinrecord[$j]->getAttributeNode("id")->nodeValue;
                    
                    $quantityleft = floatval($itemsinrecord[$j]->getElementsByTagName("quntityleft")[0]->nodeValue);
                    $newquantity = floatval($items[$i]->getElementsByTagName("quntity")[0]->nodeValue);
                    $itemsinrecord[$j]->getElementsByTagName("quntityleft")[0]->nodeValue = ($quantityleft - $newquantity);
                    $_3->save($itemxml);

                    $Grate = floatval($itemsinrecord[$j]->getElementsByTagName("grate")[0]->nodeValue);
                    $newquantity = floatval($items[$i]->getElementsByTagName("quntity")[0]->nodeValue);
                    $SRate = floatval($items[$i]->getElementsByTagName("grate")[0]->nodeValue);

                    $_d[$j] = new DOMDocument();
                    $_d[$j]->preserveWhiteSpace = false;
                    $_d[$j]->formatOutput = true;
                
                    $_d[$j]->load($itemdir."/".$itemid.".xml");

                    $Root = $_d[$j]->documentElement;

                    $subRoot = $_d[$j]->createElement("item");
                    $subRoot->setAttribute("preturn",$id);
                    $subRoot->setAttribute("company",$company);
                    $subRoot->setAttribute("time",date("h:i A"));
                    $subRoot->setAttribute("day",date('d'));
                    $subRoot->setAttribute("mon",date('m'));
                    $subRoot->setAttribute("year",date('Y'));
                    $Root->appendChild($subRoot);

                    $Rate = $_d[$j]->createElement("grate",$SRate);
                    $subRoot->appendChild($Rate);

                    $quantity = $_d[$j]->createElement("quantity",$newquantity);
                    $subRoot->appendChild($quantity);

                    $quantityleft = $_d[$j]->createElement("quantityleft",($quantityleft - $newquantity));
                    $subRoot->appendChild($quantityleft);

                    $profit = $_d[$j]->createElement("profit",0);
                    $subRoot->appendChild($profit);

                    $_d[$j]->save($itemdir."/".$itemid.".xml");

                    $checkitem[$i] = 1;
                }
            }
        }

        if($id == 0){
            $main = $doc2->createElement("preturns");
        }else{
            $doc2->load($rtxml);
            $main = $doc2->getElementsByTagName("preturns")[0];
        }
        $main->appendChild($doc2->importNode($root,true));
        $preturn = $main->getElementsByTagName("preturn")[$id];
        $preturn->setAttribute("number",$id);
        $doc2->appendChild($main);
        $doc2->save($rtxml);
        
        $userdoc->save($file);
        echo 1;

        unlink($fil); 
    }

    if($req == "Greturn"){

    $fil = $userdir."/rttemp2.xml";
    $rtxml = $userdir."/return.xml";
    $inxml = $userdir."/invoice.xml";
    $itemxml = $userdir."/items.xml";
    $pymentsxml = $userdir."/payments.xml";
    $companiesxml = $userdir."/customers.xml";
    $companiesdir = $userdir."/Customers";
    $itemdir = $userdir."/Items";
    $id = 0;
    if(file_exists($rtxml)){
        $iddoc = new newDoc();
        $idfil = $iddoc->main($rtxml);
        $id = count(getTag($idfil,"return"));
    }

    $company = urldecode($_GET["cus"]);
    $sellernum = urldecode($_GET["cusnum"]);
    $selleradd = urldecode($_GET["cusadd"]);
    $pammount = floatval($_GET["pammount"]);
    $cammount = floatval($_GET["cammount"]);
    $discount = floatval($_GET["discount"]);

    $_3 = new DOMDocument();
    $_3->preserveWhiteSpace = false;
    $_3->formatOutput = true;

    $_4 = new DOMDocument();
    $_4->preserveWhiteSpace = false;
    $_4->formatOutput = true;

    $_5 = new DOMDocument();
    $_5->preserveWhiteSpace = false;
    $_5->formatOutput = true;
    
    $cusdoc = new newDoc();
    $cusfile = $cusdoc->main($companiesxml);
    $cuspath = new DOMXPath($cusfile);
    $custca = floatval(path($cuspath,"customer[@name='$company']",0)->getElementsByTagName('TCA')[0]->nodeValue);

    $doc->load($fil);
    $TOTAL = floatval($doc->getElementsByTagName("total")[0]->nodeValue);

    if($pammount == ($TOTAL-$discount)){
        $re_credit = 0;
    }else if($pammount < ($TOTAL-$discount)){
        $re_credit = $TOTAL-($pammount-$discount);
        $left = $re_credit;

        if(file_exists($inxml)){

            $ivdoc = new DOMDocument();
            $ivdoc->preserveWhiteSpace = false;
            $ivdoc->formatOutput = true;
            $ivdoc->load($inxml);
            $ivpath = new DOMXPath($ivdoc);
            $cusinvoices = $ivpath->query("invoice[@issuedto='$company'][@credit='yes']");
            for ($i=0; $i < count($cusinvoices) ; $i++) { 
                $gainamount = floatval($cusinvoices[$i]->getElementsByTagName("cammount")[0]->nodeValue);
                if($left == 0){
                    #code...
                }else if($gainamount <= $left){
                    $cusinvoices[$i]->getAttributeNode("credit")->nodeValue = "no";
                    $newtag = $ivdoc->createElement("pammount",$left);
                    $cusinvoices[$i]->appendChild($newtag);
                    setDate($newtag);
                    $cusinvoices[$i]->getElementsByTagName("cammount")[0]->nodeValue = 0;
                    $left -= $gainamount;
                }else{
                    $newtag = $ivdoc->createElement("pammount",$left);
                    $cusinvoices[$i]->appendChild($newtag);
                    setDate($newtag);
                    $cusinvoices[$i]->getElementsByTagName("cammount")[0]->nodeValue = $gainamount-$left;
                    $left = 0;
                }
            }
            $ivdoc->save($inxml);
        }

    }

    $root = $doc->getElementsByTagName("return")[0];
    if($cammount == "0"){
        $root->setAttribute("credit","no");  
    }else{
        $root->setAttribute("credit","yes");
    }

    $root->setAttribute("returnby",$company);
    $root->setAttribute("time",date("h:i A"));
    $root->setAttribute("day",date('d'));
    $root->setAttribute("mon",date('m'));
    $root->setAttribute("year",date('Y'));

    $creditvalue = ($cammount-$custca)+($pammount+$discount);

    $Paidammount = $doc->createElement("pammount",$pammount);
    $root->appendChild($Paidammount);

    $CreditAmmount = $doc->createElement("cammount",$creditvalue);
    $root->appendChild($CreditAmmount);

    $discountAmmount = $doc->createElement("discount",$discount);
    $root->appendChild($discountAmmount);

    $PCA = $doc->createElement("PCA",$custca);
    $root->appendChild($PCA);

    if(getTag($doc,"customer",0) == null){
            
        $Seller = $doc->createElement("customer");
        $Seller->setAttribute("name",$company);

        $Snum = $doc->createElement("number",$sellernum);
        $Seller->appendChild($Snum);

        $Sadd = $doc->createElement("address",$selleradd);
        $Seller->appendChild($Sadd);

        $root->appendChild($Seller);
    }
    if(getTag($doc,"TCA",0) == null){
        $Seller = getTag($doc,"customer",0);
        $comTCA = $doc->createElement("TCA",$cammount);
        $Seller->appendChild($comTCA);
    }else{
        getTag($doc,"TCA",0,$cammount);
    }
    $doc->save($fil);

    //-----------------------------------------------
    // creating company xml data

    $_4->load($companiesxml);

    $checkSeller = 0;

    $invoiceSeller = $doc->getElementsByTagName("customer")[0];

    $Sellers = $_4->getElementsByTagName("customer");
    for ($i=0; $i < count($Sellers); $i++) {
        if($Sellers[$i]->getAttributeNode("name")->nodeValue == $company){

            $cusid  = $Sellers[$i]->getAttributeNode("id")->nodeValue;
            $Sellers[$i]->setAttribute("time",date("h:i A"));
            $Sellers[$i]->setAttribute("day",date('d'));
            $Sellers[$i]->setAttribute("mon",date('m'));
            $Sellers[$i]->setAttribute("year",date('Y'));
            
            $Sellers[$i]->getElementsByTagName("number")[0]->nodeValue = $sellernum;
            $Sellers[$i]->getElementsByTagName("address")[0]->nodeValue = $selleradd;

            $_6 = new DOMDocument();
            $_6->preserveWhiteSpace = false;
            $_6->formatOutput = true;

            $_6->load($companiesdir."/".$cusid.".xml");

            $Root6 = $_6->documentElement;

            $_6purchase = $_6->createElement("day");
            $Root6->appendChild($_6purchase);
            $_6purchase->setAttribute("return",$id);
            $_6purchase->setAttribute("type","return");
            if($cammount == "0"){
                $_6purchase->setAttribute("credit","no");  
            }else{
                $_6purchase->setAttribute("credit","yes");
            }
            $_6purchase->setAttribute("time",date("h:i A"));
            $_6purchase->setAttribute("day",date('d'));
            $_6purchase->setAttribute("mon",date('m'));
            $_6purchase->setAttribute("year",date('Y'));


            $Sellers[$i]->getElementsByTagName("TCA")[0]->nodeValue = $cammount;

            $CreditAmmount = $_6->createElement("cammount",$creditvalue);
            $_6purchase->appendChild($CreditAmmount);
            $Paidammount = $_6->createElement("pammount",$pammount);
            $_6purchase->appendChild($Paidammount);
            $total = $_6->createElement("total",$TOTAL);
            $_6purchase->appendChild($total);
            $TCA = $_6->createElement("TCA",$cammount);
            $_6purchase->appendChild($TCA);

            $_6->save($companiesdir."/".$cusid.".xml");
            $_4->save($companiesxml);
        }
    }

    
    //-----------------------------------------------
    // creating payments xml data if exist

    $_5->load($pymentsxml);

    $_5Root = $_5->getElementsByTagName("paymentes")[0];

    $_5purchase = $_5->createElement("payment");
    $_5Root->appendChild($_5purchase);
    $_5purchase->setAttribute("type","sent");
    $_5purchase->setAttribute("way","return");
    $_5purchase->setAttribute("return",$id);
    if($cammount == "0"){
        $_5purchase->setAttribute("credit","no");  
    }else{
        $_5purchase->setAttribute("credit","yes");
    }
    $_5purchase->setAttribute("time",date("h:i A"));
    $_5purchase->setAttribute("day",date('d'));
    $_5purchase->setAttribute("mon",date('m'));
    $_5purchase->setAttribute("year",date('Y'));

    $detail = $_5->createElement("detail","Payment details of items return from customer No : ".$id);
    $_5purchase->appendChild($detail);

    $items = $doc->getElementsByTagName("item");
    $itemsdoc = new DOMDocument();
    $itemsdoc->load($itemxml);
    $itemX = new DOMXPath($itemsdoc);
    $Profit = 0;
    for ($i=0; $i < count($items) ; $i++) {
        $name1 = $items[$i]->getAttributeNode("name")->nodeValue;
        $SRate = floatval($items[$i]->getElementsByTagName("rate")[0]->nodeValue);
        $SQun = floatval($items[$i]->getElementsByTagName("quntity")[0]->nodeValue);

        $getitem = $itemX->query("item[@name='".$name1."']")[0];
        $grate = floatval($getitem->getElementsByTagName("grate")[0]->nodeValue);

        $Profit += ($SRate-$grate)*$SQun;
    }

    $lastpayment = $_5->getElementsByTagName("payment")[count($_5->getElementsByTagName("payment"))-2];
    $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

    $profit = $_5->createElement("profit",$PP-($Profit-$discount));
    $_5purchase->appendChild($profit);

    $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
    $TCAcom = $_5->createElement("TCAcom",$tcacom);
    $_5purchase->appendChild($TCAcom);
    
    $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
    $TCAcus = $_5->createElement("TCAcus",(floatval($tcacus-$custca)+$cammount));
    $_5purchase->appendChild($TCAcus);

    $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
    $TNC = $_5->createElement("TNC",floatval($tnc -$pammount));
    $_5purchase->appendChild($TNC);
    
    $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
    $TIA = $_5->createElement("TIA",$ta+($TOTAL-$Profit));
    $_5purchase->appendChild($TIA);

    $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
    $TAA = $_5->createElement("TAA",$taa);
    $_5purchase->appendChild($TAA);

    $received = $_5->createElement("whatsnew");
    $_5purchase->appendChild($received);

    $TIA = $_5->createElement("TIA",($TOTAL-$Profit));
    $received->appendChild($TIA);

    $TAA = $_5->createElement("TAA",0);
    $received->appendChild($TAA);

    $TNC = $_5->createElement("TNC",-$pammount);
    $received->appendChild($TNC);

    $profit = $_5->createElement("profit",-($Profit-$discount));
    $received->appendChild($profit);

    $TCAcom = $_5->createElement("TCAcom",0);
    $received->appendChild($TCAcom);
    
    $TCAcus = $_5->createElement("TCAcus",$creditvalue);
    $received->appendChild($TCAcus);

    $_5->save($pymentsxml);

    $root = $doc->getElementsByTagName("return")[0];
    
    //-----------------------------------------------
    // creating items xml data if exist

    $_3->load($itemxml);



    $itemMain = $_3->documentElement;
    $itemsinrecord = $_3->getElementsByTagName("item");

    for ($i=0; $i < count($items); $i++) {
        $checkitem[$i] = 0;
        $itemNameValue = $items[$i]->getAttributeNode("name")->nodeValue;
        for ($j=0; $j < count($itemsinrecord) ; $j++) { 
            if($itemsinrecord[$j]->getAttributeNode("name")->nodeValue == $itemNameValue){

                $itemid = $itemsinrecord[$j]->getAttributeNode("id")->nodeValue;
                

                $quantityleft = floatval($itemsinrecord[$j]->getElementsByTagName("quntityleft")[0]->nodeValue);
                $newquantity = floatval($items[$i]->getElementsByTagName("quntity")[0]->nodeValue);
                $itemsinrecord[$j]->getElementsByTagName("quntityleft")[0]->nodeValue = ($quantityleft + $newquantity);
                $_3->save($itemxml);

                $Grate = floatval($itemsinrecord[$j]->getElementsByTagName("grate")[0]->nodeValue);
                $newquantity = floatval($items[$i]->getElementsByTagName("quntity")[0]->nodeValue);
                $SRate = floatval($items[$i]->getElementsByTagName("rate")[0]->nodeValue);

                $_d[$j] = new DOMDocument();
                $_d[$j]->preserveWhiteSpace = false;
                $_d[$j]->formatOutput = true;
            
                $_d[$j]->load($itemdir."/".$itemid.".xml");

                $Root = $_d[$j]->documentElement;

                $subRoot = $_d[$j]->createElement("item");
                $subRoot->setAttribute("return",$id);
                $subRoot->setAttribute("customer",$company);
                $subRoot->setAttribute("time",date("h:i A"));
                $subRoot->setAttribute("day",date('d'));
                $subRoot->setAttribute("mon",date('m'));
                $subRoot->setAttribute("year",date('Y'));
                $Root->appendChild($subRoot);

                $Rate = $_d[$j]->createElement("prate",$SRate);
                $subRoot->appendChild($Rate);

                $quantity = $_d[$j]->createElement("quantity",$newquantity);
                $subRoot->appendChild($quantity);

                $quantityleft = $_d[$j]->createElement("quantityleft",($quantityleft + $newquantity));
                $subRoot->appendChild($quantityleft);

                $profit = $_d[$j]->createElement("profit",-(($SRate-$Grate) * $newquantity));
                $subRoot->appendChild($profit);

                $_d[$j]->save($itemdir."/".$itemid.".xml");

                $checkitem[$i] = 1;
            }
        }
    }

    if($id == 0){
        $main = $doc2->createElement("returns");
    }else{
        $doc2->load($rtxml);
        $main = $doc2->getElementsByTagName("returns")[0];
    }
    $main->appendChild($doc2->importNode($root,true));
    $return = $main->getElementsByTagName("return")[$id];
    $return->setAttribute("number",$id);
    $doc2->appendChild($main);
    $doc2->save($rtxml);
    
    $userdoc->save($file);
    echo 1;

    unlink($fil);
    }
    if($req == "copytag"){
        $fil = $userdir."/rttemp2.xml";
        $invxml = $userdir."/invoice.xml";
        $invoice = $_GET["inv"];

        $doc = new newDoc();
        $open = $doc->main($invxml);
        $xpath = new DOMXPath($open);
        $target = path($xpath,"invoice[@number='$invoice']",0);
        $rttag = renameTag($target,"return");
        $pammount = getTag($rttag,"pammount");
        for ($i=count($pammount)-1; $i > -1 ; $i--) {
            $rttag->removeChild($pammount[$i]);
        }

        $rttag->removeChild(getTag($rttag,"cammount",0));
        if(getTag($rttag,"PCA",0) !== null){
            $rttag->removeChild(getTag($rttag,"PCA",0));
        }
        if(getTag($rttag,"discount",0) !== null){
            $rttag->removeChild(getTag($rttag,"discount",0));
        }

        $rt = new newDoc();
        $rtdoc = $rt->main();
        $rt->imNode($rtdoc,$rttag,true);
        $rt->save($fil);
    }
    if($req == "copytag2"){
        $fil = $userdir."/rttemp.xml";
        $invxml = $userdir."/pinvoice.xml";
        $invoice = $_GET["inv"];

        $doc = new newDoc();
        $open = $doc->main($invxml);
        $xpath = new DOMXPath($open);
        $target = path($xpath,"pinvoice[@number='$invoice']",0);
        $rttag = renameTag($target,"preturn");
        $pammount = getTag($rttag,"pammount");
        for ($i=count($pammount)-1; $i > -1 ; $i--) {
            $rttag->removeChild($pammount[$i]);
        }

        $rttag->removeChild(getTag($rttag,"cammount",0));
        if(getTag($rttag,"PCA",0) !== null){
            $rttag->removeChild(getTag($rttag,"PCA",0));
        }
        if(getTag($rttag,"discount",0) !== null){
            $rttag->removeChild(getTag($rttag,"discount",0));
        }

        $rt = new newDoc();
        $rtdoc = $rt->main();
        $rt->imNode($rtdoc,$rttag,true);
        $rt->save($fil);
    }
    if($req == "deleteitem"){
        $fil = $userdir."/rttemp2.xml";
        $Iname = urldecode($_GET["Iname"]);
        $total = $_GET["total"];
        $doc->load($fil);

        $root = $doc->getElementsByTagName("item");
        $items = $doc->getElementsByTagName("items")[0];
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $Iname){
                $items->removeChild($root[$i]);
            }
        }
        $doc->getElementsByTagName("total")[0]->nodeValue = $total;
        $doc-> save($fil);
        
    }
    if($req == "deleteitem2"){
        $fil = $userdir."/rttemp.xml";
        $Iname = urldecode($_GET["Iname"]);
        $total = $_GET["total"];
        $doc->load($fil);

        $root = $doc->getElementsByTagName("item");
        $items = $doc->getElementsByTagName("items")[0];
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $Iname){
                $items->removeChild($root[$i]);
            }
        }
        $doc->getElementsByTagName("total")[0]->nodeValue = $total;
        $doc-> save($fil);
        
    }
    if($req == "updateitem"){
        $fil = $userdir."/rttemp2.xml";
        $Iname = urldecode($_GET["Iname"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Prate = $_GET["rate"];
        $total = $_GET["total"];
        
        $doc->load($fil);

        $root = $doc->getElementsByTagName("item");
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $Iname){
                $root[$i]->getElementsByTagName("quntity")[0]->nodeValue = $Iqun;
                $root[$i]->getElementsByTagName("rate")[0]->nodeValue = $Prate;
            }
        }
        $doc->getElementsByTagName("total")[0]->nodeValue = $total;
        $doc-> save($fil);

    }
    if($req == "updateitem2"){
        $fil = $userdir."/rttemp.xml";
        $Iname = urldecode($_GET["Iname"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Prate = $_GET["rate"];
        $total = $_GET["total"];
        
        $doc->load($fil);

        $root = $doc->getElementsByTagName("item");
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $Iname){
                $root[$i]->getElementsByTagName("quntity")[0]->nodeValue = $Iqun;
                $root[$i]->getElementsByTagName("grate")[0]->nodeValue = $Prate;
            }
        }
        $doc->getElementsByTagName("total")[0]->nodeValue = $total;
        $doc-> save($fil);

    }
    if($req == "purchaseitem"){
        $fil = $userdir."/rttemp2.xml";
        $Iname = urldecode($_GET["Iname"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Prate = $_GET["rate"];
        $total = $_GET["total"];


        if(!file_exists($fil)){
            
            $main = $doc->createElement("return");
            $doc->appendChild($main);
            $root = $doc->createElement("items");
            $main->appendChild($root);
            $TOTAL = $doc->createElement("total",$total);
            $main->appendChild($TOTAL);
        
            $item = $doc->createElement("item");
            $item->setAttribute("name",$Iname);
            $root->appendChild($item);

            $qun = $doc->createElement("quntity",$Iqun);
            $item->appendChild($qun);

            $prate = $doc->createElement("rate",$Prate);
            $item->appendChild($prate);

            $doc->save($fil);
            echo 1;
            
         }else{
            $doc->load($fil);
            $main = $doc->documentElement;
            $root = $main->getElementsByTagName("items")[0];

            $item = $doc->createElement("item");
            $item->setAttribute("name",$Iname);

            $main->getElementsByTagName("total")[0]->nodeValue = $total;

            $root->appendChild($item);

            $qun = $doc->createElement("quntity",$Iqun);
            $item->appendChild($qun);

            $prate = $doc->createElement("rate",$Prate);
            $item->appendChild($prate);

            $doc->save($fil);
            echo 1;
        }
    }
    if($req == "purchaseitem2"){
        $fil = $userdir."/rttemp.xml";
        $Iname = urldecode($_GET["Iname"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Prate = $_GET["rate"];
        $total = $_GET["total"];


        if(!file_exists($fil)){
            
            $main = $doc->createElement("preturn");
            $doc->appendChild($main);
            $root = $doc->createElement("items");
            $main->appendChild($root);
            $TOTAL = $doc->createElement("total",$total);
            $main->appendChild($TOTAL);
        
            $item = $doc->createElement("item");
            $item->setAttribute("name",$Iname);
            $root->appendChild($item);

            $qun = $doc->createElement("quntity",$Iqun);
            $item->appendChild($qun);

            $prate = $doc->createElement("grate",$Prate);
            $item->appendChild($prate);

            $doc->save($fil);
            echo 1;
            
         }else{
            $doc->load($fil);
            $main = $doc->documentElement;
            $root = $main->getElementsByTagName("items")[0];

            $item = $doc->createElement("item");
            $item->setAttribute("name",$Iname);

            $main->getElementsByTagName("total")[0]->nodeValue = $total;

            $root->appendChild($item);

            $qun = $doc->createElement("quntity",$Iqun);
            $item->appendChild($qun);

            $prate = $doc->createElement("grate",$Prate);
            $item->appendChild($prate);

            $doc->save($fil);
            echo 1;
        }
    }
?>