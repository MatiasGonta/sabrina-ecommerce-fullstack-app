import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Navbar, Sidebar } from "@/components";
import { LoadingSpinner, Footer } from '@/components/ui';
import { Card } from '@/components/ui';
import { Helmet } from "react-helmet-async";
import { BarChart, CreateUserModal, UserTable } from "./components";
import { useGetUsersStatistics } from '@/hooks';
import { LoadingSpinnerType } from '@/models';
import '@/styles/pages/Usersboard/Usersboard.scss';

interface UsersboardInterface {}

const Usersboard: React.FC<UsersboardInterface> = () => {
  const { data, isLoading } = useGetUsersStatistics();

  const cards = [
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
    ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX}/>
    : (
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
            {
              cards.map(card => (
                <Card
                  key={card.title}
                  title={card.title}
                  icon={card.icon}
                  iconBackground={card.iconBackground}
                  iconBoxShadow={card.iconBoxShadow}
                >
                  {card.text}
                </Card>
              ))
            }
          </article>

          <article className="usersboard__users__statistics">
            <h3 className="usersboard__users__statistics__title">Nuevos usuarios en el último mes</h3>
            <div className="usersboard__users__statistics__bar-chart">
              <BarChart data={data!.newUsersPerDay} />
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
  )
}

export default Usersboard