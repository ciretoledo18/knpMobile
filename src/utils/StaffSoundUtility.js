import { Audio } from 'expo-av';

let sound;

export const playSound = async () => {
    try {
        if (!sound) {
            const { sound: newSound } = await Audio.Sound.createAsync(
                require('../assets/sounds/staff.mp3')
            );
            sound = newSound;
        }

        await sound.playAsync();
    } catch (error) {
        console.error('Failed to play sound', error);
    }
};

export const unloadSound = async () => {
    try {
        if (sound) {
            await sound.unloadAsync();
            sound = null;
        }
    } catch (error) {
        console.error('Failed to unload sound', error);
    }
};
