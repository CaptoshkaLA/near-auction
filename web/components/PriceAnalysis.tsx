/*import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const PriceAnalysis = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [age, setAge] = useState('');
  const [mileage, setMileage] = useState('');
  const [engine, setEngine] = useState('');
  const [transmission, setTransmission] = useState('');
  const [result, setResult] = useState('');

  const handleManufacturerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManufacturer(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };

  const handleMileageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMileage(event.target.value);
  };

  const handleEngineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEngine(event.target.value);
  };

  const handleTransmissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransmission(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      Manufacturer: manufacturer,
      Age: parseInt(age),
      Mileage: parseInt(mileage),
      Engine: engine,
      Transmission: transmission,
    };

    try {
      const response = await axios.post('http://localhost:5000/predict', data);
      const prediction = response.data.prediction;
      setResult(prediction);
    } catch (error) {
      console.error(error);
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
          <Typography color="text.primary">Price analysis</Typography>
        </Breadcrumbs>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <TextField label="Manufacturer" value={manufacturer} onChange={handleManufacturerChange} required fullWidth />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField label="Age" value={age} onChange={handleAgeChange} required fullWidth />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField label="Mileage" value={mileage} onChange={handleMileageChange} required fullWidth />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField label="Engine" value={engine} onChange={handleEngineChange} required fullWidth />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField label="Transmission" value={transmission} onChange={handleTransmissionChange} required fullWidth />
        </div>
        <Button type="submit" variant="contained" style={{ width: '25%', marginLeft: 0 }}>
          Get Price
        </Button>
      </form>
      {result && (
        <div>
          <h3>Result</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default PriceAnalysis;*/



import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const manufacturers = [
  "Abarth",
  "Alfa-Romero",
  "Audi",
  "BMW",
  "Bentley",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "DS",
  "Dacia",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Isuzu",
  "Jaguar",
  "Jeep",
  "Kia",
  "Land-Rover",
  "Lexus",
  "MG",
  "Maserati",
  "Mazda",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Nissan",
  "Peugeot",
  "Porsche",
  "Renault",
  "Seat",
  "Skoda",
  "Smart",
  "Subaru",
  "Suzuki",
  "Toyota",
  "Vauxhall",
  "Volkswagen",
  "Volvo",
];

const PriceAnalysis = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [age, setAge] = useState('');
  const [mileage, setMileage] = useState('');
  const [engine, setEngine] = useState('');
  const [transmission, setTransmission] = useState('');
  const [result, setResult] = useState('');

  const handleManufacturerChange = (event: SelectChangeEvent<string>) => {
    setManufacturer(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };

  const handleMileageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMileage(event.target.value);
  };

  const handleEngineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEngine(event.target.value);
  };

  const handleTransmissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransmission(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      Manufacturer: manufacturer,
      Age: parseInt(age),
      Mileage: parseInt(mileage),
      Engine: engine,
      Transmission: transmission,
    };

    try {
      // Сброс значения result перед отправкой нового запроса
      setResult('');

      const response = await axios.post('http://localhost:5000/predict', data);
      const prediction = response.data.prediction;
      setResult(prediction);
    } catch (error) {
      console.error(error);
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
          <Typography color="text.primary">Price analysis</Typography>
        </Breadcrumbs>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <FormControl fullWidth required>
            <InputLabel>Марка машины</InputLabel>
            <Select label="Марка машины" value={manufacturer} onChange={handleManufacturerChange}>
              {manufacturers.map((manufacturer) => (
                <MenuItem value={manufacturer} key={manufacturer}>{manufacturer}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField label="Возраст автомобиля" value={age} onChange={handleAgeChange} required fullWidth />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField label="Пробег в км" value={mileage} onChange={handleMileageChange} required fullWidth />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField label="Тип двигателя (топливо)" value={engine} onChange={handleEngineChange} required fullWidth />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField label="Коробка передач" value={transmission} onChange={handleTransmissionChange} required fullWidth />
        </div>
        <Button type="submit" variant="contained" style={{ width: '25%', marginLeft: 0 }}>
          Узнать цену
        </Button>
      </form>
      {result && (
        <div>
          <h3>Прогнозируемая цена</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default PriceAnalysis;
