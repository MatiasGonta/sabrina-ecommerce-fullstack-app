import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Navbar, Sidebar, OrderTable } from "@/components";
import { Card, LoadingSpinner, Footer } from '@/components/ui';
import { FilterItem, Order, TypeWithKey, Routes, LoadingSpinnerType } from '@/models';
import { Link } from 'react-router-dom';
import { SalesCategoriesDoughnutChart, SalesLineChart } from './components';
import { useGetAllOrdersHistoryQuery, useGetFilterCountsQuery, useGetSales } from '@/hooks';
import { Helmet } from 'react-helmet-async';
import '@/styles/pages/Dashboard/Dashboard.scss';
import { Typography } from '@mui/material';

interface DashboardInterface { }

const Dashboard: React.FC<DashboardInterface> = () => {
  const { data: allOrders, isLoading: isLoadingOrders } = useGetAllOrdersHistoryQuery(1);
  const { categories, isLoading: filterCountsLoading } = useGetFilterCountsQuery();
  const { data, isLoading: isLoadingSales } = useGetSales();

  const totalSales: number = data?.sales.reduce((total: number, sale: Order) => total + sale.totalPrice, 0);

  const totalProducts: number = categories?.reduce((total: number, category: FilterItem) => total + category.count, 0);

  const cards = [
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

  const categoryColors: TypeWithKey<{ default: string, hover: string }> = Object.keys(data?.salesByCategory || {}).reduce((colors, category, index) => {
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
      ? <LoadingSpinner type={LoadingSpinnerType.NOFLEX} /> : (
        <>
          <Helmet>
            <title>Dashboard - SABRINA</title>
          </Helmet>
          <Navbar />
          <main className="main--admin">
            <Sidebar />

            <section className="dashboard__statistics">
              <Typography fontSize={25} fontWeight="bold" mb="25px" component="h2" noWrap={false}>
                Dashboard
              </Typography>
              <article className="dashboard__statistics__info">
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

              <article className="dashboard__statistics__details">
                <div className="dashboard__statistics__details__sales">
                  <Typography fontSize={20} fontWeight="bold" component="h3" noWrap={false}>
                    Ventas por mes
                  </Typography>
                  <div className="dashboard__statistics__details__sales__line-chart-wrapper">
                    <SalesLineChart monthlySales={data!.monthlySales} categoryColors={categoryColors} />
                  </div>
                </div>
                <div className="dashboard__statistics__details__categories">
                  <Typography fontSize={20} fontWeight="bold" component="h3" noWrap={false}>
                    Ventas por categoria
                  </Typography>
                  <div className="dashboard__statistics__details__categories__doughnut-chart-wrapper">
                    <SalesCategoriesDoughnutChart salesByCategory={data!.salesByCategory} categoryColors={categoryColors} />
                  </div>
                </div>
              </article>
            </section>

            <section className="dashboard__latest-orders">
              <article className="dashboard__latest-orders__wrapper">
                <Typography fontSize={20} fontWeight="bold" component="h3" noWrap={false}>
                  Últimos pedidos
                </Typography>
                <OrderTable itemsPerPage={6} template="short" />
                <Link to={Routes.DASHBOARD_ORDERS} className="dashboard__latest-orders__wrapper__link">Más pedidos</Link>
              </article>
            </section>
          </main>

          <Footer />
        </>
      )
  )
}

export default Dashboard