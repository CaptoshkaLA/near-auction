import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import * as near from "../near";
import * as React from "react";

export default function AuctionOpen({ auction, index }: any) {
  const { bids, canceled, ended, highestBid, highestBidder, lot, owner } = auction;
  const status = canceled ? 'Отменен' : ended ? 'Закончен' : '';

  if (canceled || ended) {
    return null; // не отображать аукционы, которые отменены или завершены
  }

  return (
    <Link href={`/auctions/${index}`}>
      <Card sx={{ maxWidth: 345 }} style={{ cursor: 'pointer' }}>
        <CardMedia component="img" alt="green iguana" height="140" image={lot.imageUrl} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {lot.name}
            <br />
            Продавец: {owner}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between' }}>
          <b>{status}</b>
          <b>{near.formatNearAmount(highestBid, 6)} Coins</b>
        </CardActions>
      </Card>
    </Link>
  );
}