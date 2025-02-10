import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const prevSongRef = useRef<string | null>(null);

	const { currentSong, isPlaying, playNext } = usePlayerStore();

	// Handle Play/Pause Logic
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			// Attempt to play audio
			audio.play().catch((error) => console.error("Audio play error:", error));
		} else {
			// Ensure audio pauses when `isPlaying` is false
			audio.pause();
			console.log("Paused:", audio.paused); // Check if audio actually paused
		}
	}, [isPlaying]);

	// Handle song ends
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleEnded = () => {
			playNext();
		};

		audio.addEventListener("ended", handleEnded);
		return () => {
			audio.removeEventListener("ended", handleEnded);
		};
	}, [playNext]);

	// Handle song changes
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !currentSong) return;

		// Check if it's a new song
		const isSongChange = prevSongRef.current !== currentSong.audioUrl;
		if (isSongChange) {
			audio.src = currentSong.audioUrl;
			audio.load(); // Ensure new media is loaded
			audio.currentTime = 0;
			prevSongRef.current = currentSong.audioUrl;

			// Auto-play if `isPlaying` is true
			if (isPlaying) {
				audio.play().catch((error) => console.error("Audio play error:", error));
			}
		}
	}, [currentSong, isPlaying]);

	return <audio ref={audioRef} />;
};

export default AudioPlayer;
