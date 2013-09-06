canvas.drawFrame = function()
{
    ctx=canvas.getContext("2d");
    width = canvas.width;
    height= canvas.height;
    ctx.beginPath();
    ctx.moveTo(    0,      0);
    ctx.lineTo(    0, height);
    ctx.lineTo(width, height);
    
    ctx.lineTo(width,      0);
    ctx.lineTo(    0,      0);
    ctx.stroke();
}

canvas.paint = function(){
    ctx=canvas.getContext("2d");
    width  = canvas.width;
    height = canvas.height;

    /* clear */
    ctx.clearRect( 0, 0, width, height);
    canvas.drawFrame();    
    ctx.beginPath();

    /* and draw */

    var dots = model.dots;
    for(var i=0; i<dots.length; i++){
        dots[i].draw(ctx);
    }

    var lines = model.lines;
    for(var i=0; i<lines.length; i++){
        lines[i].draw(ctx);
    }
}

function Dot(x,y) {

    this.x=x;
    this.y=y;
    this.rad=3;
    this.id = dotCount;
    dotCount++;
    this.draw=draw;

    function draw(context){

          // development context.fillText(this.id + '',x+5,y);

        tmp = context.fillStyle;

        context.beginPath();
        context.fillStyle="#0000FF";
        context.arc(x,y, this.rad, 0, 2*Math.PI, false);
        context.fill();

        context.fillStyle = tmp;
    }
}

function Line(p,q){
    this.p = p;
    this.q = q;
    
    this.draw = function(context){
         context.beginPath();
         context.moveTo(this.p.x, this.p.y);
         context.lineTo(this.q.x, this.q.y);
         context.stroke();
    }
}
