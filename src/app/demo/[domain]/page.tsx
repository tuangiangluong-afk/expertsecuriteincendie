export const revalidate = 86400; // 24h ISR cache
import { redirect } from "next/navigation";
import { getSiteConfig } from "@/lib/sites-config";

export default async function DemoPage({ params }: { params: Promise<{ domain: string }> }) {
    const { domain } = await params;
    const config = getSiteConfig(domain);
    
    // Redirect satellite domain demos to the central site city route
    if (config && config.slug) {
        redirect(`/ville/${config.slug}`);
    }
    
    redirect("/");
}
