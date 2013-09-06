
function randomDots()
{
    model = new Model();

    dotCount = 0;

    model.reset();

    var n = dot_num;
    for(var i=0;i<n;i++){
	var randomX = Math.floor(Math.random()*canvas.width  + 1)
	var randomY = Math.floor(Math.random()*canvas.height + 1)
	model.dots.push(new Dot(randomX,randomY));
    }

    model.initCluster();

    canvas.paint();
}

function choiceDots(){
    model = new Model(); 
    dotCount = 0;
    canvas.paint();
    model.reset();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
    };
}

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    var newDot = new Dot(mousePos.x, mousePos.y);
    model.dots.push(newDot);
    model.clusters.push(new Cluster([newDot]));
    canvas.paint();
                                                        }, false);
