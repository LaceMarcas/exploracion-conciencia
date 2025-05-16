import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface ArticleInfo {
  id: string;
  title: string;
  path: string;
}

interface ArticlePageProps {
  articles: ArticleInfo[];
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articles }) => {
  const { articleId } = useParams<{ articleId: string }>();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentArticle = articles.find(article => article.id === articleId);
  const currentIndex = articles.findIndex(article => article.id === articleId);

  useEffect(() => {
    if (currentArticle) {
      setIsLoading(true);
      setError(null);
      fetch(`/html_content/${currentArticle.path}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudo cargar el artículo.`);
          }
          return response.text();
        })
        .then(data => {
          setHtmlContent(data);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error fetching article:", err);
          setError(err.message || "Ocurrió un error al cargar el contenido del artículo.");
          setIsLoading(false);
        });
    } else {
      setError("Artículo no encontrado.");
      setIsLoading(false);
    }
  }, [articleId, currentArticle]);

  if (isLoading) {
    return <div className="text-center py-10">Cargando artículo...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  }

  if (!currentArticle) {
    return <div className="text-center py-10 text-red-600">Artículo no encontrado.</div>;
  }

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 break-words">{currentArticle.title}</h1>
      <div 
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed article-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      
      <div className="mt-10 pt-6 border-t border-gray-300 flex justify-between items-center">
        <div>
          {prevArticle && (
            <Link 
              to={`/articulo/${prevArticle.id}`} 
              className="text-blue-700 hover:text-blue-900 hover:underline transition duration-150 ease-in-out"
            >
              &larr; {prevArticle.title}
            </Link>
          )}
        </div>
        <div>
          {nextArticle && (
            <Link 
              to={`/articulo/${nextArticle.id}`} 
              className="text-blue-700 hover:text-blue-900 hover:underline transition duration-150 ease-in-out"
            >
              {nextArticle.title} &rarr;
            </Link>
          )}
        </div>
      </div>
      <div className="mt-6 text-center">
        <Link 
          to="/" 
          className="text-lg text-blue-700 hover:text-blue-900 hover:underline transition duration-150 ease-in-out"
        >
          Volver a la Página de Inicio
        </Link>
      </div>
    </div>
  );
};

export default ArticlePage;

