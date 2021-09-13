class Weapon {

    constructor(name, bonus, prix) {
        this.name = name;
        this.bonus = bonus;
        this.prix = prix;
    }
}

class Armor extends Weapon {
    constructor(name, bonus, prix) {
        super(name, bonus, prix);
    }
}