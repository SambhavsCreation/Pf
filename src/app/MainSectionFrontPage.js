// MainSectionFrontPage.jsx
import MainPhoto from '../../public/FrontPhoto.JPG';
import Image from 'next/image';

export default function MainSectionFrontPage() {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center text-gold px-4 md:px-0">

            {/* Centered Image and Heading */}
            <div className="flex flex-col items-center">
                <div className="relative w-96 h-96 md:w-112 md:h-112">
                    <Image
                        src={MainPhoto}
                        alt="Portrait of [Your Name]"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full shadow-lg"
                    />
                </div>
                <h2 className="mt-6 text-3xl md:text-5xl font-semibold text-center">
                    Sambhav Sharma.
                </h2>

                {/* Paragraph Below Heading */}
                <p className="mt-4 text-lg md:text-xl max-w-2xl text-center font-light leading-relaxed tracking-wide">
                    I am a passionate developer with a keen interest in building scalable web applications.
                    My expertise lies in modern JavaScript frameworks and creating intuitive user experiences.
                    Let's connect and build something!
                </p>
            </div>

            {/* Spinning Circular Text Positioned to the Right */}
            <div className="hidden md:block absolute right-8 md:right-16 top-1/2 transform -translate-y-1/2 w-40 h-40 md:w-48 md:h-48">
                <svg
                    className="w-full h-full animate-spin-slow"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="spinningTextTitle"
                    role="img"
                >
                    <title id="spinningTextTitle">Spinning Circular Text</title>
                    <defs>
                        <path
                            id="circlePath"
                            d="
                M 100, 100
                m -35, 0
                a 35,35 0 1,1 70,0
                a 35,35 0 1,1 -70,0
              "
                        />
                    </defs>
                    <text
                        fontSize="12"
                        fill="currentColor"
                        textAnchor="middle"
                        stroke="black"
                        strokeWidth="0.3"
                    >
                        <textPath href="#circlePath" startOffset="0">
                            Your spinning circular text goes here. Your spinning circular text goes here.
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }

                /* Respect user's reduced motion preference */
                @media (prefers-reduced-motion: reduce) {
                    .animate-spin-slow {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
}