var background = (function(){
  ////////////////////////////////////////////////////////////////
  // ストレージ
  var storage = {
    get: function (key, func){
      chrome.storage.sync.get(key, function (item){
        if(! chrome.runtime.error)
          func(item[key]);
        else
          throw "get runtime error!";
      });
    }
  , set: function (key, value){
      var obj = {};
      obj[key] = value;
      chrome.storage.sync.set(obj, function(){
        if(chrome.runtime.error)
          throw "set runtime error!";
      });
    }
  , remove: function (key){
      chrome.storage.sync.remove(key, function(){
        if(chrome.runtime.error){
          throw "remove runtime error!";
        }
      });
    }
  };
  ////////////////////////////////////////////////////////////////
  // バッジ
  function setBadge(status){
    chrome.browserAction.setBadgeText({ text: status? "ON" : ""});
  }

  ////////////////////////////////////////////////////////////////
  // 初期化
  // バッジを初期化
  storage.get("is_running", setBadge);

  ////////////////////////////////////////////////////////////////
  // 起動/終了
  function changeStatus(status){
    // バッジを設定
    setBadge(status);
    // ローカルストレージに状態を保存
    storage.set("is_running", status);
  }
  return {
    storage     : storage
  , changeStatus: changeStatus
  };
})();
