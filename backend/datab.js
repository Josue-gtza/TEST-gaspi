const jsonfile = require('jsonfile');

const DB_PATH = './bd.json';

// Función para obtener la lista de proveedores
const getProviders = async () => {
    try {
      

      const data = await jsonfile.readFile(DB_PATH);
      return data; // Devuelve los datos directamente sin acceder a la propiedad "providers"
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
      return [];
    }
  };

// Función para guardar la lista de proveedores
const saveProviders = async (providers) => {
  try {
    const data = {
      providers: providers,
    };
    await jsonfile.writeFile(DB_PATH, data);
    console.log('Proveedores guardados correctamente.');
  } catch (error) {
    console.error('Error al guardar los proveedores:', error);
  }
};

module.exports = {
  getProviders,
  saveProviders,
};
