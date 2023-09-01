import React, { useState, useEffect } from 'react';
import { listAuctions } from '../near';
import Auction from './Auction';
import { Typography, Snackbar } from '@mui/material';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { useRouter } from "next/router";

const AuctionHistory: React.FC = () => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [cancelMessage, setCancelMessage] = useState<string>("");
  const [endMessage, setEndMessage] = useState<string>("");
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
          <Typography color="text.primary">Auction history</Typography>
        </Breadcrumbs>
      </div>
      {auctions
        .filter((auction) => auction.canceled || auction.ended)
        .map((auction, index) => (
          <div key={auction.index}>
            {index !== 0 && ( // Добавлено условие для отображения элемента только если index !== 0
              <>
                <Auction auction={auction} index={index} />
                {auction.canceled && (
                  <Typography variant="body1" sx={{ textAlign: "right", fontSize: 18, marginTop: 2 }}>
                    Отменен
                  </Typography>
                )}
                {auction.ended && (
                  <Typography variant="body1" sx={{ textAlign: "right", fontSize: 18, marginTop: 2 }}>
                    Закончен
                  </Typography>
                )}
                <hr />
              </>
            )}
          </div>
        ))}
    </div>

  );
};

export default AuctionHistory;
