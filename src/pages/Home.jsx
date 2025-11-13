import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const playerData = JSON.parse(localStorage.getItem('player'));
        if (playerData) {
            setPlayer(playerData);
        } else {
            navigate('/login'); // Redirect if not logged in
        }
    }, [navigate]);

    if (!player) {
        return <div>Loading...</div>;
    }

    // ✅ Use player avatar if available, else show default avatar
    const avatarSrc =
        player.avatar && player.avatar.trim() !== ""
            ? player.avatar
            : "/Images/Avatars/default_avatar.png"; // 👈 place your default image here

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundImage: 'url(/Images/Background/back3.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            }}
        >
            <h1
                style={{
                    color: 'black',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    lineHeight: '1.2',
                }}
            >
                Welcome to Banana Game
                <br />
                <span style={{ color: 'darkorange' }}>{player.name}!</span>
            </h1>

            {/* Player Avatar */}
            <img
                src={avatarSrc}
                alt="Player Avatar"
                style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    marginBottom: '20px',
                    border: '3px solid white',
                    objectFit: 'cover',
                    boxShadow: '0 0 10px rgba(0,0,0,0.4)',
                }}
                onError={(e) => {
                    // 👇 if the image fails to load (broken link)
                    e.target.src = '/Images/Background/av1.jpg';
                }}
            />

            {/* Background GIF */}
            <img
                src="/Images/Background/gigimage3.gif"
                alt="Background Animation 2"
                style={{
                    position: 'absolute',
                    bottom: '1%',
                    right: '8%',
                    width: '350px',
                    height: '200px',
                    zIndex: 0,
                    opacity: 0.8,
                }}
            />

            {/* Buttons */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    width: '200px',
                }}
            >
                <button style={buttonStyle} onClick={() => navigate('/game')}>
                    Play
                </button>
                <button style={buttonStyle} onClick={() => navigate('/rank')}>
                    Rank
                </button>
                <button style={buttonStyle} onClick={() => navigate('/profile')}>
                    Profile
                </button>
                <button style={buttonStyle} onClick={() => navigate('/instructions')}>
                    Instructions
                </button>
                <button style={buttonStyle} onClick={() => navigate('/settings')}>
                    Settings
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out',
};

export default Home;
