

const cookies = getCookie("username"), userxml = "users.xml",reqPhp = "request.php?",stPhp = "startup.php?",rtPhp = "return.php?";
var bool = false, months = ["January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"], contextvalue = "";subAmount = 0;
d = new Date();
_ = undefined;
//---------------------------------------------------------------------------
//user information
var username = ""; 

const Bill = $("invoice"), head = $("main"), prtHandle = $("printHandle"), BBody = $('billBody'), wndow = $('window'), nav = $('nav'), wintiltle = $("winTitle"), purchaseInvoice = $("purchaseInvoice");

if(cookies != ""){
    function getdata(){
        RequestPhp("GET",userxml,(y)=>{
            let doc = y.responseXML;
            let root = doc.getElementsByTagName("user");
            for (let i = 0; i < root.length; i++) {
                if(root[i].getAttributeNode("username").nodeValue == cookies){
                    this.BusinessName = root[i].getElementsByTagName("Bname")[0].innerHTML;
                    this.username =root[i].getElementsByTagName("name")[0].innerHTML;
                    this.userEmail = root[i].getElementsByTagName("email")[0].innerHTML;
                    this.userAddress = root[i].getElementsByTagName("address")[0].innerHTML;
                    this.dir = "Database/"+ root[i].getElementsByTagName("dir")[0].innerHTML;
                    this.dateCreated = root[i].getElementsByTagName("date")[0].innerHTML;
                    this.logo = root[i].getElementsByTagName("logo")[0].innerHTML;
                    this.logoStatus = root[i].getElementsByTagName("logo")[0].getAttributeNode("status").nodeValue;
                    this.pInvoice = ()=>{i=0;RequestPhp("GET",this.dir+'/pinvoice.xml',(z)=>{i=z.responseXML.querySelectorAll("pinvoice").length;},false);return i};
                    this.invoice = ()=>{i=0;RequestPhp("GET",this.dir+'/invoice.xml',(z)=>{i=z.responseXML.querySelectorAll("invoice").length;},false);return i};
                    this.companies = ()=>{i=0;RequestPhp("GET",this.dir+'/companies.xml',(z)=>{i=z.responseXML.querySelectorAll("company").length;},false);return i};
                    this.customer = ()=>{i=0;RequestPhp("GET",this.dir+'/customers.xml',(z)=>{i=z.responseXML.querySelectorAll("customer").length;},false);return i};
                    this.startup = parseFloat(root[i].getElementsByTagName("startup")[0].innerHTML);
                    
                    let x = root[i].getElementsByTagName("num");
                    let n = [];
                    for (let j = 0; j < x.length; j++) {
                        if(x[j].innerHTML != 0){
                            n[j] = x[j].innerHTML;
                        }
                    }
                    this.userNumber = n;
                    
                }
            }
            this.itemsDir =     this.dir+"/"+"Items"; 
            this.recordsDir =   this.dir+"/"+"Records"; 
            this.customersDir = this.dir+"/"+"Customers";
        },false);
    }
    user = new getdata();
}

function q(x){
    return document.querySelector(x);
}
function q_(x){
    return document.querySelectorAll(x);
}
function $(x){
    return document.getElementById(x);
}
HTMLElement.prototype.myID = myID;
function myID(){
    return this.getAttributeNode("myID").nodeValue;
}
function getTag(x){
    return document.getElementsByTagName(x);
}
function getClass(x){
    return document.getElementsByClassName(x);
}

var notifytime;
function notify(x , y){
let image ,clas;

if ('speechSynthesis' in window) {
    var synthesis = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(x);
    voices = [];
    voices =  synthesis.getVoices();
    utterance.voice = voices[2];
    synthesis.speak(utterance);
  } else {
    console.log('Text-to-speech not supported.');
  }
    if(y == "ok"){
        image = "ok.png"
        clas = "notify_ok"
    }else{
        image = "error.png"
        clas = "notification"
    }
    clearInterval(notifytime);
    $("notifyhandler").innerHTML = `<div style="z-index:5;" class="${clas}" onmouseover="rmclass(this)" onmouseleave="settime(this)">
    <a class="right C_Btn" onclick ="closethis(this)">&times;</a>
      <img src="${image}">
        <p style="display: inline-block;margin-left:5px;width:80%">${x}</p>
    </div>`;
    notifytime = setTimeout(()=>{
        $("notifyhandler").firstChild.className += " aftertime";
    } , 3000);
}
function closethis(t){
    $("notifyhandler").removeChild(t.parentNode);
}

function settime(t){
    notifytime = setTimeout(()=>{
        t.className += " aftertime";
    } , 3000);
}
function rmclass(t){
    clearInterval(notifytime);
    t.className = t.className.replace(" aftertime","");
}
function zero(int){
    var x;
    if(int < 10){
        x = "0"+int;
    }else{
        x = int;
    }
    return x;
}
function removeclass(doc,taglist,classname){
    list = doc.getElementsByTagName(taglist);
    for (let i = 0; i < list.length; i++) {
        list[i].className = list[i].className.replace(classname,"");
    }
}

//----------------------------------------------------------
//url request

var urlpath = window.location.pathname.replace(/\//g,"");
function focusthis(index){
    SideBarIcons = q(".sidebar").querySelectorAll("a");
    for (let j = 0; j < SideBarIcons.length; j++) {
        SideBarIcons[j].className = SideBarIcons[j].className.replace(" sidebar-active","");
    }
    SideBarIcons[index].className += " sidebar-active";
}
window.addEventListener('load',()=>{
    if(cookies === ""){
        if(urlpath == "invoice" || urlpath == "p-invoice" || urlpath == "return" || urlpath == "stack" || urlpath == "CC" 
        || urlpath == "employees" || urlpath == "records" || urlpath == "profile" || urlpath == ""){
            openLogin();
            changeurl("","");
        }
    }
    if(user.startup === 0){
        if(urlpath == "invoice" || urlpath == "p-invoice" || urlpath == "return" || urlpath == "stack" || urlpath == "CC" 
        || urlpath == "employees" || urlpath == "records" || urlpath == "profile" || urlpath == ""){
            changeurl("","");
            openStartup();
        }
    }else if(cookies !== ""){
        switch (urlpath) {
            case "invoice":
                openInvoice();
                focusthis(1);
                break;
            case "p-invoice":
                openPinvoice();
                focusthis(2);
                break;
            case "return":
                openReturn();
                focusthis(3);
                break;
            case "payments":
                openPayments();
                focusthis(4);
                break;
            case "stack":
                openItems();
                focusthis(5);
                break;
            case "CC":
                openCC();
                focusthis(6);
                break;
            case "employees":
                openEmployees();
                focusthis(7);
                break;
            case "records":
                openRecords();
                focusthis(8);
                break;
            case "profile":
                openProfile();
                focusthis(9);
                break;
            case "setting":
                openSetting();
                focusthis(10);
                break;
            case "help":
                openHelp();
                focusthis(11);
                break;
            case "about":
                openAbout();
                focusthis(12);
                break;
            case "contact":
                openContact();
                focusthis(13);
                break;
            default:
                focusthis(0);
                if(cookies !== ""){
                    openDashboard();
                }else{
                    openLogin();
                }
                break;
        }
    }
});

//----------------------------------------------------------
//application function
var newLoader = q(".loading-container");
var alldiv = q_("div:not(.loading-container , .loading-container div)");
for (let i =  0; i < alldiv.length; i++) {
    alldiv[i].style.visibility = "hidden";
}

window.addEventListener('load',()=>{
    setTimeout(()=>{
        newLoader.hide();
        for (let i =  0; i < alldiv.length; i++) {
            alldiv[i].style.visibility = "";
        }
    },1500);
});

$("Settingtab").onclick = ()=>{
    openSetting();
    changeurl("setting" ,"Settting");
}

$("helpPage").onclick = ()=>{
    openHelp();
    changeurl("help","Help");
}


HTMLElement.prototype.xdate = xdate; 
function xdate(x){
    let date = "";
    if(x == undefined){
        date =  this.getAttributeNode("day").nodeValue +"/"+ months[parseFloat(this.getAttributeNode("mon").nodeValue)]+
        "/"+ this.getAttributeNode("year").nodeValue;
    }else{
        date = x.getAttributeNode("day").nodeValue +"/"+ months[parseFloat(x.getAttributeNode("mon").nodeValue)]+
        "/"+ x.getAttributeNode("year").nodeValue;
    }
    return date;
}

HTMLElement.prototype.plerror = plerror;
function plerror(){
    span = this.parentNode.getElementsByTagName("span")[0];
    this.style.borderColor = "red";
    if(span != undefined){
        span.style.color = "red";
    }
    this.focus();
}
HTMLElement.prototype.plok = plok;
function plok(){
    span = this.parentNode.getElementsByTagName("span")[0];
    this.style.borderColor = "";
    if(span != undefined){
        span.style.color = "";
    }
}
HTMLElement.prototype.hide = hide; 
function hide(){
    this.style.display = 'none';
}
HTMLElement.prototype.ishide = ishide; 
function ishide(){
    if(this.style.display = 'none'){
        return true;
    }
}
HTMLElement.prototype.show = show; 
function show(x){
    if(x == undefined){
        this.style.display = 'block';    
    }else{
        this.style.display = x;
    }
}
HTMLElement.prototype.disable = disable; 
function disable(){
    att = document.createAttribute("disabled");
    this.setAttributeNode(att);
}
HTMLElement.prototype.enable = enable; 
function enable(){
    this.removeAttribute("disabled");
}
HTMLElement.prototype.remov = remov;
function remov(x){
    this.className += " remove";
    setTimeout(()=>{
        this.hide();
        this.className = $("holdinv").className.replace(" remove","");
        if(x !== undefined){x();};
    },500);
}

function holdertodiv(){
    let clas = getClass("placeholder");
    for (let i = 0; i < clas.length; i++) {
        let text = clas[i].getElementsByTagName("input")[0];
        let span = clas[i].getElementsByTagName("span")[0];
        if(text.value.length > 0){
            span.className = "after";
            span.style.color = "#747474";
        }
        clas[i].getElementsByTagName("input")[0].onfocus = ()=>{
            span.className = "after";
        }
        span.addEventListener("click",()=>{
            if(span.className == "before"){
                span.className = "after";
                text.focus();
            }
        });
        span.addEventListener("mouseenter",()=>{
            if(span.className == "before"){
                text.style.borderColor = "dodgerblue";
            }
        });
        span.addEventListener("mouseleave",()=>{
            if(span.className == "before"){
                text.style.borderColor = "";
            }
        });
        text.addEventListener("input",()=>{
            text.style.borderColor = "";
            span.style.color = "";
        });
        if(clas[i].getAttributeNode("reqr") !== null){
            text.addEventListener("blur",()=>{
                if(text.value.length == 0){
                    text.style.borderColor = "red";
                    span.style.color = "red";
                }else{
                    text.style.borderColor = "";
                    span.style.color = "#747474";
                }
            });
        }else{
            text.addEventListener("blur",()=>{
                if(text.value.length == 0){
                    span.className = "before";
                }
            });
        }
    }
}
function numOnly(string){
    x = string.replace(/[^0-9|\.|\+|\-|\/|\*|\%]/g,"");
    return x;
}
function relod(){
 location.reload();
}
function c(x){
    console.log(x)
}

function isok(x){
    let popup = $("popup");
    let msg = $("alertBox");
    popup.style.display = "block";
    msg.innerHTML = "<p>"+x+"</p>"
    let cancel = $("Cancel");
    this.ok = popup.getElementsByTagName("A")[1].addEventListener('click' , ()=>{
        popup.hide();
        return true;
    });
    popup.getElementsByTagName("A")[0].addEventListener('click' , ()=>{
        popup.hide();
        return false;
    });
    cancel.addEventListener('click' , ()=>{
        popup.hide();
        return false;
    });

}

function openWindow(x,y){
    table = BBody.querySelectorAll('tbody');
    for (let i = 0; i < table.length; i++) {
        trs = table[i].querySelectorAll("tr");
        for (let j = trs.length-1; j > 0 ; j--) {
            table[i].removeChild(trs[j]);
        }
    }
    wintiltle.innerHTML = x;
    BBody.innerHTML = y;
}
function closeWindow(){
    head.style.display = "block";
    wndow.style.display = "none";
    BBody.innerHTML = "";
}
function tabcontrol(x,y,z){
    for (let i = 0; i < x.length; i++) {
        $(x[i]).addEventListener('click',()=>{
            for (let j = 0; j < x.length; j++) {
                $(y[j]).hide();
                $(x[j]).className = $(x[j]).className.replace(z, "");
            }
            $(y[i]).show();
            $(x[i]).className += z;
        })
    }
}
function suggest_text(inputid /*input id*/,idForlist /*list id*/,array/*array*/,activeColor /*color*/,optianalfunction,extraTextArray,idlist,offset){
    let list = $(idForlist);
    let text = $(inputid);
    
    if(extraTextArray === undefined){
        for (let i = 0; i < array.length; i++) {
            list.innerHTML += "<li onclick='select(this)' block>"+array[i]+"</li>";
        }
    }else{
        for (let i = 0; i < array.length; i++) {
            list.innerHTML += `<li onclick='select(this)' block>${array[i]}<strong class="right">${extraTextArray[i]}</strong></li>`;
        }
    }

    if(idlist !== undefined){
        for (let i = 0; i < idlist.length; i++) {
            list.querySelectorAll("li")[i].id = idlist[i];
        }
    }

    text.addEventListener("input", ()=>{
        let str  = text.value.toLowerCase();
        let tags = list.querySelectorAll("li");
        list.show();
        for (let i = 0; i < array.length; i++) {
            if(extraTextArray === undefined){
                string = tags[i].innerHTML;
            }else{
                string = tags[i].innerHTML.replace(`<strong class="right">${extraTextArray[i]}</strong>`,"");
            }
            if(string.toLowerCase().indexOf(str) != -1){
                att = [];
                tags[i].show();
                att[i] = document.createAttribute("block");
                tags[i].setAttributeNode(att[i]);
            }else{
                tags[i].hide();
                tags[i].removeAttribute("block");
            }
        }
        optianalfunction();
    });
    let num = 0;
    let arrowDown = 0;
    let arrowUp = 0;
    text.addEventListener( "keydown" , (e)=>{
        allLi = list.querySelectorAll("li");
        for (let i = 0; i < allLi.length; i++) {
            allLi[i].style.backgroundColor = "";
        }

        if(e.key == "ArrowDown"){
            e.preventDefault();
            arrowDown=1;
            if(arrowUp == 1){
                num+=2
            }
            arrowUp=0;
            if(num == list.querySelectorAll("li[block]").length){
                num = 0;
            }
            if(extraTextArray !== undefined){
                extraText = list.querySelectorAll("li[block]")[num].getElementsByTagName("strong")[0].innerHTML;
                text.value = decodeHTMLEntities(list.querySelectorAll("li[block]")[num].innerHTML.replace(`<strong class="right">${extraText}</strong>`,""));
            }else{
                text.value = decodeHTMLEntities(list.querySelectorAll("li[block]")[num].innerHTML);
            }
            if(idlist !== undefined){
                att = document.createAttribute("myID");
                att.nodeValue = list.querySelectorAll("li[block]")[num].id;
                text.setAttributeNode(att);
            }
            list.querySelectorAll("li[block]")[num].style.backgroundColor = activeColor;
            list.scrollTop = list.querySelectorAll("li[block]")[num].offsetTop-offset;
            num++;
        }else
        if(e.key == "ArrowUp"){
            e.preventDefault();
            arrowUp=1;
            if(arrowDown == 1){
                num-=2;
            }
            arrowDown=0;
            if(num == -1){
                num = list.querySelectorAll("li[block]").length-1;
            }
            if(extraTextArray !== undefined){
                extraText = list.querySelectorAll("li[block]")[num].getElementsByTagName("strong")[0].innerHTML;
                text.value = decodeHTMLEntities(list.querySelectorAll("li[block]")[num].innerHTML.replace(`<strong class="right">${extraText}</strong>`,""));
            }else{
                text.value = decodeHTMLEntities(list.querySelectorAll("li[block]")[num].innerHTML);
            }
            if(idlist !== undefined){
                att = document.createAttribute("myID");
                att.nodeValue = list.querySelectorAll("li[block]")[num].id;
                text.setAttributeNode(att);
            }
            list.querySelectorAll("li[block]")[num].style.backgroundColor = activeColor;
            list.scrollTop = list.querySelectorAll("li[block]")[num].offsetTop-offset;
            num--;
        }else
        if(e.key == "Enter"){
            list.hide();
        }else{
            num = 0;
        }
    });
    text.addEventListener('blur', ()=>{
        setTimeout(()=>{
            list.hide();
        },100);
    });
}
function select(x){
    let text = x.parentNode.parentNode.querySelector("input");
    if(x.querySelector("strong") !== null){
        extraText = x.getElementsByTagName("strong")[0].innerHTML;
        text.value = decodeHTMLEntities(x.innerHTML.replace(`<strong class="right">${extraText}</strong>`,""));
    }else{
        text.value = decodeHTMLEntities(x.innerHTML);
    }
    if(x.id !== null){
        att = document.createAttribute("myID");
        att.nodeValue = x.id;
        text.setAttributeNode(att);
    }
    x.parentNode.hide();
    text.focus();
}
function contextstrip(x  /*target*/,y  /*edit fun*/,z /*delete fun*/,text1,text2){

    let s = $("menustrip")
    document.body.onclick = ()=>{
        setTimeout(()=>{
            s.style.display = "none";
        },100)
    }
    window.onscroll = ()=>{
        s.style.display = "none";
    }
    let tar = $(x);
    tar.oncontextmenu = (e)=>{
        e.preventDefault();
        s.style.display = "block";
        s.style.top = (e.screenY - s.clientHeight +10) + "px";
		s.style.left = e.screenX + "px";
        contextvalue = e.target.parentNode.getElementsByTagName("TH")[0].innerHTML;

        let edit = s.getElementsByTagName("DIV")[0];
        let delet = s.getElementsByTagName("DIV")[1];
        if(text1 != undefined){
            edit.innerHTML = text1;
        }
        if(text2 != undefined){
            delet.innerHTML = text2;
        }
        edit.onclick = ()=>{
            y();
        }
        delet.onclick = ()=>{
            z();
        }
    }
    
}
function encodeString(text){
    x = text.trim();
    y = x.replace(/\+/g," &plus; ");
    z = encodeURIComponent(y);
    return z;
}
function isfocus(){
    return document.activeElement;
} 
function decodeHTMLEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}
HTMLElement.prototype.nextTabIndex = nextTabIndex;
function nextTabIndex(x,y){
    this.onkeydown = (e)=>{
        if(e.key == "Tab"){
            setTimeout(()=>{if(x.style.display=="none"){y.focus()}else{x.focus()}},10);
        }
    }
}
function noNuN(x){
    x = +x || 0;
    return x;
}
function cleartable(x){
    trs = $(x).getElementsByTagName("tr");
    for (let i = trs.length-1; i > 0 ; i--) {
        $(x).removeChild(trs[i]);
    }
}
function filtersearch(taglist,searchbar){
    searchContent = taglist;
    searchitems = searchbar;
    let str = searchitems.value.toLowerCase();
    for (let i = 0; i < searchContent.length; i++) {
        if(searchContent[i].innerHTML.toLowerCase().indexOf(str) !== -1){
            searchContent[i].parentNode.style.display = "";
        }else{
            searchContent[i].parentNode.style.display = "none";
        }
    }
}
function changeurl(url,title) {
    var new_url = '/' + url;
    window.history.pushState('data', title +" - MakeMeTrader", new_url);
}
function clearfilter(taglist){
    searchContent = taglist;
    for (let i = 0; i < searchContent.length; i++) {
            searchContent[i].style.display = "";
    }
}
function getid(file,tagname,name){
    userid = -1;
    if(file == 0){newfile = user.dir+"/customers.xml"}
    else if(file == 1){newfile = user.dir+"/companies.xml"}
    else if(file == 2){newfile = user.dir+"/items.xml"}
    else{newfile = file}

    RequestPhp("GET",newfile,(x)=>{
        xmldoc = x.responseXML;
        if(xmldoc.querySelector(tagname+"[name='"+name+"']") !== null){
        maintag = xmldoc.querySelector(tagname+"[name='"+name+"']");
        userid = maintag.getAttributeNode("id").nodeValue;
        }
    },false);
    return userid;
}
function getname(file,tagname,id){
    username = "";
    if(file == 0){newfile = user.dir+"/customers.xml"}
    else if(file == 1){newfile = user.dir+"/companies.xml"}
    else if(file == 2){newfile = user.dir+"/items.xml"}
    else{newfile = file}

    RequestPhp("GET",newfile,(x)=>{
        xmldoc = x.responseXML;
        if(xmldoc.querySelector(tagname+"[id='"+id+"']") !== null){
        maintag = xmldoc.querySelector(tagname+"[id='"+id+"']");
        username = maintag.getAttributeNode("name").nodeValue;
        }
    },false);
    return username;
}
window.addEventListener("input",()=>{
    let s_bar = q_(".search-input");
    for (let i = 0; i < s_bar.length; i++) {
        s_bar[i].addEventListener("blur",()=>{
            s_bar[i].style.color = "transparent";
        });
        s_bar[i].addEventListener("focus",()=>{
            s_bar[i].style.color = "";
        });
    }
});

function sidebarfocusElemnt(){
    SideBarIcons = q(".sidebar").querySelectorAll("a");
    for (let i = 0; i < SideBarIcons.length; i++) {
        SideBarIcons[i].addEventListener('click',()=>{
            for (let j = 0; j < SideBarIcons.length; j++) {
                SideBarIcons[j].className = SideBarIcons[j].className.replace(" sidebar-active","");
            }
            SideBarIcons[i].className += " sidebar-active";
        });
    }
}
sidebarfocusElemnt();

// ______________________________________________________________
// additional tab code

var btnbody = q(".additional .btnbody");
var additional = q(".additional");
var closeAdditional = q(".additional .grab span");
var iconholder = q(".additional .iconholder");
var foldbtn = q(".additional .fold");
closeAdditional.addEventListener('click',()=>{
    if(additional.className.indexOf("additional-mimi") == -1){
        additional.className += " additional-mimi";
        iconholder.hide();
    }else{
        additional.className = additional.className.replace(" additional-mimi","");
        iconholder.show();
    }
});
// calculater function
foldbtn.addEventListener("click",()=>{
if(btnbody.clientHeight == 232){
    btnbody.className += " hidebtn";
    additional.className += " additional-less";
    foldbtn.childNodes[0].className += " rotate180deg";
}else{
    btnbody.className = btnbody.className.replace(" hidebtn","");
    additional.className = additional.className.replace(" additional-less","");
    foldbtn.childNodes[0].className = foldbtn.childNodes[0].className.replace(" rotate180deg","");
}
});

var tablebtn = q_(".additional .btnbody td");
var calculaterinput = q("#calculaterInput");
var calculated = q("#calculated");
for (let i = 0; i < tablebtn.length; i++) {
    tablebtn[i].addEventListener('click',()=>{
        if(tablebtn[i].innerHTML === "Bs"){
            words = calculaterinput.value.length;
            calculaterinput.value = calculaterinput.value.substring(0,words-1);
            calculaterinput.focus();
            calculated.value = noNuN(calcMe(calculaterinput.value));
        }else if(tablebtn[i].innerHTML === "AC"){
            calculated.value = 0;
            calculaterinput.value="";
            calculaterinput.focus();
        }else if(tablebtn[i].innerHTML === "="){
            calculated.value = noNuN(calcMe(calculaterinput.value));
            calculaterinput.value = noNuN(calcMe(calculaterinput.value));
            calculaterinput.focus();
        }else{
            calculaterinput.value += tablebtn[i].innerHTML;
            calculaterinput.focus();
            calculated.value = noNuN(calcMe(calculaterinput.value));
        }
    });
}
calculaterinput.addEventListener('input',()=>{
    calculaterinput.value = calculaterinput.value.replace(/[^0-9|\.|\+|\-|\*|\/|\(|\)]/g,"");
    calculated.value = noNuN(calcMe(calculaterinput.value));
    calculated.style.background = "";
});
calculaterinput.addEventListener('keydown',(e)=>{
    if(e.code === "NumpadEnter" || e.code === "Enter"){
        calculated.value = noNuN(calcMe(calculaterinput.value));
        calculaterinput.value = noNuN(calcMe(calculaterinput.value));
        calculaterinput.focus();
    }
    if(e.ctrlKey == true && e.code == "KeyC"){
        e.preventDefault;
        calculated.style.background = "repeating-linear-gradient(90deg, #0043ff, #00000073 2px)"; 
        navigator.clipboard.writeText(calculated.value);
        pt=calculaterinput.value;
        calculaterinput.value = "Answer copied";
        calculaterinput.style.color = "green";
        setTimeout(() => {
            calculaterinput.value = pt;calculaterinput.style.color = "";
        }, 1000);
    }
});
function calcMe(str){
    words = str.length;
    if(str.lastIndexOf("+") == words-1 || str.lastIndexOf("-") == words-1 || str.lastIndexOf("/") == words-1 ||
       str.lastIndexOf("*") == words-1 || str.lastIndexOf("%") == words-1){
        str = str.substring(0,words-1);
    }
    return eval(str);
}

{
    preActive = 0;
    addkey("KeyC",1,()=>{
        calculaterInput = $("calculaterInput");
        if(isfocus() !== calculaterinput){
            preActive = isfocus();
            additional.className = additional.className.replace(" additional-mimi","");
            iconholder.show();
            calculaterinput.focus();
        }else{
            preActive.focus();
        }
    },true);
}

// open source coding
//---------------------------------------------------------------

var collapseBtn = q(".collapse");
var maincontentwindow = q(".window");
var SideBar = q(".sidebar");
collapseBtn.addEventListener("click",()=>{
    if(SideBar.clientWidth >= 230){
        SideBar.className = SideBar.className.replace(/ side-full/g,"");
        SideBar.className += " side-mini";
        maincontentwindow.className = maincontentwindow.className.replace(/ win-full/g,"");
        maincontentwindow.className += " win-mini";
    }else{
        SideBar.className = SideBar.className.replace(/ side-mini/g,"");
        SideBar.className += " side-full";
        maincontentwindow.className = maincontentwindow.className.replace(/ win-mini/g,"");
        maincontentwindow.className += " win-full";
    }
});

//----------------------------------------------------------------
// print function
function printsetup(x,num,targetprt,cusfuntion){
    qr("#printHandle").querySelector(".invoicetitle").innerHTML = x;
    if(num !== undefined){
        $("invoiceNum").innerHTML = num;
    }
    window.onbeforeprint = ()=>{
        var x = BBody.querySelector(targetprt).innerHTML;
        if(cusfuntion !== undefined){cusfuntion();}
        var y = [head , nav , wndow];
        prtHandle.querySelector(".middle").innerHTML = x;
        prtHandle.show();
        for (let i = 0; i < y.length; i++) {
            y[i].hide();
        }
    }
    window.onafterprint = displayAll;

    function displayAll(){
        var y = [nav];
        prtHandle.style.display = 'block';
        for (let i = 0; i < y.length; i++) {
            y[i].style.display = "block" ;
        }
        wndow.style.display = "";
        prtHandle.style.display = 'none';
        q(".sidebar").show();
    }
}

// --------------------------------------------------------------
// short keys
function addkey(key1,Ctrl,func,bool){
    window.addEventListener( "keydown", (e)=>{
        c(e.code);
        if(Ctrl === undefined){
            if(e.code == key1){
                if(bool == true){e.preventDefault();}
                func();
            }
        }else if(Ctrl == 0){
            if(e.ctrlKey && e.code == key1){
                if(bool == true){e.preventDefault();}
                func();
            }
        }else if(Ctrl == 1){
            if(e.altKey && e.code == key1){
                if(bool == true){e.preventDefault();}
                func();
            }
        }else if(Ctrl == 2){
            if(e.altKey && e.ctrlKey && e.code == key1){
                if(bool == true){e.preventDefault();}
                func();
            }
        }
    });
}
addkey("F2",_,()=>{
    let totext = q_("input[type = 'password']");
    let topass = q_("input[type = 'pass']");
    for (let i = 0; i < totext.length; i++) {  
        totext[i].type = "pass";
    }
    for (let i = 0; i < topass.length; i++) {
        topass[i].type = "password";
    }
},true);

{
    let keycount = 0;
    addkey("F3",_,()=>{
        search = q_(".search-input");
        if(keycount == search.length){keycount = 0;}
        search[keycount].focus();
        keycount++;
    },true);
}

//---------------------------------------------------------
// Request Block

