//set Save Customers Count in dashboard
function setCusCount(){
    let cusCount=0;
    for (let customer of customers) {
        cusCount=cusCount+1;
    }
    $('#customersCount').text(cusCount);
}