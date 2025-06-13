// components/YoutubeEmbed.jsx
const YoutubeEmbed = ({ youtubeUrl }) => {
  if (!youtubeUrl) return null;

  // Función para extraer el videoId de diferentes formatos de enlaces de YouTube
  const extractVideoId = (url) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      if (hostname.includes('youtube.com')) {
        return parsedUrl.searchParams.get('v');
      }

      if (hostname.includes('youtu.be')) {
        return parsedUrl.pathname.slice(1);
      }

      return null;
    } catch (error) {
      console.error("URL inválida:", error);
      return null;
    }
  };

  const videoId = extractVideoId(youtubeUrl);

  if (!videoId) return <p className="text-red-500">URL de YouTube no válida</p>;

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg mt-5">
      <div className="relative w-full h-[300px] md:h-[500px]">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Video del vehículo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default YoutubeEmbed;
