$("#itemSectionId").css("display", "none");
$("#customerSectionId").css("display", "none");
$("#orderSectionId").css("display", "none");
$("#dashboardSectionId").css("display", "block");
$("#orderDetailsSection").css("display", "none");

/*ADD CURSOR POINTER TO HEADER BUTTONS*/
$("#customerFormLoadButtonId").css("cursor","pointer");
$("#dashboardFormLoadButtonId").css("cursor","pointer");
$("#itemFormLoadButtonId").css("cursor","pointer");
$("#orderFormLoadButtonId").css("cursor","pointer");
$("#orderDetailFormLoadButtonId").css("cursor","pointer");

$("#orderDetailFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "none");
  $("#customerSectionId").css("display", "none");
  $("#orderSectionId").css("display", "none");
  $("#orderDetailsSection").css("display", "block");
  $("#dashboardSectionId").css("display", "none");

  /*MANAGE BUTTON CSS ACTIVE*/
  $("#customerFormLoadButtonId").removeClass("active");
  $("#dashboardFormLoadButtonId").removeClass("active");
  $("#itemFormLoadButtonId").removeClass("active");
  $("#orderFormLoadButtonId").removeClass("active");
  $("#orderDetailFormLoadButtonId").addClass("active");

  /*LOAD ORDER DETAILS TABLE*/
  loadOrderDetailsTable();
});

$("#dashboardFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "none");
  $("#customerSectionId").css("display", "none");
  $("#orderSectionId").css("display", "none");
  $("#orderDetailsSection").css("display", "none");
  $("#dashboardSectionId").css("display", "block");

  /*MANAGE BUTTON CSS ACTIVE*/
  $("#customerFormLoadButtonId").removeClass("active");
  $("#dashboardFormLoadButtonId").addClass("active");
  $("#itemFormLoadButtonId").removeClass("active");
  $("#orderFormLoadButtonId").removeClass("active");
  $("#orderDetailFormLoadButtonId").removeClass("active");

});

$("#itemFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "block");
  $("#customerSectionId").css("display", "none");
  $("#orderSectionId").css("display", "none");
  $("#dashboardSectionId").css("display", "none");
  $("#orderDetailsSection").css("display", "none");

  /*MANAGE BUTTON CSS ACTIVE*/
  $("#customerFormLoadButtonId").removeClass("active");
  $("#dashboardFormLoadButtonId").removeClass("active");
  $("#itemFormLoadButtonId").addClass("active");
  $("#orderFormLoadButtonId").removeClass("active");
  $("#orderDetailFormLoadButtonId").removeClass("active");

  /* ITEM TEXT FIELD FOCUS WHEN OPEN ITEM FIELDS */
  $("#txtItemCode").focus();

  /* THIS METHOD FOR ITEM FORM "SAVE BUTTON" DISABLE WHEN OPEN ITEM FORM */
  checkValidityForItemForm();
});

$("#customerFormLoadButtonId").click(function () {

  $("#itemSectionId").css("display", "none");
  $("#customerSectionId").css("display", "block");
  $("#orderSectionId").css("display", "none");
  $("#dashboardSectionId").css("display", "none");
  $("#orderDetailsSection").css("display", "none");

  /*MANAGE BUTTON CSS ACTIVE*/
  $("#customerFormLoadButtonId").addClass("active");
  $("#dashboardFormLoadButtonId").removeClass("active");
  $("#itemFormLoadButtonId").removeClass("active");
  $("#orderFormLoadButtonId").removeClass("active");
  $("#orderDetailFormLoadButtonId").removeClass("active");

  /* CUSTOMER TEXT FIELD FOCUS WHEN OPEN CUSTOMER FIELDS */
  $("#txtCusID").focus();


});

$("#orderFormLoadButtonId").click(function () {
  $("#itemSectionId").css("display", "none");
  $("#customerSectionId").css("display", "none");
  $("#orderSectionId").css("display", "block");
  $("#dashboardSectionId").css("display", "none");
  $("#orderDetailsSection").css("display", "none");

  /*MANAGE BUTTON CSS ACTIVE*/
  $("#customerFormLoadButtonId").removeClass("active");
  $("#dashboardFormLoadButtonId").removeClass("active");
  $("#itemFormLoadButtonId").removeClass("active");
  $("#orderFormLoadButtonId").addClass("active");
  $("#orderDetailFormLoadButtonId").removeClass("active");
});
