// Abbr to Original - Browser Extension
// https://github.com/Aftermoon-dev/AbbrtoOriginal

$(document).ready(function() {
    console.log("Abbr to Original Ready!");
    loadData().then(function (data) {
        if(data.enable == true) {
            var wordArray = Object.values(JSON.parse(data.WordList));
            $("textarea").on("change keyup paste", function() {
                for(var i in wordArray) {
                    if($(this).val().indexOf(wordArray[i]['abbr'] + ' ') != -1) {
                        $(this).val($(this).val().replace(wordArray[i]['abbr'] + ' ', wordArray[i]['origin']));
                    }
                }
            });
        
            $('input[type="text"]').on("change keyup paste", function() {
                for(var i in wordArray) {
                    if($(this).val().indexOf(wordArray[i]['abbr'] + ' ') != -1) {
                        $(this).val($(this).val().replace(wordArray[i]['abbr'] + ' ', wordArray[i]['origin']));
                    }
                }
            });
        }
    }).catch(function (err) {
        console.error(err);
    });
});

function loadData() {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(null, function(items){
            if (!chrome.runtime.error) {
                resolve(items);
            }
            reject(new Error(chrome.runtime.error));
        });
    });
}