import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase'; // Assuming firebase.ts is in the src directory
import { User as FirebaseUser } from 'firebase/auth';

// Define the UserProfile type for better type safety
interface UserProfile {
  fullName: string;
  email: string;
  avatarUrl?: string;
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes to get the current user
    const unsubscribe = auth.onAuthStateChanged((user: FirebaseUser | null) => {
      if (user) {
        setUserProfile({
          fullName: user.displayName || 'Unnamed User',
          email: user.email || 'No email provided',
          avatarUrl: user.photoURL || undefined,
        });
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back text-white">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back p-4">
      <Card className="w-full max-w-xl bg-white/10 border border-white/20 text-white rounded-2xl shadow-2xl backdrop-blur-xl">
        <CardHeader className="text-center p-6">
          <div className="flex justify-center mb-4">
            <Avatar className="w-24 h-24 border-2 border-accent">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.fullName} />
              <AvatarFallback className="bg-accent text-white text-3xl">
                {userProfile.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-3xl font-bold">{userProfile.fullName}</CardTitle>
          <CardDescription className="text-gray-400">Your Personal Profile</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col space-y-1">
            <h4 className="text-sm font-semibold text-gray-300">Email Address</h4>
            <p className="text-base text-gray-200">{userProfile.email}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="text-sm font-semibold text-gray-300">Member Since</h4>
            <p className="text-base text-gray-200">Date Not Available</p> {/* You can add this logic later */}
          </div>
          <div className="pt-4">
            <Button className="w-full bg-accent hover:bg-accent/80">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
