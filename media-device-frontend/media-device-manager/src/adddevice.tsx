import React, { useState } from "react";

function AddDevice({ onAdd }: { onAdd: (device: any) => void }) {
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onAdd({ type, name });
    setType("");
    setName("");
  };

  return (
    <div>
      <h3>Add Device</h3>
      <input
        type="text"
        placeholder="Device Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Device Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddDevice;
