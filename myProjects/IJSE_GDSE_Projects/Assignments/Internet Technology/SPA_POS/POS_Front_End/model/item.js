function ItemModel(itemCode,itemName,itemQtyOnHand,itemPrice) {
    return{
        code: itemCode,
        name: itemName,
        qtyOnHand: itemQtyOnHand,
        price: itemPrice
    };
}