import { useEffect, useState } from "react";
import { developerApi } from "../api/admin/developerApi";
import Layout from "./Layout";
import toast from "react-hot-toast";
import { assetApi } from "../api/admin/assetApi";
import DEFAULT_LOGO from "../../public/default-logo.png";

export default function DeveloperSelector({ onDeveloperSelect }) {
  const [developers, setDevelopers] = useState([]);
  const [developerLogos, setDeveloperLogos] = useState({});
  const [loading, setLoading] = useState(true);

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
      <Layout>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="text-white text-lg">Loading developers...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full h-screen flex flex-col items-center justify-start pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Select Developer
          </h1>
        </div>
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
            <div className="flex flex-wrap gap-8 xl:gap-10 justify-center">
              {developers.map((developer) => (
                <div
                  key={developer.id}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl backdrop-blur-sm bg-[#1C1C1C8C] cursor-pointer hover:bg-[#2C2C2C8C] transition-colors duration-300"
                  onClick={() => onDeveloperSelect(developer)}
                >
                  <img
                    src={getDeveloperLogo(developer) || DEFAULT_LOGO}
                    alt={developer.name}
                    className="rounded-xl w-full h-24 sm:h-28 lg:h-32 object-cover"
                  />

                  <h2 className="tracking-wide text-sm sm:text-base font-semibold text-white text-center line-clamp-2">
                    {developer.name}
                  </h2>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeveloperSelect(developer);
                    }}
                    className="w-full py-1.5 px-3 text-sm bg-transparent border border-white hover:bg-white hover:text-black hover:border-white text-white font-medium rounded-lg transition-colors duration-300"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