function RequestPhp(y,z,a,bool,p){
    if (window.XMLHttpRequest) {
        // code for modern browsers
        var xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
      xhttp.onreadystatechange = function(e) {
        if (this.readyState == 4 && this.status == 200) {
          a(this);
      }
      
    }
      xhttp.open(y, z, bool);
      if(p == undefined){
        xhttp.send();
      }else{
        xhttp.send(p);
      }
}
function isfile(x){
    var xhttp = new XMLHttpRequest();
    xhttp.open("HEAD", x, false);
    xhttp.send();
    z = 0;
    if(xhttp.status == 404){
        z=false
    }else{
        z=true;
    }
    return z;
}

//---------------------------------------------------------
// for other pages

if(cookies != ""){
    let login = $("submit");
    login.addEventListener('click',()=>{
        RequestPhp("GET", reqPhp+"&Uname="+encodeString(cookies)+"&pass=0&req=logout",
        (x)=>{ 
                if(x.responseText == 1){
                location.reload();
            }
        },true);
    })

    q(".total-sidebar").show();
    let logout = $("login");
    logout.onclick = ()=>{
        let loginForm = $("loginForm");
        if(loginForm.style.display == "none"){

            loginForm.show();
        }else{
            loginForm.hide();
        }
    }
    let alltags = q_("body > div:not(loginForm) div:not(nav)");
    for (let in1 = 0; in1 < alltags.length; in1++) {
        alltags[in1].onclick = ()=>{
            loginForm.hide();
        }
        
    }
    if(user.startup === 0){
        dashboard = $("dashboard");
        dashboard.getElementsByTagName("span")[1].innerHTML = "Get Start";
        dashboard.onclick = ()=>{
            openStartup();
            changeurl("","");
        }
    q(".total-sidebar").hide();
    }else{
        //---------------------------------------------------------
        // return page script
        returnpage = $("returns");
        
        returnpage.onclick = ()=>{
            openReturn();
            changeurl("return","Return");
        }
        //---------------------------------------------------------
        // payments page script
        payments = $("payments");

        payments.onclick = ()=>{
            openPayments();
            changeurl("payments","Payments")
        }

        //---------------------------------------------------------
        // purchase invoice page script

        purchaseInvoice.onclick = ()=>{
            openPinvoice();
            changeurl("p-invoice","Purchase invoice");
        }

        //---------------------------------------------------------
        // Invoice page script

        Bill.onclick = ()=>{
            openInvoice();
            changeurl("invoice","Invoice");
        }
        //---------------------------------------------------------
        // records page script
        $("records").onclick = ()=>{
            openRecords();
            changeurl("records","Records");
        }
        
        //---------------------------------------------------------
        // Customer / Companies page script

        $("RCustomer").onclick = ()=>{
            openCC();
            changeurl("CC","Customers & Companies");
        }

        //---------------------------------------------------------
        // item page script
        var itemsbtn = $("itemsList");
        let user = new getdata();
        itemsbtn.onclick = ()=>{
            openItems();
            changeurl("stack","Stack");
        }

        //----------------------------------------------------------
        // employ page

        $("employ").onclick = ()=>{
            openEmployees();
            changeurl("employees","Employees");
        }

        //__________________________________________________________________
        // profile page
        var profile = $("yourId");
        profile.addEventListener('click',()=>{
            openProfile();
            changeurl("profile","Profile");
        });
    }
}
else{
    dashboard = $("dashboard");
    dashboard.onclick = ()=>{
        openLogin();
        changeurl("","Join or Login");
    }
    document.querySelector(".Rsidebar").hide();
    document.querySelector(".additional").hide();
    windowMain = document.querySelector("#window_main");
    windowMain.style.width = "100%";
    dashboard = $("dashboard");
    dashboard.getElementsByTagName("span")[1].innerHTML = "Join or Login";
    q(".total-sidebar").hide();
}
//------------------------------------------------------------------------------------
//Get cookies function

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

//==========================================================================
//==========================================================================
//==========================================================================
// All pages functions

//---------------------------------------------------------------
// Loginfunction function

function openLogin(){

    RequestPhp("GET", "signupform.html",(x)=>{
        openWindow("Login - Signup",x.responseText);
        holdertodiv();

        let login = $("submit");
        login.addEventListener('click',()=>{
            let user = $("username");
            let pass3 = $("password");
            if(user.value == ''){
                notify("Username required");
            }else if(pass3.value == "") {
                notify("Password required");
            }else {
                RequestPhp("GET", reqPhp+"&Uname="+encodeString(user.value)+"&pass="+encodeString(pass3.value)+"&req=login",
                (x)=>{
                    if(x.responseText == 1){
                        location.reload();
                    }else if(x.responseText == -1){
                        notify("Worng password");
                    }else {
                        notify("Username not found "+x.responseText);
                    }
                },true);
            }
        });
        //-------------------------------------------------------------------------
        // sign up page script 

        let signupfbtn = $("createId");
            loginfbtn = $("submitinform");
            signupform = $("signupform");
            loginform = $("loginform");
            if(localStorage.getItem("countrycheck") !== null){
                countrycheck = 1;
            }else{
                countrycheck = 0;
            }
            zoneforstepnext = true;
            var db = window.openDatabase("ipinfo","1.0","ipinfo of viewer",2*1024*1024);
        signupfbtn.onclick = ()=>{
            $("signloader").show();
            signupform.show();
            signupform.querySelector("input[type='text']").focus();
            q("#tdrAcc").checked = true;
            signupform.querySelector(".step-1").show();
            signupform.querySelector(".step-0").hide();
            q('.signupform').className = q('.signupform').className.replace(/ formstep-0/g,"");
            q('.signupform').className += " formstep-1";
            if(navigator.onLine == true){
                if(countrycheck == 0){
                    fetch("https://ipinfo.io/json?token=44f04226b0975b").then(
                    (response) => response.json()
                    ).then(
                    (r) => {
                        c(r);
                        var country = r.country;
                            timezone = r.timezone;
                        
                        foundCon = $("suggestCountry").querySelector(`li[id='${country}']`);
                        $("country").value = foundCon.innerHTML;
                        att = document.createAttribute("myID");
                        att.nodeValue = country;
                        $("country").setAttributeNode(att);
                        countrycheck = 1;
                        localStorage.setItem("countrycheck",1);
                        fetch("lib/countries.xml")
                        .then((x) => x.text())
                        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                        .then((doc)=>{
                            currency = doc.querySelector(`country[cc-ios-2='${$("country").myID()}']`);
                            $("currency").value = currency.querySelector("cr-code").innerHTML;

                            $("timeZone").focus();
                            zoneroot = doc.getElementsByTagName("time-zone");
                            for (let i = 0; i < zoneroot.length; i++) {
                                if(timezone == zoneroot[i].innerHTML){
                                    $("timeZone").value = timezone;
                                    $("accLevel").focus();
                                }
                            }
                            holdertodiv();
                            db.transaction(t=>{
                                t.executeSql(`CREATE TABLE viewerip (
                                    city varchar(255),
                                    country varchar(255),
                                    ip varchar(255),
                                    loc varchar(255),
                                    org varchar(255),
                                    postal varchar(255),
                                    timezone varchar(255),
                                    region varchar(255),
                                    currency varchar(255)
                                );`)
                                t.executeSql(`INSERT INTO viewerip (city, country, ip, loc,org, postal, timezone,region,currency)
                                VALUES (?,?,?,?,?,?,?,?,?);`,[r.city,r.country,r.ip,r.loc,r.org,r.postal,r.timezone,r.region,$("currency").value])
                            },e=>console.error(e));

                            $("signloader").hide()
                        })
                    })
                }else{
                    db.transaction(t=>{
                        t.executeSql(`SELECT * from viewerip`,[],(t,rus)=>{
                            c(rus.rows[0]);
                            r = rus.rows[0];
                            var country = r.country;
                                timezone = r.timezone;
                                currency = r.currency; 
                            
                            foundCon = $("suggestCountry").querySelector(`li[id='${country}']`);
                            $("country").value = foundCon.innerHTML;
                            att = document.createAttribute("myID");
                            att.nodeValue = country;
                            $("country").setAttributeNode(att);
                            $("currency").value = currency;

                            zoneroot = document.querySelectorAll("#suggestZone li");
                            $("timeZone").focus();
                            for (let i = 0; i < zoneroot.length; i++) {
                                if(timezone == zoneroot[i].innerHTML){
                                    $("timeZone").value = timezone;
                                    $("accLevel").focus();
                                }
                            }
                            holdertodiv();
                            $("signloader").hide();
                        });
                    })
                }
            }else{
                db.transaction(t=>{
                    t.executeSql(`SELECT * from viewerip`,[],(t,rus)=>{
                        r = rus.rows[0];
                        var country = r.country;
                            timezone = r.timezone;
                            currency = r.currency; 
                        
                        foundCon = $("suggestCountry").querySelector(`li[id='${country}']`);
                        $("country").value = foundCon.innerHTML;
                        att = document.createAttribute("myID");
                        att.nodeValue = country;
                        $("country").setAttributeNode(att);
                        $("currency").value = currency;

                        zoneroot = document.querySelectorAll("#suggestZone li");
                        $("timeZone").focus();
                        for (let i = 0; i < zoneroot.length; i++) {
                            if(timezone == zoneroot[i].innerHTML){
                                $("timeZone").value = timezone;
                                $("accLevel").focus();
                            }
                        }
                        holdertodiv();
                        $("signloader").hide()
                    });
                },(e)=>{ console.log(e); $("signloader").hide();$("country").focus()});
            }
        }

        q("#tdrAcc").addEventListener('change',()=>{
            signupform.querySelector(".step-1").show();
            signupform.querySelector(".step-0").hide();
            q('.signupform').className = q('.signupform').className.replace(/ formstep-0/g,"");
            q('.signupform').className += " formstep-1";
        });
        q("#manuAcc").addEventListener('change',()=>{
            signupform.querySelector(".step-1").hide();
            signupform.querySelector(".step-0").show();
            q('.signupform').className = q('.signupform').className.replace(/ formstep-1/g,"");
            q('.signupform').className = q('.signupform').className.replace(/ formstep-2/g,"");
            q('.signupform').className += " formstep-0";
        });
        q("#serAcc").addEventListener('change',()=>{
            signupform.querySelector(".step-1").hide();
            signupform.querySelector(".step-0").show();
            q('.signupform').className = q('.signupform').className.replace(/ formstep-1/g,"");
            q('.signupform').className = q('.signupform').className.replace(/ formstep-2/g,"");
            q('.signupform').className += " formstep-0";
        });

        loginfbtn.onclick = ()=>{
            signupform.hide();
            loginform.querySelector("input").focus();
        }
        q("#closeSignup").onclick = ()=>{
            signupform.hide();
        }
        fetch("lib/countries.xml")
        .then((x) => x.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((doc)=>{
            let root = doc.getElementsByTagName("country");
                zoneroot = doc.getElementsByTagName("time-zone");
            names=[];iso2=[];crCode=[];sbl=[];
            for (let i = 0; i < root.length; i++) {
                names[i] = root[i].querySelector("en-name").innerHTML;
                crCode[i] = root[i].querySelector("cr-code").innerHTML;
                sbl[i] = root[i].querySelector("cr-symbel").innerHTML;
                iso2[i] = root[i].getAttributeNode("cc-ios-2").nodeValue;
            }
            timeZone=[];
            for (let i = 0; i < zoneroot.length; i++) {
                timeZone[i] = zoneroot[i].innerHTML;   
            }

            $("country").addEventListener("blur",()=>{
                currency = doc.querySelector(`country[cc-ios-2='${$("country").myID()}']`);
                $("currency").value = currency.querySelector("cr-code").innerHTML;
                holdertodiv();
            });

            $("accLevel").addEventListener('change',()=>{
                if($("country").value.length !== 0 || $("currency").value.length !== 0 || $("timeZone").value.length !== 0){
                    signupform.querySelector(".step-2").show();
                    signupform.querySelector(".step-3").show();
                    q('.signupform').className += " formstep-2";
                }
            })

            suggest_text("country","suggestCountry",names,"rgb(218, 218, 218)",()=>{
            },_,iso2,110);
            suggest_text("currency","suggestCurrency",crCode,"rgb(218, 218, 218)",()=>{
            },sbl,iso2,110);
            suggest_text("timeZone","suggestZone",timeZone,"rgb(218, 218, 218)",()=>{
            },_,timeZone,110);

        });

        var letCreateId = $("createIdinform");
        letCreateId.addEventListener('click', ()=>{
            volidateform("createIdinform","password1","password2",
            "Bname","Yname","Email","PhNo","address","Uname");
            holdertodiv();
        });

        function volidateform(a,b,c,y,z,d,e,f,g){
            
            var createID = $(a);

            createID.onclick = ()=>{
                var pass1 = $(b);
                var pass2 = $(c);
                var Bname = $(y);
                var Yname = $(z);
                var Email = $(d);
                var number = $(e);
                var Address = $(f);
                var Uname = $(g);

                let bool = true;

                email = "none@site.com";
                if(Email.value != ""){
                    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email.value))){
                        notify("Please provide a valid Email address");
                        Email.style.borderColor = "red";
                        bool = false;
                    }else{
                        email = Email.value;
                    }
                }
                if(bool == false){}else
                if(Bname.value.length <= 2){
                    notify("Please provide your business name at least 3 letter");
                    Bname.plerror();
                } else
                if(Yname.value.length <= 2){
                    notify("Please provide your good name at least 3 letter");
                    Yname.plerror();
                } else
                if(number.value.length <= 0){
                    notify("Please provide your contact number");
                    number.plerror();
                } else
                if(Address.value.length <= 6){
                    notify("Please provide your business address at least 6 letter");
                    Address.plerror();
                } else
                if(Uname.value.length <= 0){
                    notify("Please provide a uniqe username");
                    Uname.plerror();
                } else
                if(pass1.value.length <= 0){
                    notify("Password look like empty");
                    pass1.plerror();
                    if(pass1.value != pass2.value){
                        notify("Password not match");
                        pass2.plerror();
                    }
                } else{
                    
                    RequestPhp("GET", reqPhp+"Bname="+encodeString(Bname.value)+"&name="+encodeString(Yname.value)+
                    "&email="+encodeString(email)+"&num="+encodeString(number.value)+"&address="+encodeString(Address.value)+
                    "&Uname="+encodeString(Uname.value)+"&pass="+encodeString(pass1.value)+"&req=signin",
                    (x)=>{ if(x.responseText == 1){
                            location.reload();
                        }else{
                            notify("You have already an account on this username "+ x.responseText);
                            Uname.plerror();
                        }
                    },true);
                    
                }
            }
        }
    },true);
}

//---------------------------------------------------------------
// Loginfunction function

function openStartup(){
    RequestPhp("GET", "startup.html",(x)=>{
        openWindow("startup",x.responseText);
        holdertodiv();
        cwcm = $("Creditinmarket")
        cwcm.onchange = ()=>{
            let Extrainput = $("cwcm");
            if(cwcm.checked == true){
                Extrainput.show();
            }else{
                if(confirm("Are you sure to remove all added customers")==true){
                    Extrainput.hide();
                    RequestPhp("GET", `${stPhp}req=deleteCustomers`,
                        (x)=>{
                            notify(x.responseText);
                        },true);
                    let table = $("custable")
                    let tr = table.getElementsByTagName("tr");
                    for (let i = 1; i < tr.length; i++) {
                        table.removeChild(tr[i]);
                    }
                    $("totalCreditCustomers").value = 0;
                }
            }
        }

        cwcs = $("Creditwithsellers")
        cwcs.onchange = ()=>{
            let Extrainput = $("cwcs");
            if(cwcs.checked == true){
                Extrainput.show();
            }else{
                if(confirm("Are you sure to remove all added Companies")==true){
                    Extrainput.hide();
                    RequestPhp("GET", `${stPhp}req=deleteComapnies`,
                        (x)=>{
                            notify(x.responseText);
                        },true);
                    let table = $("Comtable");
                    let tr = table.getElementsByTagName("tr");
                    for (let i = 1; i < tr.length; i++) {
                        table.removeChild(tr[i]);
                    }
                    $("totalCreditCompanies").value = 0;
                }
            }
        }

        //start up items adding script;
        let actionupdate = $("actionupdate");
        let action = $("action");
        let itemName = $("Item_name");
        let itemQuantity = $("quantity");
        let QuantityUnit = $("quantityunit");
        let itemGrate = $("PurchaseRate");
        let itemHSrate = $("HoleSaleRate");
        let itemNRate = $("NormalRate");
        let totalAmount = $("totalAmount");

        searchContent = getClass("itemName");
        searchitems = $("searchitems");
        searchitems.oninput = ()=>{
            let str = searchitems.value.toLowerCase();
            
            for (let i = 0; i < searchContent.length; i++) {
                if(searchContent[i].innerHTML.toLowerCase().indexOf(str) != -1){
                    searchContent[i].parentNode.style.display = "";
                }else{
                    searchContent[i].parentNode.style.display = "none";
                }
            }
        }
        searchitems.onblur = ()=> {
            searchitems.style.color = "#00000000";
        }
        searchitems.onfocus = ()=> {
            searchitems.style.color = "#333";
        }

        RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
            doc = x.responseXML;
            let root = doc.getElementsByTagName("item");
            for (let i = 0; i < root.length; i++) {
                let nameitem = root[i].getAttributeNode("name").nodeValue; 
                let Quntity = parseFloat(root[i].getElementsByTagName("quntity")[0].innerHTML);
                let Unit = root[i].getElementsByTagName("unit")[0].innerHTML;
                let GRate = parseFloat(root[i].getElementsByTagName("grate")[0].innerHTML);

                itemstable.innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp itemName' title='Right click to show options'>"+
                nameitem+"</td><td>"+Quntity+Unit+"</td><td>"+
                GRate+"</td><td>"+(Quntity*GRate).toLocaleString()+"</td>";
            }
            totalAmount.value = parseFloat(doc.getElementsByTagName("total")[0].innerHTML).toLocaleString();
            
        },true);

        contextstrip("itemstable",()=>{
            if(contextvalue != ""){
                
                action.hide();actionupdate.show();
                let delet = itemstable.getElementsByTagName("tr")[contextvalue];
                subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));

                RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
                    doc = x.responseXML;
                    let root = doc.getElementsByTagName("item");

                    itemName.value = decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML);
                    for (let i = 0; i < root.length; i++) {
                        if(root[i].getAttributeNode("name").nodeValue == itemName.value){
                            let Nrate = parseFloat(root[i].getElementsByTagName("prate")[0].innerHTML);
                            let Unit = root[i].getElementsByTagName("unit")[0].innerHTML;
                            let HsRate = parseFloat(root[i].getElementsByTagName("hsrate")[0].innerHTML);

                            QuantityUnit.value = Unit;
                            itemHSrate.value = HsRate;
                            itemNRate.value = Nrate;
                        }
                    }
                    
                },true);

                itemQuantity.value = delet.getElementsByTagName("td")[1].innerHTML;
                itemGrate.value = delet.getElementsByTagName("td")[2].innerHTML;

                att = document.createAttribute("disabled");
                itemName.setAttributeNode(att);
                itemQuantity.focus()
                
            }
        },()=>{
            if(contextvalue != ""){
                if (confirm("Are you sure to delete this item") == true){
                    let delet = itemstable.getElementsByTagName("tr")[contextvalue];
                    let subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                    itemstable.removeChild(delet);
                   
                    let dsp = itemstable.getElementsByClassName("left");
                    for (let j = 0; j < dsp.length; j++) {
                        dsp[j].innerHTML = j;
                    }
                    totalAmount.value = (parseFloat(totalAmount.value.replace(/,/g,""))-subAmount).toLocaleString();

                    RequestPhp("GET", `${reqPhp}req=deleteitem`+
                    `&Iname=${encodeString(decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML))}&total=${parseFloat(totalAmount.value.replace(/,/g,""))}`
                    ,(x)=>{},true);
                    
                    dsp[0].innerHTML = "";
                    contextvalue = "";
                    subAmount = 0;
                    action.show();actionupdate.hide();
                    itemName.removeAttribute("disabled");
                    itemName.focus();
                }
            }
        });

        actionupdate.onclick = ()=>{

            if(itemName.value.length == 0){
                notify("Item name required");
                itemName.focus();
                itemName.style.border = "1px solid red";
            }else if(itemQuantity.value <= 0){
                notify("Quantity required");
                itemQuantity.focus();
                itemQuantity.style.border = "1px solid red"
            }else if(QuantityUnit.value.length == 0){
                QuantityUnit.focus();
                notify("Quantity type required");
                QuantityUnit.style.border = "1px solid red"
            }else if(itemGrate.value <= 0){
                itemGrate.focus();
                notify("Gross rate required");
                itemGrate.style.border = "1px solid red"
            }else if(itemHSrate.value <= 0){
                itemHSrate.focus();
                notify("Hole sale rate required");
                itemHSrate.style.border = "1px solid red"
            }else if(itemNRate.value <= 0){
                itemNRate.focus();
                notify("Normal rate required");
                itemNRate.style.border = "1px solid red"
            }else{
                let edit = itemstable.getElementsByTagName("tr")[contextvalue];

                edit.getElementsByTagName("td")[0].innerHTML = itemName.value;
                edit.getElementsByTagName("td")[1].innerHTML = itemQuantity.value+QuantityUnit.value;
                edit.getElementsByTagName("td")[2].innerHTML = itemGrate.value;
                edit.getElementsByTagName("td")[3].innerHTML = (itemQuantity.value*itemGrate.value).toLocaleString();

                total = (parseFloat(totalAmount.value.replace(/,/g,"")-subAmount)+
                parseFloat(itemQuantity.value*itemGrate.value)).toLocaleString();
                totalAmount.value = total;

                RequestPhp("GET", `${reqPhp}req=updateitem&Iname=${encodeString(itemName.value)}`+
                `&Iqun=${itemQuantity.value}&Qunit=${encodeString(QuantityUnit.value)}&Grate=${itemGrate.value}`+
                `&Hsrate=${itemHSrate.value}&Prate=${itemNRate.value}&invoice=${user.pInvoice()}&total=${total.replace(/,/g,"")}`,
                (x)=>{
                    notify(x.responseText);
                },true);
                
                contextvalue = "";
                subAmount = 0;
                action.show();actionupdate.hide();
                itemQuantity.value = "";
                itemName.removeAttribute("disabled");
                itemName.focus();
            }
        }
        
        action.onclick = ()=>{
            let dsp = getClass("dsp");
            samename = false;
            for (let i = 0; i < dsp.length; i++) {
                if(itemName.value.toLowerCase() == dsp[i].innerHTML.toLowerCase()){
                    samename = true;
                }
            }
            if(samename == true){
                notify("You already add this item");
                itemName.focus();
                itemName.style.border = "1px solid red";
            }else if(itemName.value.length == 0){
                notify("Item name required");
                itemName.focus();
                itemName.style.border = "1px solid red";
            }else if(itemQuantity.value <= 0){
                notify("Quantity required");
                itemQuantity.focus();
                itemQuantity.style.border = "1px solid red"
            }else if(QuantityUnit.value.length == 0){
                QuantityUnit.focus();
                notify("Quantity type required");
                QuantityUnit.style.border = "1px solid red"
            }else if(itemGrate.value <= 0){
                itemGrate.focus();
                notify("Gross rate required");
                itemGrate.style.border = "1px solid red"
            }else if(itemHSrate.value <= 0){
                itemHSrate.focus();
                notify("Hole sale rate required");
                itemHSrate.style.border = "1px solid red"
            }else if(itemNRate.value <= 0){
                itemNRate.focus();
                notify("Normal rate required");
                itemNRate.style.border = "1px solid red"
            }else{
                itemstable.innerHTML += "<th class='left'>"+(itemstable.getElementsByTagName("tr").length)+"</th><td class='dsp itemName'>"+
                itemName.value+"</td><td>"+itemQuantity.value+QuantityUnit.value+"</td><td>"+
                itemGrate.value+"</td><td>"+(itemQuantity.value*itemGrate.value).toLocaleString()+"</td>";

                let total = 0;
                if(totalAmount.value.length == 0){
                    total = (itemQuantity.value*itemGrate.value).toLocaleString();
                }else{
                    total = (parseFloat(totalAmount.value.replace(/,/g,""))+
                    parseFloat(itemQuantity.value*itemGrate.value)).toLocaleString();
                }

                totalAmount.value = total;

                RequestPhp("GET", `${reqPhp}req=purchaseitem&Iname=${encodeString(itemName.value)}&dir=${user.dir}`+
                `&Iqun=${itemQuantity.value}&Qunit=${QuantityUnit.value}&Grate=${itemGrate.value}`+
                `&Hsrate=${itemHSrate.value}&Prate=${itemNRate.value}&invoice=${user.pInvoice()}&total=${total.replace(/,/g,"")}`,
                (x)=>{notify(x.responseText);},true);

                for (let i = 0; i < searchContent.length; i++) {
                    searchContent[i].parentNode.style.display = "";
                }

                itemQuantity.value = "";
                itemName.focus();
            }
        }

        
        let updateast = $("updateast");
        let addast = $("addast");
        let astName = $("ast_name");
        let astPurRate = $("astPurRate");
        let totalastAmount = $("totalastAmount");

        astContent = getClass("astName");
        searchast = $("searchast");
        searchast.oninput = ()=>{
            let str = searchast.value.toLowerCase();
            
            for (let i = 0; i < astContent.length; i++) {
                if(astContent[i].innerHTML.toLowerCase().indexOf(str) != -1){
                    astContent[i].parentNode.style.display = "";
                }else{
                    astContent[i].parentNode.style.display = "none";
                }
            }
        }
        searchast.onblur = ()=> {
            searchast.style.color = "#00000000";
        }
        searchast.onfocus = ()=> {
            searchast.style.color = "#333";
        }

        RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
            doc = x.responseXML;
            let root = doc.getElementsByTagName("asset");
            for (let i = 0; i < root.length; i++) {
                let nameast = root[i].getAttributeNode("name").nodeValue;
                let Rate = parseFloat(root[i].getElementsByTagName("rate")[0].innerHTML);

                assettable.innerHTML += "<tr><th class='left'>"+(i+1)+"</th><td class='dsp astName' title='Right click to show options'>"+
                nameast+"</td><td>"+
                Rate+"</td></tr>";
            }
            totalastAmount.value = parseFloat(doc.getElementsByTagName("TAA")[0].innerHTML).toLocaleString();
            
        },true);

        contextstrip("assettable",()=>{
            if(contextvalue != ""){
            
                addast.hide();updateast.show();
                let delet = assettable.getElementsByTagName("tr")[contextvalue];
                
                subAmount = parseFloat(delet.getElementsByTagName("td")[1].innerHTML.replace(/,/g,""));

                astName.value = decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML);
                astPurRate.value = delet.getElementsByTagName("td")[1].innerHTML;
                att = document.createAttribute("disabled");
                astName.setAttributeNode(att);
                astPurRate.focus();
                
            }
        },()=>{
            if(contextvalue != ""){
                if (confirm("Are you sure to delete this item") == true){
                    let delet = assettable.getElementsByTagName("tr")[contextvalue];
                    let subAmount = parseFloat(delet.getElementsByTagName("td")[1].innerHTML.replace(/,/g,""));
                    as.removeChild(delet);
                   
                    let dsp = assettable.getElementsByClassName("left");
                    for (let j = 0; j < dsp.length; j++) {
                        dsp[j].innerHTML = j;
                    }
                    totalastAmount.value = (parseFloat(totalastAmount.value.replace(/,/g,""))-subAmount).toLocaleString();

                    RequestPhp("GET", `${reqPhp}req=deleteAst`+
                    `&ast=${encodeString(decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML))}&total=${parseFloat(totalastAmount.value.replace(/,/g,""))}`
                    ,(x)=>{},true);
                    
                    dsp[0].innerHTML = "";
                    contextvalue = "";
                    subAmount = 0;
                    addast.show();updateast.hide();
                    astName.removeAttribute("disabled");
                    astName.focus();
                }
            }
        });

        updateast.onclick = ()=>{

            if(astName.value.length == 0){
                notify("Asset name required");
                astName.focus();
                astName.style.border = "1px solid red";
            }else if(astPurRate.value <= 0){
                astPurRate.focus();
                notify("Purchase rate required");
                astPurRate.style.border = "1px solid red"
            }else {
                let edit = assettable.getElementsByTagName("tr")[contextvalue];

                edit.getElementsByTagName("td")[0].innerHTML = astName.value;
                edit.getElementsByTagName("td")[1].innerHTML = astPurRate.value;
                
                total = (parseFloat(totalAmount.value.replace(/,/g,"")-subAmount)+
                parseFloat(astPurRate.value).toLocaleString());
                totalastAmount.value = total;

                RequestPhp("GET", `${reqPhp}req=updateast&ast=${encodeString(astName.value)}`+
                `&Grate=${astPurRate.value}&total=${total.replace(/,/g,"")}`,
                (x)=>{
                    notify("Updated Successfully"+x.responseText,"ok");
                },true);

                astName.removeAttribute("disabled");
                
                contextvalue = "";
                subAmount = 0;
                addast.show();updateast.hide();
                astPurRate.value = "";
                astName.focus();
            }
        }
        addast.onclick = ()=>{
            let dsp = getClass("dsp");
            samename = false;
             for (let i = 0; i < dsp.length; i++) {
                 if(astName.value.toLowerCase() == dsp[i].innerHTML.toLowerCase()){
                     samename = true;
                 }
             }
             if(samename == true){
                 notify("You already add this item");
                 astName.style.border = "1px solid red";
             }else if(astName.value.length == 0){
                notify("Asset name required");
                astName.focus();
                astName.style.border = "1px solid red";
            }else if(astPurRate.value <= 0){
                astPurRate.focus();
                notify("Purchase rate required");
                astPurRate.style.border = "1px solid red"
            }else{
                assettable.innerHTML += "<th class='left'>"+(assettable.getElementsByTagName("tr").length+1)+"</th><td class='dsp itemName'>"+
                astName.value+"</td><td>"+astPurRate.value+"</td>";

                let total = 0;
                if(totalastAmount.value.length == 0){
                    total = (astPurRate.value).toLocaleString();
                }else{
                    total = (parseFloat(totalastAmount.value.replace(/,/g,""))+
                    parseFloat(astPurRate.value)).toLocaleString();
                }

                totalAmount.value = total;
                RequestPhp("GET", `${reqPhp}req=addast&ast=${encodeString(astName.value)}&Grate=${astPurRate.value}`+
                `&invoice=${user.pInvoice()}&total=${total.replace(/,/g,"")}`,
                (x)=>{
                notify("added Successfully"+x.responseText,"ok")
                },true);

                for (let i = 0; i < astContent.length; i++) {
                    astContent[i].parentNode.style.display = "";
                }

                astPurRate.value = "";
                astName.focus();
             }
         }

        window.oninput = ()=>{
            let inpt = getTag("input");
            for (let i = 0; i < inpt.length; i++) {
                inpt[i].style.border = "";
            }
        }

    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------
        // start up customer and company script

        let cusDetail = $("customerDetail");
        let comDetail = $("companyDetail");
        $("Addcus").onclick =()=> cusDetail.show();
        $("Addcom").onclick =()=> comDetail.show();
        let clos = getClass("close");
        for (let i = 0; i < clos.length; i++) {
            clos[i].onclick = ()=> {cusDetail.hide(); comDetail.hide()}
        }

        let addCustomer = $("addCustomer");
        let addCompany = $("addCompany");

        let allinput = getTag("input");

        window.oninput = ()=>{
            for (let i = 0; i < allinput.length; i++) {
                allinput[i].plok();
            }
        }

        addCustomer.onclick = ()=>{
        
            let Comtable = $("custable");
            cusName = $("CusName");
            cusNum = $("CusNum"); 
            cusAdd = $("Cusadd");
            cusLimit =$("Cuslimit"); 
            cusCredit = $("CusCredit");
            TCAcom = $("totalCreditCustomers");

            bool = true;
            
            if(cusLimit.value != 0){
                if(cusAdd.value.length == 0){
                    cusAdd.plerror("Shop address requried for allow credit");
                    bool = false;
                }
            }else if(cusCredit.value != 0){
                if(cusAdd.value.length == 0){
                    cusAdd.plerror("Shop address requried for allow credit");
                    bool = false;
                }
            }

            let dsp = Comtable.getElementsByClassName("dsp");
            samename = false;
            for (let i = 0; i < dsp.length; i++) {
                if(cusName.value.toLowerCase() == dsp[i].innerHTML.toLowerCase()){
                    samename = true;
                }
            }
            if(samename == true){
                cusName.plerror("Already add this name");
            }else if(cusName.value.length == 0){
                cusName.plerror("Please provide customer name");
            }else if(cusCredit.value <= 0){
                cusCredit.plerror("Please add credit amount");
            } else {
                if(cusLimit.value == ""){
                    cusLimit.value = 0;
                }
                n = "";
                if(cusNum.value.length = 0){
                    n= "None";
                }else{
                    n = cusNum.value;
                }
                if(bool == true){
                    if(confirm("are you sure to save") == true){
                        d = new Date();
                        date = d.getDate() +" "+months[d.getMonth()]+" "+d.getFullYear();
                        let i = Comtable.getElementsByTagName("tr").length;

                        if(TCAcom.value == ""){
                            TCAcom.value = 0;
                        }

                        TCAcom.value = parseFloat(TCAcom.value)+parseFloat(cusCredit.value);
                
                        Comtable.innerHTML += `<tr><th class="left">${i}</th><td>${date}</td>`+
                        `<td class="dsp">${cusName.value}</td><td>${n}</td><td>${cusCredit.value}</td><td>${cusLimit.value}</td></tr>`

                        RequestPhp("GET", `${stPhp}req=addCusintemp&total=${TCAcom.value}`+
                        `&name=${encodeString(cusName.value)}&number=${encodeString(cusNum.value)}&address=${encodeString(cusAdd.value)}&limit=${cusLimit.value}&CC=${cusCredit.value}`
                        ,(x)=>{notify(x.responseText)},true);
                        cusDetail.hide();
                    }
                }
            };
        }
        addCompany.onclick = ()=>{
            
            let Comtable = $("Comtable");
            cusName = $("ComName");
            cusNum = $("ComNum"); 
            cusAdd = $("Comadd"); 
            cusCredit = $("ComCredit");
            TCAcom = $("totalCreditCompanies");

            let dsp = Comtable.getElementsByClassName("dsp");

            samename = false;
            for (let i = 0; i < dsp.length; i++) {
                if(cusName.value.toLowerCase() == dsp[i].innerHTML.toLowerCase()){
                    samename = true;
                }
            }
            if(samename == true){
                cusName.plerror("Already add this name");
            }else if(cusName.value.length == 0){
                cusName.plerror("Please provide company name");
            }else if(cusCredit.value == 0){
                cusCredit.plerror("Please add credit amount");
            } else {
                n = "";
                if(cusNum.value.length = 0){
                    n= "None";
                }else{
                    n = cusNum.value;
                }
                if(confirm("are you sure to save") == true){
                    d = new Date();
                    date = d.getDate() +" "+months[d.getMonth()]+" "+d.getFullYear();
                    let i = Comtable.getElementsByTagName("tr").length;
                    Comtable.innerHTML += `<tr><th class="left">${i}</th><td>${date}</td>`+
                    `<td class="dsp">${cusName.value}</td><td>${n}</td><td>${cusCredit.value}</td></tr>`
                
                    TCAcom.value = parseFloat(TCAcom.value)+parseFloat(cusCredit.value);

                    RequestPhp("GET", `${stPhp}req=addComintemp&total=${TCAcom.value}`+
                    `&name=${encodeString(cusName.value)}&number=${encodeString(cusNum.value)}&address=${encodeString(cusAdd.value)}&CC=${cusCredit.value}`
                    ,(x)=>{notify(x.responseText)},true);
                    comDetail.hide();
                }
            }
        }
        let Custable = $("custable");
        RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
            doc = x.responseXML;
            
            let root = doc.getElementsByTagName("customer");
            if(root[0] != undefined){
                cwcm.checked = true;
                $("cwcm").show();
                $("totalCreditCustomers").value = doc.getElementsByTagName("TCAcus")[0].innerHTML;
            }
            for (let i = 0; i < root.length; i++) {
                Cusname = root[i].getAttributeNode("name").nodeValue;
                date = root[i].getAttributeNode("day").nodeValue +"/"+ months[parseFloat(root[i].getAttributeNode("mon").nodeValue)]+
                "/"+ root[i].getAttributeNode("year").nodeValue;

                number = "";
                if(root[i].getElementsByTagName("number")[0].childNodes[0] != undefined){
                    number = root[i].getElementsByTagName("number")[0].innerHTML;
                }else{
                    number = "None";
                }
                address = "";
                if(root[i].getElementsByTagName("address")[0].childNodes[0] != undefined){
                    address = root[i].getElementsByTagName("address")[0].innerHTML;
                }else{
                    address = "None";
                }
                TCA = root[i].getElementsByTagName("TCA")[0].innerHTML;
                climit = root[i].getElementsByTagName("climit")[0].innerHTML
                
                Custable.innerHTML += `<tr><th class="left">${i+1}</th><td>${date}</td>`+
                `<td class="dsp">${Cusname}</td><td>${number}</td><td>${TCA}</td><td>${climit}</td></tr>`
            }
        },true);

        let Comtable = $("Comtable");
        RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
            doc = x.responseXML;
            
            let root = doc.getElementsByTagName("company");
            if(root[0] != undefined){
                cwcs.checked = true;
                $("cwcs").show();
                $("totalCreditCompanies").value = doc.getElementsByTagName("TCAcom")[0].innerHTML;
            }
            for (let i = 0; i < root.length; i++) {
                comName = root[i].getAttributeNode("name").nodeValue;
                date = root[i].getAttributeNode("day").nodeValue +" "+ months[parseFloat(root[i].getAttributeNode("mon").nodeValue)]+
                " "+ root[i].getAttributeNode("year").nodeValue;

                number = "";
                if(root[i].getElementsByTagName("number")[0].childNodes[0] != undefined){
                    number = root[i].getElementsByTagName("number")[0].innerHTML;
                }else{
                    number = "None";
                }
                address = "";
                if(root[i].getElementsByTagName("address")[0].childNodes[0] != undefined){
                    address = root[i].getElementsByTagName("address")[0].innerHTML;
                }else{
                    address = "None";
                }
                TCA = root[i].getElementsByTagName("TCA")[0].innerHTML;
                
                Comtable.innerHTML += `<tr><th class="left">${i+1}</th><td>${date}</td>`+
                `<td class="dsp">${comName}</td><td>${number}</td><td>${TCA}</td></tr>`
            }
            
        },true);

        updCompany = $("updCompany");
        subAmount2 = 0; 

        contextstrip("Comtable",()=>{
            comtable = $("Comtable")
            cusName = $("ComName");
            cusNum = $("ComNum"); 
            cusAdd = $("Comadd");
            cusCredit = $("ComCredit");        

            if(contextvalue != ""){

                
                addCompany.hide();updCompany.show();comDetail.show();
                let delet = comtable.getElementsByTagName("tr")[contextvalue];
                subAmount2 = parseFloat(delet.getElementsByTagName("td")[3].innerHTML);

                RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
                    doc = x.responseXML;
                    let root = doc.getElementsByTagName("company");
                    for (let i = 0; i < root.length; i++) {
                        if(root[i].getAttributeNode("name").nodeValue == delet.getElementsByTagName("td")[1].innerHTML){
                            let add = root[i].getElementsByTagName("address")[0].innerHTML;

                            cusAdd.value = add;
                        }
                    }
                },true);

                cusName.value = delet.getElementsByTagName("td")[1].innerHTML;
                cusNum.value = delet.getElementsByTagName("td")[2].innerHTML;
                cusCredit.value = delet.getElementsByTagName("td")[3].innerHTML;
                let att = document.createAttribute("disabled");
                cusName.setAttributeNode(att);
            
            }
        },()=>{
            if(contextvalue != ""){
                comtable = $("Comtable");
                cusName = $("ComName");
                TCAcom = $("totalCreditCompanies");
                if (confirm("Are you sure to delete this company") == true){
                    let delet = comtable.getElementsByTagName("tr")[contextvalue];
                    let subAmount2 = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                    comtable.removeChild(delet);
                    let dsp = comtable.getElementsByClassName("left");
                    for (let j = 0; j < dsp.length; j++) {
                        dsp[j].innerHTML = j;
                    }
                    TCAcom.value = (parseFloat(TCAcom.value)-subAmount2);

                    RequestPhp("GET", `${stPhp}req=deleteComTemp`+
                    `&cusname=${encodeString(delet.getElementsByTagName("td")[1].innerHTML)}&total=${TCAcom.value}`
                    ,(x)=>{},true);
                    
                    dsp[0].innerHTML = "";
                    cusName.removeAttribute("disabled");
                    contextvalue = "";
                    subAmount2 = 0;
                    addCompany.show();updCompany.hide();
                }
            }
        });

        updCompany.onclick = ()=>{
            let Comtable = $("Comtable");
            cusName = $("ComName");
            cusNum = $("ComNum"); 
            cusAdd = $("Comadd"); 
            cusCredit = $("ComCredit");
            TCAcom = $("totalCreditCompanies");

            if(cusName.value.length == 0){
                cusName.plerror("Please provide company name");
            }else if(cusCredit.value == 0){
                cusCredit.plerror("Please add credit amount");
            } else {
                n = "";
                if(cusNum.value.length = 0){
                    n= "None";
                }else{
                    n = cusNum.value;
                }
                if(confirm("are you sure to save") == true){
                    let edit = Comtable.getElementsByTagName("tr")[contextvalue];

                    edit.getElementsByTagName("td")[1].innerHTML = cusName.value;
                    edit.getElementsByTagName("td")[2].innerHTML = n;
                    edit.getElementsByTagName("td")[3].innerHTML = cusCredit.value;


                    total = ((parseFloat(TCAcom.value)-subAmount2)+
                    parseFloat(cusCredit.value));
                    TCAcom.value = total;

                    RequestPhp("GET", `${stPhp}req=updatecom&cusname=${encodeString(cusName.value)}`+
                    `&CC=${cusCredit.value}&num=${encodeString(cusNum.value)}&add=${encodeString(cusAdd.value)}&total=${total}`,
                    (x)=>{},true)

                    cusName.removeAttribute("disabled");
                    
                    contextvalue = "";
                    subAmount2 = 0;
                    addCompany.show();updCompany.hide();comDetail.hide();
                    cusName.value = "";cusAdd.value = "";cusNum.value = ""; cusCredit.value = "";
                }
            }
        }

        updCustomer = $("updCustomer");
        subAmount3 = 0;

        contextstrip("custable",()=>{
            let Comtable = $("custable");
            cusName = $("CusName");
            cusNum = $("CusNum"); 
            cusAdd = $("Cusadd");
            cusLimit =$("Cuslimit"); 
            cusCredit = $("CusCredit");

            if(contextvalue != ""){

            
                addCustomer.hide();updCustomer.show();cusDetail.show();
                let delet = Comtable.getElementsByTagName("tr")[contextvalue];
                subAmount3 = parseFloat(delet.getElementsByTagName("td")[3].innerHTML);

                RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
                    doc = x.responseXML;
                    let root = doc.getElementsByTagName("customer");
                    for (let i = 0; i < root.length; i++) {
                        if(root[i].getAttributeNode("name").nodeValue == delet.getElementsByTagName("td")[1].innerHTML){
                            let add = root[i].getElementsByTagName("address")[0].innerHTML;

                            cusAdd.value = add;
                        }
                    }
                },true);

                cusName.value = delet.getElementsByTagName("td")[1].innerHTML;
                cusNum.value = delet.getElementsByTagName("td")[2].innerHTML;
                cusCredit.value = delet.getElementsByTagName("td")[3].innerHTML;
                cusLimit.value = delet.getElementsByTagName("td")[4].innerHTML;
                let att = document.createAttribute("disabled");
                cusName.setAttributeNode(att);
                
            }
        },()=>{
            if(contextvalue != ""){
                Comtable = $("custable");
                cusName = $("CusName");
                TCAcom = $("totalCreditCustomers");
                if (confirm("Are you sure to delete this company") == true){
                    let delet = Comtable.getElementsByTagName("tr")[contextvalue];
                    let subAmount3 = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                    Comtable.removeChild(delet);
                    let dsp = Comtable.getElementsByClassName("left");
                    for (let j = 0; j < dsp.length; j++) {
                        dsp[j].innerHTML = j;
                    }
                    TCAcom.value = (parseFloat(TCAcom.value)-subAmount3);

                    RequestPhp("GET", `${stPhp}req=deleteCusTemp`+
                    `&cusname=${encodeString(delet.getElementsByTagName("td")[1].innerHTML)}&total=${TCAcom.value}`
                    ,(x)=>{},true);
                    
                    dsp[0].innerHTML = "";
                    cusName.removeAttribute("disabled");
                    contextvalue = "";
                    subAmount3 = 0;
                    addCompany.show();updCompany.hide();
                }
            }
        });

        updCustomer.onclick = ()=>{
            let Comtable = $("custable");
            cusName = $("CusName");
            cusNum = $("CusNum"); 
            cusAdd = $("Cusadd");
            cusLimit =$("Cuslimit"); 
            cusCredit = $("CusCredit");
            let TCAcom = $("totalCreditCustomers");

            bool = true;
            
            if(cusLimit.value != 0){
                if(cusAdd.value.length == 0){
                    cusAdd.plerror("Shop address requried for allow credit");
                    bool = false;
                }
            }else if(cusCredit.value != 0){
                if(cusAdd.value.length == 0){
                    cusAdd.plerror("Shop address requried for allow credit");
                    bool = false;
                }
            }

            if(cusName.value.length == 0){
                cusName.plerror("Please provide customer name");
            }else if(cusCredit.value <= 0){
                cusName.plerror("Please add credit amount");
            } else {
                if(cusLimit.value == ""){
                    cusLimit.value = 0;
                }
                n = "";
                if(cusNum.value.length = 0){
                    n= "None";
                }else{
                    n = cusNum.value;
                }
                if(bool == true){
                    if(confirm("are you sure to save") == true){
                        let edit = Comtable.getElementsByTagName("tr")[contextvalue];

                        edit.getElementsByTagName("td")[1].innerHTML = cusName.value;
                        edit.getElementsByTagName("td")[2].innerHTML = n;
                        edit.getElementsByTagName("td")[3].innerHTML = cusCredit.value;
                        edit.getElementsByTagName("td")[4].innerHTML = cusLimit.value;

                        total = ((parseFloat(TCAcom.value)-subAmount3)+
                        parseFloat(cusCredit.value));
                        TCAcom.value = total;

                        RequestPhp("GET", `${stPhp}req=updatecus&cusname=${encodeString(cusName.value)}&climit=${cusLimit.value}`+
                        `&CC=${cusCredit.value}&num=${encodeString(cusNum.value)}&add=${encodeString(cusAdd.value)}&total=${total}`,
                        (x)=>{},true);

                        cusName.removeAttribute("disabled");
                        
                        contextvalue = "";
                        subAmount3 = 0;
                        addCustomer.show();updCustomer.hide();cusDetail.hide();
                        cusName.value = "";cusAdd.value = "";cusNum.value = ""; cusCredit.value = "";cusLimit.value = "";
                    }
                }
            }
        }

        let start = $("letstart");
        start.onclick = ()=>{
            let items = $("itemstable").getElementsByTagName("tr");
            totalnetcash = $("TNC");
            message = "Please make sure your all of data is fully currect that you entered";
            if(items.length < 2){
                notify("Please add at least 1 item before start");
            }else{
                if(totalnetcash.value <= 0){
                    message= "Do you wish to continue without any net cash detail & make sure your all of data is fully currect";
                    totalnetcash.value = 0;
                    totalnetcash.style.borderBottom = "1px solid red";
                }
                if(confirm(message) == true){
                    RequestPhp("GET", `${stPhp}req=letstart&TNC=${totalnetcash.value}`,
                        (x)=>{ if(x.responseText == ""){
                            relod();
                            }
                        },true);
                }
            }
        }
    },true);
}

