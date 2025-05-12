class Foreground {
    constructor() {
        this.player1Name = "";
        this.player2Name = "";
        this.player1Input = null;
        this.player2Input = null;
    }
    preload() {
        // Text items
        this.titleBanner = loadImage('assets/Buttons/ButtonSheet.png')
    }
    setup() {
        // Create input fields for player names
        this.player1Input = createInput("").attribute("placeholder", "Enter Player 1 Name");
        this.player1Input.position(50, 150);
        this.player1Input.style('font-family', 'FutilePro');
        this.player1Input.style('font-size', '20px');
        this.player1Input.style('padding', '5px');
        this.player1Input.style('border-radius', '5px');
        this.player1Input.style('border', '2px solid #ffc832');
        this.player1Input.style('width', '200px');
        this.player1Input.style('position', 'absolute');
        this.player1Input.style('left', '50px');
        this.player1Input.style('text-align', 'center');
        
        this.player2Input = createInput("").attribute("placeholder", "Enter Player 2 Name");
        this.player2Input.position(width - 250, 150);
        this.player2Input.style('font-family', 'FutilePro');
        this.player2Input.style('font-size', '20px');
        this.player2Input.style('padding', '5px');
        this.player2Input.style('border-radius', '5px');
        this.player2Input.style('border', '2px solid #ffc832');
        this.player2Input.style('width', '200px');
        this.player2Input.style('position', 'absolute');
        this.player2Input.style('text-align', 'center');
    }
    updatePlayerNames() {
        this.player1Name = this.player1Input.value() || "Player 1";
        this.player2Name = this.player2Input.value() || "Player 2";
    }
    draw() {
        // TITLE TEXT
        image(this.titleBanner, 375, 2, 650, 210, 165, 305, 410, 165)
        textFont(font);
        textSize(90)
        textAlign(CENTER)
        fill(245, 245, 245);
        text("Dino Dance!", 710, 130);
        fill(255, 220, 50);
        text("Dino Dance!", 705, 125);
        fill(255, 170, 0);
        text("Dino Dance!", 700, 120);

        // Show/hide input fields based on game screen
        if (gameScreen === "home") {
            this.player1Input.show();
            this.player2Input.show();
        } else {
            this.player1Input.hide();
            this.player2Input.hide();
        }

        // Player section text
        textFont(font);
        textSize(50)
        textAlign(CENTER)
        fill(150, 75, 0);
        text(this.player1Name || "Player 1", 153, 243);
        text(this.player2Name || "Player 2", width - 147, 243);
        fill(245, 245, 245);
        text(this.player1Name || "Player 1", 150, 240);
        text(this.player2Name || "Player 2", width - 150, 240);
        textSize(30)
        fill(150, 75, 0);
        text("Score:", 150, 280);
        text("Score:", width - 150, 280);
        // Multipliers
        fill(245, 245, 245);
        text("Streak! >>", 210, 670)
        text("<< Streak!", width - 210, 670)
    }
    cleanup() {
        if (this.player1Input) this.player1Input.remove();
        if (this.player2Input) this.player2Input.remove();
    }
}