class Game {

    heros = null;
    weapons = [];
    armors = [];
    npcs = null;
    monsters = [];
    currentMonster = null;
    eventCount = 0;
    difficulty = 0;
    isBoss = false;


    init() {

        //MONSTERS
        //3 per difficulty
        this.monsters[0] = new Monster("Goblin", 10, 10, 10, "./images/Monster/1/gobelin.jpg");
        this.monsters[1] = new Monster("Orc", 20, 12, 12, "./images/Monster/1/orc.jpeg");
        this.monsters[2] = new Monster("Undead", 15, 2, 15, "./images/Monster/1/undead.png");

        this.monsters[3] = new Monster("Spirit", 10, 2, 15, "./images/Monster/2/ghost.png");
        this.monsters[4] = new Monster("Démon", 20, 5, 17, "./images/Monster/2/démon.png");
        this.monsters[5] = new Monster("Werewolf", 16, 7, 18, "./images/Monster/2/werewolf.png");

        this.monsters[6] = new Monster("Cyclops", 25, 10, 20, "./images/Monster/3/cyclops.png");
        this.monsters[7] = new Monster("Golem ", 35, 10, 12, "./images/Monster/3/golem.png");
        this.monsters[8] = new Monster("Dragon", 30, 15, 25, "./images/Monster/3/dragon.jpg");

        this.monsters[9] = new Monster("Magician", 30, 25, 25, "./images/Monster/4/magician.jpg");
        this.monsters[10] = new Monster("Balrog", 35, 15, 25, "./images/Monster/4/balrog.png");
        this.monsters[11] = new Monster("Ice Dragon", 45, 15, 20, "./images/Monster/4/dragonice.png");

        this.monsters[12] = new Monster("Master Orc", 20, 0, 20, "./images/Monster/boss/masterorc.png");
        this.monsters[12] = new Monster("Ragnaros", 30, 0, 30, "./images/Monster/boss/ragnaros.png");
        this.monsters[13] = new Monster("Illidan", 40, 0, 40, "./images/Monster/boss/illidan.png");
        this.monsters[14] = new Monster("Lich King", 50, 0, 50, "lichking.png");

        //WEAPONS Init
        this.weapons[0] = new Weapon("Club", 3, 5);
        this.weapons[1] = new Weapon("Sword", 5, 10);
        this.weapons[2] = new Weapon("Axe", 8, 15);
        this.weapons[5] = new Weapon("Dagger", 4, 8)
        this.weapons[1] = new Weapon("Sword", 5, 10);
        this.weapons[3] = new Weapon("Bow", 6, 12);
        this.weapons[4] = new Weapon("Fist Weapon", 7, 12);
        this.weapons[5] = new Weapon("Axe", 8, 15);
        this.weapons[6] = new Weapon("Fire Bow", 10, 20);
        this.weapons[7] = new Weapon("Fire Sword", 15, 35);
        this.weapons[8] = new Weapon("Fire double Sword", 30, 50);

        //ARMORS init
        this.armors[0] = new Armor("Leather armor", 2, 5);
        this.armors[1] = new Armor("Chainmail", 5, 10);
        this.armors[2] = new Armor("Chainmail gold armor", 10, 15);
        this.armors[3] = new Armor("Plate armor", 15, 25);
        this.armors[4] = new Armor("Plate gold armor", 20, 40);
        this.armors[5] = new Armor("Plate magic armor", 30, 50);

    }







