const express = require('express');
const { addDeviceToNetBox, getDevicesFromNetBox } = require('../services/netboxService');
const router = express.Router();

// Hent alle enheter fra NetBox
router.get('/', async (req, res) => {
  try {
    const devices = await getDevicesFromNetBox();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch devices from NetBox' });
  }
});

// Legg til en ny enhet i NetBox
router.post('/', async (req, res) => {
  const deviceData = req.body;
  try {
    const newDevice = await addDeviceToNetBox(deviceData);
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add device to NetBox', details: error.message });
  }
});

module.exports = router;
