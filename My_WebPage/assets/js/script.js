/*SMALL NAV DROP-DOWN*/
$(document).click(function () {
    if ($(event.target).closest(".menu-btn").length != 0)return false;
    $(".small-drop-down").fadeOut(400);
});
$(".small-drop-down").hide(0);
$(".menu-btn").click(function () {
    $(".small-drop-down").fadeToggle(400);
});