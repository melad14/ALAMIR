'use client'
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../../LoadingSpinner .js";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [paid, setPaid] = useState(order?.paid || false);
  const [iscomplete, setIscomplete] = useState(order?.iscomplete || false);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();


  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id=' + id)
        .then(res => res.json())
        .then(async orderData => {
          setOrder(orderData);
          setPaid(orderData.paid); 
          setIscomplete(orderData.iscomplete); 
          setLoadingOrder(false);
        })
        .catch(error => console.error("Error fetching order:", error));
    }
  }, [id]);

  const handleIsCompleteChange = () => {
    setIscomplete(prevState => !prevState);
  };

  const handlePaidChange = () => {
    setPaid(prevState => !prevState);
  };

  const handleSave = () => {
    updateOrder({ ...order, iscomplete, paid, id });
  };

  async function updateOrder(updatedOrder) {
    const savingPromise = new Promise(async (resolve, reject) => {

      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOrder)
      })
      if (response.ok)
        resolve();
      else reject();
    })
    await toast.promise(savingPromise, {
      loading: 'Saving this order',
      success: 'Saved',
      error: 'Error',
    });
  }

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order" />
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && (<LoadingSpinner />)}
      {order && (
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map(product => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Total:
              <span className="text-black font-bold inline-block w-8">{subtotal} EGP</span>
            </div>
          </div>
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              {order.deliveryOption === 'delivery' ? (
                <AddressInputs disabled={true} addressProps={order} />
              ) : (
                <div>
                  <label>Table Number:</label>
                  <input
                    disabled={true}
                    type="text"
                    value={order.tableNumber}
                  />

                </div>
              )}
              <div>
                <div className="mt-4">
                  <label>
                    <input
                      type="checkbox"
                      checked={iscomplete}
                      onChange={handleIsCompleteChange}
                    />
                    Order Complete
                  </label>
                </div>
                <div className="mt-4">
                  <label>
                    <input
                      type="checkbox"
                      checked={paid}
                      onChange={handlePaidChange}
                    />
                    Paid
                  </label>
                </div>
                <button className="bg-primary text-white" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
