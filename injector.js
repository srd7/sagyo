(function($){
  // ページを落とすスクリプト読み込み準備
  function block(){
    var target = $("head");
    var script = $("<script>")
      .attr("type", "text/javascript")
      .attr("src", chrome.extension.getURL("/executor.js"));
    target.append(script);
  }

  var currentUrl = location.href;
  var loop = true;
  $.getJSON(chrome.extension.getURL("/blacklist.json"), function(blacklist){
    $.each(blacklist, function(i, url){
      if(loop && currentUrl.match(new RegExp(url))){
        block();
        loop = false;
      }
    });
  });
})(jQuery);
