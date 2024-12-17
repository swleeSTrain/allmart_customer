import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="mt-7"> {/* Tailwind CSS의 상단 마진 */}
            <Slider {...settings}>
                <div>
                    <img src="/images/banner1.png" alt="Banner 1" />
                </div>
                <div>
                    <img src="/images/banner2.png" alt="Banner 2" />
                </div>

            </Slider>
        </div>
    );
};

export default BannerSlider;
