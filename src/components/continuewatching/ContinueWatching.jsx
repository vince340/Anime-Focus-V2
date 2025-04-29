
import { Link } from 'react-router-dom';

export default function ContinueWatching() {
  const watchHistory = JSON.parse(localStorage.getItem('continueWatching') || '[]');

  if (watchHistory.length === 0) return null;

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Continue Watching</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {watchHistory.map((anime) => (
          <Link
            key={`${anime.id}-${anime.episodeId}`}
            to={`/watch/${anime.id}?ep=${anime.episodeId}`}
            className="relative group overflow-hidden rounded-lg"
          >
            <img
              src={anime.poster}
              alt={anime.title}
              className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
              <p className="text-sm font-medium line-clamp-1">{anime.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
