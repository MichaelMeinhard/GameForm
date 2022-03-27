let canvas, shrek, imgS, pozadi, wc, score, button;
let wcs = [];
let value = 0;

const form = document.getElementById('form');
const submit = document.querySelector('form button');
const scoreP = document.getElementById('score');

//let music;

/*this.gravity = 1;
this.velocity = 0;

this.update = function(){
  this.velocity += this.gravity;
  this.y += this.velocity;
  }
*/


function preload() {
  imgS = loadImage("./img/shrek.png");
  pozadi = loadImage("./img/pozadi.jpg");
  wc = loadImage("./img/wc.png");
  wc1 = loadImage("./img/wc1.png");
  //music = loadSound("./sound/AllStar.mp3");
}

/*classa pro score*/
class Score {
  constructor() {
    this.x = 50
    this.y = 50
  }

  draw() {
    textSize(32);
    text(`Score: ${value}`, 50, 50);
    fill(250)
  }
/*výpočet score aby seděl*/
  count() {
    return value = Math.floor((frameCount - 200) / 160);
  }
}

/*classa shreka*/
class Shrek {
  constructor(x, y) {
    this.x = x;
    this.y = height / 2;
  }
  /*zobrazení shreka*/
  draw() {
    push();
    //square(80, this.y /2 + 25, 50);
    //noFill();
    image(imgS.get(0, 0, 50, 50), 80, this.y + 25);
    pop();
  }
  /*gravitace *//*omezení spadnutí/vyletění*/
  update() {
    this.gravity = 1;
    this.velocity = 2;
    this.velocity += this.gravity;
    this.y += this.velocity;
    //console.log(this.y);

    /*omezení spadnutí/vyletění*/
    if (this.y + 65 > height) {
      this.y = height - 65;
    }
    if (this.y < -25) {
      this.y = -25;
    }
  }
  /*pohyb shreka nahoru*/
  move() {
    if (keyIsDown(32)) {
      ost.play();
      this.y -= 12;
      //console.log("SPACE")
    }
  }
}

/*classa záchodů*/
class Wc {
  constructor() {
    this.space = 200;
    this.top = random(height / 6, 3 / 4 * height);
    this.bot = height - (this.top + this.space);
    this.x = width;
    this.w = 120;
    this.speed = 3;
  }
  /*vyhreslení záchodů*/
  draw() {
    push();
    //rect(this.x, 0, this.w, this.top);
    image(wc1, this.x, 0, this.w, this.top);
    //rect(this.x, height-this.bot, this.w, this.bot);
    image(wc, this.x, height - this.bot, this.w, this.bot);
    pop();
  }
  /*rychlost pohybu záchodů*/
  update() {
    this.x -= this.speed;
  }
}

/*function spawn(){
  let width = 120;
  this.top = random(height/2);
  this.bot = random(height/2);
  this.x = width;
  this.w = 120;
}*/


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function setup() {
  canvas = createCanvas(1100, 650);

  score = new Score(50, 50);
  canvas.parent("canvas");
  shrek = new Shrek(80, height / 2 + 25);
  wcs.push(new Wc());
}

function draw() {
  image(pozadi, 0, 0);
  shrek.move();
  shrek.update();
  shrek.draw();

  /* každý 160snímek se udělá záchod*/
  if (frameCount % 160 == 0) {
    wcs.push(new Wc()); 
  }

  /*vykreslování záchdoů*/
  for (let i = wcs.length - 1; i >= 0; i--) {
    wcs[i].draw();
    wcs[i].update();
    /*mazání z pole už neviděných záchodů*/
    if (wcs[i].x + 120 < 0) {
      wcs.splice(i, 1);
    }
    /*výpis score hráče*/
    score.draw();
    setTimeout(score.count, 5000)
    
    form.style.display = 'none';
    /* Zde je naznačeno řešení kolizí - musíte zkontrolovat možnou kolizi 
    horního i spodního obdélníku s obdélníkem Shreka. */
    if (collideRectRect(wcs[i].x + 20, 0, wcs[i].w - 40, wcs[i].top - 45, shrek.x, shrek.y, 50, 50)
      || collideRectRect(wcs[i].x + 20, height - wcs[i].bot + 10, wcs[i].w -10 , wcs[i].bot, shrek.x, shrek.y, 50, 50)) {
      noLoop();
      textSize(85);
      fill(200, 30, 30);
      text("Game Over", width/2 - 250, height/2 - 100, 500, 300);
      text(`Your Score: ${value}`, width/2 - 280, height/2 + 10, 700, 300);
      scoreP.value = score.count();
      form.style.display = 'block';
      
  
      /* Počítá úplně všechny kolize obdélníků*/
      //console.log('Narazil jsi, Shreku!');
    }
  }
}