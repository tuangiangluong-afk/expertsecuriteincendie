import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in .env.local");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const to = ["iguard.contact@gmail.com", "contact@iguardincendie.fr"];
const subject = "Re: Demande de mise en conformité incendie sur Aubervilliers (fiche Hugo THIZY)";

const text = `Bonjour Nicolas,

Parfait. Comme convenu, voici les coordonnées complètes du gérant reçues ce matin à 11h51 :

• Contact : Hugo THIZY
• Société : Boulotte
• Localisation : 93300 Aubervilliers
• Téléphone direct : 06 81 41 39 50
• Email : hugo@boulotte.com
• Projet : Mise en conformité extincteurs + alarme type 4 + plan d'évacuation (commerce / ERP 50 à 200 m²)
• Délai souhaité : Devis sous 48h

Je vous offre cette première fiche en test pour que vous constatiez la réactivité et la qualité de conversion de nos dossiers. Vous pouvez le contacter directement de la part d'Expert Sécurité Incendie.

Nous traitons un flux continu de demandes d'entreprises au quotidien sur toute l'Île-de-France. Nous avons d'ailleurs d'autres dossiers récents en attente sur votre secteur :
- Un commerce à Versailles (78) pour de la maintenance extincteurs
- Un établissement à Boulogne-Billancourt (92) pour de la mise en conformité ERP

Pour pérenniser le flux, nous fonctionnons en direct : pack de 10 leads à 45 € HT / fiche (450 € HT sans engagement), avec transmission instantanée par email et SMS dès qu'un gérant soumet son dossier sur vos départements cibles.

Je vous laisse joindre M. Thizy dès maintenant, et je vous passe un coup de fil rapide demain au 06 66 52 69 42 pour faire le point et voir si on vous bloque l'exclusivité du flux sur le 93 et vos zones d'intervention.

Bien cordialement,

Marc B.
Expert Sécurité Incendie
https://www.expertsecuriteincendie.fr
hello@expertsecuriteincendie.fr`;

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Bonjour Nicolas,</p>
  
  <p>Parfait. Comme convenu, voici les coordonnées complètes du gérant reçues ce matin à 11h51 :</p>
  
  <ul style="background-color: #f9fafb; border-left: 3px solid #dc2626; padding: 14px 18px 14px 30px; margin: 16px 0; list-style-type: disc;">
    <li><strong>Contact :</strong> Hugo THIZY</li>
    <li><strong>Société :</strong> Boulotte</li>
    <li><strong>Localisation :</strong> 93300 Aubervilliers</li>
    <li><strong>Téléphone direct :</strong> <span style="font-size: 16px; font-weight: bold; color: #dc2626;">06 81 41 39 50</span></li>
    <li><strong>Email :</strong> <a href="mailto:hugo@boulotte.com" style="color: #2563eb;">hugo@boulotte.com</a></li>
    <li><strong>Projet :</strong> Mise en conformité extincteurs + alarme type 4 + plan d'évacuation (commerce / ERP 50 à 200 m²)</li>
    <li><strong>Délai souhaité :</strong> Devis sous 48h</li>
  </ul>
  
  <p>Je vous offre cette première fiche en test pour que vous constatiez la réactivité et la qualité de conversion de nos dossiers. Vous pouvez le contacter directement de la part d'<strong>Expert Sécurité Incendie</strong>.</p>
  
  <p>Nous traitons un <strong>flux continu de demandes d'entreprises au quotidien sur toute l'Île-de-France</strong>. Nous avons d'ailleurs d'autres dossiers récents en attente sur votre secteur :</p>
  <ul>
    <li>Un commerce à <strong>Versailles (78)</strong> pour de la maintenance extincteurs</li>
    <li>Un établissement à <strong>Boulogne-Billancourt (92)</strong> pour de la mise en conformité ERP</li>
  </ul>
  
  <p>Pour pérenniser le flux, nous fonctionnons en direct : <strong>pack de 10 leads à 45 € HT / fiche</strong> (450 € HT sans engagement), avec transmission instantanée par email et SMS dès qu'un gérant soumet son dossier sur vos départements cibles.</p>
  
  <p>Je vous laisse joindre M. Thizy dès maintenant, et je vous passe un coup de fil rapide demain au <strong>06 66 52 69 42</strong> pour faire le point et voir si on vous bloque l'exclusivité du flux sur le 93 et vos zones d'intervention.</p>
  
  <p style="margin-top: 24px; color: #4b5563;">
    Bien cordialement,<br>
    <strong>Marc B.</strong><br>
    Expert Sécurité Incendie<br>
    <a href="https://www.expertsecuriteincendie.fr" style="color: #dc2626; text-decoration: none;">expertsecuriteincendie.fr</a><br>
    hello@expertsecuriteincendie.fr
  </p>
</body>
</html>`;

async function main() {
  console.log("Envoi de la fiche Hugo THIZY à Nicolas Pavy (IGUARD)...");

  try {
    const res = await resend.emails.send({
      from: "Marc - Expert Sécurité Incendie <hello@expertsecuriteincendie.fr>",
      to,
      replyTo: "hello@expertsecuriteincendie.fr",
      bcc: ["hello@expertsecuriteincendie.fr"],
      subject,
      text,
      html,
    });

    console.log(`✅ Envoyé à Nicolas Pavy (IGUARD) -> ID: ${res.data?.id || JSON.stringify(res)}`);
  } catch (err) {
    console.error("❌ Erreur d'envoi:", err);
  }
}

main();
