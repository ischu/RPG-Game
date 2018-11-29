// character stats
var obi = {
    name: "obi",
    healthPoints: 250,
    baseAttack: 4,
    counterPower: 10,
};
var luke = {
    name: "luke",
    healthPoints: 200,
    baseAttack: 6,
    counterPower: 15,
};
var vader = {
    name: "vader",
    healthPoints: 150,
    baseAttack: 8,
    counterPower: 20,
};
var maul = {
    name: "maul",
    healthPoints: 100,
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
    hpSet = function (name, hp) {
        $(name + " span.HP").text(hp);
    };

    initialHP = function () {
        hpSet("#obi", obi.healthPoints);
        hpSet("#luke", luke.healthPoints);
        hpSet("#vader", vader.healthPoints);
        hpSet("#maul", maul.healthPoints);
    };

    initialHP();
    // reset game function
    resetti = function () {
        $("#defender").html("<p id=resetInstr>Press the Reset button to play again!<p>");
        $("#resetInstr").append("<br><br><button class=btn alert id=resetButton> reset </button>");
        $("#resetButton").on("click", function () {
            // refreshes page
            location.reload();
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
                if (charName === charArray[i].name) {
                    char = charArray[i]
                    // setting health and attack of player's character
                    baseAttack = charArray[i].baseAttack;
                    charHealth = charArray[i].healthPoints;
                    console.log(char.name + " has an attack power of " + baseAttack + " and " + charHealth + " hp");
                }
            }
        }

        // selects defender
        $("div.enemies").on("click", function () {
            // only works if no defender has been chosen yet
            if (noDefender) {
                // removes instruction for next fight
                $("#newDefInstr").remove()
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
                        // setting health and counter-attack of defender
                        defAttack = charArray[i].counterPower;
                        defHealth = charArray[i].healthPoints;
                        console.log(charArray[i].name + " has a counter-attack power of " + defAttack + " and " + defHealth + " hp");
                    }
                }
                $("#defender").addClass("hide");

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
                charAttack = baseAttack + (baseAttack * attackNumber);
                console.log(charAttack)
                return charAttack;
            }
            // attack only if still alive
            if (charHealth > 0) {
                // subtracts attack from defender's health
                defHealth -= attackPower();
                console.log(char.name + " has " + attackPower() + " attack power");
                // sets defender's health
                hpSet(".defender", defHealth);
                // counter-attack if defender is still alive
                if (defHealth > 0) {
                    // subtract defender's counter-attack from character's health
                    charHealth = charHealth - defAttack;
                    console.log(charHealth);
                    hpSet("div.charBox:first", charHealth);
                }
                else if (defHealth <= 0) {
                    // clears the defender area to allow another challenger to be fought
                    noDefender = true;
                    // invisiblizes defeated defender
                    $(".defender").addClass("ded");
                    $(".ded").remove();
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
                        resetti();
                    }
                }
            }
            // function that checks if player has lost game
            gameOverCheck = function () {
                if (charHealth <= 0) {
                    alert("game over");
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