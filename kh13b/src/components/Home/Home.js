import './Home.css';
// Import Swiper styles
import 'swiper/css';
import './styles.css';
import 'swiper/css/navigation';
// import required modules
import 'swiper/css/effect-fade';
import Bnr01 from './swiper/Bnr01';
import Bnr02 from './swiper/Bnr02';
import Bnr03 from './swiper/Bnr03';
import Wrapper from './Wrapper';
import Poster from './swiper/Poster';

function Home() {

    //State
    return (
        <>
            {/* 메인 */}
            <div className="main-wrapper">
                {/* 포스터 */}
                <Wrapper>
                    <div className='row m-5 justify-content-center'>
                        <div className='poster-main'>
                            <Poster />
                        </div>
                    </div>
                </Wrapper>

                {/* 배너 부분  */}

                <Wrapper>
                    <div className="row my-5  justify-content-center">
                        {/* 1번쨰 배너 */}
                        {/* <div className="col-3 banner">
                            <Bnr01 />
                        </div> */}

                        {/* 2번쨰 배너 */}
                        <div className="col-3 banner">
                            <Bnr02 />
                        </div>

                        {/* 3번쨰 배너 */}
                        {/* <div className="col-3 banner">
                            <Bnr03 />
                        </div> */}
                    </div>
                    </Wrapper>

            </div>
        </>
    );
}

export default Home;