import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { FaSearch, FaLink } from "react-icons/fa";

function Gifs() {
  const [gifs, setGifs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedGif, setSelectedGif] = useState(null);

  useEffect(() => {
    const storedText = sessionStorage.getItem("Search Gif Text");
    const storedGifs = sessionStorage.getItem("Search Gif Result");
    storedText && setSearchText(storedText);
    storedGifs ? setGifs(JSON.parse(storedGifs)) : console.log("Error!!!!");
  }, []);

  const fetchGifs = () => {
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=PWfwI04ZroXkgxt9JhNJPfXwamBxc6D9&q=${searchText}&limit=12`
    )
      .then((res) => res.json())
      .then((gifs) => {
        setGifs(gifs.data);
        addToSessionStorage(searchText, gifs.data);
        setSearchText("");
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchGifs();
    }
  };

  const addToSessionStorage = (text, gifResult) => {
    sessionStorage.setItem("Search Gif Text", text);
    sessionStorage.setItem("Search Gif Result", JSON.stringify(gifResult));
  };

  const addToFavorites = (gif) => {
    const favorites = JSON.parse(localStorage.getItem("Favorites")) || [];
    const newFavorite = {
      Gifs: gif.images.original.webp,
      title: gif.title,
      type: gif.type,
      username: gif.username || "Anonymous",
      timeAdded: new Date(),
    };

    localStorage.setItem("Favorites", JSON.stringify([...favorites, newFavorite]));

    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 2000);
  };

  const shareGif = (gif) => {
    if (navigator.share) {
      navigator
        .share({
          title: gif.title || "GIF from Giphy",
          text: "Check out this awesome GIF!",
          url: gif.images.original.url,
        })
        .then(() => console.log("GIF shared successfully!"))
        .catch((error) => console.error("Error sharing GIF:", error));
    } else {
      alert("Sharing is not supported on your device!");
    }
  };

  const handleGifClick = (gif) => {
    setSelectedGif(gif);
  };

  const closeGifView = () => {
    setSelectedGif(null);
  };

  return (
    <>
      <Navbar />
      <div className="Gifs-container my-8 mx-10">
        <h2 className="text-center text-gray-500 my-8 text-4xl font-bold">
          Search <span className="text-orange-400">Gifs</span>
        </h2>
        <div className="search-container flex flex-col items-center">
          <label className="input input-bordered flex items-center gap-2 md:w-96">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={fetchGifs}>
              <FaSearch />
            </button>
          </label>
        </div>

        <div className="gifs-card-container my-10 mx-6 grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gifs.map((gif) => (
            <div
              className="card bg-base-100 shadow-xl rounded-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out"
              key={gif.id}
            >
              <figure
                className="overflow-hidden rounded-t-lg h-[320px] w-full"
                onClick={() => handleGifClick(gif)}
              >
                <img
                  src={gif.images.original.webp}
                  alt="Gif"
                  className="w-full h-full object-cover transform transition-all duration-300 ease-in-out hover:scale-105"
                />
              </figure>

              <div className="card-body p-6">
                <h2 className="card-title text-xl font-semibold text-gray-800 mb-4">
                  {gif.title}
                  <div className="badge bg-orange-400 text-white p-3 ml-2 text-sm">
                    Trending
                  </div>
                </h2>
                <div className="card-actions flex justify-between items-center">
                  <div className="badge badge-outline text-orange-400 text-md p-4 rounded-full border-2 hover:bg-orange-400 hover:text-white transition-all">
                    {gif.type}
                  </div>
                  <button
                    className="badge badge-outline text-orange-400 text-md p-4 rounded-full border-2 hover:bg-orange-400 hover:text-white transition-all"
                    onClick={() => addToFavorites(gif)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      />
                    </svg>
                  </button>
                  <button
                    className="badge badge-outline text-orange-400 text-md p-4 rounded-full border-2 hover:bg-orange-400 hover:text-white transition-all flex items-center gap-1"
                    onClick={() => shareGif(gif)}
                  >
                    <FaLink />
                  </button>
                  <div className="badge badge-outline text-orange-400 text-md p-4 rounded-full border-2 hover:bg-orange-400 hover:text-white transition-all">
                    {gif.username || "Anonymous"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {alertVisible && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-3 px-6 rounded-lg shadow-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-circle"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zM7.293 9.707a1 1 0 0 1 1.414 0l3-3a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414l.586.586z"
              />
            </svg>
            <span>Added to Favorites!</span>
          </div>
        )}

        {selectedGif && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] md:w-[70%] lg:w-[40%] relative">
              <button
                className="absolute top-4 right-4 text-gray-800 text-3xl font-bold hover:text-red-500 transition-all"
                onClick={closeGifView}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedGif.title || "Trending GIF"}
              </h2>
              <img
                src={selectedGif.images.original.url}
                alt={selectedGif.title}
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        )}
        
      </div>
    </>
  );
}

export default Gifs;
