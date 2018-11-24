// character stats
var obi = {
    name: "obi",
    healthPoints: 200,
    attackPower: 10,
    counterPower: 10,
};
var luke = {
    name: "luke",
    healthPoints: 102,
    attackPower: 11,
    counterPower: 10,
};
var vader = {
    name: "vader",
    healthPoints: 104,
    attackPower: 12,
    counterPower: 10,
};
var maul = {
    name: "maul",
    healthPoints: 155,
    attackPower: 13,
    counterPower: 10,
};
// array containing stat objects
var charArray = [obi, luke, vader, maul];
// "flag" variables for choosing if function should run
var noDefender = true;
var noCharChosen = true;
// jQuery code goes in this
$(document).ready(function () {
    $("#obi").append("HP:" + obi.healthPoints);
    $("#luke").append("HP:" + luke.healthPoints);
    $("#vader").append("HP:" + vader.healthPoints);
    $("#maul").append("HP:" + maul.healthPoints);
    // selects character
    $("div.unchosen").on("click", function () {
        // only runs if player has not chosen a character to play as
        if (noCharChosen) {
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
            // sets charName to the id of chosen character (used later to select corresponding object)
            charName = this.id.toString();
            console.log(charName + " chosen");
            noCharChosen = false;
        }
        else {
            console.log("noCharChosen = " + noCharChosen)
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
    // attack button
    $("#attackButton").on("click", function () {
        console.log(charName)
        for (i = 0; i < charArray.length; i++) {
            if (charName === charArray[i].name) {
                console.log(charArray[i].name + " has an attack power of " + charArray[i].attackPower);
            }
        }
    });
});