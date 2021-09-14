class Game {

    init() {
        monsters[0] = new Monster("Goblin", 10, 10, 10);
        monsters[1] = new Monster("Orc", 20, 12, 12);
        monsters[2] = new Monster("Undead", 15, 2, 15);
        weapons[0] = new Weapon("Club", 3, 5);
        weapons[1] = new Weapon("Sword", 5, 10);
        weapons[2] = new Weapon("Axe", 8, 15);
        armors[0] = new Armor("Leather armor", 2, 5);
        armors[1] = new Armor("Chainmail", 5, 10);
        armors[2] = new Armor("Plate armor", 10, 25);
    }







    //Called when new game button is pressed
    newGame() {

        //Get value from hero name textbox
        var heroName = document.getElementById('heroName').value;

        //If textbox isn't empty
        if (heroName !== "") {

            //Create new hero in global variable "heros"
            heros = new Hero(heroName, 100, 0, 10, 5, 5, 1, 1, 0, 0);

            //Change game state to two (2 = combat or shop)
            this.changeState(2, "fight");

            //First event
            eventCount++;

        } else { //Else nope
            alert("Nan mais allo!");
            return;
        }
    }

    changeState(state, event) {

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

            //Case 2 is combat / shop state
            case 2:
                menuScene.style.display = "none";
                scoreScene.style.display = "none";
                playScene.style.display = "block";
                document.getElementById("shopButtons").style.display = "none";
                currentMonster = monsters[this.rand(2)]
                this.refreshFight(heros, currentMonster);
                break;

            //Case 3 is score screen
            case 3:
                playScene.style.display = "none";
                menuScene.style.display = "none";
                scoreScene.style.display = "block";
                break;
        }
    }

    //Refreshes all the informations before and during fight
    refreshFight(hero, monster) {
        //Get both stats divs
        let heroStats = document.getElementById('charStats');
        let monsterStats = document.getElementById('monsterStats');

        currentMonster = monster;
        heros = hero;

        //Refresh hero stats
        heroStats.innerHTML = "<p>" + hero.name +
            "<br/>HP : " + hero.hp +
            "<br/>Gold : " + hero.gold +
            "<br/>xp : " + hero.xp +
            "<br/>ATK : " + hero.atk +
            "<br/>HP : " + hero.def +
            "<br/>str : " + hero.str +
            "<br/>end : " + hero.end + "</p>";

        //Refresh monster stats
        monsterStats.innerHTML = "<p>" + monster.name +
            "<br/>HP : " + monster.hp +
            "<br/>ATK : " + monster.atk + "</p>";
    }

    heroAction(action, hero, monster) {
        let damageH = null;
        let damageM = null;
        switch (action) {
            case 1: //Hero and monster attack

                //Calculate hero and monster attack
                damageH = hero.atk + hero.str + weapons[hero.weapon].bonus;
                damageM = monster.atk - hero.def - hero.end - armors[hero.armor].bonus;

                //If the hero would not kill the monster next swing
                if (this.isDead(monster, damageH)) {

                    //Lower monster HP
                    monster.hp = monster.hp - damageH;

                    //If the hero doesn't get killed by next swing
                    if (this.isDead(hero, damageM)) {

                        //Lower hero HP
                        hero.hp = hero.hp - damageM;
                        //Refresh fight values
                        this.refreshFight(hero, monster);

                    } else { //Hero is dead

                    }
                } else { //Monster is dead

                    //1 out of 3 events is a shop
                    if (eventCount % 3 !== 0) {

                        //New event
                        eventCount++;
                        //Gold won from fight
                        hero.gold = hero.gold + monster.gold;
                        //Refresh monsters values
                        this.init();
                        //New monster
                        monster = monsters[this.rand(2)];
                        //New fight
                        this.refreshFight(hero, monster);

                    } else { //Is a shop
                        this.refreshFight(hero, monster);
                        npcs = new Npc("Joe", this.rand(2), this.rand(2));
                        this.showShop(npcs);
                    }
                }
                break;

            case 2: //Hero defends, monster attacks
                
                //Maths for monster damage
                damageM = monster.atk - hero.def - hero.end - armors[hero.armor].bonus;

                //The hero defends
                damageM = floor(damageM / 2);

                //If the hero doesn't get killed by next swing
                if (this.isDead(hero, damageM)) {

                    //Lower hero HP
                    hero.hp = hero.hp - damageM;
                    //Refresh fight values
                    this.refreshFight(hero, monster);
                } else {

                }
                break;
            case 3:
                break;
        }
    }

    isDead(person, dmg) {
        if (person.hp - dmg < 0) {
            return false;
        } else {
            return true;
        }
    }

    showShop(npc) {
        let shopInv = document.getElementById('monsterStats');
        document.getElementById("shopButtons").style.display = "block";
        document.getElementById("fightButtons").style.display = "none";
        shopInv.innerHTML = npcs.name + "<br/><br/>" +
                            weapons[npc.weapon].name + "<br/>+" +
                            weapons[npc.weapon].bonus + "atk<br/>Cost : " +
                            weapons[npc.weapon].prix + " gold <br/><br/>" +
                            armors[npc.armor].name + "<br/>+" +
                            armors[npc.armor].bonus + "def<br/>Cost : " +
                            armors[npc.armor].prix + " gold";
    }

    buyWeapon() {

    }

    buyArmor() {

    }

    leaveShop() {

    }


    //Random method
    rand(max) {
        return Math.floor(Math.random() * (max + 1));
    };

}