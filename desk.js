status="";
objects=[];
objectDetector="";
function back(){
    window.location= "index.html";
}

function preload(){
    img= loadImage("images.jfif");
}

function setup(){
    canvas= createCanvas(640, 420);
    canvas.position(450, 190);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status= true;
}

function gotResult(error , result){
    if (error){
        console.log(error);
    }
    console.log(result);
    objects = result;
}

function draw() { 
    image(img, 0, 0, 640, 420); 
    if(status != "") { 
        r = random(255); 
        g = random(255); 
        b = random(255); 
        objectDetector.detect(img, gotResult); 
        for (i = 0; i < objects.length; i++) { 
            document.getElementById("status").innerHTML = "Status : Object Detected"; 
            fill(r , g , b); 
            percent = floor(objects[i].confidence * 100); 
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
            noFill(); 
            stroke(r, g, b); 
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
        } 
    } 
}