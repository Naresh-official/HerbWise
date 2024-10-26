import { Leaf, Book, Globe, Database } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function About() {
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-black mb-6 text-center">
                    About HerbWise
                </h1>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-neutral-950 flex items-center">
                            <Leaf className="mr-2 h-6 w-6" />
                            Our Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-neutral-900 mb-4">
                            HerbWise is an educational platform designed to
                            inform users about medicinal plants, their health
                            benefits, and sustainable cultivation practices. Our
                            mission is to bridge the gap between traditional
                            herbal knowledge and modern scientific
                            understanding, promoting the responsible use of
                            natural remedies.
                        </p>
                        <p className="text-neutral-900">
                            This project was created as part of a college
                            assignment for social and environmental studies,
                            emphasizing the sustainable use of natural resources
                            and the benefits of medicinal plants for personal
                            health and well-being.
                        </p>
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-neutral-900 flex items-center">
                            <Globe className="mr-2 h-6 w-6" />
                            Social and Environmental Importance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 text-neutral-900 space-y-2">
                            <li>
                                Biodiversity Conservation: By promoting
                                knowledge about medicinal plants, we contribute
                                to the conservation of plant biodiversity and
                                traditional ecological knowledge.
                            </li>
                            <li>
                                Sustainable Healthcare: Medicinal plants offer a
                                sustainable alternative to synthetic drugs,
                                potentially reducing the environmental impact of
                                pharmaceutical production.
                            </li>
                            <li>
                                Cultural Preservation: Many medicinal plants are
                                deeply rooted in traditional and indigenous
                                knowledge systems. By documenting and sharing
                                this information, we help preserve cultural
                                heritage.
                            </li>
                            <li>
                                Economic Opportunities: Sustainable cultivation
                                of medicinal plants can provide economic
                                opportunities for local communities, especially
                                in rural areas.
                            </li>
                            <li>
                                Environmental Education: Our platform serves as
                                a tool for environmental education, raising
                                awareness about the interconnectedness of human
                                health and ecosystem health.
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-neutral-900 flex items-center">
                            <Database className="mr-2 h-6 w-6" />
                            Data Sources and APIs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-neutral-900 mb-4">
                            HerbWise relies on a combination of reputable
                            sources and modern technology to provide accurate
                            and up-to-date information:
                        </p>
                        <ul className="list-disc pl-5 text-neutral-900 space-y-2">
                            <li>
                                Plant Information Database: We use the Trefle
                                API, a comprehensive botanical database, for
                                detailed plant information and taxonomy.
                            </li>
                            <li>
                                Plant Identification: Our plant identification
                                feature is powered by the Plant.id API, which
                                uses machine learning algorithms to identify
                                plants from images.
                            </li>
                            <li>
                                Medicinal Properties: Information on medicinal
                                properties and traditional uses is sourced from
                                peer-reviewed scientific literature and
                                ethnobotanical studies.
                            </li>
                            <li>
                                Growing Instructions: Cultivation advice is
                                compiled from agricultural extension services
                                and expert horticulturists.
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl text-neutral-900 flex items-center">
                            <Book className="mr-2 h-6 w-6" />
                            Project Creation Process
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal pl-5 text-neutral-900 space-y-2">
                            <li>
                                Research: Extensive research was conducted on
                                medicinal plants, their uses, and sustainable
                                practices.
                            </li>
                            <li>
                                Data Compilation: Information from various
                                sources was compiled and verified for accuracy.
                            </li>
                            <li>
                                Database Design: A custom database was designed
                                to store and organize plant information
                                efficiently.
                            </li>
                            <li>
                                API Integration: Third-party APIs were
                                integrated to enhance functionality, such as
                                plant identification.
                            </li>
                            <li>
                                User Interface Design: The interface was
                                designed with a focus on user experience and
                                accessibility.
                            </li>
                            <li>
                                Development: The website was developed using
                                React and Next.js, with a focus on performance
                                and responsiveness.
                            </li>
                            <li>
                                Testing and Refinement: Rigorous testing was
                                performed to ensure accuracy of information and
                                smooth functionality.
                            </li>
                            <li>
                                Continuous Updates: The platform is regularly
                                updated with new information and features to
                                ensure its relevance and usefulness.
                            </li>
                        </ol>
                    </CardContent>
                </Card>

                <footer className="mt-8 text-center text-green-600 text-sm">
                    <p>
                        HerbWise © 2024. Created for educational purposes as
                        part of a college assignment.
                    </p>
                    <p>
                        Always consult with a healthcare professional before
                        using any herbal remedies.
                    </p>
                </footer>
            </div>
        </div>
    );
}
