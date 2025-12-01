import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [user_name, setUserName] = useState("");
    const [avatar, setAvatar] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const defaultAvatar = "/Images/Avatars/default_avatar.png";
        if (!localStorage.getItem("avatar")) {
            localStorage.setItem("avatar", defaultAvatar);
        }
        const avatar = localStorage.getItem("avatar");
        setAvatar(avatar);

        const user_name = localStorage.getItem('user_name');
        
        if (user_name) {
            setUserName(user_name);
        } else {
            navigate('/login');
        }
    }, []
    );

    return (
        <div
            className="
                h-screen w-full 
                flex flex-col items-center justify-center
                bg-cover bg-center relative
            "
            style={{ backgroundImage: "url('/Images/Background/back4.jpg')" }}
        >

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Main Content */}
            <div className="relative z-10 text-center text-white drop-shadow-lg flex flex-col items-center">
                <h1 className="text-7xl font-extrabold">
                    Welcome to Banana Game
                    <br />
                    <span className="text-yellow-400 text-5xl">{user_name}</span>
                </h1>

                {/* Avatar */}
                <img
                    src={avatar || "/Images/Avatars/default.jpg"}
                    alt="Player Avatar"
                    className="
                        w-28 h-28 rounded-full mt-6 
                        border-4 border-white shadow-xl 
                        object-cover
                        
                    "
                />
            </div>

            {/* Animated GIF bottom-right */}
            <img
                src="/Images/Background/gigimage3.gif"
                alt="GIF"
                className="absolute bottom-2 right-6 w-72 opacity-80 z-0"
            />

            {/* Buttons Container */}
            <div className="relative z-10 mt-10 w-56 flex flex-col gap-4">
                <button 
                        className="bg-black/60 text-white font-semibold py-2 rounded-lg 
                                    transition transform duration-200
                                    hover:bg-yellow-400/80 hover:scale-105 hover:shadow-md hover:text-black
                                    active:scale-95 shadow-md
                                "
                        onClick={() => navigate('/game')}
                >
                    Play
                </button>

                <button
                        className="bg-black/60 text-white font-semibold py-2 rounded-lg 
                                    transition transform duration-200
                                    hover:bg-yellow-400/80 hover:scale-105 hover:shadow-md hover:text-black
                                    active:scale-95 shadow-md
                                "
                        onClick={() => navigate('/rank')}
                >
                    Rank
                </button>

                <button 
                        className="bg-black/60 text-white font-semibold py-2 rounded-lg 
                                    transition transform duration-200
                                    hover:bg-yellow-400/80 hover:scale-105 hover:shadow-md hover:text-black
                                    active:scale-95 shadow-md
                                "
                        onClick={() => navigate('/profile')}
                >
                    Profile
                </button>

                <button 
                        className="bg-black/60 text-white font-semibold py-2 rounded-lg 
                                    transition transform duration-200
                                    hover:bg-yellow-400/80 hover:scale-105 hover:shadow-md hover:text-black
                                    active:scale-95 shadow-md
                                "
                        onClick={() => navigate('/instructions')}
                >
                    Instructions
                </button>

                <button 
                        className="bg-black/60 text-white font-semibold py-2 rounded-lg 
                                    transition transform duration-200
                                    hover:bg-yellow-400/80 hover:scale-105 hover:shadow-md hover:text-black
                                    active:scale-95 shadow-md
                                "
                        onClick={() => navigate('/settings')}
                >
                    Settings
                </button>
            </div>
        </div>
    );
};