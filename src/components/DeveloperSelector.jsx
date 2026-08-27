import { useEffect, useState } from "react";
import { developerApi } from "../api/admin/developerApi";
import Layout from "./Layout";
import toast from "react-hot-toast";
import { assetApi } from "../api/admin/assetApi";
const DEFAULT_LOGO = '/default-logo.png';

export default function DeveloperSelector({ onDeveloperSelect }) {
  const [developers, setDevelopers] = useState([]);
  const [developerLogos, setDeveloperLogos] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectingId, setSelectingId] = useState(null);

  const handleSelect = async (developer) => {
    if (selectingId) return;
    setSelectingId(developer.id);
    try {
      await onDeveloperSelect(developer);
    } finally {
      setSelectingId(null);
    }
  };

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const response = await developerApi.getAll();

      if (!response || !Array.isArray(response) || response.length === 0) {
        setDevelopers([]);
        setLoading(false);
        return;
      }

      setDevelopers(response);
      const logos = {};

      for (const developer of response) {
        if (developer.logoAssetId) {
          try {
            const url = await assetApi.getAssetFileUrl(developer.logoAssetId);
            if (url) {
              logos[developer.id] = url;
            }
          } catch (error) {
            console.error(
              `Failed to fetch logo for developer ${developer.id}:`,
              error,
            );
          }
        }
      }
      setDeveloperLogos(logos);
    } catch (error) {
      console.error("Error fetching developers:", error);
      toast.error("Failed to fetch developers");
      setDevelopers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const getDeveloperLogo = (developer) => {
    // Return developer logo or a default placeholder
    return developerLogos[developer.id];
  };

  if (loading) {
    return (
      <Layout fullscreen={true} showHeader={false}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-lg">Loading developers...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout fullscreen={true} showHeader={false}>
      <div className="w-full h-full flex flex-col items-center justify-start pt-8">
        <div className="flex-1 flex flex-col items-center justify-center w-full px-4">
          {developers.length === 0 ? (
            <div className="w-full rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1C1C1C8C]">
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <h2 className="tracking-wide text-2xl font-semibold text-white mb-3">
                  No Developers Available
                </h2>
                <p className="text-[#DADADA] text-sm mb-6">
                  There are currently no developers to display.
                </p>
              </div>
            </div>
          ) : (
            <>
              <h1 className="tracking-wide text-2xl sm:text-3xl font-semibold text-white mb-8">
                Select a Developer
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
                {developers.map((developer) => (
                  <div
                    key={developer.id}
                    className={`relative w-[170px] min-h-[170px] flex flex-col justify-around gap-3 px-4 py-3 shadow-lg rounded-2xl backdrop-blur-sm bg-[#1C1C1C8C] transition-all duration-300
                      ${selectingId === developer.id ? "opacity-60 cursor-wait" : "cursor-pointer hover:bg-[#2C2C2C8C] hover:-translate-y-1 hover:shadow-xl"}`}
                    onClick={() => handleSelect(developer)}
                  >
                    {selectingId === developer.id && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/30">
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin mt-9" />
                      </div>
                    )}

                    <div className="w-full h-30 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
                      <img
                        src={getDeveloperLogo(developer) || DEFAULT_LOGO}
                        alt={developer.name}
                        className="max-w-full max-h-full px-2 object-contain"
                      />
                    </div>

                    <h2 className="tracking-wide text-sm sm:text-base font-semibold text-white text-center line-clamp-2">
                      {developer.name}
                    </h2>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
