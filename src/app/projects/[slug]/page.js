import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export async function generateStaticParams() {
    const fileNames = fs.readdirSync(projectsDirectory);
    console.log("Generated slugs:", fileNames.map((fileName) => fileName.replace(/\.md$/, "")));
    return fileNames.map((fileName) => ({
        slug: fileName.replace(/\.md$/, ""), // Remove .md extension
    }));
}

export async function generateMetadata({ params }) {
    const filePath = path.join(projectsDirectory, `${params.slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            images: [
                {
                    url: data.image || "/default-og-image.jpg", // Add a default OG image
                },
            ],
        },
    };
}

export default async function ProjectPage({ params }) {
    console.log(params);
    const filePath = path.join(projectsDirectory, `${params.slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);

    return (
        <div className="max-w-4xl mx-auto p-4 mt-20">
            <h1 className="text-3xl font-bold text-gold">{data.title}</h1>
            <p className="text-gold">{data.date}</p>
            {data.image && (
                <img src={data.image} alt={data.title} className="mt-4 rounded-lg" />
            )}
            <div
                className="prose mt-6 text-gold"
                dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
            />
        </div>
    );
}