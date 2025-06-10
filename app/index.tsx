import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to welcome screen immediately
    router.replace('/welcome');
  }, []);

  return null;
}