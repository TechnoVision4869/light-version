import { useState } from 'react';
import { useAuth } from './hooks/use-auth';
import { APP_CONFIG } from '../config/appConfig';
import { preloadDeveloperBackground } from '../lib/preloadDeveloperBackground';
import { DEVELOPER_STORAGE_KEY } from '../constants/storageKeys';
import DeveloperSelector from './DeveloperSelector';
import ProjectSelector from './ProjectSelector';
import Layout from './Layout';

export default function SelectionFlow({ onProjectSelect }) {
  const useStatic = APP_CONFIG.USE_STATIC;
  const { user } = useAuth();
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  // Roles that need to select a developer; all other roles (developer_admin,
  // developer_marketing, developer_sales) have one pre-assigned via user.developerId
  const needsDeveloperSelection = ['admin', 'system_admin', 'system_technician'];

  const userNeedsSelection = needsDeveloperSelection.includes(user?.role);

  const handleDeveloperSelect = async (developer) => {
    // Persist immediately on click, not tied to preloadDeveloperBackground finishing —
    // that call can be slow/fail on weak connectivity, but the developer id is already
    // known here regardless.
    localStorage.setItem(DEVELOPER_STORAGE_KEY, developer.id);
    await preloadDeveloperBackground(developer.id);
    setSelectedDeveloper(developer);
  };

  // Skip developer selection if useStatic is true
  if (!useStatic && userNeedsSelection && !selectedDeveloper) {
    return <DeveloperSelector onDeveloperSelect={handleDeveloperSelect} />;
  }

  // If user has selected a developer or has one pre-assigned, show ProjectSelector
  const developerId = useStatic ? 'developer-id' : (selectedDeveloper?.id || user?.developerId);

  if (!useStatic && !developerId) {
    return (
      <Layout>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="text-white text-lg">Unable to load projects</div>
        </div>
      </Layout>
    );
  }

  return (
    <ProjectSelector
      developerId={developerId}
      onProjectSelect={onProjectSelect}
      onBackButtonClick={() => {
        localStorage.removeItem(DEVELOPER_STORAGE_KEY);
        setSelectedDeveloper(null);
      }}
    />
  );
}
