import CardSwitcher from "@/components/CardSwitcher";

export default function ProjectsPage()
{
    return (
        <div>
            <MainSection />
            <CardSwitcher />
        </div>
    )
}

function MainSection()
{
    return (
        <div className="h-[40vh] flex flex-col items-center justify-center text-gold">
            <span className="text-4xl tracking-wide mb-2">Projects</span>
            <p className="text-xl">I am a passionate developer with a keen interest in building scalable web
                applications.</p>
        </div>
    )
}