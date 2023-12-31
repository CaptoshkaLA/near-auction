// import * as React from 'react';
// import Link from 'next/link';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import LinkButton from '@mui/material/Link';
// import * as near from '../near';
//
// export default function Auction({ auction, index }: any) {
//   const { bids, canceled, ended, highestBid, highestBidder, lot, owner } = auction;
//   const status = canceled ? 'Отменен' : ended ? 'Закончен' : '';
//
//   return (
//     <Link href={`/auctions/${index}`}>
//       <Card sx={{ maxWidth: 345 }} style={{ cursor: 'pointer' }}>
//         <CardMedia component="img" alt="green iguana" height="140" image={lot.imageUrl} />
//         <CardContent>
//           <Typography variant="body2" color="text.secondary">
//             {lot.name}
//             <br />
//             Продавец: {owner}
//           </Typography>
//         </CardContent>
//         <CardActions style={{ justifyContent: 'space-between' }}>
//           <b>{status}</b>
//           <b>{near.formatNearAmount(highestBid, 6)} Coins</b>
//         </CardActions>
//       </Card>
//     </Link>
//   );
// }


import * as React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinkButton from '@mui/material/Link';
import * as near from '../near';

export default function Auction({ auction, index }: any) {
  const { bids, canceled, ended, highestBid, highestBidder, lot, owner, endTime } = auction;
  const status = canceled ? 'Отменен' : ended ? 'Закончен' : '';

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
          <div>
            <b>{status}</b>
            <br />
          </div>
          <b>{near.formatNearAmount(highestBid, 6)} Coins</b>
        </CardActions>
      </Card>
    </Link>
  );
}

