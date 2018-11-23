
var noDefender = true;
// jQuery code goes in this
$(document).ready(function () {
    // selects character
    $("div .unchosen").on("click", function () {
        // moves clicked character box to "your character" section
        $("#yourChar").append(this);
        // removes "unchosen" class from chosen character
        $(this).removeClass("unchosen");
        // adds "enemies" class to unchosen characters
        $(".unchosen").addClass("enemies");
        // removes .unchosen from enemies, allowing next function to work
        $(".enemies").removeClass("unchosen");
        // moves enemy characters to the "available enemies" section
        $("#availEnemies").append($(".enemies"));
        // selects defender
        $("div .enemies").on("click", function () {
            // only works if no defender has been chosen yet
            if (noDefender) {
                // moves clicked character box to "defender" section
                $("#defender").append(this);
                // removes "enemies" class from chosen character
                $(this).removeClass("enemies");
                // adds "defender" class to chosen character
                $(this).addClass("defender");
                noDefender = false;
            }
            else {
                console.log("defender already chosen!");
            }
        });
    });
});