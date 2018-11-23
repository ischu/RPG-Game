
var noDefender = true;
var noCharChosen = true;
// jQuery code goes in this
$(document).ready(function () {
    // selects character
    $("div.unchosen").on("click", function () {
        // only runs if player has not chosen a character to play as
        if(noCharChosen){
        // moves clicked character box to "your character" section
        $("#yourChar").append(this);
        // removes "unchosen" class from chosen character
        $(this).removeClass("unchosen");
        // moves unchosen characters to the "available enemies" section
        $("#availEnemies").append($(".unchosen"));
        // adds "enemies" class to unchosen characters
        $(".unchosen").addClass("enemies");
        // removes .unchosen from enemies
        $(".enemies").removeClass("unchosen");
        console.log("character chosen")
        noCharChosen=false;
        }
        else{
            console.log("noCharChosen = "+ noCharChosen)
        }
        // selects defender
        $("div.enemies").on("click", function () {
            // only works if no defender has been chosen yet
            if (noDefender) {
                // moves clicked character box to "defender" section
                $("#defender").append(this);
                // removes "enemies" class from chosen character
                $(this).removeClass("enemies");
                // adds "defender" class to chosen character
                $(this).addClass("defender");
                console.log("defender chosen")
                noDefender = false;
                return noDefender;
            }
            else {
                console.log("noDefender = " + noDefender);
            }
        });
    });
});