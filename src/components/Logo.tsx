import Link from "next/link";
import { Shield, Flame } from "lucide-react";

interface LogoProps {
    isHub?: boolean;
    city?: string | null;
    /** Size variant */
    size?: "sm" | "md" | "lg";
    /** Theme variant */
    variant?: "default" | "light";
    /** Theme color (default: red) */
    themeColor?: 'red' | 'emerald' | 'amber' | 'purple';
    /** Additional className */
    className?: string;
    /** Custom URL override (useful for demo/preview) */
    customLink?: string;
}

/**
 * Dynamic Logo Component (SVG + Tailwind)
 * 
 * B2B Fire Safety Edition
 */
export default function Logo({
    size = "md",
    variant = "default",
    themeColor = 'red',
    className = "",
    customLink
}: LogoProps) {
    // Size mappings
    const sizes = {
        sm: { icon: 24, text: "text-lg" },
        md: { icon: 32, text: "text-2xl" },
        lg: { icon: 48, text: "text-4xl" },
    };

    const s = sizes[size];

    const colors = {
        default: {
            text: "text-slate-900",
            highlight: "text-red-600",
            iconBg: "bg-red-100",
            iconText: "text-red-600"
        },
        light: {
            text: "text-white",
            highlight: "text-red-400",
            iconBg: "bg-white/20",
            iconText: "text-white"
        }
    }[variant];

    return (
        <Link href={customLink || "/"} className={`flex items-center gap-3 ${className} group`}>
            {/* SVG Logo Icon */}
            <div className={`relative flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 ${colors.iconBg}`} style={{ width: s.icon * 1.5, height: s.icon * 1.5 }}>
                <Shield size={s.icon} className={colors.iconText} strokeWidth={2} />
                <div className="absolute inset-0 flex items-center justify-center pb-1">
                    <Flame size={s.icon * 0.45} className={colors.iconText} strokeWidth={3} fill="currentColor" />
                </div>
            </div>

            {/* Typography */}
            <div className={`font-extrabold tracking-tight leading-none ${s.text} ${colors.text}`}>
                Expert <br className="hidden sm:block" />
                <span className={colors.highlight}>Sécurité Incendie</span>
            </div>
        </Link>
    );
}

/**
 * Simple icon-only version for small spaces (mobile nav, favicon, etc.)
 */
export function LogoIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
    return (
        <div className={`relative flex items-center justify-center rounded-xl bg-red-600 ${className} group-hover:scale-105 transition-transform`} style={{ width: size, height: size }}>
            <Shield size={size * 0.6} className="text-white" strokeWidth={2} />
            <div className="absolute inset-0 flex items-center justify-center pb-1">
                <Flame size={size * 0.25} className="text-white" strokeWidth={3} fill="currentColor" />
            </div>
        </div>
    );
}
