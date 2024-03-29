import React from 'react';

export default function AddressInputs({ addressProps, setAddressProp, disabled = false }) {
  const { phone, ontherphone, streetAddress, city } = addressProps;

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Phone</label>
          <input
            required
            disabled={disabled}
            type="tel" placeholder="Phone number"
            value={phone || ''} onChange={(ev) => setAddressProp('phone', ev.target.value)} 
          />
        </div>
        <div>
          <label>Other Phone</label>
          <input
            required
            disabled={disabled}
            type="tel" placeholder="Phone number"
            value={ontherphone || ''} onChange={(ev) => setAddressProp('ontherphone', ev.target.value)} 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Street address</label>
          <input
            required
            disabled={disabled}
            type="text" placeholder="Street address"
            value={streetAddress || ''} onChange={(ev) => setAddressProp('streetAddress', ev.target.value)} 
          />
        </div>
        <div>
          <label>City</label>
          <input
            required
            disabled={disabled}
            type="text" placeholder="City"
            value={city || ''} onChange={(ev) => setAddressProp('city', ev.target.value)} 
          />
        </div>
      </div>
    </>
  );
}
