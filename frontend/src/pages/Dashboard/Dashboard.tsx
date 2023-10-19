import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Footer, Navbar, Sidebar, OrderTable, LoadingSpinner, Card } from "@/components";
import { CardInterface } from '@/components/Card/Card';
import { FilterItem, Order, TypeWithKey } from '@/models';
import { Link } from 'react-router-dom';
import { SalesCategoriesDoughnutChart, SalesLineChart } from './components';
import { useGetAllOrdersHistoryQuery, useGetFilterCountsQuery, useGetSales } from '@/hooks';
import { Helmet } from 'react-helmet-async';
import '@/styles/pages/Dashboard/Dashboard.scss';

interface DashboardInterface {}

const Dashboard: React.FC<DashboardInterface> = () => {
  const { data: allOrders, isLoading: isLoadingOrders } = useGetAllOrdersHistoryQuery(1);
  const { categories, isLoading: filterCountsLoading } = useGetFilterCountsQuery();
  const { data, isLoading: isLoadingSales } = useGetSales();
  console.log(data)

  const totalSales: number = data?.sales.reduce((total: number, sale: Order) => total + sale.totalPrice, 0);

  const totalProducts: number = categories?.reduce((total: number, category: FilterItem) => total + category.count, 0);

  const cards: CardInterface[] = [
    {
      title: 'Ventas totales',
      text: `$${totalSales && totalSales.toFixed(2)}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 25 }} />,
      iconBackground: "#fe9016",
      iconBoxShadow: "#fce8cd"
    },
    {
      title: 'Pedidos totales',
      text: allOrders?.totalDocs,
      icon: <ShoppingCartIcon sx={{ fontSize: 25 }} />,
      iconBackground: "#03b618",
      iconBoxShadow: "#b1e7b6"
    },
    {
      title: 'Productos totales',
      text: `${totalProducts}`,
      icon: <ShoppingBasketIcon sx={{ fontSize: 25 }} />,
      iconBackground: "#3666ef",
      iconBoxShadow: "#a5beea"
    }
  ];

  const categoryColors: TypeWithKey<{default: string, hover: string}> = Object.keys(data?.salesByCategory || {}).reduce((colors, category, index) => {
    return {
      ...colors,
      [category]: {
        default: `hsl(${(index * 70) % 360}, 70%, 60%)`,
        hover: `hsl(${(index * 70) % 360}, 70%, 70%)`
      }
    };
  }, {});

  return (
    isLoadingOrders || filterCountsLoading || isLoadingSales
    ? <LoadingSpinner type='noflex'/> : (
    <>
      <Helmet>
        <title>Dashboard - SABRINA</title>
      </Helmet>
      <Navbar />
      <main className="dashboard admin">
        <Sidebar page="dashboard" />
        <article className="dashboard__statistics">
          <h2>Dashboard</h2>
          <section className="dashboard__statistics-info">
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
          <section className="dashboard__statistics-details">
            <div className="dashboard__statistics-details-sales">
              <h3>Ventas por mes</h3>
              <div className="sales-line-chart-container">
                <SalesLineChart monthlySales={data!.monthlySales} categoryColors={categoryColors} />
              </div>
            </div>
            <div className="dashboard__statistics-details-categories">
              <h3>Ventas por categoria</h3>
              <div className="sales-categories-doughnut-chart-container">
                <SalesCategoriesDoughnutChart salesByCategory={data!.salesByCategory} categoryColors={categoryColors} />
              </div>
            </div>
          </section>
        </article>
        <article className="dashboard__latest-orders">
          <section>
            <h3>Últimos pedidos</h3>
            <OrderTable itemsPerPage={6} type="short" />
            <Link to="/dashboard/orders">Más pedidos</Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
    )
  )
}

export default Dashboard