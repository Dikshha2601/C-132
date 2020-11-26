var objects = [];
var status = "";
var img = "";

function preload() {
  img = loadImage("dog_cat.jpg");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  document.getElementById("status").innerHTML = "Status: Detecting objects";

  objectDetection = ml5.objectDetector("cocossd", function () {
    console.log("Model loaded");
    status = true;
  });
}

function draw() {
  image(video, 0, 0, 380, 380);
  objectDetection.detect(video, function (error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      objects = results;
    }
  });
  if (status != "") {
    document.getElementById("status").innerHTML = "Status: Objects Detected";
    document.getElementById("no_of_objects").innerHTML =
      "Number of objects: " + objects.length;

    r = random(255);
    g = random(255);
    b = random(255);
    for (i = 0; i < objects.length; i++) {
      fill(r, g, b);
      percent = floor(objects[i].confidence * 100);
      text(
        objects[i].label + " " + percent + "%",
        objects[i].x + 15,
        objects[i].y + 15
      );
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
