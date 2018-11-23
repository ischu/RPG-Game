

// jQuery code goes in this
$(document).ready(function () {
    // makes character boxes clickable
    $(".charBox").click(function () {
        // moves clicked character box to "your character" section
        $("#yourChar").append(this);
        // removes "unchosen" class from chosen character
        $(this).removeClass("unchosen");
        // adds "enemies" class to unchosen characters
        $(".unchosen").addClass("enemies");
        // moves unchosen characters to the "available enemies" section
        $("#availEnemies").append($(".enemies"));
    });

});