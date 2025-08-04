// src/pages/ProfileSetup.tsx
import { ProfileOverlay } from '@/components/ProfileOverlay';
import { useUser } from '@/hooks/useUser';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const { saveUser } = useUser();
  const navigate = useNavigate();

  const handleSaveProfile = (data: any) => {
    saveUser(data);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back flex items-center justify-center">
      <ProfileOverlay onSave={handleSaveProfile} />
    </div>
  );
};

export default ProfileSetup;