import React from "react";
import { home } from "../../util/data/dummydata";

const Hero = () => {
  return (
    <>
      <section className="hero">
        {home.map((val, i) => (
          <div className="heroContent" key={i}>
            <h2>ŞİRKETİMİZ</h2>
            <p data-aos="fade-left">{val.desc}</p>
          </div>
        ))}
      </section>
    </>
  );
};
export default Hero;
