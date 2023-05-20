import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Components.css';
import AppVersion from './version';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/Providers'); // Navegar a la ruta '/Providers'
  };

  return (
    <Box className="header" style={{ backgroundColor: 'lightgrey', padding: '20px', textAlign: 'center' }}>
    <h1 style={{ fontSize: '24px', color: '#333', margin: '0' }}>e-Commerce Gapsi</h1>
 
    <Box
    sx={{
      backgroundColor: '#f5f5f5',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column', // Añadimos esta línea para colocar los elementos en columna
    }}
    >
      <Container maxWidth="sm">
        <img src="/cv.jpeg" alt="Imagen" />
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        Bienvenido Candidato 01
        </Typography>
        <Button
          variant="contained"
          color="primary"
          endIcon={<FontAwesomeIcon icon={faArrowRight} />}
          onClick={handleButtonClick}
        >
          Continuar
        </Button>
      </Container>
      <div className="footer">
        <AppVersion /> {/* Agregamos el componente AppVersion aquí */}
      </div>
    </Box>
    </Box>
  );
};

export default LandingPage;
