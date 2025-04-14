import React, { useState } from "react";
import Heading from "../../components/Header/Heading";
import { portfolio } from "../../util/data/dummydata";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const allCategory = ["all", ...new Set(portfolio.map((item) => item.category))];
const Portfolio = () => {
  const [list, setLists] = useState(portfolio);
  const [category, setCategory] = useState(allCategory);

  const filterItems = (e) => {
    const categoryX = category.filter((item) => item !== e.target.innerText);
    setCategory(categoryX);
    if (category === "all") {
      setLists(portfolio);
      return;
    }
  };
  console.log(list);
  return (
    <>
      <article>
        <div className="container">
          <Heading title="Portfolyo" />
          <div className="catButton">
            {category.map((category, i) => (
              <button
                className="primaryBtn"
                key={i}
                onClick={(e) => filterItems(e)}
                data-aos="zoom-out-down"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};
export default Portfolio;
