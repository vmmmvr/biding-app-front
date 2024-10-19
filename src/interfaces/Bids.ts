import { Auction } from "./Auctions";
import { User } from "./User";

export interface Bid {
    id: number;
    uid: string;
    amount: number;
    userId: number;
    auctionId: number;
    user?: User
    auction?: Auction
    createdAt: Date;
    updatedAt: Date;
}
