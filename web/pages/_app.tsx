// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import type { AppProps } from 'next/app';
// import * as near from '../near';
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import NewAuctionForm from '../components/NewAuctionForm';
// import { useRouter } from 'next/router';
//
// import DeleteOrCancelAuction from '../components/DeleteOrCancelAuction';
// import AuctionHistory from '../components/AuctionHistory';
// import PriceAnalysis from '../components/PriceAnalysis';
//
// function MyApp({ Component, pageProps }: AppProps) {
//   const [nearData, setNearData] = useState<near.NearProps | null>(null);
//   const router = useRouter();
//
//   useEffect(() => {
//     near.init().then(setNearData);
//   }, []);
//
//   const isSignedIn = nearData?.wallet.isSignedIn();
//
//   const signIn = async () => {
//     nearData?.wallet.requestSignIn(nearData?.contract.contractId);
//   };
//
//   const signOut = async () => {
//     await nearData?.wallet.signOut();
//   };
//
//   const [showNewAuctionForm, setShowNewAuctionForm] = useState(false);
//
//   const handleToggleNewAuctionForm = () => {
//     setShowNewAuctionForm(!showNewAuctionForm);
//   };
//
//   const [showDeleteOrCancelAuction, setShowDeleteOrCancelAuction] = useState(false);
//
//   const handleToggleDeleteOrCancelAuction = () => {
//     setShowDeleteOrCancelAuction(!showDeleteOrCancelAuction);
//   };
//
//   const [showAuctionHistory, setShowAuctionHistory] = useState(false);
//
//   const handleToggleAuctionHistory = () => {
//     setShowAuctionHistory(!showAuctionHistory);
//   };
//
//   const [showPriceAnalysis, setShowPriceAnalysis] = useState(false);
//
//   const handleTogglePriceAnalysis = () => {
//     setShowPriceAnalysis(!showPriceAnalysis);
//   };
//
//   return (
//     <>
//       <CssBaseline />
//       <AppBar position="fixed">
//         <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
//             Блокчейн аукцион
//           </Typography>
//           {!isSignedIn && (
//             <div style={{ marginLeft: 'auto', marginRight: '16px' }}>
//               <Button color="secondary" variant="contained" onClick={signIn}>
//                 Войти в NEAR Wallet
//               </Button>
//             </div>
//           )}
//           {isSignedIn && nearData?.currentUser && (
//             <>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Button color="secondary" variant="contained" onClick={handleToggleAuctionHistory}>
//                   Просмотр истории лотов
//                 </Button>
//                 <Button color="secondary" variant="contained" onClick={handleToggleNewAuctionForm} style={{ marginLeft: '32px' }}>
//                   Создать новый лот
//                 </Button>
//                 <Button color="secondary" variant="contained" onClick={handleTogglePriceAnalysis}>
//                   Узнать цену на товар
//                 </Button>
//                 <Button
//                   color="secondary"
//                   variant="contained"
//                   onClick={handleToggleDeleteOrCancelAuction}
//                   style={{ marginLeft: '32px' }}
//                 >
//                   Список моих лотов
//                 </Button>
//               </div>
//               <div style={{ marginLeft: '32px' }}>
//                 {nearData?.currentUser?.accountId} {near.formatNearAmount(nearData?.currentUser?.balance ?? '0', 4)} Coins
//               </div>
//               <div style={{ marginLeft: '32px' }}>
//                 <Button color="secondary" variant="contained" onClick={signOut}>
//                   Выйти из NEAR Wallet
//                 </Button>
//               </div>
//             </>
//           )}
//         </Toolbar>
//       </AppBar>
//       <Toolbar />
//       <Container maxWidth="md">
//         {router.pathname === '/create-auction' || showNewAuctionForm ? (
//           <NewAuctionForm />
//         ) : router.pathname === '/delete-or-cancel-auction' || showDeleteOrCancelAuction ? (
//           <DeleteOrCancelAuction />
//         ) : router.pathname === '/price-analysis' || showPriceAnalysis ? (
//           <PriceAnalysis />
//         ): router.pathname === '/auction-history' || showAuctionHistory ? (
//           <AuctionHistory />
//         ) : (
//           <Component {...pageProps} near={nearData} />
//         )}
//       </Container>
//     </>
//   );
// }
//
// export default MyApp;

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import type { AppProps } from 'next/app';
import * as near from '../near';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import NewAuctionForm from '../components/NewAuctionForm';
import { useRouter } from 'next/router';

