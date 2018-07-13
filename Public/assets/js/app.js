var mymap = L.map('map').setView([31, -99], 6);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.run-bike-hike',
    accessToken: 'pk.eyJ1Ijoia2FyaW1pZmFyIiwiYSI6ImNqOGtnaWp4OTBjemsyd211ZDV4bThkNmIifQ.Xg-Td2FFJso83Mmmc87NDA'
}).addTo(mymap);

var scale = 13.86;

var oldWidthAll = parseInt($("#All-zipBar").attr("width"))
var oldWidthB = parseInt($("#B-zipBar").attr("width"))
var oldWidthH = parseInt($("#H-zipBar").attr("width"))
var oldWidthW = parseInt($("#W-zipBar").attr("width"))

$("#submit-btn").on("click", function(){

    
    event.preventDefault();
    var userZip = $("#zipcode-input").val().trim();
    var input = {
        zipcode: userZip
    }

    

    $.post("/api/imr", input)

    .then(function(data){
        

        var zipLat = data[0].Lat;
        var zipLng = data[0].Lng;
        var zipCity = data[0].City;
        var zipCounty = data[0].County;

        console.log(zipLat, zipLng)

        if(zipLat === null || zipLng === null){
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address="+userZip + "&key=AIzaSyDpzc2sQEkJ1uXW8ljWuxZHld3rdVYrJ2Y",
                method: "GET"
            }).then(function(response){

                zipLat= response.results[0].geometry.location.lat;
                zipLng= response.results[0].geometry.location.lng;
                zipCity= response.results[0].address_components[1].short_name;
                zipCounty=response.results[0].address_components[2].short_name;
                var sendData= {
                    geoStuff: [
                        zipLat,
                        zipLng,
                        zipCity,
                        zipCounty,
                        userZip,
                    ]
                }
                mymap.flyTo([zipLat, zipLng],13);

                console.log(sendData)
                $.ajax({
                    url: "/api/imr",
                    method: "PUT",
                    data: sendData,
                    dataType: "json",
                })
                .then(function(response){
                    console.log("Geo stuff added!", response)
                })

            })

            

        }else{
            mymap.flyTo([zipLat, zipLng],13);
        }
        
       


        var allImr = data[0].IMR;
        var bImr = data[0].IMR_B;
        var hImr = data[0].IMR_H;
        var wImr = data[0].IMR_W;

        var newWidthAll = allImr * scale;
        var newWidthB = bImr * scale;
        var newWidthH = hImr * scale;
        var newWidthW = wImr * scale;

        // var moveAll = newWidthAll - oldWidthAll;
        // var moveB = newWidthB-oldWidthB
        // var moveH = newWidthH-oldWidthH
        // var moveW = newWidthW-oldWidthW
    

        $("#bigNumber").text(allImr)
        $("#thePlace").text("ZIP: "+ userZip)

        if(allImr === null){
            $("#allImr-text").text("Not enough data")
        }else{
            $("#allImr-text").text(allImr)
        }
        if(bImr === null){
            $("#bImr-text").text("Not enough data")
        }else{
            $("#bImr-text").text(bImr)
        }
        if(hImr === null){
            $("#hImr-text").text("Not enough data")
        }else{
            $("#hImr-text").text(hImr)
        }
        if(wImr === null){
            $("#wImr-text").text("Not enough data")
        }else{
            $("#wImr-text").text(wImr)
        }


        var graphTl = new TimelineMax();
        graphTl.to("#All-zipBar", 1, {scaleX: newWidthAll/oldWidthAll, transformOrigin: "0% 50%" })
        .to("#allImr-text", 1, {x: newWidthAll + 93}, "=-1")
        .to("#B-zipBar", 1, {scaleX: newWidthB/oldWidthB, transformOrigin: "0% 50%" }, "=-1")
        .to("#bImr-text", 1, {x: newWidthB + 93}, "=-1")
        .to("#H-zipBar", 1, {scaleX: newWidthH/oldWidthH, transformOrigin: "0% 50%" }, "=-1")
        .to("#hImr-text", 1, {x: newWidthH + 93}, "=-1")
        .to("#W-zipBar", 1, {scaleX: newWidthW/oldWidthW, transformOrigin: "0% 50%" }, "=-1")
        .to("#wImr-text", 1, {x: newWidthW + 93}, "=-1")

         //Leaflet map stuff
         



        })
    })




function openingAnimation(){
    var graphTl = new TimelineMax();
    graphTl.staggerFrom(".graphBar", 0.8, {scaleX: 0, transformOrigin: "0% 50%" }, 0.25)

}
openingAnimation();



