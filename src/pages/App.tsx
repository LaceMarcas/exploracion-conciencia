import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import ArticlePage from './ArticlePage';
import './App.css';

const articles = [
  { id: '01', title: 'Artículo 1: El Enigma de la Conciencia', path: 'articulo_01_conciencia.html' },
  { id: '02', title: 'Artículo 2: El Despertar Interior', path: 'articulo_02_autoconocimiento.html' },
  { id: '03', title: 'Artículo 3: El Poder de la Mente', path: 'articulo_03_mente.html' },
  { id: '04', title: 'Artículo 4: La Brújula Existencial', path: 'articulo_04_proposito.html' },
  { id: '05', title: 'Artículo 5: La Percepción de lo Real', path: 'articulo_05_realidad.html' },
  { id: '06', title: 'Artículo 6: El Dinero y sus Espejismos', path: 'articulo_06_dinero.html' },
  { id: '07', title: 'Artículo 7: El Cosmos y la Búsqueda de Sentido', path: 'articulo_07_cosmos.html' },
  { id: '08', title: 'Artículo 8 (Conclusión): Hacia una Síntesis Integradora', path: 'articulo_08_conclusion.html' },
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-800 font-serif">
        <header className="bg-white shadow-md sticky top-0 z-50">
          <nav className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-700 hover:text-gray-900 mb-4 sm:mb-0">Tesina Filosófica</Link>
            <ul className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
              <li><Link to="/" className="hover:text-blue-600">Inicio</Link></li>
              {articles.map(article => (
                <li key={article.id}>
                  <Link to={`/articulo/${article.id}`} className="hover:text-blue-600 text-sm">{`Art. ${article.id}`}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<HomePage articles={articles} />} />
            <Route path="/articulo/:articleId" element={<ArticlePage articles={articles} />} />
          </Routes>
        </main>

        <footer className="bg-white shadow-inner mt-12 py-6 text-center text-gray-600">
          <p>&copy; 2025 Tesina Filosófica. Todos los derechos reservados.</p>
          <p>Desarrollado por Manus</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

