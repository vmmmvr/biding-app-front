import { Bid } from "./Bids";

export interface Auction {
    id: number;
    uid: string;
    itemName: string;
    price: number;
    auctionStart: Date;
    auctionEnd: Date;
    open: boolean;
    bids?: Bid[]
    createdAt: Date;
    updatedAt: Date;
}

export type NewAuctionType = {
    itemName: string;
     auctionStart: Date | null;
      auctionEnd: Date | null;
  }
