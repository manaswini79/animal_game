import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  const navigateToPage1 = () => {
    history.push('/page1');
  };

  return (
    <div style={styles.container}>
      <img src="images/Animal.png" alt="Description of Image" style={styles.image} />
      <button style={styles.button} onClick={navigateToPage1}>
        Start playing
      </button>
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
  image: {
    width: '400px', 
    height: 'auto',
    marginBottom: '20px', 
  },
  button: {
    padding: '20px 40px',
    fontSize: '24px',
    fontFamily: 'Rocher',
    backgroundColor: '#89CFF0', 
    color: '#000000', 
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
};

export default Home;
