// components/ContactMe.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    FaTwitter,
    FaGithub,
    FaLinkedin,
} from 'react-icons/fa';
import { HiArrowUpRight } from "react-icons/hi2";
import NostrIcon from './../../public/nostrLogo.png'; // Import the custom Nostr icon

const Nostr = ({ size = 24 }) => {
    return <img src="/nostrLogo.svg" alt="icon" width={size} height={size} />;
};


const ContactMe = () => {
    return (
        <section className="flex flex-col md:flex-row min-h-screen bg-black text-gold">
            {/* Left Side - Image */}
            <div className="hidden md:block md:w-1/2 relative">
                {/* Replace '/path-to-your-image.jpg' with the actual path to your image */}
                <Image
                    src="/solarsys3.jpg"
                    alt="Contact Image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>

            {/* Right Side - Content */}
            <div className="md:w-1/2 flex flex-col justify-center items-start p-8">
                {/* Email */}
                <div className="mb-8">
                    <h3 className="text-2xl mb-2">Email</h3>
                    <a
                        href="mailto:sambhav.sharma@aalto.fi"
                        className="text-lg text-gold hover:text-darkGold transition underline"
                        style={{textUnderlineOffset: '3px'}}
                    >
                        sambhav.sharma@aalto.fi
                    </a>
                </div>

                {/* Navigation Links */}
                <div className="mb-8">
                    <h2 className="text-3xl mb-6">Contact Me</h2>
                    <ul className="space-y-4">
                        <li>
                            <Link
                                href="/tutorials"
                                className="inline-flex items-center text-lg hover:text-darkGold transition duration-200 border-b border-current leading-none"
                            >
                                <span>Essays</span>
                                <HiArrowUpRight className="ml-2"/>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tutorials"
                                className="inline-flex items-center text-lg hover:text-darkGold transition duration-200 border-b border-current leading-none"
                            >
                                <span>Tutorials</span>
                                <HiArrowUpRight className="ml-2"/>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/tutorials"
                                className="inline-flex items-center text-lg hover:text-darkGold transition duration-200 border-b border-current leading-none"
                            >
                                <span>Mini scripts</span>
                                <HiArrowUpRight className="ml-2"/>
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://www.goodreads.com/review/list/175884844?shelf=recommended"
                                className="inline-flex items-center text-lg hover:text-darkGold transition duration-200 border-b border-current leading-none"
                            >
                                <span>Books I suggest</span>
                                <HiArrowUpRight className="ml-2"/>
                            </a>
                        </li>
                        {/* Add more links as needed */}
                    </ul>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-6 group ">
                    {/* Twitter */}
                    <a
                        href="https://x.com/leviathan77x"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center border border-gold hover:border-darkGold hover:text-darkGold rounded-full transition"
                        aria-label="Twitter"
                    >
                        <FaTwitter size={24} />
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/SambhavsCreation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center border border-gold hover:border-darkGold hover:text-darkGold rounded-full  transition"
                        aria-label="GitHub"
                    >
                        <FaGithub size={24} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/sambhav-sharma-79a956236/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center border border-gold hover:border-darkGold hover:text-darkGold rounded-full transition"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={24} />
                    </a>

                    {/* Nostr */}
                    <a
                        href="https://primal.net/p/npub1lx5r90csjn68ryunj26k7fjparyuuqsrkjupyefwzy6rct0zsxuszs5xg4" // Replace with your actual Nostr profile link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center border border-gold hover:border-darkGold hover:text-darkGold rounded-full transition"
                        aria-label="Nostr"
                    >
                        <Nostr size={130} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactMe;