//---------------------------------------------------------------
// Dashboard function
function openDashboard(){

}
//---------------------------------------------------------------
// invoice function
function openInvoice(){
    RequestPhp("GET", "invoice.html",(x)=>{
        user = new getdata();
        openWindow("Invoice No : "+(user.invoice()),x.responseText);
        printInvNum = 0;isNewInvoice = true;
        
        printsetup("Invoice",user.invoice(),"#middleinv",()=>{
            if(isNewInvoice == false){$("invoiceNum").innerHTML = printInvNum}
            let rightside = prtHandle.querySelector(".rightside");
            let leftside = prtHandle.querySelector(".leftside");
            if(leftside !== null){
                leftside.innerHTML = "Shop Information";
            }
            if(rightside !== null){
                rightside.innerHTML = "Customer Information";
            }
            $("tAmt").innerHTML = $("totalAmount").value;
            $("dAmt").innerHTML = $("discount").value;
            $("paidAmt").innerHTML = $("paidAmount").value;
            $("precreditAmt").innerHTML = $("precredit").value;
            $("creditAmt").innerHTML = $("creditAmount").value;
            $("nameOT").innerHTML = $("cusName").value;
            $("numOT").innerHTML = $("cusNum").value;
            $("addressOT").innerHTML = $("cusAddress").value;
            
            let logo = $("logo");
            if(user.logoStatus == 1){
                logo.className += " logo";
            }else{
                logo.className = logo.className.replace(" logo", "");
            }
            let d = new Date();
            hour = d.getHours();hourstatus = "AM";
            if(hour > 12){
                hour = hour - 12;
                hourstatus = "PM";
            }
            $("invoiceDate").innerHTML = d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
            $("invoiceTime").innerHTML = hour+":"+d.getMinutes() +" "+hourstatus;
            $("shopName").innerHTML = user.BusinessName;
            $("shopNum").innerHTML = "<strong>"+user.username+"</strong> Ph#No: "+user.userNumber;
            $("shopAddress").innerHTML = "<strong>Address</strong>: "+user.userAddress;
        });
        $("searchitems").addEventListener("input",()=>{
            filtersearch($("itemstable").getElementsByClassName("dsp"),$("searchitems"));
        });
        $("cusName").focus();
        {
            let tableRow = 1;
            window.addEventListener("keydown",(e)=>{
                let tr = $("itemstable").querySelectorAll('tr:not([style*="display: none"])');
                if(tableRow == tr.length){tableRow = 1}else if(tableRow == 0){tableRow = tr.length-1}
                function bgcolor(index){
                    for (let i = 0; i < tr.length; i++) {
                        let list = tr[i].getElementsByTagName("td");
                        tr[i].removeAttribute("active");
                        for (let j = 0; j < list.length; j++) {
                            list[j].style.background = "";
                        }
                    }
                    att = document.createAttribute("active");
                    tr[index].setAttributeNode(att);
                    let list = tr[index].getElementsByTagName("td");
                    for (let i = 0; i < list.length; i++) {
                        list[i].style.background = "lightgray";
                    }
                }
                function blurall(){
                    allinnput = q_("input:not(.search-input)");
                    for (let i = 0; i < allinnput.length; i++) {
                        allinnput[i].blur();
                    }
                }
                if(e.ctrlKey && e.code == "ArrowDown"){
                    bgcolor(tableRow);blurall();
                    tableRow++;
                }

                if(e.ctrlKey && e.code == "ArrowUp"){
                    bgcolor(tableRow);blurall();
                    tableRow--;
                }
                if(e.ctrlKey && e.code == "Delete"){
                    let index = $("itemstable").querySelector("tr[active]").childNodes[0].innerHTML;
                    deleteitem(index);
                    if(tableRow == tr.length){tableRow = 1}else if(tableRow == 0){tableRow = tr.length-1}
                    bgcolor(tableRow);
                }
                if(e.ctrlKey && e.code == "Enter"){
                    let index = $("itemstable").querySelector("tr[active]").childNodes[0].innerHTML;
                    edititem(index);
                }
                if(e.code == "Escape"){
                    exitedit();

                }
            });

            window.addEventListener("keyup",(e)=>{
                if(e.ctrlKey == false){
                    tableRow = 1;
                    let tr = $("itemstable").querySelectorAll("tr");
                    for (let i = 0; i < tr.length; i++) {
                        let list = tr[i].getElementsByTagName("td");
                        tr[i].removeAttribute("active");
                        for (let j = 0; j < list.length; j++) {
                            list[j].style.background = "";
                        }
                    }
                }
            })
        }
        let itemstable = $("itemstable");
        
        let actionupdate = $("actionupdate");
        let action = $("action");
        itemName = $("Item_name");
        itemNRate = $("Rate");
        itemQuantity = $("quantity");
        var creditAmount = $("creditAmount");
        var discount = $("discount");

        loadtempdata();
        RequestPhp("GET",user.dir+"/panding.xml",(y)=>{
            pandingdoc = y.responseXML;
            $("loadHoldedinv").show();
            let panding = pandingdoc.getElementsByTagName("panding");
            $("loadHoldedinv").innerHTML = `<option selected disabled>Load panding invoice..</option>`;
            for (let i = panding.length-1; i > -1; i--){
                $name = panding[i].getAttributeNode("customer").nodeValue;
                $file = panding[i].getAttributeNode("file").nodeValue;
                $("loadHoldedinv").innerHTML += `<option value="${$file}">${$name} &nbsp; ${xdate(panding[i])}</option>`;
            }
        },false);

        function loadtempdata(){
            RequestPhp("GET",user.dir+"/temp2.xml",(x)=>{
                doc = x.responseXML;
                $("loadHoldedinv").hide();
                $("holdinv").show();
                let root = doc.getElementsByTagName("item");
                for (let i = 0; i < root.length; i++) {
                    let nameitem = root[i].getAttributeNode("name").nodeValue; 
                    let Quntity = parseFloat(root[i].getElementsByTagName("quntity")[0].innerHTML);
                    let Rate = parseFloat(root[i].getElementsByTagName("rate")[0].innerHTML);
                    let unit = "";

                    RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                        doc2 = y.responseXML;
                        let item = doc2.querySelectorAll("item[name='"+nameitem+"']")[0];
                        unit = item.getElementsByTagName("unit")[0].innerHTML;
                    },false);

                    itemstable.innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                    nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                    Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";
                }
                $("totalAmount").value = doc.getElementsByTagName("total")[0].innerHTML;
                $("t").innerHTML = doc.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                $("creditAmount").value = parseFloat($("precredit").value)+parseFloat(doc.getElementsByTagName("total")[0].innerHTML);
            },true);
        }

        contextstrip("itemstable",()=>{
            if(contextvalue != ""){
                edititem(contextvalue);
            }
        },()=>{
            if(contextvalue != ""){
                deleteitem(contextvalue);
            }
        });

        function edititem(index){
            action.hide();actionupdate.show();
            let delet = itemstable.getElementsByTagName("tr")[index];
            subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
            
            itemName.value = decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML);
            itemQuantity.value = numOnly(delet.getElementsByTagName("td")[1].innerHTML);
            itemNRate.value = delet.getElementsByTagName("td")[2].innerHTML;

            att = document.createAttribute("disabled");
            itemName.setAttributeNode(att);
            $("quantity").focus();
            contextvalue = index;
        }

        function deleteitem(index){
            if (confirm("Are you sure to delete this item") == true){
                let delet = $("itemstable").getElementsByTagName("tr")[index];
                let subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                $("itemstable").removeChild(delet);
            
                let dsp = $("itemstable").getElementsByClassName("left");
                for (let j = 0; j < dsp.length; j++) {
                    dsp[j].innerHTML = j;
                }
                $("totalAmount").value = (parseFloat($("totalAmount").value)-subAmount);
                $("creditAmount").value = ((parseFloat($("totalAmount").value)-discount.value)+parseFloat($("precredit").value));
                $("t").innerHTML = $("totalAmount").value.toLocaleString();
                
                RequestPhp("GET", `${reqPhp}req=deleteitem2`+
                `&id=${delet.getElementsByTagName("td")[0].id}&total=${parseFloat($("totalAmount").value)}`
                ,(x)=>{notify(x.responseText)},false);
                
                dsp[0].innerHTML = "";
                contextvalue = "";
                subAmount = 0;
                exitedit();
            }
        }
        function exitedit(){
            itemName.removeAttribute("disabled");
            action.show();actionupdate.hide();
            itemName.value = "";itemName.focus();
        }

        if(user.customer() != 0){
            let sallerName = $("cusName");
            let sallerNum = $("cusNum");
            let sallerAddress = $("cusAddress");
            
            sallerAddress.value = "";sallerNum.value = "";
            $("paidAmount").value = 0;
            $("precredit").value=0;$("creditAmount").value = (parseFloat($("totalAmount").value)-parseFloat($("discount").value));
            RequestPhp("GET",user.dir+"/customers.xml",(x)=>{
                doc = x.responseXML;
                let root = doc.getElementsByTagName("customer");
                names = [];ids=[];
                for (let i = 0; i < root.length; i++) {
                    names[i] = root[i].getAttributeNode("name").nodeValue;
                    ids[i] = root[i].getAttributeNode("id").nodeValue;
                }
                suggest_text("cusName","suggestCus",names,"rgb(218, 218, 218)",()=>{
                },_,ids,90);
            },true);
            
            sallerName.addEventListener('blur', ()=>{
                if(isNewInvoice == true){
                    sallerAddress.value = "";sallerNum.value = "";
                    let sallerName = $("cusName");
                    if(sallerName.value.length == 0){
                        $("paidtab").hide();
                    }else{
                        $("paidtab").show();
                    }
                    RequestPhp("GET",user.dir+"/customers.xml",(x)=>{
                        doc = x.responseXML;
                        let root = doc.getElementsByTagName("customer");
                        for (let i = 0; i < root.length; i++) {
                            if(root[i].getAttributeNode("id").nodeValue == sallerName.myID()){ 
                                
                                pc = parseFloat(root[i].getElementsByTagName("TCA")[0].innerHTML);
                                $("precredit").value = pc;
                                $("creditAmount").value = (pc+parseFloat($("totalAmount").value))-parseFloat($("discount").value);
                                
                                if(root[i].getElementsByTagName("number")[0].childNodes[0] != undefined){
                                    sallerNum.value = root[i].getElementsByTagName("number")[0].innerHTML;
                                    sallerAddress.focus();
                                }
                                if(root[i].getElementsByTagName("address")[0].childNodes[0] != undefined){
                                    sallerAddress.value = root[i].getElementsByTagName("address")[0].innerHTML;
                                    itemName.focus();
                                }
                            }
                        }
                    },true);
                }else{
                    RequestPhp("GET",user.dir+"/customers.xml",(x)=>{
                        doc = x.responseXML;
                        let root = doc.querySelector("customer[name='"+sallerName.value+"']");
                        if(root !== null){
                            RequestPhp("GET",user.dir+"/invoice.xml",(y)=>{
                                doc = y.responseXML;
                                let cusinv = doc.querySelectorAll("invoice[issuedto='"+$("cusName").myID()+"']");
                                let from = 0;
                                if(cusinv.length >= 30){from = cusinv.length-30}
                                $("invoiceNO").innerHTML = `<option value="" disabled selected>You can select invoice</option>`;
                                for (let i = cusinv.length-1; i > from; i--) {
                                    id = cusinv[i].getAttributeNode("number").nodeValue;
                                    $("invoiceNO").innerHTML += `<option value="${id}">Invoice No : ${id}</option>`;
                                }
                                $("invoiceNO").innerHTML += `<option value="cst">Custom</option>`;
                            },true);

                            $("noTab").show();
                            if(root.getElementsByTagName("number")[0].childNodes[0] != undefined){
                                sallerNum.value = root.getElementsByTagName("number")[0].innerHTML;
                                sallerAddress.focus();
                            }
                            if(root.getElementsByTagName("address")[0].childNodes[0] != undefined){
                                sallerAddress.value = root.getElementsByTagName("address")[0].innerHTML;
                                $("invoiceNO").focus();
                            }
                        }else{
                            $("noTab").hide();
                            sallerAddress.value = "";sallerNum.value = "";
                        }
                    },true);
                    
                }
            });
        }else{
            let sallerName = $("cusName");
            sallerName.addEventListener('blur', ()=>{
                if(sallerName.value.length == 0){
                    paidtab.hide();
                }else{
                    paidtab.show();
                    $("creditAmount").value = (parseFloat($("totalAmount").value)-parseFloat($("discount").value));
                }
            });
        }
        function clearform(){
            cleartable("printtable");
            $("paidAmount").value = 0;$("discount").value=0;$("totalAmount").value=0;$("t2").value=0;
            $("precredit").value=0;$("creditAmount").value=0;
        }
        $("cosNum").onblur = ()=>{
            RequestPhp("GET",user.dir+"/invoice.xml",(y)=>{
                doc = y.responseXML;
                if($("cosNum").value.length == 0){clearform();}else
                if(doc.querySelector("invoice[issuedto='"+$("cusName").myID()+"'][number='"+$("cosNum").value+"']") == null){
                    if(doc.querySelector("invoice[number='"+$("cosNum").value+"']") == null){
                        massage = 'Sorry this invoice number not found in record';
                        notify(massage);
                        clearform();
                    }else{
                        invfound = doc.querySelector("invoice[number='"+$("cosNum").value+"']");
                        ns = invfound.getAttributeNode("issuedto").nodeValue;
                        massage = `Sorry This invoice customer is ${getname(user.dir+"/customers.xml","customer",ns)}`;
                        notify(massage);
                        clearform();
                    }
                }else{
                    let cusinv = doc.querySelector("invoice[number='"+$("cosNum").value+"']");
                    let items = cusinv.getElementsByTagName("item");
                    trs = $("printtable").getElementsByTagName("tr");
                    for (let i = trs.length-1; i > 0 ; i--) {
                        $("printtable").removeChild(trs[i]);
                    }
                    
                    for (let i = 0; i < items.length; i++) {
                        let itemid = items[i].getAttributeNode("id").nodeValue; 
                        let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                        let Rate = parseFloat(items[i].getElementsByTagName("rate")[0].innerHTML);
                        let unit = "";let nameitem = "";
                        
                        $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
                        $("t").innerHTML = 0;

                        RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                            doc2 = y.responseXML;
                            let item = doc2.querySelectorAll("item[id='"+itemid+"']")[0];
                            unit = item.getElementsByTagName("unit")[0].innerHTML;
                            nameitem = item.getAttributeNode("name").nodeValue;
                        },false);

                        $("printtable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options' id='"+itemid+"'>"+
                        nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                        Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";
                    }
                    reAmount = 0;
                    relist = cusinv.getElementsByTagName("pammount");
                    for (let j = 0; j < relist.length; j++) {
                        reAmount += parseFloat(relist[j].innerHTML); 
                    }
                    $("paidAmount").value = reAmount;
                    $("totalAmount").value = cusinv.getElementsByTagName("total")[0].innerHTML;
                    $("t").innerHTML = cusinv.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                    $("precredit").value = cusinv.getElementsByTagName("PCA")[0].innerHTML;
                    $("discount").value = cusinv.getElementsByTagName("discount")[0].innerHTML;
                    $("creditAmount").value = ((parseFloat($("totalAmount").value)+parseFloat($("precredit").value))-
                    ((parseFloat($("discount").value))+parseFloat($("paidAmount").value)));
                    printInvNum = $("cosNum").value;
                }
            },true);
        }

        $("invoiceNO").onchange = ()=>{
            RequestPhp("GET",user.dir+"/invoice.xml",(y)=>{
                doc = y.responseXML;
                if($("invoiceNO").value == "cst"){
                    $("cosNum").show();
                    clearform();
                }else{
                    $("cosNum").hide();
                    let cusinv = doc.querySelector("invoice[number='"+$("invoiceNO").value+"']");
                    let items = cusinv.getElementsByTagName("item");
                    trs = $("printtable").getElementsByTagName("tr");
                    for (let i = trs.length-1; i > 0 ; i--) {
                        $("printtable").removeChild(trs[i]);
                    }
                    
                    for (let i = 0; i < items.length; i++) {
                        let itemid = items[i].getAttributeNode("id").nodeValue; 
                        let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                        let Rate = parseFloat(items[i].getElementsByTagName("rate")[0].innerHTML);
                        let unit = "";
                        
                        $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
                        $("t").innerHTML = 0;

                        RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                            doc2 = y.responseXML;
                            let item = doc2.querySelectorAll("item[id='"+itemid+"']")[0];
                            nameitem = item.getAttributeNode("name").nodeValue;
                            unit = item.getElementsByTagName("unit")[0].innerHTML;
                        },false);

                        $("printtable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options' id='"+itemid+"'>"+
                        nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                        Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";
                    }
                    reAmount = 0;
                    relist = cusinv.getElementsByTagName("pammount");
                    for (let j = 0; j < relist.length; j++) {
                        reAmount += parseFloat(relist[j].innerHTML); 
                    }
                    $("paidAmount").value = reAmount;
                    $("totalAmount").value = cusinv.getElementsByTagName("total")[0].innerHTML;
                    $("t").innerHTML = cusinv.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                    $("precredit").value = cusinv.getElementsByTagName("PCA")[0].innerHTML;
                    $("discount").value = cusinv.getElementsByTagName("discount")[0].innerHTML;
                    $("creditAmount").value = ((parseFloat($("totalAmount").value)+parseFloat($("precredit").value))-
                    ((parseFloat($("discount").value))+parseFloat($("paidAmount").value)));
                    printInvNum = $("invoiceNO").value;
                }
            });
        }

        $("paidAmount").oninput = ()=>{
            let t = parseFloat(noNuN($("totalAmount").value));
            let pc = parseFloat(noNuN($("precredit").value));
            $("paidAmount").value = $("paidAmount").value.replace(/[^0-9|\.|\+|\-]/g,"");
            function commenfunc(x){
                $("paidAmount").value = $("culsum").innerHTML+x;
                $("creditAmount").value = ((t+pc)-((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value.replace("+","")))));
            }
            if($("paidAmount").value.indexOf("+") !== -1){
                firstIndex = $("paidAmount").value.indexOf("+");
                if($("paidAmount").value.indexOf("+",firstIndex+1) !== -1){
                    commenfunc("+");
                }else if($("paidAmount").value.indexOf("-",firstIndex+1) !== -1){
                    commenfunc("-");
                }
                $("culsum").show();
                str1 =  parseFloat($("paidAmount").value.substring(0,firstIndex));
                str2 =  parseFloat(noNuN($("paidAmount").value.substring(firstIndex)));
                $("culsum").innerHTML = noNuN(str1+str2);
            }else if($("paidAmount").value.indexOf("-") !== -1){
                firstIndex = $("paidAmount").value.indexOf("-");
                if($("paidAmount").value.indexOf("+",firstIndex+1) !== -1){
                    commenfunc("+");
                }else if($("paidAmount").value.indexOf("-",firstIndex+1) !== -1){
                    commenfunc("-");
                }
                $("culsum").show();
                str1 =  parseFloat($("paidAmount").value.substring(0,firstIndex));
                str2 =  parseFloat(noNuN($("paidAmount").value.substring(firstIndex)));
                $("culsum").innerHTML = noNuN(str1+str2);
            }else{
                $("culsum").hide();
                $("creditAmount").value = ((t+pc)-((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value))));
            }
        }
        $("paidAmount").addEventListener("keydown",(e)=>{
            let t = parseFloat(noNuN($("totalAmount").value));
            let pc = parseFloat(noNuN($("precredit").value));
            if(e.code == "Enter" || e.code == "NumpadEnter"){
                if($("paidAmount").value.indexOf("+") !== -1 || $("paidAmount").value.indexOf("-") !== -1){
                    $("paidAmount").value = $("culsum").innerHTML;
                    $("culsum").hide();
                    $("creditAmount").value = ((t+pc)-((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value))));
                }
            }
        })
        $("discount").oninput = ()=>{
            let t = parseFloat(noNuN($("totalAmount").value));
            let pc = parseFloat(noNuN($("precredit").value));
            
            $("creditAmount").value = ((t+pc)-((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value))));
        }

        // Suggest text block
        let itemsArray = [];
        let quantityArray = [];
        let ids = [];

        RequestPhp("GET",user.dir+"/items.xml",(x)=>{
            doc = x.responseXML;
            let root = doc.getElementsByTagName("item");
            for (let i = 0; i < root.length; i++) {
                itemsArray[i] = root[i].getAttributeNode("name").nodeValue;
                ids[i] = root[i].getAttributeNode("id").nodeValue;
                quantityArray[i] = root[i].getElementsByTagName("quntityleft")[0].innerHTML;
            }
        },false);
        suggest_text("Item_name","autosuggest_list",itemsArray,"rgb(218, 218, 218)",()=>{
        },quantityArray,ids,140);
        itemName.onblur = ()=>{
            lasttime = false;
            RequestPhp("GET",user.dir+"/invoice.xml",(x)=>{
                doc = x.responseXML;
                let cusinv = doc.querySelectorAll("invoice[issuedto='"+$("cusName").myID()+"']");
                for (let i = 0; i < cusinv.length; i++){
                    let itemmatch = cusinv[i].querySelectorAll("item[id='"+itemName.myID()+"']");
                    if(itemmatch[itemmatch.length-1] !== undefined){
                        let rate = itemmatch[itemmatch.length-1].getElementsByTagName("rate")[0].innerHTML;
                        itemNRate.value = parseFloat(rate);
                        lasttime = true;
                    }
                }
            },false);

            if(lasttime === false){
                RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                    check1 = 0;
                    doc = x.responseXML;
                    let root = doc.getElementsByTagName("item");
                    for (let i = 0; i < root.length; i++) {
                        if(root[i].getAttributeNode("name").nodeValue == itemName.value){
                            billrate = $("billctg").value;
                            if(billrate == "1"){
                                itemNRate.value = root[i].getElementsByTagName("prate")[0].innerHTML;
                            }else{
                                itemNRate.value = root[i].getElementsByTagName("hsrate")[0].innerHTML;
                            }
                        }
                    }
                },true);
            }
            let rate = $("Rate");
            RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                doc = x.responseXML;
                let root = doc.querySelector("item[name='"+itemName.value+"']");
                if(root !== null){
                    grate = parseFloat(root.getElementsByTagName("grate")[0].innerHTML);
                }

                let pp = (rate.value/grate*100)-100;
                
                if(rate.value == grate){
                    rate.style.color = "orange";
                }else if(rate.value < grate){
                    rate.style.color = "red";
                }else if(pp >= 10){
                    rate.style.color = "green";
                }else {
                    rate.style.color = "";
                }
            },true);
        }
        itemQuantity.addEventListener("keydown",(e)=>{
            
            if(e.code == "KeyG"){
                RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                    check1 = 0;
                    doc = x.responseXML;
                    let root = doc.querySelector("item[name='"+itemName.value+"']");                
                    unit = root.querySelector("unit").innerHTML.toLowerCase();
                    value = noNuN(itemQuantity.value)
                    if(unit == "kg" || unit == "liter"){
                        itemQuantity.value = value/1000;
                    }else if(unit == "pack" || unit == "bundle"){
                        
                    }else if(unit == "dozen"){
                        itemQuantity.value = value/12*1;
                    }
                },true);
            }
        });

        $("Rate").oninput = ()=>{
            let rate = $("Rate");
            RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                doc = x.responseXML;
                let root = doc.querySelector("item[name='"+itemName.value+"']");
                if(root !== null){
                    grate = parseFloat(root.getElementsByTagName("grate")[0].innerHTML);
                }

                let pp = (rate.value/grate*100)-100;
                
                if(rate.value == grate){
                    rate.style.color = "orange";
                }else if(rate.value < grate){
                    rate.style.color = "red";
                }else if(pp >= 90){
                    rate.style.color = "red";
                    notify("You are taking to much profit. This is not good habit");
                }else if(pp >= 10){
                    rate.style.color = "green";
                }else {
                    rate.style.color = "";
                }
            },true);
        }
        actionupdate.onclick = ()=>{

            quantitycheck = true;

            RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                doc = x.responseXML;
                let items = doc.getElementsByTagName("item");
                for (let i = 0; i < items.length; i++) {
                    if(items[i].getAttributeNode("name").nodeValue == $("Item_name").value){ 
                        left = items[i].getElementsByTagName("quntityleft")[0].innerHTML;
                        if(parseFloat(left) < itemQuantity.value){
                            quantitycheck = false;
                        }
                    }
                }
            },false);
            if($("Item_name").value.length == 0){
                notify("item name required");
                $("Item_name").style.border = "1px solid red";
            }else if(quantitycheck == false){
                notify("Sorry you have not ago quantity for sale");
                itemQuantity.style.border = "1px solid red"
            }else if(itemQuantity.value <= 0){
                notify("Quantity required");
                itemQuantity.style.border = "1px solid red"
            }else if(itemNRate.value <= 0){
                itemNRate.value = 0;
            }else{
                let edit = itemstable.getElementsByTagName("tr")[contextvalue];

                test = $("Item_name").value;
                qun = $("quantity").value;
                RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                    doc = x.responseXML;
                    let items = doc.getElementsByTagName("item");
                    for (let i = 0; i < items.length; i++) {
                        if(items[i].getAttributeNode("name").nodeValue == test){
                            unit = items[i].getElementsByTagName("unit")[0].innerHTML;
                            edit.getElementsByTagName("td")[1].innerHTML = qun+unit;
                        }
                    }
                },true);

                edit.getElementsByTagName("td")[0].innerHTML = itemName.value;
                edit.getElementsByTagName("td")[2].innerHTML = itemNRate.value;
                edit.getElementsByTagName("td")[3].innerHTML = (itemQuantity.value*itemNRate.value).toLocaleString();
                
                $("paidAmount").value = 0;
                total = (parseFloat($("totalAmount").value-subAmount)+
                parseFloat(itemQuantity.value*itemNRate.value));
                $("totalAmount").value = total;
                $("t").innerHTML = total.toLocaleString();
                $("creditAmount").value = (total-noNuN($("discount").value))+parseFloat($("precredit").value);
                
                RequestPhp("GET", `${reqPhp}req=updateitem2&Iname=${edit.getElementsByTagName("td")[0].id}`+
                `&Iqun=${itemQuantity.value}&rate=${itemNRate.value}&invoice=${user.invoice()}&total=${total}`,
                (x)=>{notify(x.responseText)},true);
                itemName.removeAttribute("disabled");
                itemName.focus();
                contextvalue = "";
                subAmount = 0;
                action.show();actionupdate.hide();
                itemName.value = "";itemNRate.value = "";itemQuantity.value = "";
                clearfilter(itemstable.getElementsByTagName("tr"));
            }
        }
        action.onclick = ()=>{
            let nameitem = $("Item_name").value;
            samename = 2;
            for (let i = 0; i < itemsArray.length; i++) {
                if(itemsArray[i] == nameitem){ 
                    samename =  1;
                }
            }

            let dsp = getClass("dsp");

            quantitycheck = true;

            RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                doc = x.responseXML;
                let items = doc.getElementsByTagName("item");
                for (let i = 0; i < items.length; i++) {
                    if(items[i].getAttributeNode("name").nodeValue == nameitem){ 
                        left = items[i].getElementsByTagName("quntityleft")[0].innerHTML;
                        if(parseFloat(left) < itemQuantity.value){
                            quantitycheck = false;
                        }
                    }
                }
            },false);

            for (let i = 0; i < dsp.length; i++) {
                if(itemName.value.toLowerCase() == dsp[i].innerHTML.toLowerCase()){
                    samename = 0;
                }
            }
            if(quantitycheck == false){
                notify("Sorry you have not ago quantity for sale");
                itemQuantity.style.border = "1px solid red"
            }else if(samename == 0){
                notify("You already add this item");
                itemName.style.border = "1px solid red";
            }else if(itemName.value.length == 0){
                notify("Item name required");
                itemName.style.border = "1px solid red";
            }else if(samename == 2){
                notify("Please first add this item by purchase invoice");
                itemName.style.border = "1px solid red";
            }else if(itemQuantity.value <= 0){
                notify("Quantity required");
                itemQuantity.style.border = "1px solid red"
            }else if(itemNRate.value <= 0){
                itemNRate.value = 0;
        }else{

                let Rate = $("Rate").value;
                let Quantity = $("quantity").value;
                $("holdinv").show();
                $("loadHoldedinv").hide();

                RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                    doc = x.responseXML;
                    let items = doc.getElementsByTagName("item");
                    for (let i = 0; i < items.length; i++) {
                        if(items[i].getAttributeNode("name").nodeValue == nameitem){ 
                            unit = items[i].getElementsByTagName("unit")[0].innerHTML;

                            itemstable.innerHTML += "<tr><th class='left'>"+(itemstable.getElementsByTagName("tr").length)+"</th><td class='dsp'>"+
                            nameitem+"</td><td>"+Quantity+unit+"</td><td>"+
                            Rate+"</td><td>"+(Quantity*Rate).toLocaleString()+"</td></tr>";
                        }
                    }
                    
                },true);

                let total = 0;
            
                total = (parseFloat($("totalAmount").value)+
                parseFloat(itemQuantity.value*itemNRate.value));
                $("creditAmount").value = (total-noNuN($("discount").value))+parseFloat($("precredit").value);

                $("paidAmount").value = 0;
                $("totalAmount").value = total;

                $("t").innerHTML = total.toLocaleString();
                
                RequestPhp("GET", `${reqPhp}req=purchaseitem2&Iname=${encodeString(itemName.value)}`+
                `&Iqun=${itemQuantity.value}&rate=${itemNRate.value}&invoice=${user.invoice()}&total=${total}`,
                (x)=>{},true);

                itemName.value = ""; itemNRate.value = "";itemQuantity.value = "";
                clearfilter(itemstable.getElementsByTagName("tr"));
                itemName.focus();
            }
        }

        invcowindow = q(".invoice").querySelector("#creditlimitDetail");
        q(".invoice").querySelector(".close").onclick = ()=>{
            invcowindow.hide();
            invcowindow.querySelector(".alert").show();
            invcowindow.querySelector(".cowincontent").style.width = "400px";
            let DCus = invcowindow.querySelector(".Detailcus");
            DCus.hide();
            $("paidAmount").focus();
        }
        $("cancelIncrease").onclick = ()=>{
            invcowindow.hide();
            $("paidAmount").focus();
        }
        $("cancelIncreaseAgain").onclick = ()=>{
            invcowindow.hide();
            invcowindow.querySelector(".alert").show();
            invcowindow.querySelector(".cowincontent").style.width = "400px";
            let DCus = invcowindow.querySelector(".Detailcus");
            DCus.hide();
            $("paidAmount").focus();
        }
        
        let genratePurchaseBill = $("genratePurchaseBill");
        genratePurchaseBill.onclick = ()=>{

            allowcredit = true;
            let sallerName = $("cusName");
            let sallerNum = $("cusNum");
            let sallerAddress = $("cusAddress");
            let checkname = sallerName.value;
            thisCredit = parseFloat(creditAmount.value);
            limit = 0;

            RequestPhp("GET",user.dir+"/customers.xml",(x)=>{
                doc = x.responseXML;
                let root = doc.getElementsByTagName("customer");
                for (let i = 0; i < root.length; i++) {
                    if(root[i].getAttributeNode("name").nodeValue == checkname){
                        limit = parseFloat(root[i].getElementsByTagName("climit")[0].innerHTML);

                        if(thisCredit > (limit+1)){
                            allowcredit = false;
                        }
                    } 
                }
            },false);
            if(itemstable.getElementsByTagName("tr").length <= 1){
                itemName.focus();
                notify("Please add at least one item")
            }else if(sallerName.value.length == 0){
                notify("Customer name required");
                sallerName.style.border = "1px solid red";
            }else if(allowcredit == false){
                invcowindow.querySelector(".massage").innerHTML = `This customer <strong>${$("cusName").value}</strong> credit limit has been reached <br>
                Do you wish to increase limit<br>Total credit limit is <strong>${limit}</strong>`
                invcowindow.show();
            }else{
                var sellerId = getid(user.dir+"customers.xml","customer",sallerName.value);
                if(confirm(`Are you received ${noNuN($("paidAmount").value)} from ${$("cusName").value}`) ==true){
                    RequestPhp("GET", `${reqPhp}req=GBill&discount=${noNuN(discount.value)}`
                    +`&invoice=${user.invoice()}&cus=${sellerId}&cusname=${encodeString(sellerName.value)}&cusnum=${encodeString(sallerNum.value)}&cusadd=${encodeString(sallerAddress.value)}`+
                    `&pammount=${noNuN($("paidAmount").value)}&discount=${noNuN($("discount").value)}`,
                    (x)=>{
                        if(parseInt(x.responseText) == 1){
                            notify("Created Successfully","ok");
                            let att = document.createAttribute("disabled");
                            genratePurchaseBill.setAttributeNode(att);
                            $("holdinv").hide();
                            $("loadHoldedinv").show();
                        }else{
                            notify("Temporary file has been lost please press clear button"+x.responseText);
                        }
                    },true);
                }
            }

            $("increaseLimit").onclick = ()=>{
                invcowindow.querySelector(".alert").hide();
                invcowindow.querySelector(".cowincontent").style.width = "800px";
                let DCus = invcowindow.querySelector(".Detailcus");
                let DCusInput = DCus.querySelectorAll("input");
                DCus.show();
                DCusInput[0].value = $("cusName").value;
                DCusInput[1].value = $("cusNum").value;
                DCusInput[2].value = $("cusAddress").value;
                DCusInput[3].value = limit;
                DCusInput[4].value = $("precredit").value;
                holdertodiv();
                $("increaseLimitok").onclick = ()=>{
                    var sellerId = getid(user.dir+"customers.xml","customer",$("cusName").value);
                    RequestPhp("GET", `${reqPhp}req=updatecus&id=${sellerId}&cusname=${encodeString($("cusName").value)}&climit=${DCusInput[3].value}`+
                    `&CC=${$("precredit").value}&num=${encodeString(DCusInput[1].value)}&add=${DCusInput[2].value}`,
                    (x)=>{
                        notify("updated"+x.responseText,"ok");
                        $("cusNum").value = DCusInput[1].value;
                        $("cusAddress").value = DCusInput[2].value;
                    },true);
                }
            }
        }
        $("loadHoldedinv").onchange = ()=>{
            RequestPhp("GET", `${reqPhp}req=loadholdedinv&file=${$("loadHoldedinv").value}`,(x)=>{
                notify("loaded","ok");
                loadtempdata();
            });
            $("loadHoldedinv").remov(()=>{
                $("holdinv").show();
            });
            targetoption = $("loadHoldedinv").getElementsByTagName("option");
            for (let i = 0; i < targetoption.length; i++) {
                if(targetoption[i].value == $("loadHoldedinv").value){
                    $("loadHoldedinv").removeChild(targetoption[i]);
                }
            }
        }

        $("holdinv").onclick =()=>{
            trs = $("itemstable").getElementsByTagName("tr");
            if($("cusName").value.length == ""){
                notify("Customer name required");
                $("cusName").style.border = "1px solid red";
            }else
            {   clearinv();
                RequestPhp("GET", `${reqPhp}req=holdinv&cusname=${encodeString($("cusName").value)}&file=temp2.xml`,(x)=>{
                    notify("holded","ok");
                $("loadHoldedinv").innerHTML += `<option value="${x.responseText.trim()}">${$("cusName").value} &nbsp; Right now</option>`;
                });
                $("holdinv").remov(()=>{
                    $("loadHoldedinv").show();
                });
            }
        }
        window.onfocus = ()=>{
            if(isNewInvoice == true){
                $("loadHoldedinv").show();
                $("holdinv").hide();
                clearinv();
                loadtempdata();
            }
        }
        
        function clearinv(){
            cleartable("itemstable");
            $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
            $("t").innerHTML = 0;
        }
        
        $("ClearPage").onclick = ()=>{
            if(isNewInvoice == true){
                clearinv();
                RequestPhp("GET", `${reqPhp}req=clear&file=temp2.xml`,()=>{
                    notify("Cleared","ok");
                });
                $("holdinv").hide();
                $("loadHoldedinv").show();
            }
        }

        $("newInvBtn").onclick = ()=>{
            isNewInvoice = true;
            removeclass(document,"button","b-active");
            $("newInvBtn").className = "b-active";
            clearinv();$("paidtab").hide();$("paidAmount").enable();$("discount").enable();
            loadtempdata();thisnoprint(1);showtable(0);clearcus();$("noTab").hide();
        }

        $("printInvBtn").onclick = ()=>{
            isNewInvoice = false;
            removeclass(document,"button","b-active");
            $("printInvBtn").className = "b-active";
            clearinv();thisnoprint(0);showtable(1);$("paidtab").show();clearcus();
            $("paidAmount").disable();$("discount").disable();
        }
        function clearcus(){
            let sallerName = $("cusName");
            let sallerNum = $("cusNum");
            let sallerAddress = $("cusAddress");
            sallerAddress.value = "";sallerNum.value = "";sallerName.value = "";
            $("paidAmount").value = 0;
            $("precredit").value=0;$("creditAmount").value = (parseFloat($("totalAmount").value)-parseFloat($("discount").value));
        }
        function thisnoprint(hideUnHide){
            list = q(".invoice").querySelectorAll(".noprint");
            for (let i = 0; i < list.length; i++) {
                if(hideUnHide == 0){
                    list[i].hide();
                }else{
                    list[i].show();
                }
            }
        }function showtable(hideUnHide){
            table = q(".invoice").querySelectorAll(".table-class");
            if(hideUnHide == 0){
                table[1].hide();
                table[0].show();
            }else{
                table[1].show();
                table[0].hide();
            }
        }
        
        window.oninput = ()=>{
            let inpt = getTag("input");
            for (let i = 0; i < inpt.length; i++) {
                inpt[i].style.border = "";
            }
        }
    },true);
}

