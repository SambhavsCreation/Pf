"use client";
import Head from 'next/head';
import VideoBackground from "@/components/VideoBackground";
import { useEffect, useRef } from "react";
import MainSectionFrontPage from "@/app/MainSectionFrontPage";
import Card from "@/components/ImageCard";
import AbstractOne from "../../public/abstractArtOne.webp"
import CardCarousel from "@/components/CardSection";
import SecondPageSection from "@/components/SecondPageSection";

export default function Home() {
    const secondSectionRef = useRef(null);
    const thirdSectionRef = useRef(null);

    useEffect(() => {
        // Set a timeout to scroll after 5 seconds (5000 milliseconds)
        const timer = setTimeout(() => {
            if (secondSectionRef.current) {
                secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 5000);

        // Clean up the timer if the component unmounts before the timeout
        return () => clearTimeout(timer);
    }, []);



    return (
        <div>
            <Head>
                <title>Your App Title</title>
                <meta name="description" content="Your app description"/>
                {/* Add other head elements as needed */}
            </Head>

            {/* Video Background */}
            <div className="h-full">
                <VideoBackground/>
            </div>

            {/* Second Section */}
            <div
                ref={secondSectionRef}
                className="w-full h-screen bg-black flex items-center justify-center relative"
            >
                <MainSectionFrontPage/>
            </div>

            {/* Third Section */}
            <div className="h-[70vh] bg-black flex items-center justify-center relative">
                <CardCarousel/>
            </div>
            <div className="h-[70vh] bg-black flex items-center justify-center relative">
                <CardCarousel/>
            </div>
            <div className="h-6"></div>
            <div className="h-screen ">
                <SecondPageSection/>
            </div>
            <div className="h-[210vh]"></div>
            <div className="h-[70vh] bg-black flex items-center justify-center relative">
                <CardCarousel/>
            </div>
        </div>
    );
}