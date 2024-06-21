import React, { useEffect } from "react"

import Banner from "../ui/Banner"
import ServicesOverview from "../features/service/ServicesOverview"
import Location from "../ui/Location"
import { useLiff } from "react-liff"

function Home() {
  return (
    <>
      <Banner />

      <ServicesOverview />

      <Location />
    </>
  )
}

export default Home
