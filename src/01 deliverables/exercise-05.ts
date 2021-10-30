console.log("************** DELIVERABLE 05 *********************");
class SlotMachine {
    private coins: number;

    constructor() {
        this.coins = 0;
    }

    play() {
        this.coins++;

        let roulettes = true;
        for (let i = 0; i < 3; i++) {
            roulettes &&= Math.random() < 0.5;
            if (!roulettes) {
                console.log('Good luck next time!!');
                return;
            }
        }

        console.log(`Congratulations!!! You won ${this.coins} coins!!`);
        this.coins = 0;
    }
}