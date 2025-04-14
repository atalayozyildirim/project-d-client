import React from "react";
import { blog } from "../../util/data/dummydata";
import Heading from "../Header/Heading";

const Blog = () => {
  return (
    <>
      <section className="blog">
        <div className="container">
          <Heading title="Çalışmalarımız" />
          <div className="content grid2">
            {blog.map((item) => (
              <div className="box" data-aos="flip-left">
                <div className="img" data-aos="fade-up">
                  <img src={item.cover} alt="" data-aos="fade-down" />
                </div>
                <div className="text">
                  <h3 data-aos="fade-right">{item.title}</h3>
                  <label data-aos="fade-left">By {item.author}</label>
                  <p data-aos="fade-up-right">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default Blog;
