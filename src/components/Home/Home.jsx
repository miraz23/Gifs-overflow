import React from 'react'
import Navbar from '../Navbar/Navbar'
import Banner from '../Banner/Banner'
import Trending from '../Trending/Trending'
import Footer from '../Footer/Footer'


function Home() {
  return (
    <>
      <Navbar/>
      <Banner/>
      <Trending/>
      <Footer/>
    </>
  )
}

export default Home