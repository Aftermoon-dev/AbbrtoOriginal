document.body.onload = function() {
    var objectWord = new Object();
    chrome.storage.local.get(['app_WordList'], function (result) {
        console.log(result.app_WordList);
        objectWord = JSON.parse(result.app_WordList);
    });

    var onetext = document.getElementsByTagName('textarea')[0];
}