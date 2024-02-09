import { Navbar, Sidebar } from "@/components";
import { Footer } from '@/components/ui';
import { Helmet } from "react-helmet-async";
import { BarChart, CreateUserModal, Header, UserTable } from "./components";
import { Typography } from "@mui/material";
import '@/styles/pages/Usersboard/Usersboard.scss';

interface UsersboardInterface { }

const Usersboard: React.FC<UsersboardInterface> = () => {
  return (
    <>
      <Helmet>
        <title>Panel de Usuarios - SABRINA</title>
      </Helmet>

      <Navbar />

      <main className="main--admin">
        <Sidebar />

        <section className="usersboard__users">
          <div className="usersboard__users__header">
            <Typography fontSize={24} mt="10px" mb="25px" fontWeight="bold" component="h2" noWrap={false}>
              Usuarios
            </Typography>
            <CreateUserModal />
          </div>

          <article className="usersboard__users__cards">
            <Header />
          </article>

          <article className="usersboard__users__statistics">
            <Typography fontSize={20} fontWeight="bold" component="h3" noWrap={false}>
              Nuevos usuarios en el último mes
            </Typography>
            <div className="usersboard__users__statistics__bar-chart">
              <BarChart />
            </div>
          </article>

        </section>

        <section className="usersboard__control-panel">
          <article>
            <Typography fontSize={20} fontWeight="bold" component="h3" noWrap={false}>
              Panel de usuarios
            </Typography>
            <UserTable itemsPerPage={10} />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Usersboard