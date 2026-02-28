import { useEffect, useState } from 'react';
import { developerApi } from "../api/admin/developerApi";
import Layout from './Layout';
import toast from 'react-hot-toast';
import { assetsApi } from '@/api/assetsApi';

export default function DeveloperSelector({ onDeveloperSelect }) {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevelopers = async () => {
    try {
      setLoading(true);
      const response = await developerApi.getAll();
      setDevelopers(response);
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
    // const response = await assetsApi.
    return developer?.logo || developer?.logoUrl || '/default-logo.png';
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
                  className="w-[300px] rounded-2xl overflow-hidden backdrop-blur-sm bg-[#1C1C1C8C] cursor-pointer hover:bg-[#2C2C2C8C] transition-colors duration-300"
                  onClick={() => onDeveloperSelect(developer)}
                >
                  <div className="px-3 pt-3">
                    <img
                      src={getDeveloperLogo(developer)}
                      alt={developer.name}
                      className="rounded-2xl w-full h-48 object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="tracking-wide text-lg font-semibold text-white mb-1">
                      {developer.name}
                    </h2>
                    <p className="text-[#DADADA] text-[11px] mb-4">
                      {developer.description || 'Real estate development'}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeveloperSelect(developer);
                      }}
                      className="w-full py-2 px-4 bg-transparent border border-white hover:bg-white hover:text-black hover:border-white text-white font-medium rounded-xl transition-colors duration-300"
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
