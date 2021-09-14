class Monster {
    //Init
    constructor(name, hp, gold, atk) {
        this.name = name;
        this.hp = hp;
        this.gold = gold;
        this.atk = atk;
    }

    //Getters, setters
    

}

class Hero extends Monster{

    //Init
    constructor(name, hp, xp, gold, atk, def, str, end, score, weapon, armor) {
        super(name, hp, gold, atk);
        this.xp = xp;
        this.def = def;
        this.str = str;
        this.end = end;
        this.score = score;
        this.weapon = weapon;
        this.armor = armor;
    }
}