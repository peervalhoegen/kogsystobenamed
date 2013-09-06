function Model(){
    this.dots = new Array();
    this.clusters = new Array();
    this.lines = []//new Array();

    this.clusterStack = new Array();
    this.lineStack    = new Array();

    this.initCluster= function(){
        for(var i=0;i<this.dots.length; i++){
            this.clusters.push(new Cluster([this.dots[i]]));
        }

    }
    /*does it even work?*/
    this.reset= function(){
        this.lines.length        = 0;
        this.clusters.length     = 0;
        this.lineStack.length    = 0;
        this.clusterStack.length = 0;
    }
}

function Cluster(dots){
    this.dots = dots;
    this.merge = function(other){
        return new Cluster(this.dots.concat(other.dots));
    }
}

function mergeClosest(k){

    var clusters = model.clusters;
    var p = clusters[0];
    var q = clusters[1];
    var indexP =0;
    var indexQ =1;
    var min = clusterDistance(p, q, k);   //[dist, dot1, dot2]
    for(var i=0;i<clusters.length; i++){
        for(var j=i+1; j<clusters.length; j++){
            p = clusters[i];
            q = clusters[j];
            var dist = clusterDistance(p, q, k);
            if (dist[0] < min[0]){
                min = dist;
                indexP=i;
                indexQ=j;
            }
        }
    }

    p = clusters[indexP];
    q = clusters[indexQ];

    clusters.splice(Math.max(indexP, indexQ),1);
    clusters.splice(Math.min(indexP, indexQ),1);
    clusters.push(p.merge(q));

    var dot1 = min[1];
    var dot2 = min[2];

    model.lines.push(new Line(dot1,dot2));
}

/* computes distance of two clusters with respect to k.
   k depicts a sort of a quantile

   returns [distance, dot1, dot2]
*/
function clusterDistance(clusterP, clusterQ, k){
    //sort all pairs
    var pairlist = new Array();
    var dotsP = clusterP.dots;
    var dotsQ = clusterQ.dots;
    for(var i=0; i<dotsP.length; i++){
        for(var j=0; j<dotsQ.length; j++){
            pairlist.push([dotsP[i], dotsQ[j]]);
        }
    }
    pairlist.sort(function(a,b){return d(a) - d(b);});

    var index = Math.floor(k*(pairlist.length - 1));
    pair = pairlist[index];
    return [d(pair), pair[0], pair[1]];

}

/* expects a 2-el array as there are no tuples*/
function d(pair){
    var p = pair[0];
    var q = pair[1];
    return Math.sqrt(Math.pow(p.x-q.x,2)+Math.pow(p.y-q.y,2));
}
