const axios = require('axios');

const NETBOX_BASE_URL = 'http://netbox-server/api';
const NETBOX_API_TOKEN = 'YOUR_NETBOX_API_TOKEN';

// Axios-klient for NetBox med standardoppsett
const netboxClient = axios.create({
  baseURL: NETBOX_BASE_URL,
  headers: {
    Authorization: `Token ${NETBOX_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Hent alle enheter fra NetBox
async function getDevicesFromNetBox() {
  const response = await netboxClient.get('/dcim/devices/');
  return response.data;
}

// Legg til en enhet i NetBox
async function addDeviceToNetBox(deviceData) {
  const response = await netboxClient.post('/dcim/devices/', deviceData);
  return response.data;
}

module.exports = { getDevicesFromNetBox, addDeviceToNetBox };
