import React from "react";

const Pagination = ({
  totalProduct,
  productPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let page = [];

  for (let i = 1; i <= Math.ceil(totalProduct?.length / productPerPage); i++) {
    page.push(i);
  }

  return (
    <div>
      {page?.length > 0 ? (
        page?.map((p) => {
          return (
            <button
              className={
                p === currentPage
                  ? "text-black m-2 px-3 py-1 bg-yellow-500 rounded-md "
                  : "text-white m-2 px-3 py-1 bg-gray-600 rounded-md"
              }
              onClick={() => setCurrentPage(p)}
            >
              {p}
            </button>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Pagination;
