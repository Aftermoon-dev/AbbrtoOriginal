// Abbr to Original - Browser Extension
// https://github.com/Aftermoon-dev/AbbrtoOriginal
$(document).ready(function() {
    console.log("Abbr to Original Ready!");

    // text.replace("ㅎㅇ", "안녕하세요")

    $("textarea").on("change keyup paste", function() {
        var text = $(this).val();
        console.log("TextArea Changed -> Now Text " + text)
    });

    $('input[type="text"]').on("change keyup paste", function() {
        var text = $(this).val();
        console.log("input Text Changed -> Now Text " + text)

    });
});