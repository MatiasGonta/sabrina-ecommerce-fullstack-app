import { COLORS } from "@/models";
import Tooltip from '@mui/material/Tooltip';

interface ColorBadgeInterface {
    color: string;
    size?: 'extraLarge' | 'large' | 'medium' | 'small';
    active?: boolean;
}

const ColorBadge: React.FC<ColorBadgeInterface> = ({ color, size='large', active=false }) => {
    const badgeSize = {
        extraLarge: '25px',
        large: '22.5px',
        medium: '17px',
        small: '15px'
    };

    const badgeWrapperStyles = {
        width: badgeSize[size],
        height: badgeSize[size],
        maxWidth: badgeSize[size],
        maxHeight: badgeSize[size],
        padding: '1px',
        border: active ? '2px solid rgb(142,112,84)' : '1px solid rgba(0,0,0,0.473)'
    }

    return (
        <Tooltip title={color} >
            <div style={badgeWrapperStyles}>
                <div style={{ backgroundColor: COLORS[color as keyof typeof COLORS], width: '100%', height: '100%' }}></div>
            </div>
        </Tooltip>
    )
}

export default ColorBadge