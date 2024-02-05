var kimg ="" ;
var theme  = "flower"
var once = 0;
 var loadFile = function(event) {
  var image = document.getElementById('output');

  image.src = URL.createObjectURL(event.target.files[0]);
  img = loadImage(URL.createObjectURL(event.target.files[0]))
  console.log(image.src);

  once = 1;
};
function setTheTheme(){
once  = 1;
  theme = document.getElementById("theme").value
}


px= 0
py = 0
prx =0
pry = 0
jurl = "";
scl = 20;
ar = []
r = []
g = []
b = []
img = 0
lrp = [];
 p =  ""
function mousePressed(){
  loop()
}
function preload()
{
  
kimg =loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FoDL1MvIWhJ74J10vcSgQ5uo2O3MlNCFDg&usqp=CAU") ;
  
img =loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FoDL1MvIWhJ74J10vcSgQ5uo2O3MlNCFDg&usqp=CAU") ;
      // img.resize(400,400);
 
  
//   img = loadImage("https://s0.2mdn.net/5472125/09022020-130236278-2020-08-TH-StartHere-Land-300x600_Beginners.png")
//   url  =  "https://pixabay.com/api/?key=22475734-15b5f60b4aee369339d9aadfc&q=house&image_type=photo"
//   httpGet(url, 'jsonp', false, function(response) {

// img  = loadImage(response.hits[0].previewURL) ;
//   });  
  
}


function setPix(){
r =[]
g = []
b = []
lrp =[]
ar = []

cto = 0;
avg =0;
  ravg =0;
  gavg =0;
  bavg =0;
ct =0;  

background(0)
// if(once)
// img.updatePixels();
      img.resize(100,100)

   // image(img,0,0,2000,2000)
 img.loadPixels()

 for (var x = 0; x < img.width; x++) {
    for (var y= 0; y < img.height; y++) {

      var index = (img.width - x + 1 +( y * img.width))*4;
      r1 = img.pixels[index + 0]
      g1 = img.pixels[index + 1]
      b1 =  img.pixels[index + 2]
      fill(r1,g1,b1)
  ar.push((r1+b1+g1)/3);
      r.push(r1)
      g.push(g1)
      b.push(b1)
      lrp.push(225);
      noStroke()
    //  rect(x*scl,y*scl,scl,scl)

    }
 
 }

}
function download_pic() {
  var fn =prompt("Enter the file name" , "newFile");
  if(fn)
  saveCanvas(c,fn, 'jpg');
}



function setup() {
  // noLoop()
 c =  createCanvas(2000, 2000);
  setPix()
   button = createButton('download');
   button.mousePressed(download_pic)
  
// image(img,10,10)

}
ct =0
cto= 0
avg = 0;
function draw() {
  cto = 0;
  avg =0;
    ravg =0;
    gavg =0;
    bavg =0;
  

  frameRate(1)
 
// background(10)
  kimg.resize(100,100)
 kimg.loadPixels()
 for (var x = 0; x < kimg.width-1; x++) {
    for (var y= 0; y < kimg.height-1; y++) {

      var index = (kimg.width - x + 1 +( y * kimg.width))*4;
      r2 = kimg.pixels[index + 0]
      g2 = kimg.pixels[index + 1]
      b2 =  kimg.pixels[index + 2]
      fill(r2,g2,b2)
    noStroke()
    //  rect(x*scl,y*scl,scl,scl)

      avg+=(float)(((r2+g2+b2)/3))
      ravg+=r2;
      gavg+=g2;
      bavg+=b2;
//console.log(avg)      
      cto++
    }
 
 }
  
   // img = loadImage("https://s0.2mdn.net/5472125/09022020-130236278-2020-08-TH-StartHere-Land-300x600_Beginners.png")
  url  =  "https://pixabay.com/api/?key=22475734-15b5f60b4aee369339d9aadfc&q="+theme+"&image_type=photo"
  httpGet(url, 'jsonp', false, function(response) {
//console.log(response.hits[ct++].webformatURL)
   if(ct>=response.hits.length)ct = 0;

    kimg = loadImage(response.hits[ct++].previewURL);

  p = response.hits.length
   });  
  // console.log(avg+"is");
  avg/=cto;
  ravg/=cto;
  gavg/=cto;
  bavg/=cto;
  
  // console.log(ravg)
beginShape()
  ar.map((val,ind)=>{
    if(dist(ravg,gavg,bavg,r[ind],g[ind],b[ind]) < lrp[ind]){
      i = ind/img.width;
      j = ind%img.width;
      lrp[ind] = dist(ravg,gavg,bavg,r[ind],g[ind],b[ind]);
     //  image(kimg ,i*scl,j*scl,scl,scl )
      //  noStroke()
      fill(ravg,gavg,bavg)
     noFill()
     strokeWeight(scl)
     stroke(ravg,gavg,bavg,100)
   
    //  line(px,py,prx,pry)
    //  prx = px
    //  pry = py
    
  //  if(abs(px-i*scl)<scl)
{
  // vertex(i*scl,j*scl)
point(i*scl,j*scl)
}
  px = i*scl
py = j*scl
    //   rect(i*scl,j*scl,scl,scl);
    }
  })
  endShape()
if(img && once )
{
  setPix();
  once = 0;
}


  updatePixels();
   
}