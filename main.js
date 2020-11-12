var status = "";
var img = "";

function preload() {
  img = loadImage("dog_cat.jpg");
}

function setup() {
  canvas = createCanvas(640, 480);
  canvas.center();
  document.getElementById("status").innerHTML = "Status: Detecting objects";

  objectDetection = ml5.objectDetector("cocossd", function () {
    console.log("Model loaded");
    status = true;

    objectDetection.detect(img, function (error, results) {
      if (error) {
        console.error(error);
      } else {
        console.log(results);
      }
    });
  });
}

function draw() {
  image(img, 0, 0, 640, 480);
  stroke("#000000");
  textSize(20);
  text("cat", 300, 90);
  noFill();
  rect(290, 70, 300, 400);

  stroke("#000000");
  textSize(20);
  text("dog", 80, 70);
  noFill();
  rect(70, 50, 500, 420);
}
