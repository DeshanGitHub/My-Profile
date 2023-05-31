function orderDetailsModel(oid, date, cid,cname,i_code,i_name,o_qty ,total) {
    return{
        orderID: oid,
        date: date,
        customerId: cid,
        customerName: cname,
        itemCode: i_code,
        itemName: i_name,
        orderQty: o_qty,
        fullTotal:total
    };
}