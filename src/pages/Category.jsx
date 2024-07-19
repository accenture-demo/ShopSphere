import React , {useEffect} from "react";
import CatergoryCard from "../components/cards/CatergoryCard";
import { category } from "../utils/data";

const Category = ({digitalData,currentUser}) => {

  function setDigitalData() {
    // console.log("digital Data called");
    try {
      digitalData.page = {
        pageUrl: window.location.href,
        title: document.title,
      };
      digitalData.product = {};
      if (currentUser) {
        digitalData.user = {
          userDetails: {
            userId: currentUser._id,
          },
          loggedIn: true,
        };
      } else {
        digitalData.user = {
          userDetails: null,
          loggedIn: false,
        };
      }

      // console.log(digitalData);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    setDigitalData();
  },[]);


  return (
    <div className="w-full min-h-[900px]">
      <h1 className="text-center text-2xl font-bold text-green-900 mt-10 ">See All Category</h1>

      <div className="flex flex-wrap gap-10 justify-center">
        {category.map((cat,ind) => (
          <CatergoryCard props={cat} key={ind}/>
        ))}
      </div>
    </div>
  );
};

export default Category;
