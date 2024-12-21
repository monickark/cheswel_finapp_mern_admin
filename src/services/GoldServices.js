import requests from './httpService';

const GoldServices = {
    getAllGolds: async () => {
    return requests.get('/gold/all');
  },

  getShowingGold: async () => {
    return requests.get('/gold/show');
  },

  getGoldById: async (id) => {
    return requests.get(`/gold/${id}`);
  },

  addGold: async (body) => {
    return requests.post('/gold/add', body);
  },

  addAllGold: async (body) => {
    return requests.post('/gold/add/all', body);
  },

  updateGold: async (id, body) => {
    return requests.put(`/gold/${id}`, body);
  },

  updateManyGold: async (body) => {
    return requests.patch('gold/update/many', body);
  },

  updateStatus: async (id, body) => {
    return requests.put(`/gold/status/${id}`, body);
  },

  deleteGold: async (id, body) => {
    return requests.patch(`/gold/${id}`, body);
  },

  deleteManyGold: async (body) => {
    return requests.patch('/gold/delete/many', body);
  },
};

export default GoldServices;
