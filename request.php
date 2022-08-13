
<?php

    require "myphp.php";
    
    $bol = true;
    $file = "users.xml";
    $datafolder = "Database";
    
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


    if($req == "rpinc"){
        $id = decode($_GET["id"]);
        $received = floatval($_GET["rec"]);
        $inxml = $userdir."/pinvoice.xml";
        $pymentsxml = $userdir."/payments.xml";
        $companiesxml = $userdir."/companies.xml";
        $companiesdir = $userdir."/Companies";

        $_3 = new DOMDocument();
        $_3->preserveWhiteSpace = false;
        $_3->formatOutput = true;

        $doc->load($inxml);
        $doc2->load($pymentsxml);
        $_3->load($companiesxml);
        $xpath2 = new DOMXPath($doc);
        $cxpath = new DOMXPath($_3);

        $customer = $cxpath->query("company[@id='$id']")[0];
        $TCA = $customer->getElementsByTagName("TCA")[0];
        $TCA->nodeValue = floatval($TCA->nodeValue)-$received;

        $_4 = new DOMDocument();
        $_4->preserveWhiteSpace = false;
        $_4->formatOutput = true;
        $_4->load($companiesdir."/".$id.".xml");

        $cusRoot = $_4->documentElement;
        $day = $_4->createElement("day");
        $day->setAttribute("type","payment");
        
        setDate($day);
        $cusRoot->appendChild($day);
        $Paidammount = $_4->createElement("pammount",$received);
        $day->appendChild($Paidammount);

        $TCAhead = $_4->getElementsByTagName("day")[count($_4->getElementsByTagName("day"))-2];
        $lastTCA = $TCAhead->getElementsByTagName("TCA")[0]->nodeValue;
        $TCA = $_4->createElement("TCA",floatval($lastTCA)-$received);
        $day->appendChild($TCA);
        

        $doc2Root = $doc2->getElementsByTagName("paymentes")[0];

        $doc2purchase = $doc2->createElement("payment");
        $doc2Root->appendChild($doc2purchase);
        $doc2purchase->setAttribute("type","sent");
        $doc2purchase->setAttribute("to","company");
        $doc2purchase->setAttribute("company",$id);
        setDate($doc2purchase);

        $lastpayment = $doc2->getElementsByTagName("payment")[count($doc2->getElementsByTagName("payment"))-2];
        $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

        $profit = $doc2->createElement("profit",$PP);
        $doc2purchase->appendChild($profit);

        $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
        $TCAcom = $doc2->createElement("TCAcom",floatval($tcacom)-$received);
        $doc2purchase->appendChild($TCAcom);
        
        $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
        $TCAcus = $doc2->createElement("TCAcus",$tcacus);
        $doc2purchase->appendChild($TCAcus);

        $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
        $TNC = $doc2->createElement("TNC",floatval($tnc)-$received);
        $doc2purchase->appendChild($TNC);
        
        $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
        $TIA = $doc2->createElement("TIA",$ta);
        $doc2purchase->appendChild($TIA);

        $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
        $TAA = $doc2->createElement("TAA",$taa);
        $doc2purchase->appendChild($TAA);

        $receive = $doc2->createElement("whatsnew");
        $doc2purchase->appendChild($receive);

        $TIA = $doc2->createElement("TIA",0);
        $receive->appendChild($TIA);

        $TAA = $doc2->createElement("TAA",0);
        $receive->appendChild($TAA);

        $TNC = $doc2->createElement("TNC","-".$received);
        $receive->appendChild($TNC);
        
        $profit = $doc2->createElement("profit",0);
        $receive->appendChild($profit);

        $TCAcom = $doc2->createElement("TCAcom","-".$received);
        $receive->appendChild($TCAcom);
        
        $TCAcus = $doc2->createElement("TCAcus",0);
        $receive->appendChild($TCAcus);

        $invoice = $xpath2->query("pinvoice[@issuedto='$id'][@credit='yes']");
        
        for ($i=0; $i < count($invoice) ; $i++) {
            $cammount = floatval($invoice[$i]->getElementsByTagName("cammount")[0]->nodeValue);
            if($received == 0){
                #code...
            }else if($cammount <= $received){
                $invoice[$i]->getAttributeNode("credit")->nodeValue = "no";
                $pammount = $doc->createElement("pammount",$cammount);
                $invoice[$i]->appendChild($pammount);
                setDate($pammount);
                $invoice[$i]->getElementsByTagName("cammount")[0]->nodeValue = 0;
                $received -= $cammount;
            }else{
                $pammount = $doc->createElement("pammount",$received);
                $invoice[$i]->appendChild($pammount);
                setDate($pammount);
                $invoice[$i]->getElementsByTagName("cammount")[0]->nodeValue = $cammount-$received;
                $received = 0;
            }
        }

        $_4->save($companiesdir."/".$id.".xml");
        $doc->save($inxml);
        $doc2->save($pymentsxml);
        $_3->save($companiesxml);
    }

    if($req == "rinc"){
        $id = decode($_GET["id"]);
        $received = floatval($_GET["rec"]);
        $inxml = $userdir."/invoice.xml";
        $pymentsxml = $userdir."/payments.xml";
        $companiesxml = $userdir."/customers.xml";
        $companiesdir = $userdir."/Customers";

        $_3 = new DOMDocument();
        $_3->preserveWhiteSpace = false;
        $_3->formatOutput = true;

        $doc->load($inxml);
        $doc2->load($pymentsxml);
        $_3->load($companiesxml);
        $xpath2 = new DOMXPath($doc);
        $cxpath = new DOMXPath($_3);

        $customer = $cxpath->query("customer[@id='$id']")[0];
        $TCA = $customer->getElementsByTagName("TCA")[0];
        $TCA->nodeValue = floatval($TCA->nodeValue)-$received;

        $_4 = new DOMDocument();
        $_4->preserveWhiteSpace = false;
        $_4->formatOutput = true;
        $_4->load($companiesdir."/".$id.".xml");

        $cusRoot = $_4->documentElement;
        $day = $_4->createElement("day");
        $day->setAttribute("type","payment");
        setDate($day);
        $cusRoot->appendChild($day);
        $Paidammount = $_4->createElement("pammount",$received);
        $day->appendChild($Paidammount);

        $TCAhead = $_4->getElementsByTagName("day")[count($_4->getElementsByTagName("day"))-2];
        $lastTCA = $TCAhead->getElementsByTagName("TCA")[0]->nodeValue;
        $TCA = $_4->createElement("TCA",floatval($lastTCA)-$received);
        $day->appendChild($TCA);
        

        $doc2Root = $doc2->getElementsByTagName("paymentes")[0];

        $doc2purchase = $doc2->createElement("payment");
        $doc2Root->appendChild($doc2purchase);
        $doc2purchase->setAttribute("type","received");
        $doc2purchase->setAttribute("way",$id);
        setDate($doc2purchase);

        $lastpayment = $doc2->getElementsByTagName("payment")[count($doc2->getElementsByTagName("payment"))-2];
        $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

        $profit = $doc2->createElement("profit",$PP);
        $doc2purchase->appendChild($profit);

        $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
        $TCAcom = $doc2->createElement("TCAcom",$tcacom);
        $doc2purchase->appendChild($TCAcom);
        
        $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
        $TCAcus = $doc2->createElement("TCAcus",floatval($tcacus)-$received);
        $doc2purchase->appendChild($TCAcus);

        $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
        $TNC = $doc2->createElement("TNC",floatval($tnc)+$received);
        $doc2purchase->appendChild($TNC);
        
        $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
        $TIA = $doc2->createElement("TIA",$ta);
        $doc2purchase->appendChild($TIA);

        $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
        $TAA = $doc2->createElement("TAA",$taa);
        $doc2purchase->appendChild($TAA);

        $receive = $doc2->createElement("whatsnew");
        $doc2purchase->appendChild($receive);

        $TIA = $doc2->createElement("TIA",0);
        $receive->appendChild($TIA);

        $TAA = $doc2->createElement("TAA",0);
        $receive->appendChild($TAA);

        $TNC = $doc2->createElement("TNC",$received);
        $receive->appendChild($TNC);
        
        $profit = $doc2->createElement("profit",0);
        $receive->appendChild($profit);

        $TCAcom = $doc2->createElement("TCAcom",0);
        $receive->appendChild($TCAcom);
        
        $TCAcus = $doc2->createElement("TCAcus","-".$received);
        $receive->appendChild($TCAcus);

        $invoice = $xpath2->query("invoice[@issuedto='$id'][@credit='yes']");
        
        for ($i=0; $i < count($invoice) ; $i++) { 
            $cammount = floatval($invoice[$i]->getElementsByTagName("cammount")[0]->nodeValue);
            if($received == 0){
                #code...
            }else if($cammount <= $received){
                $invoice[$i]->getAttributeNode("credit")->nodeValue = "no";
                $pammount = $doc->createElement("pammount",$cammount);
                $invoice[$i]->appendChild($pammount);
                setDate($pammount);
                $invoice[$i]->getElementsByTagName("cammount")[0]->nodeValue = 0;
                $received -= $cammount;
            }else{
                $pammount = $doc->createElement("pammount",$received);
                $invoice[$i]->appendChild($pammount);
                setDate($pammount);
                $invoice[$i]->getElementsByTagName("cammount")[0]->nodeValue = $cammount-$received;
                $received = 0;
            }
        }

        $_4->save($companiesdir."/".$id.".xml");
        $doc->save($inxml);
        $doc2->save($pymentsxml);
        $_3->save($companiesxml);
    }

    if($req =="GBill"){
        $fil = $userdir."/temp2.xml";
        $pinxml = $userdir."/invoice.xml";
        $itemxml = $userdir."/items.xml";
        $pymentsxml = $userdir."/payments.xml";
        $companiesxml = $userdir."/customers.xml";
        $companiesdir = $userdir."/Customers";
        $itemdir = $userdir."/Items";

        $invoice = 0;
        if(file_exists($pinxml)){
            $invdocforid = new newDoc();
            $invmainforid = $invdocforid->main($pinxml);
            $invoice = count(getTag($invdocforid,"invoice"));
        }
        $companyid = $_GET["cus"];
        $companyname = decode($_GET["cusname"]);
        $companyid2 = $companyid;
        if($companyid == "-1"){
            if(file_exists($companiesxml)){
                $comdocforid = new newDoc();
                $commainforid = $comdocforid->main($companiesxml);
                $companyid2 = count(getTag($comdocforid,"customer"));
            }else{
                $companyid2 = 0;
            }
        }
        $sellernum = decode($_GET["cusnum"]);
        $selleradd = decode($_GET["cusadd"]);
        $pammount = floatval($_GET["pammount"]);
        $discount = floatval($_GET["discount"]);

        $doc->load($fil);
        $TOTAL = floatval($doc->getElementsByTagName("total")[0]->nodeValue);
        $re_credit = 0;

        $cammount = $TOTAL-($pammount+$discount);

        if($pammount == ($TOTAL-$discount)){
            $cammount = 0;
        }else
        if($pammount > ($TOTAL-$discount)){
            $cammount = 0;
            $left = $pammount-$TOTAL;
            $re_credit = $pammount-$TOTAL;

            if(file_exists($pinxml)){

                $ivdoc = new DOMDocument();
                $ivdoc->preserveWhiteSpace = false;
                $ivdoc->formatOutput = true;
                $ivdoc->load($pinxml);
                $ivpath = new DOMXPath($ivdoc);
                $cusinvoices = $ivpath->query("invoice[@issuedto='$companyid2'][@credit='yes']");
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
                $ivdoc->save($pinxml);
            }
        }


        $_3 = new DOMDocument();
        $_3->preserveWhiteSpace = false;
        $_3->formatOutput = true;

        $_4 = new DOMDocument();
        $_4->preserveWhiteSpace = false;
        $_4->formatOutput = true;

        $_5 = new DOMDocument();
        $_5->preserveWhiteSpace = false;
        $_5->formatOutput = true;

        $root = $doc->getElementsByTagName("invoice")[0];
        if($cammount == 0){
            $root->setAttribute("credit","no");  
        }else{
            $root->setAttribute("credit","yes");
        }

        $root->setAttribute("issuedto",$companyid2);
        $root->setAttribute("time",date("h:i A"));
        $root->setAttribute("day",date('d'));
        $root->setAttribute("mon",date('m'));
        $root->setAttribute("year",date('Y'));

        $Paidammount = $doc->createElement("pammount",$pammount);
        $root->appendChild($Paidammount);

        $CreditAmmount = $doc->createElement("cammount",$cammount);
        $root->appendChild($CreditAmmount);

        $Discount = $doc->createElement("discount",$discount);
        $root->appendChild($Discount);

        $TCAbefore = 0;
        $comdoc = new newDoc();
        if(file_exists($companiesxml)){
            $commain = $comdoc->main($companiesxml);
            $compath = new DOMXPath($commain);
            if($compath->query("customer[@id='$companyid2']")[0] !== null){
                $TCAbefore = path($compath,"customer[@id='$companyid2']")[0]->getElementsByTagName("TCA")[0]->nodeValue;
            }
        }
        $PCA = $doc->createElement("PCA",$TCAbefore);
        $root->appendChild($PCA);

        $Seller = $doc->createElement("customer");

        $Seller->setAttribute("id",$companyid2);

        $Snum = $doc->createElement("number",$sellernum);
        $Seller->appendChild($Snum);

        
        $cusTCA = $doc->createElement("TCA",($cammount+$TCAbefore)-$re_credit);
        $Seller->appendChild($cusTCA);

        $Sadd = $doc->createElement("address",$selleradd);
        $Seller->appendChild($Sadd);

        $root->appendChild($Seller);

        $doc->save($fil);
        

        //-----------------------------------------------
        // creating customer xml data

        if(!file_exists($companiesxml)){

            $invoiceSeller = $doc->getElementsByTagName("customer")[0];
            $comRoot = $_4->createElement("customers");
            $comRoot->appendChild($_4->importNode($invoiceSeller,true));
            $_4->appendChild($comRoot);

            $Sellertag = $_4->getElementsByTagName("customer")[0];
            $Sellertag->setAttribute("id",0);
            $Sellertag->setAttribute("name",$companyname);
            $Sellertag->setAttribute("time",date("h:i A"));
            $Sellertag->setAttribute("day",date('d'));
            $Sellertag->setAttribute("mon",date('m'));
            $Sellertag->setAttribute("year",date('Y'));
            

            $climit = $_4->createElement("climit",($cammount*2));
            $Sellertag->appendChild($climit);

            $_6 = new DOMDocument();
            $_6->preserveWhiteSpace = false;
            $_6->formatOutput = true;

            $Root6 = $_6->createElement("customer");
            $_6->appendChild($Root6);

            $_6purchase = $_6->createElement("day");
            $Root6->appendChild($_6purchase);
            $_6purchase->setAttribute("addwith","invoice");
            $_6purchase->setAttribute("invoice",$invoice);
            $_6purchase->setAttribute("type","sale");
            if($cammount == 0){
                $_6purchase->setAttribute("credit","no");  
            }else{
                $_6purchase->setAttribute("credit","yes");
            }
            $_6purchase->setAttribute("time",date("h:i A"));
            $_6purchase->setAttribute("day",date('d'));
            $_6purchase->setAttribute("mon",date('m'));
            $_6purchase->setAttribute("year",date('Y'));

            $Paidammount = $_6->createElement("pammount",$pammount);
            $_6purchase->appendChild($Paidammount);

            $CreditAmmount = $_6->createElement("cammount",$cammount);
            $_6purchase->appendChild($CreditAmmount);

            $TotalAmmount = $_6->createElement("tammount",$TOTAL);
            $_6purchase->appendChild($TotalAmmount);

            $TCA = $_6->createElement("TCA",$cammount);
            $_6purchase->appendChild($TCA);

            $limit = $_6->createElement("climit",($cammount*2));
            $_6purchase->appendChild($limit);
            
            $_6->save($companiesdir."/0.xml");

            $_4->save($companiesxml);
        }else{
            //-----------------------------------------------
            // creating customer xml data if exist

            $_4->load($companiesxml);

            $invoiceSeller = $doc->getElementsByTagName("customer")[0];

            $Sellers = $_4->getElementsByTagName("customer");
            for ($i=0; $i < count($Sellers); $i++) {
                if($Sellers[$i]->getAttributeNode("id")->nodeValue == $companyid){

                    $Sellers[$i]->setAttribute("time",date("h:i A"));
                    $Sellers[$i]->setAttribute("day",date('d'));
                    $Sellers[$i]->setAttribute("mon",date('m'));
                    $Sellers[$i]->setAttribute("year",date('Y'));

                    $Sellers[$i]->getElementsByTagName("number")[0]->nodeValue = $sellernum;
                    $Sellers[$i]->getElementsByTagName("address")[0]->nodeValue = $selleradd;
                    
                    $_6 = new DOMDocument();
                    $_6->preserveWhiteSpace = false;
                    $_6->formatOutput = true;

                    $_6->load($companiesdir."/".$companyid.".xml");

                    $Root6 = $_6->documentElement;

                    $_6purchase = $_6->createElement("day");
                    $Root6->appendChild($_6purchase);
                    $_6purchase->setAttribute("invoice",$invoice);
                    $_6purchase->setAttribute("type","sale");
                    if($cammount == 0){
                        $_6purchase->setAttribute("credit","no");
                    }else{
                        $_6purchase->setAttribute("credit","yes");
                    }
                    $_6purchase->setAttribute("time",date("h:i A"));
                    $_6purchase->setAttribute("day",date('d'));
                    $_6purchase->setAttribute("mon",date('m'));
                    $_6purchase->setAttribute("year",date('Y'));

                    $Paidammount = $_6->createElement("pammount",$pammount);
                    $_6purchase->appendChild($Paidammount);

                    $CreditAmmount = $_6->createElement("cammount",$cammount);
                    $_6purchase->appendChild($CreditAmmount);

                    $TotalAmmount = $_6->createElement("tammount",$TOTAL);
                    $_6purchase->appendChild($TotalAmmount);

                    $Sellers[$i]->getElementsByTagName("TCA")[0]->nodeValue = ($cammount+$TCAbefore)-$re_credit;

                    $TCA = $_6->createElement("TCA",($cammount+$TCAbefore)-$re_credit);
                    $_6purchase->appendChild($TCA);

                    $_6->save($companiesdir."/".$companyid.".xml");
                    $_4->save($companiesxml);
                }
            }

            if($companyid == "-1"){
                $comRoot = $_4->getElementsByTagName("customers")[0];
                $comRoot->appendChild($_4->importNode($invoiceSeller,true));

                $Sellertag = $_4->getElementsByTagName("customer")[count($_4->getElementsByTagName("customer"))-1];
                $Sellertag->setAttribute("id",$companyid2);
                $Sellertag->setAttribute("name",$companyname);
                $Sellertag->setAttribute("time",date("h:i A"));
                $Sellertag->setAttribute("day",date('d'));
                $Sellertag->setAttribute("mon",date('m'));
                $Sellertag->setAttribute("year",date('Y'));

                $climit = $_4->createElement("climit",($cammount*2));
                $Sellertag->appendChild($climit);

                $_6 = new DOMDocument();
                $_6->preserveWhiteSpace = false;
                $_6->formatOutput = true;

                $Root6 = $_6->createElement("customer");
                $_6->appendChild($Root6);

                $_6purchase = $_6->createElement("day");
                $Root6->appendChild($_6purchase);
                $_6purchase->setAttribute("addwith","invoice");
                $_6purchase->setAttribute("invoice",$invoice);
                $_6purchase->setAttribute("type","sale");
                if($cammount == "0"){
                    $_6purchase->setAttribute("credit","no");
                }else{
                    $_6purchase->setAttribute("credit","yes");
                }
                $_6purchase->setAttribute("time",date("h:i A"));
                $_6purchase->setAttribute("day",date('d'));
                $_6purchase->setAttribute("mon",date('m'));
                $_6purchase->setAttribute("year",date('Y'));

                $Paidammount = $_6->createElement("pammount",$pammount);
                $_6purchase->appendChild($Paidammount);

                $CreditAmmount = $_6->createElement("cammount",$cammount);
                $_6purchase->appendChild($CreditAmmount);

                $TotalAmmount = $_6->createElement("tammount",$TOTAL);
                $_6purchase->appendChild($TotalAmmount);

                $TCA = $_6->createElement("TCA",$cammount);
                $_6purchase->appendChild($TCA);

                $limit = $_6->createElement("climit",($cammount*2));
                $_6purchase->appendChild($limit);

                $comInt = floatval($usercustomer->nodeValue);
                $usercustomer->nodeValue = $comInt+1;

                $_6->save($companiesdir."/".$companyid2.".xml");

                $_4->save($companiesxml);
            }
        }
        //-----------------------------------------------
        // creating payments xml data

        $_5->load($pymentsxml);

        $_5Root = $_5->getElementsByTagName("paymentes")[0];

        $_5purchase = $_5->createElement("payment");
        $_5Root->appendChild($_5purchase);
        $_5purchase->setAttribute("type","received");
        $_5purchase->setAttribute("way","invoice");
        $_5purchase->setAttribute("invoice",$invoice);
        $_5purchase->setAttribute("customer",$companyid2);
        if($cammount == 0){
            $_5purchase->setAttribute("credit","no");
        }else{
            $_5purchase->setAttribute("credit","yes");
        }
        $_5purchase->setAttribute("time",date("h:i A"));
        $_5purchase->setAttribute("day",date('d'));
        $_5purchase->setAttribute("mon",date('m'));
        $_5purchase->setAttribute("year",date('Y'));

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

        $profit = $_5->createElement("profit",$Profit+floatval($PP)-$discount);
        $_5purchase->appendChild($profit);

        $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
        $TCAcom = $_5->createElement("TCAcom",$tcacom);
        $_5purchase->appendChild($TCAcom);
        
        $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
        $TCAcus = $_5->createElement("TCAcus",(floatval($tcacus)+$cammount)-$re_credit);
        $_5purchase->appendChild($TCAcus);

        $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
        $TNC = $_5->createElement("TNC",floatval($tnc)+$pammount);
        $_5purchase->appendChild($TNC);
        
        $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
        $TIA = $_5->createElement("TIA",$ta-($TOTAL-$Profit));
        $_5purchase->appendChild($TIA);

        $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
        $TAA = $_5->createElement("TAA",$taa);
        $_5purchase->appendChild($TAA);

        $received = $_5->createElement("whatsnew");
        $_5purchase->appendChild($received);

        $TIA = $_5->createElement("TIA","-".($TOTAL-$Profit));
        $received->appendChild($TIA);

        $TAA = $_5->createElement("TAA",0);
        $received->appendChild($TAA);

        $TNC = $_5->createElement("TNC",$pammount);
        $received->appendChild($TNC);

        $Discount = $_5->createElement("discount",$discount);
        $received->appendChild($Discount);
        
        $profit = $_5->createElement("profit",$Profit-$discount);
        $received->appendChild($profit);

        $TCAcom = $_5->createElement("TCAcom",0);
        $received->appendChild($TCAcom);
        
        $TCAcus = $_5->createElement("TCAcus",$cammount-$re_credit);
        $received->appendChild($TCAcus);

        $_5->save($pymentsxml);

        //-----------------------------------------------
        // creating items xml data
        
        $_3->load($itemxml);

        $itemMain = $_3->documentElement;
        $items = $doc->getElementsByTagName("item");
        $itemsinrecord = $_3->getElementsByTagName("item");

        for ($i=0; $i < count($items); $i++) {
            $checkitem[$i] = 0;
            $itemId = $items[$i]->getAttributeNode("id")->nodeValue;
            for ($j=0; $j < count($itemsinrecord) ; $j++) { 
                if($itemsinrecord[$j]->getAttributeNode("name")->nodeValue == $itemId){

                    $quantityleft = floatval($itemsinrecord[$j]->getElementsByTagName("quntityleft")[0]->nodeValue);
                    $Grate = floatval($itemsinrecord[$j]->getElementsByTagName("grate")[0]->nodeValue);
                    $newquantity = floatval($items[$i]->getElementsByTagName("quntity")[0]->nodeValue);
                    $SRate = floatval($items[$i]->getElementsByTagName("rate")[0]->nodeValue);
                    $itemsinrecord[$j]->getElementsByTagName("quntityleft")[0]->nodeValue = ($quantityleft - $newquantity);

                    $_d[$j] = new DOMDocument();
                    $_d[$j]->preserveWhiteSpace = false;
                    $_d[$j]->formatOutput = true;
                
                    $_d[$j]->load($itemdir."/".$itemId.".xml");

                    $Root = $_d[$j]->documentElement;

                    $subRoot = $_d[$j]->createElement("item");
                    $subRoot->setAttribute("invoice",$invoice);
                    $subRoot->setAttribute("customer",$companyid);
                    $subRoot->setAttribute("time",date("h:i A"));
                    $subRoot->setAttribute("day",date('d'));
                    $subRoot->setAttribute("mon",date('m'));
                    $subRoot->setAttribute("year",date('Y'));
                    $Root->appendChild($subRoot);

                    $Rate = $_d[$j]->createElement("prate",$SRate);
                    $subRoot->appendChild($Rate);

                    $quantity = $_d[$j]->createElement("quantity",$newquantity);
                    $subRoot->appendChild($quantity);

                    $quantityleft = $_d[$j]->createElement("quantityleft",($quantityleft - $newquantity));
                    $subRoot->appendChild($quantityleft);

                    $profit = $_d[$j]->createElement("profit",(($SRate-$Grate) * $newquantity));
                    $subRoot->appendChild($profit);

                    $_d[$j]->save($itemdir."/".$itemId.".xml");

                }
            }
        }
        
        $root = $doc->getElementsByTagName("invoice")[0];
        
        $main = "";
        if($invoice == "1"){
            $main = $doc2->createElement("invoices");

        }else{
            $doc2->load($pinxml);
            $main = $doc2->getElementsByTagName("invoices")[0];
        }
        
        $main->appendChild($doc2->importNode($root,true));
        $doc2->appendChild($main);
        $doc2->save($pinxml);
        $_3->save($itemxml);

        $comInt = floatval($userinvoice->nodeValue);
        $userinvoice->nodeValue = $comInt+1;
        
        $userdoc->save($file);
        unlink($fil);
        echo 1;
    }

    if($req == "deleteitem2"){
        $fil = $userdir."/temp2.xml";
        $id = decode($_GET["id"]);
        $total = $_GET["total"];
        $doc->load($fil);

        $root = $doc->getElementsByTagName("item");
        $items = $doc->getElementsByTagName("items")[0];
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("id")->nodeValue == $id){
                $items->removeChild($root[$i]);
            }
        }
        $doc->getElementsByTagName("total")[0]->nodeValue = $total;
        $doc-> save($fil);
        
    }

    if($req == "updateitem2"){
        $fil = $userdir."/temp2.xml";
        $id = decode($_GET["id"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Prate = $_GET["rate"];
        $invoice = $_GET["invoice"];
        $total = $_GET["total"];
        
        $doc->load($fil);

        $root = $doc->getElementsByTagName("item");
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("id")->nodeValue == $id){
                $root[$i]->getElementsByTagName("quntity")[0]->nodeValue = $Iqun;
                $root[$i]->getElementsByTagName("rate")[0]->nodeValue = $Prate;
            }
        }
        $doc->getElementsByTagName("total")[0]->nodeValue = $total;
        $doc-> save($fil);

    }

    if($req == "addCom"){

        $name = decode($_GET["name"]);
        $cusnumber = decode($_GET["number"]);
        $cusaddress = decode($_GET["address"]);
        $cuscredit = $_GET["CC"];

        $cusxml = $userdir."/companies.xml";
        $cusdir = $userdir."/Companies";
        $pymentsxml = $userdir."/payments.xml";

        $cusid = 0;
        if(file_exists($pinxml)){
            $cusdocforid = new newDoc();
            $cusmainforid = $cusdocforid->main($cusxml);
            $cusid = count(getTag($cusdocforid,"company"));
        }

        if(!file_exists($cusxml)){

            $cusRoot = $doc->createElement("companies");
            $doc->appendChild($cusRoot);

            $Custag = $doc->createElement("company");
            $Custag->setAttribute("name",$name);
            $Custag->setAttribute("id",$cusid);
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

            if($cuscredit != "0"){

                $pym = new DOMDocument();
                $pym->preserveWhiteSpace = false;
                $pym->formatOutput = true;

                $pym->load($pymentsxml);

                $pymRoot = $pym->documentElement;

                $pympurchase = $pym->createElement("payment");
                $pymRoot->appendChild($pympurchase);
                $pympurchase->setAttribute("type","sent");
                $pympurchase->setAttribute("way","new company");
                $pympurchase->setAttribute("from",$cusid);
                $pympurchase->setAttribute("time",date("h:i A"));
                $pympurchase->setAttribute("day",date('d'));
                $pympurchase->setAttribute("mon",date('m'));
                $pympurchase->setAttribute("year",date('Y'));

                $lastpayment = $pym->getElementsByTagName("payment")[count($pym->getElementsByTagName("payment"))-2];
                $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

                $profit = $pym->createElement("profit",$PP);
                $pympurchase->appendChild($profit);

                $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
                $TCAcom = $pym->createElement("TCAcom",(floatval($tcacom)+floatval($cuscredit)));
                $pympurchase->appendChild($TCAcom);
                
                $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
                $TCAcus = $pym->createElement("TCAcus",$tcacus);
                $pympurchase->appendChild($TCAcus);

                $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
                $TNC = $pym->createElement("TNC",$tnc);
                $pympurchase->appendChild($TNC);
                
                $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
                $TIA = $pym->createElement("TIA",$ta);
                $pympurchase->appendChild($TIA);

                $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
                $TAA = $pym->createElement("TAA",$taa);
                $pympurchase->appendChild($TAA);

                $received = $pym->createElement("whatsnew");
                $pympurchase->appendChild($received);

                $TIA = $pym->createElement("TIA",0);
                $received->appendChild($TIA);

                $TAA = $pym->createElement("TAA",0);
                $received->appendChild($TAA);

                $TNC = $pym->createElement("TNC",0);
                $received->appendChild($TNC);

                $profit = $pym->createElement("profit",0);
                $received->appendChild($profit);

                $TCAcom = $pym->createElement("TCAcom",$cuscredit);
                $received->appendChild($TCAcom);
                
                $TCAcus = $pym->createElement("TCAcus",0);
                $received->appendChild($TCAcus);

                $pym->save($pymentsxml);
            
            }

            $_5 = new DOMDocument();
            $_5->preserveWhiteSpace = false;
            $_5->formatOutput = true;

            $_5Root = $_5->createElement("company");
            $_5->appendChild($_5Root);

            $_5purchase = $_5->createElement("day");
            $_5Root->appendChild($_5purchase);
            $_5purchase->setAttribute("type","add");
            if($cuscredit == "0"){
                $_5purchase->setAttribute("credit","no");
            }else{
                $_5purchase->setAttribute("credit","yes");
            }
            $_5purchase->setAttribute("time",date("h:i A"));
            $_5purchase->setAttribute("day",date('d'));
            $_5purchase->setAttribute("mon",date('m'));
            $_5purchase->setAttribute("year",date('Y'));

            $TCA = $_5->createElement("TCA",$cuscredit);
            $_5purchase->appendChild($TCA);

            $_5->save($cusdir."/".$cusid.".xml");

        }else{

            $doc->load($cusxml);
            $cusRoot = $doc->documentElement;

            $namecheck = false;

            $Root = $doc->getElementsByTagName("company");
            for ($i=0; $i < count($Root) ; $i++) { 
                if($Root[$i]->getAttributeNode("name")->nodeValue == $name){
                    echo 0;
                    $namecheck = true;
                }
            }

            if($namecheck == false){

                $Custag = $doc->createElement("company");
                $Custag->setAttribute("name",$name);
                $Custag->setAttribute("id",$cusid);
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

                if($cuscredit != "0"){

                    $pym = new DOMDocument();
                    $pym->preserveWhiteSpace = false;
                    $pym->formatOutput = true;

                    $pym->load($pymentsxml);

                    $pymRoot = $pym->documentElement;

                    $pympurchase = $pym->createElement("payment");
                    $pymRoot->appendChild($pympurchase);
                    $pympurchase->setAttribute("type","sent");
                    $pympurchase->setAttribute("way","new company");
                    $pympurchase->setAttribute("from",$cusid);
                    $pympurchase->setAttribute("time",date("h:i A"));
                    $pympurchase->setAttribute("day",date('d'));
                    $pympurchase->setAttribute("mon",date('m'));
                    $pympurchase->setAttribute("year",date('Y'));

                    $lastpayment = $pym->getElementsByTagName("payment")[count($pym->getElementsByTagName("payment"))-2];
                    $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

                    $profit = $pym->createElement("profit",$PP);
                    $pympurchase->appendChild($profit);

                    $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
                    $TCAcom = $pym->createElement("TCAcom",(floatval($tcacom)+floatval($cuscredit)));
                    $pympurchase->appendChild($TCAcom);
                    
                    $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
                    $TCAcus = $pym->createElement("TCAcus",$tcacus);
                    $pympurchase->appendChild($TCAcus);

                    $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
                    $TNC = $pym->createElement("TNC",$tnc);
                    $pympurchase->appendChild($TNC);
                    
                    $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
                    $TIA = $pym->createElement("TIA",$ta);
                    $pympurchase->appendChild($TIA);

                    $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
                    $TAA = $pym->createElement("TAA",$taa);
                    $pympurchase->appendChild($TAA);

                    $received = $pym->createElement("whatsnew");
                    $pympurchase->appendChild($received);

                    $TIA = $pym->createElement("TIA",0);
                    $received->appendChild($TIA);

                    $TAA = $pym->createElement("TAA",0);
                    $received->appendChild($TAA);

                    $TNC = $pym->createElement("TNC",0);
                    $received->appendChild($TNC);

                    $profit = $pym->createElement("profit",0);
                    $received->appendChild($profit);

                    $TCAcom = $pym->createElement("TCAcom",$cuscredit);
                    $received->appendChild($TCAcom);
                    
                    $TCAcus = $pym->createElement("TCAcus",0);
                    $received->appendChild($TCAcus);

                    $pym->save($pymentsxml);
                
                }

                $_5 = new DOMDocument();
                $_5->preserveWhiteSpace = false;
                $_5->formatOutput = true;

                $_5Root = $_5->createElement("company");
                $_5->appendChild($_5Root);

                $_5purchase = $_5->createElement("day");
                $_5Root->appendChild($_5purchase);
                $_5purchase->setAttribute("type","add");
                if($cuscredit == "0"){
                    $_5purchase->setAttribute("credit","no");
                }else{
                    $_5purchase->setAttribute("credit","yes");
                }
                $_5purchase->setAttribute("time",date("h:i A"));
                $_5purchase->setAttribute("day",date('d'));
                $_5purchase->setAttribute("mon",date('m'));
                $_5purchase->setAttribute("year",date('Y'));

                $TCA = $_5->createElement("TCA",$cuscredit);
                $_5purchase->appendChild($TCA);


                $_5->save($cusdir."/".$cusid.".xml");

            }
        }
        $userdoc->save($file);
    }

    if($req == "addCus"){

        $name = decode($_GET["name"]);
        $cusnumber = decode($_GET["number"]);
        $cusaddress = decode($_GET["address"]);
        $cuslimit = $_GET["limit"];
        $cuscredit = $_GET["CC"];

        $cusxml = $userdir."/customers.xml";
        $cusdir = $userdir."/Customers";
        $pymentsxml = $userdir."/payments.xml";

        $cusid = 0;
        if(file_exists($pinxml)){
            $cusdocforid = new newDoc();
            $cusmainforid = $cusdocforid->main($cusxml);
            $cusid = count(getTag($cusdocforid,"customer"));
        }

        if(!file_exists($cusxml)){

            $cusRoot = $doc->createElement("customers");
            $doc->appendChild($cusRoot);

            $Custag = $doc->createElement("customer");
            $Custag->setAttribute("name",$name);
            $Custag->setAttribute("id",$cusid);
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

            if($cuscredit != "0"){
                $pym = new DOMDocument();
                $pym->preserveWhiteSpace = false;
                $pym->formatOutput = true;

                $pym->load($pymentsxml);

                $pymRoot = $pym->documentElement;

                $pympurchase = $pym->createElement("payment");
                $pymRoot->appendChild($pympurchase);
                $pympurchase->setAttribute("type","received");
                $pympurchase->setAttribute("way","new customer");
                $pympurchase->setAttribute("from",$cusid);
                $pympurchase->setAttribute("time",date("h:i A"));
                $pympurchase->setAttribute("day",date('d'));
                $pympurchase->setAttribute("mon",date('m'));
                $pympurchase->setAttribute("year",date('Y'));


                $lastpayment = $pym->getElementsByTagName("payment")[count($pym->getElementsByTagName("payment"))-2];
                $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

                $profit = $pym->createElement("profit",$PP);
                $pympurchase->appendChild($profit);

                $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
                $TCAcom = $pym->createElement("TCAcom",$tcacom);
                $pympurchase->appendChild($TCAcom);
                
                $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
                $TCAcus = $pym->createElement("TCAcus",(floatval($tcacus)+floatval($cuscredit)));
                $pympurchase->appendChild($TCAcus);

                $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
                $TNC = $pym->createElement("TNC",$tnc);
                $pympurchase->appendChild($TNC);
                
                $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
                $TIA = $pym->createElement("TIA",$ta);
                $pympurchase->appendChild($TIA);

                $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
                $TAA = $pym->createElement("TAA",$taa);
                $pympurchase->appendChild($TAA);

                $received = $pym->createElement("whatsnew");
                $pympurchase->appendChild($received);

                $TIA = $pym->createElement("TIA",0);
                $received->appendChild($TIA);

                $TAA = $pym->createElement("TAA",0);
                $received->appendChild($TAA);

                $TNC = $pym->createElement("TNC",0);
                $received->appendChild($TNC);

                $profit = $pym->createElement("profit",0);
                $received->appendChild($profit);

                $TCAcom = $pym->createElement("TCAcom",0);
                $received->appendChild($TCAcom);
                
                $TCAcus = $pym->createElement("TCAcus",$cuscredit);
                $received->appendChild($TCAcus);

                $pym->save($pymentsxml);
            
            }
            
            $_5 = new DOMDocument();
            $_5->preserveWhiteSpace = false;
            $_5->formatOutput = true;

            $_5Root = $_5->createElement("customer");
            $_5->appendChild($_5Root);

            $_5purchase = $_5->createElement("day");
            $_5Root->appendChild($_5purchase);
            $_5purchase->setAttribute("type","add");
            if($cuscredit == "0"){
                $_5purchase->setAttribute("credit","no");
            }else{
                $_5purchase->setAttribute("credit","yes");
            }
            $_5purchase->setAttribute("time",date("h:i A"));
            $_5purchase->setAttribute("day",date('d'));
            $_5purchase->setAttribute("mon",date('m'));
            $_5purchase->setAttribute("year",date('Y'));

            $limit = $_5->createElement("climit",$cuslimit);
            $_5purchase->appendChild($limit);

            $TCA = $_5->createElement("TCA",$cuscredit);
            $_5purchase->appendChild($TCA);


            $_5->save($cusdir."/".$cusid.".xml");

        }else{

            $doc->load($cusxml);
            $cusRoot = $doc->documentElement;

            $namecheck = false;

            $Root = $doc->getElementsByTagName("customer");
            for ($i=0; $i < count($Root) ; $i++) { 
                if($Root[$i]->getAttributeNode("name")->nodeValue == $name){
                    echo 0;
                    $namecheck = true;
                }
            }

            if($namecheck == false){

                $Custag = $doc->createElement("customer");
                $Custag->setAttribute("name",$name);
                $Custag->setAttribute("id",$cusid);
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

                if($cuscredit != "0"){

                    $pym = new DOMDocument();
                    $pym->preserveWhiteSpace = false;
                    $pym->formatOutput = true;

                    $pym->load($pymentsxml);

                    $pymRoot = $pym->documentElement;

                    $pympurchase = $pym->createElement("payment");
                    $pymRoot->appendChild($pympurchase);
                    $pympurchase->setAttribute("type","received");
                    $pympurchase->setAttribute("way","new customer");
                    $pympurchase->setAttribute("from",$cusid);
                    $pympurchase->setAttribute("time",date("h:i A"));
                    $pympurchase->setAttribute("day",date('d'));
                    $pympurchase->setAttribute("mon",date('m'));
                    $pympurchase->setAttribute("year",date('Y'));

                    $lastpayment = $pym->getElementsByTagName("payment")[count($pym->getElementsByTagName("payment"))-2];
                    $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

                    $profit = $pym->createElement("profit",$PP);
                    $pympurchase->appendChild($profit);

                    $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
                    $TCAcom = $pym->createElement("TCAcom",$tcacom);
                    $pympurchase->appendChild($TCAcom);
                    
                    $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
                    $TCAcus = $pym->createElement("TCAcus",(floatval($tcacus)+floatval($cuscredit)));
                    $pympurchase->appendChild($TCAcus);

                    $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
                    $TNC = $pym->createElement("TNC",$tnc);
                    $pympurchase->appendChild($TNC);
                    
                    $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
                    $TIA = $pym->createElement("TIA",$ta);
                    $pympurchase->appendChild($TIA);

                    $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
                    $TAA = $pym->createElement("TAA",$taa);
                    $pympurchase->appendChild($TAA);

                    $received = $pym->createElement("whatsnew");
                    $pympurchase->appendChild($received);

                    $TIA = $pym->createElement("TIA",0);
                    $received->appendChild($TIA);

                    $TAA = $pym->createElement("TAA",0);
                    $received->appendChild($TAA);

                    $TNC = $pym->createElement("TNC",0);
                    $received->appendChild($TNC);

                    $profit = $pym->createElement("profit",0);
                    $received->appendChild($profit);

                    $TCAcom = $pym->createElement("TCAcom",0);
                    $received->appendChild($TCAcom);
                    
                    $TCAcus = $pym->createElement("TCAcus",$cuscredit);
                    $received->appendChild($TCAcus);

                    $pym->save($pymentsxml);
                
                }
                
                $_5 = new DOMDocument();
                $_5->preserveWhiteSpace = false;
                $_5->formatOutput = true;

                $_5Root = $_5->createElement("customer");
                $_5->appendChild($_5Root);

                $_5purchase = $_5->createElement("day");
                $_5Root->appendChild($_5purchase);
                $_5purchase->setAttribute("type","add");
                if($cuscredit == "0"){
                    $_5purchase->setAttribute("credit","no");
                }else{
                    $_5purchase->setAttribute("credit","yes");
                }
                $_5purchase->setAttribute("time",date("h:i A"));
                $_5purchase->setAttribute("day",date('d'));
                $_5purchase->setAttribute("mon",date('m'));
                $_5purchase->setAttribute("year",date('Y'));

                $limit = $_5->createElement("climit",$cuslimit);
                $_5purchase->appendChild($limit);

                $TCA = $_5->createElement("TCA",$cuscredit);
                $_5purchase->appendChild($TCA);


                $_5->save($cusdir."/".$cusid.".xml");
                
            }
        }
        $userdoc ->save($file);
    }

    if($req == "updatecus"){
        $fil = $userdir."/customers.xml";
        $cusdir = $userdir."/Customers";
        $cusname = decode($_GET["cusname"]);
        $id = decode($_GET["id"]);
        $num = decode($_GET["num"]);
        $add = decode($_GET["add"]);
        $credit = $_GET["CC"];
        $limit = $_GET["climit"];
        
        $doc->load($fil);
    
        $root = $doc->getElementsByTagName("customer");
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("id")->nodeValue == $id){
                $root[$i]->getElementsByTagName("number")[0]->nodeValue = $num;
                $root[$i]->getElementsByTagName("address")[0]->nodeValue = $add;
                $root[$i]->getElementsByTagName("TCA")[0]->nodeValue = $credit;
                $root[$i]->getElementsByTagName("climit")[0]->nodeValue = $limit;

                $precredit = $root[$i]->getElementsByTagName("TCA")[0]->nodeValue;
                $nowcredit = (floatval($precredit)-floatval($credit)); 
                if($nowcredit !== $precredit){
                    $pym = new DOMDocument();
                    $pym->preserveWhiteSpace = false;
                    $pym->formatOutput = true;

                    $pym->load($pymentsxml);

                    $pymRoot = $pym->documentElement;

                    $pympurchase = $pym->createElement("payment");
                    $pymRoot->appendChild($pympurchase);
                    $pympurchase->setAttribute("type","received");
                    $pympurchase->setAttribute("way","update customer");
                    $pympurchase->setAttribute("from",$id);
                    $pympurchase->setAttribute("time",date("h:i A"));
                    $pympurchase->setAttribute("day",date('d'));
                    $pympurchase->setAttribute("mon",date('m'));
                    $pympurchase->setAttribute("year",date('Y'));


                    $lastpayment = $pym->getElementsByTagName("payment")[count($pym->getElementsByTagName("payment"))-2];
                    $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

                    $profit = $pym->createElement("profit",$PP);
                    $pympurchase->appendChild($profit);

                    $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
                    $TCAcom = $pym->createElement("TCAcom",$tcacom);
                    $pympurchase->appendChild($TCAcom);
                    
                    $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
                    $TCAcus = $pym->createElement("TCAcus",(floatval($tcacus)+floatval($nowcredit)));
                    $pympurchase->appendChild($TCAcus);

                    $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
                    $TNC = $pym->createElement("TNC",$tnc);
                    $pympurchase->appendChild($TNC);
                    
                    $ta = floatval($lastpayment->getElementsByTagName("TIA")[0]->nodeValue);
                    $TIA = $pym->createElement("TIA",$ta);
                    $pympurchase->appendChild($TIA);

                    $taa = floatval($lastpayment->getElementsByTagName("TAA")[0]->nodeValue);
                    $TAA = $pym->createElement("TAA",$taa);
                    $pympurchase->appendChild($TAA);

                    $received = $pym->createElement("whatsnew");
                    $pympurchase->appendChild($received);

                    $TIA = $pym->createElement("TIA",0);
                    $received->appendChild($TIA);

                    $TAA = $pym->createElement("TAA",0);
                    $received->appendChild($TAA);

                    $TNC = $pym->createElement("TNC",0);
                    $received->appendChild($TNC);

                    $profit = $pym->createElement("profit",0);
                    $received->appendChild($profit);

                    $TCAcom = $pym->createElement("TCAcom",0);
                    $received->appendChild($TCAcom);
                    
                    $TCAcus = $pym->createElement("TCAcus",$nowcredit);
                    $received->appendChild($TCAcus);

                    $pym->save($pymentsxml);
                }

                $_5 = new DOMDocument();
                $_5->preserveWhiteSpace = false;
                $_5->formatOutput = true;
                $_5->load($cusdir."/".$id.".xml");

                $_5Root = $_5->documentElement;

                $_5purchase = $_5->createElement("day");
                $_5Root->appendChild($_5purchase);
                $_5purchase->setAttribute("type","update");
                $_5purchase->setAttribute("time",date("h:i A"));
                $_5purchase->setAttribute("day",date('d'));
                $_5purchase->setAttribute("mon",date('m'));
                $_5purchase->setAttribute("year",date('Y'));

                $number = $_5->createElement("number",$num);
                $_5purchase->appendChild($number);

                $address = $_5->createElement("address",$add);
                $_5purchase->appendChild($address);

                $limit = $_5->createElement("climit",$limit);
                $_5purchase->appendChild($limit);

                $TCA = $_5->createElement("TCA",$credit);
                $_5purchase->appendChild($TCA);

                $_5->save($cusdir."/".$id.".xml");

            }
        }
        $doc-> save($fil);
    }

    if($req =="GPBill"){
        $fil = $userdir."/temp.xml";
        $pinxml = $userdir."/pinvoice.xml";
        $itemxml = $userdir."/items.xml";
        $pymentsxml = $userdir."/payments.xml";
        $companiesxml = $userdir."/companies.xml";
        $companiesdir = $userdir."/Companies";
        $itemdir = $userdir."/Items";

        $invoice = $_GET["invoice"];
        $company = decode($_GET["seller"]);
        $sellernum = decode($_GET["sellernum"]);
        $selleradd = decode($_GET["selleradd"]);
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

        
        $doc->load($fil);
        $TOTAL = floatval($doc->getElementsByTagName("total")[0]->nodeValue);

        $re_credit = 0;

        $cammount = $TOTAL-($pammount+$discount);

        if($pammount == ($TOTAL-$discount)){
            $cammount = 0;
        }else
        if($pammount > ($TOTAL-$discount)){
            $cammount = 0;
            $left = $pammount-$TOTAL;
            $re_credit = $pammount-$TOTAL;


            if(file_exists($pinxml)){

                $ivdoc = new DOMDocument();
                $ivdoc->preserveWhiteSpace = false;
                $ivdoc->formatOutput = true;
                $ivdoc->load($pinxml);
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
                $ivdoc->save($pinxml);
            }
        }

        $root = $doc->getElementsByTagName("pinvoice")[0];
        if($cammount == "0"){
            $root->setAttribute("credit","no");  
        }else{
            $root->setAttribute("credit","yes");
        }

        $root->setAttribute("issuedto",$company);
        $root->setAttribute("time",date("h:i A"));
        $root->setAttribute("day",date('d'));
        $root->setAttribute("mon",date('m'));
        $root->setAttribute("year",date('Y'));

        $Paidammount = $doc->createElement("pammount",$pammount);
        $root->appendChild($Paidammount);

        $CreditAmmount = $doc->createElement("cammount",$cammount);
        $root->appendChild($CreditAmmount);

        $discountAmmount = $doc->createElement("discount",$discount);
        $root->appendChild($discountAmmount);

        $TCAbefore = 0;
        $comdoc = new newDoc();
        if(file_exists($companiesxml)){
            $commain = $comdoc->main($companiesxml);
            $compath = new DOMXPath($commain);
            if($compath->query("company[@name='$company']")[0] !== null){
                $TCAbefore = path($compath,"company[@name='$company']")[0]->getElementsByTagName("TCA")[0]->nodeValue;
            }
        }
        $PCA = $doc->createElement("PCA",$TCAbefore);
        $root->appendChild($PCA);

        $Seller = $doc->createElement("company");
        $Seller->setAttribute("name",$company);

        $Snum = $doc->createElement("number",$sellernum);
        $Seller->appendChild($Snum);

        $comTCA = $doc->createElement("TCA",$cammount+$TCAbefore);
        $Seller->appendChild($comTCA);

        $Sadd = $doc->createElement("address",$selleradd);
        $Seller->appendChild($Sadd);

        $root->appendChild($Seller);

        $doc->save($fil);

        //-----------------------------------------------
        // creating company xml data

        if(!file_exists($companiesxml)){

            $invoiceSeller = $doc->getElementsByTagName("company")[0];
            $comRoot = $_4->createElement("companies");
            $comRoot->appendChild($_4->importNode($invoiceSeller,true));
            $_4->appendChild($comRoot);

            $Sellertag = $_4->getElementsByTagName("company")[0];
            $cusid = $usercompany->nodeValue;
            $Sellertag->setAttribute("id",$cusid);
            $Sellertag->setAttribute("time",date("h:i A"));
            $Sellertag->setAttribute("day",date('d'));
            $Sellertag->setAttribute("mon",date('m'));
            $Sellertag->setAttribute("year",date('Y'));


            $_6 = new DOMDocument();
            $_6->preserveWhiteSpace = false;
            $_6->formatOutput = true;

            $Root6 = $_6->createElement("company");
            $_6->appendChild($Root6);

            $_6purchase = $_6->createElement("day");
            $Root6->appendChild($_6purchase);
            $_6purchase->setAttribute("pinvoice",$invoice);
            $_6purchase->setAttribute("addwith","pinvoice");
            $_6purchase->setAttribute("type","purchase");
            if($cammount == "0"){
                $_6purchase->setAttribute("credit","no");  
            }else{
                $_6purchase->setAttribute("credit","yes");
            }
            $_6purchase->setAttribute("time",date("h:i A"));
            $_6purchase->setAttribute("day",date('d'));
            $_6purchase->setAttribute("mon",date('m'));
            $_6purchase->setAttribute("year",date('Y'));

            $CreditAmmount = $_6->createElement("cammount",$cammount);
            $_6purchase->appendChild($CreditAmmount);
            $Paidammount = $_6->createElement("pammount",$pammount);
            $_6purchase->appendChild($Paidammount);
            $total = $_6->createElement("total",$TOTAL);
            $_6purchase->appendChild($total);
            $TCA = $_6->createElement("TCA",$cammount);
            $_6purchase->appendChild($TCA);

            $comInt = floatval($usercompany->nodeValue);
            $usercompany->nodeValue = $comInt+1;
                
            $_6->save($companiesdir."/".$cusid.".xml");

            $_4->save($companiesxml);

        }else{
            
            //-----------------------------------------------
            // creating company xml data if exist

            $_4->load($companiesxml);

            $checkSeller = 0;

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
                    $_6purchase->setAttribute("pinvoice",$invoice);
                    $_6purchase->setAttribute("type","purchase");
                    if($cammount == "0"){
                        $_6purchase->setAttribute("credit","no");  
                    }else{
                        $_6purchase->setAttribute("credit","yes");
                    }
                    $_6purchase->setAttribute("time",date("h:i A"));
                    $_6purchase->setAttribute("day",date('d'));
                    $_6purchase->setAttribute("mon",date('m'));
                    $_6purchase->setAttribute("year",date('Y'));


                    $Sellers[$i]->getElementsByTagName("TCA")[0]->nodeValue = ($cammount+floatval($TCAbefore))-$re_credit;

                    $CreditAmmount = $_6->createElement("cammount",$cammount);
                    $_6purchase->appendChild($CreditAmmount);
                    $Paidammount = $_6->createElement("pammount",$pammount);
                    $_6purchase->appendChild($Paidammount);
                    $total = $_6->createElement("total",$TOTAL);
                    $_6purchase->appendChild($total);
                    $TCA = $_6->createElement("TCA",($cammount+floatval($TCAbefore))-$re_credit);
                    $_6purchase->appendChild($TCA);

                    $_6->save($companiesdir."/".$cusid.".xml");
                    $checkSeller = 1;
                    $_4->save($companiesxml);
                };
            }

            if($checkSeller == 0){
                $comRoot = $_4->getElementsByTagName("companies")[0];
                $comRoot->appendChild($_4->importNode($invoiceSeller,true));

                $Sellertag = $_4->getElementsByTagName("company")[count($_4->getElementsByTagName("company"))-1];
                $Sellertag->setAttribute("id",$usercompany->nodeValue);
                $Sallerid = $usercompany->nodeValue;
                $Sellertag->setAttribute("time",date("h:i A"));
                $Sellertag->setAttribute("day",date('d'));
                $Sellertag->setAttribute("mon",date('m'));
                $Sellertag->setAttribute("year",date('Y'));


                $_6 = new DOMDocument();
                $_6->preserveWhiteSpace = false;
                $_6->formatOutput = true;

                $Root6 = $_6->createElement("company");
                $_6->appendChild($Root6);

                $_6purchase = $_6->createElement("day");
                $Root6->appendChild($_6purchase);
                $_6purchase->setAttribute("pinvoice",$invoice);
                $_6purchase->setAttribute("addwith","pinvoice");
                $_6purchase->setAttribute("type","purchase");
                if($cammount == "0"){
                    $_6purchase->setAttribute("credit","no");  
                }else{
                    $_6purchase->setAttribute("credit","yes");
                }
                $_6purchase->setAttribute("time",date("h:i A"));
                $_6purchase->setAttribute("day",date('d'));
                $_6purchase->setAttribute("mon",date('m'));
                $_6purchase->setAttribute("year",date('Y'));

                $CreditAmmount = $_6->createElement("cammount",$cammount);
                $_6purchase->appendChild($CreditAmmount);
                $Paidammount = $_6->createElement("pammount",$pammount);
                $_6purchase->appendChild($Paidammount);
                $total = $_6->createElement("total",$TOTAL);
                $_6purchase->appendChild($total);
                $TCA = $_6->createElement("TCA",$cammount);
                $_6purchase->appendChild($TCA);


                $comInt = floatval($usercompany->nodeValue);
                $usercompany->nodeValue = $comInt+1;

                $_6->save($companiesdir."/".$Sallerid.".xml");

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
        $_5purchase->setAttribute("way","pinvoice");
        $_5purchase->setAttribute("pinvoice",$invoice);
        if($cammount == "0"){
            $_5purchase->setAttribute("credit","no");  
        }else{
            $_5purchase->setAttribute("credit","yes");
        }
        $_5purchase->setAttribute("time",date("h:i A"));
        $_5purchase->setAttribute("day",date('d'));
        $_5purchase->setAttribute("mon",date('m'));
        $_5purchase->setAttribute("year",date('Y'));

        $detail = $_5->createElement("detail","Payment details of purchase invoice No : ".$invoice);
        $_5purchase->appendChild($detail);

        $lastpayment = $_5->getElementsByTagName("payment")[count($_5->getElementsByTagName("payment"))-2];
        $PP = $lastpayment->getElementsByTagName("profit")[0]->nodeValue;

        $profit = $_5->createElement("profit",$PP+$discount);
        $_5purchase->appendChild($profit);

        $tcacom = $lastpayment->getElementsByTagName("TCAcom")[0]->nodeValue;
        $TCAcom = $_5->createElement("TCAcom",(floatval($tcacom)+$cammount)-$re_credit);
        $_5purchase->appendChild($TCAcom);
        
        $tcacus = $lastpayment->getElementsByTagName("TCAcus")[0]->nodeValue;
        $TCAcus = $_5->createElement("TCAcus",$tcacus);
        $_5purchase->appendChild($TCAcus);

        $tnc = $lastpayment->getElementsByTagName("TNC")[0]->nodeValue;
        $TNC = $_5->createElement("TNC",floatval($tnc)-$pammount);
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

        $TNC = $_5->createElement("TNC","-".$pammount);
        $received->appendChild($TNC);

        $profit = $_5->createElement("profit",$discount);
        $received->appendChild($profit);

        $TCAcom = $_5->createElement("TCAcom",$cammount-$re_credit);
        $received->appendChild($TCAcom);
        
        $TCAcus = $_5->createElement("TCAcus",0);
        $received->appendChild($TCAcus);

        $_5->save($pymentsxml);

        $root = $doc->getElementsByTagName("pinvoice")[0];
        
        //-----------------------------------------------
        // creating items xml data if exist

        $_3->load($itemxml);



        $itemMain = $_3->documentElement;
        $items = $doc->getElementsByTagName("item");
        $itemsinrecord = $_3->getElementsByTagName("item");

        for ($i=0; $i < count($items); $i++) {
            $checkitem[$i] = 0;
            $itemNameValue = $items[$i]->getAttributeNode("name")->nodeValue;
            for ($j=0; $j < count($itemsinrecord) ; $j++) { 
                if($itemsinrecord[$j]->getAttributeNode("name")->nodeValue == $itemNameValue){

                    $itemid = $itemsinrecord[$j]->getAttributeNode("id")->nodeValue;
                    $itemsinrecord[$j]->setAttribute("addwith","pinvoice");
                    $itemsinrecord[$j]->setAttribute("pinvoice",$invoice);
                    $itemsinrecord[$j]->setAttribute("company",$company);
                    $itemsinrecord[$j]->setAttribute("time",date("h:i A"));
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
                
                    $_d[$j]->load($itemdir."/".$itemid.".xml");

                    $Root = $_d[$j]->documentElement;

                    $Root->appendChild($_d[$j]->importNode($itemsinrecord[$j],true));

                    $_d[$j]->save($itemdir."/".$itemid.".xml");

                    $checkitem[$i] = 1;
                }
            }
            if($checkitem[$i] == 0){

                $itemid = $useritem->nodeValue;
                $items[$i]->setAttribute("id",$itemid);
                $items[$i]->setAttribute("addwith","pinvoice");
                $items[$i]->setAttribute("pinvoice",$invoice);
                $items[$i]->setAttribute("company",$company);
                $items[$i]->setAttribute("time",date("h:i A"));
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

                $_d[$i]->save($itemdir."/".$itemid.".xml");

                $comInt = floatval($useritem->nodeValue);
                $useritem->nodeValue = $comInt+1;
            };
        }

        if($invoice == "1"){
            $main = $doc2->createElement("pinvoices");
        }else{
            $doc2->load($pinxml);
            $main = $doc2->getElementsByTagName("pinvoices")[0];
        }
        $main->appendChild($doc2->importNode($root,true));
        $doc2->appendChild($main);
        $doc2->save($pinxml);
        $_3->save($itemxml);

        $comInt = floatval($userpinvoice->nodeValue);
        $userpinvoice->nodeValue = $comInt+1;
        
        $userdoc->save($file);
        echo 1;

        unlink($fil);
    }

    if($req == "deleteitem"){
        $fil = $userdir."/temp.xml";
        $Iname = decode($_GET["Iname"]);
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

    if($req == "loadholdedinv"){
        $fil = $userdir."/panding.xml";
        $dir = $userdir."/Panding";
        $filename = $_GET["file"];

        $name = $dir."/". $_GET["file"];
        $invtemp = $userdir."/temp2.xml";
        rename($name,$invtemp);

        $pad = new newDoc();
        $main = $pad->main($fil);
        $body = getTag($main,"body",0);
        $path = new DOMXPath($main);
        $root = path($path,"panding[@file='$filename']",0);
        $body->removeChild($root);
        $pad->save($fil);
        echo $filename;
    }

    if($req == "loadholdedinv2"){
        $fil = $userdir."/panding2.xml";
        $dir = $userdir."/Panding";
        $filename = $_GET["file"];

        $name = $dir."/". $_GET["file"];
        $invtemp = $userdir."/temp.xml";
        rename($name,$invtemp);

        $pad = new newDoc();
        $main = $pad->main($fil);
        $body = getTag($main,"body",0);
        $path = new DOMXPath($main);
        $root = path($path,"panding[@file='$filename']",0);
        $body->removeChild($root);
        $pad->save($fil);
        echo $filename;
    }

    if($req == "holdinv"){
        $fil = $userdir."/panding.xml";
        $dir = $userdir."/Panding";
        $filename = time().".xml";

        if(!file_exists($dir)){
            mkdir($dir);
        }

        $cus = decode($_GET["cusname"]);
        $invtemp = $userdir."/". $_GET["file"];
        $name = $userdir."/".$filename;
        rename($invtemp,$name);
        copy($name,$dir."/".$filename);
        unlink($name);

        $pad = new newDoc();

        if(!file_exists($fil)){
            $main = $pad->main();
            $body = $pad->opentag($main,"body");
        }else{
            $main = $pad->main($fil);
            $body = getTag($main,"body",0);
        }
        $root = $pad->opentag($body,"panding");
        setDate($root);
        setAtt($root,"customer",$cus); 
        setAtt($root,"file",$filename); 
        $pad->save($fil);
        echo $filename;
    }
    if($req == "holdinv2"){
        $fil = $userdir."/panding2.xml";
        $dir = $userdir."/Panding";
        $filename = time().".xml";

        if(!file_exists($dir)){
            mkdir($dir);
        }

        $cus = decode($_GET["cusname"]);
        $invtemp = $userdir."/". $_GET["file"];
        $name = $userdir."/".$filename;
        rename($invtemp,$name);
        copy($name,$dir."/".$filename);
        unlink($name);

        $pad = new newDoc();

        if(!file_exists($fil)){
            $main = $pad->main();
            $body = $pad->opentag($main,"body");
        }else{
            $main = $pad->main($fil);
            $body = getTag($main,"body",0);
        }
        $root = $pad->opentag($body,"panding");
        setDate($root);
        setAtt($root,"company",$cus); 
        setAtt($root,"file",$filename); 
        $pad->save($fil);
        echo $filename;
    }

    if($req == "deletemissitem"){
        $fil = $userdir."/temp3.xml";
        $Iname = decode($_GET["Iname"]);
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

    if($req == "deleteAst"){
        $fil = $userdir."/temp.xml";
        $Iname = decode($_GET["ast"]);
        $total = $_GET["total"];
        $doc->load($fil);

        $root = $doc->getElementsByTagName("asset");
        $items = $doc->getElementsByTagName("assets")[0];
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $Iname){
                $items->removeChild($root[$i]);
            }
        }
        $doc->getElementsByTagName("TAA")[0]->nodeValue = $total;
        $doc-> save($fil);
        
    }

    if($req == "updateitem"){
        $fil = $userdir."/temp.xml";
        $Iname = decode($_GET["Iname"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Qunit = $_GET["Qunit"];
        $Grate = $_GET["Grate"];
        $Hsrate = $_GET["Hsrate"];
        $Prate = $_GET["Prate"];
        $invoice = $_GET["invoice"];
        $total = $_GET["total"];
        
        $doc->load($fil);

        $root = $doc->getElementsByTagName("item");
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $Iname){
                $root[$i]->getElementsByTagName("quntity")[0]->nodeValue = $Iqun;
                $root[$i]->getElementsByTagName("quntityleft")[0]->nodeValue = $Iqun;
                $root[$i]->getElementsByTagName("unit")[0]->nodeValue = $Qunit;
                $root[$i]->getElementsByTagName("grate")[0]->nodeValue = $Grate;
                $root[$i]->getElementsByTagName("hsrate")[0]->nodeValue = $Hsrate;
                $root[$i]->getElementsByTagName("prate")[0]->nodeValue = $Prate;
            }
        }
        $doc->getElementsByTagName("total")[0]->nodeValue = $total;
        $doc-> save($fil);

    }

    if($req == "updatemissitem"){
        $fil = $userdir."/temp3.xml";
        $Iname = decode($_GET["Iname"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Qunit = $_GET["Qunit"];
        $Grate = $_GET["Grate"];
        $Hsrate = $_GET["Hsrate"];
        $Prate = $_GET["Prate"];
        $invoice = $_GET["invoice"];
        $total = $_GET["total"];
        
        $doc->load($fil);

        $root = $doc->getElementsByTagName("item");
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $Iname){
                $root[$i]->getElementsByTagName("quntity")[0]->nodeValue = $Iqun;
                $root[$i]->getElementsByTagName("quntityleft")[0]->nodeValue = $Iqun;
                $root[$i]->getElementsByTagName("unit")[0]->nodeValue = $Qunit;
                $root[$i]->getElementsByTagName("grate")[0]->nodeValue = $Grate;
                $root[$i]->getElementsByTagName("hsrate")[0]->nodeValue = $Hsrate;
                $root[$i]->getElementsByTagName("prate")[0]->nodeValue = $Prate;
            }
        }
        $doc->getElementsByTagName("total")[0]->nodeValue = $total;
        $doc-> save($fil);

    }

    if($req == "updateast"){
        $fil = $userdir."/temp.xml";
        $Iname = decode($_GET["ast"]);
        $Grate = $_GET["Grate"];
        $total = $_GET["total"];
        
        $doc->load($fil);

        $root = $doc->getElementsByTagName("asset");
        for ($i=0; $i < count($root) ; $i++) {
            if($root[$i]->getAttributeNode("name")->nodeValue == $Iname){
                $root[$i]->getElementsByTagName("rate")[0]->nodeValue = $Grate;
            }
        }
        $doc->getElementsByTagName("TAA")[0]->nodeValue = $total;
        $doc-> save($fil);

    }


    if($req == "purchaseitem2"){
        $fil = $userdir."/temp2.xml";
        $Iname = decode($_GET["Iname"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Prate = $_GET["rate"];
        $invoice = $_GET["invoice"];
        $total = $_GET["total"];


        if(!file_exists($fil)){
            
            $main = $doc->createElement("invoice");
            $main->setAttribute("number",$invoice);
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

    if($req == "purchaseitem"){

        $fil = $userdir."/temp.xml";
        $Iname = decode($_GET["Iname"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Qunit = $_GET["Qunit"];
        $Grate = $_GET["Grate"];
        $Hsrate = $_GET["Hsrate"];
        $Prate = $_GET["Prate"];
        $invoice = $_GET["invoice"];
        $total = $_GET["total"];


        if(!file_exists($fil)){
            
            $main = $doc->createElement("pinvoice");
            $main->setAttribute("number",$invoice);
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

            $qunleft = $doc->createElement("quntityleft",$Iqun);
            $item->appendChild($qunleft);

            $unit = $doc->createElement("unit",$Qunit);
            $item->appendChild($unit);

            $grate = $doc->createElement("grate",$Grate);
            $item->appendChild($grate);

            $hsrate = $doc->createElement("hsrate",$Hsrate);
            $item->appendChild($hsrate);

            $prate = $doc->createElement("prate",$Prate);
            $item->appendChild($prate);

            $doc->save($fil);
            echo 1;
            
        }else{

            $doc->load($fil);
            $main = $doc->documentElement;
            if($main->getElementsByTagName("items")[0] == null){
                $root = $doc->createElement("items");
                $main->appendChild($root);
            }else{
                $root = $main->getElementsByTagName("items")[0];
            }
            $item = $doc->createElement("item");
            $item->setAttribute("name",$Iname);

            if($main->getElementsByTagName("total")[0] == null){
                $main->appendChild($doc->createElement("total",$total));
            }else {
                $main->getElementsByTagName("total")[0]->nodeValue = $total;
            }

            $root->appendChild($item);

            $qun = $doc->createElement("quntity",$Iqun);
            $item->appendChild($qun);

            $qunleft = $doc->createElement("quntityleft",$Iqun);
            $item->appendChild($qunleft);

            $unit = $doc->createElement("unit",$Qunit);
            $item->appendChild($unit);

            $grate = $doc->createElement("grate",$Grate);
            $item->appendChild($grate);

            $hsrate = $doc->createElement("hsrate",$Hsrate);
            $item->appendChild($hsrate);

            $prate = $doc->createElement("prate",$Prate);
            $item->appendChild($prate);

            $doc->save($fil);
            echo 1;
        }

    }


    if($req == "addmissitem"){

        $fil = $userdir."/temp3.xml";
        $Iname = decode($_GET["Iname"]);
        $Iqun = floatval($_GET["Iqun"]);
        $Qunit = $_GET["Qunit"];
        $Grate = $_GET["Grate"];
        $Hsrate = $_GET["Hsrate"];
        $Prate = $_GET["Prate"];
        $invoice = $_GET["invoice"];
        $total = $_GET["total"];


        if(!file_exists($fil)){
            
            $main = $doc->createElement("session");
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

            $qunleft = $doc->createElement("quntityleft",$Iqun);
            $item->appendChild($qunleft);

            $unit = $doc->createElement("unit",$Qunit);
            $item->appendChild($unit);

            $grate = $doc->createElement("grate",$Grate);
            $item->appendChild($grate);

            $hsrate = $doc->createElement("hsrate",$Hsrate);
            $item->appendChild($hsrate);

            $prate = $doc->createElement("prate",$Prate);
            $item->appendChild($prate);

            $doc->save($fil);
            
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

            $qunleft = $doc->createElement("quntityleft",$Iqun);
            $item->appendChild($qunleft);

            $unit = $doc->createElement("unit",$Qunit);
            $item->appendChild($unit);

            $grate = $doc->createElement("grate",$Grate);
            $item->appendChild($grate);

            $hsrate = $doc->createElement("hsrate",$Hsrate);
            $item->appendChild($hsrate);

            $prate = $doc->createElement("prate",$Prate);
            $item->appendChild($prate);

            $doc->save($fil);
            echo $Iname . "1";
        }

    }

    if($req == "addast"){

        $fil = $userdir."/temp.xml";
        $Iname = decode($_GET["ast"]);
        $Grate = $_GET["Grate"];
        $invoice = $_GET["invoice"];
        $total = $_GET["total"];


        if(!file_exists($fil)){
            
            $main = $doc->createElement("pinvoice");
            $main->setAttribute("number",$invoice);
            $doc->appendChild($main);
            $root = $doc->createElement("assets");
            $main->appendChild($root);
            $TOTAL = $doc->createElement("TAA",$total);
            $main->appendChild($TOTAL);
        
            $item = $doc->createElement("asset");
            $item->setAttribute("name",$Iname);
            $root->appendChild($item);

            $grate = $doc->createElement("rate",$Grate);
            $item->appendChild($grate);

            $doc->save($fil);
            echo 1;
            
        }else{
            $doc->load($fil);
            $main = $doc->documentElement;
            if($main->getElementsByTagName("assets")[0] == null){
                $root = $doc->createElement("assets");
                $main->appendChild($root);
            }else{
                $root = $main->getElementsByTagName("assets")[0];
            }

            $item = $doc->createElement("asset");
            $item->setAttribute("name",$Iname);

            if($main->getElementsByTagName("TAA")[0] == null){
                $main->appendChild($doc->createElement("TAA",$total));
            }else {
                $main->getElementsByTagName("TAA")[0]->nodeValue = $total;
            }

            $root->appendChild($item);

            $grate = $doc->createElement("rate",$Grate);
            $item->appendChild($grate);

            $doc->save($fil);
            echo 1;
        }

    }

    if($req == "logout"){
        setcookie("username", "", time() - 3600, "http://localhost/");
        echo 1;
    }

    if($req == "logoStatus"){
        $status = $_GET["status"];

        $root = $userdoc->getElementsByTagName("user");
        for ($i=0; $i < count($root) ; $i++) { 
            if($root[$i]->getAttributeNode("username")->nodeValue == $Uname){
                $logo = $userdoc->getElementsByTagName("logo")[0]->getAttributeNode("status")->nodeValue = $status;
                echo 1;
            }
        }
        $userdoc->save($file);
    }

    if($req == "ChUname"){
        $newUname = decode($_GET["newUname"]);

        $root = $userdoc->getElementsByTagName("user");
        for ($i=0; $i < count($root) ; $i++) { 
            if($root[$i]->getAttributeNode("username")->nodeValue == $newUname){
                echo 0;
            }else{
                if($root[$i]->getAttributeNode("username")->nodeValue == $Uname){
                    $root[$i]->getAttributeNode("username")->nodeValue = $newUname;
                    setcookie("username", "", time() - 3600, "http://localhost/");
                    echo 1;
                }
            }
        }
        $userdoc->save($file);
    }

    if($req == "addnum"){
        $num2 = decode($_GET["num2"]);
        $num3 = decode($_GET["num3"]);

        if($num2 == ""){ $num2 = 0;}
        if($num3 == ""){ $num3 = 0;}

        $root = $userdoc->getElementsByTagName("user");
        for ($i=0; $i < count($root) ; $i++) { 
            if($root[$i]->getAttributeNode("username")->nodeValue == $Uname){
                $numb2 = $userdoc->createElement("num",$num2);
                $numb3 = $userdoc->createElement("num",$num3);
                
                if($root[$i]->getElementsByTagName("num")[1] == null){
                    $root[$i]->appendChild($numb2);
                    $root[$i]->appendChild($numb3);
                    echo 1;
                }else{
                    $root[$i]->getElementsByTagName("num")[1]->nodeValue = $num2;
                    $root[$i]->getElementsByTagName("num")[2]->nodeValue = $num3;
                    echo 1;
                }
            }
        }
        $userdoc->save($file);
    }

    if($req == "passupdate"){
        $pass = decode($_GET["pass"]);
        $newpass = decode($_GET["newpass"]);
        
        
        $root = $userdoc->getElementsByTagName("user");
        for ($i=0; $i < count($root) ; $i++) { 
            if($root[$i]->getAttributeNode("username")->nodeValue == $Uname){
                $hash = $root[$i]->getElementsByTagName("pass")[0]->nodeValue;
                if (password_verify($pass, $hash)) {
                    $root[$i]->getElementsByTagName("pass")[0]->nodeValue = password_hash($newpass,PASSWORD_DEFAULT);
                    echo 1;
                } else {
                    echo 0;
                }
            }
        }
        $userdoc->save($file);
    }

    if($req == "change_Logo"){
        $url = decode($_GET["logo"]);
        $Plogo = decode($getuser->getElementsByTagName("logo")[0]->nodeValue);
        unlink($Plogo);
        
        $root = $userdoc->getElementsByTagName("user");
        for ($i=0; $i < count($root) ; $i++) { 
            if($root[$i]->getAttributeNode("username")->nodeValue == $Uname){
                $logo = $userdoc->getElementsByTagName("logo")[0]->nodeValue = $url;
                echo "Changed";
            }
        }
        $userdoc->save($file);
    }

    if($req == "update"){
        $update = decode($_GET["update"]);
        $value = decode($_GET["value"]);

        $root = $userdoc->getElementsByTagName("user");
        for ($i=0; $i < count($root) ; $i++) { 
            if($root[$i]->getAttributeNode("username")->nodeValue == $Uname){
                $test = $root[$i]->getElementsByTagName($update)[0]->nodeValue = $value;
                echo $test;
            }
        }
        $userdoc->save($file);
    }

    if($req == "login"){
        $username = decode($_GET["Uname"]);
        $pass =  decode($_GET["pass"]);
   
        if(file_exists($file)){
            $root = $xpath->query("user[@username='$username']");

            if($root[0] != null){
                $hash = $root[0]->getElementsByTagName("pass")[0]->nodeValue;
                if (password_verify($pass, $hash)) {
                    $cookie_name = "username";
                    $cookie_value = $username;
                    setcookie($cookie_name, $cookie_value, time() + (86400 * 365), "http://localhost/");
                    echo 1;
                } else {
                    echo -1;
                }
            }
        }
    }

    
    if($req =="clear"){
        $fil = $_GET["file"];
        unlink($userdir."/".$fil);
    }
?>