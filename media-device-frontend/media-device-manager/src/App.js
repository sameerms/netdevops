import React, { useState } from "react";
import AddDevice from "./adddevice";


function App() {
  // State to hold the list of devices
  const [devices, setDevices] = useState([]);

  // Function to add a device
  const handleAddDevice = (device) => {
    // Update the state with the new device
    setDevices((prevDevices) => [...prevDevices, device]);

    // Optionally, send the new device to the backend
    fetch("/devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    })
      .then((response) => response.json())
      .then((data) => console.log("Device added:", data))
      .catch((error) => console.error("Error adding device:", error));
  };

  return (
    <div>
      <h1>Media Device Manager</h1>
      <AddDevice onAdd={handleAddDevice} />
      <h2>Device List</h2>
      <ul>
        {devices.map((device, index) => (
          <li key={index}>
            {device.name} ({device.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
