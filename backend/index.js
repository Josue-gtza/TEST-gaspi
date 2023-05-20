const Hapi = require('hapi');
const HapiCors = require('hapi-cors');
const { getProviders, saveProviders } = require('./datab.js');


const PORT = process.env.PORT || 3001;
const DB_PATH = 'bd.json';

const server = Hapi.server({
  port: PORT,
  host: 'localhost'
});

const version = '1.0.0'; // Aquí puedes establecer la versión de tu aplicación

server.route({
  method: 'GET',
  path: '/api/version',
  handler: (request, h) => {
    return {
      version: version
    };
  }
});

server.route({
    method: 'GET',
    path: '/api/providers',
    handler: async (request, h) => {
        const providers = await getProviders();

      const page = parseInt(request.query.page) || 1;
      const limit = parseInt(request.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedProviders = providers.providers.slice(startIndex, endIndex);
  
      return {
        page,
        limit,
        total: providers.providers.length,
        data: paginatedProviders
      };
    }
  });

server.route({
  method: 'POST',
  path: '/api/providers',
  handler: async (request, h) => {
    const newProvider = request.payload;
    const providers = await getProviders();

    const existingProvider = providers.find(provider => provider.Nombre === newProvider.Nombre);
    if (existingProvider) {
      return h.response('El proveedor ya existe').code(400);
    }

    providers.push(newProvider);
    saveProviders(providers);

    return h.response('Proveedor agregado correctamente').code(201);
  }
});

server.route({
    method: 'DELETE',
    path: '/api/providers/{id}',
    handler: async (request, h) => {
      const providerId = request.params.id;
      console.log('Provider ID:', providerId);
  
      let providers = await getProviders();
      console.log('Existing Providers:', providers);
  
      const existingProviderIndex = providers.findIndex(provider => provider.id === providerId);
      console.log('Existing Provider Index:', existingProviderIndex);
  
      if (existingProviderIndex === -1) {
        return h.response('Proveedor no encontrado').code(404);
      }
  
      providers.splice(existingProviderIndex, 1); // Elimina el proveedor del array
  
      console.log('Updated Providers:', providers);
      saveProviders(providers);
  
      return h.response('Proveedor eliminado correctamente').code(200);
    }
  });
  
const startServer = async () => {
  try {
    await server.register({
      plugin: HapiCors,
      options: {
        origins: ['http://localhost:3000'], // Reemplaza con la URL de tu frontend
      },
    });

    await server.start();
    console.log(`Hapi is listening to http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
