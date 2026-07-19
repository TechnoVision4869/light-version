import { useState } from 'react';
import { useAuth } from './hooks/use-auth';
import { APP_CONFIG } from '../config/appConfig';
import { preloadDeveloperBackground } from '../lib/preloadDeveloperBackground';
import DeveloperSelector from './DeveloperSelector';
import ProjectSelector from './ProjectSelector';
import Layout from './Layout';

export default function SelectionFlow({ onProjectSelect }) {
  const useStatic = APP_CONFIG.USE_STATIC;
  const { user } = useAuth();
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  // Roles that need to select a developer
  const needsDeveloperSelection = ['admin', 'system_admin', 'system_technician'];
  
  // Roles that have a pre-assigned developer
  const hasDeveloperAssigned = ['developer_admin', 'developer_marketing', 'developer_sales'];

  const userNeedsSelection = needsDeveloperSelection.includes(user?.role);

  const handleDeveloperSelect = async (developer) => {
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
      onBackButtonClick={() => setSelectedDeveloper(null)}
    />
  );
}
