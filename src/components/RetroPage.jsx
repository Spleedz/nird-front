import React, { useEffect } from 'react';

/**
 * Composant qui affiche la page HTML rétro (défi à l'ancienne)
 */
const RetroPage = () => {
  useEffect(() => {
    // Charger le CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/src/components/style.css';
    document.head.appendChild(link);

    // Charger le script
    const script = document.createElement('script');
    script.src = '/src/components/script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Nettoyer lors du démontage
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      overflow: 'auto',
      backgroundColor: '#fff'
    }}>
      <iframe
        src="/src/components/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Page Rétro NIRD"
      />
    </div>
  );
};

export default RetroPage;
