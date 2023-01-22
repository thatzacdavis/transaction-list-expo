type TransactionResponse = {
    transactions: Transaction[];
    hasMore: boolean;
};
  
type Transaction = {
    amount: number;
    currency: string;
    date: number;
    title: string;
    description: string;
    id: string;
    tags: string[];
};