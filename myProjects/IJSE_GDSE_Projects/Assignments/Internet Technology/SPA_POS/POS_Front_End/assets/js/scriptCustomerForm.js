$("#txtCusID").focus();

/* CUSTOMER TEXT FIELDS VALIDATION */
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusPhnNumRegEx =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

let customerValidations = [];
customerValidations.push({
  reg: cusIDRegEx,
  field: $("#txtCusID"),
  error: "Customer ID Pattern is : C00-001",
});
customerValidations.push({
  reg: cusNameRegEx,
  field: $("#txtCusName"),
  error: "Customer Name Pattern is : A-z 5-20",
});
customerValidations.push({
  reg: cusAddressRegEx,
  field: $("#txtCusAddress"),
  error: "Customer Address Pattern is : A-z 0-9 ,/",
});
customerValidations.push({
  reg: cusPhnNumRegEx,
  field: $("#txtCusPhnNum"),
  error: "Customer Phone Number Is Wrong. Please Check..",
});

$("#txtCusID, #txtCusName, #txtCusAddress, #txtCusPhnNum").on(
  "keyup",
  function () {
    checkValidity();
  }
);

$("#txtCusID, #txtCusName, #txtCusAddress, #txtCusPhnNum").on(
  "blur",
  function () {
    checkValidity();
  }
);

function checkValidity() {
  let errorCount = 0;

  for (let validation of customerValidations) {
    if (check(validation.reg, validation.field)) {
      setTextSuccess(validation.field, "");
    } else {
      errorCount = errorCount + 1;
      setTextError(validation.field, validation.error);
    }
  }

  /* MANAGE "SAVE BUTTON" ACTIVATION AND DISABLE */

  setButtonState(errorCount);
}

function setButtonState(errorCount) {
  if (errorCount > 0) {
    $("#btnSaveCustomer").attr("disabled", true);
  } else {
    $("#btnSaveCustomer").attr("disabled", false);
  }
}

function setTextError(txtField, error) {
  if (txtField.val().length <= 0) {
    defaultText(txtField, "");
  } else {
    txtField.css("border", "2px solid red");
    txtField.parent().children("span").text(error);
    txtField.parent().children("span").css("color", "red");
  }
}

function setTextSuccess(txtField, error) {
  if (txtField.val().length <= 0) {
    defaultText(txtField, "");
  } else {
    txtField.css("border", "2px solid green");
    txtField.parent().children("span").text(error);
  }
}

function defaultText(txtField, error) {
  txtField.css("border", "1px solid #ced4da");
  txtField.parent().children("span").text(error);
}
/* DISABLE "TAB" KEY DEFAULT FUNCTION */
$("#txtCusID, #txtCusName, #txtCusAddress, #txtCusPhnNum").keydown(function (
  event
) {
  if (event.key == "Tab") {
    event.preventDefault();
  }
});

function check(regEx, txtFieldId) {
  let inputValue = txtFieldId.val();

  if (regEx.test(inputValue)) {
    return true;
  } else {
    return false;
  }
}

/* /CUSTOMER TEXT FIELDS VALIDATION */

$("#txtCusID").keydown(function (event) {
  if (event.keyCode == 13 && check(cusIDRegEx, $("#txtCusID"))) {
    $("#txtCusName").focus();
  } else {
    $("#txtCusID").focus();
  }
});

$("#txtCusName").keydown(function (event) {
  if (event.keyCode == 13 && check(cusNameRegEx, $("#txtCusName"))) {
    $("#txtCusAddress").focus();
  }
});

$("#txtCusAddress").keydown(function (event) {
  if (event.keyCode == 13 && check(cusAddressRegEx, $("#txtCusAddress"))) {
    $("#txtCusPhnNum").focus();
  }
});

$("#txtCusPhnNum").keydown(function (event) {
  if (
    event.keyCode == 13 &&
    check(cusPhnNumRegEx, $("#txtCusPhnNum")) &&
    !($("#btnSaveCustomer").attr("disabled") == "disabled")
  ) {
    let res = confirm("Do you want to add this customer ?");
    if (res) {
      saveCustomer();
      $("#txtCusID").focus();
    }
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
  checkValidity(customerValidations);
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
