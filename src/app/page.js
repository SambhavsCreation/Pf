"use client";
import Head from 'next/head';
import VideoBackground from "@/components/VideoBackground";
import { useEffect, useRef } from "react";
import MainSectionFrontPage from "@/app/MainSectionFrontPage";
import Card from "@/components/ImageCard";
import AbstractOne from "../../public/abstractArtOne.webp"
import CardCarousel from "@/components/CardSection";
import SecondPageSection from "@/components/SecondPageSection";
import ContactMe from "@/components/ContactMe";

export default function Home() {
    const secondSectionRef = useRef(null);
    const thirdSectionRef = useRef(null);

    const skillsData = [
        {
            id: 1,
            backgroundImage: "/abstractArtOne.webp",
            topLeftText: "Game Development",
            bottomRightText: "I have worked as a professional Unreal Engine developer for over 5 years.",
            altText: "Logo 1",
        },
        {
            id: 2,
            backgroundImage: "/abstractArtSix.webp",
            topLeftText: "Fullstack Development",
            bottomRightText: "I have worked on multiple fullstack projects throughout the years.",
        },
        {
            id: 3,
            backgroundImage: "/abstractArtThree.webp",
            topLeftText: "Ethical Hacking",
            bottomRightText: "I can run offensive cyber attacks on online services.",
            logoSrc: "/logoProjectOne.png",
            altText: "Logo 3",
        },
        {
            id: 4,
            backgroundImage: "/abstractArtFour.webp",
            topLeftText: "CUDA",
            bottomRightText: "I can design and implement low level programs for various tasks in CUDA.",
            altText: "Logo 4",
        },
        {
            id: 5,
            backgroundImage: "/abstractArtOne.webp",
            topLeftText: "Competitive Programming",
            bottomRightText: "I have been doing CP since I was 11. I am rated 2400 on Codeforces.",
            altText: "Logo 5",
        },
    ];

    const projectsData = [
        {
            id: 1,
            backgroundImage: "/abstractArtOne.webp",
            topLeftText: "Card 1",
            bottomRightText: "Details 1",
            altText: "Logo 1",
        },
        {
            id: 2,
            backgroundImage: "/abstractArtSix.webp",
            topLeftText: "Card 2",
            bottomRightText: "Details 2",
        },
        {
            id: 3,
            backgroundImage: "/abstractArtThree.webp",
            topLeftText: "Card 3",
            bottomRightText: "Details 3",
            logoSrc: "/logoProjectOne.png",
            altText: "Logo 3",
        },
        {
            id: 4,
            backgroundImage: "/abstractArtFour.webp",
            topLeftText: "Card 4",
            bottomRightText: "Details 4",
            altText: "Logo 4",
        },
        {
            id: 5,
            backgroundImage: "/abstractArtOne.webp",
            topLeftText: "Card 5",
            bottomRightText: "Details 5",
            altText: "Logo 5",
        },
    ];

    const momentsData = [
        {
            id: 1,
            backgroundImage: "/abstractArtOne.webp",
            topLeftText: "Card 1",
            bottomRightText: "Details 1",
            altText: "Logo 1",
        },
        {
            id: 2,
            backgroundImage: "/abstractArtSix.webp",
            topLeftText: "Card 2",
            bottomRightText: "Details 2",
        },
        {
            id: 3,
            backgroundImage: "/abstractArtThree.webp",
            topLeftText: "Card 3",
            bottomRightText: "Details 3",
            logoSrc: "/logoProjectOne.png",
            altText: "Logo 3",
        },
        {
            id: 4,
            backgroundImage: "/abstractArtFour.webp",
            topLeftText: "Card 4",
            bottomRightText: "Details 4",
            altText: "Logo 4",
        },
        {
            id: 5,
            backgroundImage: "/abstractArtOne.webp",
            topLeftText: "Card 5",
            bottomRightText: "Details 5",
            altText: "Logo 5",
        },
    ];

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
                <CardCarousel title={"Skills"} cardsData={skillsData} />
            </div>
            {/*<div className="h-[70vh] bg-black flex items-center justify-center relative">*/}
            {/*    <CardCarousel title={"Projects"} cardsData={projectsData} />*/}
            {/*</div>*/}
            <div className="h-[15vh] bg-black "></div>
            <div className="h-6"></div>
            <div className="h-screen ">
                <SecondPageSection/>
            </div>
            <div className="h-[210vh]"></div>
            <div className="h-[70vh] bg-black flex items-center justify-center relative">
                <CardCarousel title={"Testimonials"} cardsData={momentsData}/>
            </div>

        </div>
    );
}