gesture_name = "";

Webcam.set({

    width : 350,
    height : 300,
    img_format : 'png',
    png_quality : 90

});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){

    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';

    });

}

console.log('ml5 version ' , ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/i50HQr2ED/model.json' , modelLoaded);

function modelLoaded(){

    console.log("modelLoaded");

}

function speak(){

    var synth = window.speechSynthesis;
    speakdata_1 = "The  Prediction is" + gesture_name;
    var utterThis = new SpeechSynthesisUtterance(speakdata_1);
    
    synth.speak(utterThis);
    
}
function check(){

    img = document.getElementById("captured_image");
    classifier.classify(img , gotResult);
    
}

function gotResult(error , results){

    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        gesture_name = results[0].label;
        speak();


        if(results[0].label == "Best"){
            document.getElementById("best").style.color = "red";
            document.getElementById("victory").style.color = "black";
            document.getElementById("amazing").style.color = "black";
        }

        if(results[0].label == "Victory"){
            document.getElementById("victory").style.color = "red";
            document.getElementById("best").style.color = "black";
            document.getElementById("amazing").style.color = "black";
        }

        if(results[0].label == "Amazing"){
            document.getElementById("amazing").style.color = "red";
            document.getElementById("victory").style.color = "black";
            document.getElementById("best").style.color = "black";
        }

    }


}




