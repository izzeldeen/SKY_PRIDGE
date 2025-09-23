export class ProductLineItem {
    id:number;
    unitMeasure:any;
    quantity:number;
    unitPrice:number;
    originalUnitPrice:number;
    discount:number;
    tax:number;
    feesAmount:number;
    total:number;
    reserve:boolean;
    index:number;
    product:any;
    productId:number;
    maxQuantity:number;
    maxQuantityView:number;
    quantityDb:number = 0;
    reserveDb:boolean;
    isInValid:boolean;
    type:any;
    productName:string;
    unitOfMeasures:any[];
    unitOfMeasureId?:number;
    isExternal:boolean;
    productUnitPrice:number;
}

