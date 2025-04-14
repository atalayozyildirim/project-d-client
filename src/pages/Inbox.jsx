import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import EmailDetailCard from "../components/Card/EmailDetailCard.jsx";
import EmailCard from "../components/Card/EmailCard.jsx";
import { useADDNavbar } from "../Context/AddNavbarContext.jsx";
import FormInput from "../components/Form/FormInput.jsx";
import { useImap } from "../Context/ImapContext.jsx";

const Inbox = () => {
  const { showAdd, showAddI } = useADDNavbar();
  const { showAddIm, showAddImap } = useImap();
  return (
    <>
      <Layout>
        {showAdd && (
          <FormInput
            close={showAddI}
            fields="Emails"
            textOne="Host"
            textTwo="Port"
            textThree="Auth user"
            textFour="Password"
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
                <EmailCard data={[]} />
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
