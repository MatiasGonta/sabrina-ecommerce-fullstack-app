import React from 'react';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';

const PurchaseInfoBanner: React.FC = () => {
  return (
    <div className="purchase-info-banner">
      <div className="purchase-info-banner__payment">
        <PaymentOutlinedIcon sx={{ fontSize: 40 }} />
        <div>
          <h2>MÉTODOS DE PAGO</h2>
          <p>PayPal (10%+), MercadoPago (5%+) o Efectivo (Precios de la web)</p>
        </div>
      </div>
      <div className="purchase-info-separator"></div>
      <div className="purchase-info-banner__shipping">
        <LocalShippingOutlinedIcon sx={{ fontSize: 40 }} />
        <div>
          <h2>MÉTODOS DE ENVÍO</h2>
          <p>Retiro en el local, Correo Argentino, Empresas de Transporte o Cadete propio dentro de CABA.</p>
        </div>
      </div>
      <div className="purchase-info-separator"></div>
      <div className="purchase-info-banner__security">
        <GppGoodOutlinedIcon sx={{ fontSize: 40 }} />
        <div>
          <h2>COMPRA SEGURA</h2>
          <p>Puedes ver referencias de clientes tanto en Facebook como en Google Maps.</p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInfoBanner;