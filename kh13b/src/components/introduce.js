import Wrapper from "./Home/Wrapper";
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useRef, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules


function Introduce() {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <div className="intro-wrapper">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <Wrapper>
                            <div className="row text-start">
                                <div className="col my-5">
                                    <h1>
                                        <strong>
                                            소개
                                        </strong>
                                    </h1>
                                </div>
                            </div>

                            <div className="row text-start">
                                <div className="col mb-5">
                                    <h3>
                                        <strong>
                                            대한민국 최초이자 최고의 뮤지컬 전용 극장 샤롯데씨어터
                                        </strong>
                                    </h3>
                                </div>
                            </div>

                            <div className="row text-start">
                                <div className="col mb-2">
                                    <span>
                                        1,230석 규모의 대한민국 최초이자 최고의 뮤지컬 전용 극장 샤롯데씨어터는
                                        롯데 그룹이 한국의 뮤지컬 업계 발전을 도모하기 위해 건설비 총 450억 원을
                                        투자하여 지난 2004년 착공, 2006년 10월 28일 개관하였습니다.
                                    </span>
                                </div>
                            </div>

                            <div className="row text-start">
                                <div className="col mb-2">
                                    <span>
                                        1995년 500억 공연시장 규모가 급성장하여 매년 수 천억 원 규모의 매출을
                                        올리고 있습니다. 그 중 60% 이상을 뮤지컬이 차지할 정도로, 이제 뮤지컬은 많은
                                        이들에게 각광 받는 대중문화의 한 영역이 되었습니다.
                                    </span>
                                </div>
                            </div>

                            <div className="row text-start">
                                <div className="col mb-2">
                                    <span>
                                        그러나, 국내에서는 몇몇 대형 공연장이 뮤지컬 공연장으로 활용될 뿐, 뮤지컬만의
                                        특성을 잘 살릴 수 있는 전용 극장은 없었습니다.
                                    </span>
                                </div>
                            </div>

                            <div className="row text-start">
                                <div className="col mb-2">
                                    <span>
                                        이러한 열악한 환경에서 탄생한 뮤지컬 전용 극장인 샤롯데씨어터는 선진국에 비해
                                        열세인 공연 관련 산업 부흥과 국내공연 산업의 질적 향상에 기여할 것으로 기대하고
                                        있습니다. 본 극장은 그룹의 문화 사업을 통한 사회환원이란 이념으로 국내 최고
                                        수준의 장비와 시설을 갖추었으며, 수준 높고 다양한 뮤지컬을 한국 관객에게
                                        지속적으로 제공하여 공연 시장 확대와 문화 발전에 기여해 나갈 것입니다.
                                    </span>
                                </div>
                            </div>
                        </Wrapper>
                    </div>

                    <div className="col-5 mt-5">
                        <div className="intro-banner">
                        <Wrapper>
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',

                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2 py-2"
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
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper pb-2"
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
                            </Swiper>
                        </Wrapper>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};


export default Introduce;