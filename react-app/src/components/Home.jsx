import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={styles.container}>

            <Link to="/page1" style={styles.link}>
                <button style={styles.button}>Start Playing</button>
            </Link>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Ensure the container takes up the full height of the viewport
    },
    link: {
        textDecoration: 'none',
    },
    button: {
        padding: '10px 20px',
        fontSize: '18px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default Home;
