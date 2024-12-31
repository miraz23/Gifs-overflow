import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import emoji from "../../assets/Animations/Animation - 1734769346473.json";
import alien from "../../assets/Animations/Animation - 1734770717203.json";
import owl from "../../assets/Animations/owl_coding.json";
import copyPaste from "../../assets/Animations/copy_paste.json";

function Banner() {
  const slides = [
    {
      id: 1,
      animationData: emoji,
      heading: "Jokes Overflowed... Again!",
      subheading: "Brace yourself, the jokes are coming... 🤓🍩",
    },
    {
      id: 2,
      animationData: alien,
      heading: "Code So Good, It's Alien!",
      subheading: "Even extraterrestrials are jealous of my syntax. 👽🚀💻",
    },
    {
      id: 3,
      animationData: owl,
      heading: "Owls Don't Sleep, They Code!",
      subheading: "Just like that one function you wrote that NEVER works... 🦉🤖",
    },
    {
      id: 4,
      animationData: copyPaste,
      heading: "Ctrl + C, Ctrl + V... My Code is That Good!",
      subheading: "I write it once, the universe copies it. 📋✨",
    },
  ];

  const [idx, setIdx] = useState(0);

  const goToSlide = (id) => {
    const slideIndex = slides.findIndex((slide) => slide.id === id);
    setIdx(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prevIdx) => (prevIdx + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="banner px-8 flex flex-col gap-6 md:flex-row justify-between items-center ">
        <div className="banner-txt ">
          <h2 className="font-bold text-[3rem] md:text-[4rem]">{slides[idx].heading}</h2>
          <h2 className="text-[1.5rem]">{slides[idx].subheading}</h2>
        </div>
        <div className="banner-animation">
          <Lottie
            animationData={slides[idx].animationData}
            loop={true}
            className="max-w-[30rem] h-auto"
          />
        </div>
      </div>
      <div className="flex justify-center gap-2 my-6">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(slide.id)}
            className={`w-3 h-3 rounded-full ${
              slide.id === slides[idx].id ? "bg-orange-500" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </>
  );
}

export default Banner;
