import React from 'react';

/**
 * Composant qui affiche la page HTML rétro (défi à l'ancienne)
 */
const RetroPage = () => {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      overflow: 'auto',
      backgroundColor: '#fff'
    }}>
      <iframe
        src="/retro/index.html"
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
