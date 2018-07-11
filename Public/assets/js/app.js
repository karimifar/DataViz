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

        // oldWidthAll = newWidthAll
        // oldWidthB = newWidthB
        // oldWidthH = newWidthH
        // oldWidthW = newWidthW
        console.log(data[0])
    })

    
})


function openingAnimation(){
    var graphTl = new TimelineMax();
    graphTl.staggerFrom(".graphBar", 0.8, {scaleX: 0, transformOrigin: "0% 50%" }, 0.25)

}
openingAnimation();