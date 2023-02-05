$("#txtItemCode").keydown(function (event) {
  if (event.keyCode == 13) {
    $("#txtItemNameId").focus();
  }
});

$("#txtItemNameId").keydown(function (event) {
  if (event.keyCode == 13) {
    $("#txtItemQTY").focus();
  }
});

$("#txtItemQTY").keydown(function (event) {
  if (event.keyCode == 13) {
    $("#txtUnitPrice").focus();
  }
});

$("#txtUnitPrice").keydown(function (event) {
  if (event.keyCode == 13) {
    saveItem();
    $("#txtItemCode").focus();
  }
});

/* SAVE BUTTON ON ACTION */
$("#btnItemAdd").click(function () {
  saveItem();
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
