import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const CapsuleContext = createContext();

// Custom hook to use the capsule context
export const useCapsules = () => {
  const context = useContext(CapsuleContext);
  if (!context) {
    throw new Error('useCapsules must be used within a CapsuleProvider');
  }
  return context;
};

// Provider component
export const CapsuleProvider = ({ children }) => {
  const [capsules, setCapsules] = useState([]);
  
  // Load capsules from localStorage on mount
  useEffect(() => {
    const savedCapsules = localStorage.getItem('timeCapsules');
    if (savedCapsules) {
      setCapsules(JSON.parse(savedCapsules));
    }
  }, []);
  
  // Save capsules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('timeCapsules', JSON.stringify(capsules));
  }, [capsules]);

  // Add a new capsule
  const addCapsule = (capsule) => {
    const newCapsule = {
      ...capsule,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setCapsules(prevCapsules => [...prevCapsules, newCapsule]);
    return newCapsule.id;
  };

  // Delete a capsule
  const deleteCapsule = (id) => {
    setCapsules(prevCapsules => prevCapsules.filter(capsule => capsule.id !== id));
  };

  // Get remaining time for a capsule
  const getRemainingTime = (unlockDate) => {
    const now = new Date();
    const unlock = new Date(unlockDate);
    const diff = unlock - now;
    
    if (diff <= 0) return { expired: true, timeString: 'Unlocked' };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 30) {
      const months = Math.floor(days / 30);
      return { 
        expired: false,
        timeString: `${months} month${months > 1 ? 's' : ''} left` 
      };
    }
    
    if (days > 0) {
      return { expired: false, timeString: `${days} day${days > 1 ? 's' : ''} left` };
    }
    
    if (hours > 0) {
      return { expired: false, timeString: `${hours} hour${hours > 1 ? 's' : ''} left` };
    }
    
    return { expired: false, timeString: `${minutes} minute${minutes > 1 ? 's' : ''} left` };
  };

  // Check if a capsule is unlocked
  const isCapsuleUnlocked = (unlockDate) => {
    return new Date(unlockDate) <= new Date();
  };
  
  const value = {
    capsules,
    addCapsule,
    deleteCapsule,
    getRemainingTime,
    isCapsuleUnlocked
  };
  
  return (
    <CapsuleContext.Provider value={value}>
      {children}
    </CapsuleContext.Provider>
  );
};