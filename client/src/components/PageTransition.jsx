import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage('fadeOut');
  }, [location, displayLocation]);

  return (
    <div
      className={`animate-fade-in w-full`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn');
          setDisplayLocation(location);
        }
      }}
    >
      {children}
    </div>
  );
};

// Simplified version for this specific request to ensure it just fades IN on mount/route change
// The above complex logic is often overkill if not using AnimatePresence from framer-motion.
// Let's stick to a simpler key-based re-mount animation.

const SimplePageTransition = ({ children }) => {
  return (
    <div className="animate-fade-in w-full">
      {children}
    </div>
  );
};

export default SimplePageTransition;
