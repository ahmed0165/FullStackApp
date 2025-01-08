import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link to="/">Movie App</Link>
        </h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Search
          </Link>
          <Link to="/favorites" className="hover:underline">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
