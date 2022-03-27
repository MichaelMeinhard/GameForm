ost = new Audio('/sound/AllStar.mp3'); 
if (typeof ost.loop == false)
{
    ost.loop = true;
}
else
{
    ost.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}