import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { formatDistanceToNow } from "date-fns";
import { FaShareAlt } from "react-icons/fa";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (Gifs) => {
    const updatedFavorites = favorites.filter((item) => item.Gifs !== Gifs);
    setFavorites(updatedFavorites);

    localStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
  };

  const shareFavorite = (favorite) => {
    const { Gifs, title } = favorite;

    if (navigator.share) {
      navigator
        .share({
          title: `Check out this Gif: ${title}`,
          text: `I found this awesome Gif: "${title}"!`,
          url: Gifs,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-500 mb-8">
          Your <span className="text-orange-400">Favorite</span> Gifs
        </h2>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">
            No favorite Gifs added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 p-10 flex flex-col justify-between"
              >
                <img
                  src={item.Gifs}
                  alt={item.title}
                  className="w-full h-64 object-cover object-center rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 my-4">
                  Added{" "}
                  {formatDistanceToNow(new Date(item.timeAdded), {
                    addSuffix: true,
                  })}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => removeFavorite(item.Gifs)}
                    className="btn btn-danger bg-red-500 text-white hover:bg-red-600 transition-all duration-300 ease-in-out"
                  >
                    Remove from Favorites
                  </button>
                  <button
                    onClick={() => shareFavorite(item)}
                    className="btn bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center gap-2"
                  >
                    <FaShareAlt /> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;
