// import React, { useState, useEffect } from 'react';
// import { listAuctions, cancelAuction, endAuction } from '../near';
// import Auction from './Auction';
// import { Button, Grid, Typography } from '@mui/material';
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "next/link";
// import {useRouter} from "next/router";
//
// const DeleteOrCancelAuction: React.FC = () => {
//   const [auctions, setAuctions] = useState<any[]>([]);
//
//   useEffect(() => {
//     loadAuctions();
//   }, []);
//
//   const loadAuctions = async () => {
//     try {
//       const auctionList = await listAuctions();
//       setAuctions(auctionList);
//     } catch (error) {
//       console.error('Error loading auctions:', error);
//     }
//   };
//
//   const handleCancelAuction = async (auctionId: number) => {
//     try {
//       await cancelAuction(auctionId);
//       loadAuctions();
//     } catch (error) {
//       console.error('Error canceling auction:', error);
//     }
//   };
//
//   const handleEndAuction = async (auctionId: number) => {
//     try {
//       await endAuction(auctionId);
//       loadAuctions();
//     } catch (error) {
//       console.error('Error ending auction:', error);
//     }
//   };
//
//   const router = useRouter();
//   const handleAllAuctionsClick = () => {
//     router.reload();
//   };
//
//   return (
//     <div>
//       <div style={{ marginBottom: 20 }}>
//         <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: 20 }}>
//           <Link href={`/`} passHref>
//             <a onClick={handleAllAuctionsClick}>All auctions</a>
//           </Link>
//           <Typography color="text.primary">Delete Or Cancel Auction</Typography>
//         </Breadcrumbs>
//       </div>
//       {auctions.map((auction: any) => (
//         <div key={auction.index}>
//           <Auction auction={auction} />
//           {!auction.canceled && !auction.ended && (
//             <Grid container justifyContent="flex-end" alignItems="center">
//               <Button onClick={() => handleCancelAuction(auction.index)} variant="contained" color="error">
//                 Cancel Auction
//               </Button>
//               <Button onClick={() => handleEndAuction(auction.index)} variant="contained" color="primary" sx={{ ml: 2 }}>
//                 End Auction
//               </Button>
//             </Grid>
//           )}
//           {auction.canceled && <Typography variant="body1">Auction Canceled</Typography>}
//           {auction.ended && <Typography variant="body1">Auction Ended</Typography>}
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };
//
// export default DeleteOrCancelAuction;

import React, { useState, useEffect } from 'react';
import { listAuctions, cancelAuction, endAuction } from '../near';
import Auction from './Auction';
import { Button, Grid, Typography, Snackbar } from '@mui/material';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/router";

const DeleteOrCancelAuction: React.FC = () => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [cancelMessage, setCancelMessage] = useState<string>("");
  const [endMessage, setEndMessage] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [auctionName, setAuctionName] = useState<string>("");

  useEffect(() => {
    loadAuctions();
  }, []);

  const loadAuctions = async () => {
    try {
      const auctionList = await listAuctions();
      setAuctions(auctionList);
    } catch (error) {
      console.error('Error loading auctions:', error);
    }
  };

  const handleCancelAuction = async (auctionId: number) => {
    try {
      await cancelAuction(auctionId);
      const auction = auctions.find((item, index) => index === auctionId);
      if (auction) {
        setCancelMessage(`Лот отменен: ${auction.lot.name}`);
        setAuctionName(auction.lot.name);
        setSnackbarOpen(true);
        loadAuctions();
        setTimeout(() => {
          setCancelMessage("");
          setAuctionName("");
          setSnackbarOpen(false);
        }, 7000);
      }
    } catch (error) {
      console.error('В процессе отмены лота возникла ошибка:', error);
    }
  };

  const handleEndAuction = async (auctionId: number) => {
    try {
      await endAuction(auctionId);
      const auction = auctions.find((item, index) => index === auctionId);
      alert(auction.lot.name)
      if (auction) {
        setEndMessage(`Лот закончен: ${auction.lot.name}`);
        setAuctionName(auction.lot.name);
        setSnackbarOpen(true);
        loadAuctions();
        setTimeout(() => {
          setEndMessage("");
          setAuctionName("");
          setSnackbarOpen(false);
        }, 7000);
      }
    } catch (error) {
      console.error('В процессе заканчивания лота возникла ошибка:', error);
    }
  };

  const router = useRouter();
  const handleAllAuctionsClick = () => {
    router.reload();
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: 20 }}>
          <Link href={`/`} passHref>
            <a onClick={handleAllAuctionsClick}>All auctions</a>
          </Link>
          <Typography color="text.primary">Delete Or Cancel Auction</Typography>
        </Breadcrumbs>
      </div>
      {auctions.map((auction, index) => (
        <div key={auction.index}>
          <Auction auction={auction} index={index}  />
          {!auction.canceled && !auction.ended && (
            <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: 2 }}>
              <Button onClick={() => handleCancelAuction(index)} variant="contained" color="error">
                Отменить лот
              </Button>
              <Button onClick={() => handleEndAuction(index)} variant="contained" color="primary" sx={{ ml: 2 }}>
                Закончить лот
              </Button>
            </Grid>
          )}
          {auction.canceled && (
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: 18, marginTop: 2 }}>
              Лот отменен
            </Typography>
          )}
          {auction.ended && (
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: 18, marginTop: 2 }}>
              Лот закончен
            </Typography>
          )}
          <Snackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={`${cancelMessage}\n${endMessage}`}
            autoHideDuration={7000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default DeleteOrCancelAuction;
