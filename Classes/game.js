class Game {

    init() {
        monsters = new Monster("Goblin", 10, 10, 10);
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
            heros = new Hero(heroName, 10, 0, 10, 5, 5, 1, 1, 0, 0);

            //Change game state to two (2 = combat or shop)
            this.changeState(2, "fight");

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
            case 1 :
                playScene.style.display = "none";
                scoreScene.style.display = "none";
                menuScene.style.display = "block";
                break;

            //Case 2 is combat / shop state
            case 2 :
                menuScene.style.display = "none";
                scoreScene.style.display = "none";
                playScene.style.display = "block";
                document.getElementById("shopButtons").style.display = "none";
                this.refreshFight(heros, monsters);
                break;
            
            //Case 3 is score screen
            case 3 :
                playScene.style.display = "none";
                menuScene.style.display = "none";
                scoreScene.style.display = "block";
                break;
        }
    }

    //Refreshes all the informations before and during fight
    refreshFight(hero, monster) {
        if (hero.hp < 0) {

        } else if (monster.hp < 0) {

        } else {
            //Get both stats divs
            let heroStats = document.getElementById('charStats');
            let monsterStats = document.getElementById('monsterStats');

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
            "<br/>HP : " + monsters.hp +
            "<br/>ATK : " + monsters.atk + "</p>";
        }
    }

    heroAction(action, hero, monster) {
        switch (action) {
            case 1 :
                let damageH = hero.atk + hero.str + weapons[hero.weapon].bonus;
                monster.hp = monster.hp - damageH;
                let damageM = monster.atk - hero.def - hero.end - armors[hero.armor].bonus;
                console.log(damageM);
                if (this.isDead(monster)) {
                    hero.hp = hero.hp - damageM;
                    if (this.isDead(hero)) {
                        this.refreshFight(hero, monster);
                    }
                }
                break;
            case 2 :
                break;
            case 3 : 
                break;
        }
    }

    isDead(person) {
        if (person.hp < 0) {
            return false;
        } else {
            return true;
        }
    }

    showShop(npc) {

    }

    buyWeapon() {

    }

    buyArmor() {

    }

    leaveShop() {
        
    }



}