export class TransactionVM
{
    id:number;
    orderId:string;
    type:number;
    customerId:number;
    warehouseId:number;
    sectionId:number;
    toWarehouseId:number;
    toSectionId:number;
    toBranchId:number;
    notes:number;
    transactionProducts:TransactionProducts[];
}

export class TransactionProducts {
    productId:number;
    orderedQuantity:number;
    quantity:number;
}