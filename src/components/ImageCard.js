import Image from 'next/image';

const Card = ({
                  backgroundImage,
                  topLeftText,
                  bottomRightText,
                  logoSrc,
                  altText = 'Logo',
              }) => {
    return (
        <div className="relative overflow-hidden rounded-md shadow-lg group cursor-pointer " style={{ width: '20rem', height: '28rem' }}>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-30 transition-transform duration-500 group-hover:scale-110"></div>

            {/* Content */}
            <div className="relative flex items-center justify-center h-full p-6">
                {/* Logo (conditionally rendered) */}
                {logoSrc && (
                    <Image
                        src={logoSrc}
                        alt={altText}
                        className="transition-transform duration-500 group-hover:scale-110 z-10"
                        width={70}
                        height={70}
                    />
                )}
            </div>

            {/* Top Left Text */}
            <div className="absolute top-4 left-4 text-white z-10">
                {topLeftText}
            </div>

            {/* Bottom Right Text */}
            <div className="absolute bottom-4 right-4 text-white z-10">
                {bottomRightText}
            </div>
        </div>
    );
};

export default Card;
