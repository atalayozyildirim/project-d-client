import React from "react";
import { services } from "../../util/data/dummydata";
import Heading from "../Header/Heading";

const Services = () => {
  return (
    <>
      <section className="services">
        <div className="container">
          <Heading title="Services" />
          <div className="content grid3">
            {services.map((item) => (
              <div className="box" data-aos="flip-left" key={item}>
                <i>{item.icon}</i>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
