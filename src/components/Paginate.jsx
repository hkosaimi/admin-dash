import { Link } from "react-router-dom";
import { useState } from "react";

function Paginate({ pages, page, isAdmin = false, keyword = "" }) {
  return (
    pages > 1 && (
      <div className="flex gap-5">
        {[...Array(pages).keys()].map((x, index) => (
          <div key={index} className="bg-red-500 p-2 text-white font-bold">
            <Link to={`/admin/userlist/page/${x + 1}`}>{x + 1}</Link>
          </div>
        ))}
      </div>
    )
  );
}

export default Paginate;
