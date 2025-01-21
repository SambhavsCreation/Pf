export default function VideoBackground()
{
    return (
        <div className="relative h-screen w-full overflow-hidden m-0 p-0">
            {/* Video Element */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="homeopener.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white">
                <h1 className="text-4xl md:text-6xl ">Sambhav Sharma</h1>
                <p className="text-lg md:text-2xl mt-4 ">Grab a seat.</p>
            </div>
        </div>
    );
}