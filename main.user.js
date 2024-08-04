// ==UserScript==
// @name        Amazon CamelCamelCamel Chart
// @namespace   amazon-c4-display
// @version     1.8.5
// @description Displays a camelcamelcamel past price performance chart directly on Amazon
// @author      https://github.com/maanisim
// @include     /^https?:\/\/(www|smile).amazon\.*\/*
// @updateURL   https://raw.githubusercontent.com/maanisim/amazon-c4-display/master/main.user.js
// @downloadURL https://raw.githubusercontent.com/maanisim/amazon-c4-display/master/main.user.js
// @grant       none
// @noframes
// ==/UserScript==

// changelog
// v1.0 - initial release
// v1.1 - fixed bug where the chart was not displayed due to amazons parameters
// v1.2 - added more wide countries support
// v1.3 - refactored the code
// v1.4 - added support for /gp/ products
// v1.5 - added more accurate links when clicking the graph
// v1.6 - improved ASIN product id grabbing
// v1.7 - made graph logic less resource intensive
// v1.8 - added hagglezon logic to find better deals on different Amazon countries

var ASIN = document.querySelector('#ASIN').value
var tld = getTLD();

//fetch image from the camelcamelcamel
camelChartImg = document.createElement("img");
camelChartImg.src = "https://charts.camelcamelcamel.com/"+tld+"/"+ASIN+"/amazon-new.png?force=1&zero=0&w=855&h=513&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en";

//hagglezon
hagglezonImg = document.createElement("img");


//where to append the chart
let src = document.getElementById("leftCol");

