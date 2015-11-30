$(function() {
  var b = $(".filename");
  var w = $(".content");
  var l = $(".file_content");
  
  w.height(l.outerHeight(true));

  b.click(function() {
  
    if(w.hasClass('open')) {
      w.removeClass('open');
      w.height(0);
    } else {
      w.addClass('open');
      w.height(l.outerHeight(true));
    }
  
  });
});