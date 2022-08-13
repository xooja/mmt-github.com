<?php
    require "myphp.php";
    $req = $_GET["req"];
    if($req == "invstyle"){
        $inv = $_GET["inv"];
        $condoc = new newDoc();
        $config = $userdir.'/config.xml';
        if(!file_exists($config)){
            $root = $condoc->main();
            $main = $condoc->opentag($root,"config");
            $condoc->opentag($main,"invstyle",$inv);
            $condoc->save($config);
        }else{
            $root = $condoc->main($config);
            $main = getTag($root,"config",0);
            $invtag = getTag($root,"invstyle");
            if($invtag[0] == null){
                $condoc->opentag($main,"invstyle",$inv);
            }else{
                getTag($root,"invstyle",0,$inv);
            }
            $condoc->save($config);
        }
    }
?>