import React from 'react';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import { Typography } from '@mui/material';

const PurchaseInfoBanner: React.FC = () => {
  return (
    <div className="purchase-info-banner">
      <div className="purchase-info-banner__payment">
        <PaymentOutlinedIcon sx={{ fontSize: 40 }} />
        <div className="purchase-info-banner__payment__content">
          <Typography fontSize={20} fontWeight="bold" component="h5" noWrap={false}>
            MÉTODOS DE PAGO
          </Typography>
          <p className="purchase-info-banner__payment__content__text">
            PayPal (10%+), MercadoPago (5%+) o Efectivo (Precios de la web)
          </p>
        </div>
      </div>

      <div className="purchase-info-separator"></div>

      <div className="purchase-info-banner__shipping">
        <LocalShippingOutlinedIcon sx={{ fontSize: 40 }} />
        <div className="purchase-info-banner__shipping__content">
          <Typography fontSize={20} fontWeight="bold" component="h5" noWrap={false}>
            MÉTODOS DE ENVÍO
          </Typography>
          <p className="purchase-info-banner__shipping__content__text">
            Retiro en el local, Correo Argentino, Empresas de Transporte o Cadete propio dentro de CABA.
          </p>
        </div>
      </div>

      <div className="purchase-info-separator"></div>

      <div className="purchase-info-banner__security">
        <GppGoodOutlinedIcon sx={{ fontSize: 40 }} />
        <div className="purchase-info-banner__security__content">
          <Typography fontSize={20} fontWeight="bold" component="h5" noWrap={false}>
            COMPRA SEGURA
          </Typography>
          <p className="purchase-info-banner__security__content__text">
            Puedes ver referencias de clientes tanto en Facebook como en Google Maps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInfoBanner;