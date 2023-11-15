const range=document.getElementById("range")
const rangedisplay=document.getElementById("rangedisplay")
const outputScreen=document.getElementById("outputScreen")

const up=document.getElementById("up")
const lo=document.getElementById("lo")
const nu=document.getElementById("nu")
const sy=document.getElementById("sy")

const copybtn=document.getElementById("copybtn");

const copied=document.getElementById("copied")

const indicator=document.getElementById("indicator");

const button=document.getElementById('button')





let symbols="$%^&*!@{}[]()~><"
let password=''
let passlength=8;
let checkCount=1;
up.checked=true;
rangeSetter();

function rangeSetter(){
    range.value=passlength;
    rangedisplay.innerText=passlength;
}


function rndNumber(min,max)
{
    return Math.floor(Math.random()*(max-min))+min;
}

function rndInteger(){
    return rndNumber(0,9);
}

function rndUppercase(){
    return String.fromCharCode(rndNumber(65,91));
}

function rndLowercase()
{
    return String.fromCharCode(rndNumber(97,123));
}

function rndSymbols()
{
    return symbols[rndNumber(0,symbols.length)];
}

function passStrength()
{
    let isup=false;
    let islo=false;
    let isnu=false;
    let issy=false;

    if(up.checked===true)
        isup=true;
    if(lo.checked===true)
        islo=true;
    if(nu.checked===true)
        isnu=true;
    if(sy.checked===true)
        issy=true;

    let pass=outputScreen.innerText;
    if(pass.length>=6 && isup && isnu &&issy)
    {
        indicator.style.backgroundColor="#008000";
    }
    else
    {
        indicator.style.backgroundColor="#FF0000"
    }
}

async function copyClipboard()
{
    try{
        await navigator.clipboard.writeText(outputScreen.innerText)
        copied.innerText="Copied";
    }
    catch(e)
    {
        console.log(e);
        copied.innerText="Failed";
    }
    
}

function checkCounter(){
    checkCount=0;
    if(up.checked===true)
        checkCount++;
    if(lo.checked===true)
        checkCount++;
    if(nu.checked===true)
        checkCount++;
    if(sy.checked===true)
        checkCount++;
}

range.addEventListener("change",(e)=>{
    passlength=e.target.value
    rangeSetter();
})

copybtn.addEventListener('click',()=>{
    if(outputScreen.innerText)
    {
        copied.style.opacity="1";
        copyClipboard();
        setTimeout(()=>{
            copied.style.opacity="0";
        },1500)
    }
        
    return;
})

button.addEventListener('click',()=>{
    if(checkCount===0)
        return;

    let passwordLength=passlength
    password="";
    outputScreen.innerText=password;
    checkCounter();
    if(checkCount>passlength)
    {
        passwordLength=checkCount;
        passlength=checkCount;
        rangeSetter();
    }

    let funcList=[];
    
    if(up.checked===true)
    {
        password+=rndUppercase();
        funcList.push(rndUppercase);
        passwordLength--;
    }
        
    if(lo.checked===true)
    {
        password+=rndLowercase();
        funcList.push(rndLowercase)
        passwordLength--;
    }
        
    if(nu.checked===true)
    {
        password+=rndInteger()
        funcList.push(rndInteger)
        passwordLength--;
    }
    if(sy.checked===true)
    {
        password+=rndSymbols();
        funcList.push(rndSymbols)
        passwordLength--;
    }
    while(passwordLength)
    {
        password+=funcList[rndNumber(0,funcList.length)](); 
        passwordLength--;
    }
    outputScreen.innerText=password;
    passStrength();
})
