import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import sample_images_0 from './Bannerimg/0.jpg';
import sample_images_1 from './Bannerimg/1.jpg';
import sample_images_2 from './Bannerimg/2.jpg';
import sample_images_3 from './Bannerimg/3.jpg';
import sample_images_4 from './Bannerimg/4.png';

import './Poster.css';
import { Link, NavLink } from 'react-router-dom';

const Poster = () => {
    const imagePaths = [
        sample_images_0,
        sample_images_1,
        sample_images_2,
        sample_images_3
    ];

    // 이미지 경로 배열을 복사하여 새 배열을 생성합니다.
    const shuffledImagePaths = [...imagePaths];

    // 새 배열을 랜덤하게 섞습니다.
    shuffledImagePaths.sort(() => Math.random() - 0.5);

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                navigation={true}
                slidesPerView={'auto'}
                initialSlide={1}  // 2번째 이미지부터 시작
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="mySwiper"
                style={{
                    "--swiper-pagination-display": "none",
                    "--swiper-navigation-color": "#55EE00",
                  }}
            >
                {shuffledImagePaths.map((imagePath, index) => (
                    <SwiperSlide key={index}>
                        <NavLink to="/concert">
                        <img src={imagePath} alt={`Image ${index}`} />
                        </NavLink>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Poster;
