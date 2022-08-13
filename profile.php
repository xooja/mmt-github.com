<?php
require "myphp.php";
$file = "users.xml";
$username = $_COOKIE["username"];
$userdoc = new DOMDocument();
$userdoc->load($file);
$xpath = new DOMXPath($userdoc);
$getuser = $xpath->query("user[@username='".$username."']")[0];
$startup = $getuser->getElementsByTagName("startup")[0]->nodeValue;
$shopname = $getuser->getElementsByTagName("name")[0]->nodeValue;
$shopnumber = $getuser->getElementsByTagName("num")[0]->nodeValue;
$shopaddress = $getuser->getElementsByTagName("address")[0]->nodeValue;
$userdir = $getuser->getElementsByTagName("dir")[0]->nodeValue;
$config = 'Database/'.$userdir.'/config.xml';
 if(!file_exists($config)){
   $invoice = "inv/Default.html";
 }else{
   $configdoc = new newDoc();
   $configfile = $configdoc->main($config);
   $invtag = getTag($configfile,"invstyle");
   if($invtag[0] == null){
    $invoice = "inv/Default.html";
   }else{
    $invoice = $invtag[0]->nodeValue;
   }
}
?>

<style>
#Bname{
    text-align: center;
    background-color: #333;
    padding: 10px;
    color: white;
}
.titleBar{
    padding: 2px;
    margin: 0px;
    display: inline-block;
    float: right;
}
.tabContainer{
    margin: 40px 0;
}
.tabContainer div{
    overflow: hidden;
    display: inline-block;
}
.tabContainer input{
    display: block;
    width: 100%;
    padding: 5px;
    font-size: 14px;
    margin: 5px 0;
}
.tabContainer table input{
    margin: 0;
}

