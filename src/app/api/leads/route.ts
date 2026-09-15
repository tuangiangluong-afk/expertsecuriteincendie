import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        console.log("📥 [API/LEADS] Received B2B Fire Safety Lead:", body);
        const {
            name, email, phone, city, zipCode, domain,
            projectType, needType, surface, company, leadScore
        } = body;

        // Validation basique
        if (!name || !email || !phone || !projectType) {
            return NextResponse.json(
                { error: 'Champs obligatoires manquants' },
                { status: 400 }
            );
        }

        // Hard Block Particulier côté serveur (sécurité)
        if (projectType === 'particulier') {
            return NextResponse.json(
                { error: 'Nous ne servons que les professionnels.' },
                { status: 403 }
            );
        }

        // Arbitrage Logic
        const isTier1 = 
            surface === 'plus_200' || 
            needType === 'conformite' || 
            projectType === 'copro' || 
            (leadScore && leadScore >= 80);

        const apiKey = process.env.RESEND_API_KEY;
        const resend = apiKey ? new Resend(apiKey) : null;

        if (isTier1) {
            console.log("💎 [ARBITRAGE] TIER 1 DETECTED -> Envoi direct partenaire national (Extincteurs / Desautel)");
            
            if (resend) {
                await resend.emails.send({
                    from: 'Leads Incendie <hello@expertbornerecharge.com>',
                    to: ['hello@expertbornerecharge.com'],
                    subject: `🚨 [TIER 1] Nouveau Lead Incendie B2B - ${city}`,
                    html: `
                        <div style="background-color: #fef2f2; border: 2px solid #ef4444; padding: 20px; border-radius: 12px; font-family: sans-serif;">
                            <h2 style="color: #991b1b; margin-top: 0;">🔥 LEAD B2B PREMIUM (TIER 1)</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Type</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${projectType}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Besoin</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${needType}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Surface</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${surface}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Contact</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Société / Copro</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${company || 'Non renseigné'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Email</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #fee2e2;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #fee2e2;">Téléphone</td>
                                    <td style="padding: 8px 0; font-size: 18px; color: #dc2626; border-bottom: 1px solid #fee2e2;">${phone}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">Code Postal</td>
                                    <td style="padding: 8px 0;">${zipCode} (${city})</td>
                                </tr>
                            </table>
                        </div>
                    `,
                });
            } else {
                console.log("⚠️ [MOCK] No Resend API Key. Email mock printed.");
            }
        } else {
            console.log("🗑️ [ARBITRAGE] TIER 2 DETECTED -> Notification email + API");
            if (resend) {
                await resend.emails.send({
                    from: 'Leads Incendie <hello@expertbornerecharge.com>',
                    to: ['hello@expertbornerecharge.com'],
                    subject: `🚨 [TIER 2] Nouveau Lead Incendie - ${city}`,
                    html: `
                        <div style="background-color: #f8fafc; border: 2px solid #64748b; padding: 20px; border-radius: 12px; font-family: sans-serif;">
                            <h2 style="color: #334155; margin-top: 0;">📋 NOUVEAU LEAD INCENDIE (TIER 2)</h2>
                            <p><strong>Contact :</strong> ${name} | ${phone} | ${email}</p>
                            <p><strong>Société :</strong> ${company || 'N/A'} (${city})</p>
                            <p><strong>Type :</strong> ${projectType} | Surface : ${surface}</p>
                        </div>
                    `,
                });
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: "Lead arbitré avec succès."
        });

    } catch (e: any) {
        console.error('API Error:', e);
        return NextResponse.json(
            { error: `Internal Server Error: ${e.message}` },
            { status: 500 }
        );
    }
}
