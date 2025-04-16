import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import EmailDetailCard from "../components/Card/EmailDetailCard.jsx";
import EmailCard from "../components/Card/EmailCard.jsx";
import { useADDNavbar } from "../Context/AddNavbarContext.jsx";
import FormInput from "../components/Form/FormInput.jsx";
import { useImap } from "../Context/ImapContext.jsx";
import api from "../util/api.js";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Layout/Loading.jsx";
import { useMail } from "../Context/MailSend.jsx";
import MailInput from "../components/Form/SendMail.jsx";

const Inbox = () => {
  const { showAdd, showAddI } = useADDNavbar();
  const { showAddIm, showAddImap } = useImap();
  const { showAddMail, toggleAddMail } = useMail();

  const fetchToEmail = async () => {
    const response = (await api()).get("/mail/inbox");

    const data = await response.data;

    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryFn: fetchToEmail,
    queryKey: ["emails"],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  if (isLoading) return <Loading />;

  console.log(error);
  return (
    <>
      <Layout>
        {showAddMail && <MailInput close={toggleAddMail} />}
        {showAdd && (
          <FormInput
            close={showAddI}
            fields="Emails"
            textOne="Host"
            textTwo="Port"
            textThree="Auth user"
            textFour="Password"
            textFive={"From"}
          />
        )}

        {showAddImap && (
          <>
            <FormInput
              close={showAddIm}
              fields="Imap"
              textOne="Hosts"
              textTwo="Port"
              textThree="Auth user"
              textFour="Password"
            />
          </>
        )}
        <div className="p-10 w-screen min-h-screen">
          <div className="w-full h-screen flex ">
            <div className="suç ortagım paket sorguda dedim kekeme w-2/3 rounded-xl border p-5  border-[#27272a] rounded-tr-none rounded-br-none -ml-16 -mt-2 min-h-screen overflow-y-auto">
              <div className="">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-10 border border-[#27272a] bg-transparent rounded-md p-2"
                />
              </div>
              <div className="mt-5">
                <EmailCard data={data} />
              </div>
            </div>
            <div className="w-full min-h-screen border border-[#27272a] rounded-tl-none  -mt-2 rounded-bl-none rounded-xl p-5">
              <EmailDetailCard data={[]} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Inbox;
