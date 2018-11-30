// character stats
var obi = {
    name: "obi",
    health: 250,
    baseAttack: 4,
    counterPower: 10,
};
var luke = {
    name: "luke",
    health: 200,
    baseAttack: 6,
    counterPower: 15,
};
var vader = {
    name: "vader",
    health: 150,
    baseAttack: 8,
    counterPower: 20,
};
var maul = {
    name: "maul",
    health: 100,
    baseAttack: 12,
    counterPower: 25,
};
// array containing stat objects
var charArray = [obi, luke, vader, maul];

// "flag" variables for choosing if function should run
var noDefender = true;
var noCharChosen = true;
// counts number of attacks (starts at -1 so first attack will be base attack value)
var attackNumber = 0;
// counts amount of enemies left to see if its time to reset
var enemyCount = 2;

// jQuery code goes in this
$(document).ready(function () {

    // functions that set up page

    // function for setting hp of character boxes
    hpSet = function (obj) {
        $("#"+obj.name +" span.HP").text(obj.health);
    };

    // sets all the hps to the correct full amounts (probably could have reused this to set other things)
    initialSet = function (func) {
        i=0;
        do {
            func(charArray[i])
            i++
        }
        while(i<charArray.length);
    };

    initialSet(hpSet);
    // reset game function
    resetti = function () {
        $("#defender").html("<p id=resetInstr>Press the Reset button to play again!<p>");
        $("#resetInstr").append("<br><br><button class=btn alert id=resetButton> reset </button>");
        $("#resetButton").on("click", function () {
            // refreshes page
            location.reload();
            // scrolls to top of page
            window.scrollTo(0, 0);
        });
    };

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
            console.log(charName + " attacking");
            noCharChosen = false;
            // goes through objects containing character stats and matches the object with the correct charBox
            for (i = 0; i < charArray.length; i++) {
                // checks if the id is the same as the character's name
                if (charName === charArray[i].name) {
                    char = charArray[i];
                    // setting health and attack of player's character
                    // baseAttack = char.baseAttack;
                    // charHealth = char.health;
                    console.log(char.name + " has an attack power of " +char.baseAttack + " and " + char.health + " hp");
                }
            }
        }

        // selects defender
        $("div.enemies").on("click", function () {
            // only works if no defender has been chosen yet
            if (noDefender) {
                // removes instruction for next fight
                $("#newDefInstr").remove();
                // moves clicked character box to "defender" section
                $("#defender").append(this);
                // removes "enemies" class from chosen character
                $(this).removeClass("enemies");
                // adds "defender" class to chosen character
                $(this).addClass("defender");
                // sets defName to the id of defending character (used later to select corresponding object)
                defName = this.id.toString();
                console.log(defName + " defending");
                noDefender = false;
                // defender is set to it stat object
                for (i = 0; i < charArray.length; i++) {
                    if (defName === charArray[i].name) {
                        def = charArray[i];
                        // defAttack = def.counterPower;
                        // defHealth = def.health;
                        console.log(charArray[i].name + " has a counter-attack power of " + def.counterPower + " and " + def.health + " hp");
                    }
                }
                $("#availEnemies").addClass("hide");

            }
            else {
                console.log("noDefender = " + noDefender);
            }
        });
    });

    // attack button

    $("#attackButton").on("click", function () {
        // check if player has chosen a character and a defender
        if (noCharChosen) {
            alert("Choose a character!")
        } else if (noDefender) {
            alert("Choose an enemy to fight!")
        }
        else {
            // calculates the attack power
            attackPower = function () {
                charAttack = char.baseAttack + (char.baseAttack * attackNumber);
                return charAttack;
            }
            // attack only if still alive
            if (char.health > 0) {
                // subtracts attack from defender's health
                def.health -= attackPower();
                console.log(char.name + "now has " + attackPower() + " attack power");
                console.log(def.name, def.health);
                // sets defender's health
                hpSet(def);
                // counter-attack if defender is still alive
                if (def.health > 0) {
                    // subtract defender's counter-attack from character's health
                    char.health -= def.counterPower;
                    console.log(char.name, char.health);
                    hpSet(char);
                }
                else if (def.health <= 0) {
                    // clears the defender area to allow another challenger to be fought
                    noDefender = true;
                    // reveals hidden enemies row
                    $("#availEnemies").removeClass("hide");
                    // deletes defeated defender
                    $("#defender").empty();
                    // runs if there are no enemies left to fight
                    if (enemyCount > 0) {
                        // adds an instruction to choose next fighter
                        $("#defender").append("<p id=newDefInstr >Choose a new enemy to fight!</p>");

                        // reduces enemyCount (when zero, game is set to reset)
                        enemyCount--

                        console.log(enemyCount);
                    }
                    // sets game for reset if no enemies left
                    else {
                        alert("You won!")
                        resetti();
                    }
                }
            }
            // function that checks if player has lost game
            gameOverCheck = function () {
                if (char.health <= 0) {
                    alert("you lose");
                    resetti();
                };
            };
            // game over if character health below zero
            gameOverCheck();
            // increases attack counter by one (DO THIS LAST)
            attackNumber++
        }
    });
});