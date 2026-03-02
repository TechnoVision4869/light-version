import { useState } from 'react';
import { useAuth } from './hooks/use-auth';
import DeveloperSelector from './DeveloperSelector';
import ProjectSelector from './ProjectSelector';
import Layout from './Layout';

export default function SelectionFlow({ onProjectSelect, useMockup = false }) {
  const { user } = useAuth();
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  // Roles that need to select a developer
  const needsDeveloperSelection = ['admin', 'system_admin', 'system_technician'];
  
  // Roles that have a pre-assigned developer
  const hasDeveloperAssigned = ['developer_admin', 'developer_marketing', 'developer_sales'];

  const userNeedsSelection = needsDeveloperSelection.includes(user?.role);

  // Skip developer selection if useMockup is true
  if (!useMockup && userNeedsSelection && !selectedDeveloper) {
    return <DeveloperSelector onDeveloperSelect={setSelectedDeveloper} />;
  }

  // If user has selected a developer or has one pre-assigned, show ProjectSelector
  const developerId = useMockup ? 'mockup' : (selectedDeveloper?.id || user?.developerId);

  if (!useMockup && !developerId) {
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
      useMockup={useMockup}
    />
  );
}
