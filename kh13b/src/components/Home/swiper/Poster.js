import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

// 폴더에 있는 이미지들
import sample_images_0 from './Bannerimg/0.png';
import sample_images_1 from './Bannerimg/1.png';
import sample_images_2 from './Bannerimg/2.png';
import sample_images_3 from './Bannerimg/3.png';
import sample_images_4 from './Bannerimg/4.png';

//CSS
import './Poster.css';

// const [thumbsSwiper, setThumbsSwiper] = useState(null);

// 이미지 불러오기
const Poster = () => {
    const imagePaths = [
        sample_images_0,
        sample_images_1,
        sample_images_2,
        sample_images_3,
        sample_images_4
    ];

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={false}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
               
            >
                {imagePaths.map((imagePath, index) => (
                    <SwiperSlide key={index}>
                        <img src={imagePath} alt={`Image ${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );

};

export default Poster;
