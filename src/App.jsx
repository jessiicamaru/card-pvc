import TiltedCard from './Comp/TiltedCard/TiltedCard.jsx';
import SplitText from './Comp/SplitText/SplitText.jsx';
import img1 from './assets/IMG_06881.jpg';
import img2 from './assets/dGeJUjPwRJb.png';
import img3 from './assets/IMG_0229.png';
import img4 from './assets/IMG_2235.png';
import img5 from './assets/IMG_5561.png';
import img6 from './assets/IMG_7103.png';
import img7 from './assets/IMG_8936.png';
import audio from './assets/kimmese--justatee.mp3';
import { useEffect, useRef, useState } from 'react';

function App() {
    const arr = [img1, img2, img3, img4, img5, img6, img7];

    const [index, setIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const audioRef = useRef(new Audio(audio));
    const isMobile = window.innerWidth < 768;

    const nextFn = () => {
        setIndex((prev) => (prev + 1) % arr.length);
    };

    const prevFn = () => {
        setIndex((prev) => (prev - 1 + arr.length) % arr.length);
    };

    useEffect(() => {
        const handleTouchStart = (e) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = (e) => {
            touchEndX.current = e.changedTouches[0].clientX;
            const deltaX = touchEndX.current - touchStartX.current;

            if (deltaX > 50) {
                prevFn(); // Vuốt sang phải
            } else if (deltaX < -50) {
                nextFn(); // Vuốt sang trái
            }
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true;

        const enableAudio = () => {
            audio.play().catch((err) => console.log('Tự động phát bị chặn:', err));
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
        };

        document.addEventListener('click', enableAudio);
        document.addEventListener('touchstart', enableAudio);

        return () => {
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
        };
    }, []);

    return (
        <div className="w-full h-screen flex items-center justify-center relative">
            {!isMobile && (
                <button onClick={prevFn} className="absolute left-10 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600">
                    ⬅
                </button>
            )}

            <div className="flex-1 flex items-center justify-center">
                <TiltedCard imageSrc={arr[index]} showTooltip={false} scaleOnHover={1.2} rotateAmplitude={21} />
            </div>

            {!isMobile && (
                <button onClick={nextFn} className="absolute right-10 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-600">
                    ➡
                </button>
            )}
        </div>
    );
}

export default App;
