import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <GoogleAnalytics GA_MEASUREMENT_ID="G-KCMP1L98T3" />
            {children}
            <CookieBanner slug="home" cityName="Expert Sécurité Incendie" />
        </>
    );
}
