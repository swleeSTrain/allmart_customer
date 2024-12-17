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
        <Slider {...settings}>
            <div>
                <img src="banner1.jpg" alt="Banner 1" />
            </div>
            <div>
                <img src="banner2.jpg" alt="Banner 2" />
            </div>
            <div>
                <img src="banner3.jpg" alt="Banner 3" />
            </div>
        </Slider>
    );
};

export default BannerSlider;
