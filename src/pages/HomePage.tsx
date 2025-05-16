import { Link } from 'react-router-dom';

interface ArticleInfo {
  id: string;
  title: string;
  path: string;
}

interface HomePageProps {
  articles: ArticleInfo[];
}

const HomePage: React.FC<HomePageProps> = ({ articles }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Conciencia, Propósito y Realidad: Un Itinerario Filosófico</h1>
      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
        Bienvenido a esta exploración filosófica sobre la conciencia, el propósito y la naturaleza de la realidad. Esta tesina, dividida en ocho artículos interconectados, busca ofrecer una visión multifacética de la experiencia humana, sus desafíos y las vías para la transformación personal y social. Navegue a través de los artículos para adentrarse en cada uno de los temas fundamentales tratados.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Artículos de la Tesina:</h2>
      <ul className="space-y-3">
        {articles.map(article => (
          <li key={article.id} className="border-b border-gray-200 pb-3 mb-3">
            <Link 
              to={`/articulo/${article.id}`} 
              className="text-xl text-blue-700 hover:text-blue-900 hover:underline transition duration-150 ease-in-out"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

