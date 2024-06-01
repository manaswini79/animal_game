import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

function Last() {

useEffect(() => {
    
    confetti({
      particleCount: 150,
      spread: 200,
      origin: { y: 0.5 },
    });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.message}>Completed Level 1!</h1>
      <img src="images/star.jpeg" alt="Completion" style={styles.image} />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 1450,
    height: '100vh',
    backgroundColor: '#FFFFFF', 
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Rocher',
    fontSize: '50px',
    color: '#000000', 
    margin: '0 0 20px 0',
  },
  image: {
    width: '400px', 
    height: 'auto',
  },

};

export default Last;
