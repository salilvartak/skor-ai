// src/pages/ProfileSetup.tsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/firebase';
import { updateProfile, User as FirebaseUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    photoURL: user?.photoURL || '',
    city: '',
    state: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveProfile = async () => {
    if (user) {
      try {
        await updateProfile(user, {
          displayName: formData.fullName,
          photoURL: formData.photoURL,
        });
        // Here you would also save city and state to a database like Firestore
        console.log('Profile updated successfully!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back p-4">
      <Card className="w-full max-w-xl bg-white/10 border border-white/20 text-white rounded-2xl shadow-2xl backdrop-blur-xl">
        <CardHeader className="text-center p-6">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24 border-2 border-accent">
              <AvatarImage src={formData.photoURL} alt={formData.fullName} />
              <AvatarFallback className="bg-accent text-white text-3xl">
                {getUserInitials(formData.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription className="text-gray-400">Add a few more details to get started.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Full Name</Label>
            <Input 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              placeholder="Your Name" 
              className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Profile Picture URL</Label>
            <Input 
              name="photoURL" 
              value={formData.photoURL} 
              onChange={handleChange} 
              placeholder="Enter image URL" 
              className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">City</Label>
              <Input 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                placeholder="City" 
                className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">State</Label>
              <Input 
                name="state" 
                value={formData.state} 
                onChange={handleChange} 
                placeholder="State" 
                className="w-full bg-white/5 border-white/20 text-white placeholder-gray-500"
              />
            </div>
          </div>
          <div className="pt-4">
            <Button className="w-full bg-accent hover:bg-accent/80" onClick={handleSaveProfile}>
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;