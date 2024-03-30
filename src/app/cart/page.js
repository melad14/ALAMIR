'use client';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CartContext, cartProductPrice } from '@/components/AppContext';
import AddressInputs from '@/components/layout/AddressInputs';
import IndoorOption from '@/components/layout/IndoorOption';
import SectionHeaders from '@/components/layout/SectionHeaders';
import CartProduct from '@/components/menu/CartProduct';
import { useProfile } from '@/components/UseProfile';

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [deliveryOption, setDeliveryOption] = useState('delivery'); // State for delivery option
  const [tableNumber, setTableNumber] = useState('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone,ontherphone, streetAddress, city } = profileData;
      const addressFromProfile = {
        phone,
        ontherphone,
        streetAddress,
        city,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  function handlePaymentMethodChange(method) {
    setPaymentMethod(method);
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
  
    let checkoutData = {};
  
    if (deliveryOption === 'delivery') {
      checkoutData = {
        address,
        cartProducts,
        deliveryOption,
      };
    } else if (deliveryOption === 'indoor') {
      checkoutData = {
        tableNumber,
        cartProducts,
        deliveryOption,
      };
    }
    try {
      if (paymentMethod === 'online') {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(checkoutData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          window.location = responseData.redirectUrl;
        } else {
          throw new Error('Failed to process online payment');
        }
      } else if (paymentMethod === 'cash') {
        const response = await fetch('/api/cashpay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(checkoutData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          window.location = responseData.redirectUrl;
          toast.success('Cash payment successful');
        } else {
          throw new Error('Failed to process cash payment');
        }
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again later.');
    }
  }
  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && <div>No products in your shopping cart</div>}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct key={index} index={index} product={product} onRemove={removeCartProduct} />
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">Total:</div>
            <div className="font-semibold pl-2 text-right">{subtotal} EGP</div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <div className="flex justify-between mb-4">
            <button
              className={`px-4 py-2 rounded ${paymentMethod === 'online' ? 'bg-primary text-white' : 'bg-gray-300'}`}
              onClick={() => handlePaymentMethodChange('online')}
            >
              Online Payment
            </button>
            <button
              className={`px-4 py-2 rounded ${paymentMethod === 'cash' ? 'bg-primary text-white' : 'bg-gray-300'}`}
              onClick={() => handlePaymentMethodChange('cash')}
            >
              Cash Payment
            </button>
          </div>
          <form onSubmit={proceedToCheckout}>
            <div>
              <label className="block">Delivery Option:</label>
              <select
                className="block"
                value={deliveryOption}
                onChange={(e) => setDeliveryOption(e.target.value)}
              >
                <option value="delivery">Delivery</option>
                <option value="indoor">In door </option>
              </select>
            </div>
            {deliveryOption === 'delivery' && (
              <AddressInputs addressProps={address} setAddressProp={handleAddressChange} />
            )}
            {deliveryOption === 'indoor' && (
              <IndoorOption tableNumber={tableNumber} setTableNumber={setTableNumber} />
            )}
            {paymentMethod === 'online' ? (
              <button type="submit">Online Payment <br /> {subtotal} EGP</button>
            ) : (
              <button type="submit">Cash Payment <br /> {subtotal} EGP</button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}



