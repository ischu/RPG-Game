// character stats
var obi = {
    name: "obi",
    healthPoints: 200,
    baseAttack: 10,
    counterPower: 20,
};
var luke = {
    name: "luke",
    healthPoints: 102,
    baseAttack: 11,
    counterPower: 21,
};
var vader = {
    name: "vader",
    healthPoints: 104,
    baseAttack: 12,
    counterPower: 22,
};
var maul = {
    name: "maul",
    healthPoints: 155,
    baseAttack: 13,
    counterPower: 23,
};
// array containing stat objects
var charArray = [obi, luke, vader, maul];
// "flag" variables for choosing if function should run
var noDefender = true;
var noCharChosen = true;
// counts number of attacks (starts at -1 so first attack will be base attack value)
var attackNumber = -1;

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
        // else {
        //     console.log("noCharChosen = " + noCharChosen)
        // }

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
                // sets defName to the id of defending character (used later to select corresponding object)
                defName = this.id.toString();
                console.log(defName + " chosen");
                noDefender = false;
                // return noDefender;
            }
            else {
                console.log("noDefender = " + noDefender);
            }
        });
    });
    // attack button
    $("#attackButton").on("click", function () {
        // check if player has chosen a character and a defender
        if (noDefender && noCharChosen) {
            alert("Choose a character!")
        } else if (noDefender) {
            alert("Choose an enemy to fight!")
        }
        else {
            // increases attack counter by one
            attackNumber++
            console.log("this is the attack number: " + attackNumber);
            // goes through objects containing character stats and matches the object with the correct charBox
            for (i = 0; i < charArray.length; i++) {
                if (charName === charArray[i].name) {
                    
                    // setting health and attack of player's character
                    charBase = charArray[i].baseAttack;
                    attackCalc = function() {
                     charAttack = charBase + (charBase * attackNumber);
                     console.log(charAttack);
                     return charAttack;
                    }
                    attackCalc();
                    console.log(charArray[i].name + " has an attack power of " + charAttack);
                    charHealth = charArray[i].healthPoints;
                    console.log(charAttack+" "+charHealth);
                }
                if (defName === charArray[i].name) {
                    console.log(charArray[i].name + " has a counter-attack power of " + charArray[i].counterPower)
                    // setting health and counter-attack of defender
                    defAttack = charArray[i].counterPower;
                    defHealth = charArray[i].healthPoints;
                    console.log(defAttack+" "+defHealth);
                }
            }
        }
    });
});