//---------------------------------------------------------------
// p-invoice function
function openPinvoice(){
    RequestPhp("GET", "purchase.html",(x)=>{
        user = new getdata();
        openWindow("Perchase Invoice No : "+(user.pInvoice()),x.responseText);
        printInvNum = 0;isNewInvoice = true;

        $("searchitems").addEventListener("input",()=>{
            filtersearch($("itemstable").getElementsByClassName("dsp"),$("searchitems"));
        });
        $("sallerName").focus();
        printsetup("Purcahase Invoice",user.pInvoice(),"#middleinv",()=>{
            if(isNewInvoice == false){$("invoiceNum").innerHTML = printInvNum}
            let rightside = prtHandle.querySelector(".rightside");
            let leftside = prtHandle.querySelector(".leftside");
            if(leftside !== null){
                leftside.innerHTML = "Shop Information";
            }
            if(rightside !== null){
                rightside.innerHTML = "Company Information";
            }
            $("tAmt").innerHTML = $("totalAmount").value;
            $("dAmt").innerHTML = $("discount").value;
            $("paidAmt").innerHTML = $("paidAmount").value;
            $("precreditAmt").innerHTML = $("precredit").value;
            $("creditAmt").innerHTML = $("creditAmount").value;
            $("nameOT").innerHTML = $("sallerName").value;
            $("numOT").innerHTML = $("sallerNum").value;
            $("addressOT").innerHTML = $("sallerAddress").value;
            
            let logo = $("logo");
            if(user.logoStatus == 1){
                logo.className += " logo";
            }else{
                logo.className = logo.className.replace(" logo", "");
            }
            let d = new Date();
            hour = d.getHours();hourstatus = "AM";
            if(hour > 12){
                hour = hour - 12;
                hourstatus = "PM";
            }
            $("invoiceDate").innerHTML = d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
            $("invoiceTime").innerHTML = hour+":"+d.getMinutes() +" "+hourstatus;
            $("shopName").innerHTML = user.BusinessName;
            $("shopNum").innerHTML = "<strong>"+user.username+"</strong> Ph#No: "+user.userNumber;
            $("shopAddress").innerHTML = "<strong>Address</strong>: "+user.userAddress;
        });;

        {
            let tableRow = 1;
            window.addEventListener("keydown",(e)=>{
                let tr = $("itemstable").querySelectorAll('tr:not([style*="display: none"])');
                if(tableRow == tr.length){tableRow = 1}else if(tableRow == 0){tableRow = tr.length-1}
                function bgcolor(index){
                    for (let i = 0; i < tr.length; i++) {
                        let list = tr[i].getElementsByTagName("td");
                        tr[i].removeAttribute("active");
                        for (let j = 0; j < list.length; j++) {
                            list[j].style.background = "";
                        }
                    }
                    att = document.createAttribute("active");
                    tr[index].setAttributeNode(att);
                    let list = tr[index].getElementsByTagName("td");
                    for (let i = 0; i < list.length; i++) {
                        list[i].style.background = "lightgray";
                    }
                }
                function blurall(){
                    allinnput = q_("input:not(.search-input)");
                    for (let i = 0; i < allinnput.length; i++) {
                        allinnput[i].blur();
                    }
                }
                if(e.ctrlKey && e.code == "ArrowDown"){
                    bgcolor(tableRow);blurall();
                    tableRow++;
                }

                if(e.ctrlKey && e.code == "ArrowUp"){
                    bgcolor(tableRow);blurall();
                    tableRow--;
                }
                if(e.ctrlKey && e.code == "Delete"){
                    let index = $("itemstable").querySelector("tr[active]").childNodes[0].innerHTML;
                    deleteitem(index);
                    if(tableRow == tr.length){tableRow = 1}else if(tableRow == 0){tableRow = tr.length-1}
                    bgcolor(tableRow);
                }
                if(e.ctrlKey && e.code == "Enter"){
                    let index = $("itemstable").querySelector("tr[active]").childNodes[0].innerHTML;
                    
                    edititem(index);
                }
                if(e.code == "Escape"){
                    exitedit();

                }
            });

            window.addEventListener("keyup",(e)=>{
                if(e.ctrlKey == false){
                    tableRow = 1;
                    let tr = $("itemstable").querySelectorAll("tr");
                    for (let i = 0; i < tr.length; i++) {
                        let list = tr[i].getElementsByTagName("td");
                        tr[i].removeAttribute("active");
                        for (let j = 0; j < list.length; j++) {
                            list[j].style.background = "";
                        }
                    }
                }
            });
        }
        
        let itemstable = $("itemstable");
        let actionupdate = $("actionupdate");
        let action = $("action");
        itemName = $("Item_name");
        itemQuantity = $("quantity");
        QuantityUnit = $("quantityunit");
        itemGrate = $("PurchaseRate");
        itemHSrate = $("HoleSaleRate");
        itemNRate = $("NormalRate");
        let creditAmount = $("creditAmount");

        loadtempdata();
        RequestPhp("GET",user.dir+"/panding2.xml",(y)=>{
            pandingdoc = y.responseXML;
            $("loadHoldedinv").show();
            let panding = pandingdoc.getElementsByTagName("panding");
            $("loadHoldedinv").innerHTML = `<option selected disabled>Load panding invoice..</option>`;
            for (let i = panding.length-1; i > -1; i--){
                $name = panding[i].getAttributeNode("company").nodeValue;
                $file = panding[i].getAttributeNode("file").nodeValue;
                $("loadHoldedinv").innerHTML += `<option value="${$file}">${$name} &nbsp; ${xdate(panding[i])}</option>`;
            }
        },false);
        function loadtempdata(){
            RequestPhp("GET",user.dir+"/temp.xml",(y)=>{
                $("holdinv").show();
                $("loadHoldedinv").hide();
                doc = y.responseXML;
                let root = doc.getElementsByTagName("item");
                for (let i = 0; i < root.length; i++) {
                    let nameitem = root[i].getAttributeNode("name").nodeValue; 
                    let Quntity = parseFloat(root[i].getElementsByTagName("quntity")[0].innerHTML);
                    let Unit = root[i].getElementsByTagName("unit")[0].innerHTML;
                    let GRate = parseFloat(root[i].getElementsByTagName("grate")[0].innerHTML);

                    itemstable.innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                    nameitem+"</td><td>"+Quntity+Unit+"</td><td>"+
                    GRate+"</td><td>"+(Quntity*GRate).toLocaleString()+"</td>";
                }
                $("totalAmount").value = parseFloat(doc.getElementsByTagName("total")[0].innerHTML);
                $("t").innerHTML = parseFloat(doc.getElementsByTagName("total")[0].innerHTML).toLocaleString();
                $("creditAmount").value = parseFloat(doc.getElementsByTagName("total")[0].innerHTML);

            },true);
        }

        contextstrip("itemstable",()=>{
            if(contextvalue != ""){
                edititem(contextvalue);
            }
        },()=>{

            if(contextvalue != ""){
                deleteitem(contextvalue);
            }
        });
        function edititem(index){
            action.hide();actionupdate.show();
                let delet = $("itemstable").getElementsByTagName("tr")[index];
                subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                if(user.invoice() != 1){
                    RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                        check1 = 0;
                        doc = x.responseXML;
                        let root = doc.getElementsByTagName("item");
                        for (let i = 0; i < root.length; i++) {
                            if(root[i].getAttributeNode("name").nodeValue == decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML)){
                                check1 = 1;
                            }
                        }
                        if(check1 == 1){
                            let att = document.createAttribute("disabled");
                            QuantityUnit.setAttributeNode(att);
                        }
                    },true);
                }

                RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
                    doc = x.responseXML;
                    let root = doc.getElementsByTagName("item");
                    for (let i = 0; i < root.length; i++) {
                        if(root[i].getAttributeNode("name").nodeValue == decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML)){
                            let Nrate = parseFloat(root[i].getElementsByTagName("prate")[0].innerHTML);
                            let Unit = root[i].getElementsByTagName("unit")[0].innerHTML;
                            let HsRate = parseFloat(root[i].getElementsByTagName("hsrate")[0].innerHTML);

                            QuantityUnit.value = Unit;
                            itemHSrate.value = HsRate;
                            itemNRate.value = Nrate;
                        }
                    }
                },true);

                itemName.value = decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML);
                itemQuantity.value = delet.getElementsByTagName("td")[1].innerHTML;
                itemGrate.value = delet.getElementsByTagName("td")[2].innerHTML;
                let att = document.createAttribute("disabled");
                itemName.setAttributeNode(att);
                itemQuantity.focus();contextvalue = index;
        }
        function deleteitem(index){
            if (confirm("Are you sure to delete this item") == true){
                let delet = $("itemstable").getElementsByTagName("tr")[index];
                let subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                itemstable.removeChild(delet);
               
                let dsp = itemstable.getElementsByClassName("left");
                for (let j = 0; j < dsp.length; j++) {
                    dsp[j].innerHTML = j;
                }
                $("totalAmount").value = (parseFloat($("totalAmount").value)-subAmount);
                $("creditAmount").value = ((parseFloat($("totalAmount").value)-discount.value)+parseFloat($("precredit").value));
                $("t").innerHTML = $("totalAmount").value.toLocaleString();
                
                RequestPhp("GET", `${reqPhp}req=deleteitem`+
                `&Iname=${encodeString(decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML))}&total=${parseFloat($("totalAmount").value)}`
                ,()=>{},true);
                
                dsp[0].innerHTML = "";
                itemName.removeAttribute("disabled");
                contextvalue = "";
                subAmount = 0;
                action.show();actionupdate.hide();
                itemName.focus();
            }
        }
        function exitedit(){
            itemName.removeAttribute("disabled");
            action.show();actionupdate.hide();
            itemName.value = "";itemName.focus();
        }

        if(user.companies() !== 0){
            let sallerName = $("sallerName");  
            let sallerNum = $("sallerNum");
            let sallerAddress = $("sallerAddress");
            let datalist = $("Companies");

            sallerAddress.value = "";sallerNum.value = "";
            $("paidAmount").value = 0;
            $("precredit").value=0;$("creditAmount").value = (parseFloat($("totalAmount").value)-parseFloat($("discount").value));

            RequestPhp("GET",user.dir+"/companies.xml",(z)=>{
                doc = z.responseXML;
                let root = doc.getElementsByTagName("company");
                for (let i = 0; i < root.length; i++) {
                    datalist.innerHTML += "<option>"+ root[i].getAttributeNode("name").nodeValue+"</option>" ;
                }
            },true);

            sallerName.addEventListener('blur', ()=>{
                if(isNewInvoice == true){
                    sallerAddress.value = "";sallerNum.value = "";
                    let sallerName = $("sallerName");
                    if(sallerName.value.length == 0){
                        $("paidtab2").hide();
                    }else{
                        $("paidtab2").show();
                    }

                    RequestPhp("GET",user.dir+"/companies.xml",(y)=>{
                        doc = y.responseXML;
                        let root = doc.getElementsByTagName("company");
                        for (let i = 0; i < root.length; i++) {
                            if(root[i].getAttributeNode("name").nodeValue == sallerName.value){

                                pc = parseFloat(root[i].getElementsByTagName("TCA")[0].innerHTML);
                                $("precredit").value = pc;
                                $("creditAmount").value = pc+($("totalAmount").value-noNuN($("discount").value));
                                

                                if(root[i].getElementsByTagName("number")[0].childNodes[0] != undefined){
                                    sallerNum.value = root[i].getElementsByTagName("number")[0].innerHTML;
                                    sallerAddress.focus();
                                }
                                if(root[i].getElementsByTagName("address")[0].childNodes[0] != undefined){
                                    sallerAddress.value = root[i].getElementsByTagName("address")[0].innerHTML;
                                    itemName.focus();
                                }
                            }
                        }
                    },true);
                }else{
                    RequestPhp("GET",user.dir+"/companies.xml",(x)=>{
                        doc = x.responseXML;
                        let root = doc.querySelector("company[name='"+sallerName.value+"']");
                        if(root !== null){
                            RequestPhp("GET",user.dir+"/pinvoice.xml",(y)=>{
                                doc = y.responseXML;
                                let cusinv = doc.querySelectorAll("pinvoice[issuedto='"+$("sallerName").value+"']");
                                let from = 0;
                                if(cusinv.length >= 30){from = cusinv.length-30}
                                $("invoiceNO").innerHTML = `<option value="" disabled selected>You can select invoice</option>`;
                                for (let i = cusinv.length-1; i > from; i--) {
                                    id = cusinv[i].getAttributeNode("number").nodeValue;
                                    $("invoiceNO").innerHTML += `<option value="${id}">Invoice No : ${id}</option>`;
                                }
                                $("invoiceNO").innerHTML += `<option value="cst">Custom</option>`;
                            },true);

                            $("noTab").show();
                            if(root.getElementsByTagName("number")[0].childNodes[0] != undefined){
                                sallerNum.value = root.getElementsByTagName("number")[0].innerHTML;
                                sallerAddress.focus();
                            }
                            if(root.getElementsByTagName("address")[0].childNodes[0] != undefined){
                                sallerAddress.value = root.getElementsByTagName("address")[0].innerHTML;
                                $("invoiceNO").focus();
                            }
                        }else{
                            $("noTab").hide();
                            sallerAddress.value = "";sallerNum.value = "";
                        }
                    },true);
                    
                }
                
            });
        }else{
            let sallerName = $("sallerName"); 
            sallerName.addEventListener('blur', ()=>{
                if(sallerName.value.length == 0){
                    $("paidtab2").hide();
                }else{
                    $("paidtab2").show();
                    $("creditAmount").value = (parseFloat($("totalAmount").value)-parseFloat($("discount").value));
                }
            });
        }
        function clearform(){
            cleartable("printtable");
            $("paidAmount").value = 0;$("discount").value=0;$("totalAmount").value=0;$("t2").value=0;
            $("precredit").value=0;$("creditAmount").value=0;
        }
        $("cosNum").onblur = ()=>{
            RequestPhp("GET",user.dir+"/pinvoice.xml",(y)=>{
                doc = y.responseXML;
                if($("cosNum").value.length == 0){clearform();}else
                if(doc.querySelector("pinvoice[issuedto='"+$("cusName").value+"'][number='"+$("cosNum").value+"']") == null){
                    if(doc.querySelector("pinvoice[number='"+$("cosNum").value+"']") == null){
                        massage = 'Sorry this purchase invoice number not found in record';
                        notify(massage);
                        clearform();
                    }else{
                        invfound = doc.querySelector("pinvoice[number='"+$("cosNum").value+"']");
                        ns = invfound.getAttributeNode("issuedto").nodeValue;
                        massage = `Sorry this purchase invoice company is ${ns}`;
                        notify(massage);
                        clearform();
                    }
                }else{
                    let cusinv = doc.querySelector("pinvoice[number='"+$("cosNum").value+"']");
                    let items = cusinv.getElementsByTagName("item");
                    trs = $("printtable").getElementsByTagName("tr");
                    for (let i = trs.length-1; i > 0 ; i--) {
                        $("printtable").removeChild(trs[i]);
                    }
                    
                    for (let i = 0; i < items.length; i++) {
                        let nameitem = items[i].getAttributeNode("name").nodeValue; 
                        let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                        let Rate = parseFloat(items[i].getElementsByTagName("prate")[0].innerHTML);
                        unit = items[i].getElementsByTagName("unit")[0].innerHTML;
                        
                        $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
                        $("t").innerHTML = 0;

                        $("printtable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                        nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                        Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";
                    }
                    reAmount = 0;
                    relist = cusinv.getElementsByTagName("pammount");
                    for (let j = 0; j < relist.length; j++) {
                        reAmount += parseFloat(relist[j].innerHTML); 
                    }
                    $("paidAmount").value = reAmount;
                    $("totalAmount").value = cusinv.getElementsByTagName("total")[0].innerHTML;
                    $("t").innerHTML = cusinv.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                    $("precredit").value = cusinv.getElementsByTagName("PCA")[0].innerHTML;
                    $("discount").value = cusinv.getElementsByTagName("discount")[0].innerHTML;
                    $("creditAmount").value = ((parseFloat($("totalAmount").value)+parseFloat($("precredit").value))-
                    ((parseFloat($("discount").value))+parseFloat($("paidAmount").value)));
                    printInvNum = $("cosNum").value;
                }
            },true);
        }
        $("invoiceNO").onchange = ()=>{
            RequestPhp("GET",user.dir+"/pinvoice.xml",(y)=>{
                doc = y.responseXML;
                if($("invoiceNO").value == "cst"){
                    $("cosNum").show();
                    clearform();
                }else{
                    $("cosNum").hide();
                    let cusinv = doc.querySelector("pinvoice[number='"+$("invoiceNO").value+"']");
                    let items = cusinv.getElementsByTagName("item");
                    trs = $("printtable").getElementsByTagName("tr");
                    for (let i = trs.length-1; i > 0 ; i--) {
                        $("printtable").removeChild(trs[i]);
                    }
                    
                    for (let i = 0; i < items.length; i++) {
                        let nameitem = items[i].getAttributeNode("name").nodeValue; 
                        let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                        let Rate = parseFloat(items[i].getElementsByTagName("prate")[0].innerHTML);
                        unit = items[i].getElementsByTagName("unit")[0].innerHTML;
                        
                        $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
                        $("t").innerHTML = 0;

                        $("printtable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                        nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                        Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";
                    }
                    reAmount = 0;
                    relist = cusinv.getElementsByTagName("pammount");
                    for (let j = 0; j < relist.length; j++) {
                        reAmount += parseFloat(relist[j].innerHTML); 
                    }
                    $("paidAmount").value = reAmount;
                    $("totalAmount").value = cusinv.getElementsByTagName("total")[0].innerHTML;
                    $("t").innerHTML = cusinv.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                    $("precredit").value = cusinv.getElementsByTagName("PCA")[0].innerHTML;
                    $("discount").value = cusinv.getElementsByTagName("discount")[0].innerHTML;
                    $("creditAmount").value = ((parseFloat($("totalAmount").value)+parseFloat($("precredit").value))-
                    ((parseFloat($("discount").value))+parseFloat($("paidAmount").value)));
                    printInvNum = $("invoiceNO").value;
                }
            });
        }

        $("paidAmount").oninput = ()=>{
            let t = parseFloat(noNuN($("totalAmount").value));
            let pc = parseFloat(noNuN($("precredit").value));
            $("paidAmount").value = $("paidAmount").value.replace(/[^0-9|\.|\+|\-]/g,"");
            function commenfunc(x){
                $("paidAmount").value = $("culsum").innerHTML+x;
                $("creditAmount").value = ((t+pc)-((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value.replace("+","")))));
            }
            if($("paidAmount").value.indexOf("+") !== -1){
                firstIndex = $("paidAmount").value.indexOf("+");
                if($("paidAmount").value.indexOf("+",firstIndex+1) !== -1){
                    commenfunc("+");
                }else if($("paidAmount").value.indexOf("-",firstIndex+1) !== -1){
                    commenfunc("-");
                }
                $("culsum").show();
                str1 =  parseFloat($("paidAmount").value.substring(0,firstIndex));
                str2 =  parseFloat(noNuN($("paidAmount").value.substring(firstIndex)));
                $("culsum").innerHTML = noNuN(str1+str2);
            }else if($("paidAmount").value.indexOf("-") !== -1){
                firstIndex = $("paidAmount").value.indexOf("-");
                if($("paidAmount").value.indexOf("+",firstIndex+1) !== -1){
                    commenfunc("+");
                }else if($("paidAmount").value.indexOf("-",firstIndex+1) !== -1){
                    commenfunc("-");
                }
                $("culsum").show();
                str1 =  parseFloat($("paidAmount").value.substring(0,firstIndex));
                str2 =  parseFloat(noNuN($("paidAmount").value.substring(firstIndex)));
                $("culsum").innerHTML = noNuN(str1+str2);
            }else{
                $("culsum").hide();
                $("creditAmount").value = ((t+pc)-((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value))));
            }
        }

        $("paidAmount").addEventListener("keydown",(e)=>{
            let t = parseFloat(noNuN($("totalAmount").value));
            let pc = parseFloat(noNuN($("precredit").value));
            if(e.code == "Enter" || e.code == "NumpadEnter"){
                if($("paidAmount").value.indexOf("+") !== -1 || $("paidAmount").value.indexOf("-") !== -1){
                    $("paidAmount").value = $("culsum").innerHTML;
                    $("culsum").hide();
                    $("creditAmount").value = ((t+pc)-((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value))));
                }
            }
        });

        $("discount").oninput = ()=>{
            let t = parseFloat(noNuN($("totalAmount").value));
            let pc = parseFloat(noNuN($("precredit").value));
            
            $("creditAmount").value = ((t+pc)-((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value))));
            
        }

        let itemnames = [];
        let quantityArray = [];
        let ids = [];
        RequestPhp("GET",user.dir+"/items.xml",(y)=>{
            doc = y.responseXML;
            let root = doc.getElementsByTagName("item");
            for (let i = 0; i < root.length; i++) {
                itemnames[i] =  root[i].getAttributeNode("name").nodeValue
                quantityArray[i] = root[i].getElementsByTagName("quntityleft")[0].innerHTML;
                ids[i] = root[i].getAttributeNode("id").nodeValue;
            }
            suggest_text("Item_name","autosuggest_list",itemnames,"rgb(218, 218, 218)",()=>{
                if(QuantityUnit.getAttributeNode("disabled") != undefined){
                    QuantityUnit.removeAttribute("disabled");
                }
            },quantityArray,ids,140);
        },false);

        itemName.onblur = ()=>{
            RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                check1 = 0;
                doc = y.responseXML;
                let root = doc.getElementsByTagName("item");
                for (let i = 0; i < root.length; i++) {
                    if(root[i].getAttributeNode("name").nodeValue == itemName.value){
                        QuantityUnit.value = root[i].getElementsByTagName("unit")[0].innerHTML;
                        itemGrate.value = root[i].getElementsByTagName("grate")[0].innerHTML;
                        itemHSrate.value = root[i].getElementsByTagName("hsrate")[0].innerHTML;
                        itemNRate.value = root[i].getElementsByTagName("prate")[0].innerHTML;
                        check1 = 1;
                    }
                }
                
                if(check1 == 1){
                    let att = document.createAttribute("disabled");
                    QuantityUnit.setAttributeNode(att);
                }
            },true);
        }

        actionupdate.onclick = ()=>{

            if(itemName.value.length == 0){
                notify("Item name required");
                itemName.focus();
                itemName.style.border = "1px solid red";
            }else if(itemQuantity.value <= 0){
                notify("Quantity required");
                itemQuantity.focus();
                itemQuantity.style.border = "1px solid red"
            }else if(QuantityUnit.value.length == 0){
                QuantityUnit.focus();
                notify("Quantity type required");
                QuantityUnit.style.border = "1px solid red"
            }else if(itemGrate.value <= 0){
                itemGrate.focus();
                notify("Gross rate required");
                itemGrate.style.border = "1px solid red"
            }else if(itemHSrate.value <= 0){
                itemHSrate.focus();
                notify("Hole sale rate required");
                itemHSrate.style.border = "1px solid red"
            }else if(itemNRate.value <= 0){
                itemNRate.focus();
                notify("Normal rate required");
                itemNRate.style.border = "1px solid red"
            }else{
                let edit = itemstable.getElementsByTagName("tr")[contextvalue];

                edit.getElementsByTagName("td")[0].innerHTML = itemName.value;
                edit.getElementsByTagName("td")[1].innerHTML = itemQuantity.value+QuantityUnit.value;
                edit.getElementsByTagName("td")[2].innerHTML = itemGrate.value;
                edit.getElementsByTagName("td")[3].innerHTML = (itemQuantity.value*itemGrate.value).toLocaleString();

                $("paidAmount").value = 0;
                total = (parseFloat($("totalAmount").value-subAmount)+
                parseFloat(itemQuantity.value*itemGrate.value));
                $("totalAmount").value = total;
                $("t").innerHTML = total.toLocaleString();
                $("creditAmount").value = (total-noNuN($("discount").value))+parseFloat($("precredit").value);

                RequestPhp("GET", `${reqPhp}req=updateitem&Iname=${encodeString(itemName.value)}`+
                `&Iqun=${itemQuantity.value}&Qunit=${QuantityUnit.value}&Grate=${itemGrate.value}`+
                `&Hsrate=${itemHSrate.value}&Prate=${itemNRate.value}&invoice=${user.pInvoice()}&total=${total}`,
                (x)=>{
                    notify("updated successfully","ok");
                },true)
                itemName.removeAttribute("disabled");
                itemName.focus();
                contextvalue = "";
                subAmount = 0;
                action.show();actionupdate.hide();
                itemHSrate.value = "";itemName.value = "";itemGrate.value = ""; itemNRate.value = "";itemQuantity.value = "";
                clearfilter(itemstable.getElementsByTagName("tr"));
            }
        }

        action.onclick = ()=>{
            let dsp = getClass("dsp");
            samename = false;
            for (let i = 0; i < dsp.length; i++) {
                if(itemName.value.toLowerCase() == dsp[i].innerHTML.toLowerCase()){
                    samename = true;
                }
            }
            if(samename == true){
                notify("You already add this item");
                itemName.style.border = "1px solid red";
            }else if(itemName.value.length == 0){
                notify("Item name required");
                itemName.focus();
                itemName.style.border = "1px solid red";
            }else if(itemQuantity.value <= 0){
                notify("Quantity required");
                itemQuantity.focus();
                itemQuantity.style.border = "1px solid red"
            }else if(QuantityUnit.value.length == 0){
                QuantityUnit.focus();
                notify("Quantity type required");
                QuantityUnit.style.border = "1px solid red"
            }else if(itemGrate.value <= 0){
                itemGrate.focus();
                notify("Gross rate required");
                itemGrate.style.border = "1px solid red"
            }else if(itemHSrate.value <= 0){
                itemHSrate.focus();
                notify("Hole sale rate required");
                itemHSrate.style.border = "1px solid red"
            }else if(itemNRate.value <= 0){
                itemNRate.focus();
                notify("Normal rate required");
                itemNRate.style.border = "1px solid red"
            }else{
                itemstable.innerHTML += "<tr><th class='left'>"+(itemstable.getElementsByTagName("tr").length)+"</th><td class='dsp'>"+
                itemName.value+"</td><td>"+itemQuantity.value+QuantityUnit.value+"</td><td>"+
                itemGrate.value+"</td><td>"+(itemQuantity.value*itemGrate.value).toLocaleString()+"</td></tr>";

                let total = 0;
            
                total = (parseFloat($("totalAmount").value)+
                parseFloat(itemQuantity.value*itemGrate.value));
                $("creditAmount").value = (total-noNuN($("discount").value))+parseFloat($("precredit").value);

                $("paidAmount").value = 0;
                $("totalAmount").value = total;

                $("t").innerHTML = total.toLocaleString();

                RequestPhp("GET", `${reqPhp}req=purchaseitem&Iname=${encodeString(itemName.value)}`+
                `&Iqun=${itemQuantity.value}&Qunit=${QuantityUnit.value}&Grate=${itemGrate.value}`+
                `&Hsrate=${itemHSrate.value}&Prate=${itemNRate.value}&invoice=${user.pInvoice()}&total=${total}`,
                (x)=>{
                    if(parseInt(x.responseText) != 1){
                        notify("Temporary file has been lost please press clear button");
                    }
                },true);

                itemQuantity.value = "";
                clearfilter(itemstable.getElementsByTagName("tr"));
                itemName.focus();
            }
        }

        let genratePurchaseBill = $("genratePurchaseBill");
        genratePurchaseBill.onclick = ()=>{

            let checkpayment = false;
            RequestPhp("GET",user.dir+"/payments.xml",(x)=>{
                doc = x.responseXML;
                let root = doc.querySelectorAll("payment");
                vale = root[root.length-1].getElementsByTagName("TNC")[0].innerHTML;
                if(parseFloat(vale) >= $("paidAmount").value){
                    checkpayment = true;
                }
            },false);

            let sallerName = $("sallerName");
            let sallerNum = $("sallerNum");
            let sallerAddress = $("sallerAddress");
            if(itemstable.getElementsByTagName("tr").length <= 1){
                itemName.focus();
                notify("Please add at least one item")
            }else if(checkpayment == false){
                notify("Sorry you not ago payments to genrate this invoice \n please update payments section");
                $("paidAmount").style.border = "1px solid red";
            }else if(sallerName.value.length == 0){
                sallerName.focus();
                notify("Company name required");
                sallerName.style.border = "1px solid red";
            }else {
                if(confirm(`Are you received ${noNuN($("paidAmount").value)} from ${$("sallerName").value}`) ==true){
                        
                    RequestPhp("GET", `${reqPhp}req=GPBill&Cname=${encodeString(itemName.value)}`
                    +`&invoice=${user.pInvoice()}&seller=${encodeString(sallerName.value)}&sellernum=${encodeString(sallerNum.value)}&selleradd=${encodeString(sallerAddress.value)}`+
                    `&pammount=${$("paidAmount").value}&cammount=${creditAmount.value}&discount=${$("discount").value}`,
                    (x)=>{
                        if(parseInt(x.responseText) == 1){
                            notify("Created Successfully","ok");
                            let att = document.createAttribute("disabled");
                            genratePurchaseBill.setAttributeNode(att);
                        }else{
                            notify("Temporary file has been lost please press clear button"+x.responseText);
                        }
                    },true);
                }
            }
        }

        $("loadHoldedinv").onchange = ()=>{
            RequestPhp("GET", `${reqPhp}req=loadholdedinv2&file=${$("loadHoldedinv").value}`,(x)=>{
                notify("loaded","ok");
                loadtempdata();
            });
            $("loadHoldedinv").remov(()=>{
                $("holdinv").show();
            });
            targetoption = $("loadHoldedinv").getElementsByTagName("option");
            for (let i = 0; i < targetoption.length; i++) {
                if(targetoption[i].value == $("loadHoldedinv").value){
                    $("loadHoldedinv").removeChild(targetoption[i]);
                }
            }
        }

        $("holdinv").onclick =()=>{
            trs = $("itemstable").getElementsByTagName("tr");
            if($("sallerName").value.length == ""){
                notify("Company name required");
                $("sallerName").style.border = "1px solid red";
            }else
            {   clearinv();
                RequestPhp("GET", `${reqPhp}req=holdinv2&cusname=${encodeString($("sallerName").value)}&file=temp.xml`,(x)=>{
                    notify("holded","ok");
                $("loadHoldedinv").innerHTML += `<option value="${x.responseText.trim()}">${$("sallerName").value} &nbsp; Right now</option>`;
                });
                $("holdinv").remov(()=>{
                    $("loadHoldedinv").show();
                });
            }
        }

        window.onfocus = ()=>{
            if(isNewInvoice == true){
                $("loadHoldedinv").show();
                $("holdinv").hide();
                clearinv();
                loadtempdata();
            }
        }

        function clearinv(){
            cleartable("itemstable");
            $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
            $("t").innerHTML = 0;
        }

        $("ClearPage").onclick = ()=>{
            clearinv();
            RequestPhp("GET", `${reqPhp}req=clear&file=temp.xml`,()=>{
                notify("Cleared","ok");
            });
            $("holdinv").hide();
            $("loadHoldedinv").show();
        }

        $("newInvBtn").onclick = ()=>{
            isNewInvoice = true;
            removeclass(document,"button","b-active");
            $("newInvBtn").className = "b-active";
            clearinv();$("paidtab2").hide();$("paidAmount").enable();$("discount").enable();
            loadtempdata();thisnoprint(1);showtable(0);clearcus();$("noTab").hide();
        }

        $("printInvBtn").onclick = ()=>{
            isNewInvoice = false;
            removeclass(document,"button","b-active");
            $("printInvBtn").className = "b-active";
            clearinv();thisnoprint(0);showtable(1);$("paidtab2").show();clearcus();
            $("paidAmount").disable();$("discount").disable();
        }
        
        function clearcus(){
            let sallerName = $("sallerName");
            let sallerNum = $("sallerNum");
            let sallerAddress = $("sallerAddress");
            sallerAddress.value = "";sallerNum.value = "";sallerName.value = "";
            $("paidAmount").value = 0;
            $("precredit").value=0;$("creditAmount").value = (parseFloat($("totalAmount").value)-parseFloat($("discount").value));
        }
        function thisnoprint(hideUnHide){
            list = q(".purchase").querySelectorAll(".noprint");
            for (let i = 0; i < list.length; i++) {
                if(hideUnHide == 0){
                    list[i].hide();
                }else{
                    list[i].show();
                }
            }
        }function showtable(hideUnHide){
            table = q(".purchase").querySelectorAll(".table-class");
            if(hideUnHide == 0){
                table[1].hide();
                table[0].show();
            }else{
                table[1].show();
                table[0].hide();
            }
        }

        window.oninput = ()=>{
            let inpt = getTag("input");
            for (let i = 0; i < inpt.length; i++) {
                inpt[i].style.border = "";
            }
    }
    },true);
}

