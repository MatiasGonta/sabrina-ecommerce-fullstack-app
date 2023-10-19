import { ProductItem } from "../models";

export const sampleProducts: ProductItem = [
    {
        name: 'Bufanda Cuello Infinito',
        slug: 'buzanda-cuello-infinito-bowen',
        category: 'Bufandas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697652734/buzanda-cuello-infinito-oliva_qxmv3v.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697652752/buzanda-cuello-infinito-maiz_ak2ygt.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697652744/buzanda-cuello-infinito-darkgray_ztsi3d.webp', 'https://res.cloudinary.com/duihep83l/image/upload/v1697652734/buzanda-cuello-infinito-blue_vzuv0t.webp', 'https://res.cloudinary.com/duihep83l/image/upload/v1696378296/buzanda-cuello-infinito-red_lrttuy.webp'],
        price: 17.99,
        countInStockByVariant: {
            'rojo-': 1,
            'mostaza-': 2,
            'gris oscuro-': 0,
            'azul-': 0,
            'oliva-': 3,
        },
        brand: 'Bowen',
        colors: ['oliva','mostaza','gris oscuro','azulino','vino'],
        sizes: []
    },
    {
        name: 'Campera de Cuero Briganti',
        slug: 'campera-cuero-briganti',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696378110/campera-cuero-black_ct5wue.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696378115/campera-cuero-black-back_cr1chm.webp'],
        price: 84.99,
        countInStockByVariant: {
            'negro-M': 2,
            'negro-L': 0,
            'negro-XL': 4
        },
        brand: 'Briganti',
        colors: ['negro'],
        sizes: ['M','L','XL']
    },
    {
        name: 'Buzo Canguro Hoodie',
        slug: 'buzo-hoodie-quiksilver',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696378014/buzo-hoodie-azul_y48bbl.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696378009/buzo-hoodie-bordo_nxhaag.webp'],
        price: 35.99,
        countInStockByVariant: {
            'azul petróleo-S': 3,
            'azul petróleo-M': 1,
            'azul petróleo-XL': 0,
            'azul petróleo-XXL': 2,
            'bordo-S': 0,
            'bordo-M': 2,
            'bordo-XL': 4,
            'bordo-XXL': 1,
        },
        brand: 'Quiksilver',
        colors: ['azul petróleo','bordo'],
        sizes: ['S','M','XL','XXL']
    },
    {
        name: 'Campera Puma',
        slug: 'campera-puma',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696377912/campera-puma-black_yrpmv6.webp'],
        price: 30.99,
        countInStockByVariant: {
            'negro-XS': 0,
            'negro-S': 2,
            'negro-M': 0,
            'negro-L': 1
        },
        brand: 'Puma',
        colors: ['negro'],
        sizes: ['XS','S','M','L']
    },
    {
        name: 'Campera Bomber Bengalina',
        slug: 'campera-bomber-bengalina',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696377791/campera-bomber-darkgreen_a7prza.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696377795/campera-bomber-darkgray_xoegc5.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696377801/campera-bomber-ladrillo_ynyb7d.webp'],
        price: 67.99,
        countInStockByVariant: {
            'negro-M': 4,
            'negro-L': 2,
            'negro-XL': 2,
            'negro-XXL': 0,
            'negro-XXXL': 1,
            'suela-M': 1,
            'suela-L': 3,
            'suela-XL': 0,
            'suela-XXL': 2,
            'suela-XXXL': 1,
            'militar-M': 0,
            'militar-L': 5,
            'militar-XL': 1,
            'militar-XXL': 2,
            'militar-XXXL': 0
        }, 
        brand: 'Bomber',
        colors: ['negro','suela','militar'],
        sizes: ['M','L','XL','XXL','XXXL']
    },
    {
        name: 'Campera Parka Piel Corderito Capucha',
        slug: 'campera-parka-piel-corderito-capucha',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696377632/parka-hombre_wi8shm.webp'],
        price: 84.99,
        countInStockByVariant: {
            'negro-XL': 4,
            'negro-XXL': 2,
        }, 
        brand: 'Quiksilver',
        colors: ['negro'],
        sizes: ['XL','XXL']
    },
    {
        name: 'Buzo Kaz Algodón',
        slug: 'buzo-kaz-algodón',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696377620/buzo-kaz-slim-brown_dqvxf3.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696377623/buzo-kaz-slim-celeste-claro_dncwkx.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696377614/buzo-kaz-slim-manteca_tcaziw.webp'],
        price: 14.99,
        countInStockByVariant: {
            'marron claro-XS': 1,
            'marron claro-S': 4,
            'marron claro-M': 0,
            'marron claro-L': 3,
            'turquesa claro-XS': 2,
            'turquesa claro-S': 0,
            'turquesa claro-M': 5,
            'turquesa claro-L': 1,
            'beige-XS': 3,
            'beige-S': 1,
            'beige-M': 2,
            'beige-L': 5
        },  
        brand: 'Minimal Cotton',
        colors: ['marron claro','turquesa claro','beige'],
        sizes: ['XS','S','M','L']
    },
    {
        name: 'Remera Everything Is Temporary',
        slug: 'remera-everything-is-temporary',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696377370/remera-everything-black-grafizona_grnwm1.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696377347/remera-everything-black-front-grafizona_lxmxnw.webp'],
        price: 16.99,
        countInStockByVariant: {
            'negro-M': 4,
            'negro-L': 2
        },    
        brand: 'Grafizona',
        colors: ['negro'],
        sizes: ['M','L']
    },
    {
        name: 'Remera The Creative Ching',
        slug: 'remera-the-creative-ching',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054858/remera-the_creative-ching-black-back_rny02t.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054860/remera-the_creative-ching-black_qrceql.webp'],
        price: 16.99,
        countInStockByVariant: {
            'negro-XS': 2,
            'negro-S': 4,
            'negro-M': 1,
            'negro-L': 2,
            'negro-XL': 0,
        },
        brand: 'Grafizona',
        colors: ['negro'],
        sizes: ['XS','S','M','L','XL']
    },
    {
        name: 'Remera Chomba Henley Entallada',
        slug: 'remera-chomba-henley-entallada',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696377326/chomba-white-hanley_nwdxqr.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696377330/chomba-black-hanley_c9dyma.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696377334/chomba-light-gray-hanley_q8kfbu.webp'],
        price: 25.99,
        countInStockByVariant: {
            'blanco-S': 0,
            'blanco-M': 0,
            'gris claro-S': 0,
            'gris claro-M': 0,
            'negro-S': 0,
            'negro-M': 0
        },
        brand: 'DC',
        colors: ['blanco','negro','gris claro'],
        sizes: ['S','M']
    },
    {
        name: 'Short Calza Lycra Deportivo Faja',
        slug: 'short-calza-lycra-deportivo-faja',
        category: 'Calzas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696377148/short-lycra_deportivo-cyan_fs2glk.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696377144/short-lycra_deportivo-orange_uohhxe.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696376993/short-lycra_deportivo-red_op3phl.webp'],
        price: 24.99,
        countInStockByVariant: {
            'celeste oscuro-S': 2,
            'celeste oscuro-M': 3,
            'suela-S': 1,
            'suela-M': 2,
            'rojo-S': 0,
            'rojo-M': 3,
        },
        brand: 'Peñafiel Sport',
        colors: ['celeste oscuro','suela','rojo'],
        sizes: ['S','M']
    },
    {
        name: 'Calza Fanaticas Crossfit Pushup',
        slug: 'calza-fanaticas-crossfit-pushup',
        category: 'Calzas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696376835/calza-deportiva-white-pushhup_pmetm3.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696376820/calza-deportiva-black-pushhup_tix8xk.webp'],
        price: 27.99,
        countInStockByVariant: {
            'blanco-M': 0,
            'negro-M': 0,
        },
        brand: 'Peñafiel Sport',
        colors: ['negro','blanco'],
        sizes: ['M']
    },
    {
        name: 'Short Jean Hugs',
        slug: 'short-jean-hugs',
        category: 'Shorts',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696376303/short-jean-mujer-celeste_blvfue.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696376297/short-jean-mujer-black_sjg9o7.webp'],
        price: 29.99,
        countInStockByVariant: {
            'celeste oscuro-S': 1,
            'celeste oscuro-L': 3,
            'negro-S': 2,
            'negro-L': 4
        },
        brand: 'Hugs',
        colors: ['celeste oscuro','negro'],
        sizes: ['S','L']
    },
    {
        name: 'Pantalones Cargo Gabardina',
        slug: 'pantalones-cargo-gabardina',
        category: 'Pantalones',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696375523/pantalon-cargo-gris_ni4wmk.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696375526/pantalon-cargo-camel_a8hqgr.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696375528/pantalon-cargo-green_fyheby.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696375531/pantalon-cargo-black_sdv4ul.webp'],
        price: 39.99,
        countInStockByVariant: {
            'negro-M': 4,
            'negro-L': 2,
            'gris oscuro-M': 1,
            'gris oscuro-L': 3,
            'lattle-M': 1,
            'lattle-L': 1,
            'militar-M': 3,
            'militar-L': 0,
        },
        brand: 'Sico Urban',
        colors: ['negro','gris oscuro','lattle','militar'],
        sizes: ['M','L']
    },
    {
        name: 'Bufanda Combinada A Listas',
        slug: 'bufanda-combinada-a-listas',
        category: 'Bufandas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696374269/bufanda-nike-gray-blue_jsy7xq.jpg'],
        price: 16.99,
        countInStockByVariant: {
            'gris-': 2,
        },
        brand: 'Bowen',
        colors: ['gris'],
        sizes: []
    },
    {
        name: 'Calza Deportiva Jenny Aerofit Sw',
        slug: 'calza-deportiva-jenny-aerofit-sw',
        category: 'Calzas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696376609/calza-deportiva-black-jenny_uduzyw.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696376613/calza-deportiva-darkblue-jenny_tbumwf.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696376560/calza-deportiva-yellow-jenny_htp1ll.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696376556/calza-deportiva-turqueza-jenny_ebeyf7.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696376553/calza-deportiva-pink-jenny_wphhli.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696376550/calza-deportiva-oliva-jenny_c9clcd.webp'],
        price: 25.99,
        countInStockByVariant: {
            'fucsia-L': 2,
            'fucsia-XL': 1,
            'fucsia-XXXL': 0,
            'negro-L': 3,
            'negro-XL': 4,
            'negro-XXXL': 2,
            'amarillo-L': 0,
            'amarillo-XL': 1,
            'amarillo-XXXL': 1,
            'aqua-L': 1,
            'aqua-XL': 2,
            'aqua-XXXL': 1,
            'violeta-L': 3,
            'violeta-XL': 1,
            'violeta-XXXL': 0,
            'verde manzana-L': 0,
            'verde manzana-XL': 2,
            'verde manzana-XXXL': 2,
        },
        brand: 'Aerofit',
        colors: ['fucsia','negro','amarillo','aqua','violeta','verde manzana'],
        sizes: ['L','XL','XXXL']
    },
    {
        name: 'Short Cargo Bermuda',
        slug: 'shorts-cargo-bermuda',
        category: 'Shorts',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696375750/shorts-cargo-brown_n95gde.webp'],
        price: 34.99,
        countInStockByVariant: {
            'marron-XS': 1,
            'marron-S': 2,
            'marron-M': 4,
            'marron-L': 3
        },
        brand: 'Sico Urban',
        colors: ['marron'],
        sizes: ['XS','S','M','L']
    },
    {
        name: 'Sweeter Combinado',
        slug: 'sweeter-combinado',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696375344/sweater-pullover-black-ms_kwphdh.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696375324/sweater-pullover_lyvoox.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696375350/sweater-pullover-salmon-ms_fl7vvc.webp'],
        price: 14.99,
        countInStockByVariant: {
            'azul petróleo-M': 2,
            'azul petróleo-L': 1,
            'azul petróleo-XL': 0,
            'azul petróleo-XXL': 1,
            'rosa marron-M': 4,
            'rosa marron-L': 1,
            'rosa marron-XL': 0,
            'rosa marron-XXL': 2,
            'negro-M': 3,
            'negro-L': 4,
            'negro-XL': 0,
            'negro-XXL': 1
        },
        brand: 'Wear',
        colors: ['negro','rosa marron','azul petróleo'],
        sizes: ['M','L','XL','XXL']
    },
    {
        name: 'Jean Cargo Mom',
        slug: 'jean-cargo-mom',
        category: 'Pantalones',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696375339/jean-celeste_ewuuld.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696375336/jean-celeste-right_ntkl7o.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696375331/jean-black_xndrqa.webp'],
        price: 39.99,
        countInStockByVariant: {
            'gris oscuro-M': 4,
            'gris oscuro-XXL': 2,
            'celeste oscuro-M': 5,
            'celeste oscuro-XXL': 1
        },
        brand: 'Quiksilver',
        colors: ['gris oscuro','celeste oscuro'],
        sizes: ['M','XXL']
    },
    {
        name: 'Short Jean Bermuda Roturas',
        slug: 'short-jean-bermuda-roturas',
        category: 'Shorts',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696375874/bermuda-jean_gztvcc.webp'],
        price: 24.99,
        countInStockByVariant: {
            'azulino-16 años': 1,
            'azulino-XS': 2,
            'azulino-S': 2,
            'azulino-M': 3,
            'azulino-L': 2,
            'azulino-XL': 0
        },
        brand: 'Quiksilver',
        colors: ['azul'],
        sizes: ['XS','S','M','XXL','XXXL']
    },
    {
        name: 'Bufanda Punto Liso Unisex',
        slug: 'bufanda-punto-liso-unisex',
        category: 'Bufandas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054788/bufanda-punto-liso-unisex-blanco_e0jljn.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054792/bufanda-punto-liso-unisex-black_ltomut.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054790/bufanda-punto-liso-unisex-marino_ilsdr9.webp'],
        price: 16.99,
        countInStockByVariant: {
            'negro-': 4,
            'azul petróleo-': 3,
            'blanco-': 2,
        },
        brand: 'Bowen',
        colors: ['negro','blanco','azul petróleo'],
        sizes: []
    },
    {
        name: 'Short Jean Bermuda Lisa',
        slug: 'short-jean-bermuda-lisa',
        category: 'Shorts',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696375976/bermuda-jean-sin-roturas_vermho.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696375871/bermuda-jean-back_f9nktl.webp'],
        price: 29.99,
        countInStockByVariant: {
            'azulino-S': 3,
            'azulino-L': 5,
        },
        brand: 'Quiksilver',
        colors: ['azulino'],
        sizes: ['S','L']
    },
    {
        name: 'Short Algodón Rustico',
        slug: 'short-algodón-rustico',
        category: 'Shorts',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696375761/pantalon-corto-algodon-light-gray_ccb4ll.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696375758/pantalon-corto-algodon-militar_dhj9os.webp'],
        price: 17.99,
        countInStockByVariant: {
            'gris claro-XS': 3,
            'gris claro-S': 1,
            'verde oscuro-XS': 2,
            'verde oscuro-S': 1,
        },
        brand: 'Thrasher',
        colors: ['gris claro','verde oscuro'],
        sizes: ['XS','S']
    },
    {
        name: 'Jean Clasico Urban',
        slug: 'jean-clasico-urban',
        category: 'Pantalones',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696374055/lacoste-bluenight-pant_uhvg1i.webp'],
        price: 29.99,
        countInStockByVariant: {
            'marino-L': 0,
            'marino-XL': 0,
            'marino-XXL': 0
        },
        brand: 'Sico Urban',
        colors: ['marino'],
        sizes: ['L','XL','XXL']
    },
    {
        name: 'Remera Nike Lisa Slim',
        slug: 'remera-nike-lisa-slim',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696374212/nike-gray-shirt_atmfu7.webp'],
        price: 12.99,
        countInStockByVariant: {
            'gris-XS': 1,
            'gris-M': 4,
            'gris-XL': 2,
            'gris-XXL': 0,
            'gris-XXXL': 3,
        },
        brand: 'Nike',
        colors: ['gris'],
        sizes: ['XS','M','XL','XXL','XXXL']
    },
    {
        name: 'Campera New Balance',
        slug: 'campera-new-balance',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696373963/campera-new-balance-lightgray_w81dzm.jpg'],
        price: 34.99,
        countInStockByVariant: {
            'gris-S': 0,
            'gris-M': 0,
        },
        brand: 'New Balance',
        colors: ['gris'],
        sizes: ['S','M']
    },
    {
        name: 'Buzo Canguro Liso',
        slug: 'buzo-canguro-liso',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696374434/buzo-puma-white_lfc2yt.jpg','https://res.cloudinary.com/duihep83l/image/upload/v1696374450/buzo-puma-white-back_x7duv0.jpg','https://res.cloudinary.com/duihep83l/image/upload/v1696373912/buzo-puma-pink_pgfnyh.webp'],
        price: 35.99,
        countInStockByVariant: {
            'blanco-L': 4,
            'blanco-XL': 1,
            'tostado-L': 2,
            'tostado-XL': 0
        },
        brand: 'Puma',
        colors: ['blanco','tostado'],
        sizes: ['L','XL']
    },
    {
        name: 'Remera DC Smile Round We Go',
        slug: 'remera-dc-smile-round-we-go',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696374159/dc-black-slim-shirt_aq7pbe.webp'],
        price: 14.99,
        countInStockByVariant: {
            'negro-XS': 1,
            'negro-M': 2,
            'negro-L': 4,
            'negro-XXL': 2
        },
        brand: 'DC',
        colors: ['negro'],
        sizes: ['XS','M','L','XXL']
    },
    {
        name: 'Remera Adidas Originals 3 Stripes',
        slug: 'remera-adidas-originals-3-stripes',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696374073/adidas-white-slim-shirt_jxgxnt.jpg','https://res.cloudinary.com/duihep83l/image/upload/v1696374018/adidas-red-slim-shirt_qvvmfu.jpg','https://res.cloudinary.com/duihep83l/image/upload/v1696531700/adidas-black-slim-shirt_2_dz5n8w.jpg'],
        price: 12.99,
        countInStockByVariant: {
            'blanco-XS': 3,
            'blanco-S': 2,
            'blanco-M': 5,
            'blanco-L': 4,
            'blanco-XL': 1,
            'rojo-XS': 1,
            'rojo-S': 0,
            'rojo-M': 3,
            'rojo-L': 2,
            'rojo-XXL': 0,
            'negro-XS': 2,
            'negro-S': 1,
            'negro-M': 3,
            'negro-L': 4,
            'negro-XL': 0
        },
        brand: 'Adidas',
        colors: ['blanco','rojo','negro'],
        sizes: ['XS','S','M','L','XXL']
    },
    {
        name: 'Joggins Classic Adidas',
        slug: 'joggins-classic-adidas',
        category: 'Pantalones',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696373957/adidas-black-pant_gblrt2.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696373885/adidas-green-pant_i3quhr.jpg'],
        price: 19.99,
        countInStockByVariant: {
            'negro-M': 4,
            'negro-L': 0,
            'lima oscuro-M': 3,
            'lima oscuro-L': 1
        },
        brand: 'Adidas',
        colors: ['negro','lima oscuro'],
        sizes: ['M','L']
    },
    {
        name: 'Campera Lisa Reush',
        slug: 'campera-lisa-reush',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696373955/campera-reush-green_qodhkl.webp'],
        price: 34.99,
        countInStockByVariant: {
            'militar-L': 5,
            'militar-XL': 2,
            'militar-XXL': 0
        },
        brand: 'Reush',
        colors: ['militar'],
        sizes: ['L','XL','XXL']
    },
    {
        name: 'Buzo Quiksilver Estampado',
        slug: 'buzo-quiksilver-estampado',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696373952/buzo-quiksilver-blue_gfr2du.jpg'],
        price: 30.99,
        countInStockByVariant: {
            'azulino-XS': 0,
            'azulino-S': 0,
            'azulino-M': 0
        },
        brand: 'Quiksilver',
        colors: ['azulino'],
        sizes: ['XS','S','M']
    },
    {
        name: 'Pantalon Cargo Pampero',
        slug: 'pantalon-cargo-pampero',
        category: 'Pantalones',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696373940/pink-charge-pants_io8dql.jpg'],
        price: 26.99,
        countInStockByVariant: {
            'tostado-S': 1,
            'tostado-M': 0,
            'tostado-L': 3,
            'tostado-XL': 0
        },
        brand: 'Sico Urban',
        colors: ['tostado'],
        sizes: ['S','M','L','XL']
    },
    {
        name: 'Buzo Flame Thrasher',
        slug: 'buzo-flame-thrasher',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696373918/buzo-thrasher-flame-black_whudob.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697128950/buzo-flame-thrasher-white_mec55c.webp'],
        price: 35.99,
        countInStockByVariant: {
            'negro-M': 5,
            'negro-L': 2,
            'negro-XL': 3,
            'blanco-M': 1,
            'blanco-L': 0,
            'blanco-XL': 4
        },
        brand: 'Thrasher',
        colors: ['negro','blanco'],
        sizes: ['M','L','XL']
    },
    {
        name: 'Bufanda Lana Rayada Con Flecos',
        slug: 'bufanda-lana-rayada-con-flecos',
        category: 'Bufandas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696531063/bufanda-black_ifaemy.webp'],
        price: 20.99,
        countInStockByVariant: {
            'negro-': 3,
        },
        brand: 'Bowen',
        colors: ['negro'],
        sizes: []
    },
    {
        name: 'Remera Palm Angels Algodon',
        slug: 'remera-palm-angels-algodon',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696531987/remera-palm-angels-algodon_vtjpqo.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696531986/remera-palm-angels-algodon-back_slbxnx.webp'],
        price: 19.99,
        countInStockByVariant: {
            'negro-M': 0,
            'negro-L': 0,
            'negro-XL': 0,
            'negro-XXL': 0
        },
        brand: 'Grafizona',
        colors: ['negro'],
        sizes: ['M','L','XL','XXL']
    },
    {
        name: 'Chomba Bross Lisa Jersey Cuello Puño',
        slug: 'chomba-bross-lisa-jersey-cuello-puño',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696533063/chomba-bross-lisa-jersey-cuello-pu%C3%B1o-white_p0uyhm.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696533069/chomba-bross-lisa-jersey-cuello-pu%C3%B1o-black_pw046e.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696533063/chomba-bross-lisa-jersey-cuello-pu%C3%B1o-lila_nal31y.webp'],
        price: 29.99,
        countInStockByVariant: {
            'negro-S': 2,
            'negro-M': 1,
            'negro-L': 4,
            'negro-XL': 2,
            'negro-XXL': 1,
            'negro-XXXL': 1,
            'blanco-S': 3,
            'blanco-M': 5,
            'blanco-L': 2,
            'blanco-XL': 3,
            'blanco-XXL': 1,
            'blanco-XXXL': 1,
            'violeta-S': 0,
            'violeta-M': 0,
            'violeta-L': 1,
            'violeta-XL': 1,
            'violeta-XXL': 4,
            'violeta-XXXL': 2
        },
        brand: 'Bross',
        colors: ['negro','blanco','violeta'],
        sizes: ['S','M','L','XL','XXL','XXXL']
    },
    {
        name: 'Remera Bross Entallada Algodón Capucha',
        slug: 'remera-bross-entallada-algodón-capucha',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696533622/remera-bross-entallada-algod%C3%B3n-capucha-white_w30z7t.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696533622/remera-bross-entallada-algod%C3%B3n-capucha-wine_jy0ols.webp'],
        price: 21.99,
        countInStockByVariant: {
            'blanco-S': 2,
            'blanco-XS': 4,
            'vino-S': 1,
            'vino-XS': 0
        },  
        brand: 'Bross',
        colors: ['negro','vino'],
        sizes: ['XS','S']
    },
    {
        name: 'Remera Ranglan Manga Corta Algodón Jersey',
        slug: 'remera-ranglan-manga-corta-algodón-jersey',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696534593/remera-ranglan-manga-corta-algod%C3%B3n-jersey_thacvt.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696534592/remera-ranglan-manga-corta-algod%C3%B3n-jersey-blue_jhcaj9.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696534593/remera-ranglan-manga-corta-algod%C3%B3n-jersey-black_cnukyt.webp'],
        price: 6.99,
        countInStockByVariant: {
            'rojo-L': 4,
            'rojo-XL': 2,
            'rojo-XXL': 2,
            'azul-L': 0,
            'azul-XL': 0,
            'azul-XXL': 1,
            'negro-L': 4,
            'negro-XL': 0,
            'negro-XXL': 2
        }, 
        brand: 'Minimal Cotton',
        colors: ['rojo','azul','negro'],
        sizes: ['L','XL','XXL']
    },
    {
        name: 'Remera De Algodón Brooklyn New York',
        slug: 'remera-de-algodón-brooklyn-new-york',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696535047/remera-de-algod%C3%B3n-brooklyn-new-york_sd5dwk.webp'],
        price: 16.99,
        countInStockByVariant: {
            'negro-M': 0,
            'negro-L': 0
        },
        brand: 'Kingdom',
        colors: ['negro'],
        sizes: ['M','L']
    },
    {
        name: 'Jeans Chupin Con Roturas',
        slug: 'pantalon-de-jeans-chupin-con-roturas',
        category: 'Pantalones',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696535341/pantalon-de-jeans-chupin-con-roturas_pndije.webp'],
        price: 39.99,
        countInStockByVariant: {
            'blanco-L': 2,
            'blanco-XL': 5,
            'blanco-XXL': 4 
        },
        brand: 'Sico Urban',
        colors: ['blanco'],
        sizes: ['L','XL','XXL']
    },
    {
        name: 'Remera Básica Kingdom Vintage Mod American',
        slug: 'remera-basica-kingdom-vintage-mod-american',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696536042/remera-basica-kingdom-vintage-mod-american-blanco_b9k2j0.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696536043/remera-basica-kingdom-vintage-mod-american-black_mifdzp.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696536049/remera-basica-kingdom-vintage-mod-american-green_c95kib.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696536050/remera-basica-kingdom-vintage-mod-american-darkgray_xth0oj.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696536051/remera-basica-kingdom-vintage-mod-american-gray_npdfyg.webp'],
        price: 8.99,
        countInStockByVariant: {
            'blanco-S': 4,
            'blanco-M': 2,
            'negro-S': 5,
            'negro-M': 3,
            'militar-S': 1,
            'militar-M': 0,
            'gris oscuro-S': 0,
            'gris oscuro-M': 2,
            'gris-S': 1,
            'gris-M': 2
        },
        brand: 'Kingdom',
        colors: ['blanco','gris','gris oscuro','negro','militar'],
        sizes: ['S','M']
    },
    {
        name: 'Remera Básica Kingdom Vintage Eagle Aguila',
        slug: 'remera-básica-kingdom-vintage-eagle-aguila',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696536576/remera-b%C3%A1sica-kingdom-vintage-eagle-aguila-black_aluyvx.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697129025/remera-b%C3%A1sica-kingdom-vintage-eagle-aguila-white_mfpo6q.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697129025/remera-b%C3%A1sica-kingdom-vintage-eagle-aguila-verdeagua_dtfp7c.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696536576/remera-b%C3%A1sica-kingdom-vintage-eagle-aguila-militar_um06si.webp'],
        price: 8.99,
        countInStockByVariant: {
            'blanco-M': 2,
            'negro-M': 3,
            'verde agua-M': 1,
            'militar-M': 2
        },
        brand: 'Kingdom',
        colors: ['blanco','negro','verde agua','militar'],
        sizes: ['M']
    },
    {
        name: 'Remera Kingdom Bicolor Algodon',
        slug: 'remera-kingdom-bicolor-algodon',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054647/remera-kingdom-bicolor-algodon-red_pcrdif.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054648/remera-kingdom-bicolor-algodon-azulino_dsxnb0.webp'],
        price: 12.99,
        countInStockByVariant: {
            'rojo-S': 2,
            'rojo-M': 1,
            'rojo-L': 0,
            'celeste oscuro-S': 3,
            'celeste oscuro-M': 5,
            'celeste oscuro-L': 1,
        },
        brand: 'Kingdom',
        colors: ['rojo','celeste oscuro'],
        sizes: ['S','M','L']
    },
    {
        name: 'Remera Ribb Entallada Algodon',
        slug: 'remera-ribb-entallada-algodon',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054705/remera-ribb-entallada-algodon-beige_la8gve.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054708/remera-ribb-entallada-algodon-darkgray_xizsmr.webp'],
        price: 24.99,
        countInStockByVariant: {
            'tostado-M': 2,
            'tostado-L': 1,
            'gris oscuro-M': 0,
            'gris oscuro-L': 3
        },
        brand: 'Minimal Cotton',
        colors: ['tostado','gris oscuro'],
        sizes: ['M','L']
    },
    {
        name: 'Buzo Canguro Liso Entallado',
        slug: 'buzo-canguro-liso-entallado',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054582/buzo-canguro-brown_elzr05.webp'],
        price: 24.99,
        countInStockByVariant: {
            'marron claro-L': 5,
            'marron claro-XL': 1,
            'marron claro-XXL': 0
        },
        brand: 'Minimal Cotton',
        colors: ['marron claro'],
        sizes: ['L','XL','XXL']
    },
    {
        name: 'Remera Payo Deporte Outdoor',
        slug: 'remera-payo-deporte-outdoor',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054302/remera-payo-deporte-outdoor-naranja_ytkxgn.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054300/remera-payo-deporte-outdoor-verdeagua_lchn1r.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054301/remera-payo-deporte-outdoor-green_xsxyvk.webp'],
        price: 17.99,
        countInStockByVariant: {
            'coral-XS': 1,
            'coral-S': 1,
            'coral-M': 2,
            'verde agua-XS': 2,
            'verde agua-S': 0,
            'verde agua-M': 1,
            'verde palta-XS': 0,
            'verde palta-S': 0,
            'verde palta-M': 2
        },
        brand: 'Payo',
        colors: ['coral', 'verde agua', 'verde palta'],
        sizes: ['XS','S','M']
    },
    {
        name: 'Campera Bomber Slim Fit Elastizada Chaqueta',
        slug: 'campera-bomber-slim-fit-elastizada-chaqueta',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696601613/campera-bomber-slim-fit-elastizada-chaqueta_syw3lj.webp'],
        price: 49.99,
        countInStockByVariant: {
            'negro-L': 0,
            'negro-XL': 0
        },
        brand: 'Bomber',
        colors: ['negro'],
        sizes: ['L','XL']
    },
    {
        name: 'Campera Elastizada Slim John Algodón',
        slug: 'campera-elastizada-slim-john-algodón',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696601877/campera-elastizada-slim-john-algod%C3%B3n_cqq9dc.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696601877/campera-elastizada-slim-john-algod%C3%B3n-gris_omdwhy.webp'],
        price: 78.99,
        countInStockByVariant: {
            'marron-S': 1,
            'marron-M': 4,
            'marron-XL': 3,
            'gris claro-S': 1,
            'gris claro-M': 0,
            'gris claro-XL': 0
        },
        brand: 'Minimal Cotton',
        colors: ['marron','gris claro'],
        sizes: ['S','M','XL']
    },
    {
        name: 'Camperon Impermeable Microfibra Sin Capucha',
        slug: 'camperon-impermeable-microfibra-sin-capucha',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696602351/camperon-impermeable-microfibra-sin-capucha_xbq8so.webp'],
        price: 67.99,
        countInStockByVariant: {
            'gris oscuro-XS': 3,
            'gris oscuro-S': 1,
            'gris oscuro-M': 1,
            'gris oscuro-L': 2,
        },
        brand: 'Minimal Cotton',
        colors: ['gris oscuro'],
        sizes: ['XS','S','M','L']
    },
    {
        name: 'Campera Dama Training Algodon Slim',
        slug: 'campera-dama-training-algodon-slim',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696602833/campera-dama-training-algodon-slim-verde_xupczp.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696602833/campera-dama-training-algodon-slim-red_ksej2o.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696602832/campera-dama-training-algodon-slim-yellow_bfdckn.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696602833/campera-dama-training-algodon-slim-verdeagua_cgasuf.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696602846/campera-dama-training-algodon-slim-pink_s6wqil.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696602847/campera-dama-training-algodon-slim-azulino_ja1192.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696602847/campera-dama-training-algodon-slim-orange_stx2kk.webp'],
        price: 40.99,
        countInStockByVariant: {
            'verde claro-S': 1,
            'verde claro-M': 0,
            'verde claro-L': 0,
            'rojo-S': 0,
            'rojo-M': 3,
            'rojo-L': 0,
            'amarillo-S': 0,
            'amarillo-M': 1,
            'amarillo-L': 0,
            'verde agua-S': 1,
            'verde agua-M': 5,
            'verde agua-L': 2,
            'rosa claro-S': 0,
            'rosa claro-M': 0,
            'rosa claro-L': 1,
            'gris oscuro-S': 4,
            'gris oscuro-M': 0,
            'gris oscuro-L': 0,
            'naranja-S': 0,
            'naranja-M': 0,
            'naranja-L': 0
        },
        brand: 'Minimal Cotton',
        colors: ['verde claro','rojo','amarillo','verde agua','rosa claro','gris oscuro','naranja'],
        sizes: ['S','M','L']
    },
    {
        name: 'Campera Rompevientos Dama Running Con Capucha Bolsillos',
        slug: 'campera-rompevientos-dama-running-con-capucha-bolsillos',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696603390/rompevientos-dama-running-con-capucha-bolsillos-lisa-lila_vldsqo.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696603391/rompevientos-dama-running-con-capucha-bolsillos-lisa-azul_yw9ijl.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696603391/rompevientos-dama-running-con-capucha-bolsillos-lisa-blanco_sc7ehw.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696603392/rompevientos-dama-running-con-capucha-bolsillos-lisa-fucsia_hnxhiz.webp'],
        price: 49.99,
        countInStockByVariant: {
            'lila-S': 3,
            'lila-L': 2,
            'lila-XXL': 1,
            'lila-XXXL': 0,
            'azulino-S': 3,
            'azulino-L': 2,
            'azulino-XXL': 5,
            'azulino-XXXL': 1,
            'blanco-S': 1,
            'blanco-L': 1,
            'blanco-XXL': 4,
            'blanco-XXXL': 2,
            'fucsia-S': 3,
            'fucsia-L': 3,
            'fucsia-XXL': 0,
            'fucsia-XXXL': 0
        }, 
        brand: 'Minimal Cotton',
        colors: ['lila','azulino','blanco','fucsia'],
        sizes: ['S','L','XXL','XXXL']
    },
    {
        name: 'Jean Denim Wide Ancho Recto Tiro Alto Palazzo',
        slug: 'jean-denim-wide-ancho-recto-tiro-alto-palazzo',
        category: 'Pantalones',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697669244/jean-denim_wide-ancho-recto-tiro-alto-palazzo-black_nlltem.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697669243/jean-denim_wide-ancho-recto-tiro-alto-palazzo-celeste_raaswg.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697669237/jean-denim_wide-ancho-recto-tiro-alto-palazzo-azuloscuro_xq9vfa.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697669237/jean-denim_wide-ancho-recto-tiro-alto-palazzo-azul_baoysl.webp'],
        price: 39.99,
        countInStockByVariant: {
            'negro-S': 3,
            'negro-M': 3,
            'celeste-S': 4,
            'celeste-M': 2,
            'azul petróleo-S': 0,
            'azul petróleo-M': 0,
            'azul-S': 2,
            'azul-M': 4,
        },  
        brand: 'Hugs',
        colors: ['negro','celeste','azul petróleo','azul'],
        sizes: ['S','M']
     },
    {
        name: 'Short Bermuda Cargo Corto Jogger Gabardina Elastizada',
        slug: 'short-bermuda-cargo-corto-jogger-gabardina-elastizada',
        category: 'Shorts',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054424/short-bermuda-cargo-corto-jogger-gabardina-elastizada_uxfxka.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054433/short-bermuda-cargo-corto-jogger-gabardina-elastizada-marino_qxwggv.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696620588/short-bermuda-cargo-corto-jogger-gabardina-elastizada-marronclaro_fhtcwi.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696620577/short-bermuda-cargo-corto-jogger-gabardina-elastizada-beige_w0v5pk.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054434/short-bermuda-cargo-corto-jogger-gabardina-elastizada-creama_p69rle.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054445/short-bermuda-cargo-corto-jogger-gabardina-elastizada-verde_ga4bjn.webp'],
        price: 29.99,
        countInStockByVariant: {
            'negro-L': 1,
            'negro-XL': 2,
            'marino-L': 0,
            'marino-XL': 0,
            'marron claro-L': 3,
            'marron claro-XL': 3,
            'latte-L': 4,
            'latte-XL': 0,
            'beige-L': 5,
            'beige-XL': 3,
            'militar-L': 1,
            'militar-XL': 1
        }, 
        brand: 'Sico Urban',
        colors: ['negro','marino','marron claro','latte','beige','militar'],
        sizes: ['L','XL']
    },
    {
        name: 'Buzo Puma Nove Shine Pull Over',
        slug: 'buzo-puma-nove-shine-pull-over',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696606603/buzo-puma-nove-shine-pull-over-black_psgzjb.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696606618/buzo-puma-nove-shine-pull-over-black-front_qeqndb.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696606620/buzo-puma-nove-shine-pull-over-black-back_iv0msk.webp'],
        price: 33.99,
        countInStockByVariant: {
            'negro-S': 4,
            'negro-M': 1,
            'negro-L': 5,
            'negro-XL': 0,
        },
        brand: 'Puma',
        colors: ['negro'],
        sizes: ['S','M','L','XL']
    },
    {
        name: 'Buzo Goth Butterfly Nu Grunge',
        slug: 'buzo-goth-butterfly-nu-grunge',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696606830/buzo-goth-butterfly-nu-grunge_so9919.webp'],
        price: 25.99,
        countInStockByVariant: {
            'negro-M': 3,
            'negro-L': 1,
            'negro-XL': 4,
            'negro-XXL': 2,
            'negro-XXXL': 2
        },
        brand: 'Grafizona',
        colors: ['negro'],
        sizes: ['M','L','XL','XXL','XXXL']
    },
    {
        name: 'Buzo Ruthlessness Goth',
        slug: 'buzo-ruthlessness-goth',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054239/buzo-ruthlessness-goth_bsfd8l.webp'],
        price: 25.99,
        countInStockByVariant: {
            'negro-S': 3,
            'negro-M': 3
        },
        brand: 'Grafizona',
        colors: ['negro'],
        sizes: ['S','M']
    },
    {
        name: 'Buzo Black Pink Canguro Kpop',
        slug: 'buzo-black-pink-canguro-kpop',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054161/buzo-black-pink-canguro-kpop_p6cnrw.webp'],
        price: 25.99,
        countInStockByVariant: {
            'negro-M': 0
        },
        brand: 'Grafizona',
        colors: ['negro'],
        sizes: ['M']
    },
    {
        name: 'Buzo Kingdom Oversize Hoodie Canguro',
        slug: 'buzo-kingdom-oversize-hoodie-canguro',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697500501/buzo-kingdom-oversize-hoodie-canguro-beige_dcu2ft.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697500501/buzo-kingdom-oversize-hoodie-canguro-black_osc63p.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697680339/buzo-kingdom-oversize-hoodie-canguro-celeste_xxdy3e.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697652572/buzo-kingdom-oversize-hoodie-canguro-verdeagua_dzfbku.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697500559/buzo-kingdom-oversize-hoodie-canguro-militar_bt9zuc.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697500670/buzo-kingdom-oversize-hoodie-canguro-rosaclaro_wkfltz.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697652534/buzo-kingdom-oversize-hoodie-canguro-naranja_bobk0d.webp'],
        price: 35.99,
        countInStockByVariant: {
            'tostado-XS': 1,
            'tostado-S': 2,
            'tostado-M': 5,
            'tostado-L': 3,
            'negro-XS': 2,
            'negro-S': 2,
            'negro-M': 3,
            'negro-L': 5,
            'turquesa claro-XS': 0,
            'turquesa claro-S': 0,
            'turquesa claro-M': 0,
            'turquesa claro-L': 0,
            'verde agua-XS': 2,
            'verde agua-S': 3,
            'verde agua-M': 1,
            'verde agua-L': 0,
            'militar-XS': 0,
            'militar-S': 0,
            'militar-M': 0,
            'militar-L': 0,
            'rosa claro-XS': 1,
            'rosa claro-S': 1,
            'rosa claro-M': 0,
            'rosa claro-L': 0,
            'naranja-XS': 0,
            'naranja-S': 2,
            'naranja-M': 2,
            'naranja-L': 6
        },
        brand: 'Kingdom',
        colors: ['tostado','negro','turquesa claro','verde agua','militar','rosa claro','naranja'],
        sizes: ['XS','S','M','L']
    },
    {
        name: 'Buzo Los Angeles California',
        slug: 'buzo-los-angeles-california',
        category: 'Buzos',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697053834/buzo-los-angeles-california_f8y9xc.webp'],
        price: 40.99,
        countInStockByVariant: {
            'blanco-M': 4,
            'blanco-L': 3
        },
        brand: 'Thrasher',
        colors: ['blanco'],
        sizes: ['M','L']
    },
    {
        name: 'Short Under Armour Vanish Woven Training',
        slug: 'short-under-armour-vanish-woven-training',
        category: 'Shorts',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697503327/short-under-armour-vanish-woven-training_onocog.webp'],
        price: 17.99,
        countInStockByVariant: {
            'negro-S': 1,
            'negro-M': 5,
            'negro-L': 2,
            'negro-XL': 4,
            'negro-XXL': 2,
        },
        brand: 'Under Armour',
        colors: ['negro'],
        sizes: ['S','M','L','XL','XXL']
    },
    {
        name: 'Campera Under Armour Sportstyle Terry Fzip Training',
        slug: 'campera-under-armour-sportstyle-terry-fzip-training',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697054065/campera-under-armour-sportstyle-terry-fzip-training_kmdodd.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697054065/campera-under-armour-sportstyle-terry-fzip-training-lightgray_l9r3xx.webp'],
        price: 44.99,
        countInStockByVariant: {
            'negro-XS': 0,
            'negro-S': 0,
            'negro-M': 0,
            'negro-L': 0,
            'negro-XL': 0,
            'gris claro-XS': 0,
            'gris claro-S': 0,
            'gris claro-M': 0,
            'gris claro-L': 0,
            'gris claro-XL': 0,
        },
        brand: 'Under Armour',
        colors: ['negro','gris claro'],
        sizes: ['XS','S','M','L','XL']
    },
    {
        name: 'Campera Rompeviento Anorak Combinado Capucha',
        slug: 'campera-rompeviento-anorak-combinado-capucha',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1697053909/campera-rompeviento-anorak-combinado-capucha_hixowy.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697053908/campera-rompeviento-anorak-combinado-capucha-red_arknh9.webp','https://res.cloudinary.com/duihep83l/image/upload/v1697053909/campera-rompeviento-anorak-combinado-capucha-gray_ualezg.webp'],
        price: 64.99,
        countInStockByVariant: {
            'gris-S': 2,
            'gris-M': 1,
            'gris-L': 1,
            'gris-XL': 5,
            'gris-XXL': 3,
            'gris-XXXL': 2,
            'rojo-S': 2,
            'rojo-M': 1,
            'rojo-L': 4,
            'rojo-XL': 3,
            'rojo-XXL': 0,
            'rojo-XXXL': 1,
            'militar-S': 4,
            'militar-M': 3,
            'militar-L': 0,
            'militar-XL': 5,
            'militar-XXL': 0,
            'militar-XXXL': 2
        },
        brand: 'Minimal Cotton',
        colors: ['gris','rojo','militar'],
        sizes: ['S','M','L','XL','XXL','XXXL']
    },
    {
        name: 'Chomba Lisa Lacoste',
        slug: 'chomba-lisa-lacoste',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696612861/chomba-isa-lacoste_ibow3p.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696612861/chomba-isa-lacoste-gray_nitoqx.webp'],
        price: 19.99,
        countInStockByVariant: {
            'marino-M': 3,
            'marino-L': 4,
            'marino-XL': 2,
            'marino-XXL': 2,
            'gris claro-M': 1,
            'gris claro-L': 1,
            'gris claro-XL': 5,
            'gris claro-XXL': 3
        },
        brand: 'Lacoste',
        colors: ['marino','gris claro'],
        sizes: ['M','L','XL','XXL']
    },
    {
        name: 'Chomba De Pique Con Guarda Pampa',
        slug: 'chomba-de-pique-con-guarda-pampa',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696613271/chomba-de-pique-con-guarda-pampa_xwjojw.webp'],
        price: 29.99,
        countInStockByVariant: {
            'negro-S': 3,
            'negro-M': 2,
            'negro-L': 4,
        },
        brand: 'Lacoste',
        colors: ['negro'],
        sizes: ['S','M','L']
    },
    {
        name: 'Remera Los Angeles Oversize Lisa',
        slug: 'remera-los-angeles-oversize-lisa',
        category: 'Remeras',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696613653/remera-los-angeles-oversize-black_mtdroj.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696613653/remera-los-angeles-oversize-geige_poyi54.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696613654/remera-los-angeles-oversize-brown_uxar37.webp'],
        price: 19.99,
        countInStockByVariant: {
            'negro-M': 4,
            'negro-L': 3,
            'negro-XL': 1,
            'manteca-M': 2,
            'manteca-L': 2,
            'manteca-XL': 1,
            'marron-M': 2,
            'marron-L': 4,
            'marron-XL': 3
        },
        brand: 'Thrasher',
        colors: ['negro','manteca','marron'],
        sizes: ['M','L','XL']
    },
    {
        name: 'Saco Blazer Mujer',
        slug: 'saco-blazer-mujer',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696614304/saco-blazer-mujer_v34kcg.webp'],
        price: 76.99,
        countInStockByVariant: {
            'azul-S': 2,
            'azul-L': 4
        },
        brand: 'Bross',
        colors: ['azul'],
        sizes: ['S','L']
    },
    {
        name: 'Saco Blazer Mujer Sastrero Forrado Entallado',
        slug: 'saco-blazer-mujer-sastrero-forrado-entallado',
        category: 'Camperas',
        images: ['https://res.cloudinary.com/duihep83l/image/upload/v1696614900/saco-blazer-mujer-sastrero-forrado-entallado-black_urik7p.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696614895/saco-blazer-mujer-sastrero-forrado-entallado-white_xgdm7s.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696614896/saco-blazer-mujer-sastrero-forrado-entallado-celeste_ax1cqh.webp','https://res.cloudinary.com/duihep83l/image/upload/v1696614895/saco-blazer-mujer-sastrero-forrado-entallado-marronclaro_ei6ue1.webp'],
        price: 84.99,
        countInStockByVariant: {
            'negro-M': 2,
            'negro-L': 3,
            'negro-XL': 2,
            'blanco-M': 5,
            'blanco-L': 2,
            'blanco-XL': 3,
            'celeste-M': 5,
            'celeste-L': 1,
            'celeste-XL': 1,
            'marron claro-M': 0,
            'marron claro-L': 0,
            'marron claro-XL': 2
        },
        brand: 'Bross',
        colors: ['negro','blanco','celeste','marron claro'],
        sizes: ['M','L','XL']
    },
];