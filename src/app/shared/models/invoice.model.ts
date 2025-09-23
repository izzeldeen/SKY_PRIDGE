export interface Invoice {
  number: string;        // e.g., INV-2025-001
  customer: string;
  supplier:string;
  employee:string;
  saleAmount: number;
  purchaseAmount: number;
  netAmount: number;
  commissionPerc: number;
  commission: number;
  salePDF:string;
  purchasePDF:string;
  status: string;
  createdAt: number;
  searchKeyWords:string[]; 
  employeeId:any;    // Date.now()
}