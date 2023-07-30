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
   * Метод выводязий список аукционов
   */
  list_auctions(): Array<SmartAuction> {
    let result = new Array<SmartAuction>();
    for (let i = 0; i < this.auctions.length; i++) {
      const entry = this.auctions[i];
      result.push(entry);
    }
    return result;
  }

  /**
   * Метод для закрытия аукциона
   */
  end_auction(auctionId: u32): void {
    this.assert_auction_id(auctionId);

    let auction = this.auctions[auctionId];
    this.assert_auction_owner(auction);
    this.assert_auction_is_open(auction);

    auction.ended = true;
    this.auctions.replace(auctionId, auction);

    this.transfer(auction);
  }

  /**
   * Метод для отмены аукциона
   */
  cancel_auction(auctionId: u32): void {
    this.assert_auction_id(auctionId);

    let auction = this.auctions[auctionId];
    this.assert_auction_owner(auction);
    this.assert_auction_is_open(auction);

    auction.canceled = true;
    this.auctions.replace(auctionId, auction);
  }

  /**
   * Метод для размещения ставки
   */
  place_bid(auctionId: u32): void {
    this.assert_auction_id(auctionId);

    let auction = this.auctions[auctionId];
    this.assert_auction_is_open(auction);

    const bid = new AuctionBid();
    this.assert_bid_is_highest(auction, bid);

    auction.bids.push(bid);
    auction.highestBid = bid.bid;
    auction.highestBidder = bid.sender;
    this.auctions.replace(auctionId, auction);
  }

  @mutateState()
  on_transfer_complete(): void {
    assert_self();
    assert_single_promise_success();

    logging.log('Успешно выполнено!');

  }

  /**
   * Метод для перевод денег от покупателя к продавцу
   */
  private transfer(auction: SmartAuction): void {
    this.assert_auction_owner(auction);
    const to_self = Context.contractName;
    const to_auction_owner = ContractPromiseBatch.create(auction.owner);
    const promise = to_auction_owner.transfer(auction.highestBid);
    promise.then(to_self).function_call('on_transfer_complete', '{}', u128.Zero, XCC_GAS);
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
