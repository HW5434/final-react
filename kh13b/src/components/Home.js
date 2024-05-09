import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination, EffectCards } from 'swiper/modules';

import './Home.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import './styles.css';
// import required modules
import 'swiper/css/effect-fade';
import { useRef } from 'react';

function Home() {

    //State
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <>
            {/* 메인 */}
            <div className="main-wrapper">
                <div className='container-fluid my-5 text-center d-flex justify-content-center'>
                    {/* 포스터 */}
                    <div className='row'>
                        <div className='col-sm-10 offset-sm-1' style={{ width: '800px', height: '800px' }}>
                            <Swiper
                                effect={'cards'}
                                grabCursor={true}
                                modules={[EffectCards]}
                                className="mySwiper"
                            >
                                <SwiperSlide>Slide 1</SwiperSlide>
                                <SwiperSlide>Slide 2</SwiperSlide>
                                <SwiperSlide>Slide 3</SwiperSlide>
                                <SwiperSlide>Slide 4</SwiperSlide>
                                <SwiperSlide>Slide 5</SwiperSlide>
                                <SwiperSlide>Slide 6</SwiperSlide>
                                <SwiperSlide>Slide 7</SwiperSlide>
                                <SwiperSlide>Slide 8</SwiperSlide>
                                <SwiperSlide>Slide 9</SwiperSlide>
                                {/* Add more slides here */}
                            </Swiper>
                        </div>

                        <div className='col-sm-10 offset-sm-1'>
                        </div>
                    </div>
                </div>


                {/* 중간부분  */}
                <div className="container text-center p-4 " style={{ maxWidth: "1000px" }}>
                    <div className="row text-center">
                        {/* 1번쨰 배너 */}
                        <div className="col" style={{ width: '300px', height: '150px' }}>
                            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                <SwiperSlide>Slide 1</SwiperSlide>
                                <SwiperSlide>Slide 2</SwiperSlide>
                                <SwiperSlide>Slide 3</SwiperSlide>
                                <SwiperSlide>Slide 4</SwiperSlide>
                                <SwiperSlide>Slide 5</SwiperSlide>
                                <SwiperSlide>Slide 6</SwiperSlide>
                                <SwiperSlide>Slide 7</SwiperSlide>
                                <SwiperSlide>Slide 8</SwiperSlide>
                                <SwiperSlide>Slide 9</SwiperSlide>
                            </Swiper>
                        </div>

                        {/* 2번쨰 배너 */}
                        <div className="col" style={{ width: '300px', height: '150px' }}>
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
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                                </SwiperSlide>
                                <div className="autoplay-progress" slot="container-end">
                                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                                        <circle cx="24" cy="24" r="20"></circle>
                                    </svg>
                                    <span ref={progressContent}></span>
                                </div>
                            </Swiper>
                        </div>

                        {/* 3번쨰 배너 */}
                        <div className="col" style={{ width: '300px', height: '100px' }}>
                            <img src="http://via.placeholder.com/300x150?text=Final Project" />
                        </div>

                    </div>
                </div>
            </div>


            {/* 푸터 */}
            <div className="footer-wrapper">
                <div className="container text-center p-4 " style={{ maxWidth: "800px" }}>
                    <div className="row text-start">
                        <div className="col">
                            <label>
                                회원약관&nbsp;|&nbsp;
                                개인정보처리방침&nbsp;|&nbsp;
                                사이트맵
                            </label>
                        </div>
                    </div>

                    <div className="row text-start">
                        <div className="col">
                            주소
                            &nbsp;|&nbsp;
                            대표
                            &nbsp;|&nbsp;
                            사업자등록번호
                            &nbsp;|&nbsp;
                            통신판매업자신고번호
                            &nbsp;|&nbsp;
                            개인정보책임자
                        </div>
                    </div>

                    <div className="row text-start">
                        <div className="col">
                            <img src="http://via.placeholder.com/100x50?text=Final Project" />
                            1234-5678
                            <img className="ms-2" src="http://via.placeholder.com/100x50?text=Final Project" />
                            1234-5678
                            <img className="ms-2" src="http://via.placeholder.com/100x50?text=Final Project" />
                            k1h3@abcd.net
                        </div>
                    </div>

                    <div className="row text-start">
                        <div className="col">
                            Copyrightⓒ LOTTE CULTUREWORKS All rights Reserved. [더미]
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;