export interface Transaction {
    _id: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    type: string; 
    timestamp: Date;
}
