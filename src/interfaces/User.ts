import { Bid } from "./Bids";

export interface User {
    id: number;   
    uid: string;  
    name: string; 
    email: string;
    bids?: Bid[]
    createdAt: Date;
    updatedAt: Date;
}


export interface UserSignIn {
    name: string; 
    email: string;
}