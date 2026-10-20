export interface User {
    id: string
    name: string
    email: string
    role?: string
    createdAt: string
    updatedAt: string
}

export interface RegisterInput {
    name: string
    email: string
    password: string
}

export interface LoginInput {
    email: string
    password: string
}

export interface Category {
    id: string;
    name: string;
    description?: string | null;
    icon: string;
    color: string;
    transactionCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryFormData {
    id?: string;
    name: string;
    description?: string;
    icon: string;
    color: string;
}

export interface CategoryOption {
    id: string;
    name: string;
}

export type TransactionType = "EXPENSE" | "INCOME";

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    categoryId: string;
    category?: Category;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateTransactionInput {
    title: string;
    amount: number;
    type: TransactionType;
    categoryId: string;
}

export interface UpdateTransactionInput {
    title?: string;
    amount?: number;
    type?: TransactionType;
    categoryId?: string;
}

export interface TransactionFormData {
    id?: string;
    title: string;
    amount: number;
    date?: string;
    type: TransactionType;
    categoryId: string;
}

export interface TransactionsFilterInput {
    search?: string;
    type?: TransactionType;
    categoryId?: string;
    month?: number;
    year?: number;
    page?: number;
    perPage?: number;
}

export interface PaginatedTransactions {
    transactions: Transaction[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}