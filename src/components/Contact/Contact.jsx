import React from "react";
import Heading from "../Header/Heading";

const Contact = () => {
  return (
    <>
      <div className="contact" style={{ marginTop: "40px" }}>
        <div className="container">
          <Heading title="Bize Ulaşın" />
          <div className="content flexsb">
            <div className="right">
              <form>
                <div className="flex">
                  <input type="text" placeholder="Name" data-aos="flip-left" />
                  <input
                    type="email"
                    placeholder="Email"
                    data-aos="flip-right"
                  />
                </div>
                <input type="email" placeholder="Subject" data-aos="flip-up" />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  data-aos="flip-down"
                ></textarea>
                <button data-aos="">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
