import CityPage from "@/app/ville/[slug]/page";

export default async function DemoVillePage({ params }: { params: Promise<{ domain: string, slug: string }> }) {
    const { slug } = await params;
    return <CityPage params={Promise.resolve({ slug })} />;
}
