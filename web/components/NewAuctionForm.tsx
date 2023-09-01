import React, { useState } from 'react';
import { createAuction } from '../near/index';
import { TextField, Button, Snackbar, Box } from '@mui/material';
import Link from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/router';

const NewAuctionForm = () => {
  const [lotName, setLotName] = useState('');
  const [lotImageUrl, setLotImageUrl] = useState('');
  const [notification, setNotification] = useState('');

  const handleLotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLotName(event.target.value);
  };

  const handleLotImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLotImageUrl(event.target.value);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (lotName.trim() === '' || lotImageUrl.trim() === '') {
      setNotification('Пожалуйста, заполните следующие поля');
      return;
    }

    try {
      const isValidImage = await isValidImageUrl(lotImageUrl);
      if (!isValidImage) {
        setNotification('Указан неправильный URL изображения');
        return;
      }

      await createAuction(lotName, lotImageUrl);
      setNotification('Лот успешно создан');
      setLotName('');
      setLotImageUrl('');
    } catch (error) {
      setNotification('В процессе создания лота возникла ошибка');
    }
  };

  const handleNotificationClose = () => {
    setNotification('');
  };

  const router = useRouter();
  const handleAllAuctionsClick = () => {
    router.reload();
  };

  const isValidImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        resolve(img.naturalWidth !== 0);
      };
      img.onerror = () => {
        resolve(false);
      };
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: 20 }}>
          <Link href={`/`} passHref>
            <a onClick={handleAllAuctionsClick}>All auctions</a>
          </Link>
          <Typography color="text.primary">Create new auction</Typography>
        </Breadcrumbs>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 20 }}>
          <TextField
            label="Описание лота"
            value={lotName}
            onChange={handleLotNameChange}
            required
            fullWidth
            multiline
            rows={3}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <TextField
            label="Ссылка на изображение (в формате URL)"
            value={lotImageUrl}
            onChange={handleLotImageUrlChange}
            //required
            fullWidth
          />
        </div>

        <Button type="submit" variant="contained" fullWidth size="small" style={{ width: '25%' }}>
          Создать лот
        </Button>
      </form>

      <Snackbar
        open={notification !== ''}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Show notification in the center
      >
        <Box
          sx={{
            backgroundColor: notification === 'Auction created successfully' ? '#43a047' : '#e53935',
            color: '#fff',
            fontWeight: 'bold',
            p: 2,
            borderRadius: 4,
          }}
        >
          {notification}
        </Box>
      </Snackbar>
    </div>
  );
};

export default NewAuctionForm;