import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Settings() {
    const navigate = useNavigate();
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    // Avatar options
    const avatars = [
        '/Images/Avatars/avatar111.jpg',
        '/Images/Avatars/av1.jpg',
        '/Images/Avatars/av2.jpg',
        '/Images/Avatars/av6.jpg',
        '/Images/Avatars/av7.jpg',
        '/Images/Avatars/avatar3.jpg',
    ];

    const handleAvatarSelect = (avatar) => {
        setSelectedAvatar(avatar);
    };

    const handleSaveAvatar = () => {
        localStorage.setItem('avatar', selectedAvatar);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const handleLogout = async () => {
        try {
            // console.log(localStorage.getItem('token'));

            localStorage.removeItem('token');
            localStorage.removeItem('user_name');
            localStorage.removeItem('avatar');

            // console.log(localStorage.getItem('token'));

            navigate('/login');
        } catch (err) {
            console.log('Logout error:', err);
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundImage: "url('/Images/Background/banantreesunlight.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
            }}
        >
            {/* Back button */}
            <button
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '10px 20px',
                    background: 'yellow',
                    color: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={() => navigate(-1)}
            >
                ⬅ Back
            </button>

            <h1 style={{ marginTop: '60px', fontSize: '2.5rem', color: 'orange' }}>
                Choose Your Avatar
            </h1>

            {/* Avatar Selection */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
                {avatars.map((avatar, idx) => (
                    <img
                        key={idx}
                        src={avatar}
                        alt={`Avatar ${idx + 1}`}
                        onClick={() => handleAvatarSelect(avatar)}
                        style={{
                            width: '100px',
                            height: '100px',
                            margin: '10px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            border: avatar === selectedAvatar ? '4px solid #00FF00' : '4px solid transparent',
                            boxShadow: avatar === selectedAvatar ? '0 0 15px #00FF00' : '0 0 8px #ccc',
                            transition: 'transform 0.3s ease-in-out',
                            transform: avatar === selectedAvatar ? 'scale(1.1)' : 'scale(1)',
                        }}
                    />
                ))}
            </div>

            {/* Save Avatar Button */}
            <div style={{ marginTop: '30px' }}>
                <button
                    onClick={handleSaveAvatar}
                    style={{
                        padding: '10px 20px',
                        background: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                >
                    Save Avatar
                </button>
            </div>

            {/* Logout Button */}
            <div style={{ marginTop: '40px' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '10px 20px',
                        background: 'red',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px',
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Success popup */}
            {showPopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#fff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                        color: '#333',
                        zIndex: 1000,
                    }}
                >
                    Avatar updated successfully!
                </div>
            )}
        </div>
    );
}
