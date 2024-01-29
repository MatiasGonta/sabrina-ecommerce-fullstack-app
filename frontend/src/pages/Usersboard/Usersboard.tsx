import { Navbar, Sidebar } from "@/components";
import { Footer } from '@/components/ui';
import { Helmet } from "react-helmet-async";
import { BarChart, CreateUserModal, Header, UserTable } from "./components";
import '@/styles/pages/Usersboard/Usersboard.scss';

interface UsersboardInterface {}

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
            <h2 className="usersboard__users__header__title">Usuarios</h2>
            <CreateUserModal />
          </div>

          <article className="usersboard__users__cards">
            <Header />
          </article>

          <article className="usersboard__users__statistics">
            <h3 className="usersboard__users__statistics__title">Nuevos usuarios en el último mes</h3>
            <div className="usersboard__users__statistics__bar-chart">
              <BarChart />
            </div>
          </article>

        </section>

        <section className="usersboard__control-panel">
          <article>
            <h3 className="usersboard__control-panel__title">Panel de usuarios</h3>
            <UserTable itemsPerPage={10} />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Usersboard