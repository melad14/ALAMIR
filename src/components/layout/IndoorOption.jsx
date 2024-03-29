import React from 'react';

export default function IndoorOption({ tableNumber, setTableNumber, disabled = false  }) {



  return (
    <div>
      <label>Table Number:</label>
      <input
        disabled={disabled}
        required
        type="text"
        placeholder="Table Number"
        value={tableNumber||''}
      onChange={(ev) => setTableNumber( ev.target.value)}
      />
    </div>
  );
}
