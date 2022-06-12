// ==UserScript==
// @name        Amazon CamelCamelCamel Chart
// @namespace   amazon-c4-display
// @version     1.1
// @description Displays a camelcamelcamel past price performance chart directly on the amazon.co.uk
// @author      https://github.com/michalani
// @license     MIT
// @match       https://www.amazon.co.uk/*/dp/*
// @match       https://www.amazon.co.uk/dp/*
// @updateURL   https://raw.githubusercontent.com/michalani/amazon-c4-display/master/main.js
// @downloadURL https://raw.githubusercontent.com/michalani/amazon-c4-display/master/main.js
// @grant       none
// @noframes
// ==/UserScript==

function main(){
    //parse the produc id of on the amazon (https://www.amazon.co.uk/*/dp/B07GDR2PH9) where B07GDR2PH9 would be product id
    let currentURL = window.location.href;
    //var productID = currentURL.split("/dp/")[1].split("?")[0];
    let productID = currentURL.split("/dp/")[1].split("?")[0].split('/')[0];

    //fetch image from the camelcamelcamel
    var img = document.createElement("img");
    //img.setAttribute("id", "priceTrackingImage");

    //amazon and 3rd parties
    img.src = "https://charts.camelcamelcamel.com/uk/"+productID+"/amazon-new.png?force=1&zero=0&w=855&h=513&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en";

    //only amazon
    //img.src = "https://charts.camelcamelcamel.com/uk/"+productID+"/amazon.png?force=1&zero=0&w=945&h=567&desired=false&legend=1&ilt=1&tp=all&fo=0&lang=en";

    //wher eto append the chart
    let src = document.getElementById("leftCol");
    src.appendChild(img);

    //make the chart clickable directly to the camelcamelcamel page.
    img.addEventListener("click", function() {
        location.href = ("https://uk.camelcamelcamel.com/product/"+productID);
    })
}

main(); 