//---------------------------------------------------------------
// returns function
function openReturn(){
    RequestPhp("GET", "return.html",(x)=>{
        openWindow("returns",x.responseText);
        tabcontrol(["customerBtn","companiesBtn"],["customerTab","companiesTab"]," CCactive");
        printsetup("Return");

        let itemName = $("Item_name");
        let itemQuantity = $("quantity");
        let itemNRate = $("Rate");
        subAmount = 0;

        contextstrip("itemstable",()=>{
            if(contextvalue != ""){
                action.hide();actionupdate.show();
                let delet = $("itemstable").getElementsByTagName("tr")[contextvalue];
                subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                
                itemName.value = decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML);
                itemQuantity.value = delet.getElementsByTagName("td")[1].innerHTML;
                itemNRate.value = delet.getElementsByTagName("td")[2].innerHTML;

                att = document.createAttribute("disabled");
                itemName.setAttributeNode(att);
            }
        },()=>{
            if(contextvalue != ""){
                if (confirm("Are you sure to delete this item") == true){
                    let delet = itemstable.getElementsByTagName("tr")[contextvalue];
                    let subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                    itemstable.removeChild(delet);
                  
                    let dsp = itemstable.getElementsByClassName("left");
                    for (let j = 0; j < dsp.length; j++) {
                        dsp[j].innerHTML = j;
                    }
                    $("totalAmount").value = (parseFloat($("totalAmount").value)-subAmount);
                    $("creditAmount").value = (parseFloat($("precredit").value)-(parseFloat($("totalAmount").value)-discount.value));
                    $("t").innerHTML = $("totalAmount").value.toLocaleString();
                    

                    RequestPhp("GET", `${rtPhp}req=deleteitem`+
                    `&Iname=${encodeString(decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML))}&total=${parseFloat($("totalAmount").value)}`
                    ,(x)=>{
                        notify(x.responseText);
                    },true);
                    
                    dsp[0].innerHTML = "";
                    itemName.removeAttribute("disabled");
                    contextvalue = "";
                    subAmount = 0;
                    action.show();actionupdate.hide();
                }
            }
        });

        if(user.customer() != 0){

            let sallerNum = $("cusNum");
            let sallerAddress = $("cusAddress");
            let datalist = $("Customers");
            cuscheck = false;

            RequestPhp("GET",user.dir+"/customers.xml",(x)=>{
                doc = x.responseXML;
                let root = doc.getElementsByTagName("customer");
                for (let i = 0; i < root.length; i++) {
                    datalist.innerHTML += "<option>"+ root[i].getAttributeNode("name").nodeValue+"</option>" ;
                }
            },true);

            RequestPhp("GET",user.dir+"/rttemp2.xml",(y)=>{
                tempdoc = y.responseXML;
                headtag = tempdoc.getElementsByTagName("return")[0];
                custag = tempdoc.getElementsByTagName("customer")[0];
                if(custag !== undefined){
                    $("cusName").value = custag.getAttributeNode("name").nodeValue;
                    if(custag.getElementsByTagName("number")[0].childNodes[0] != undefined){
                        sallerNum.value = custag.getElementsByTagName("number")[0].innerHTML;
                    }
                    if(custag.getElementsByTagName("address")[0].childNodes[0] != undefined){
                        sallerAddress.value = custag.getElementsByTagName("address")[0].innerHTML;
                    }
                    $("noTab").show();$("paidtab").show();cuscheck = true;
                    RequestPhp("GET",user.dir+"/invoice.xml",(y)=>{
                        doc = y.responseXML;
                        let cusinv = doc.querySelectorAll("invoice[issuedto='"+$("cusName").value+"']");
                        let from = 0;
                        if(cusinv.length >= 10){from = cusinv.length-10}
                        $("invoiceNO").innerHTML = `<option value="" disabled>You can select invoice</option>`;
                        for (let i = from; i < cusinv.length; i++) {
                            id = cusinv[i].getAttributeNode("number").nodeValue;
                            $("invoiceNO").innerHTML += `<option value="${id}">Invoice No : ${id}</option>`;
                        }
                    });
                    $("invoiceNO").innerHTML += `<option value="cst">Custom</option>`;
                    att = document.createAttribute("selected");
                    optiontag = $("invoiceNO").querySelector("option[value='"+headtag.getAttributeNode("number").nodeValue+"']");
                    optiontag.setAttributeNode(att);

                    RequestPhp("GET",user.dir+"/customers.xml",(x)=>{
                        crdoc = x.responseXML;
                        let root = crdoc.querySelector("customer[name='"+$("cusName").value+"']");
                        pc = parseFloat(root.getElementsByTagName("TCA")[0].innerHTML);
                        precredit.value = pc;
                    },false);
                }

                let items = headtag.getElementsByTagName("item");
                    
                    for (let i = 0; i < items.length; i++) {
                        let nameitem = items[i].getAttributeNode("name").nodeValue; 
                        let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                        let Rate = parseFloat(items[i].getElementsByTagName("rate")[0].innerHTML);
                        let unit = "";
                        
                        $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
                        $("t").innerHTML = 0;

                        RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                            doc2 = y.responseXML;
                            let item = doc2.querySelectorAll("item[name='"+nameitem+"']")[0];
                            unit = item.getElementsByTagName("unit")[0].innerHTML;
                        },false);

                        $("itemstable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                        nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                        Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";

                    }
                $("totalAmount").value = headtag.getElementsByTagName("total")[0].innerHTML;
                $("t").innerHTML = headtag.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                $("creditAmount").value = $("precredit").value - $("totalAmount").value;

            });

            $("invoiceNO").onchange = ()=>{
                RequestPhp("GET",user.dir+"/invoice.xml",(y)=>{
                    doc = y.responseXML;
                    if($("invoiceNO").value == "cst"){
                        $("cosNum").show();
                        clearform();
                    }else{
                        $("cosNum").hide();
                        let cusinv = doc.querySelector("invoice[number='"+$("invoiceNO").value+"']");
                        let items = cusinv.getElementsByTagName("item");
                        trs = $("itemstable").getElementsByTagName("tr");
                        for (let i = trs.length-1; i > 0 ; i--) {
                            $("itemstable").removeChild(trs[i]);
                        }
                        
                        for (let i = 0; i < items.length; i++) {
                            let nameitem = items[i].getAttributeNode("name").nodeValue; 
                            let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                            let Rate = parseFloat(items[i].getElementsByTagName("rate")[0].innerHTML);
                            let unit = "";
                            
                            $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
                            $("t").innerHTML = 0;

                            RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                                doc2 = y.responseXML;
                                let item = doc2.querySelectorAll("item[name='"+nameitem+"']")[0];
                                unit = item.getElementsByTagName("unit")[0].innerHTML;
                            },false);

                            $("itemstable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                            nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                            Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";
                        }
                        $("totalAmount").value = cusinv.getElementsByTagName("total")[0].innerHTML;
                        $("t").innerHTML = cusinv.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                        $("creditAmount").value = $("precredit").value - $("totalAmount").value;
                        RequestPhp("GET", `${rtPhp}req=copytag&inv=${$("invoiceNO").value}`
                        ,(x)=>{notify(x.responseText);
                        },true);
                    }
                });
            }

            $("cosNum").onblur = ()=>{
                RequestPhp("GET",user.dir+"/invoice.xml",(y)=>{
                    doc = y.responseXML;
                    if($("cosNum").value.length == 0){clearform();}else
                    if(doc.querySelector("invoice[issuedto='"+$("cusName").value+"'][number='"+$("cosNum").value+"']") == null){
                        if(doc.querySelector("invoice[number='"+$("cosNum").value+"']") == null){
                            massage = 'Sorry this invoice number not found in record';
                            notify(massage);
                            clearform();
                        }else{
                            invfound = doc.querySelector("invoice[number='"+$("cosNum").value+"']");
                            ns = invfound.getAttributeNode("issuedto").nodeValue;
                            massage = `Sorry This invoice customer is ${ns}`;
                            notify(massage);
                            clearform();
                        }
                    }else{
                        let cusinv = doc.querySelector("invoice[number='"+$("cosNum").value+"']");
                        let items = cusinv.getElementsByTagName("item");
                        trs = $("itemstable").getElementsByTagName("tr");
                        for (let i = trs.length-1; i > 0 ; i--) {
                            $("itemstable").removeChild(trs[i]);
                        }
                        
                        for (let i = 0; i < items.length; i++) {
                            let nameitem = items[i].getAttributeNode("name").nodeValue; 
                            let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                            let Rate = parseFloat(items[i].getElementsByTagName("rate")[0].innerHTML);
                            let unit = "";
                            
                            $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
                            $("t").innerHTML = 0;

                            RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                                doc2 = y.responseXML;
                                let item = doc2.querySelectorAll("item[name='"+nameitem+"']")[0];
                                unit = item.getElementsByTagName("unit")[0].innerHTML;
                            },false);

                            $("itemstable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                            nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                            Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";
                        }
                        $("totalAmount").value = cusinv.getElementsByTagName("total")[0].innerHTML;
                        $("t").innerHTML = cusinv.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                        $("creditAmount").value = $("precredit").value - $("totalAmount").value;
                        RequestPhp("GET", `${rtPhp}req=copytag&inv=${$("cosNum").value}`
                        ,(x)=>{notify(x.responseText);
                        },true);
                    }
                },true);
            }
            
            $("cusName").onblur = ()=>{
                let sallerName = $("cusName");
                
                RequestPhp("GET",user.dir+"/customers.xml",(c)=>{
                    doccus = c.responseXML;
                    if(doccus.querySelector("customer[name='"+$("cusName").value+"']") === null){
                    $("paidtab").hide();
                    $("noTab").hide();
                    cuscheck = false;
                    sallerNum.value = "";sallerAddress.value = "";
                    precredit.value=0;creditAmount.value = $("totalAmount").value-noNuN($("discount").value);
                    $("paidAmount").value = 0;
                    }
                    else{
                        $("paidtab").show();
                        $("noTab").show();
                        cuscheck = true;
                        RequestPhp("GET",user.dir+"/invoice.xml",(y)=>{
                            doc = y.responseXML;
                            let cusinv = doc.querySelectorAll("invoice[issuedto='"+$("cusName").value+"']");
                            let from = 0;
                            if(cusinv.length >= 10){from = cusinv.length-10}
                            $("invoiceNO").innerHTML = `<option value="" disabled selected>You can select invoice</option>`;
                            for (let i = from; i < cusinv.length; i++) {
                                id = cusinv[i].getAttributeNode("number").nodeValue;
                                $("invoiceNO").innerHTML += `<option value="${id}">Invoice No : ${id}</option>`;
                            }
                        });
                        $("invoiceNO").innerHTML += `<option value="cst">Custom</option>`;
                        RequestPhp("GET",user.dir+"/customers.xml",(x)=>{
                            doc = x.responseXML;
                            let root = doc.getElementsByTagName("customer");
                            for (let i = 0; i < root.length; i++) {
                                if(root[i].getAttributeNode("name").nodeValue == sallerName.value){ 
                                    
                                    pc = parseFloat(root[i].getElementsByTagName("TCA")[0].innerHTML);
                                    precredit.value = pc;
                                    $("creditAmount").value = pc - $("totalAmount").value;

                                    if(root[i].getElementsByTagName("number")[0].childNodes[0] != undefined){
                                        sallerNum.value = root[i].getElementsByTagName("number")[0].innerHTML;
                                    }
                                    if(root[i].getElementsByTagName("address")[0].childNodes[0] != undefined){
                                        sallerAddress.value = root[i].getElementsByTagName("address")[0].innerHTML;
                                    }
                                }
                            }
                        },true);
                    }
                },true);
            }

            $("paidAmount").oninput = ()=>{
                let t = parseFloat(noNuN($("totalAmount").value));
                let pc = parseFloat(noNuN($("precredit").value));
                $("creditAmount").value = (((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value)))-(t-pc));   
            }
            $("discount").oninput = ()=>{
                let t = parseFloat(noNuN($("totalAmount").value));
                let pc = parseFloat(noNuN($("precredit").value));
                
                $("creditAmount").value = (((parseFloat(noNuN($("discount").value)))+parseFloat(noNuN($("paidAmount").value)))-(t-pc));
            }

            let itemsArray = [];
            RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                doc = x.responseXML;
                let ids = [];
                let root = doc.getElementsByTagName("item");
                for (let i = 0; i < root.length; i++) {
                    itemsArray[i] = root[i].getAttributeNode("name").nodeValue;
                    ids[i] = root[i].getAttributeNode("id").nodeValue;
                }
                suggest_text("Item_name","autosuggest_list",itemsArray,"rgb(218, 218, 218)",()=>{
                },_,ids,140);
            },false);
            itemName.onblur = ()=>{
                lasttime = false;

                RequestPhp("GET",user.dir+"/invoice.xml",(x)=>{
                    doc = x.responseXML;
                    let cusinv = doc.querySelectorAll("invoice[issuedto='"+$("cusName").value+"']");
                    for (let i = 0; i < cusinv.length; i++){
                        let itemmatch = cusinv[i].querySelectorAll("item[name='"+itemName.value+"']")
                        if(itemmatch[itemmatch.length-1] !== undefined){
                            let rate = itemmatch[itemmatch.length-1].getElementsByTagName("rate")[0].innerHTML;
                            itemNRate.value = parseFloat(rate);
                            lasttime = true;
                        }
                    }
                },false);

                if(lasttime === false){
                    RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                        check1 = 0;
                        doc = x.responseXML;
                        let root = doc.getElementsByTagName("item");
                        for (let i = 0; i < root.length; i++) {
                            if(root[i].getAttributeNode("name").nodeValue == itemName.value){
                                billrate = $("billctg").value;
                                if(billrate == "1"){
                                    itemNRate.value = root[i].getElementsByTagName("prate")[0].innerHTML;
                                }else{
                                    itemNRate.value = root[i].getElementsByTagName("hsrate")[0].innerHTML;
                                }
                            }
                        }
                    },true);
                }
                let rate = $("Rate");
                RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                    doc = x.responseXML;
                    let root = doc.querySelector("item[name='"+itemName.value+"']");
                    if(root !== null){
                        grate = parseFloat(root.getElementsByTagName("grate")[0].innerHTML);
                    }

                    let pp = (rate.value/grate*100)-100;
                    
                    if(rate.value == grate){
                        rate.style.color = "orange";
                    }else if(rate.value < grate){
                        rate.style.color = "red";
                    }else if(pp >= 10){
                        rate.style.color = "green";
                    }else {
                        rate.style.color = "";
                    }
                },true);
            }
            $("Rate").oninput = ()=>{
                let rate = $("Rate");
                RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                    doc = x.responseXML;
                    let root = doc.querySelector("item[name='"+itemName.value+"']");
                    if(root !== null){
                        grate = parseFloat(root.getElementsByTagName("grate")[0].innerHTML);
                    }

                    let pp = (rate.value/grate*100)-100;
                    
                    if(rate.value == grate){
                        rate.style.color = "orange";
                    }else if(rate.value < grate){
                        rate.style.color = "red";
                    }else if(pp >= 90){
                        rate.style.color = "red";
                        notify("You are taking to much profit. This is not good habit");
                    }else if(pp >= 10){
                        rate.style.color = "green";
                    }else {
                        rate.style.color = "";
                    }
                },true);
            }
            actionupdate.onclick = ()=>{

                if($("Item_name").value.length == 0){
                    notify("item name required");
                    $("Item_name").style.border = "1px solid red";
                }else if(itemQuantity.value <= 0){
                    notify("Quantity required");
                    itemQuantity.style.border = "1px solid red"
                }else if(itemNRate.value <= 0){
                    itemNRate.value = 0;
                }else{
                    let edit = itemstable.getElementsByTagName("tr")[contextvalue];

                    test = $("Item_name").value;
                    qun = $("quantity").value;
                    RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                        doc = x.responseXML;
                        let items = doc.getElementsByTagName("item");
                        for (let i = 0; i < items.length; i++) {
                            if(items[i].getAttributeNode("name").nodeValue == test){
                                unit = items[i].getElementsByTagName("unit")[0].innerHTML;
                                edit.getElementsByTagName("td")[1].innerHTML = qun+unit;
                            }
                        }
                    },true);

                    edit.getElementsByTagName("td")[0].innerHTML = itemName.value;
                    edit.getElementsByTagName("td")[2].innerHTML = itemNRate.value;
                    edit.getElementsByTagName("td")[3].innerHTML = (itemQuantity.value*itemNRate.value).toLocaleString();

                    
                    $("paidAmount").value = 0;
                    total = (parseFloat($("totalAmount").value-subAmount)+
                    parseFloat(itemQuantity.value*itemNRate.value));
                    $("totalAmount").value = total;
                    $("t").innerHTML = total.toLocaleString();
                    $("creditAmount").value = (parseFloat($("precredit").value)-(total-noNuN($("discount").value)));
                    
                    RequestPhp("GET", `${rtPhp}req=updateitem&Iname=${encodeString(itemName.value)}`+
                    `&Iqun=${itemQuantity.value}&rate=${itemNRate.value}&total=${total}`,
                    (x)=>{ },true);
                    itemName.removeAttribute("disabled");
                    itemName.focus();
                    contextvalue = "";
                    subAmount = 0;
                    action.show();actionupdate.hide();
                    itemName.value = "";itemNRate.value = "";itemQuantity.value = "";
                }
            }
            action.onclick = ()=>{

                let nameitem = $("Item_name").value;
                samename = 2;
                for (let i = 0; i < itemsArray.length; i++) {
                    if(itemsArray[i] == nameitem){ 
                        samename =  1;
                    }
                }

                let dsp = $("itemstable").getElementsByClassName("dsp");

                for (let i = 0; i < dsp.length; i++) {
                    if(itemName.value.toLowerCase() == dsp[i].innerHTML.toLowerCase()){
                        samename = 0;
                    }
                }
                if(samename == 0){
                    notify("You already add this item");
                    itemName.style.border = "1px solid red";
                }else if(itemName.value.length == 0){
                    notify("Item name required");
                    itemName.style.border = "1px solid red";
                }else if(samename == 2){
                    notify("Please first add this item by purchase invoice");
                    itemName.style.border = "1px solid red";
                }else if(itemQuantity.value <= 0){
                    notify("Quantity required");
                    itemQuantity.style.border = "1px solid red"
                }else if(itemNRate.value <= 0){
                    itemNRate.value = 0;
            }else{

                    let Rate = $("Rate").value;
                    let Quantity = $("quantity").value;
                    

                    RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                        doc = x.responseXML;
                        let items = doc.getElementsByTagName("item");
                        for (let i = 0; i < items.length; i++) {
                            if(items[i].getAttributeNode("name").nodeValue == nameitem){ 
                                unit = items[i].getElementsByTagName("unit")[0].innerHTML;

                                itemstable.innerHTML += "<tr><th class='left'>"+(itemstable.getElementsByTagName("tr").length)+"</th><td class='dsp'>"+
                                nameitem+"</td><td>"+Quantity+unit+"</td><td>"+
                                Rate+"</td><td>"+(Quantity*Rate).toLocaleString()+"</td></tr>";
                            }
                        }
                        
                    },true);

                    let total = 0;
                
                    total = (parseFloat($("totalAmount").value)+
                    parseFloat(itemQuantity.value*itemNRate.value));
                    $("creditAmount").value = (parseFloat($("precredit").value)-(total-noNuN($("discount").value)));

                    $("paidAmount").value = 0;
                    $("totalAmount").value = total;
                    $("t").innerHTML = total.toLocaleString();
                    
                    RequestPhp("GET", `${rtPhp}req=purchaseitem&Iname=${encodeString(itemName.value)}`+
                    `&Iqun=${itemQuantity.value}&rate=${itemNRate.value}&total=${total}`,
                    (x)=>{
                        if(parseInt(x.responseText) != 1){
                            notify("Temporary file has been lost please press clear button");
                        }
                    },true);

                    itemName.value = ""; itemNRate.value = "";itemQuantity.value = "";
                    itemName.focus();
                    rate.style.color = "";
                }
            }

            let genratePurchaseBill = $("genratereturn");
            genratePurchaseBill.onclick = ()=>{

                let sallerName = $("cusName");
                let sallerNum = $("cusNum");
                let sallerAddress = $("cusAddress");
                
                if(itemstable.getElementsByTagName("tr").length <= 1){
                    itemName.focus();
                    notify("Please add at least one item");
                }else if(sallerName.value.length == 0){
                    notify("Customer name required");
                    sallerName.style.border = "1px solid red";
                }else if(cuscheck == false){
                    notify(`Sorry ${sallerName.value} is not found in customers record`);
                }else {
                    massage = `Are you paid ${noNuN($("paidAmount").value)} from ${$("cusName").value}`;
                    if(noNuN($("paidAmount").value) > ($("precredit").value - $("totalAmount").value)){
                        massage = "You paid more than customer credit. Are you sure to proceed";
                    }
                    if(confirm(massage) ==true){
                        RequestPhp("GET", `${rtPhp}req=Greturn&discount=${noNuN(discount.value)}`
                        +`&invoice=${user.invoice()}&cus=${encodeString(sallerName.value)}&cusnum=${encodeString(sallerNum.value)}&cusadd=${encodeString(sallerAddress.value)}`+
                        `&pammount=${noNuN($("paidAmount").value)}&discount=${noNuN($("discount").value)}&cammount=${noNuN($("creditAmount").value)}`,
                        (x)=>{
                            if(parseInt(x.responseText) == 1){
                                notify("Created Successfully","ok");
                                let att = document.createAttribute("disabled");
                                genratePurchaseBill.setAttributeNode(att);
                            }else{
                                notify("Temporary file has been lost please press clear button"+x.responseText);
                            }
                        },true);
                    }
                }
            }
            function clearform(){
                trs = $("itemstable").getElementsByTagName("tr");

                for (let i = trs.length-1; i > 0 ; i--) {
                    $("itemstable").removeChild(trs[i]);
                }
                $("totalAmount").value = 0;$("creditAmount").value = $("precredit").value;
                $("t").innerHTML = 0;

                RequestPhp("GET", `${reqPhp}req=clear&file=rttemp2.xml`,()=>{
                });
            }
            $("ClearPage").onclick = ()=>{
                clearform();
                notify("Cleared","ok");
            }
            window.oninput = ()=>{
                let inpt = getTag("input");
                for (let i = 0; i < inpt.length; i++) {
                    inpt[i].style.border = "";
                }
            }

        }

        let itemName2 = $("pItem_name");
        let itemQuantity2 = $("pquantity");
        let itemNRate2 = $("pRate");
        psubAmount = 0;

        contextstrip("pitemstable",()=>{
            if(contextvalue != ""){
                paction.hide();pactionupdate.show();
                let delet = $("pitemstable").getElementsByTagName("tr")[contextvalue];
                psubAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                
                itemName2.value = decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML);
                itemQuantity2.value = delet.getElementsByTagName("td")[1].innerHTML;
                itemNRate2.value = delet.getElementsByTagName("td")[2].innerHTML;

                att = document.createAttribute("disabled");
                itemName2.setAttributeNode(att);
            }
        },()=>{
            if(contextvalue != ""){
                if (confirm("Are you sure to delete this item") == true){
                    let delet = pitemstable.getElementsByTagName("tr")[contextvalue];
                    let psubAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
                    pitemstable.removeChild(delet);
                  
                    let dsp = pitemstable.getElementsByClassName("left");
                    for (let j = 0; j < dsp.length; j++) {
                        dsp[j].innerHTML = j;
                    }
                    $("totalAmount").value = (parseFloat($("totalAmount").value)-psubAmount);
                    $("creditAmount").value = (parseFloat($("precredit").value)-(parseFloat($("totalAmount").value)-discount.value));
                    $("t").innerHTML = $("totalAmount").value.toLocaleString();
                    
                    RequestPhp("GET", `${rtPhp}req=deleteitem2`+
                    `&id=${delet.getElementsByTagName("td")[0].id}&total=${parseFloat($("totalAmount").value)}`
                    ,(x)=>{
                        notify(x.responseText);
                    },true);
                    
                    dsp[0].innerHTML = "";
                    itemName2.removeAttribute("disabled");
                    contextvalue = "";
                    subAmount = 0;
                    action.show();actionupdate.hide();
                }
            }
        });

        if(user.companies() != 0){

            let psallerNum = $("comNum");
            let psallerAddress = $("comAddress");
            let datalist2 = $("Companies");
            comcheck = false;

            RequestPhp("GET",user.dir+"/companies.xml",(x)=>{
                doc = x.responseXML;
                let root = doc.getElementsByTagName("company");
                for (let i = 0; i < root.length; i++) {
                    datalist2.innerHTML += "<option>"+ root[i].getAttributeNode("name").nodeValue+"</option>" ;
                }
            },true);

            RequestPhp("GET",user.dir+"/rttemp.xml",(y)=>{
                tempdoc = y.responseXML;
                headtag2 = tempdoc.getElementsByTagName("preturn")[0];
                comtag = tempdoc.getElementsByTagName("company")[0];
                if(comtag !== undefined){
                    $("comName").value = comtag.getAttributeNode("name").nodeValue;
                    if(comtag.getElementsByTagName("number")[0].childNodes[0] != undefined){
                        psallerNum.value = comtag.getElementsByTagName("number")[0].innerHTML;
                    }
                    if(comtag.getElementsByTagName("address")[0].childNodes[0] != undefined){
                        psallerAddress.value = comtag.getElementsByTagName("address")[0].innerHTML;
                    }
                    $("pnoTab").show();$("ppaidtab").show();comcheck = true;
                    RequestPhp("GET",user.dir+"/pinvoice.xml",(y)=>{
                        doc = y.responseXML;
                        let cusinv = doc.querySelectorAll("pinvoice[issuedto='"+$("comName").value+"']");
                        let from = 0;
                        if(cusinv.length >= 10){from = cusinv.length-10}
                        $("pinvoiceNO").innerHTML = `<option value="" disabled>You can select invoice</option>`;
                        for (let i = from; i < cusinv.length; i++) {
                            id = cusinv[i].getAttributeNode("number").nodeValue;
                            $("pinvoiceNO").innerHTML += `<option value="${id}">Invoice No : ${id}</option>`;
                        }
                    },true);
                    $("pinvoiceNO").innerHTML += `<option value="pcst">Custom</option>`;
                    att2 = document.createAttribute("selected");
                    optiontag2 = $("pinvoiceNO").querySelector("option[value='"+headtag2.getAttributeNode("number").nodeValue+"']");
                    optiontag2.setAttributeNode(att2);

                    RequestPhp("GET",user.dir+"/companies.xml",(x)=>{
                        crdoc = x.responseXML;
                        let root = crdoc.querySelector("company[name='"+$("comName").value+"']");
                        pc = parseFloat(root.getElementsByTagName("TCA")[0].innerHTML);
                        precredit.value = pc;
                    },false);
                }

                let items = headtag2.getElementsByTagName("item");
                    
                    for (let i = 0; i < items.length; i++) {
                        let nameitem = items[i].getAttributeNode("name").nodeValue; 
                        let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                        let Rate = parseFloat(items[i].getElementsByTagName("grate")[0].innerHTML);
                        let unit = "";
                        
                        $("ptotalAmount").value = 0;$("pcreditAmount").value = $("pprecredit").value;
                        $("pt").innerHTML = 0;

                        RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                            doc3 = y.responseXML;
                            let item = doc3.querySelectorAll("item[name='"+nameitem+"']")[0];
                            unit = item.getElementsByTagName("unit")[0].innerHTML;
                        },false);

                        $("pitemstable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                        nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                        Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";
                    }
                $("ptotalAmount").value = headtag2.getElementsByTagName("total")[0].innerHTML;
                $("pt").innerHTML = headtag2.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                $("pcreditAmount").value = $("pprecredit").value - $("ptotalAmount").value;

            });

            $("pinvoiceNO").onchange = ()=>{
                if($("pinvoiceNO").value == "pcst"){
                    $("pcosNum").show();
                    pclearform();
                }else{
                    $("pcosNum").hide();
                    RequestPhp("GET",user.dir+"/pinvoice.xml",(y)=>{
                        doc = y.responseXML;
                        let cominv = doc.querySelector("pinvoice[number='"+$("pinvoiceNO").value+"']");
                        let items = cominv.getElementsByTagName("item");
                        trs = $("pitemstable").getElementsByTagName("tr");
                        for (let i = trs.length-1; i > 0 ; i--) {
                            $("pitemstable").removeChild(trs[i]);
                        }
                        
                        for (let i = 0; i < items.length; i++) {
                            let nameitem = items[i].getAttributeNode("name").nodeValue; 
                            let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                            let Rate = parseFloat(items[i].getElementsByTagName("grate")[0].innerHTML);
                            let unit = "";
                            
                            $("ptotalAmount").value = 0;$("pcreditAmount").value = $("pprecredit").value;
                            $("pt").innerHTML = 0;

                            RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                                doc2 = y.responseXML;
                                let item = doc2.querySelectorAll("item[name='"+nameitem+"']")[0];
                                unit = item.getElementsByTagName("unit")[0].innerHTML;
                            },false);

                            $("pitemstable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                            nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                            Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";

                        }
                        $("ptotalAmount").value = cominv.getElementsByTagName("total")[0].innerHTML;
                        $("t").innerHTML = cominv.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                        $("pcreditAmount").value = $("pprecredit").value - $("ptotalAmount").value;
                        RequestPhp("GET", `${rtPhp}req=copytag2&inv=${$("pinvoiceNO").value}`
                        ,(x)=>{notify(x.responseText);
                        },true);
                    },true);
                }
            }

            $("pcosNum").onblur = ()=>{
                RequestPhp("GET",user.dir+"/pinvoice.xml",(y)=>{
                    doc = y.responseXML;
                    if($("pcosNum").value.length == 0){pclearform();}else
                    if(doc.querySelector("pinvoice[issuedto='"+$("comName").value+"'][number='"+$("pcosNum").value+"']") == null){
                        if(doc.querySelector("pinvoice[number='"+$("pcosNum").value+"']") == null){
                            massage = 'Sorry this invoice number not found in record';
                            notify(massage);
                            pclearform();
                        }else{
                            invfound = doc.querySelector("pinvoice[number='"+$("pcosNum").value+"']");
                            ns = invfound.getAttributeNode("issuedto").nodeValue;
                            massage = `Sorry this invoice company is ${ns}`;
                            notify(massage);
                            pclearform();
                        }
                    }else{
                        let cusinv = doc.querySelector("pinvoice[number='"+$("pcosNum").value+"']");
                        let items = cusinv.getElementsByTagName("item");
                        trs = $("pitemstable").getElementsByTagName("tr");
                        for (let i = trs.length-1; i > 0 ; i--) {
                            $("pitemstable").removeChild(trs[i]);
                        }
                        
                        for (let i = 0; i < items.length; i++) {
                            let nameitem = items[i].getAttributeNode("name").nodeValue; 
                            let Quntity = parseFloat(items[i].getElementsByTagName("quntity")[0].innerHTML);
                            let Rate = parseFloat(items[i].getElementsByTagName("grate")[0].innerHTML);
                            let unit = "";
                            
                            $("ptotalAmount").value = 0;$("pcreditAmount").value = $("pprecredit").value;
                            $("pt").innerHTML = 0;

                            RequestPhp("GET",user.dir+"/items.xml",(y)=>{
                                doc2 = y.responseXML;
                                let item = doc2.querySelectorAll("item[name='"+nameitem+"']")[0];
                                unit = item.getElementsByTagName("unit")[0].innerHTML;
                            },false);

                            $("pitemstable").innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp' title='Right click to show options'>"+
                            nameitem+"</td><td>"+Quntity+unit+"</td><td>"+
                            Rate+"</td><td>"+(Quntity*Rate).toLocaleString()+"</td>";
                        }
                        $("ptotalAmount").value = cusinv.getElementsByTagName("total")[0].innerHTML;
                        $("pt").innerHTML = cusinv.getElementsByTagName("total")[0].innerHTML.toLocaleString();
                        $("pcreditAmount").value = $("pprecredit").value - $("ptotalAmount").value;
                        RequestPhp("GET", `${rtPhp}req=copytag2&inv=${$("pcosNum").value}`
                        ,(x)=>{notify(x.responseText);
                        },true);
                    }
                },true);
            }
            
            $("comName").onblur = ()=>{
                let psallerName = $("comName");
                RequestPhp("GET",user.dir+"/companies.xml",(x)=>{
                    doccom = x.responseXML;
                    if(doccom.querySelector("company[name='"+$("comName").value+"']") === null){
                    $("ppaidtab").hide();
                    $("pnoTab").hide();
                    comcheck = false;
                    psallerNum.value = "";psallerAddress.value = "";
                    pprecredit.value=0;pcreditAmount.value = $("ptotalAmount").value-noNuN($("pdiscount").value);
                    $("ppaidAmount").value = 0;
                    }
                    else{
                        $("ppaidtab").show();
                        $("pnoTab").show();
                        comcheck = true;
                        RequestPhp("GET",user.dir+"/pinvoice.xml",(y)=>{
                            doc = y.responseXML;
                            let cominv = doc.querySelectorAll("pinvoice[issuedto='"+$("comName").value+"']");
                            let from = 0;
                            if(cominv.length >= 10){from = cominv.length-10}
                            $("pinvoiceNO").innerHTML = `<option value="" disabled selected>You can select invoice</option>`;
                            for (let i = from; i < cominv.length; i++) {
                                id = cominv[i].getAttributeNode("number").nodeValue;
                                $("pinvoiceNO").innerHTML += `<option value="${id}">Invoice No : ${id}</option>`;
                            }
                            $("pinvoiceNO").innerHTML += `<option value="pcst">Custom</option>`;
                        },true);
                        RequestPhp("GET",user.dir+"/companies.xml",(x)=>{
                            doc = x.responseXML;
                            let root = doc.getElementsByTagName("company");
                            for (let i = 0; i < root.length; i++) {
                                if(root[i].getAttributeNode("name").nodeValue == psallerName.value){
                                    pc = parseFloat(root[i].getElementsByTagName("TCA")[0].innerHTML);
                                    pprecredit.value = pc;
                                    $("pcreditAmount").value = pc - $("ptotalAmount").value;

                                    if(root[i].getElementsByTagName("number")[0].childNodes[0] != undefined){
                                        psallerNum.value = root[i].getElementsByTagName("number")[0].innerHTML;
                                    }
                                    if(root[i].getElementsByTagName("address")[0].childNodes[0] != undefined){
                                        psallerAddress.value = root[i].getElementsByTagName("address")[0].innerHTML;
                                    }
                                }
                            }
                        },true);
                    }
                },true);
            }

            $("ppaidAmount").oninput = ()=>{
                let t = parseFloat(noNuN($("ptotalAmount").value));
                let pc = parseFloat(noNuN($("pprecredit").value));
                $("pcreditAmount").value = (((parseFloat(noNuN($("pdiscount").value)))+parseFloat(noNuN($("ppaidAmount").value)))-(t-pc));   
            }
            $("pdiscount").oninput = ()=>{
                let t = parseFloat(noNuN($("ptotalAmount").value));
                let pc = parseFloat(noNuN($("pprecredit").value));
                
                $("pcreditAmount").value = (((parseFloat(noNuN($("pdiscount").value)))+parseFloat(noNuN($("ppaidAmount").value)))-(t-pc));
            }

            let pitemsArray = [];
            let pids = [];

            RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                doc = x.responseXML;
                let root = doc.getElementsByTagName("item");
                for (let i = 0; i < root.length; i++) {
                    pitemsArray[i] = root[i].getAttributeNode("name").nodeValue;
                    pids[i] = root[i].getAttributeNode("id").nodeValue;
                }
            },false);
            suggest_text("pItem_name","pautosuggest_list",pitemsArray,"rgb(218, 218, 218)",()=>{
            },_,pids,140);
            itemName2.onblur = ()=>{
                RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                    check1 = 0;
                    doc = x.responseXML;
                    let root = doc.getElementsByTagName("item");
                    for (let i = 0; i < root.length; i++) {
                        if(root[i].getAttributeNode("name").nodeValue == itemName2.value){
                            itemNRate2.value = root[i].getElementsByTagName("grate")[0].innerHTML;
                        }
                    }
                },true);
            }

            pactionupdate.onclick = ()=>{

                quantitycheck = true;

                RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                    doc = x.responseXML;
                    let items = doc.getElementsByTagName("item");
                    for (let i = 0; i < items.length; i++) {
                        if(items[i].getAttributeNode("name").nodeValue == $("Item_name").value){ 
                            left = items[i].getElementsByTagName("quntityleft")[0].innerHTML;
                            if(parseFloat(left) < itemQuantity2.value){
                                quantitycheck = false;
                            }
                        }
                    }
                },false);
                
                if($("pItem_name").value.length == 0){
                    notify("item name required");
                    $("pItem_name").style.border = "1px solid red";
                }else if(quantitycheck == false){
                    notify("Sorry you have not ago quantity for return");
                    itemQuantity2.style.border = "1px solid red"
                }else if(itemQuantity2.value <= 0){
                    notify("Quantity required");
                    itemQuantity2.style.border = "1px solid red"
                }else if(itemNRate2.value <= 0){
                    itemNRate2.value = 0;
                }else{
                    let edit = pitemstable.getElementsByTagName("tr")[contextvalue];

                    test = $("pItem_name").value;
                    qun = $("pquantity").value;
                    RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                        doc = x.responseXML;
                        let items = doc.getElementsByTagName("item");
                        for (let i = 0; i < items.length; i++) {
                            if(items[i].getAttributeNode("name").nodeValue == test){
                                unit = items[i].getElementsByTagName("unit")[0].innerHTML;
                                edit.getElementsByTagName("td")[1].innerHTML = qun+unit;
                            }
                        }
                    },true);

                    edit.getElementsByTagName("td")[0].innerHTML = itemName2.value;
                    edit.getElementsByTagName("td")[2].innerHTML = itemNRate2.value;
                    edit.getElementsByTagName("td")[3].innerHTML = (itemQuantity2.value*itemNRate2.value).toLocaleString();

                    
                    $("ppaidAmount").value = 0;
                    total = (parseFloat($("ptotalAmount").value-subAmount)+
                    parseFloat(itemQuantity2.value*itemNRate2.value));
                    $("ptotalAmount").value = total;
                    $("pt").innerHTML = total.toLocaleString();
                    $("pcreditAmount").value = (parseFloat($("pprecredit").value)-total-noNuN($("pdiscount").value));
                    
                    RequestPhp("GET", `${rtPhp}req=updateitem2&id=${edit.getElementsByTagName("td")[0].id}`+
                    `&Iqun=${itemQuantity2.value}&rate=${itemNRate2.value}&total=${total}`,
                    (x)=>{notify(x.responseText)},true);
                    itemName2.removeAttribute("disabled");
                    itemName2.focus();
                    contextvalue = "";
                    subAmount = 0;
                    action.show();actionupdate.hide();
                    itemName2.value = "";itemNRate2.value = "";itemQuantity2.value = "";
                }
            }
            paction.onclick = ()=>{
                let quantitycheck = true;
                RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                    doc = x.responseXML;
                    let items = doc.getElementsByTagName("item");
                    for (let i = 0; i < items.length; i++) {
                        if(items[i].getAttributeNode("name").nodeValue == $("Item_name").value){ 
                            left = items[i].getElementsByTagName("quntityleft")[0].innerHTML;
                            if(parseFloat(left) < itemQuantity2.value){
                                quantitycheck = false;
                            }
                        }
                    }
                },false);

                let nameitem = $("pItem_name").value;
                samename = 2;
                for (let i = 0; i < pitemsArray.length; i++) {
                    if(pitemsArray[i] == nameitem){ 
                        samename =  1;
                    }
                }

                let dsp = $("pitemstable").getElementsByClassName("dsp");

                for (let i = 0; i < dsp.length; i++) {
                    if(itemName2.value.toLowerCase() == dsp[i].innerHTML.toLowerCase()){
                        samename = 0;
                    }
                }
                if(samename == 0){
                    notify("You already add this item");
                    itemName2.style.border = "1px solid red";
                }else if(itemName2.value.length == 0){
                    notify("Item name required");
                    itemName2.style.border = "1px solid red";
                }else if(samename == 2){
                    notify("Please first add this item by purchase invoice");
                    itemName2.style.border = "1px solid red";
                }else if(quantitycheck == false){
                    notify("Sorry you have not ago quantity for return");
                    itemQuantity2.style.border = "1px solid red"
                }else if(itemQuantity2.value <= 0){
                    notify("Quantity required");
                    itemQuantity2.style.border = "1px solid red"
                }else if(itemNRate2.value <= 0){
                    itemNRate2.value = 0;
            }else{

                    let Rate = $("pRate").value;
                    let Quantity = $("pquantity").value;
                    

                    RequestPhp("GET",user.dir+"/items.xml",(x)=>{
                        doc = x.responseXML;
                        let items = doc.getElementsByTagName("item");
                        for (let i = 0; i < items.length; i++) {
                            if(items[i].getAttributeNode("name").nodeValue == nameitem){ 
                                unit = items[i].getElementsByTagName("unit")[0].innerHTML;

                                pitemstable.innerHTML += "<tr><th class='left'>"+(pitemstable.getElementsByTagName("tr").length)+"</th><td class='dsp'>"+
                                nameitem+"</td><td>"+Quantity+unit+"</td><td>"+
                                Rate+"</td><td>"+(Quantity*Rate).toLocaleString()+"</td></tr>";
                            }
                        }
                        
                    },true);

                    let total = 0;
                
                    total = (parseFloat($("ptotalAmount").value)+
                    parseFloat(itemQuantity2.value*itemNRate2.value));
                    $("pcreditAmount").value = (parseFloat($("pprecredit").value)-total-noNuN($("discount").value));

                    $("ppaidAmount").value = 0;
                    $("ptotalAmount").value = total;
                    $("pt").innerHTML = total.toLocaleString();
                    
                    RequestPhp("GET", `${rtPhp}req=purchaseitem2&Iname=${encodeString(itemName2.value)}`+
                    `&Iqun=${itemQuantity2.value}&rate=${itemNRate2.value}&total=${total}`,
                    (x)=>{
                        if(parseInt(x.responseText) != 1){
                            notify("Temporary file has been lost please press clear button");
                        }
                    },true);

                    itemName2.value = ""; itemNRate2.value = "";itemQuantity2.value = "";
                    itemName2.focus();
                }
            }

            let genratePurchasereturn = $("genratePurchasereturn");
            genratePurchasereturn.onclick = ()=>{

                let psallerName = $("comName");
                let psallerNum = $("cusNum");
                let psallerAddress = $("cusAddress");
                
                if(pitemstable.getElementsByTagName("tr").length <= 1){
                    itemName2.focus();
                    notify("Please add at least one item");
                }else if(psallerName.value.length == 0){
                    notify("Customer name required");
                    psallerName.style.border = "1px solid red";
                }else if(comcheck == false){
                    notify(`Sorry ${psallerName.value} is not found in customers record`);
                }else {
                    massage = `Are you paid ${noNuN($("ppaidAmount").value)} from ${$("comName").value}`;
                    if(noNuN($("ppaidAmount").value) > ($("pprecredit").value - $("ptotalAmount").value)){
                        massage = "You paid more than customer credit. Are you sure to proceed";
                    }
                    if(confirm(massage) ==true){
                        RequestPhp("GET", `${rtPhp}req=comreturn&discount=${noNuN(discount.value)}`
                        +`&com=${encodeString(psallerName.value)}&comnum=${encodeString(psallerNum.value)}&comadd=${encodeString(psallerAddress.value)}`+
                        `&pammount=${noNuN($("ppaidAmount").value)}&discount=${noNuN($("discount").value)}&cammount=${noNuN($("pcreditAmount").value)}`,
                        (x)=>{
                            if(parseInt(x.responseText) == 1){
                                notify("Created Successfully","ok");
                                let att = document.createAttribute("disabled");
                                genratePurchasereturn.setAttributeNode(att);
                            }else{
                                notify("Temporary file has been lost please press clear button"+x.responseText);
                            }
                        },true);
                    }
                }
            }

            function pclearform(){
                trs = $("pitemstable").getElementsByTagName("tr");

                for (let i = trs.length-1; i > 0 ; i--) {
                    $("pitemstable").removeChild(trs[i]);
                }
                $("ptotalAmount").value = 0;$("pcreditAmount").value = $("pprecredit").value;
                $("pt").innerHTML = 0;

                RequestPhp("GET", `${reqPhp}req=clear&file=rttemp.xml`,()=>{
                });
            }

            $("ClearPage2").onclick = ()=>{
                notify("Cleared","ok");
            }
            window.oninput = ()=>{
                let inpt = getTag("input");
                for (let i = 0; i < inpt.length; i++) {
                    inpt[i].style.border = "";
                }
            }

        }

    },true);
}

