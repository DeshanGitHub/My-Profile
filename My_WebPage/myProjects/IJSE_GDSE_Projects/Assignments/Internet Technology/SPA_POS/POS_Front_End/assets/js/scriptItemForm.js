/* ITEM FORM VALIDATION */

let itemCodeRegEx = /^(I00-)[0-9]{1,3}$/;
let itemNameRegEx = /^[0-9/A-z. ,;()]{5,20}$/;
let itemQtyRegEx = /^[0-9]{1,20}$/;
let itemPriceRegEx = /^[0-9]+[.]?[0-9]{0,2}$/;

let itemValidations = [];
itemValidations.push({
  reg: itemCodeRegEx,
  field: $("#txtItemCode"),
  error: "Item Code Pattern is : I00-001",
});

itemValidations.push({
  reg: itemNameRegEx,
  field: $("#txtItemNameId"),
  error: "Item Name Pattern is : A-z 5-20 and . / ()",
});

itemValidations.push({
  reg: itemQtyRegEx,
  field: $("#txtItemQTY"),
  error: "Item QTY Pattern is : 0-9",
});

itemValidations.push({
  reg: itemPriceRegEx,
  field: $("#txtUnitPrice"),
  error: "Item Price is wrong..",
});

/* DISABLE "TAB" KEY DEFAULT FUNCTION */
$("#txtItemCode, #txtItemNameId, #txtItemQTY, #txtUnitPrice").keydown(function (
  event
) {
  if (event.key == "Tab") {
    event.preventDefault();
  }
});

$("#txtItemCode, #txtItemNameId, #txtItemQTY, #txtUnitPrice").on(
  "keyup",
  function () {
    checkValidityForItemForm();
  }
);

$("#txtItemCode, #txtItemNameId, #txtItemQTY, #txtUnitPrice").on(
  "blur",
  function () {
    checkValidityForItemForm();
  }
);

function checkValidityForItemForm() {
  let errorCount = 0;

  for (let validation of itemValidations) {
    if (checkForItemForm(validation.reg, validation.field)) {
      setTextSuccessForItemForm(validation.field, "");
    } else {
      errorCount = errorCount + 1;
      setTextErrorForItemForm(validation.field, validation.error);
    }
  }

  /* MANAGE "SAVE ITEM" BUTTON */
  setSaveButtonStateForItemForm(errorCount);
}

function setSaveButtonStateForItemForm(errorCount) {
  if (errorCount > 0) {
    $("#btnItemAdd").attr("disabled", true);
  } else {
    $("#btnItemAdd").attr("disabled", false);
  }
}

function setTextErrorForItemForm(txtField, error) {
  if (txtField.val().length <= 0) {
    defaultTextFieldForItemForm(txtField, "");
  } else {
    txtField.css("border", "2px solid red");
    txtField.parent().children("span").text(error);
    txtField.parent().children("span").css("color", "red");
  }
}

function setTextSuccessForItemForm(txtField, error) {
  if (txtField.val().length <= 0) {
    defaultTextFieldForItemForm(txtField, "");
  } else {
    txtField.css("border", "2px solid green");
    txtField.parent().children("span").text(error);
    txtField.parent().children("span").css("color", "red");
  }
}

function defaultTextFieldForItemForm(txtField, error) {
  txtField.css("border", "1px solid #ced4da");
  txtField.parent().children("span").text(error);
  txtField.parent().children("span").css("color", "red");
}

function checkForItemForm(regEx, textField) {
  let inputValue = textField.val();
  if (regEx.test(inputValue)) {
    return true;
  } else {
    return false;
  }
}

/* /ITEM FORM VALIDATION */

$("#txtItemCode").keydown(function (event) {
  if (
    event.keyCode == 13 &&
    checkForItemForm(itemCodeRegEx, $("#txtItemCode"))
  ) {
    $("#txtItemNameId").focus();
  }
});

$("#txtItemNameId").keydown(function (event) {
  if (
    event.keyCode == 13 &&
    checkForItemForm(itemNameRegEx, $("#txtItemNameId"))
  ) {
    $("#txtItemQTY").focus();
  }
});

$("#txtItemQTY").keydown(function (event) {
  if (event.keyCode == 13 && checkForItemForm(itemQtyRegEx, $("#txtItemQTY"))) {
    $("#txtUnitPrice").focus();
  }
});

$("#txtUnitPrice").keydown(function (event) {
  if (
    event.keyCode == 13 &&
    checkForItemForm(itemPriceRegEx, $("#txtUnitPrice"))
  ) {
    let wantSave = confirm("Do you want to save this item?");

    if (wantSave) {
      saveItem();
      $("#txtItemCode").focus();
    }
  }
});

/* SAVE BUTTON ON ACTION */
$("#btnItemAdd").click(function () {
  saveItem();
  /* THIS METHOD FOR ITEM FORM "SAVE BUTTON" DISABLE WHEN OPEN ITEM FORM */
  checkValidityForItemForm();
});

/* ITEM SAVE METHOD */
function saveItem() {
  $("#tblItemBody>tr").off("click");

  let itemCode = $("#txtItemCode").val();
  let itemName = $("#txtItemNameId").val();
  let itemQty = $("#txtItemQTY").val();
  let itemPrice = $("#txtUnitPrice").val();

  let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemQty}</td><td>${itemPrice}</td></tr>`;

  $("#tblItemBody").append(row);
  clearItemTextFields();

  $("#tblItemBody>tr").click(function () {
    let tblItemCode = $(this).children(":eq(0)").text();
    let tblItemName = $(this).children(":eq(1)").text();
    let tblItemQty = $(this).children(":eq(2)").text();
    let tblItemPrice = $(this).children(":eq(3)").text();

    console.log(tblItemCode);

    $("#txtItemCode").val(tblItemCode);
    $("#txtItemNameId").val(tblItemName);
    $("#txtItemQTY").val(tblItemQty);
    $("#txtUnitPrice").val(tblItemPrice);
  });
}

/* CLEAR TEXT FIELDS */
function clearItemTextFields() {
  $("#txtItemCode").val("");
  $("#txtItemNameId").val("");
  $("#txtItemQTY").val("");
  $("#txtUnitPrice").val("");
}
