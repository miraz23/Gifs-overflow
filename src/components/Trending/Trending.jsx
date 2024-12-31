import React, { useEffect, useState } from "react";

function Trending() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  useEffect(() => {
    fetchTrendingGifs();

    const interval = setInterval(() => {
      fetchTrendingGifs();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchTrendingGifs = async () => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=PWfwI04ZroXkgxt9JhNJPfXwamBxc6D9&limit=6`
      );
      const data = await res.json();
      setTrendingGifs(data.data);
    } catch (error) {
      console.error("Error fetching trending GIFs:", error);
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
      <div className="gifs-card-container my-10 mx-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trendingGifs.map((gif) => (
          <div
            className="card w-[350px] mx-auto my-2 border-4 p-4 transition-all duration-400 hover:scale-105 hover:shadow-lg cursor-pointer h-[400px]"
            key={gif.id}
            onClick={() => handleGifClick(gif)}
          >
            <figure className="overflow-hidden rounded-t-lg h-[250px] w-full">
              <img
                src={gif.images.original.webp}
                alt={gif.title}
                className="w-full h-full object-cover transform transition-all duration-300 ease-in-out hover:scale-105"
              />
            </figure>
        
            <div className="card-body p-6 flex flex-col justify-between">
              <h2 className="card-title text-xl font-semibold text-gray-800">
                {gif.title}
              </h2>
            </div>
          </div>
        ))}
      </div>


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
    </>
  );
}

export default Trending;
