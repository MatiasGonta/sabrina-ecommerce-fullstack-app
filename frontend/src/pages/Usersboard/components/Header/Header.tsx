import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { Card, LoadingSpinner } from '@/components/ui'
import { useGetUsersStatistics } from '@/hooks';
import { LoadingSpinnerType } from '@/models';

interface HeaderInterface { }

const Header: React.FC<HeaderInterface> = () => {
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

    return isLoading ? <LoadingSpinner type={LoadingSpinnerType.FLEX} /> : (
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
    )
}

export default Header