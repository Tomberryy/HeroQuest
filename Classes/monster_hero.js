class Monster {
    //Init
    constructor(name, hp, gold, atk, pic) {
        this.name = name;
        this.hp = hp;
        this.gold = gold;
        this.atk = atk;
        this.pic = pic;
    }

    //Getters, setters
    

}

class Hero extends Monster{

    //Init
    constructor(name, hp, xp, gold, atk, def, str, end, score, weapon, armor, pic) {
        super(name, hp, gold, atk, pic);
        this.xp = xp;
        this.def = def;
        this.str = str;
        this.end = end;
        this.score = score;
        this.weapon = weapon;
        this.armor = armor;
    }
}