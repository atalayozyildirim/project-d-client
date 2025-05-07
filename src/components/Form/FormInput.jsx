import React from "react";
import api from "../../util/api";
import { useFormContext } from "../../Context/FormContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FormInput({
  close,
  textOne,
  textThree,
  textTwo,
  textFour,
  textFive,
  textSix,
  fields,
}) {
  const [clicked, setClicked] = React.useState(false);
  const [selectBoxData, setSelectBoxData] = React.useState([]);
  const { onSubmitData } = useFormContext();
  const pathname = window.location.pathname;

  const [data, setData] = React.useState({
    input_one: "",
    input_two: "",
    input_three: "",
    input_four: "",
    input_five: "",
    input_six: "",
  });

  const handleSubmit = () => {
    let submitData;
    /* if (
      data.input_one === "" ||
      data.input_two === "" ||
      data.input_three === "" ||
      data.input_four === "" ||
      data.input_five === ""
    )
      return null; */
    switch (fields) {
      case "Employers":
        submitData = {
          name: data.input_one,
          surname: data.input_two,
          email: data.input_three,
          phone: data.input_four,
          salary: data.input_five,
          field: "Employers",
        };
        break;
      case "Customers":
        submitData = {
          name: data.input_one,
          email: data.input_two,
          company: data.input_three,
          phone: data.input_four,
          address: data.input_five,
          field: "Customers",
        };
        break;
      case "Tasks":
        submitData = {
          title: data.input_one,
          description: data.input_two,
          assignedTo: data.input_three,
          priority: data.input_four,
          status: "pending",
          dueDate: data.input_five,
          field: "Tasks",
        };
        break;
      case "Emails":
        submitData = {
          host: data.input_one,
          port: parseInt(data.input_two, 10),
          user: data.input_three,
          password: data.input_four,
          from: data.input_five,
          tls: true,
          field: "Emails",
        };
        break;
      case "Imap":
        submitData = {
          host: data.input_one,
          port: parseInt(data.input_two, 10),
          user: data.input_three,
          password: data.input_four,
          tls: true,
          field: "Imap",
        };
        break;
      case "SendEmail":
        submitData = {
          subject: data.input_one,
          body: data.input_two,
          field: "SendEmail",
        };
        break;
      default:
        console.error("Unknown field type");
        return;
    }

    onSubmitData(submitData, fields);
    close();
    setClicked(!clicked);
  };
  const SelectBoxFetchData = async () => {
    const res = await (await api()).get("/task/user/list");
    setSelectBoxData(res.data);
  };
  const handleSelectChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedId = selectedOption.dataset.id;

    setData({ ...data, input_three: selectedId || "" });
  };

  const handlePriortiyChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedId = selectedOption.value;
    setData({ ...data, input_four: selectedId || "" });
  };
  const handleDateChange = (date) => {
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    console.log(date);
    setData({ ...data, input_five: formattedDate });
  };
  React.useEffect(() => {
    if (fields === "Tasks") {
      SelectBoxFetchData();
    }
  }, []);
  return (
    <div className="flex fixed top-0 left-0 w-full h-full z-49 justify-center items-center bg-black bg-opacity-50">
      <div className="bg-[#171c1e] p-8 rounded-lg z-50 mt-4 relative shadow-lg w-full max-w-md">
        <div onClick={close} className="w-8 h-8 mb-4 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="size-6"
            onClick={close}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="w-full max-w-xs mx-auto">
          <label
            htmlFor="input1"
            className="block text-sm font-medium text-gray-700"
          >
            {textOne}
          </label>
          <input
            type="text"
            id="input1"
            name="input1"
            placeholder={textOne}
            onChange={(e) => setData({ ...data, input_one: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-4">
          <label
            htmlFor="input2"
            className="block text-sm font-medium text-gray-700"
          >
            {textTwo}
          </label>

          <input
            type="text"
            id="input2"
            name="input2"
            onChange={(e) => setData({ ...data, input_two: e.target.value })}
            placeholder={textTwo}
            className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-full max-w-xs mx-auto mt-4">
          <label
            htmlFor="input3"
            className="block text-sm font-medium text-gray-700"
          >
            {textThree}
          </label>
          {pathname === "/tasks" ? (
            selectBoxData && (
              <select
                id="input3"
                name="input3"
                onChange={handleSelectChange}
                className="mt-1 block w-full px-3 py-2 p-4 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="" disabled selected>
                  Atanacak Kişiyi Seç
                </option>
                {selectBoxData.map((item, index) => (
                  <option key={index} value={item.name} data-id={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )
          ) : (
            <input
              type="text"
              id="input3"
              name="input3"
              onChange={(e) =>
                setData({ ...data, input_three: e.target.value })
              }
              placeholder={textThree}
              className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
        </div>
        {textFour && (
          <div className="w-full max-w-xs mx-auto mt-4">
            <label
              htmlFor="input3"
              className="block text-sm font-medium text-gray-700"
            >
              {textFour}
            </label>
            {pathname === "/tasks" ? (
              selectBoxData && (
                <select
                  id="input4"
                  name="input4"
                  onChange={handlePriortiyChange}
                  className="mt-1 block w-full px-3 py-2 p-5  border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled selected>
                    priority
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              )
            ) : (
              <input
                type="text"
                id="input4"
                name="input4"
                onChange={(e) =>
                  setData({ ...data, input_four: e.target.value })
                }
                placeholder={textFour}
                className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          </div>
        )}
        {textFive && (
          <div className="w-full max-w-xs mx-auto mt-4">
            <label
              htmlFor="input3"
              className="block text-sm font-medium text-gray-700"
            >
              {textFive}
            </label>

            {pathname === "/tasks" ? (
              <DatePicker
                selected={data.input_five}
                onChange={(e) => handleDateChange(e)}
                dateFormat="yyyy-MM-dd" // Tarih formatı
                placeholderText="Tarih seçin"
                onFocus={(e) => e.target.blur()}
                className="mt-1  min-w-[43vh] block  px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
              <input
                type="text"
                id="input5"
                name="input5"
                onChange={(e) =>
                  setData({ ...data, input_five: e.target.value })
                }
                placeholder={textFive}
                className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          </div>
        )}

        {textSix && (
          <div className="w-full max-w-xs mx-auto mt-4">
            <label
              htmlFor="input3"
              className="block text-sm font-medium text-gray-700"
            >
              {textSix}
            </label>
            <input
              type="text"
              id="input6"
              name="input6"
              onChange={(e) => setData({ ...data, input_six: e.target.value })}
              placeholder={textSix}
              className="mt-1 block w-full px-3 py-2 border text-white bg-[#141517] border-[#494d55] rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        )}
        <div className="w-full max-w-xs mx-auto mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-500  text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            {...(clicked ? { disabled: true } : {})}
          >
            {clicked ? "Submitted" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
