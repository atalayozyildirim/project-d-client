import Layout from "../components/Layout/Layout.jsx";
import { CardTable } from "../components/Card/CardTable.jsx";
import { useQuery } from "@tanstack/react-query";
import api from "../util/api.js";
import FormInput from "../components/Form/FormInput.jsx";
import { useADDNavbar } from "../Context/AddNavbarContext.jsx";
import Loading from "../components/Layout/Loading.jsx";

export const Product = () => {
  const { showAdd, showAddI } = useADDNavbar();

  const fetchProducts = async () => {
    const res = await (await api()).get("/product/list");
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Error fetching Products");
  };
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  return (
    <Layout>
      {showAdd && (
        <FormInput
          fields="Products"
          textOne="name"
          textTwo="price"
          textThree="stock"
          textFive="description"
          close={() => showAddI()}
        />
      )}
      <div className="min-h-screen  w-screen p-10">
        <h1 className="text-2xl font-bold hover:underline">Products</h1>

        <CardTable
          thead_one="name"
          thead_two="price"
          thead_three="category"
          thead_four="stock"
          thead_five="description"
          data={data && data.data}
        />
      </div>
    </Layout>
  );
};
