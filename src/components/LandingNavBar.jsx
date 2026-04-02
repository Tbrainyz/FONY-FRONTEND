import React from 'react'
import logo from "../assets/logo.svg"

const LandingNavBar = () => {
  return (
    <div className="w-full flex justify-between py-7.5 px-25 ">
      <img src={logo} alt="" />
      <div className="flex gap-10 ">
        <p>Home</p>
        <p>How to Get Started</p>
        <p>Testimonial</p>
      </div>
    </div>
  )
}

export default LandingNavBar
