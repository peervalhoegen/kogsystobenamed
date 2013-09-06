function step(){
    if(model.clusters.length >= 2){

        model.lineStack.push(model.lines.slice(0));
        model.clusterStack.push(model.clusters.slice(0));

        mergeClosest(neighbour_factor);
        canvas.paint();
    }
}

function back(){
    if(model.lines.length >= 1 ){
        model.lines    = model.lineStack.pop();
        model.clusters = model.clusterStack.pop();
        canvas.paint();
    }
}

function update_k(val){
    neighbour_factor=val;
}

function update_n(val){
    dot_num = val;
    randomButton.value ="Place "+ dot_num +" dots randomly";
}

var randomButton = document.getElementById("random_button");
randomButton.addEventListener('click', randomDots, false);

var choiceButton = document.getElementById("choice_button");
choiceButton.addEventListener('click', choiceDots, false);

var stepButton = document.getElementById("step_button");
stepButton.addEventListener('click', step, false);

var backButton = document.getElementById("back_button");
backButton.addEventListener('click', back, false);

//action
var neighbour_factor=0;
var dot_num = 30;
//var choiceEnabled = false;
var canvas=document.getElementById("canvas");
model = new Model();
canvas.paint();
