$("#itemSectionId").css("display", "none");
$("#customerSectionId").css("display", "block");
$("#orderSectionId").css("display", "none");

$("#itemFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "block");
  $("#customerSectionId").css("display", "none");
  $("#orderSectionId").css("display", "none");

  /* ITEM TEXT FIELD FOCUS WHEN OPEN ITEM FIELDS */
  $("#txtItemCode").focus();

  /* THIS METHOD FOR ITEM FORM "SAVE BUTTON" DISABLE WHEN OPEN ITEM FORM */
  checkValidityForItemForm();
});

$("#customerFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "none");
  $("#customerSectionId").css("display", "block");
  $("#orderSectionId").css("display", "none");

  /* CUSTOMER TEXT FIELD FOCUS WHEN OPEN CUSTOMER FIELDS */
  $("#txtCusID").focus();
});

$("#orderFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "none");
  $("#customerSectionId").css("display", "none");
  $("#orderSectionId").css("display", "block");
});