function main(){
    src.appendChild(camelChartImg);

    //make the chart clickable directly to the camelcamelcamel page.
    camelChartImg.addEventListener("click", function() {
        location.href = ("https://"+tld+".camelcamelcamel.com/product/"+ASIN+"?cpf[]=amazon&cpf[]=new&active=summary&chart=0");
        //https://uk.camelcamelcamel.com/product/B07Z6RD4M9?cpf[]=amazon&cpf[]=new&active=summary&chart=0

    })
    productchangeListener();
    src.appendChild(hagglezonImg);
    var hagglezonImgElement = '<div id="hagglezonDiv" style="padding-top: 15px"><center><a id="hagglezonImg"><svg  width="351.9px" height="111.4px" viewBox="0 0 3519 1114" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>A</title><desc>Created with Sketch.</desc><defs><radialGradient cx="15.3849174%" cy="97.5532763%" fx="15.3849174%" fy="97.5532763%" r="184.93662%" id="radialGradient-textright"><stop stop-color="#F09A22" offset="0%"></stop><stop stop-color="#FF8585" offset="100%"></stop></radialGradient><path d="M532.184551,619.720916 L532.184551,426.475216 C532.184551,405.040826 529.284648,385.182792 523.484754,366.900519 C517.68486,348.618245 509.111233,332.8579 497.763615,319.619013 C486.415997,306.380125 472.483852,296.041339 455.966763,288.602345 C439.449675,281.163351 420.47422,277.443909 399.03983,277.443909 C376.092425,277.443909 356.360473,281.163351 339.843385,288.602345 C323.326296,296.041339 308.007241,305.812752 293.885761,317.916878 L293.885761,109.5 L176.627626,109.5 L176.627626,667.340153 C146.710199,669.841992 129.975529,670.754836 129.975529,670.754836 C102.437198,672.698313 75.3832861,652.383553 69.7484172,625.357156 C69.7484172,625.357156 47.3537884,527.403679 26.4778232,378.863468 C5.6018581,230.323258 0.128085299,129.975529 0.128085299,129.975529 C-1.81539121,102.437198 18.4993686,75.3832861 45.525765,69.7484172 C45.525765,69.7484172 143.479243,47.3537884 292.019453,26.4778232 C440.559664,5.6018581 540.907393,0.128085299 540.907393,0.128085299 C568.445723,-1.81539121 595.499635,18.4993686 601.134504,45.525765 C601.134504,45.525765 623.529133,143.479243 644.405098,292.019453 C665.281063,440.559664 670.754836,540.907393 670.754836,540.907393 C672.698313,568.445723 652.383553,595.499635 625.357156,601.134504 C625.357156,601.134504 591.023125,608.984127 532.184551,619.720916 Z M414.926416,639.166927 C403.275204,640.914303 391.245077,642.664977 378.863468,644.405098 C348.353782,648.692955 319.877234,652.331026 293.885761,655.405344 L293.885761,395.8368 C304.476871,386.506536 315.38303,379.130695 326.604563,373.709055 C337.826097,368.287416 349.867,365.576636 362.727634,365.576636 C379.875146,365.576636 392.861669,370.935154 401.687595,381.652348 C410.51352,392.369543 414.926416,407.31035 414.926416,426.475216 L414.926416,639.166927 Z" id="path-textright"></path><filter x="-5.7%" y="-5.7%" width="111.3%" height="111.3%" filterUnits="objectBoundingBox" id="filter-textright"><feMorphology radius="33" operator="erode" in="SourceAlpha" result="shadowSpreadInner1"></feMorphology><feGaussianBlur stdDeviation="21.5" in="shadowSpreadInner1" result="shadowBlurInner1"></feGaussianBlur><feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.0661231884 0" type="matrix" in="shadowInnerInner1"></feColorMatrix></filter></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="A"><text id="hagglezon-copy-5" font-family=".SFNSDisplay, .SF NS Display" font-size="465" font-weight="normal" fill="#292929"><tspan x="1049" y="698">hagglezon</tspan></text><g id="Group-2" transform="translate(235.000000, 207.000000)"><g id="Combined-Shape-Copy-2"><use fill="url(#radialGradient-textright)" fill-rule="evenodd" xlink:href="#path-textright"></use><use fill="black" fill-opacity="1" filter="url(#filter-textright)" xlink:href="#path-textright"></use></g><path d="M56.107529,576.138583 C56.107529,576.138583 48.5928647,490.30329 48.5928647,349.650748 C48.5928647,208.998207 56.1080173,123.15489 56.1080173,123.15489 C58.1719335,92.884591 84.3814893,66.5627204 114.662317,64.6081264 C114.662317,64.6081264 200.49761,57.0934622 341.150151,57.0934622 C481.802693,57.0934622 567.64601,64.6086148 567.64601,64.6086148 C567.64601,64.6086148 441.889697,158.787253 308.048128,292.626596 C174.206558,426.465938 56.107529,576.138583 56.107529,576.138583 Z" id="Rectangle-Copy-textright" fill="#FFFFFF" opacity="0.200000003" transform="translate(308.119437, 316.616023) rotate(-8.000000) translate(-308.119437, -316.616023) "></path></g></g></g></svg></a></center></div>'
    src.insertAdjacentHTML( 'beforeend', hagglezonImgElement );
    document.querySelector('#hagglezonImg').href = "https://www.hagglezon.com/en/s/"+ASIN;
}

//listen for product carousel clicks
function productchangeListener(){
    var similarProductsButtons = document.querySelectorAll('span.a-button-inner button');
    for (let i = 0; i < similarProductsButtons.length; i++) {
        similarProductsButtons[i].addEventListener("click", productChanged);
    }

}

//parse the country ID based on the url
function getTLD(){
    var tld = location.href.split('amazon.')[1].split('/')[0].split('.');

    //split the tld even more to get the country code for dumb tlds such as co.uk
    if(tld.length > 1){
        tld = tld[1]
    }

    //if URL does not hint to the origin use US instead
    if(tld == "com"){
        tld = "us"
    }

    return tld;
}

//once product changed find the products ASIN to get new chart
function productChanged(){
    function isVarDifferent() {
        if(ASIN === document.querySelector('#ASIN').value) {
            setTimeout(isVarDifferent, 300);
            return;
        }

        //set the new ASIN
        ASIN = document.querySelector('#ASIN').value;

        //update the camelcamelcamel chart
        camelChartImg.src = "https://charts.camelcamelcamel.com/"+tld+"/"+ASIN+"/amazon-new.png?force=1&zero=0&w=855&h=513&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en";

        //update the hagglezon link
        document.querySelector('#hagglezonImg').href = "https://www.hagglezon.com/en/s/"+ASIN;

    }
    isVarDifferent();
}

main();
