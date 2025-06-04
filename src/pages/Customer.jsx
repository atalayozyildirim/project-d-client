import Layout from "../components/Layout/Layout";
import { CardTable } from "../components/Card/CardTable";
import { useFormContext } from "../Context/FormContext";
import { useADDNavbar } from "../Context/AddNavbarContext";
import FormInput from "../components/Form/FormInput";
import { useQuery } from "@tanstack/react-query";
import api from "../util/api";
import Loading from "../components/Layout/Loading";
export const Customer = () => {
  const { dataForm } = useFormContext();
  const { showAdd, showAddI } = useADDNavbar();

  console.log("dataForm", dataForm);
  const fetchCustomer = async () => {
    const res = await (await api()).get("/customer/all");
    if (res.status === 200) {
      return res.data;
    }
    throw new Error("Error fetching customers");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomer,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <Layout>
        {showAdd && (
          <FormInput
            fields="Customers"
            textOne="name"
            textTwo="email"
            textThree="company"
            textFour="phone"
            textFive="address"
            close={() => showAddI()}
          />
        )}
        <div className="min-h-screen  w-screen p-10">
          <h1 className="text-2xl font-bold hover:underline">Customers</h1>
          {data && (
            <CardTable
              thead_one="name"
              thead_two="email"
              thead_three="company"
              thead_four="phone"
              thead_five={"address"}
              data={data.users.map((user) => ({
                tbody_one: user.name,
                tbody_two: user.email,
                tbody_three: user.company,
                tbody_four: user.phone,
                tbody_five: user.address,
              }))}
            />
          )}
        </div>
      </Layout>
    </>
  );
};
