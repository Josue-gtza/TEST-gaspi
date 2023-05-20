import React, { useEffect, useState } from 'react';
import ProviderList from './ProviderList';

const Providers = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    // Lógica para obtener los proveedores de la base de datos
    const fetchProviders = async () => {
      // Realizar la petición a la base de datos y obtener los proveedores
      const response = await fetch('/api/providers');
      const data = await response.json();
      setProviders(data.data);
     
    };

    fetchProviders();
  }, []);

  return (
    <div>
      {/* Renderizar el componente ProviderList con los proveedores */}
      <ProviderList providers={providers} />
    </div>
  );
};

export default Providers;
