(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var ampm = h >= 12 ? 'pm' : 'am';
            h = h % 12;
            h = h ? h : 12;
            
            
            
            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s +" "+ampm;
            
        };
        
    });
    
    // forms
   
   
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    
    var e = document.getElementById("delivery");
    
    
    function getPrice() {
        var summa=0;
        var e =document.getElementById("linn").value;
        switch (e) {
  case "trt" || "nrv":
    summa=summa+2.5;
    break;
            case "prn":
                summa=summa+3;
                break;   
}
        var checkBox = document.getElementById("v1");
        if (checkBox.checked == true){
            summa=summa+5;
}
        checkBox = document.getElementById("v2");
        if (checkBox.checked == true){
            summa=summa+1;
}
        
        return summa;
    }
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        var linn = document.getElementById("linn");
        var fname = document.getElementById("fname");
        var lname = document.getElementById("lname");
        var hasNumber =/\d/;
        
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {

            var a = getPrice();
            e.innerHTML = a+ " &euro;";
            alert("Täname tellimuse eest, teie transpordi hind on " + a + "€");
            
        }        
        
        if (fname.value===""||lname.value===""){
            alert("Sisetage nimi")
        }
        if (hasNumber.test(fname.value)===true||hasNumber.test(lname.value)===true){
            alert("Nimes on number, paranda ära")}
        
        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {
    
    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    
    
    map = new Microsoft.Maps.Map(document.getElementById("map"), {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 11,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    var center = map.getCenter();
var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
var infobox = new Microsoft.Maps.Infobox(center, { title: 'Map Center', description: 'Seattle', visible: false });
infobox.setMap(map);
Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
    infobox.setOptions({ visible: true });
});
    
    var locations = [
                {lat: 58.333226, lng: 26.755737}
            ];


    locations.forEach((location) => {
                let marker = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(location.lat, location.lng));
                map.entities.push(marker);
            });



    
    map.entities.push(pushpin);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

