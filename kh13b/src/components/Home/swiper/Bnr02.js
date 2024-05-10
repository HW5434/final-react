import { useRef } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import sample_images_0 from './Bannerimg/0.png';
import sample_images_1 from './Bannerimg/1.png';
import sample_images_2 from './Bannerimg/2.png';
import sample_images_3 from './Bannerimg/3.png';
import sample_images_4 from './Bannerimg/4.png';

const Bnr02 = () => {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    // 이미지 경로 배열
    const imagePaths = [
        sample_images_0,
        sample_images_1,
        sample_images_2,
        sample_images_3,
        sample_images_4
    ];

    return (
        <>
            {/* 작동 코드 */}
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[EffectFade, Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                {/* 이미지 슬라이드 */}
                {imagePaths.map((imagePath, index) => (
                    <SwiperSlide key={index}>
                        <img src={imagePath} />
                    </SwiperSlide>
                ))}
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    );
};

export default Bnr02;
