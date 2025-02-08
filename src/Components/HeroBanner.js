import { useState, useEffect } from "react";
import axios from "axios";
import { SITE_URL } from "../Auth/Define";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";

const HeroBanner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        axios.post(`${SITE_URL}new/app/api/get_banner.php`).then((response) => {
            // console.log(response.data);
            
            setBannerData(response.data);
        })
            .catch((error) => {
                console.error("Could not fetch Banner =>", error);
            });
    }, []);

    // console.log(bannerData);

    var settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    // console.log(bannerData);


    return (
        <>
            {
                bannerData && bannerData.length > 0 ? (
                    <Slider {...settings}>
                        {
                            bannerData.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <img
                                            className="d-block w-100"
                                            src={`${SITE_URL}new/app/upload/banner/${item.banner_image}`}
                                            alt={`${index} slide`}
                                            style={{ maxHeight: '85vh' }}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Slider>
                ) : (
                    <Skeleton height={"400px"} />
                )}
        </>
    );
};

export default HeroBanner;
