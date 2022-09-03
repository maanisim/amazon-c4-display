// ==UserScript==
// @name        Amazon CamelCamelCamel Chart
// @namespace   amazon-c4-display
// @version     1.7
// @description Displays a camelcamelcamel past price performance chart directly on Amazon
// @author      https://github.com/michalani
// @license     MIT
// @include     /^https?:\/\/www.amazon\.*\/*
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
// v1.4 - added support for /gp/ products
// v1.5 - added more accurate links when clicking the graph
// v1.6 - improved ASIN product id grabbing
// v1.7 - made graph logic less resource intensive / 

var currentURL = window.location.href;
var ASIN = document.querySelector('#ASIN').value
var tld = getTLD();

//fetch image from the camelcamelcamel
camelChartImg = document.createElement("img");
camelChartImg.src = "https://charts.camelcamelcamel.com/"+tld+"/"+ASIN+"/amazon-new.png?force=1&zero=0&w=855&h=513&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en";

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

//once product changed find the products ASIN to get new chart
function productChanged(){
    function isVarDifferent() {
        if(ASIN === document.querySelector('#ASIN').value) {
            setTimeout(isVarDifferent, 300);
            return;
        }
        currentURL=window.location.href;
        ASIN = document.querySelector('#ASIN').value;
        camelChartImg.src = "https://charts.camelcamelcamel.com/"+tld+"/"+ASIN+"/amazon-new.png?force=1&zero=0&w=855&h=513&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en";

    }
    isVarDifferent();
}

main();