.a {
    cursor: pointer;
    padding: 10px;
    background-color: #333;
    color: white;
    margin: 0;
    border-radius: 5px 5px 0 0;
}
.a:hover{
    border-bottom: 2px solid white;
    box-sizing: border-box;
}
.tabControl{
    width: 100%;
    overflow: hidden;
    border: 1px solid gray;
    margin-top: 9px;
    padding: 30px;
}
.tabControl div{
    display: none;
    animation-name: Apire;
    animation-duration: 0.4s;
}
.active1 {
    color :#000000;
    background-color: white;
    border: solid gray;
    border-width: 1px 1px 0 1px;
}
</style>
<div class="WinMain" id="WinMain">
    <h3 id="Bname">Welcome </h3>
    <p class="titleBar">Your all personal data is here</p>
    <div style="display: inline-block;position:relative">
    <div class="logo" id="logo"></div>
        <button id="upload" class="upload">
            <form action="#" method="post" enctype="multipart/form-data">
                <input type="file" id="Slogo" name="logo" hidden>
                <input type="text" id="userdir" value="" name="dir" hidden>
            </form>
        </button>
    </div>
    <span style="background-color: #333;color: white;padding: 5px;vertical-align: super;margin-left: 20px;">Logo show on invoice 
        <input type="checkbox" id="logo_status" style="margin-left: 10px;    vertical-align: bottom;"></span>
        
    <table>
        <tr>
            <td>You Joined on</td>
            <td id="date">1</td>
            <td class=""></td>
        </tr>
        <tr>
            <td>Your name</td>
            <td id="name">2</td>
            <td class="edit"></td>
        </tr>
        <tr>
            <td>Your email address</td>
            <td id="email">3</td>
            <td class="edit"></td>
        </tr>
        <tr>
            <td>Your mobile number</td>
            <td id="num">4</td>
            <td class="edit"></td>
        </tr>
        <tr>
            <td>Your Business address</td>
            <td id="address">5</td>
            <td class="edit"></td>
        </tr>
    </table>
    <div class="tabContainer" id="tabContainer">
        <a class="a active1" id="updatePassword">Change password</a>
        <a class="a" id="updateUname">Change username</a>
        <a class="a" id="addMoreNumber">Add more number</a>
        <div class="tabControl" id="tabControl">
            <div id="passwordContainer" style="display: block;">
                <input type="password" id="oldPass" placeholder="Old password" title = "Presss F2 to show password"> 
                <input type="password" id="newPass" placeholder="New password" title = "Presss F2 to show password">
                <input type="password" id="rewritePass" placeholder="Rewrite password" title = "Presss F2 to show password">
                <button id="pass" class='btn_2 circle'>Update</button>
            </div>
            <div id="unameContainer">
                <table>
                <tr>
                    <th>Old username</th>
                    <th>New username</th>
                </tr>
                <tr>
                <td id="Uname">1</td>
                <td><input type="text" id="newUname" placeholder="New username"></td>
                </tr>
                </table>
                <button id="changeUname" class='btn_2 circle'>Update</button>
            </div>
            <div id="numberContainer">
            <input type="text" id="oldnum" disabled>
                <input type="text" id="num2" placeholder="2nd number">
                <input type="text" id="num3" placeholder="3rd number">
                <button id="addNum" class='btn_2 circle'>Update</button>
            </div>
        </div>
    </div>

    <style>
        .invviewer .invoice{
            zoom: .50;
            border: 2px solid gray;
            padding: 10px;
            height: 80%;
            overflow: hidden;
            width: 98%;
            margin: auto;
            position: relative;
        }
        .invoiceopt{
            width: 49%;
            margin:.5%;
            height:300px;
            float: left;
            overflow:hidden;
            position: relative;
        }
        .controlbtn{
            position: absolute;
            width: auto;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        @keyframes downflow {
            from{top:-100%}
            to{top:0%}
        }
        .invoiceopt:hover .btnback{
            display: block;
        }
        .btnback{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #0000009c;
            display: none;
            animation: downflow 0.5s ease;
            zoom: 1.8;
        }
        .controlbtn button {
            padding: 10px;
            margin: 5px;
            color: white;
            background: #2196f3;
            border: none;
            cursor: pointer;
            font-size: 16px;
            border-radius: 3px;
        }
        .controlbtn button:hover{
            box-shadow: 1px 1px 5px black;
        }
        .viewer{
            width: 700px;
            margin: auto;
            margin-top: 50px;
            background-color: white;
            overflow: hidden;
            padding: 5px;
            animation: dropdown 0.3s ease;
        }
        .viewer .invoice{
            zoom: 1;
        }
        @keyframes dropdown {
            from {margin-top: 400px;}
            to{margin-top: 50px;}
        }
        .setinv:active{
            background-color: #000000;
        }
    </style>
    <div class="heading">
        Chose invoice style
    </div>
    <div class="invviewer">
        <?php
            $files = glob("inv/*");
            $str = str_replace(".html","",$invoice);
            echo '<div class="invoiceopt">
            <div class = "para invname">
                '.str_replace("inv/","",$str).'
            </div>
            <div class="invoice">';
                require $invoice;
            echo '
                <div class="btnback">
                    <div class="hand controlbtn" style="width:60%;">
                        <button class="previewinv">Preview</button>
                        <button class="setinv" disabled style="background:black;">Selected</button>
                    </div>
                </div>
            </div>
            </div>';
            foreach ($files as $fil) {
                
                if($fil !== $invoice){
                    $str = str_replace(".html","",$fil);
                    echo '<div class="invoiceopt">
                    <div class = "para invname">
                        '.str_replace("inv/","",$str).'
                    </div>
                    <div class="invoice">';
                        require $fil;
                    echo '
                        <div class="btnback">
                            <div class="hand controlbtn">
                                <button class="previewinv">Preview</button>
                                <button class="setinv">Select</button>
                            </div>
                        </div>
                    </div>
                    </div>';
                }
            }
        ?>
    </div>
    <div class="cowindow" id="popup" style="display: none; overflow:auto;padding-bottom:100px">
        <a class="right C_Btn" style="font-size: 50px;">&times;</a>
        <div class="viewer">
        </div>
    </div>
    <div class="hand" style="width:100%;">
        <button id='reload' onclick='relod()' class='btn_2 circle' disabled>Reload to view Changes</button>
    </div>
</div>