//---------------------------------------------------------------
// payments function
function openPayments(){
    RequestPhp("GET", "payments.html",(x)=>{
        openWindow("Payments",x.responseText);
        tabcontrol(["receivedBtn","sentBtn"],["receivedTab","sentTab"]," CCactive");
        btns = ["customerpybtn","invoicepybtn","homepybtn","shoppybtn"];
        btns2 = ["companypybtn","sinvoicepybtn","shomepybtn","sshoppybtn"];
        tabs = ["customerpy","invoicepy","homepy","shoppy"];
        tabs2 = ["companypy","sinvoicepy","shomepy","sshoppy"];
        tabcontrol(btns,tabs," subactive");
        tabcontrol(btns2,tabs2," subactive");
        holdertodiv();

        if(user.customer() != 0){
            RequestPhp("GET",user.dir+"/customers.xml",(x)=>{
                let cushendler = $("cushendler");
                doc = x.responseXML;

                let root = doc.querySelectorAll("customer");
                for (let i = 0; i < root.length; i++) {
                    check = parseFloat(root[i].getElementsByTagName("TCA")[0].innerHTML);
                    if(check !== 0){
                        let number = root[i].getElementsByTagName("number")[0].innerHTML;
                        let time =  xdate(root[i]);
                        let seller = root[i].getAttributeNode("name").nodeValue;
                        let sellerid = root[i].getAttributeNode("id").nodeValue;
                        let credit = root[i].getElementsByTagName("TCA")[0].innerHTML;
                        
                        cushendler.innerHTML += `<div class="hand cusVeiwer">
                            <div class="div">${time}</div>
                            <div class="div" style="width:35%" id="${sellerid}">${seller}</div>
                            <div class="div">${number}</div>
                            <div class="div">Credit : ${credit}</div>
                            <div class="cusExpand">
                                <table>
                                        <tr>
                                            <th class="left"></th>
                                            <th>Date</th>
                                            <th>Invoice Number</th>
                                            <th>Invoice Amount</th>
                                            <th>Invoice Credit</th>
                                        </tr>
                                    <tbody class="custable">
                                        
                                    </tbody>
                                </table>

                                <div class="subcon"></div>
                                <div class="subcon" style="font-size:13px">
                                    <div class="hand" class="paymentdiv">
                                        <div class="hand">
                                            <div class="subcon">Previous Credit Ammount</div>
                                            <div class="subcon PCA"></div>
                                        </div>
                                    </div>
                                    <div class="hand" class="paymentdiv">
                                        <div class="hand">
                                            <div class="subcon">Total Credit Amount</div>
                                            <div class="subcon">${credit}</div>
                                        </div>
                                    </div>
                                    <div class="hand">
                                        <div class="hand">
                                            <div class="subcon">Received amount</div>
                                            <div class="subcon"><input type="number" class="RAmountcus special" placeholder="Payment..."></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="subcon"></div>
                                <div class="subcon noprint">
                                    <button class="btn_2 inside receivedo">Submit</button>
                                    <button class="btn_2 inside printthis">Print</button>
                                </div>
                            </div>
                        </div>`;

                        
                    }
                }

                let next = 0;
                let invTCA = []; 
                for (let i = 0; i < root.length; i++) {
                    let check = parseFloat(root[i].getElementsByTagName("TCA")[0].innerHTML);
                    if(check !== 0){
                        let seller = root[i].getAttributeNode("name").value;
                        RequestPhp("GET", user.dir+"/invoice.xml",(x)=>{
                            let cus = x.responseXML;
                            items = cus.querySelectorAll("invoice[credit='yes'][issuedto='"+seller+"']");
                            for (let k = 0; k < items.length; k++) {
                                invTCA[i] = parseFloat(items[k].getElementsByTagName("cammount")[0].innerHTML);
                            }

                            PCA = getClass("PCA");
                            PCA[next].innerHTML = check-noNuN(invTCA[i]);
                            next++;
                        },false);
                    }
                };

                alltagcus = getClass("cusVeiwer");
                expandcus = getClass("cusExpand");
                receivedo = getClass("receivedo");
                for (let i = 0; i < alltagcus.length; i++){
                    receivedo[i].onclick = ()=>{
                        let seller = alltagcus[i].getElementsByTagName("div")[1].id;
                        let sellerName = alltagcus[i].getElementsByTagName("div")[1].innerHTML;
                        RequestPhp("GET",user.dir+"/customers.xml",(cu)=>{
                            cus = cu.responseXML;
                            TCA = parseFloat(cus.querySelector("customer[id='"+seller+"']").querySelector("TCA").innerHTML);
                        },false);
                        value2 = getClass("RAmountcus")[i].value;
                        if(value2 <= 0){
                            notify("Please input some received payment");
                        }else if(value2 < TCA+1){
                            if(confirm(`Are you received ${value2} rupees from ${sellerName}`)== true){
                                notify("Record updated successfully","ok");
                                RequestPhp("GET", `${reqPhp}req=rinc&rec=${value2}&id=${seller}`
                                ,(x)=>{notify(x.responseText)},true);
                            }
                        }else{
                            notify(`Only ${(TCA)} credit left of this customer in all bills`);
                        }
                    }

                    alltagcus[i].onclick = ()=>{
                        for (let j = 0; j < expandcus.length; j++) {
                            expandcus[j].hide();
                        }
                        

                        expandcus[i].show();
                        RequestPhp("GET", user.dir+"/invoice.xml",(x)=>{
                            let cus = x.responseXML;
                            let seller = alltagcus[i].getElementsByTagName("div")[1].id;
                            items = cus.querySelectorAll("invoice[credit='yes'][issuedto='"+seller+"']");
                            
                            let custable = expandcus[i].getElementsByClassName("custable")[0];
                            
                            custable.innerHTML = ``;
                            for (let k = 0; k < items.length; k++) {

                                let invdate = xdate(items[k])
                                let invnum = items[k].getAttributeNode("number").nodeValue;
                                let invamount = parseFloat(items[k].getElementsByTagName("total")[0].innerHTML);

                                let invcre = parseFloat(items[k].getElementsByTagName("cammount")[0].innerHTML);
                                custable.innerHTML += `<th class='left'>${(k+1)}</th>
                                <td class='dsp'>${invdate}</td>
                                <td>${invnum}</td><td>${invamount.toLocaleString()}</td>
                                <td>${(invcre).toLocaleString()}</td>`;
                            }
                            
                        },false);
                    }
                }
                
            },true);
        }

        if(user.invoice() != 0){
            RequestPhp("GET",user.dir+"/invoice.xml",(x)=>{
                let invhendler = $("invhendler");
                doc = x.responseXML;
                let root = doc.querySelectorAll("invoice[credit='yes']");
                for (let i = 0; i < root.length; i++) {
                    let number = root[i].getAttributeNode("number").nodeValue;
                    let time =  xdate(root[i]);
                    let sellerid = root[i].getAttributeNode("issuedto").nodeValue;
                    let seller = getname(user.dir+"/customers.xml","customer",sellerid);
                    let total = root[i].getElementsByTagName("total")[0].innerHTML;
                    let credit = root[i].getElementsByTagName("cammount")[0].innerHTML;
                    let discount = root[i].getElementsByTagName("discount")[0].innerHTML;
                    let pamount = root[i].getElementsByTagName("pammount")[0].innerHTML;
                    
                    invhendler.innerHTML += `<div class="hand invoiceVeiwer">
                        <div class="div">${time}</div>
                        <div class="div" style="width:35%" id="${sellerid}">${seller}</div>
                        <div class="div">Total : ${total}</div>
                        <div class="div">Credit : ${credit}</div>
                        <span class="invnumber">${number}</span>
                        <div class="invExpand">
                            <table>
                            <tr>
                                <th class="left"></th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                            </tr>
                                <tbody class="itemstable">
                                    
                                </tbody>
                            </table>

                            <div class="subcon"></div>
                            <div class="subcon" style="font-size:13px">
                                <div class="hand" class="paymentdiv">
                                    <div class="hand">
                                        <div class="subcon">Total Ammount</div>
                                        <div class="subcon">${total}</div>
                                    </div>
                                    <div class="hand">
                                        <div class="subcon">Discount</div>
                                        <div class="subcon">${discount}</div>
                                    </div>
                                    <div class="hand">
                                        <div class="subcon">Credit Amount</div>
                                        <div class="subcon">${credit}</div>
                                    </div>
                                    <div class="hand">
                                        <div class="subcon">Previous paid</div>
                                        <div class="subcon ppa">${pamount}
                                            <i class="ptime">${time}</i>
                                        </div>
                                    </div>
                                </div>
                                <div class="hand morepaid">
                                    
                                </div>
                                <div class="hand">
                                    <div class="hand">
                                        <div class="subcon">Received amount</div>
                                        <div class="subcon"><input type="number" class="RAmount special" placeholder="Payment..."></div>
                                    </div>
                                </div>
                            </div>
                            <div class="subcon"></div>
                            <div class="subcon noprint">
                                <button class="btn_2 inside receivedok">Submit</button>
                                <button class="btn_2 inside printthis">Print</button>
                            </div>
                      </div>
                    </div>`;
                }

                alltaginv = getClass("invoiceVeiwer");
                expand = getClass("invExpand");
                receivedok = getClass("receivedok");
                for (let i = 0; i < alltaginv.length; i++){
                    receivedok[i].onclick = ()=>{
                    let sellerName = getname(user.dir+"/customers.xml","customer",sellerid);
                    let seller = root[i].getAttributeNode("issuedto").nodeValue;
                    let TCA = 0; 
                        
                    RequestPhp("GET", user.dir+"/customers.xml",(x)=>{
                        let cus = x.responseXML;
                        TCA = parseFloat(cus.querySelector("customer[id='"+seller+"']").querySelector("TCA").innerHTML);
                    },false)
                        
                    value = getClass("RAmount")[i].value;
                    if(value <= 0){
                        notify("Please input some received payment");
                    }else if(value < TCA+1){
                        if(confirm(`Are you received ${value} rupees from ${sellerName}`)== true){
                            notify("Record updated successfully","ok");
                            RequestPhp("GET", `${reqPhp}req=rinc&rec=${value}&id=${seller}`
                            ,(x)=>{notify(x.responseText)},true);
                        }
                    }else{
                        notify(`Only ${(TCA)} credit left of this customer in all bills`);
                    }
                }
                    alltaginv[i].onclick = ()=>{
                        for (let j = 0; j < expand.length; j++) {
                            expand[j].hide();
                        }
                        expand[i].show();
                        let items = root[i].getElementsByTagName("item");
                        let itemstable = expand[i].getElementsByClassName("itemstable")[0];
                        let morepaid = expand[i].getElementsByClassName("morepaid")[0];
                        let pamount = root[i].getElementsByTagName("pammount");
                        morepaid.innerHTML = ``;
                        for (let k = 1; k < pamount.length; k++) {
                            morepaid.innerHTML += `<div class="subcon">Previous paid</div>
                                                    <div class="subcon ppa">${pamount[k].innerHTML}
                                                        <i class="ptime">${xdate(pamount[k])}</i>
                                                    </div>`;
                        }
                        itemstable.innerHTML = "";
                        for (let k = 0; k < items.length; k++) {

                            let nameitem = items[k].getAttributeNode("name").nodeValue;
                            let quantity = parseFloat(items[k].getElementsByTagName("quntity")[0].innerHTML);
                            let Rate = parseFloat(items[k].getElementsByTagName("rate")[0].innerHTML);
                            
                            itemstable.innerHTML += `<th class='left'>${(k+1)}</th>
                            <td class='dsp' title='Right click to show options'>${nameitem}</td>
                            <td>${quantity}</td><td>${Rate}</td>
                            <td>${(quantity*Rate).toLocaleString()}</td>`;
                        }
                    }
                }
                
            },true);
        }

        if(user.companies() != 0){
            RequestPhp("GET",user.dir+"/companies.xml",(x)=>{
                let comhendler = $("comhendler");
                doc = x.responseXML;

                let root = doc.querySelectorAll("company");
                for (let i = 0; i < root.length; i++) {
                    check = parseFloat(root[i].getElementsByTagName("TCA")[0].innerHTML);
                    if(check !== 0){
                        let number = root[i].getElementsByTagName("number")[0].innerHTML;
                        let time =  xdate(root[i]);
                        let seller = root[i].getAttributeNode("name").nodeValue;
                        let sellerid = root[i].getAttributeNode("id").nodeValue;
                        let credit = root[i].getElementsByTagName("TCA")[0].innerHTML;
                        
                        comhendler.innerHTML += `<div class="hand comVeiwer">
                            <div class="div">${time}</div>
                            <div class="div" style="width:35%" id="${sellerid}">${seller}</div>
                            <div class="div">${number}</div>
                            <div class="div">Credit : ${credit}</div>
                            <div class="comExpand">
                                <table>
                                        <tr>
                                            <th class="left"></th>
                                            <th>Date</th>
                                            <th>Invoice Number</th>
                                            <th>Invoice Amount</th>
                                            <th>Invoice Credit</th>
                                        </tr>
                                    <tbody class="comtable">
                                        
                                    </tbody>
                                </table>

                                <div class="subcon"></div>
                                <div class="subcon" style="font-size:13px">
                                    <div class="hand" class="paymentdiv">
                                        <div class="hand">
                                            <div class="subcon">Previous Credit Ammount</div>
                                            <div class="subcon PCA2"></div>
                                        </div>
                                    </div>
                                    <div class="hand" class="paymentdiv">
                                        <div class="hand">
                                            <div class="subcon">Total Credit Amount</div>
                                            <div class="subcon">${credit}</div>
                                        </div>
                                    </div>
                                    <div class="hand">
                                        <div class="hand">
                                            <div class="subcon">Received amount</div>
                                            <div class="subcon"><input type="number" class="RAmountcom special" placeholder="Payment..."></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="subcon"></div>
                                <div class="subcon noprint">
                                    <button class="btn_2 inside preceivedo">Submit</button>
                                    <button class="btn_2 inside printthis">Print</button>
                                </div>
                            </div>
                        </div>`;
                    }
                }

                let next2 = 0;
                let pinvTCA = []; 
                for (let i = 0; i < root.length; i++) {
                    let check = parseFloat(root[i].getElementsByTagName("TCA")[0].innerHTML);
                    if(check !== 0){
                        let seller = root[i].getAttributeNode("name").value;
                        RequestPhp("GET", user.dir+"/pinvoice.xml",(x)=>{
                            let cus = x.responseXML;
                            items = cus.querySelectorAll("pinvoice[credit='yes'][issuedto='"+seller+"']");
                            for (let k = 0; k < items.length; k++) {
                                pinvTCA[i] = parseFloat(items[k].getElementsByTagName("cammount")[0].innerHTML);
                            }

                            PCA = getClass("PCA2");
                            PCA[next2].innerHTML = check-noNuN(pinvTCA[i]);
                            next2++;
                        },false);
                    }
                }

                alltagcom = getClass("comVeiwer");
                expandcom = getClass("comExpand");
                preceivedo = getClass("preceivedo");
                for (let i = 0; i < alltagcom.length; i++){
                    preceivedo[i].onclick = ()=>{
                        let seller = alltagcom[i].getElementsByTagName("div")[1].id;
                        let sellerName = alltagcom[i].getElementsByTagName("div")[1].innerHTML;
                        TCA = 0
                        value2 = getClass("RAmountcom")[i].value;
                        let checkpayment = false;
                        RequestPhp("GET",user.dir+"/payments.xml",(x)=>{
                            doc = x.responseXML;
                            
                            let root = doc.querySelectorAll("payment");
                            let vale;
                            vale = root[root.length-1].getElementsByTagName("TNC")[0].innerHTML;
                            if(parseFloat(vale) >= parseFloat(value2)){
                                checkpayment = true;
                            }
                        },false);
                        RequestPhp("GET",user.dir+"/companies.xml",(cu)=>{
                            cus = cu.responseXML;
                            TCA = parseFloat(cus.querySelector("company[id='"+seller+"']").querySelector("TCA").innerHTML);
                        },false);
                        
                        if(value2 <= 0){
                            notify("Please input some sent payment");
                        }else if(value2 > TCA+1){
                            notify(`Only ${(TCA)} credit left of this company in all bills`);
                        
                        }else if(checkpayment == false){
                            notify("Sorry you not ago payments for paid \n please update payments section");
                        }else if(value2 < TCA+1){
                            if(confirm(`Are you received ${value2} rupees from ${sellerName}`)== true){
                                notify("Record updated successfully","ok");
                                RequestPhp("GET", `${reqPhp}req=rpinc&rec=${value2}&id=${seller}`
                                ,(x)=>{notify(x.responseText)},true);
                            }
                        }
                    }

                    alltagcom[i].onclick = ()=>{
                        for (let j = 0; j < expandcom.length; j++) {
                            expandcom[j].hide();
                        }

                        expandcom[i].show();
                        RequestPhp("GET", user.dir+"/pinvoice.xml",(x)=>{
                            let cus = x.responseXML;
                            let seller = alltagcom[i].getElementsByTagName("div")[1].id;
                            items = cus.querySelectorAll("pinvoice[credit='yes'][issuedto='"+seller+"']");
                            
                            let comtable = expandcom[i].getElementsByClassName("comtable")[0];
                        
                            comtable.innerHTML = ``;
                            for (let k = 0; k < items.length; k++) {

                                let invdate = xdate(items[k])
                                let invnum = items[k].getAttributeNode("number").nodeValue;
                                let invamount = parseFloat(items[k].getElementsByTagName("total")[0].innerHTML);
                                let invcre = parseFloat(items[k].getElementsByTagName("cammount")[0].innerHTML);
                                
                                comtable.innerHTML += `<th class='left'>${(k+1)}</th>
                                <td class='dsp'>${invdate}</td>
                                <td>${invnum}</td><td>${invamount.toLocaleString()}</td>
                                <td>${(invcre).toLocaleString()}</td>`;
                            }
                        },false);
                    }
                }
                
            },true);
        }

        if(user.pinvoice != 0){
            RequestPhp("GET",user.dir+"/pinvoice.xml",(x)=>{
                let invhendler = $("pinvhendler");
                doc = x.responseXML;
                let root = doc.querySelectorAll("pinvoice[credit='yes']");
                for (let i = 0; i < root.length; i++) {
                    let number = root[i].getAttributeNode("number").nodeValue;
                    let time =  xdate(root[i]);
                    let sellerId = root[i].getAttributeNode("issuedto").nodeValue;
                    let seller = getname(user.dir+"/companies.xml","company",sellerId);
                    let total = root[i].getElementsByTagName("total")[0].innerHTML;
                    let credit = root[i].getElementsByTagName("cammount")[0].innerHTML;
                    let pamount = root[i].getElementsByTagName("pammount")[0].innerHTML;
                    
                    invhendler.innerHTML += `<div class="hand pinvoiceVeiwer">
                        <div class="div">${time}</div>
                        <div class="div" style="width:35%" id="${sellerId}">${seller}</div>
                        <div class="div">Total : ${total}</div>
                        <div class="div">Credit : ${credit}</div>
                        <span class="invnumber">${number}</span>
                        <div class="pinvExpand">
                            <table>
                            <tr>
                                <th class="left"></th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                            </tr>
                                <tbody class="pitemstable">
                                    
                                </tbody>
                            </table>

                            <div class="subcon"></div>
                            <div class="subcon" style="font-size:13px">
                                <div class="hand" class="paymentdiv">
                                    <div class="hand">
                                        <div class="subcon">Total Ammount</div>
                                        <div class="subcon">${total}</div>
                                    </div>
                                    <div class="hand">
                                        <div class="subcon">Credit Amount</div>
                                        <div class="subcon">${credit}</div>
                                    </div>
                                    <div class="hand">
                                        <div class="subcon">Previous paid</div>
                                        <div class="subcon ppa">${pamount}
                                            <i class="ptime">${time}</i>
                                        </div>
                                    </div>
                                </div>
                                <div class="hand pmorepaid">
                                    
                                </div>
                                <div class="hand">
                                    <div class="hand">
                                        <div class="subcon">Received amount</div>
                                        <div class="subcon"><input type="number" class="pRAmount special" placeholder="Payment..."></div>
                                    </div>
                                </div>
                            </div>
                            <div class="subcon"></div>
                            <div class="subcon noprint">
                                <button class="btn_2 inside preceivedok">Submit</button>
                                <button class="btn_2 inside printthis">Print</button>
                            </div>
                      </div>
                    </div>`;
                }

                alltagpinv = getClass("pinvoiceVeiwer");
                pexpand = getClass("pinvExpand");
                preceivedok = getClass("preceivedok");
                for (let i = 0; i < alltagpinv.length; i++){
                    preceivedok[i].onclick = ()=>{
                        let seller = alltagpinv[i].getElementsByTagName("div")[1].id;
                        let sellerName = alltagpinv[i].getElementsByTagName("div")[1].innerHTML;
                        TCA = 0
                        value2 = getClass("pRAmount")[i].value;
                        let checkpayment = false;
                        RequestPhp("GET",user.dir+"/payments.xml",(x)=>{
                            doc = x.responseXML;
                            
                            let root = doc.querySelectorAll("payment");
                            let vale;
                            vale = root[root.length-1].getElementsByTagName("TNC")[0].innerHTML;
                            if(parseFloat(vale) >= parseFloat(value2)){
                                checkpayment = true;
                            }
                        },false);

                        RequestPhp("GET",user.dir+"/companies.xml",(cu)=>{
                            cus = cu.responseXML;
                            TCA = parseFloat(cus.querySelector("company[id='"+seller+"']").querySelector("TCA").innerHTML);
                        },false);
                        
                        if(value2 <= 0){
                            notify("Please input some sent payment");
                        }else if(value2 > TCA+1){
                            notify(`Only ${(TCA)} credit left of this company in all bills`);
                        
                        }else if(checkpayment == false){
                            notify("Sorry you not ago payments for paid \n please update payments section");
                        }else if(value2 < TCA+1){
                            if(confirm(`Are you received ${value2} rupees from ${sellerName}`)== true){
                                notify("Record updated successfully","ok");
                                RequestPhp("GET", `${reqPhp}req=rpinc&num=${0}&rec=${value2}&id=${seller}`
                                ,(x)=>{notify(x.responseText)},true);
                            }
                        }
                    }
                    alltagpinv[i].onclick = ()=>{
                        for (let j = 0; j < pexpand.length; j++) {
                            pexpand[j].hide();
                        }
                        pexpand[i].show();
                        let items = root[i].getElementsByTagName("item");
                        let itemstable = pexpand[i].getElementsByClassName("pitemstable")[0];
                        let morepaid = pexpand[i].getElementsByClassName("pmorepaid")[0];
                        let paidAmount = root[i].getElementsByTagName("pammount");
                        morepaid.innerHTML = "";
                        
                        for (let k = 1; k < paidAmount.length; k++) {
                            morepaid.innerHTML += `<div class="subcon">Previous paid</div>
                                                    <div class="subcon ppa">${paidAmount[k].innerHTML}
                                                        <i class="ptime">${xdate(paidAmount[k])}</i>
                                                    </div>`;
                        }

                        itemstable.innerHTML = "";
                        for (let k = 0; k < items.length; k++) {

                            let nameitem = items[k].getAttributeNode("name").nodeValue;
                            let quantity = parseFloat(items[k].getElementsByTagName("quntity")[0].innerHTML);
                            let Rate = parseFloat(items[k].getElementsByTagName("grate")[0].innerHTML);
                            
                            itemstable.innerHTML += `<th class='left'>${(k+1)}</th>
                            <td class='dsp' title='Right click to show options'>${nameitem}</td>
                            <td>${quantity}</td><td>${Rate}</td>
                            <td>${(quantity*Rate).toLocaleString()}</td>`;
                        }
                    }
                }
                
            },true);
        }

        $("submitrsp").onclick = ()=>{
            let detail = $("detailrsp");
            let amount = $("ammountrsp");

            if(detail.value.length <= 2){
                detail.plerror("Please add some payments detail");
            }else if(amount.value < 0){
                amount.plerror("Only received payment allowed");
            }else if (amount.value == 0){
                amount.plerror("Payment should not be zero");
            }else{

            }
        }

        $("submitrhp").onclick = ()=>{
            let detail = $("detailrhp");
            let amount = $("ammountrhp");

            if(detail.value.length <= 2){
                detail.plerror("Please add some payments detail");
            }else if(amount.value < 0){
                amount.plerror("Only received payment allowed");
            }else if (amount.value == 0){
                amount.plerror("Payment should not be zero");
            }else{

            }
        }

    },true);
}

