
import Schedule from "../../components/schedule/Schedule";

const SchedulePage = () => {
  return (
    <div className="w-full min-h-screen bg-[#0d0d0d] text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#ff3d7f]">Anime Schedule</h1>
          <p className="mt-2 text-gray-400">Stay updated with the latest anime releases</p>
        </div>
        <div className="bg-[#1a1a1a] rounded-lg shadow-xl p-6">
          <Schedule />
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
