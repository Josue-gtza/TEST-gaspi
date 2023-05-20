import React, { useEffect, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProviders();
  }, [page, limit]);

  const fetchProviders = async () => {
    const response = await fetch(`/api/providers?page=${page}&limit=${limit}`);
    const data = await response.json();
    setProviders(data.data);
    setTotal(data.total);
  };

  const handleDelete = async (providerId) => {
    try {
      const response = await fetch(`/api/providers/${providerId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Actualizar la lista de proveedores después de eliminar
        const updatedProviders = providers.filter(provider => provider.id !== providerId);
        setProviders(updatedProviders);
        // Opcional: Mostrar un mensaje de éxito o realizar alguna otra acción
      } else {
        // Opcional: Mostrar un mensaje de error o realizar alguna otra acción
      }
    } catch (error) {
      // Opcional: Mostrar un mensaje de error o realizar alguna otra acción
    }
  };

  const renderGridItem = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * 3 + columnIndex;
    if (index >= providers.length) {
      return null;
    }

    const provider = providers[index];

    const gridItemStyle = {
      ...style,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: 'none',
      background: '#f5f5f5',
      padding: '10px',
      margin: '10px',
      width: 'calc(33.33% - 20px)', // 3 boxes per row with margin
      height: '150px', // Adjust the height as needed
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add box shadow
    };

    const buttonContainerStyle = {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      marginTop: 'auto', // Push the button to the bottom of the container
    };

    const buttonStyle = {
      margin: '10px',
    };

    const handleDeleteClick = () => {
      handleDelete(provider.id);
    };

    return (
      <div style={gridItemStyle}>
        {/* Renderizar los datos del proveedor */}
        <div>
          <div>{provider.Nombre}</div>
          <div>{provider['Razón Social']}</div>
          {/* ... */}
        </div>
        <div style={buttonContainerStyle}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FontAwesomeIcon icon={faTrash} />}
            style={buttonStyle}
            onClick={handleDeleteClick}
          >
            Eliminar
          </Button>
        </div>
      </div>
    );
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const renderGrid = ({ height, width }) => {
    const itemsPerRow = 3;
    const rowCount = Math.ceil(providers.length / itemsPerRow);

    return (
      <Grid
        height={height}
        width={width}
        rowCount={rowCount}
        columnCount={itemsPerRow}
        rowHeight={170} // Adjust the row height as needed
        columnWidth={(width / itemsPerRow) - 20} // Subtract margin
      >
        {renderGridItem}
      </Grid>
    );
  };

  return (
    <div style={{ height: '100vh', position: 'relative', backgroundColor: '#f0f0f0' }}>
      <AutoSizer>
        {({ height, width }) => renderGrid({ height, width })}
      </AutoSizer>
      {providers.length < total && (
        <button
          onClick={handleLoadMore}
          style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}
        >
          Cargar más
        </button>
      )}
    </div>
  );
};

export default ProviderList;
