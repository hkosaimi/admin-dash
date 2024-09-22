import { useRef } from "react";
import Layout from "../../Layout";
import { useGetOrderQuery, useUpdateOrderToDeliverdMutation } from "../../redux/queries/orderApi";
import { useParams } from "react-router-dom";
import { useGetDeliveryStatusQuery } from "../../redux/queries/productApi";
import { toast } from "react-toastify";
import Badge from "../../components/Badge";
import clsx from "clsx";
import Invoice from "../../components/Invoise";
import { usePDF } from "react-to-pdf";

function OrderDetails() {
  const { orderId } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderQuery(orderId);
  const { data: deliveryStatus } = useGetDeliveryStatusQuery();
  const [updateOrderToDeliverd] = useUpdateOrderToDeliverdMutation();
  console.log(order);
  const ref = useRef();
  const { toPDF, targetRef } = usePDF({
    filename: `invoice-${order?.createdAt.substring(0, 10)}.pdf`,
  });

  const handleUpdateOrderToDelivered = async () => {
    if (order) {
      await updateOrderToDeliverd(orderId);
      toast.success("Order is updated to delivered");
      refetch();
    }
  };
  const handlePdf = () => {
    toPDF();
  };
  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-4">Error: {error.message}</p>;
  return (
    <Layout>
      <div className="px-0 py-6 w-[1000px] lg:py-3 lg:mt-[50px] ml-0 lg:ml-[50px] ">
        <div className="container mx-auto px-4 py-6">
          <div className="">
            <h1 className="text-[20px] font-bold">Order details:</h1>
            <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
          </div>
          {order && (
            <div className="bg-white shadow rounded-lg p-6 ">
              <h2 className="text-2xl font-semibold mb-2">Order ID: {order._id}</h2>
              <p className="text-gray-700 mb-10">
                <strong>Order Date:</strong> {order.createdAt.substring(0, 10)}
              </p>
              <h3 className="text-xl font-semibold mb-2">Items:</h3>
              <table className="w-full table-auto  border-collapse mb-10">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-2 px-4 text-left">Item</th>
                    <th className="py-2 px-4 text-left">Quantity</th>
                    <th className="py-2 px-4 text-left">Price</th>
                    <th className="py-2 px-4 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems.map((item) => (
                    <tr key={item._id} className="border-b ">
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.qty}</td>
                      <td className="py-2 px-4">{item.price.toFixed(3)} KD</td>
                      <td className="py-2 px-4">{(item.qty * item.price).toFixed(3)} KD</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="text-md font-semibold mb-5">
                Shipping Fees: {order?.shippingPrice.toFixed(3)} KD
              </h3>
              <h3 className="text-xl font-semibold mb-5 ">
                Total Price: {order?.totalPrice.toFixed(3)} KD
              </h3>
              <p className="text-gray-700 mb-5">
                <strong>Shipping Address:</strong> Province: {order.shippingAddress.province}{" "}
                <strong className="text-rose-500">|</strong> City:
                {"  "}
                {order.shippingAddress.city} <strong className="text-rose-500">|</strong> Block:{" "}
                {order.shippingAddress.block} <strong className="text-rose-500">|</strong> Street:{" "}
                {order.shippingAddress.street} <strong className="text-rose-500">|</strong> House:{" "}
                {order.shippingAddress.house}
              </p>
              <p className="text-gray-700 capitalize">
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <div className="text-md font-semibold items-center flex gap-5 mt-5">
                Delivery status:{" "}
                {order.isDelivered ? (
                  <Badge variant="success">
                    Delivered on {order?.deliveredAt.substring(0, 10)}
                  </Badge>
                ) : (
                  <Badge variant="pending">Processing</Badge>
                )}
              </div>
            </div>
          )}
          <div className="flex justify-end  gap-5">
            <button
              disabled={order?.isDelivered}
              onClick={handleUpdateOrderToDelivered}
              className={clsx(
                "select-none mt-5   transition-all duration-300  float-right bg-gradient-to-t   px-3 py-2 rounded-lg font-bold shadow-md",
                order?.isDelivered
                  ? "from-gray-200 to-gray-200 text-gray-600"
                  : "from-teal-500 to-teal-400 text-white"
              )}>
              Mark as delivered
            </button>
            <button
              onClick={handlePdf}
              className="select-none mt-5   transition-all duration-300  float-right bg-gradient-to-t   from-rose-500 to-rose-400 text-white px-3 py-2 rounded-lg font-bold shadow-md">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
      {/* Hidden invoice template for PDF generation */}
      <div
        ref={targetRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          height: "auto",
          width: "auto",
        }}>
        <Invoice order={order} />
      </div>
    </Layout>
  );
}

export default OrderDetails;
