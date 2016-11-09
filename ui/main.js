console.log('Loaded!');


var text= document.getElementById("text");
text.innerHtml="Hi i am anjali";

var madi =document.getElementById("madi");

var leftmargin=0;
function moveright()
{
    leftmargin= leftmargin+5;
    madi.style.margineleft= leftmargin + 'px';
}

madi.onclick= function(){
  var interval =setInterval(moveright,100); 
};