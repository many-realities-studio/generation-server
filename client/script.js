let inputString = "";
let index = 0;
let delay = 100;

function setup() {
  createCanvas(400, 400);
  textSize(32);
  getTextFromAPI();
}

function draw() {
  background(255);
  let displayString = "";
  let words = inputString.split(" ");
  let currentLine = "";
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (textWidth(currentLine + word) < width - 50) {
      currentLine += word + " ";
    } else {
      displayString += currentLine + "\n";
      currentLine = word + " ";
    }
  }
  displayString += currentLine;
  let lines = displayString.split("\n");
  let lineHeight = textAscent() + textDescent();
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let y = (height + lineHeight) / 2 + lineHeight * i;
    text(line, 50, y);
  }
}

let interval;
async function getTextFromAPI() {
  const response = await fetch("http://localhost:3000/generate", 
  {method: "post", body: {text:"Little red riding hood went to the forest and "}});
  const data = await response.json();
  inputString = data.text;
  delay = Math.floor(Math.random() * 200) + 50;
  interval = setInterval(function() {
    index++;
    if (index > inputString.length) {
      clearInterval(interval);
    }
  }, delay);
}
