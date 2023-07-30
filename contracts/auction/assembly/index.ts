import {
  Context,
  storage,
  PersistentMap,
  PersistentVector,
  PersistentSet,
  u128,
  ContractPromise,
  ContractPromiseBatch,
  logging, context,
} from 'near-sdk-as';
import { SmartAuction, AuctionBid, AuctionLot } from './models';
import { XCC_GAS, assert_self, assert_single_promise_success } from '../utils';

@nearBindgen
export class Auctions {
  private auctions: PersistentVector<SmartAuction> = new PersistentVector<SmartAuction>('a');

  /**
   * Метод для создания аукциона
   */
  create_auction(lotName: string, lotImageUrl: string): u32 {
    let lot = new AuctionLot(lotName, lotImageUrl);
    let currentTime = Context.blockTimestamp;
    let endTime = currentTime + (60 * 60); // Добавляем 1 час в секундах к текущему времени
    let auction = new SmartAuction(Context.sender, lot, endTime);

    let index = this.auctions.push(auction);
    return index;
  }

  /**
   * Метод для получения аукциона
   */
  get_auction(auctionId: u32): SmartAuction | null {
    if (this.auctions.containsIndex(auctionId)) {
      return this.auctions[auctionId];
    }

    return null;
  }



  /**
   * Вспомогательные ассерты
   */
  private assert_auction_owner(auction: SmartAuction): void {
    assert(Context.sender == auction.owner, 'Только создатель аукциона может выполнять данное действие');
  }

  private assert_auction_id(id: u32): void {
    assert(this.auctions.containsIndex(id), 'Аукцион не существует');
  }

  private assert_auction_is_open(auction: SmartAuction): void {
    assert(!auction.canceled, 'Аукцион отменен');
    assert(!auction.ended, 'Аукцион завершен');
  }

  private assert_bid_is_highest(auction: SmartAuction, bid: AuctionBid): void {
    assert(bid.bid > u128.Zero, 'Не хватает денег на кошельке');
    assert(u128.gt(bid.bid, auction.highestBid), 'Ставка должна быть выше предыдущей!');
  }

}
