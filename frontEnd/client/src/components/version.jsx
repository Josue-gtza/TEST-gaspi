import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

const getVersionFromService = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/version'); // Reemplaza la URL con la del servicio REST
    return response.data.version;
  } catch (error) {
    console.error('Error al obtener la versión de la aplicación:', error);
    return null;
  }
};

const AppVersion = () => {
  const [version, setVersion] = useState('');

  useEffect(() => {
    const fetchVersion = async () => {
      const appVersion = await getVersionFromService();
      setVersion(appVersion);
    };

    fetchVersion();
  }, []);

  return (
    <Box
    sx={{
      backgroundColor: '#f5f5f5',
      padding: '10px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
      fontSize: '14px',
      color: '#777',
      textAlign: 'right'
    }}
  >
    Versión de la aplicación: {version}
  </Box>
  );
};

export default AppVersion;
