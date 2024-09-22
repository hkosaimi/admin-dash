import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import clsx from "clsx";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Badge from "../../components/Badge";
import { PencilLine } from "lucide-react";
import {
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
  useUploadProductImageMutation,
} from "../../redux/queries/productApi";

function ProductDetails() {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState();
  const [newImage, setNewImage] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCountInStock, setNewCountInStock] = useState();
  const [newDescription, setNewDescription] = useState("");

  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [clickEditProduct, setClickEditProduct] = useState(false);
  const { data: product, refetch } = useGetProductByIdQuery(productId);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  console.log(newImage);

  const handleDeleteProduct = async () => {
    if (product) {
      await deleteProduct(productId);
      toast.success("Product deleted successfully");
      navigate("/admin/productlist");
    }
  };
  const handleUpdateProduct = async () => {
    if (newPrice <= 0) {
      toast.error("Price must be a positive number");
      return;
    }
    const updatedProduct = {
      _id: productId,
      name: newName,
      price: newPrice,
      image: newImage,
      brand: newBrand,
      category: newCategory,
      countInStock: newCountInStock,
      description: newDescription,
    };

    const result = await updateProduct(updatedProduct);
    setClickEditProduct(!clickEditProduct);
    refetch();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated");
    }
  };
  const categories = [
    ...new Set(
      products?.map(
        (product) => product?.category.charAt(0).toUpperCase() + product.category.slice(1)
      )
    ),
  ];
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setNewImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  return (
    <Layout>
      <div className={clsx("px-4 py-3 flex gap-10  mt-[50px] ml-0 lg:ml-[50px] ")}>
        <div className="">
          <div className="flex justify-between ">
            <h1 className="text-[20px] font-bold">Product's details:</h1>
            <div className="flex gap-5">
              <button
                onClick={handleDeleteProduct}
                className=" select-none    bg-gradient-to-t  from-rose-500 to-rose-400 text-white px-3 py-2 rounded-lg font-bold shadow-md">
                Delete
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>

          <div className="w-[300px] relative text-xlmin-h-[500px] p-7 lg:w-[1000px]  bg-white shadow-md rounded-md">
            <div className="flex flex-col gap-5    rounded-lg">
              <div className="flex items-center justify-between">
                <h1 className="font-extrabold text-xl ">{product?.name}</h1>
                <div className="flex gap-5 flex-row-reverse">
                  <button
                    onClick={() => setClickEditProduct(!clickEditProduct)}
                    className="bg-gradient-to-t text-xs lg:text-lg lg:text-md gap-2 items-center flex justify-center from-zinc-200 to-zinc-50 px-3 py-2  rounded-lg text-black font-semibold shadow-md ">
                    {clickEditProduct ? "Cancel" : <PencilLine size={18} />}
                  </button>
                  {clickEditProduct && (
                    <button
                      onClick={handleUpdateProduct}
                      className="bg-gradient-to-t text-xs lg:text-lg  from-zinc-200 to-zinc-50 px-3 py-2 rounded-lg text-black font-semibold shadow-md">
                      update
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-10">
                <div className=" flex items-center ">
                  {!clickEditProduct ? (
                    <img src={product?.image} className="w-40" alt="product image" />
                  ) : (
                    <div className="flex flex-col gap-2">
                      <label>Upload new image:</label>
                      <input
                        type="file"
                        placeholder={newImage}
                        onChange={uploadFileHandler}
                        className=" w-[150px] lg:w-full p-3 cursor-pointer bg-gray-100/50 border shadow outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-5 lg:gap-14 ">
                    <div className="flex flex-col gap-7 ">
                      <h1 className="text-gray-700">Name:</h1>
                      <h1 className="text-gray-700">Category:</h1>
                      <h1 className="text-gray-700">Price:</h1>
                      <h1 className="text-gray-700">Stock:</h1>
                      <h1 className="text-gray-700">Created at:</h1>
                      <h1 className="text-gray-700">Updated at:</h1>
                      <h1 className="text-gray-700">Description:</h1>
                    </div>
                    {!clickEditProduct ? (
                      <div className="flex flex-col gap-7 ">
                        <h1 className="font-bold">{product?.name}</h1>
                        <h1 className="font-bold">{product?.category}</h1>
                        <h1 className="font-bold">{product?.price.toFixed(3)} KD</h1>
                        <h1 className="font-bold">
                          {product?.countInStock > 0 ? (
                            product?.countInStock
                          ) : (
                            <span className="text-rose-600">Out of stock</span>
                          )}
                        </h1>
                        <h1 className="font-bold">{product?.createdAt.substring(0, 10)}</h1>
                        <h1 className="font-bold">{product?.updatedAt.substring(0, 10)}</h1>
                        <h1 className="font-bold">{product?.description}</h1>
                      </div>
                    ) : (
                      <div className="flex flex-col lg:flex-row items-center gap-5">
                        <div className="flex flex-col gap-7">
                          <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder={product?.name}
                            className=" w-[150px] lg:w-full px-2  bg-gray-100/50 border shadow outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                          />
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className=" border  px-2  bg-zinc-100/50 cursor-pointer shadow-md w-[150px] lg:w-full focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] outline-0 focus:border-[#4A9DEC] focus:border">
                            <option value="" disabled={true}>
                              Choose category
                            </option>
                            {categories?.map((cat) => (
                              <option value={cat}>{cat}</option>
                            ))}
                          </select>
                          <input
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder={`${product?.price.toFixed(3)} KD`}
                            className=" w-[150px] lg:w-full px-2 bg-gray-100/50 border shadow outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                          />
                          <input
                            value={newCountInStock}
                            onChange={(e) => setNewCountInStock(e.target.value)}
                            placeholder={product?.countInStock}
                            className=" w-[150px] lg:w-full px-2 bg-gray-100/50 border shadow outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                          />
                          <h1 className="font-bold">{product?.createdAt.substring(0, 10)}</h1>
                          <h1 className="font-bold">{product?.updatedAt.substring(0, 10)}</h1>
                          <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder={product?.description}
                            className=" w-[150px] lg:w-full px-2 bg-gray-100/50 border shadow outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
