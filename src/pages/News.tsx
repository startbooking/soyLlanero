
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Search, User, Heart, Share2 } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const News = () => {
  const [currentLanguage, setCurrentLanguage] = useState("es");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [likedArticles, setLikedArticles] = useState<number[]>([]);

  const news = [
    {
      id: 1,
      title: "Villavicencio lanza nueva ruta turística ecológica",
      excerpt: "La nueva ruta conecta los principales atractivos naturales de la región con un enfoque sostenible.",
      content: "La Alcaldía de Villavicencio, en conjunto con el sector turístico, ha lanzado oficialmente la nueva ruta turística ecológica 'Senderos Verdes de los Llanos'. Esta iniciativa conecta los principales atractivos naturales de la región incluyendo el Bioparque Los Ocarros, las reservas naturales del río Guatiquía y los humedales de la zona. La ruta ha sido diseñada con un enfoque completamente sostenible, promoviendo el turismo responsable y la conservación del medio ambiente. Los visitantes podrán disfrutar de senderos interpretativos, avistamiento de fauna nativa y actividades de educación ambiental.",
      date: "2024-06-05",
      category: "Turismo",
      author: "Clúster de Turismo",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
      likes: 45
    },
    {
      id: 2,
      title: "Festival Llanero 2024: Un éxito rotundo",
      excerpt: "Más de 50,000 visitantes disfrutaron del festival cultural más importante de los llanos.",
      content: "El Festival Llanero 2024 concluyó con cifras récord de asistencia, superando las 50,000 personas durante los cuatro días del evento. El festival, que se realizó en el Parque Los Fundadores, contó con la participación de más de 200 artistas nacionales e internacionales, incluyendo los mejores exponentes del joropo y la música llanera. Los eventos de coleo atrajeron a participantes de todo el país, mientras que la muestra gastronómica permitió a los visitantes degustar los platos más tradicionales de la región. El impacto económico del festival se estima en más de 2 mil millones de pesos para la ciudad.",
      date: "2024-06-03",
      category: "Eventos",
      author: "Redacción",
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=250&fit=crop",
      likes: 78
    },
    {
      id: 3,
      title: "Nuevas medidas de sostenibilidad en hoteles locales",
      excerpt: "Los hoteles de Villavicencio implementan prácticas eco-amigables para reducir su impacto ambiental.",
      content: "La industria hotelera de Villavicencio ha dado un paso importante hacia la sostenibilidad con la implementación del programa 'Hoteles Verdes de los Llanos'. Más de 15 establecimientos hoteleros han adoptado medidas como el uso de energías renovables, sistemas de reciclaje de aguas grises, eliminación de plásticos de un solo uso y programas de reforestación. Estas iniciativas no solo contribuyen a la conservación del medio ambiente, sino que también generan ahorros significativos en costos operativos. Los huéspedes pueden ahora disfrutar de una estadía más sostenible mientras contribuyen a la preservación de los ecosistemas llaneros.",
      date: "2024-06-01",
      category: "Sostenibilidad",
      author: "Equipo Ambiental",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      likes: 32
    }
  ];

  const handleLike = (articleId: number) => {
    setLikedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleShare = (article: any) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
      alert("Enlace copiado al portapapeles");
    }
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        <Header activeSection="news" onSectionChange={() => {}} language={currentLanguage} />
        
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                onClick={() => setSelectedArticle(null)}
                className="mb-6"
              >
                ← Volver a noticias
              </Button>
              
              <article className="space-y-6">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-primary">
                    {selectedArticle.category}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-foreground">
                    {selectedArticle.title}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedArticle.date).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedArticle.author}
                    </div>
                  </div>
                  
                  <div className="prose max-w-none text-foreground">
                    <p className="text-lg leading-relaxed">
                      {selectedArticle.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-6 border-t">
                    <Button
                      variant={likedArticles.includes(selectedArticle.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLike(selectedArticle.id)}
                      className="flex items-center gap-2"
                    >
                      <Heart className={`w-4 h-4 ${likedArticles.includes(selectedArticle.id) ? 'fill-current' : ''}`} />
                      Me gusta ({selectedArticle.likes + (likedArticles.includes(selectedArticle.id) ? 1 : 0)})
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(selectedArticle)}
                      className="flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Header activeSection="news" onSectionChange={() => {}} language={currentLanguage} />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Noticias del Turismo
              </h1>
              <p className="text-xl text-muted-foreground">
                Mantente informado sobre las últimas novedades del sector turístico en Villavicencio
              </p>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar noticias..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Lista de noticias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">
                      {article.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString('es-ES')}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedArticle(article)}
                    >
                      Leer más
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Anterior
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
