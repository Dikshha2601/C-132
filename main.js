var objects = [];
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
        objects = results;
      }
    });
  });
}

function draw() {
  image(img, 0, 0, 640, 480);
  if (status != "") {
    document.getElementById("status").innerHTML = "Status: Objects Detected";
    for (i = 0; i < objects.length; i++) {
      fill("#000000");
      percent = floor(objects[i].confidence * 100);
      text(
        objects[i].label + " " + percent + "%",
        objects[i].x + 15,
        objects[i].y + 15
      );
      noFill();
      stroke("#000000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
