$(document).ready(function() {
    setTimeout(function() {
        $("#splash-screen").fadeOut(300, function() {
            $("#main-content").fadeIn(300);
        });
    }, 900);
});
