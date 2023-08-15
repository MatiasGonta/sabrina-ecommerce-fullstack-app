import { Footer, Navbar } from "@/components"

interface DashboardInterface {}

const Dashboard: React.FC<DashboardInterface> = () => {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  )
}

export default Dashboard