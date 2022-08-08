// ==UserScript==
// @name        Amazon CamelCamelCamel Chart
// @namespace   amazon-c4-display
// @version     1.3
// @description Displays a camelcamelcamel past price performance chart directly on the amazon.co.uk
// @author      https://github.com/michalani
// @license     MIT
// @include     /^https?:\/\/www.amazon\..+\/dp\/*\/[a-zA-Z0-9]*
// @updateURL   https://raw.githubusercontent.com/michalani/amazon-c4-display/master/main.user.js
// @downloadURL https://raw.githubusercontent.com/michalani/amazon-c4-display/master/main.user.js
// @grant       none
// @noframes
// ==/UserScript==

// changelog
// v1.0 - initial release
// v1.1 - fixed bug where the chart was not displayed due to amazons parameters
// v1.2 - added more wide countries support
// v1.3 - refactored the code

var currentURL = window.location.href;
var productID = currentURL.split("/dp/")[1].split("?")[0].split('/')[0];
var tld = getTLD();
//fetch image from the camelcamelcamel
img = document.createElement("img");

//amazon and 3rd parties
img.src = "https://charts.camelcamelcamel.com/"+tld+"/"+productID+"/amazon-new.png?force=1&zero=0&w=855&h=513&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en";

//where to append the chart
let src = document.getElementById("leftCol");

function main(){
    //img.setAttribute("id", "priceTrackingImage");

    src.appendChild(img);

    //make the chart clickable directly to the camelcamelcamel page.
    img.addEventListener("click", function() {
        location.href = ("https://"+tld+".camelcamelcamel.com/product/"+productID);
    })

    //listen for product carousel changes
    var ProductChange = document.querySelectorAll('span.a-button-inner button');
    for (let i = 0; i < ProductChange.length; i++) {
        //const element = ProductChange[i];
        ProductChange[i].addEventListener("click", productChanged);
        //ProductChange[i].myParam = currentURL;
    }
}

//parse the country based on the url
function getTLD(){
    var tld = currentURL.split('amazon.')[1].split('/')[0].split('.');

    //split the tld even more to get the country code for dumb tlds such as co.uk
    if(tld.length > 1){
        tld = tld[1]
    } else{
        tld = tld[0]
    }

    //future proofing for other countries
    switch (tld) {
        case "com":
            tld = "us"
            break;
        default:
            tld = "us"
            break;
    }

    return tld;
}

function productChanged(){
    //console.log('product changed');
    function isVarDifferent() {
        if(currentURL===window.location.href) {//we want it to match
            setTimeout(isVarDifferent, 300);//wait 300 millisecnds then recheck
            return;
        }
        currentURL=window.location.href;
        //currentURL = window.location.href;
        productID = currentURL.split("/dp/")[1].split("?")[0].split('/')[0];
        //img.src =
        //src.appendChild(img)
        imgArr = document.querySelectorAll(".leftCol img");
        imgArr[imgArr.length-1].src =  "https://charts.camelcamelcamel.com/"+tld+"/"+productID+"/amazon-new.png?force=1&zero=0&w=855&h=513&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en";
    }
    isVarDifferent();
}

main();