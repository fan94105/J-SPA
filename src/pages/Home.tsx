import Banner from "../ui/Banner"
import ServicesOverview from "../features/service/ServicesOverview"
import Location from "../ui/Location"
import Footer from "../ui/Footer"

function Home() {
  return (
    <>
      <Banner />

      <ServicesOverview />

      <Location />

      <Footer />
    </>
  )
}

export default Home