    //Called when new game button is pressed
    newGame() {

        //Get value from hero name textbox
        let heroName = document.getElementById('heroName').value;

        //If textbox isn't empty
        if (heroName !== "") {

            //Create new hero in global variable "heros"
            this.heros = new Hero(heroName, 150, 0, 10, 5, 5, 1, 1, 0, 0, 0);
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
                this.currentMonster = { ...this.monsters[this.rand(2)] };
                this.refresh(1);
                this.refresh(3);
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
    //event 1 = fight, event 2 = shop, event 3 = inventory
    refresh(event) {
        //Get hero stats div
        let heroStats = document.getElementById('charStats');
        let str=this.heros.name; 
        switch (event) {
            case 1:
                let monsterPic = document.getElementById('monPic');
                monsterPic.src = this.currentMonster.pic;
                //Get monster stat div
                let monsterStats = document.getElementById('monsterStats');
                //Refresh hero stats
                heroStats.innerHTML = "<br><div class='espace'>" + str.toUpperCase() + "</div><p>" +
                    "<br/><div class='espace'>HP</div>" + " : " + String(this.heros.hp).padStart(2, '0') +
                    "<br/><div class='espace'>GOLD</div>" + " : " + String(this.heros.gold).padStart(2, '0') +
                    "<br/><div class='espace'>XP</div>" + " : " + String(this.heros.xp).padStart(2, '0') +
                    "<br/><div class='espace'>ATK</div>" + " : " + String(this.heros.atk).padStart(2, '0') +
                    "<br/><div class='espace'>DEF</div>" + " : " + String(this.heros.def).padStart(2, '0') +
                    "<br/><div class='espace'>STR</div>" + " : " + String(this.heros.str).padStart(2, '0') +
                    "<br/><div class='espace'>END</div>" + " : " + String(this.heros.end).padStart(2, '0') + 
                    "<br/><div class='espace'>SCORE</div>" + " : " + String(this.heros.score).padStart(2, '0') + "</p>";

                //Refresh monster stats
                    let str2=this.currentMonster.name
                monsterStats.innerHTML = "<p><div class='espace'>" + str2.toUpperCase() + "</div><br><br>" + 
                    "<br/><div class='espace'>HP : </div>" + this.currentMonster.hp +
                    "<br/><div class='espace'>ATK : </div>" + this.currentMonster.atk + "</p>";
                break;
            case 2:
                //Get shop window
                let shopInv = document.getElementById('monsterStats');


                //Refresh hero stats
                heroStats.innerHTML = "<br><div class='espace'>" + str.toUpperCase() + "</div><p>" +
                    "<br/><div class='espace' id='initial'>HP</div>" + " : " + String(this.heros.hp).padStart(2, '0') +
                    "<br/><div class='espace'>GOLD</div>" + " : " + String(this.heros.gold).padStart(2, '0') +
                    "<br/><div class='espace'>XP</div>" + " : " + String(this.heros.xp).padStart(2, '0') +
                    "<br/><div class='espace'>ATK</div>" + " : " + String(this.heros.atk).padStart(2, '0') +
                    "<br/><div class='espace'>DEF</div>" + " : " + String(this.heros.def).padStart(2, '0') +
                    "<br/><div class='espace'>STR</div>" + " : " + String(this.heros.str).padStart(2, '0') +
                    "<br/><div class='espace'>END</div>" + " : " + String(this.heros.end).padStart(2, '0') + 
                    "<br/><div class='espace'>SCORE</div>" + " : " + String(this.heros.score).padStart(2, '0') + "</p>";
                //Display shop content
                shopInv.innerHTML = 
                "<br/><div class='espace'></div>" +  String(this.weapons[this.npcs.weapon].name).padStart(2, '0') +
                "<br/><div class='espace'>ATK</div>" + " : " + String(this.weapons[this.npcs.weapon].bonus).padStart(2, '0') + 
                "<br/><div class='espace'>Price</div>" + " : " + String(this.weapons[this.npcs.weapon].prix).padStart(2, '0') + 
                "<br/><div class='espace'></div>" + String(this.armors[this.npcs.armor].name).padStart(2, '0') +  
                "<br/><div class='espace'>DEF</div>" + " : " + String(this.armors[this.npcs.armor].bonus).padStart(2, '0') +
                "<br/><div class='espace'>price</div>" + " : " + String(this.armors[this.npcs.armor].prix).padStart(2, '0');
                break;
            case 3:
                //Get hero inventory div
                let heroInv = document.getElementById('div_inv');
                heroInv.innerHTML = "<h3>Inventaire</h3><p>" +
                    this.weapons[this.heros.weapon].name + " : " + this.weapons[this.heros.weapon].bonus + " ATK<br/>" +
                    this.armors[this.heros.armor].name + " : " + this.armors[this.heros.armor].bonus + " DEF</p>";
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

                        //if hero takes negative damage don't heal him
                        if (damageM < 1) {
                            //Refresh fight values
                            this.refresh(1);
                        } else {
                            //Lower hero HP
                            this.heros.hp = this.heros.hp - damageM;
                            this.refresh(1);
                        }

                    } else { //Hero is dead
                        this.endGame(1);
                    }
                } else { //Monster is dead
                    if (this.isBoss == false) {
                        //1 out of 3 events is a shop
                        if (this.eventCount % 3 !== 0) {
                            //Add score
                            this.heros.score += 5;
                            //New event
                            this.eventCount++;
                            //Gold won from fight
                            this.heros.gold = this.heros.gold + this.currentMonster.gold;
                            //New monster
                            this.currentMonster = { ...this.monsters[this.rand(2)] };
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
                            this.npcs = new Npc("Joe", this.randShop(this.weapons.length - 1), this.randShop(this.armors.length - 1));
                            //Refresh shop display
                            this.refresh(2);
                            //Show shop buttons
                            this.showButtons(1);
                        }
                    } else {
                        this.heros.score += 20;
                        this.endGame(2);
                    }

                }break;
            case 2: //Hero defends, monster attacks

        //Maths for monster damage
        damageM = this.currentMonster.atk - this.heros.def - this.heros.end - this.armors[this.heros.armor].bonus;

        //The hero defends
        damageM = Math.floor(damageM / 2);

        //If the hero doesn't get killed by next swing
        if (this.isDead(this.heros, damageM)) {

            //Lower hero HP
            this.heros.hp = this.heros.hp - damageM;
            //Refresh fight values
            this.refresh(1);
        } else {

        }
        break;
            case 3: //3 = hero flees
        //1 out of 3 events is a shop
        if (this.eventCount % 3 !== 0) {
            //Remove score
            this.heros.score -= 5;
            //If the hero doesn't get killed by next swing
            if (this.isDead(this.heros, damageM)) {
                //Lower hero HP for fleeing
                this.heros.hp = this.heros.hp - 10;

            } else { //Hero is dead
                this.endGame(1);
                return;
            }
            //New event
            this.eventCount++;
            //New monster
            this.currentMonster = { ...this.monsters[this.rand(2)] };
            //New fight
            this.refresh(1);

        } else { //Is a shop
            //Remove score
            this.heros.score -= 5;
            //If the hero doesn't get killed by next swing
            if (this.isDead(this.heros, damageM)) {
                //Lower hero HP for fleeing
                this.heros.hp = this.heros.hp - 10;

            } else { //Hero is dead
                this.endGame(1);
                return;
            }
            this.eventCount = 0;
            //New shopkeeper, items are random
            this.npcs = new Npc("Joe", this.randShop(this.weapons.length - 1), this.randShop(this.armors.length - 1));
            //Refresh shop display
            this.refresh(2);
            //Show shop buttons
            this.showButtons(1);
        }
        break;
    }
}

//function returns false if the person would die from swing
//Else true
isDead(person, dmg) {
    if (person.hp - dmg <= 0) {
        return false;
    } else {
        return true;
    }
}

//Called when the buy weapon button is pressed in shop
buyWeapon() {
    if (this.heros.gold >= this.weapons[this.npcs.weapon].prix) {
        //Removegold
        this.heros.gold = this.heros.gold - this.weapons[this.npcs.weapon].prix;
        //Hero gets weapon
        this.heros.weapon = this.npcs.weapon;
        //refresh shop / inventory
        this.refresh(2);
        this.refresh(3);
    } else {

    }
}

//Called when the buy armor button is pressed in shop
buyArmor() {
    if (this.heros.gold >= this.armors[this.npcs.armor].prix) {
        //Removegold
        this.heros.gold = this.heros.gold - this.armors[this.npcs.armor].prix;
        //Hero gets weapon
        this.heros.armor = this.npcs.armor;
        //refresh shop / inventory
        this.refresh(2);
        this.refresh(3);
    } else {

    }
}

leaveShop() {
    //New event
    this.eventCount++;
    if (this.difficulty !== 9) { //if difficulty isn't the boss stage
        //Increase difficulty
        this.difficulty += 3;
        //New monster
        this.currentMonster = { ...this.monsters[this.rand(2)] };
    } else {
        this.currentMonster = { ...this.monsters[this.rand(3)] };
        this.isBoss = true;
    }
    //New fight
    this.refresh(1);
    //Show fight buttons
    this.showButtons(2);
}

//functions shows or hide the shop and combat buttons
showButtons(event) {
    switch (event) {
        case 1: //Case 1 shows shop
            document.getElementById("shopButtons").style.display = "flex";
            document.getElementById("fightButtons").style.display = "none";
            break;
        case 2: //Case 1 shows combat
            document.getElementById("shopButtons").style.display = "none";
            document.getElementById("fightButtons").style.display = "flex";
            break;

    }

}

endGame(event) {
    switch (event) {
        case 1:
            this.changeState(3);
            document.getElementById('resultGame').innerText = "Défaite!";
            document.getElementById('scoreGame').innerText = "score : " + this.heros.score;
        case 2:
            this.changeState(3);
            document.getElementById('resultGame').innerText = "Victoire!";
            document.getElementById('scoreGame').innerText = "score : " + this.heros.score;
    }
}

//Random method with difficulty (For fights)
rand(max) {
    return Math.floor(Math.random() * (max + 1) + this.difficulty);
};

//Random method without difficulty (For shops)
randShop(max) {
    return Math.floor(Math.random() * (max + 1));
};


//Get data from SQL
async getInit() {
    const init = await axios.get('http://127.0.0.1/edsa-HeroQuest/SQL/SQL.php?getInit=1');
    console.log(init)
}

}