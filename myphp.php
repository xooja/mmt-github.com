<?php
 date_default_timezone_set("Asia/Karachi");

    class newDoc{
        public $root;
        public $doc;
        
        function main($file=null){
            $this->doc = new DOMDocument();
            $this->doc->preserveWhiteSpace = false;
            $this->doc->formatOutput = true;
            if($file !== null){
            $this->doc->load($file);
            }
        return $this->doc;
        }

        function opentag($root,$name,$value=null){
            $ta = $this->doc->createElement($name,$value);
            $root->appendChild($ta);
            return $ta;
        }
        function imNode($root,$node,$bool=null){
            $root->appendChild($this->doc->importNode($node,$bool));
            return $root;
        }
        function save($file){
            $this->doc->save($file);
        }
    }

    function setAtt($root,$att,$value){
        $root->setAttribute($att,$value);
    }
    function getAttVal($root,$att){
        $root->getAttributeNode($att)->nodeValue;
    }
    
    function setDate($tag){
        $tag->setAttribute("time",date("h:i A"));
        $tag->setAttribute("day",date('d'));
        $tag->setAttribute("mon",date('m'));
        $tag->setAttribute("year",date('Y'));
    }

    function path($xpath,$query,$index=null,$value=null){
        $tag = $xpath->query($query);
        if($index !== null){
            $tag = $xpath->query($query)[$index];
        }
        if($value !== null){
            $xpath->query($query)[$index]->nodeValue = $value;
        }
        return $tag;
    }

    function getTag($root,$name,$index=null,$value=null){
        $tag = $root->getElementsByTagName($name);
        if($index !== null){
            $tag = $root->getElementsByTagName($name)[$index];
        }
        if($value !== null){
            $root->getElementsByTagName($name)[$index]->nodeValue = $value;
        }
        return $tag;
    }
    function renameTag( DOMElement $oldTag, $newTagName ) {
        $document = $oldTag->ownerDocument;
    
        $newTag = $document->createElement($newTagName);
        $oldTag->parentNode->replaceChild($newTag, $oldTag);
    
        foreach ($oldTag->attributes as $attribute) {
            $newTag->setAttribute($attribute->name, $attribute->value);
        }
        foreach (iterator_to_array($oldTag->childNodes) as $child) {
            $newTag->appendChild($oldTag->removeChild($child));
        }
        return $newTag;
    }
    $Uname = "";
    $file = "users.xml";
    if(!isset($_COOKIE["username"])) {
        $Uname = "";
    } else {
        $Uname = $_COOKIE["username"];
    }
    
    $userdoc = new DOMDocument();
    $userdoc->preserveWhiteSpace = false;
    $userdoc->formatOutput = true;

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

    function getid($file,$name,$tagName){
        $responce = "";
        $docforid = new newDoc();
        $xpathforid = null;
        if(file_exists($file)){
            $main = $docforid->main($file);
            $xpathforid = new DOMXPath($main);
        }
        if(path($xpathforid,$tagName."[@name='$name']",0) !== null)
            {$tag = path($xpathforid,$tagName."[@name='$name']",0);
            $responce = $tag->getAttributeNode("id")->nodeValue;
        }
        return $responce;
    }

    function getname($file,$id,$tagName){
        $responce = "";
        $docforid = new newDoc();
        $xpathforid = null;
        if(file_exists($file)){
            $main = $docforid->main($file);
            $xpathforid = new DOMXPath($main);
        }
        if(path($xpathforid,$tagName."[@id='$id']",0) !== null){
            $tag = path($xpathforid,$tagName."[@id='$id']",0);
            $responce = $tag->getAttributeNode("name")->nodeValue;
        }
        return $responce;
    }
    function decode($string){
        $y = urldecode($string);
        $x = str_replace(" &plus; ","+",$y);
        return $x;
    }
?>