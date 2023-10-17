import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddIcon from '@mui/icons-material/Add';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Card, Footer, LoadingSpinner, Navbar, Sidebar } from "@/components";
import { Helmet } from "react-helmet-async";
import { BarChart, CreateUserModal, UserTable } from "./components";
import { CardInterface } from "@/components/Card/Card";
import { useGetUsersStatistics } from '@/hooks';
import { useState } from 'react';
import '@/styles/pages/Usersboard/Usersboard.scss';

interface UsersboardInterface {}

const Usersboard: React.FC<UsersboardInterface> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, isLoading } = useGetUsersStatistics();

  const cards: CardInterface[] = [
    {
      title: 'Usuarios totales',
      text: `${data?.totalUsers}`,
      icon: <PeopleAltOutlinedIcon sx={{ fontSize: 25 }} />,
      iconBackground: "#2c3e50",
      iconBoxShadow: "#d5d8dc"
    },
    {
      title: 'Nuevos usuarios en el mes',
      text: `${data?.newMonthUsers}`,
      icon: <GroupAddOutlinedIcon sx={{ fontSize: 25 }} />,
      iconBackground: "#5b2c6f",
      iconBoxShadow: "#e8daef"
    },
    {
      title: 'Nuevos usuarios hoy',
      text: `${data?.newTodayUsers}`,
      icon: <PersonAddAltOutlinedIcon sx={{ fontSize: 25 }} />,
      iconBackground: "#641e16",
      iconBoxShadow: "#f2d7d5"
    }
  ];

  return (
    isLoading
    ? <LoadingSpinner type='noflex'/>
    : (
    <>
      <Helmet>
        <title>Panel de Usuarios - SABRINA</title>
      </Helmet>
      {openModal && <CreateUserModal modalStatusFunc={setOpenModal} />}
      <Navbar />
      <main className="usersboard admin">
        <Sidebar page="usersboard" />
        <article className="usersboard__users">
          <div>
            <h2>Usuarios</h2>
            <button onClick={() => setOpenModal(true)}>
              <AddIcon sx={{ fontSize: 25 }} />
              <span>Crear usuario</span>
            </button>
          </div>
          <section className="usersboard__users-card-info">
            {
              cards.map(card => <Card
                                  key={card.title}
                                  title={card.title}
                                  text={card.text}
                                  icon={card.icon}
                                  iconBackground={card.iconBackground}
                                  iconBoxShadow={card.iconBoxShadow}
                                />)
            }
          </section>
          <section className="usersboard__users-statistics">
            <h3>Nuevos usuarios en el último mes</h3>
            <div className="users-bar-chart-container">
              <BarChart data={data!.newUsersPerDay} />
            </div>
          </section>
        </article>
        <article className="usersboard__control-panel">
          <section>
            <h3>Panel de usuarios</h3>
            <UserTable itemsPerPage={10} />
          </section>
        </article>
      </main>
      <Footer />
    </>
    )
  )
}

export default Usersboard