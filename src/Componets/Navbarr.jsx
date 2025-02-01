import React from "react";

function Ishanbar() {
  return (
    <nav className="w-full   flex justify-between bg-slate-800 text-white py-2 px-4">
      <div className="font-bold p-2">
        <span>ITask</span>
      </div>
      <ul className="flex gap-8 p-2">
        <li className="hover:font-bold cursor-pointer transition-all duration-75">
          Home
        </li>
        <li className="hover:font-bold cursor-pointer transition-all duration-150">
          Today's task
        </li>
      </ul>
    </nav>
  );
}

export default Ishanbar;
