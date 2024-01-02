import { Footer, Navbar } from "@/components";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import '@/styles/pages/SizesGuide/SizesGuide.scss';
import { Routes } from "@/models";

interface SizesGuideInterface { }

const SizesGuide: React.FC<SizesGuideInterface> = () => {
    const guides = [
        {
            sectionTitle: 'Guía de talles para remeras, camperas y buzos de hombre',
            tableTitle: 'REMERAS, CAMPERAS y BUZOS DE HOMBRE',
            tableHead: ['Etiqueta', 'Pecho', 'Cintura', 'Cadera'],
            tableBody: [
                ['XS', '83 - 86 cm', '71 - 74 cm', '82 - 85 cm'],
                ['S', '87 - 92 cm', '75 - 80 cm', '86 - 91 cm'],
                ['M', '93 - 100 cm', '81 - 88 cm', '92 - 99 cm'],
                ['L', '101 - 106 cm', '89 - 96 cm', '100 - 107 cm'],
                ['XL', '109 - 118 cm', '97 - 106 cm', '108 - 116 cm'],
                ['XXL', '119 - 130 cm', '107 - 119 cm', '117 - 125 cm'],
                ['XXXL', '131 - 142 cm', '120 - 132 cm', '126 - 135 cm'],
            ]
        },
        {
            sectionTitle: 'Guía de talles para pantalones y shorts de hombre',
            tableTitle: 'PANTALONES Y SHORTS DE HOMBRE',
            tableHead: ['Etiqueta', 'Cintura', 'Cadera', 'Tiro'],
            tableBody: [
                ['XS', '71 - 74 cm', '82 - 85 cm', '81 cm'],
                ['S', '75 - 80 cm', '86 - 91 cm', '81.5 cm'],
                ['M', '81 - 88 cm', '92 - 99 cm', '82 cm'],
                ['L', '89 - 96 cm', '100 - 107 cm', '82.5 cm'],
                ['XL', '97 - 106 cm', '108 - 116 cm', '83 cm'],
                ['XXL', '107 - 119 cm', '117 - 125 cm', '82.5 cm'],
                ['XXXL', '120 - 132 cm', '126 - 135 cm', '82 cm'],
            ]
        },
        {
            sectionTitle: 'Guía de talles para remeras, camperas y buzos de mujer',
            tableTitle: 'REMERAS, CAMPERAS y BUZOS DE MUJER',
            tableHead: ['Etiqueta', 'Pecho', 'Cintura', 'Cadera'],
            tableBody: [
                ['XS', '77 - 82 cm', '61 - 66 cm', '86 - 91 cm'],
                ['S', '83 - 88 cm', '67 - 72 cm', '92 - 97 cm'],
                ['M', '89 - 94 cm', '73 - 78 cm', '98 - 103 cm'],
                ['L', '95 - 101 cm', '79 - 85 cm', '104 - 110 cm'],
                ['XL', '102 - 109 cm', '86 - 94 cm', '111 - 117 cm'],
                ['XXL', '110 - 118 cm', '95 - 104 cm', '118 - 125 cm'],
                ['XXXL', '119 - 126 cm', '105 - 114 cm', '126 - 122 cm'],
            ]
        },
        {
            sectionTitle: 'Guía de talles para pantalones y shorts de mujer',
            tableTitle: 'PANTALONES Y SHORTS DE MUJER',
            tableHead: ['Etiqueta', 'Cintura', 'Cadera', 'Tiro de la entrepierna'],
            tableBody: [
                ['XS', '61 - 66 cm', '86 - 91 cm', '78 cm'],
                ['S', '67 - 72 cm', '92 - 97 cm', '78.5 cm'],
                ['M', '73 - 78 cm', '98 - 103 cm', '79 cm'],
                ['L', '79 - 85 cm', '104 - 110 cm', '79.5 cm'],
                ['XL', '86 - 94 cm', '111 - 117 cm', '80 cm'],
                ['XXL', '95 - 104 cm', '118 - 125 cm', '80.5 cm'],
                ['XXXL', '105 - 114 cm', '126 - 132 cm', '90 cm'],
            ]
        },
        {
            sectionTitle: 'Guía de talles para calzas de mujer',
            tableTitle: 'CALZAS DE MUJER',
            tableHead: ['Etiqueta', 'Cintura', 'Cadera', 'Tiro'],
            tableBody: [
                ['XS', '61 - 66 cm', '86 - 91 cm', '78 cm'],
                ['S', '67 - 72 cm', '92 - 97 cm', '78.5 cm'],
                ['M', '73 - 78 cm', '98 - 103 cm', '79 cm'],
                ['L', '79 - 85 cm', '104 - 110 cm', '79.5 cm'],
                ['XL', '86 - 94 cm', '111 - 117 cm', '80 cm'],
                ['XXL', '95 - 104 cm', '118 - 125 cm', '80.5 cm'],
                ['XXXL', '105 - 114 cm', '126 - 132 cm', '90 cm'],
            ]
        },
        {
            sectionTitle: 'Guía de talles para vestidos de mujer',
            tableTitle: 'VESTIDOS DE MUJER',
            tableHead: ['Etiqueta', 'Pecho', 'Cintura', 'Cadera'],
            tableBody: [
                ['XS', '77 - 82 cm', '61 - 66 cm', '86 - 91 cm'],
                ['S', '83 - 88 cm', '67 - 72 cm', '92 - 97 cm'],
                ['M', '89 - 94 cm', '73 - 78 cm', '98 - 103 cm'],
                ['L', '95 - 101 cm', '79 - 85 cm', '104 - 110 cm'],
                ['XL', '102 - 109 cm', '86 - 94 cm', '111 - 117 cm'],
                ['XXL', '110 - 118 cm', '95 - 104 cm', '118 - 125 cm'],
                ['XXXL', '119 - 126 cm', '105 - 114 cm', '126 - 122 cm']
            ]
        }
    ];

    return (
        <>
            <Helmet>
                <title>Guía de Talles - SABRINA</title>
            </Helmet>
            <Navbar />
            <div className='sub-navbar'>
                <h2><Link to={Routes.HOME}>Inicio</Link> / Guía de Talles</h2>
            </div>
            <main className="sizes-guide-main">
                <article>
                    {
                        guides.map((guide, index) => (
                            <section key={index}>
                                <h3>{guide.sectionTitle}</h3>
                                <div className="size-guide__wrapper">
                                    <table className="size-guide__wrapper-table">
                                        <thead>
                                            <tr>
                                                <th colSpan={guide.tableHead.length}>{guide.tableTitle}</th>
                                            </tr>
                                            <tr>
                                                {
                                                    guide.tableHead.map((th, index) => (
                                                        <th key={index}>{th}</th>
                                                    ))
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                guide.tableBody.map((tr, index) => (
                                                    <tr key={index}>
                                                        {
                                                            tr.map((td, index) => (
                                                                <td key={index}>{td}</td>
                                                            ))
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        ))
                    }
                </article>
            </main>
            <Footer />
        </>
    )
}

export default SizesGuide