// components/YoutubeEmbed.jsx
const YoutubeEmbed = ({ videoId }) => {
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
