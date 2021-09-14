class Game {

    heros = null;
    weapons = [];
    armors = [];
    npcs = null;
    monsters = [];
    currentMonster = null;
    eventCount = 0;


    init() {
        this.monsters[0] = new Monster("Goblin", 10, 10, 10);
        this.monsters[1] = new Monster("Orc", 20, 12, 12);
        this.monsters[2] = new Monster("Undead", 15, 2, 15);
        this.weapons[0] = new Weapon("Club", 3, 5);
        this.weapons[1] = new Weapon("Sword", 5, 10);
        this.weapons[2] = new Weapon("Axe", 8, 15);
        this.armors[0] = new Armor("Leather armor", 2, 5);
        this.armors[1] = new Armor("Chainmail", 5, 10);
        this.armors[2] = new Armor("Plate armor", 10, 25);
    }







    //Called when new game button is pressed
    newGame() {

        //Get value from hero name textbox
        let heroName = document.getElementById('heroName').value;

        //If textbox isn't empty
        if (heroName !== "") {

            //Create new hero in global variable "heros"
            this.heros = new Hero(heroName, 15, 0, 10, 5, 5, 1, 1, 0, 0, 0);
            //Change game state to two (2 = combat or shop)
            this.changeState(2);

            //First event
            this.eventCount++;

        } else { //Else nope
            alert("Nan mais allo!");
            return;
        }
    }

    changeState(state) {

        //get all scenes elements
        let menuScene = document.getElementById('menuScene');
        let playScene = document.getElementById('playScene');
        let scoreScene = document.getElementById('scoreScene');
        switch (state) {

            //Case 1 is start menu state
            case 1:
                playScene.style.display = "none";
                scoreScene.style.display = "none";
                menuScene.style.display = "block";
                break;

            //Case 2 is combat
            case 2:
                menuScene.style.display = "none";
                scoreScene.style.display = "none";
                playScene.style.display = "block";
                this.showButtons(2);
                //Create new monster
                this.currentMonster = {...this.monsters[this.rand(2)]};
                this.refresh(1);
                break;
            //Case 3 is score screen
            case 3:
                playScene.style.display = "none";
                menuScene.style.display = "none";
                scoreScene.style.display = "block";
                break;
        }
    }

    //Refreshes all the informations before and during fight / shop
    //event 1 = fight, event 2 = shop
    refresh(event) {
        //Get hero stats div
        let heroStats = document.getElementById('charStats');
        switch (event) {
            case 1:
                //Get monster stat div
                let monsterStats = document.getElementById('monsterStats');

                //Refresh hero stats
                heroStats.innerHTML = "<p>" + this.heros.name +
                    "<br/>HP : " + this.heros.hp +
                    "<br/>Gold : " + this.heros.gold +
                    "<br/>xp : " + this.heros.xp +
                    "<br/>ATK : " + this.heros.atk +
                    "<br/>DEF : " + this.heros.def +
                    "<br/>str : " + this.heros.str +
                    "<br/>end : " + this.heros.end + 
                    "<br/>score : " + this.heros.score + "</p>";

                //Refresh monster stats
                monsterStats.innerHTML = "<p>" + this.currentMonster.name +
                    "<br/>HP : " + this.currentMonster.hp +
                    "<br/>ATK : " + this.currentMonster.atk + "</p>";
                break;
            case 2:
                //Get shop window
                let shopInv = document.getElementById('monsterStats');


                //Refresh hero stats
                heroStats.innerHTML = "<p>" + this.heros.name +
                    "<br/>HP : " + this.heros.hp +
                    "<br/>Gold : " + this.heros.gold +
                    "<br/>xp : " + this.heros.xp +
                    "<br/>ATK : " + this.heros.atk +
                    "<br/>DEF : " + this.heros.def +
                    "<br/>str : " + this.heros.str +
                    "<br/>end : " + this.heros.end + 
                    "<br/>score : " + this.heros.score + "</p>";
                //Display shop content
                shopInv.innerHTML = this.npcs.name + "<br/><br/>" +
                    this.weapons[this.npcs.weapon].name + "<br/>+" +
                    this.weapons[this.npcs.weapon].bonus + "atk<br/>Cost : " +
                    this.weapons[this.npcs.weapon].prix + " gold <br/><br/>" +
                    this.armors[this.npcs.armor].name + "<br/>+" +
                    this.armors[this.npcs.armor].bonus + "def<br/>Cost : " +
                    this.armors[this.npcs.armor].prix + " gold";
                break;
        }
    }

    heroAction(action) {
        let damageH = null;
        let damageM = null;
        switch (action) {
            case 1: //Hero and monster attack

                //Calculate hero and monster attack
                damageH = this.heros.atk + this.heros.str + this.weapons[this.heros.weapon].bonus;
                damageM = this.currentMonster.atk - this.heros.def - this.heros.end - this.armors[this.heros.armor].bonus;

                //If the hero would not kill the monster next swing
                if (this.isDead(this.currentMonster, damageH)) {

                    //Lower monster HP
                    this.currentMonster.hp = this.currentMonster.hp - damageH;

                    //If the hero doesn't get killed by next swing
                    if (this.isDead(this.heros, damageM)) {

                        //Lower hero HP
                        this.heros.hp = this.heros.hp - damageM;
                        //Refresh fight values
                        this.refresh(1);

                    } else { //Hero is dead
                        this.endGame(1);
                    }
                } else { //Monster is dead

                    //1 out of 3 events is a shop
                    if (this.eventCount % 3 !== 0) {
                        //Add score
                        this.heros.score += 5;
                        //New event
                        this.eventCount++;
                        //Gold won from fight
                        this.heros.gold = this.heros.gold + this.currentMonster.gold;
                        //New monster
                        this.currentMonster = {...this.monsters[this.rand(2)]};
                        //New fight
                        this.refresh(1);

                    } else { //Is a shop
                        //We still killed a monster to enter shop so add score and gold
                        //Gold won from fight
                        this.heros.gold = this.heros.gold + this.currentMonster.gold;
                        //Add score
                        this.heros.score += 5;
                        //Reset events
                        this.eventCount = 0;
                        //New shopkeeper, items are random
                        this.npcs = new Npc("Joe", this.rand(2), this.rand(2));
                        //Refresh shop display
                        this.refresh(2);
                        //Show shop buttons
                        this.showButtons(1);
                    }
                }
                break;

            case 2: //Hero defends, monster attacks

                //Maths for monster damage
                damageM = this.currentMonster.atk - this.heros.def - this.heros.end - this.armors[this.heros.armor].bonus;

                //The hero defends
                damageM = floor(damageM / 2);

                //If the hero doesn't get killed by next swing
                if (this.isDead(this.heros, damageM)) {

                    //Lower hero HP
                    this.heros.hp = heros.hp - damageM;
                    //Refresh fight values
                    this.refresh(1);
                } else {

                }
                break;
            case 3:
                break;
        }
    }

    //function returns false if the person would die from swing
    //Else true
    isDead(person, dmg) {
        if (person.hp - dmg < 0) {
            return false;
        } else {
            return true;
        }
    }

    buyWeapon() {
        if (this.heros.gold > this.weapons[this.npcs.weapon].prix) {
            //Removegold
            this.heros.gold = this.heros.gold - this.weapons[this.npcs.weapon].prix;
            //Hero gets weapon
            this.heros.weapon = this.npcs.weapon;
            this.refresh(2);
        } else {

        }
    }

    buyArmor() {
        if (this.heros.gold > this.armors[this.npcs.armor].prix) {
            //Removegold
            this.heros.gold = this.heros.gold - this.armors[this.npcs.armor].prix;
            //Hero gets weapon
            this.heros.armor = this.npcs.armor;
            this.refresh(2);
        } else {

        }
    }

    leaveShop() {
        //New event
        this.eventCount++;
        //New monster
        this.currentMonster = {...this.monsters[this.rand(2)]};
        //New fight
        this.refresh(1);
        this.showButtons(2);
    }

    //functions shows or hide the shop and combat buttons
    showButtons(event) {
        switch (event) {
            case 1 : //Case 1 shows shop
                document.getElementById("shopButtons").style.display = "block";
                document.getElementById("fightButtons").style.display = "none";
                break;
            case 2 : //Case 1 shows combat
                document.getElementById("shopButtons").style.display = "none";
                document.getElementById("fightButtons").style.display = "block";
                break;
            
        }

    }

    endGame(event) {
        switch(event) {
            case 1 :
                this.changeState(3);
                document.getElementById('resultGame').innerText = "Défaite!";
                document.getElementById('scoreGame').innerText = "score : " + this.heros.score;
            case 2 :
        }
    }

    //Random method
    rand(max) {
        return Math.floor(Math.random() * (max + 1));
    };

}