import DeleteOrCancelAuction from '../components/DeleteOrCancelAuction';
import AuctionHistory from '../components/AuctionHistory';
import PriceAnalysis from '../components/PriceAnalysis';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import { purple } from '@mui/material/colors';

function MyApp({ Component, pageProps }: AppProps) {
  const [nearData, setNearData] = useState<near.NearProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    near.init().then(setNearData);
  }, []);

  const isSignedIn = nearData?.wallet.isSignedIn();

  const signIn = async () => {
    nearData?.wallet.requestSignIn(nearData?.contract.contractId);
  };

  const signOut = async () => {
    await nearData?.wallet.signOut();
  };

  const [showNewAuctionForm, setShowNewAuctionForm] = useState(false);
  const [showDeleteOrCancelAuction, setShowDeleteOrCancelAuction] = useState(false);
  const [showAuctionHistory, setShowAuctionHistory] = useState(false);
  const [showPriceAnalysis, setShowPriceAnalysis] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Auction');
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      const width = selectRef.current.offsetWidth;
      selectRef.current.style.width = `${width}px`;
    }
  }, [selectedMenu]);

  const handleMenuChange = (event: SelectChangeEvent<string>) => {
    setSelectedMenu(event.target.value);
    setShowNewAuctionForm(false);
    setShowDeleteOrCancelAuction(false);
    setShowAuctionHistory(false);
    setShowPriceAnalysis(false);
  };

  const renderSelectedMenu = () => {
    switch (selectedMenu) {
      case 'newAuction':
        return <NewAuctionForm />;
      case 'deleteOrCancelAuction':
        return <DeleteOrCancelAuction />;
      case 'auctionHistory':
        return <AuctionHistory />;
      case 'priceAnalysis':
        return <PriceAnalysis />;
      default:
        return <Component {...pageProps} near={nearData} />;
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Блокчейн аукцион
          </Typography>
          {!isSignedIn && (
            <div style={{ marginLeft: 'auto', marginRight: '16px' }}>
              <Button color="secondary" variant="contained" onClick={signIn}>
                Войти в NEAR Wallet
              </Button>
            </div>
          )}
          {isSignedIn && nearData?.currentUser && (
            <>
              <div style={{ marginLeft: '32px' }}>
                {nearData?.currentUser?.accountId} {near.formatNearAmount(nearData?.currentUser?.balance ?? '0', 4)} Coins
              </div>
              <div style={{ alignItems: 'center' }}>
                <Select
                  value={selectedMenu}
                  onChange={handleMenuChange}
                  sx={{ backgroundColor: purple[500], color: 'white', marginLeft: '16px' }}
                  ref={selectRef}
                >
                  {selectedMenu !== '' && (
                    <MenuItem value="Auction">
                      Главная
                    </MenuItem>
                  )}
                  <MenuItem value="newAuction">Создать новый лот</MenuItem>
                  <MenuItem value="deleteOrCancelAuction">Список моих лотов</MenuItem>
                  <MenuItem value="auctionHistory">Просмотр истории лотов</MenuItem>
                  <MenuItem value="priceAnalysis">Анализ цены поддержанного автомобиля</MenuItem>
                  <MenuItem value="signOut">Выйти из NEAR Wallet</MenuItem>
                </Select>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="md">
        {renderSelectedMenu()}
      </Container>
    </>
  );
}

export default MyApp;





