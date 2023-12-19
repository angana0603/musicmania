import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Import the CSS file

const MP3Player = () => {
    const audioPlayer = useRef(); // Reference to the audio element
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const songs = [
        "./Chaleya Jawan 128 Kbps (5).mp3",
        "./Bin Tere Kya Yaar Mera.mp3",
        "./Faded.mp3"
    ];

    useEffect(() => {
        const player = audioPlayer.current;

        // Update the duration of the song
        const handleLoadedMetadata = () => {
            setDuration(player.duration);
        };

        // Update the current time of the song
        const handleTimeUpdate = () => {
            setCurrentTime(player.currentTime);
        };

        player.addEventListener('loadedmetadata', handleLoadedMetadata);
        player.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            player.removeEventListener('loadedmetadata', handleLoadedMetadata);
            player.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    const handlePlay = () => {
        audioPlayer.current.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        audioPlayer.current.pause();
        setIsPlaying(false);
    };

    const handleStop = () => {
        audioPlayer.current.pause();
        audioPlayer.current.currentTime = 0;
        setIsPlaying(false);
    };

    const playNextSong = () => {
        const nextSongIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextSongIndex);
        audioPlayer.current.src = songs[nextSongIndex];
        handlePlay();
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="mp3-player">
            <audio ref={audioPlayer} loop>
                <source src={songs[currentSongIndex]} type="audio/mp3" />
            </audio>
            {/* <h2>Musically</h2> */}
            <div>
                <button onClick={isPlaying ? handlePause : handlePlay}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={handleStop} disabled={!isPlaying}>
                    Stop
                </button>
                <button onClick={playNextSong}>
                    Next Song
                </button>
            </div>
            <div>
                <p>Time: {formatTime(currentTime)} / {formatTime(duration)}</p>
            </div>
        </div>
    );
};

export default MP3Player;
