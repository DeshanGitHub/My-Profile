//Load Customers Ids Into ComboBox
function loadAllCustomersForOption() {
    $("#inputCustomerID").empty();
    $('#inputCustomerID').prepend('<option>Select Customer</option>');
    for (let customerElement of customers) {
        $("#inputCustomerID").append(`<option>${customerElement.id}</option>`);
    }
}