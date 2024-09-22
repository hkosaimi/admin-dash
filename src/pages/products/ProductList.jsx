import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { useGetProductsQuery } from "../../redux/queries/productApi";
import Badge from "../../components/Badge";
import { Box, CirclePlus } from "lucide-react";
import { useEffect } from "react";
import Loader from "../../components/Loader";
function ProductList() {
  const { data: products, refetch, isLoading: loadingProducts } = useGetProductsQuery();
  console.log(products);

  useEffect(() => {
    if (products) {
      refetch();
    }
  }, [products]);
  return (
    <Layout>
      {loadingProducts ? (
        <Loader />
      ) : (
        <div className="lg:px-4 flex  justify-between py-3 mt-[50px] ml-0 lg:ml-[50px]  ">
          <div className="">
            <div className="flex justify-between items-center">
              <h1 className=" text-sm lg:text-[20px] font-bold flex gap-5 items-center">
                Products:{" "}
                <Badge icon={false}>
                  <Box />
                  {products?.length > 0 ? products?.length : "0"} products
                </Badge>
              </h1>
              <Link
                to="/admin/productlist/product-create"
                className="bg-gradient-to-t  hover:from-rose-500 hover:to-rose-400/80 from-rose-500 to-rose-400 text-white font-bold flex items-center gap-2 text-sm lg:text-md shadow-md  px-3 py-2 rounded-lg ">
                Add new product <CirclePlus strokeWidth={2} />
              </Link>
            </div>
            <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>

            <div className="w-[300px] flex items-center lg:w-[1000px] mb-2">
              <div className="flex w-full  items-center flex-col lg:flex-row justify-around gap-4  px-3 py-3 [&>p]:w-[200px]  [&>p]:overflow-hidden ">
                <p>Name:</p>
                <p>Category:</p>
                <p>In stock:</p>
                <p>Price:</p>
              </div>
            </div>
            {products?.map((product) => (
              <div key={product?._id} className="w-[300px] flex items-center lg:w-full mb-5">
                <Link
                  to={`/admin/productlist/${product._id}`}
                  className="flex w-full  items-center flex-col transition-all hover:shadow-md duration-300 lg:flex-row justify-around gap-4 bg-white px-3 py-3 rounded-lg shadow [&>p]:w-[200px]  [&>p]:overflow-hidden hover:bg-gray-100">
                  <p className="flex items-center  ">
                    <img className="w-16" src={product.image} alt="thumbnail" loading="lazy" />
                    <span>{product.name}</span>
                  </p>

                  <p>{product.category}</p>
                  <p>
                    {product.countInStock > 0 ? (
                      product.countInStock
                    ) : (
                      <span className="text-rose-500 font-bold">Out of stock</span>
                    )}
                  </p>
                  <p> {product.price.toFixed(3)} KD</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default ProductList;
