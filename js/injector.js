(function($){
  // ページを落とすスクリプト読み込み準備
  function block(){
    console.log("bolck called");
    var body = $("body");
    body.css("background", "none");
    body.children().remove();

    var message = $("<p>")
      .text("作業しろ")
      .css({
        "font-weight": "bold"
      , "font-size"  : "30px"
      , "text-align" : "center"
      , "padding-top": "20px"
      , "position"   : "relative"
      , "top"        : "50%"
      , "transform"  : "translateY(-50%)"
      });
    body.append(message);
  }

  // ローカルストレージから取得
  function storage(key, func){
    chrome.storage.sync.get(key, function(item){
      if(! chrome.runtime.error)
        func(item[key]);
      else
        throw "get runtime error!";
    });
  }

  var currentUrl = location.href;
  storage("is_running", function(isRunning){
    // ループ判定。 isRunning が false なら、最初から回さない。
    var loop = isRunning || false;
    // ストレージから blacklist を取得
    storage("blacklist", function (blacklist){
      $.each(blacklist || [], function(i, url){
        // ブラックリスト内の各 url について、マッチするか確認
        if(loop && currentUrl.match(new RegExp(url))){
          // マッチするならブロックし、ループ終了
          block();
          loop = false;
        }
      });
    });
  });
})(jQuery);
