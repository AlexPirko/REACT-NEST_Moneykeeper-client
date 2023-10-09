export interface IUser {
    id: number;
    email: string;
    token: string;
}

export interface IUserData {
    email: string;
    password: string;
}

export interface IResponseUser {
    email: string | undefined;
    id: number | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    password: string | undefined;
}

export interface IResponseUserData {
    token: string | undefined;
    user: IResponseUser;
}

export interface ICategory {
    title: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    transactions?: [];
}

export interface ITransaction {
    amount: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    type: string;
    id: number;
    category: ICategory;
}

export interface IResponseTransLoader {
    categories: ICategory[];
    transactions: ITransaction[];
    totalIncome: number;
    totalExpense: number;
}
