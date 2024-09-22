// Invoice.js
import React from "react";

const Invoice = ({ order, storeName }) => {
  const calculateSubtotal = () => {
    return order?.orderItems.reduce((total, item) => total + item.qty * item.price, 0).toFixed(3);
  };

  console.log(order);
  return (
    <>
      <div className="p-8 block">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">INVOICE</h1>
            <p>Xelectronics</p>
            <p>Explore our social media accounts: @Xelectronics</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">Invoice #{order?._id}</p>
            <p>Date: {order?.createdAt.substring(0, 10)}</p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Bill To:</h2>
          <p>{order?.user?.name}</p>
          <p>{order?.user?.email}</p>
          <p>{order?.user?.phone}</p>
          <p>
            Province: <strong>{order?.shippingAddress.province}</strong>, City:
            <strong>{order?.shippingAddress.city}</strong>, Block:
            <strong>{order?.shippingAddress.block}</strong>,Street:{" "}
            <strong>{order?.shippingAddress.street}</strong>, House:
            <strong>{order?.shippingAddress.house}</strong>
          </p>
        </div>
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order?.orderItems.map((item) => (
              <tr key={item._id} className="border-b border-gray-200">
                <td className="py-2">{item?.name}</td>
                <td className="text-right py-2">{item?.qty}</td>
                <td className="text-right py-2">{item?.price.toFixed(3)} KD</td>
                <td className="text-right py-2">{(item.qty * item.price).toFixed(3)} KD</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <div className="text-right">
            <p className="mb-2">Subtotal: {calculateSubtotal()} KD</p>
            <p className="mb-2">Shipping Fees: {order?.shippingPrice.toFixed(3)} KD</p>
            <p className="text-xl font-bold">Total: {order?.totalPrice.toFixed(3)} KD</p>
          </div>
        </div>
        <div className="mt-8 text-sm text-gray-600">
          <p>Thank you for your business &hearts;</p>
        </div>
      </div>
    </>
  );
};

export default Invoice;
