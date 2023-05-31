//GENERATE ORDER ID
generateOrderID();

//Disable Add to cart Button
$('#btnAddToCart').attr("disabled", true);

//Disable Purchase Button
$('#btnPurchaseId').attr("disabled", true);

/*=======================CREATE ORDER ID==========================*/
//Generate Order ID
function generateOrderID() {
    try {
        let lastOId = order[order.length - 1].ordID;
        let newOId = parseInt(lastOId.substring(4, 7)) + 1;
        if (newOId < 10) {
            $("#txtOId").val("OID-00" + newOId);
        } else if (newOId < 100) {
            $("#txtOId").val("OID-0" + newOId);
        } else {
            $("#txtOId").val("OID-" + newOId);
        }
    } catch (e) {
        $("#txtOId").val("OID-001");
    }
}
/*=======================/CREATE ORDER ID==========================*/

/*=======================FILL DATE TEXT FIELD==========================*/

$('#txtDate').val(getCurrentDate());

//get Date
function getCurrentDate() {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    function formatDate(date = new Date()) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }

    return formatDate();
}

/*=======================/FILL DATE TEXT FIELD==========================*/
/*=======================LOAD CUSTOMER DETAILS IN PURCHASE FORM==========================*/

function clearSetDetails(param1, param2, param3) {
    param1.val("");
    param2.val("");
    param3.val("");
}

//when select "Select Customer" clear data fields
function emptyCustomerData() {
    let cusId = $('#inputCustomerID').val();
    if (cusId === 'Select Customer') {

        clearSetDetails($("#inputCustomerID"), $("#txtCusNameInvoice"), $("#txtCusAddressInvoice"));

    }
}

//when select customer id fill other data
$('#inputCustomerID').change(function () {
    let cusID = $('#inputCustomerID').val();
    let customer = searchCustomer(cusID);
    if (customer != null) {

        $('#txtCusNameInvoice').val(customer.name);
        $('#txtCusAddressInvoice').val(customer.address);
    }
    emptyCustomerData();

});

//Load Customers Ids Into ComboBox
function loadAllCustomersForOption() {
    $("#inputCustomerID").empty();
    $('#inputCustomerID').prepend('<option>Select Customer</option>');
    for (let customerElement of customers) {
        $("#inputCustomerID").append(`<option>${customerElement.id}</option>`);
    }
}
/*=======================/LOAD CUSTOMER DETAILS IN PURCHASE FORM==========================*/

/*=======================ADD TO CART BUTTON ON ACTION==========================*/


//load all data ro table
function loadAllCart() {
    $("#tblCartTableBody").empty();

    for (let cartItem of cart) {
        var cartRow = `<tr><td>${cartItem.cartICode}</td><td>${cartItem.cartIName}
        </td><td>${cartItem.cartIPrice}</td><td>${cartItem.cartOrderQty}</td><td>${cartItem.cartTotal}</td></tr>`;


        $("#tblCartTableBody").append(cartRow);
    }

    //FUTURE DEVELOPMENT TO WHEN DOUBLE CLICKED DELETE ITEM ON CART
    //removeItemInCart();
}

//function add to cart
function addToCart() {
    let oid = $('#txtOId').val();
    let itm_code = $('#itemCmb').val();
    let itm_name = $('#txtItemName').val();
    let itm_price = $('#txtPrice').val();
    let order_qty = $('#txtOrderQty').val();
    let total = itm_price * order_qty;


    for (let cartElement of cart) {
        if (cartElement.cartICode == itm_code) {
            var newQty = +cartElement.cartOrderQty + +order_qty;
            let newTotal = itm_price * newQty;
            cartElement.cartOrderQty = newQty;
            cartElement.cartTotal = newTotal;
            return;
        }
    }

    let cartOrder = cartModel(oid, itm_code, itm_name, itm_price, order_qty, total);

    cart.push(cartOrder);

    $("#txtCashId,#txtBalanceId").val("");


    $('#btnAddToCart').attr("disabled", true);

}

//btn add to cart
$('#btnAddToCart').click(function () {
    let qtyOnHand = parseInt($('#txtQtyOnHand').val());
    let orderQty = parseInt($('#txtOrderQty').val());
    if ($("#txtOrderQty").val() != "") {

        if (qtyOnHand < orderQty) {
            alert("This Item No Available for this Quantity.")
        } else {
            updateQty();

            addToCart();

            loadAllCart();
            //calculateTotal();
        }
    } else {
        alert("please Enter Order Quantity..");
    }

    $('#btnPurchaseId').attr("disabled", false);
});
/*=======================/ADD TO CART BUTTON ON ACTION==========================*/

/*=======================/LOAD ITEM DETAILS IN PURCHASE FORM==========================*/
//update qty after add order qty
function updateQty() {
    let qtyOnHand = $('#txtQtyOnHand').val();
    let order_qty = $('#txtOrderQty').val();
    let newQty = qtyOnHand - order_qty;

    for (let item of items) {
        if ($("#itemCmb").val() === item.code) {
            item.qtyonhand = newQty;
            $('#txtQtyOnHand').val(item.qtyonhand);

            loadAllItems();
            // saveItemAlert().preventDefault();

        }
    }
}

//when select "Select Item" clear data fields
function emptyItemData() {
    let itemId = $('#itemCmb').val();
    if (itemId === 'Select Item') {

        clearSetDetails($("#itemCmb"), $("#txtItemName"), $("#txtQtyOnHand"), $("#txtPrice"));

    }
}

//when select item id fill other data
$('#itemCmb').change(function () {
    let code = $('#itemCmb').val();
    let item = searchItem(code);

    if (item != null) {

        $('#txtItemName').val(item.name);
        $('#txtPrice').val(item.price);
        $('#txtQtyOnHand').val(item.qtyOnHand);
    }
    emptyItemData();
    updateQty();
    $('#btnAddToCart').attr("disabled", false);

});

//Load Items Code Into ComboBox
function loadAllItemsForOption() {
    $('#itemCmb').empty();
    $('#itemCmb').prepend('<option>Select Item</option>');
    for (let itemElement of items) {
        $('#itemCmb').append(`<option>${itemElement.code}</option>`);
    }
}
/*=======================/LOAD ITEM DETAILS IN PURCHASE FORM==========================*/