//---------------------------------------------------------------
// items or stack function
function openItems(){
    RequestPhp("GET", "items.html",(x)=>{
        let itemsArray = [];
        let ids = [];
        let leftQuantity = [];
        openWindow("Items",x.responseText);
        tabcontrol(["itemlistbtn","additembtn"],["itemslist","additems"]," subactive");

        RequestPhp("GET",user.dir+"/items.xml",(x)=>{
            doc = x.responseXML;
            table = $("itemstable");
            
            let root = doc.getElementsByTagName("item");
            for (let i = 0; i < root.length; i++) {
                items = root[i].getAttributeNode("name").nodeValue;
                id = root[i].getAttributeNode("id").nodeValue;
                itemsArray[i] = items;
                ids[i] = id;
                date = root[i].getAttributeNode("day").nodeValue +"/"+ root[i].getAttributeNode("mon").nodeValue+
                "/"+ root[i].getAttributeNode("year").nodeValue;
                qun = root[i].getElementsByTagName("quntity")[0].innerHTML+" "+
                root[i].getElementsByTagName("unit")[0].innerHTML;
                qunleft = root[i].getElementsByTagName("quntityleft")[0].innerHTML+" "+
                root[i].getElementsByTagName("unit")[0].innerHTML;
                leftQuantity[i] = root[i].getElementsByTagName("quntityleft")[0].innerHTML;
                rate = root[i].getElementsByTagName("prate")[0].innerHTML;
                persentage = (parseFloat(qunleft)/parseFloat(root[i].getElementsByTagName("quntity")[0].innerHTML))*100;

                table.innerHTML += `<tr><td>${i+1}</td><td>${date}</td>`+
                `<td class="itemName" id=${id}>${items}</td><td>${qun}</td><td>${qunleft}</td><td>${rate}</td></tr>` 
                let tag = table.getElementsByTagName("tr")[i+1];
                if(persentage <= 20){
                    tag.style.backgroundColor = "red";
                    tag.style.color = "white";
                }else if(persentage <= 50){
                    tag.style.backgroundColor = "orange";
                    tag.style.color = "white";
                }
            }
            suggest_text("Item_name","autosuggest_list",itemsArray,"rgb(218, 218, 218)",()=>{
            },leftQuantity,ids,140);
        },true);
        searchContent = getClass("itemName");
        searchitems = $("searchitems");
        searchitems.oninput = ()=>{
            let str = searchitems.value.toLowerCase();
            
            for (let i = 0; i < searchContent.length; i++) {
                if(searchContent[i].innerHTML.toLowerCase().indexOf(str) != -1){
                    searchContent[i].parentNode.style.display = "";
                }else{
                    searchContent[i].parentNode.style.display = "none";
                }
            }
        }
        searchitems.onblur = ()=> {
            searchitems.value = "";
        }
let actionupdate = $("actionupdate");
let action = $("action");
let itemName = $("Item_name");
let itemQuantity = $("quantity");
let QuantityUnit = $("quantityunit");
let itemGrate = $("PurchaseRate");
let itemHSrate = $("HoleSaleRate");
let itemNRate = $("NormalRate");
let totalAmount = $("totalAmount");


searchContent = getClass("itemName");
searchitems = $("searchitems");
searchitems.oninput = ()=>{
    let str = searchitems.value.toLowerCase();
    
    for (let i = 0; i < searchContent.length; i++) {
        if(searchContent[i].innerHTML.toLowerCase().indexOf(str) != -1){
            searchContent[i].parentNode.style.display = "";
        }else{
            searchContent[i].parentNode.style.display = "none";
        }
    }
}
searchitems.onblur = ()=> {
    searchitems.style.color = "#00000000";
}
searchitems.onfocus = ()=> {
    searchitems.style.color = "#333";
}

RequestPhp("GET",user.dir+"/temp3.xml",(x)=>{
    doc = x.responseXML;
    let root = doc.getElementsByTagName("item");
    for (let i = 0; i < root.length; i++) {
        let nameitem = root[i].getAttributeNode("name").nodeValue; 
        let Quntity = parseFloat(root[i].getElementsByTagName("quntity")[0].innerHTML);
        let Unit = root[i].getElementsByTagName("unit")[0].innerHTML;
        let GRate = parseFloat(root[i].getElementsByTagName("grate")[0].innerHTML);

        updatetable.innerHTML += "<th class='left'>"+(i+1)+"</th><td class='dsp itemName' title='Right click to show options'>"+
        nameitem+"</td><td>"+Quntity+Unit+"</td><td>"+
        GRate+"</td><td>"+(Quntity*GRate).toLocaleString()+"</td>";
    }
    totalAmount.value = parseFloat(doc.getElementsByTagName("total")[0].innerHTML).toLocaleString();
},true);

contextstrip("updatetable",()=>{
    if(contextvalue != ""){
        action.hide();actionupdate.show();
        let delet = updatetable.getElementsByTagName("tr")[contextvalue];
        subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));

        RequestPhp("GET",user.dir+"/temp3.xml",(x)=>{
            doc = x.responseXML;
            let root = doc.getElementsByTagName("item");

            itemName.value = decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML);
            for (let i = 0; i < root.length; i++) {
                if(root[i].getAttributeNode("name").nodeValue == itemName.value){
                    let Nrate = parseFloat(root[i].getElementsByTagName("prate")[0].innerHTML);
                    let Unit = root[i].getElementsByTagName("unit")[0].innerHTML;
                    let HsRate = parseFloat(root[i].getElementsByTagName("hsrate")[0].innerHTML);

                    QuantityUnit.value = Unit;
                    itemHSrate.value = HsRate;
                    itemNRate.value = Nrate;
                }
            }
            
        },true);

        itemQuantity.value = delet.getElementsByTagName("td")[1].innerHTML;
        itemGrate.value = delet.getElementsByTagName("td")[2].innerHTML;

        att = document.createAttribute("disabled");
        itemName.setAttributeNode(att);
    }
},()=>{
    if(contextvalue != ""){
        if (confirm("Are you sure to delete this item") == true){
            let delet = updatetable.getElementsByTagName("tr")[contextvalue];
            let subAmount = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
            updatetable.removeChild(delet);
            
            let dsp = updatetable.getElementsByClassName("left");
            for (let j = 0; j < dsp.length; j++) {
                dsp[j].innerHTML = j;
            }
            totalAmount.value = (parseFloat(totalAmount.value.replace(/,/g,""))-subAmount).toLocaleString();

            RequestPhp("GET", `${reqPhp}req=deletemissitem`+
            `&Iname=${encodeString(decodeHTMLEntities(delet.getElementsByTagName("td")[0].innerHTML))}&total=${parseFloat(totalAmount.value.replace(/,/g,""))}`
            ,(x)=>{},true);
            
            dsp[0].innerHTML = "";
            contextvalue = "";
            subAmount = 0;
            action.show();actionupdate.hide();
            itemName.removeAttribute("disabled");
            QuantityUnit.removeAttribute("disabled");

        }
    }
});

itemName.onblur = ()=>{
    RequestPhp("GET",user.dir+"/items.xml",(x)=>{
        check1 = 0;
        doc = x.responseXML;
        let root = doc.getElementsByTagName("item");
        for (let i = 0; i < root.length; i++) {
            if(root[i].getAttributeNode("name").nodeValue == itemName.value){
                QuantityUnit.value = root[i].getElementsByTagName("unit")[0].innerHTML;
                itemGrate.value = root[i].getElementsByTagName("grate")[0].innerHTML;
                itemHSrate.value = root[i].getElementsByTagName("hsrate")[0].innerHTML;
                itemNRate.value = root[i].getElementsByTagName("prate")[0].innerHTML;
                check1 = 1;
            }
        }
        
        if(check1 == 1){
            let att = document.createAttribute("disabled");
            QuantityUnit.setAttributeNode(att);
        }
    },true);
}

actionupdate.onclick = ()=>{

    if(itemName.value.length == 0){
        notify("Item name required");
        itemName.style.border = "1px solid red";
    }else if(itemQuantity.value <= 0){
        notify("Quantity required");
        itemQuantity.style.border = "1px solid red"
    }else if(QuantityUnit.value.length == 0){
        notify("Quantity type required");
        QuantityUnit.style.border = "1px solid red"
    }else if(itemGrate.value <= 0){
        notify("Gross rate required");
        itemGrate.style.border = "1px solid red"
    }else if(itemHSrate.value <= 0){
        itemHSrate.value = 0;
    }else if(itemNRate.value <= 0){
        itemNRate.value = 0;
    }else{
        let edit = updatetable.getElementsByTagName("tr")[contextvalue];

        edit.getElementsByTagName("td")[0].innerHTML = itemName.value;
        edit.getElementsByTagName("td")[1].innerHTML = itemQuantity.value+QuantityUnit.value;
        edit.getElementsByTagName("td")[2].innerHTML = itemGrate.value;
        edit.getElementsByTagName("td")[3].innerHTML = (itemQuantity.value*itemGrate.value).toLocaleString();

        total = (parseFloat(totalAmount.value.replace(/,/g,"")-subAmount)+
        parseFloat(itemQuantity.value*itemGrate.value)).toLocaleString();
        totalAmount.value = total;

        RequestPhp("GET", `${reqPhp}req=updatemissitem&Iname=${encodeString(itemName.value)}`+
        `&Iqun=${itemQuantity.value}&Qunit=${encodeString(QuantityUnit.value)}&Grate=${itemGrate.value}`+
        `&Hsrate=${itemHSrate.value}&Prate=${itemNRate.value}&invoice=${user.pInvoice()}&total=${total.replace(/,/g,"")}`,
        (x)=>{
            notify(x.responseText);
        },true);
        
        contextvalue = "";
        subAmount = 0;
        action.show();actionupdate.hide();
        itemQuantity.value = "";
        itemName.removeAttribute("disabled");
    }
}
action.onclick = ()=>{
    let dsp = getClass("dsp");
    samename = false;
    for (let i = 0; i < dsp.length; i++) {
        if(itemName.value.toLowerCase() == dsp[i].innerHTML.toLowerCase()){
            samename = true;
        }
    }
    if(samename == true){
        notify("You already add this item");
        itemName.style.border = "1px solid red";
    }else if(itemName.value.length == 0){
        notify("Item name required");
        itemName.style.border = "1px solid red";
    }else if(itemQuantity.value <= 0){
        notify("Quantity required");
        itemQuantity.style.border = "1px solid red"
    }else if(QuantityUnit.value.length == 0){
        notify("Quantity type required");
        QuantityUnit.style.border = "1px solid red"
    }else if(itemGrate.value <= 0){
        notify("Gross rate required");
        itemGrate.style.border = "1px solid red";
    }else if(itemHSrate.value <= 0){
        notify("Hole sale rate required");
        itemHSrate.style.border = "1px solid red";
    }else if(itemNRate.value <= 0){
        notify("Normal sale rate required");
        itemNRate.style.border = "1px solid red";
    }else{
        updatetable.innerHTML += "<tr><th class='left'>"+(updatetable.getElementsByTagName("tr").length+1)+"</th><td class='dsp itemName'>"+
        itemName.value+"</td><td>"+itemQuantity.value+QuantityUnit.value+"</td><td>"+
        itemGrate.value+"</td><td>"+(itemQuantity.value*itemGrate.value).toLocaleString()+"</td></tr>";

        let total = 0;
        if(totalAmount.value.length == 0){
            total = (itemQuantity.value*itemGrate.value).toLocaleString();
        }else{
            total = (parseFloat(totalAmount.value.replace(/,/g,""))+
            parseFloat(itemQuantity.value*itemGrate.value)).toLocaleString();
        }

        totalAmount.value = total;

        RequestPhp("GET", `${reqPhp}req=addmissitem&Iname=${encodeString(itemName.value)}&dir=${user.dir}`+
        `&Iqun=${itemQuantity.value}&Qunit=${QuantityUnit.value}&Grate=${itemGrate.value}`+
        `&Hsrate=${itemHSrate.value}&Prate=${itemNRate.value}&invoice=${user.pInvoice()}&total=${total.replace(/,/g,"")}`,
        (x)=>{
            notify(x.responseText);
        },true);

        for (let i = 0; i < searchContent.length; i++) {
            searchContent[i].parentNode.style.display = "";
        }

        itemQuantity.value = "";
        QuantityUnit.removeAttribute("disabled");
    }
}

