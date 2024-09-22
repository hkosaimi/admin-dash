import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useUploadProductImageMutation,
  useCreateProductMutation,
  useGetCategoriesQuery,
} from "../../redux/queries/productApi";
import Layout from "../../Layout";

function ProductCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState("");

  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories, refetch } = useGetCategoriesQuery();

  const hnadleCreateProduct = async (e) => {
    e.preventDefault();
    if (price <= 0) {
      toast.error("Price must be a positive number");
      return;
    }
    if (!name || !price || !image || !category || !countInStock || !description) {
      toast.error("All fields are required");
      return;
    }

    const newProduct = {
      name,
      price,
      image,
      brand,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      countInStock,
      description,
    };

    const result = await createProduct(newProduct);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product created");
      navigate("/admin/productlist");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      console.log(res);
    } catch (error) {
      toast.error(error?.data.message || error?.error);
    }
  };
  return (
    <Layout>
      <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Add New Product</h1>
            <form onSubmit={hnadleCreateProduct} className="space-y-6">
              <div>
                <input
                  type="file"
                  placeholder={image}
                  onChange={uploadFileHandler}
                  className="p-2 cursor-pointer  w-full shadow border rounded-md h-full bg-gray-100 bg-opacity-50 py-3 px-4  outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 w-full  shadow border rounded-md h-full bg-gray-100 bg-opacity-50 py-3 px-4  outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                />
              </div>

              <div>
                <textarea
                  placeholder="Product Description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-2 w-full shadow border rounded-md h-full bg-gray-100 bg-opacity-50 py-3 px-4  outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                />
              </div>

              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="p-2 w-full shadow border rounded-md h-full bg-gray-100 bg-opacity-50 py-3 px-4  outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                    placeholder="Product Price"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="p-2 w-full shadow border rounded-md h-full bg-gray-100 bg-opacity-50 py-3 px-4  outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                  placeholder="Product Brand (optional)"
                />
              </div>
              <div>
                <select
                  value={category}
                  placeholder="Product Category"
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-2 w-full shadow border rounded-md h-full bg-gray-100 bg-opacity-50 py-3 px-4  outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border">
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories?.map((category) => (
                    <option value={category?.name}>{category?.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Product Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="p-2 w-full shadow border rounded-md h-full bg-gray-100 bg-opacity-50 py-3 px-4  outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
                />
              </div>

              <div className="flex gap-2 flex-row-reverse">
                <button
                  type="submit"
                  className="bg-gradient-to-t hover:from-rose-500 hover:to-rose-400/80 from-rose-500 to-rose-400 text-white font-bold flex items-center gap-2 text-sm lg:text-md shadow-md  px-3 py-2 rounded-lg ">
                  Add Product
                </button>
                <Link
                  to="/admin/productlist"
                  className="bg-gradient-to-t text-sm lg:text-md gap-2 items-center flex justify-center from-zinc-200 to-zinc-50 p-3 rounded-lg text-black font-bold  shadow-md ">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductCreate;
