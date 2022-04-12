window.onload = function(){
    //document.write("Hello JavaScript");
};
$(function(){
    var timer = 0;
    selectBtn.onclick = function() {
      clearTimeout(timer);
      timer = setInterval(selectBall,100);
      setTimeout(function() {
        clearTimeout(timer);
      },3000)
      // clearTimeout(timer);
    }
}); 


