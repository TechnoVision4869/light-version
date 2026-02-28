import { useState } from 'react';
import { useAuth } from './hooks/use-auth';
import DeveloperSelector from './DeveloperSelector';
import ProjectSelector from './ProjectSelector';
import Layout from './Layout';

export default function SelectionFlow({ onProjectSelect }) {
  const { user } = useAuth();
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  // Roles that need to select a developer
  const needsDeveloperSelection = ['admin', 'system_admin', 'system_technician'];
  
  // Roles that have a pre-assigned developer
  const hasDeveloperAssigned = ['developer_admin', 'developer_marketing', 'developer_sales'];

  const userNeedsSelection = needsDeveloperSelection.includes(user?.role);

  // If user needs to select a developer and hasn't yet, show DeveloperSelector
  if (userNeedsSelection && !selectedDeveloper) {
    return <DeveloperSelector onDeveloperSelect={setSelectedDeveloper} />;
  }

  // If user has selected a developer or has one pre-assigned, show ProjectSelector
  const developerId = selectedDeveloper?.id || user?.developerId;

  if (!developerId) {
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
