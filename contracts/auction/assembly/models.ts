import { context, u128 } from 'near-sdk-as';
import { Money, Timestamp, AccountId } from '../utils';

@nearBindgen
export class SmartAuction {
  owner: AccountId = context.sender;
  canceled: bool = false;
  ended: bool = false;
  highestBidder: AccountId;
  highestBid: Money = u128.Zero;
  lot: AuctionLot;
  bids: Array<AuctionBid> = [];

  endTime: Timestamp = context.blockTimestamp;

  constructor(owner: AccountId, lot: AuctionLot, endTime: Timestamp) {
    this.owner = owner;
    this.lot = lot;
    this.endTime = endTime;
  }
}

@nearBindgen
export class AuctionLot {
  name: string;
  imageUrl: string;

  constructor(name: string, imageUrl: string) {
    this.name = name;
    this.imageUrl = imageUrl;
  }
}

@nearBindgen
export class AuctionBid {
  sender: AccountId = context.sender;
  bid: Money = context.attachedDeposit;
  date: Timestamp = context.blockTimestamp;
}