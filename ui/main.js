console.log('Loaded!');

var element=document.getElementById('main-text');
element.innerHTML= "new value";

var img=document.getElementById('madi');
var marginLeft=0;
function moveRight()
{
    margiLeft=marginLeft+10px;
    img.style.marginLeft=marginLeft +'px';
    
}
img.onclick=function(){
    var interval=setInterval(moveRight,100);
  
    
};