(function($){
  ////////////////////////////////////////////////////////////////
  // バックグラウンドと接続
  var bg = chrome.extension.getBackgroundPage().background;
  ////////////////////////////////////////////////////////////////
  // 初期化
  // 作業中ボタンを初期化
  bg.storage.get("is_running", function (isRunning){
    $("#working").attr("checked", isRunning? "checked" : null);
  });
  // ブラックリストを初期化
  bg.storage.get("blacklist", function (blacklist){
    $("#blacklist").val(blacklist.join("\n"));
  });
  ////////////////////////////////////////////////////////////////
  // イベントリスナー
  // トグルボタン
  $("#blacklist-toggle").on("click", toggleTextarea());
  // 作業中ボタン
  $("#working").on("change", toggleWorking);
  // ブロックリストを更新した時
  $("#updateList").on("click", updateList);

  ////////////////////////////////////////////////////////////////
  // 実際の処理
  // textarea の toggle
  function toggleTextarea(){
    var target = $("#black");
    var button = $("#blacklist-toggle");
    // 始めは隠しておく
    target.hide();
    var flag = false;

    return function() {
      if(flag) {
        target.hide(); // フラグがON => 出てるから隠す
        button.text("ブロックするサイト ▼");
      }
      else {
        target.show(); // フラグがOFF => 隠れてるから出す
        button.text("ブロックするサイト ▲");
      }
      flag = !flag;
    };
  }
  // 作業中ボタンを押した時の処理
  function toggleWorking(){
    bg.changeStatus($(this).is(":checked"));
  }
  // ブロックリストを更新した時
  function updateList(){
    var str = $("#blacklist").val();
    // ローカルストレージに保存
    if(str)
      bg.storage.set("blacklist", str.split("\n"));
    else
      bg.storage.remove("blacklist");
  }
})(jQuery);