let updateitems = $("updateitems");
updateitems.onclick = ()=>{
    let items = $("updatetable").getElementsByTagName("tr");
    message = "Please make sure your all of data is fully currect that you entered";
    if(items.length < 2){
        notify("Please add at least 1 item before start");
    }else{
        if(confirm(message) == true){
            RequestPhp("GET", `${stPhp}req=updateitems`,
                (x)=>{ notify(x.responseText);
                },true);
        }
    }
}

    },true);
}

//---------------------------------------------------------------
// Customer Company function
function openCC(){
    user = new getdata();
    RequestPhp("GET", "CC.html",(x)=>{
        openWindow("Customer/Companies",x.responseText);
        tabcontrol(["customerBtn","companiesBtn"],["customerTab","companiesTab"]," CCactive");
        holdertodiv();

        let cusDetail = $("customerDetail");
        let comDetail = $("companyDetail");
        $("Addcus").onclick =()=> cusDetail.show();
        $("Addcom").onclick =()=> comDetail.show();
        let clos = getClass("close");
        for (let i = 0; i < clos.length; i++) {
            clos[i].onclick = ()=> {cusDetail.hide(); comDetail.hide()}
        } 

        
        let addCustomer = $("addCustomer");
        let addCompany = $("addCompany");

        let allinput = getTag("input");

        window.oninput = ()=>{
            for (let i = 0; i < allinput.length; i++) {
                allinput[i].plok();
            }
        }

        addCustomer.onclick = ()=>{
        
            let Comtable = $("custable");
            cusName = $("CusName");
            cusNum = $("CusNum"); 
            cusAdd = $("Cusadd");
            cusLimit =$("Cuslimit"); 
            cusCredit = $("CusCredit");

            bool = true;
            
            if(cusLimit.value != 0){
                if(cusNum.value.length == 0){
                    cusNum.plerror("Number requried for allow credit");
                    bool = false;
                }else if(cusAdd.value.length == 0){
                    cusAdd.plerror("Shop address requried for allow credit");
                    bool = false;
                }
            }else if(cusCredit.value != 0){
                if(cusNum.value.length == 0){
                    cusNum.plerror("Number requried for allow credit");
                    bool = false;
                }else if(cusAdd.value.length == 0){
                    cusAdd.plerror("Shop address requried for allow credit");
                    bool = false;
                }
            }

            if(cusName.value.length == 0){
                cusName.plerror("Please provide customer name");
            }else {
                if(cusLimit.value == ""){
                    cusLimit.value = 0;
                }
                if(cusCredit.value == ""){
                    cusCredit.value = 0;
                }
                n = "";
                if(cusNum.value.length = 0){
                    n= "None";
                }else{
                    n = cusNum.value;
                }
                if(bool == true){
                    if(confirm("are you sure to save") == true){
                        RequestPhp("GET", `${reqPhp}req=addCus`+
                        `&name=${encodeString(cusName.value)}&number=${encodeString(cusNum.value)}&address=${encodeString(cusAdd.value)}&limit=${cusLimit.value}&CC=${cusCredit.value}`
                        ,(x)=>{
                            if(x.responseText == "0"){
                                notify("Name aleary exist please change name");
                            }else{
                                notify("Created successfully","ok");
                            }
                            d = new Date();
                            date = d.getDate() +" "+months[d.getMonth()]+" "+d.getFullYear();
                            let i = Comtable.getElementsByTagName("tr").length;
                
                            Comtable.innerHTML += `<tr><th>${i}</th><td>${date}</td>`+
                        `<td class="dsp" id="${i-1}">${cusName.value}</td><td>${n}</td><td>${cusCredit.value}</td><td>${cusLimit.value}</td></tr>`
                        },true);
                    }
                }
            };
        }
        addCompany.onclick = ()=>{
            
            let Comtable = $("Comtable");
            cusName = $("ComName");
            cusNum = $("ComNum"); 
            cusAdd = $("Comadd"); 
            cusCredit = $("ComCredit");

            if(cusName.value.length == 0){
                cusName.plerror("Please provide customer name");
            }else {
                if(cusCredit.value == ""){
                    cusCredit.value = 0;
                }
                n = "";
                if(cusNum.value.length = 0){
                    n= "None";
                }else{
                    n = cusNum.value;
                }
                if(confirm("are you sure to save") == true){
                    RequestPhp("GET", `${reqPhp}req=addCom`+
                    `&name=${encodeString(cusName.value)}&number=${encodeString(cusNum.value)}&address=${encodeString(cusAdd.value)}&CC=${cusCredit.value}`
                    ,(x)=>{
                        if(x.responseText == "0"){
                            notify("Name aleary exist please change name");
                        }else{
                            notify("Created successfully","ok");
                        }
                        d = new Date();
                        date = d.getDate() +" "+months[d.getMonth()]+" "+d.getFullYear();
                        let i = Comtable.getElementsByTagName("tr").length;
                        Comtable.innerHTML += `<tr><th>${i}</th><td>${date}</td>`+
                    `<td class="dsp" id="${i-1}">${cusName.value}</td><td>${n}</td><td>${cusCredit.value}</td></tr>`
                    },true);
                }
            }
        }

        if(user.customer() != 0){
            let Comtable = $("custable");
            RequestPhp("GET",user.dir+"/customers.xml",(x)=>{
                doc = x.responseXML;
                
                let root = doc.getElementsByTagName("customer");
                for (let i = 0; i < root.length; i++) {
                    items = root[i].getAttributeNode("name").nodeValue;
                    id = root[i].getAttributeNode("id").nodeValue;
                    date = root[i].getAttributeNode("day").nodeValue +" "+ months[parseFloat(root[i].getAttributeNode("mon").nodeValue)]+
                    " "+ root[i].getAttributeNode("year").nodeValue;

                    number = "";
                    if(root[i].getElementsByTagName("number")[0].childNodes[0] != undefined){
                        number = root[i].getElementsByTagName("number")[0].innerHTML;
                    }else{
                        number = "None";
                    }
                    address = "";
                    if(root[i].getElementsByTagName("address")[0].childNodes[0] != undefined){
                        address = root[i].getElementsByTagName("address")[0].innerHTML;
                    }else{
                        address = "None";
                    }
                    TCA = root[i].getElementsByTagName("TCA")[0].innerHTML;
                    climit = root[i].getElementsByTagName("climit")[0].innerHTML
                    
                    Comtable.innerHTML += `<tr><th>${i+1}</th><td>${date}</td>`+
                    `<td class="dsp" id="${id}">${items}</td><td>${number}</td><td>${TCA}</td><td>${climit}</td></tr>`
                }
            },true);
        }

        if(user.companies() !== 0){
            let Comtable = $("Comtable");
            RequestPhp("GET",user.dir+"/companies.xml",(x)=>{
                doc = x.responseXML;
                
                let root = doc.getElementsByTagName("company");
                for (let i = 0; i < root.length; i++) {
                    items = root[i].getAttributeNode("name").nodeValue;
                    id = root[i].getAttributeNode("id").nodeValue;
                    date = root[i].getAttributeNode("day").nodeValue +" "+ months[parseFloat(root[i].getAttributeNode("mon").nodeValue)]+
                    " "+ root[i].getAttributeNode("year").nodeValue;

                    number = "";
                    if(root[i].getElementsByTagName("number")[0].childNodes[0] != undefined){
                        number = root[i].getElementsByTagName("number")[0].innerHTML;
                    }else{
                        number = "None";
                    }
                    address = "";
                    if(root[i].getElementsByTagName("address")[0].childNodes[0] != undefined){
                        address = root[i].getElementsByTagName("address")[0].innerHTML;
                    }else{
                        address = "None";
                    }
                    TCA = root[i].getElementsByTagName("TCA")[0].innerHTML;
                    
                    Comtable.innerHTML += `<tr><th>${i+1}</th><td>${date}</td>`+
                    `<td class="dsp" id="${id}">${items}</td><td>${number}</td><td>${TCA}</td></tr>`
                }
            },true);
        }

        updCompany = $("updCompany");
        subAmount2 = 0; 

        contextstrip("Comtable",()=>{
            comtable = $("Comtable")
            cusName = $("ComName");
            cusNum = $("ComNum"); 
            cusAdd = $("Comadd");
            cusCredit = $("ComCredit");

            if(contextvalue != ""){ 

                    
                }
            },()=>{
                // if (confirm("Are you sure to edit this item") == true){
                //     addCompany.hide();updCompany.show();comDetail.show();
                //     let delet = comtable.getElementsByTagName("tr")[contextvalue];
                //     subAmount2 = parseFloat(delet.getElementsByTagName("td")[3].innerHTML);

                //     RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
                //         doc = x.responseXML;
                //         let root = doc.getElementsByTagName("company");
                //         for (let i = 0; i < root.length; i++) {
                //             if(root[i].getAttributeNode("name").nodeValue == delet.getElementsByTagName("td")[1].innerHTML){
                //                 let add = root[i].getElementsByTagName("address")[0].innerHTML;

                //                 cusAdd.value = add;
                //             }
                //         }
                //     },true);

                //     cusName.value = delet.getElementsByTagName("td")[1].innerHTML;
                //     cusNum.value = delet.getElementsByTagName("td")[2].innerHTML;
                //     cusCredit.value = delet.getElementsByTagName("td")[3].innerHTML;
                //     let att = document.createAttribute("disabled");
                //     cusName.setAttributeNode(att);
                //}
            },"View","Edit");

        // updCompany.onclick = ()=>{
        //     let Comtable = $("Comtable");
        //     cusName = $("ComName");
        //     cusNum = $("ComNum"); 
        //     cusAdd = $("Comadd"); 
        //     cusCredit = $("ComCredit");
        //     TCAcom = $("totalCreditCompanies");

        //     if(cusName.value.length == 0){
        //         cusName.plerror("Please provide company name");
        //     }else if(cusCredit.value == 0){
        //         cusCredit.plerror("Please add credit amount");
        //     } else {
        //         n = "";
        //         if(cusNum.value.length = 0){
        //             n= "None";
        //         }else{
        //             n = cusNum.value;
        //         }
        //         if(confirm("are you sure to save") == true){
        //             let edit = Comtable.getElementsByTagName("tr")[contextvalue];

        //             edit.getElementsByTagName("td")[1].innerHTML = cusName.value;
        //             edit.getElementsByTagName("td")[2].innerHTML = n;
        //             edit.getElementsByTagName("td")[3].innerHTML = cusCredit.value;


        //             total = ((parseFloat(TCAcom.value)-subAmount2)+
        //             parseFloat(cusCredit.value));
        //             TCAcom.value = total;

        //             RequestPhp("GET", `${stPhp}req=updatecom&cusname=${encodeString(cusName.value)}`+
        //             `&CC=${cusCredit.value}&num=${encodeString(cusNum.value)}&add=${encodeString(cusAdd.value)}&total=${total}`,
        //             (x)=>{},true)

        //             cusName.removeAttribute("disabled");
                    
        //             contextvalue = "";
        //             subAmount2 = 0;
        //             addCompany.show();updCompany.hide();comDetail.hide();
        //             cusName.value = "";cusAdd.value = "";cusNum.value = ""; cusCredit.value = "";
        //         }
        //     }
        // }

        // updCustomer = $("updCustomer");
        // subAmount3 = 0;

        // contextstrip("custable",()=>{
        //     let Comtable = $("custable");
        //     cusName = $("CusName");
        //     cusNum = $("CusNum"); 
        //     cusAdd = $("Cusadd");
        //     cusLimit =$("Cuslimit"); 
        //     cusCredit = $("CusCredit");

        //     if(contextvalue != ""){

        //         if (confirm("Are you sure to edit this item") == true){
        //             addCustomer.hide();updCustomer.show();cusDetail.show();
        //             let delet = Comtable.getElementsByTagName("tr")[contextvalue];
        //             subAmount3 = parseFloat(delet.getElementsByTagName("td")[3].innerHTML);

        //             RequestPhp("GET",user.dir+"/temp.xml",(x)=>{
        //                 doc = x.responseXML;
        //                 let root = doc.getElementsByTagName("customer");
        //                 for (let i = 0; i < root.length; i++) {
        //                     if(root[i].getAttributeNode("name").nodeValue == delet.getElementsByTagName("td")[1].innerHTML){
        //                         let add = root[i].getElementsByTagName("address")[0].innerHTML;

        //                         cusAdd.value = add;
        //                     }
        //                 }
        //             },true);

        //             cusName.value = delet.getElementsByTagName("td")[1].innerHTML;
        //             cusNum.value = delet.getElementsByTagName("td")[2].innerHTML;
        //             cusCredit.value = delet.getElementsByTagName("td")[3].innerHTML;
        //             cusLimit.value = delet.getElementsByTagName("td")[4].innerHTML;
        //             let att = document.createAttribute("disabled");
        //             cusName.setAttributeNode(att);
        //         }
        //     }
        // },()=>{
        //     if(contextvalue != ""){
        //         Comtable = $("custable");
        //         cusName = $("CusName");
        //         TCAcom = $("totalCreditCustomers");
        //         if (confirm("Are you sure to delete this company") == true){
        //             let delet = Comtable.getElementsByTagName("tr")[contextvalue];
        //             let subAmount3 = parseFloat(delet.getElementsByTagName("td")[3].innerHTML.replace(/,/g,""));
        //             Comtable.removeChild(delet);
        //             let dsp = Comtable.getElementsByClassName("left");
        //             for (let j = 0; j < dsp.length; j++) {
        //                 dsp[j].innerHTML = j;
        //             }
        //             TCAcom.value = (parseFloat(TCAcom.value)-subAmount3);

        //             RequestPhp("GET", `${stPhp}req=deleteCusTemp`+
        //             `&cusname=${encodeString(delet.getElementsByTagName("td")[1].innerHTML)}&total=${TCAcom.value}`
        //             ,(x)=>{},true);
                    
        //             dsp[0].innerHTML = "";
        //             cusName.removeAttribute("disabled");
        //             contextvalue = "";
        //             subAmount3 = 0;
        //             addCompany.show();updCompany.hide();
        //         }
        //     }
        // });

        // updCustomer.onclick = ()=>{
        //     let Comtable = $("custable");
        //     cusName = $("CusName");
        //     cusNum = $("CusNum"); 
        //     cusAdd = $("Cusadd");
        //     cusLimit =$("Cuslimit"); 
        //     cusCredit = $("CusCredit");
        //     let TCAcom = $("totalCreditCustomers");

        //     bool = true;
            
        //     if(cusLimit.value != 0){
        //         if(cusAdd.value.length == 0){
        //             cusAdd.plerror("Shop address requried for allow credit");
        //             bool = false;
        //         }
        //     }else if(cusCredit.value != 0){
        //         if(cusAdd.value.length == 0){
        //             cusAdd.plerror("Shop address requried for allow credit");
        //             bool = false;
        //         }
        //     }

        //     if(cusName.value.length == 0){
        //         cusName.plerror("Please provide customer name");
        //     }else if(cusCredit.value <= 0){
        //         cusName.plerror("Please add credit amount");
        //     } else {
        //         if(cusLimit.value == ""){
        //             cusLimit.value = 0;
        //         }
        //         n = "";
        //         if(cusNum.value.length = 0){
        //             n= "None";
        //         }else{
        //             n = cusNum.value;
        //         }
        //         if(bool == true){
        //             if(confirm("are you sure to save") == true){
        //                 let edit = Comtable.getElementsByTagName("tr")[contextvalue];

        //                 edit.getElementsByTagName("td")[1].innerHTML = cusName.value;
        //                 edit.getElementsByTagName("td")[2].innerHTML = n;
        //                 edit.getElementsByTagName("td")[3].innerHTML = cusCredit.value;
        //                 edit.getElementsByTagName("td")[4].innerHTML = cusLimit.value;

        //                 total = ((parseFloat(TCAcom.value)-subAmount3)+
        //                 parseFloat(cusCredit.value));
        //                 TCAcom.value = total;

        //                 RequestPhp("GET", `${stPhp}req=updatecus&cusname=${encodeString(cusName.value)}&climit=${cusLimit.value}`+
        //                 `&CC=${cusCredit.value}&num=${encodeString(cusNum.value)}&add=${encodeString(cusAdd.value)}&total=${total}`,
        //                 (x)=>{},true)

        //                 cusName.removeAttribute("disabled");
                        
        //                 contextvalue = "";
        //                 subAmount3 = 0;
        //                 addCustomer.show();updCustomer.hide();cusDetail.hide();
        //                 cusName.value = "";cusAdd.value = "";cusNum.value = ""; cusCredit.value = "";cusLimit.value = "";
        //             }
        //         }
        //     }
        // }

    },true);
}

//---------------------------------------------------------------
// employees function
function openEmployees(){
    RequestPhp("GET", "employ.html",(x)=>{
        openWindow("Employ",x.responseText);
        let empDetail = $("EmpDetail");
        $("AddEmp").onclick =()=> empDetail.show();
        holdertodiv();
        let clos = getClass("close");
        for (let i = 0; i < clos.length; i++) {
            clos[i].onclick = ()=> {empDetail.hide();}
        }
    },true);
}

//---------------------------------------------------------------
// Records function
function openRecords(){
    user = new getdata();
    RequestPhp("GET", "records.html",(x)=>{
        openWindow("Records",x.responseText);
        thisday = d.getDate();
        thismonth = d.getMonth();
        thisyear = d.getFullYear();
        getdTdetail([thisday,thisday-1],thismonth,thisyear);
        
        $("rweek").onclick = ()=>{
            removeactive();
            $("rweek").className = "b-active";
            getdTdetail([thisday,thisday-8],thismonth,thisyear);
            daytext($("rweek").value);
        }

        $("rmonth").onclick = ()=>{
            removeactive();
            $("rmonth").className = "b-active";
            d2 = new Date(thisyear,thismonth-1,thisday);
            days = parseInt((d-d2)/86400000);
            getdTdetail([thisday,thisday-days],thismonth,thisyear);
            daytext($("rmonth").value);
        }
        $("rtoday").onclick = ()=>{
            removeactive();
            $("rtoday").className = "b-active";
            getdTdetail([thisday,thisday-1],thismonth,thisyear);
            daytext($("rtoday").value);
        }
        $("ryear").onclick = ()=>{
            removeactive();
            $("ryear").className = "b-active";
            getdTdetail([thisday,thisday-366],thismonth,thisyear);
            daytext($("ryear").value);
        }
        $("rlifetime").onclick = ()=>{
            removeactive();
            $("rlifetime").className = "b-active";
            days = 0;
            RequestPhp("GET", user.dir+"/payments.xml",(y)=>{
                doc = y.responseXML;
                root = doc.querySelector("payment");
                lyear = root.getAttributeNode("year").nodeValue;
                lmonth = root.getAttributeNode("mon").nodeValue;
                lday = root.getAttributeNode("day").nodeValue;
                d2 = new Date(lyear,lmonth-1,lday);
                days = parseInt((d-d2)/86400000);
            },false);
            getdTdetail([thisday,thisday-(days+2)],thismonth,thisyear);
            daytext($("rlifetime").value);
        }
        
        
        function removeactive(){
            main = BBody.querySelector(".buttons");
            allbtn = main.querySelectorAll("button");
            for (let i = 0; i < allbtn.length; i++) {
                allbtn[i].className = allbtn[i].className.replace("active","");
            }
        }
        function daytext(x){
            all = BBody.querySelectorAll(".days");
            for (let i = 0; i < all.length; i++) {
                all[i].innerHTML = x;
            }
        }
        function getdTdetail(dy,mon,yr){
            RequestPhp("GET", user.dir+"/payments.xml",(y)=>{
                doc = y.responseXML;
                
                var TIA=0,ti=0,tpi=0,TCAcom=0,TCAcus=0;TNC=0;Ts=0,Tp=0,TP=0;
                for (let day = dy[0]; day > dy[1]; day--) {
                    var cmon = mon,cyear = yr;
                    cday = day;
                    if(cday <= 0){
                        dt = new Date(yr,mon,0);
                        dt.setDate(dt.getDate() + cday);
                        cday = dt.getDate();
                        cmon = dt.getMonth();
                        cyear = dt.getFullYear();
                    }
                    today = doc.querySelectorAll("payment[day='"+zero(cday)+"'][mon='"+zero(cmon+1)+"'][year='"+cyear+"']");
                    for (let i = 0; i < today.length; i++) {
                        if(today[i] != null){
                            if(today[i].getAttributeNode("way") != null){
                                if(today[i].getAttributeNode("way").nodeValue == "invoice"){
                                    ti +=1;
                                    Ts += parseFloat(today[i].querySelector("whatsnew").querySelector("TIA").innerHTML.replace("-",""))+
                                    parseFloat(today[i].querySelector("whatsnew").querySelector("profit").innerHTML)+
                                    parseFloat(today[i].querySelector("whatsnew").querySelector("discount").innerHTML);
                                }
                                if(today[i].getAttributeNode("way").nodeValue == "pinvoice"){
                                    tpi +=1;
                                    RequestPhp("GET", user.dir+"/pinvoice.xml",(p)=>{
                                        doc2 = p.responseXML;
                                        tpa = doc2.querySelector("pinvoice[number='"+today[i].getAttributeNode("pinvoice").nodeValue+"']");
                                        Tp += parseFloat(tpa.querySelector("total").innerHTML);
                                    },false);
                                }
                            }
                            if(today[i].getAttributeNode("type").nodeValue == "start"){
                                TCAcus += parseFloat(today[i].querySelector("whatsnew").querySelector("TCAcus").innerHTML);
                                TCAcom += parseFloat(today[i].querySelector("whatsnew").querySelector("TCAcom").innerHTML);
                            }
                            if(today[i].getAttributeNode("type").nodeValue == "received"){
                                TCAcus += parseFloat(today[i].querySelector("whatsnew").querySelector("TCAcus").innerHTML);
                            }
                            if(today[i].getAttributeNode("type").nodeValue == "sent"){
                                TCAcom += parseFloat(today[i].querySelector("whatsnew").querySelector("TCAcom").innerHTML);
                            }
                            TNC += parseFloat(today[i].querySelector("whatsnew").querySelector("TNC").innerHTML);
                            TP += parseFloat(today[i].querySelector("whatsnew").querySelector("profit").innerHTML);
                        }
                    }
                    if(today[today.length-1] != null){
                        TIA = parseFloat(today[today.length-1].querySelector("TIA").innerHTML);
                    }
                }
                
                $("TIA").innerHTML = TIA;
                $("TInv").innerHTML = ti;
                $("TPinv").innerHTML = tpi;
                $("TCAcus").innerHTML = parseInt(TCAcus);
                $("TCAcom").innerHTML = parseInt(TCAcom);
                $("TNC").innerHTML = parseInt(TNC);
                $("TPA").innerHTML = parseInt(Tp);
                $("TSA").innerHTML = parseInt(Ts);
                $("profit").innerHTML = parseInt(TP);

            },true);
        }
    },true);
}

//---------------------------------------------------------------
// Profile function
function openProfile(){
    user = new getdata();
    RequestPhp("GET","profile.php", (x)=>{
        openWindow("Profile", x.responseText);
        let Bname = $("Bname");
        let Cdate = $("date");
        let Yname = $("name");
        let email = $("email");
        let num = $("num");
        let adrs = $("address");
        let edit = getClass("edit");
        let Uname = $("Uname");
        let logoStatus = $("logo_status");

        Bname.innerHTML = user.BusinessName;
        Cdate.innerHTML = user.dateCreated;
        Yname.innerHTML = user.username;
        email.innerHTML = user.userEmail;
        num.innerHTML = user.userNumber[0];
        adrs.innerHTML = user.userAddress;
        Uname.innerHTML = cookies;

        if(user.logoStatus != 0){
            logoStatus.checked = true;
        }
        logoStatus.onchange=()=>{
            if(logoStatus.checked == true){
                RequestPhp("GET", `${reqPhp}req=logoStatus&status=1`,(x)=>{
                    if(x.responseText == 1){
                        notify("logo shown on invoive","ok")
                    }
                },true);
            }else{
                RequestPhp("GET", `${reqPhp}req=logoStatus&status=0`,(x)=>{
                    if(x.responseText == 1){
                        notify("logo Hidden on invoive" , "ok")
                    }
                },true);
            }
        }

        tabcontrol(["updatePassword","updateUname","addMoreNumber"],
        ["passwordContainer","unameContainer","numberContainer"]," active1");

        $("changeUname").onclick = ()=>{
            let Uname = $("newUname").value
            if(Uname == "" || Uname.length <= 3){
                notify("Username is to short");
            }else{
                if(confirm("Are you sure to change username")==true){
                    RequestPhp("GET", `${reqPhp}req=ChUname&newUname=${encodeString(Uname)}`,(x)=>{
                        if(x.responseText == 1){
                            relod();
                        }else {
                            notify("username already exist"+x.responseText);
                        }
                    },true)
                }
            }
        }

        $("oldnum").value = user.userNumber[0];
        let num2 = $("num2");
        let num3 = $("num3");
        if(user.userNumber[1] != undefined){
            num2.value = user.userNumber[1];
        }
        if(user.userNumber[2] != undefined){
            num3.value = user.userNumber[2];
        }
        $("addNum").onclick = ()=>{
            if(num2.value == user.userNumber[1] && num3.value == user.userNumber[2]){
                notify("Nothing any change happan");
            }else{
                RequestPhp("GET", `${reqPhp}req=addnum&num2=${encodeString(num2.value)}&num3=${encodeString(num3.value)}`,(x)=>{
                    if(x.responseText == 1){
                        notify("Numbers updated successfully", "ok");
                    }else {
                        notify(x.responseText);
                    }
                },true)
            }
        }

        let change_pass = $('pass');
        change_pass.onclick = ()=>{
            let oldpass = $("oldPass").value;
            let newpass = $("newPass").value;
            let rpass = $("rewritePass").value;
            if(oldpass == "" || newpass == ""){
                notify("password look like empty");
            }else if(newpass != rpass){
                notify("password 1 & 2 not match");
            }else{
                RequestPhp("GET", `${reqPhp}req=passupdate&pass=${encodeString(oldpass)}&newpass=${encodeString(newpass)}`,(x)=>{
                    if(x.responseText == 0){
                        notify("You old password is wrong");
                    }else{
                        notify("Password change successfully", "ok");
                    }
                },true)
            }
        }

        let Slogo = $("Slogo");
        let upload = $("upload");
        let Logo = $("logo");
        Logo.style.backgroundImage = "url("+user.logo+")";

        upload.addEventListener("click",()=>{
            Slogo.click();
        });
        Slogo.onchange = (e)=>{
            let u = new getdata();
            if(confirm("Do you want to change logo")==true){
                let File = e.target.files[0];
                Filename = "";
                blob = URL.createObjectURL(File);
                $("userdir").value = user.dir;

                if(File){
                    let form = q('form');
                    uploadRec = new XMLHttpRequest();
                    uploadRec.onreadystatechange = function(){
                        if(this.responseText == 2){
                            notify("Success fully updated" , "ok");
                        }else if(this.responseText == 1){
                            notify("Same name file alredy exsit" , "");
                        }else if(this.responseText == 0){
                            notify("File size to large greate then 5Mb" , "");
                        }else if(this.responseText == -1){
                            notify("File not image or unsupported file" , "");
                        }else {
                            notify("Unknown error" + this.responseText , "");
                        }
                    }
                    uploadRec.upload.onprogress = function(e) {
                        console.log(e);
                    }
                    uploadRec.open("POST","upload.php");
                    let formData = new FormData(form);
                    uploadRec.send(formData);
                }
                Logo.style.backgroundImage = "url("+blob+")";
                req = "change_Logo&file="+u.logo;
                RequestPhp("GET",reqPhp+"req="+req+"&logo="+user.dir+"/"+encodeString(File.name)+"&Uname="+cookies,()=>{
                },true);
            }
        }
        
        for (let i = 0; i < edit.length; i++) {
            edit[i].addEventListener('click',()=>{
                y = edit[i].parentNode.getElementsByTagName("td")[1];
                let id = y.getAttributeNode("id").value;
                let val = y.innerHTML;
                if(y.childNodes[0].nodeName == "INPUT"){
                    if(confirm("Are you sure to change")== true){
                        let val = y.getElementsByTagName("input")[0].value;
                        let id = y.getElementsByTagName("input")[0].getAttributeNode("id").value;
                        RequestPhp("GET", reqPhp+"req=update&update="+encodeString(id)+"&value="+encodeString(val)+"&Uname="+cookies,
                        (x)=>{y.innerHTML = x.responseText;},true);
                        edit[i].style.backgroundImage = "";
                        $("reload").removeAttribute("disabled");
                        notify("Changed successfully","ok");
                    }else{
                        edit[i].style.backgroundImage = "";
                        y.innerHTML = y.getElementsByTagName("input")[0].value;;
                    }
                }else{
                    y.innerHTML = "<input typr='text' id ="+id+" value = "+val+">";
                    edit[i].style.backgroundImage = "Url('save.ico')";
                }
            })
        }

        let inv = q_(".previewinv");
        let cowindow = q(".cowindow");
        let viewer = q(".viewer");
        let setinv = q_(".setinv");
        let invname = q_(".invname");
        cowindow.querySelectorAll("a")[0].onclick = ()=>{cowindow.hide();}
        
        for (let i = 0; i < inv.length; i++) {
            inv[i].onclick = ()=>{
                invoice = q_(".invoice");
                viewer.innerHTML = invoice[i].innerHTML;
                cowindow.show();
            }
            setinv[i].onclick = ()=>{
                let inv = `inv/${encodeString(invname[i].innerHTML)}.html`;
                for (let j = 0; j < setinv.length; j++){
                    if(setinv[j].removeAttribute("disabled") !== undefined){
                    setinv[j].removeAttribute("disabled");}
                    setinv[j].style.background = "";
                    setinv[j].innerHTML = "select";
                }

                RequestPhp("GET", "config.php?req=invstyle&inv="+inv,
                    (x)=>{if(x.responseText == ""){
                        controlbtn = q_(".controlbtn");
                        controlbtn[0].style.width = "";
                        setinv[i].style.background = "black";
                        setinv[i].innerHTML = "selected";
                        att = document.createAttribute("disabled");
                        setinv[i].setAttributeNode(att);
                        invoice = q_(".invoice");
                        prtHandle.innerHTML = invoice[i].innerHTML;
                        prtHandle.removeChild(prtHandle.querySelector(".btnback"));
                    }},true);
            }
        }

    },true);
}

//---------------------------------------------------------------
// setting function
function openSetting(){
    RequestPhp("GET", "setting.html",(x)=>{
        openWindow("Settings",x.responseText);
        let updateapp = $("uploadUpdate");
        let zipFile = $("Zfile");

        updateapp.addEventListener("click",()=>{
            zipFile.click();
        });


        zipFile.onchange = (e)=>{
            if(confirm("Do you want to change logo")==true){

                if(File){
                    let form = $('formupdate');
                    uploadRec = new XMLHttpRequest();
                    uploadRec.onreadystatechange = function(x){
                        if(x.responseText == "1"){
                            notify("App updated successfully"+x.responseText , "ok");
                        }else if(x.responseText == "0"){
                            notify("Please select a zip file"+x.responseText);
                        }else {
                            notify("Unknown error" + x.responseText , "");
                        }
                    }
                    uploadRec.upload.onprogress = function(e) {
                        console.log(e);
                    }
                    uploadRec.open("POST","update.php");
                    let formData = new FormData(form);
                    uploadRec.send(formData);
                }
            }
        }
    });
}

//---------------------------------------------------------------
// Help function
function openHelp(){
    RequestPhp("GET", "help.html",(x)=>{
        openWindow("Help",x.responseText);
    });
}

//---------------------------------------------------------------
// About function
function openAbout(){
    
}

//---------------------------------------------------------------
// Contact function
function openContact(){
    
}
