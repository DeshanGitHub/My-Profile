//Load Items Code Into ComboBox
function loadAllItemsForOption() {
    $('#itemCmb').empty();
    $('#itemCmb').prepend('<option>Select Item</option>');
    for (let itemElement of items) {
        $('#itemCmb').append(`<option>${itemElement.code}</option>`);
    }
}

//Load Customers Ids Into ComboBox
function loadAllCustomersForOption() {
    $("#inputCustomerID").empty();
    $('#inputCustomerID').prepend('<option>Select Customer</option>');
    for (let customerElement of customers) {
        $("#inputCustomerID").append(`<option>${customerElement.id}</option>`);
    }
}