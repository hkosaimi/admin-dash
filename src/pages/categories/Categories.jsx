import Layout from "../../Layout";
import { Link } from "react-router-dom";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../redux/queries/productApi";
import { useState } from "react";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import { Trash2, Boxes } from "lucide-react";
import Badge from "../../components/Badge";

function Categories() {
  const [category, setCategory] = useState("");

  const [createCategory, { error }] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { data: categories, refetch } = useGetCategoriesQuery();

  const handleCreateCategory = async () => {
    if (!category) {
      return toast.error("Enter valid Category name");
    }
    const res = await createCategory({
      name: category[0].toUpperCase() + category.slice(1).toLowerCase(),
    });
    refetch();
    setCategory("");
    console.log(res);
    toast.success("Category created successfully");
  };
  const handleDeleteCategory = async (category) => {
    const res = await deleteCategory({ name: category }).unwrap();
    console.log(res);
    refetch();
  };

  return (
    <Layout>
      <div className="px-4 flex flex-row-reverse justify-between py-3 mt-[50px] ml-0 lg:ml-[50px]  ">
        <div className="">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <h1 className="text-[20px] font-bold flex items-center gap-5">
              Categories:{" "}
              <Badge icon={false}>
                <Boxes strokeWidth={1} />
                {categories?.length > 0 ? categories?.length : "0"} categories
              </Badge>
            </h1>
            <div className="flex flex-col gap-3 lg:gap-5 lg:flex-row-reverse">
              <button
                onClick={handleCreateCategory}
                className="bg-gradient-to-t  hover:from-rose-500 hover:to-rose-400/80 from-rose-500 to-rose-400 text-white font-bold flex items-center gap-2 text-sm lg:text-md shadow-md  px-3 py-2 rounded-lg ">
                Add new category
              </button>
              <input
                type="text"
                placeholder="Enter category name"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2  shadow border rounded-md h-full bg-white bg-opacity-50 py-3 px-4  outline-0 focus:shadow-[0_0_0_4px_rgba(74,157,236,0.2)] focus:border-[#4A9DEC] focus:border"
              />
            </div>
          </div>
          <div className="w-full bg-gray-900 bg-opacity-20 h-[1px] mb-5 mt-5"></div>
          {categories?.length === 0 ? (
            <div className="w-[300px] lg:w-[1000px]">
              <Message dismiss={false}>You have no categories yet</Message>
            </div>
          ) : (
            <>
              <div className="lg:flex hidden justify-around gap-4 px-3  w-[1000px] mb-5 lg:mt-[50px] text-gray-500 [&>p]:w-[200px] [&>p]:overflow-hidden">
                <p>Name:</p>
                <p></p>
              </div>

              {categories?.map((category) => (
                <div className="w-[300px] lg:w-[1000px] mb-5">
                  <div className="flex w-full flex-col lg:flex-row justify-around gap-4 bg-white px-3 py-3 rounded-lg shadow [&>p]:w-[200px] [&>p]:overflow-hidden hover:bg-gray-100">
                    <p> {category?.name}</p>
                    <p></p>
                    <button onClick={() => handleDeleteCategory(category.name)}>
                      <Trash2 strokeWidth={1} />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
