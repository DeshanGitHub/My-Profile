$("#txtCusID").keydown(function (event) {
  if (event.keyCode == 13) {
    $("#txtCusName").focus();
  }
});

$("#txtCusName").keydown(function (event) {
  if (event.keyCode == 13) {
    $("#txtCusAddress").focus();
  }
});

$("#txtCusAddress").keydown(function (event) {
  if (event.keyCode == 13) {
    $("#txtCusPhnNum").focus();
  }
});

$("#txtCusPhnNum").keydown(function (event) {
  if (event.keyCode == 13) {
    saveCustomer();
    $("#txtCusID").focus();
  }
});

/* CLEAR BUTTON ON ACTION */
$("#btnClear").click(function () {
  clearTextFields();
  $("#txtCusID").focus();
});

/* SAVE BUTTON ON ACTION */
$("#btnSaveCustomer").click(function () {
  saveCustomer();
});

/* SAVE CUSTOMER METHOD */
function saveCustomer() {
  $("#tblCustomerBody>tr").off("click");

  let cusId = $("#txtCusID").val();
  let cusName = $("#txtCusName").val();
  let cusAddress = $("#txtCusAddress").val();
  let CusPhnNum = $("#txtCusPhnNum").val();

  let tableRow = `<tr><td>${cusId}</td><td>${cusName}</td><td>${cusAddress}</td><td>${CusPhnNum}</td></tr>`;

  $("#tblCustomerBody").append(tableRow);
  clearCustomerTextFields();

  $("#tblCustomerBody>tr").click(function () {
    let tblCusId = $(this).children(":eq(0)").text();
    let tblCusName = $(this).children(":eq(1)").text();
    let tblCusAddress = $(this).children(":eq(2)").text();
    let tblCusPhnNum = $(this).children(":eq(3)").text();

    console.log(
      tblCusId + " " + tblCusName + " " + tblCusAddress + " " + tblCusPhnNum
    );

    $("#txtCusID").val(tblCusId);
    $("#txtCusName").val(tblCusName);
    $("#txtCusAddress").val(tblCusAddress);
    $("#txtCusPhnNum").val(tblCusPhnNum);
  });
}

function clearCustomerTextFields() {
  $("#txtCusID").val("");
  $("#txtCusName").val("");
  $("#txtCusAddress").val("");
  $("#txtCusPhnNum").val("");
}
