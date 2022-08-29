// ==UserScript==
// @name        Amazon CamelCamelCamel Chart
// @namespace   amazon-c4-display
// @version     1.3
// @description Displays a camelcamelcamel past price performance chart directly on the amazon.co.uk
// @author      https://github.com/michalani
// @license     MIT
// @include     /^https?:\/\/www.amazon\..+\/[a-z]p\/*\/[a-zA-Z0-9]*
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
//img.setAttibute("id", "camelcamelcamel-chart-img"); 

//where to append the chart
let src = document.getElementById("leftCol");

function main(){
    src.appendChild(img);

    //make the chart clickable directly to the camelcamelcamel page.
    img.addEventListener("click", function() {
        location.href = ("https://"+tld+".camelcamelcamel.com/product/"+productID);
    })

    //listen for product carousel changes
    var ProductChange = document.querySelectorAll('span.a-button-inner button');
    for (let i = 0; i < ProductChange.length; i++) {
        ProductChange[i].addEventListener("click", productChanged);
    }
}

//parse the country based on the url
function getTLD(){
    var tld = location.href.split('amazon.')[1].split('/')[0].split('.');

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
            break;
    }

    return tld;
}

// once product changed listen for the url to change and update the chart accordingly
function productChanged(){
    function isVarDifferent() {
        if(currentURL===window.location.href) {
            setTimeout(isVarDifferent, 300);
            return;
        }
        currentURL=window.location.href;
        productID = currentURL.split("/dp/")[1].split("?")[0].split('/')[0];
        imgArr = document.querySelectorAll(".leftCol img");
        imgArr[imgArr.length-1].src =  "https://charts.camelcamelcamel.com/"+tld+"/"+productID+"/amazon-new.png?force=1&zero=0&w=855&h=513&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en";
    }
    isVarDifferent();
}

main();
