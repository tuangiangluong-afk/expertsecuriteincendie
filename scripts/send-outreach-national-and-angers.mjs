import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.RESEND_API_KEY) {
  throw new Error("Missing RESEND_API_KEY in .env.local");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Angers / Cholet (49) Local Installers
const angersTargets = [
  {
    name: "Extincteurs Angevins",
    email: "info@extincteurs-angevins.com",
  },
  {
    name: "APS Services Cholet",
    email: "contact@aps-services.fr",
  },
];

const angersSubject = "Demande mise en conformité / Commission ERP sur le 49 (reçue récemment)";

const angersText = `Bonjour,

Nous opérons le portail expertsecuriteincendie.fr. Nous avons enregistré une demande directe d'un gérant d'établissement commercial situé dans le Maine-et-Loire (secteur Angers / Cholet - 49300) :

• Projet : Passage de commission de sécurité ERP + mise aux normes extincteurs / registre
• Établissement : Avenue Market (commerce de proximité)
• Statut : Gérant joignable directement par téléphone et email

Nous transmettons nos flux de demandes qualifiées à des installateurs agréés intervenant sur le 49. Comme votre entreprise est active sur le secteur, nous souhaitons vous la proposer en direct.

Confirmez-moi simplement par retour de mail si vous prenez des dossiers sur le département en ce moment, et je vous transmets immédiatement la fiche complète avec les coordonnées directes du dirigeant.

Bien cordialement,

Marc B.
Expert Sécurité Incendie
https://www.expertsecuriteincendie.fr`;

const angersHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Bonjour,</p>
  
  <p>Nous opérons le portail <strong>expertsecuriteincendie.fr</strong>. Nous avons enregistré une demande directe d'un gérant d'établissement commercial situé dans le Maine-et-Loire (<strong>secteur Angers / Cholet - 49300</strong>) :</p>
  
  <ul style="background-color: #f9fafb; border-left: 3px solid #dc2626; padding: 12px 16px 12px 30px; margin: 16px 0; list-style-type: disc;">
    <li><strong>Projet :</strong> Passage de commission de sécurité ERP + mise aux normes extincteurs / registre</li>
    <li><strong>Établissement :</strong> Avenue Market (commerce de proximité)</li>
    <li><strong>Statut :</strong> Gérant joignable directement par téléphone et email</li>
  </ul>
  
  <p>Nous transmettons nos flux de demandes qualifiées à des installateurs agréés intervenant sur le 49. Comme votre entreprise est active sur le secteur, nous souhaitons vous la proposer en direct.</p>
  
  <p><strong>Confirmez-moi simplement par retour de mail</strong> si vous prenez des dossiers sur le département en ce moment, et je vous transmets immédiatement la fiche complète avec les coordonnées directes du dirigeant.</p>
  
  <p style="margin-top: 24px; color: #4b5563;">
    Bien cordialement,<br>
    <strong>Marc B.</strong><br>
    Expert Sécurité Incendie<br>
    <a href="https://www.expertsecuriteincendie.fr" style="color: #dc2626; text-decoration: none;">expertsecuriteincendie.fr</a>
  </p>
</body>
</html>`;

// 2. National Partners (Desautel France & Eurofeu Direction)
const nationalTargets = [
  {
    name: "Desautel France (Direction Commerciale & Leads)",
    email: "leads@desautel.fr",
  },
  {
    name: "Desautel France (Contact Général)",
    email: "contact@desautel.fr",
  },
  {
    name: "Eurofeu (Département Partenariats & Distribution)",
    email: "dpt.distributeurs@eurofeu.fr",
  },
];

const nationalSubject = "Partenariat flux leads B2B Sécurité Incendie (ERP / ERT / Extincteurs / SSI)";

const nationalText = `Bonjour,

Je me permets de vous contacter au nom du portail expertsecuriteincendie.fr.

Nous générons un flux régulier de 20 à 30 demandes entrantes qualifiées par mois émanant exclusivement de professionnels et gestionnaires d'ERP/ERT à travers toute la France :
• Mises en conformité extincteurs & RIA
• Alarmes incendie (Type 1 à 4) & SSI
• Visites périodiques et préparation aux commissions de sécurité ERP
• Audits Q18 et désenfumage naturel / mécanique

Chaque demande comprend la surface de l'établissement, la typologie d'activité (commerce, industrie, tertiaire, artisan), le délai de réalisation souhaité, ainsi que le nom, l'email et le numéro de téléphone direct du gérant.

Compte tenu de votre maillage d'agences sur l'ensemble du territoire national, nous souhaitons vous proposer un canal d'attribution directe de nos flux (soit en exclusivité nationale, soit en flux prioritaire par département).

Seriez-vous disponibles pour un court échange cette semaine afin de vous présenter les volumes par région et vous faire tester un échantillon de demandes récentes ?

Bien cordialement,

Marc B.
Expert Sécurité Incendie
https://www.expertsecuriteincendie.fr
hello@expertsecuriteincendie.fr`;

const nationalHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Bonjour,</p>
  
  <p>Je me permets de vous contacter au nom du portail <strong>expertsecuriteincendie.fr</strong>.</p>
  
  <p>Nous générons un flux régulier de <strong>20 à 30 demandes entrantes qualifiées par mois</strong> émanant exclusivement de professionnels et gestionnaires d'ERP/ERT à travers toute la France :</p>
  
  <ul style="background-color: #f9fafb; border-left: 3px solid #dc2626; padding: 12px 16px 12px 30px; margin: 16px 0; list-style-type: disc;">
    <li>Mises en conformité extincteurs & RIA</li>
    <li>Alarmes incendie (Type 1 à 4) & SSI</li>
    <li>Visites périodiques et préparation aux commissions de sécurité ERP</li>
    <li>Audits Q18 et désenfumage naturel / mécanique</li>
  </ul>
  
  <p>Chaque demande comprend la surface de l'établissement, la typologie d'activité (commerce, industrie, tertiaire, artisan), le délai de réalisation souhaité, ainsi que le nom, l'email et le numéro de téléphone direct du gérant.</p>
  
  <p>Compte tenu de votre maillage d'agences sur l'ensemble du territoire national, nous souhaitons vous proposer un canal d'attribution directe de nos flux (soit en exclusivité nationale, soit en flux prioritaire par département).</p>
  
  <p><strong>Seriez-vous disponibles pour un court échange cette semaine</strong> afin de vous présenter les volumes par région et vous faire tester un échantillon de demandes récentes ?</p>
  
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
  console.log("--- 1. Envoi aux installateurs locaux Angers / Cholet (49) ---");
  for (const target of angersTargets) {
    try {
      const res = await resend.emails.send({
        from: "Marc - Expert Sécurité Incendie <hello@expertsecuriteincendie.fr>",
        to: [target.email],
        replyTo: "hello@expertsecuriteincendie.fr",
        bcc: ["hello@expertsecuriteincendie.fr"],
        subject: angersSubject,
        text: angersText,
        html: angersHtml,
      });
      console.log(`✅ [49] Sent to ${target.name} (${target.email}) -> ID: ${res.data?.id || JSON.stringify(res)}`);
    } catch (err) {
      console.error(`❌ [49] Failed to send to ${target.name} (${target.email}):`, err);
    }
  }

  console.log("\n--- 2. Envoi aux directions nationales (Desautel & Eurofeu) ---");
  for (const target of nationalTargets) {
    try {
      const res = await resend.emails.send({
        from: "Marc - Expert Sécurité Incendie <hello@expertsecuriteincendie.fr>",
        to: [target.email],
        replyTo: "hello@expertsecuriteincendie.fr",
        bcc: ["hello@expertsecuriteincendie.fr"],
        subject: nationalSubject,
        text: nationalText,
        html: nationalHtml,
      });
      console.log(`✅ [National] Sent to ${target.name} (${target.email}) -> ID: ${res.data?.id || JSON.stringify(res)}`);
    } catch (err) {
      console.error(`❌ [National] Failed to send to ${target.name} (${target.email}):`, err);
    }
  }
}

main();
