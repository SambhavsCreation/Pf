// components/SimpleCarousel.js
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), { ssr: false });

import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

const SimpleCarousel = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
        >
            <SwiperSlide>
                <div className="h-64 bg-red-500 flex items-center justify-center text-white text-2xl">Slide 1</div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="h-64 bg-green-500 flex items-center justify-center text-white text-2xl">Slide 2</div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="h-64 bg-blue-500 flex items-center justify-center text-white text-2xl">Slide 3</div>
            </SwiperSlide>
        </Swiper>
    );
};

export default SimpleCarousel;