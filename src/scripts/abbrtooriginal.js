// Abbr to Original - Browser Extension
// https://github.com/Aftermoon-dev/AbbrtoOriginal

$(document).ready(function() {
    console.log("Abbr to Original Ready!");

    // Detect Textarea
    $("textarea").on("change keyup paste", function() { 
        searchWord(0, $(this));
    });

    // Detect Input Text
    $('input[type="text"]').on("change keyup paste", function() {
        searchWord(0, $(this));
    });

    // Detect Editable div (ex. wysiwig editor...)
    $('div[contenteditable="true"]').on("input", function() {
        searchWord(1, $(this));
    });

    // Support Naver Cafe
    if(window.location.href == "https://cafe.naver.com/common/editor/default.html") {
        $('body').on("input", function() {
            searchWord(1, $(this));
        });
    }
});

function searchWord(type, inputBox) {
    loadData().then(function (data) {
        if(data.enable == true) {
            var wordArray = Object.values(JSON.parse(data.WordList));
            for(var i in wordArray) {
                if(type == 0) {
                    if(inputBox.val().indexOf(wordArray[i]['abbr'] + ' ') != -1) {
                        inputBox.val(inputBox.val().replace(wordArray[i]['abbr'] + ' ', wordArray[i]['origin']));
                    }
                }
                else if(type == 1) {
                    if(inputBox.html().indexOf(wordArray[i]['abbr'] + '&nbsp') != -1) {
                        inputBox.html(inputBox.html().replace(wordArray[i]['abbr'], wordArray[i]['origin']));
                        var atEnd = createCaretPlacer(false);
                        atEnd(inputBox[0]);
                    }
                }
            }
        }
    }).catch(function (err) {
        console.error(err);
    });
}

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

function createCaretPlacer(atStart) {
    return function(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(atStart);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(atStart);
            textRange.select();
        }
    };
}