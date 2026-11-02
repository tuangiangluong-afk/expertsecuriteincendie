import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in .env.local");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const targets = [
  {
    name: "IGUARD Protection Incendie",
    email: "contact@iguardincendie.fr",
  },
  {
    name: "Sécurité Incendie France (SIF)",
    email: "info@sif-incendie.fr",
  },
  {
    name: "Desautel Agence Paris-Nord",
    email: "paris-nord@desautel.fr",
  },
];

const subject = "Demande de mise en conformité incendie sur Aubervilliers (reçue ce matin)";

const text = `Bonjour,

Nous opérons le portail expertsecuriteincendie.fr. Nous venons de recevoir à 11h51 une demande directe d'un gérant d'établissement (commerce / ERP 50-200 m²) situé à Aubervilliers (93300) :

• Projet : Mise en conformité extincteurs + alarme type 4 + plan d'évacuation
• Établissement : Société Boulotte, gérant joignable par téléphone et email
• Timing : Devis souhaité sous 48h (projet urgent avant ouverture / inspection)

Nous attribuons nos flux de demandes qualifiées à des installateurs agréés intervenant sur le secteur. Comme votre société est basée ou active directement sur Aubervilliers et le 93, nous préférons vous la transmettre en direct.

Confirmez-moi simplement par retour de mail si vous prenez des chantiers sur le secteur en ce moment, et je vous transfère immédiatement la fiche complète avec les coordonnées directes du dirigeant pour votre chiffrage.

Bien cordialement,

Marc B.
Expert Sécurité Incendie
https://www.expertsecuriteincendie.fr`;

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Bonjour,</p>
  
  <p>Nous opérons le portail <strong>expertsecuriteincendie.fr</strong>. Nous venons de recevoir à 11h51 une demande directe d'un gérant d'établissement (commerce / ERP 50-200 m²) situé à <strong>Aubervilliers (93300)</strong> :</p>
  
  <ul style="background-color: #f9fafb; border-left: 3px solid #dc2626; padding: 12px 16px 12px 30px; margin: 16px 0; list-style-type: disc;">
    <li><strong>Projet :</strong> Mise en conformité extincteurs + alarme type 4 + plan d'évacuation</li>
    <li><strong>Établissement :</strong> Société Boulotte, gérant joignable par téléphone et email</li>
    <li><strong>Timing :</strong> Devis souhaité sous 48h (projet urgent avant ouverture / inspection)</li>
  </ul>
  
  <p>Nous attribuons nos flux de demandes qualifiées à des installateurs agréés intervenant sur le secteur. Comme votre société est basée ou active directement sur Aubervilliers et le 93, nous préférons vous la transmettre en direct.</p>
  
  <p><strong>Confirmez-moi simplement par retour de mail</strong> si vous prenez des chantiers sur le secteur en ce moment, et je vous transfère immédiatement la fiche complète avec les coordonnées directes du dirigeant pour votre chiffrage.</p>
  
  <p style="margin-top: 24px; color: #4b5563;">
    Bien cordialement,<br>
    <strong>Marc B.</strong><br>
    Expert Sécurité Incendie<br>
    <a href="https://www.expertsecuriteincendie.fr" style="color: #dc2626; text-decoration: none;">expertsecuriteincendie.fr</a>
  </p>
</body>
</html>`;

async function main() {
  console.log("Sending outreach emails for Aubervilliers lead...");

  for (const target of targets) {
    try {
      const res = await resend.emails.send({
        from: "Marc - Expert Sécurité Incendie <hello@expertsecuriteincendie.fr>",
        to: [target.email],
        replyTo: "hello@expertsecuriteincendie.fr",
        bcc: ["hello@expertsecuriteincendie.fr"],
        subject,
        text,
        html,
      });

      console.log(`✅ Sent to ${target.name} (${target.email}) -> ID: ${res.data?.id || JSON.stringify(res)}`);
    } catch (err) {
      console.error(`❌ Failed to send to ${target.name} (${target.email}):`, err);
    }
  }
}

main();
