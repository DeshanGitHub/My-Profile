$("#itemSectionId").css("display", "none");
$("#customerSectionId").css("display", "block");
$("#orderSectionId").css("display", "none");

$("#itemFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "block");
  $("#customerSectionId").css("display", "none");
  $("#orderSectionId").css("display", "none");
});

$("#customerFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "none");
  $("#customerSectionId").css("display", "block");
  $("#orderSectionId").css("display", "none");
});

$("#orderFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "none");
  $("#customerSectionId").css("display", "none");
  $("#orderSectionId").css("display", "block");
});

