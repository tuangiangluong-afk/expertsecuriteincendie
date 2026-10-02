import { ImageResponse } from "next/og";

export const runtime = "nodejs";

const BRAND = {
    name: "Expert Sécurité Incendie",
    domain: "www.expertsecuriteincendie.fr",
    color: "#dc2626",
    baseline: "Sécurité incendie des ERP, locaux de travail et copropriétés",
    cta: "Audit de conformité APSAD gratuit",
};

function pretty(raw: string): string {
    return raw
        .split("-")
        .map((w) => (w.length > 1 ? w.charAt(0).toUpperCase() + w.slice(1) : w.toUpperCase()))
        .join(" ");
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").slice(0, 64);
    const sub = (searchParams.get("sub") || BRAND.baseline).slice(0, 120);
    const badge = (searchParams.get("badge") || "").slice(0, 36);
    const title = q ? pretty(q) : "";
    const titleFontSize = title.length > 36 ? 48 : title.length > 24 ? 60 : 76;

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#0f172a",
                    backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #450a0a 100%)",
                    padding: "56px 64px",
                    justifyContent: "space-between",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                        <div style={{ display: "flex", width: 16, height: 62, backgroundColor: "#dc2626", borderRadius: 4 }} />
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", color: "#f8fafc", fontSize: 34, fontWeight: 700 }}>{BRAND.name}</div>
                            <div style={{ display: "flex", color: "#fca5a5", fontSize: 20, marginTop: 4 }}>{BRAND.domain}</div>
                        </div>
                    </div>
                    {badge ? (
                        <div
                            style={{
                                display: "flex",
                                padding: "8px 18px",
                                backgroundColor: "rgba(220, 38, 38, 0.2)",
                                border: "1.5px solid rgba(220, 38, 38, 0.5)",
                                borderRadius: 999,
                                color: "#fca5a5",
                                fontSize: 18,
                                fontWeight: 700,
                                letterSpacing: 1,
                            }}
                        >
                            {badge}
                        </div>
                    ) : null}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1040 }}>
                    {title ? (
                        <div
                            style={{
                                display: "flex",
                                color: "#ffffff",
                                fontSize: titleFontSize,
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: -1,
                            }}
                        >
                            {title}
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                color: "#ffffff",
                                fontSize: 64,
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: -1,
                            }}
                        >
                            Sécurité Incendie &amp; Conformité ERP
                        </div>
                    )}
                    <div
                        style={{
                            display: "flex",
                            color: "#fecaca",
                            fontSize: 26,
                            lineHeight: 1.35,
                            maxWidth: 960,
                        }}
                    >
                        {sub}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                        paddingTop: 24,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                            style={{
                                display: "flex",
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: "#dc2626",
                            }}
                        />
                        <div style={{ display: "flex", color: "#cbd5e1", fontSize: 18, fontWeight: 500 }}>
                            Règles APSAD R4/R5 • NF S 61-919 • Registre de Sécurité • 12 Opérateurs
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#dc2626",
                            color: "#ffffff",
                            padding: "12px 28px",
                            borderRadius: 12,
                            fontSize: 20,
                            fontWeight: 800,
                        }}
                    >
                        {BRAND.cta}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: { "cache-control": "public, max-age=86400, s-maxage=604800" },
        },
    );
}
