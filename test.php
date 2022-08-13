<?php
include "myphp.php";

$path = "lib/countries.xml";
$path2 = "lib/number-code.xml";

$doc = new newDoc();
$doc2 = new newDoc();
$main = $doc->main($path);
$main2 = $doc2->main($path2);

$tag = getTag($main,"country");
$tag2 = getTag($main2,"country");

for ($i=0; $i < count($tag) ; $i++) {
    echo "<div style='background:dodgerblue;color:white;margin:2px 0;padding:10px'>$i--";
    $test = 0;
    $iso = $tag[$i]->getAttributeNode("cc-ios-2")->nodeValue ." / ". $tag[$i]->getElementsByTagName("cc-ios-3")[0]->nodeValue;
    echo $iso." >>> ".$tag[$i]->getElementsByTagName("en-name")[0]->nodeValue;
    for ($j=0; $j < count($tag2) ; $j++) {
        if($tag2[$j]->getAttributeNode("iso-codes")->nodeValue == $iso){
            $numValue = $tag2[$j]->getAttributeNode("num-code")->nodeValue;
            $populationValue = $tag2[$j]->getElementsByTagName("population")[0]->nodeValue;
            $areakm2Value = $tag2[$j]->getElementsByTagName("area-km2")[0]->nodeValue;
            $gdpusdValue = $tag2[$j]->getElementsByTagName("gdp-usd")[0]->nodeValue;
            $tag[$i]->setAttribute("num-code",$numValue);
            $doc->opentag($tag[$i],"population",$populationValue);
            $doc->opentag($tag[$i],"area-km2",$areakm2Value);
            $doc->opentag($tag[$i],"gdp-usd",$gdpusdValue);
            $test = 1;
        }
    }
    if ($test == 0) {
        echo "--- <strong style='background:red;'>error</strong>:";
    }
    echo "</div>";
}
$doc->save($path);


// for ($i=0; $i < 226 ; $i++) { 
//     if(file_exists($path.$i.".xml")){echo "ok";}
//     $str=file_get_contents($path.$i.".xml");

//     $str=str_replace("2011", "2022",$str);

//     file_put_contents($path.$i.".xml", $str);
//  }

?>
