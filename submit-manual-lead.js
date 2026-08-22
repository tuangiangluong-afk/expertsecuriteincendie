// Global fetch is available in Node 18+

async function submitLead() {
    const token = '17812171346a2b376eaab546a2b376eaab8c';
    
    const nom = "Mullot";
    const prenom = "Remy";
    const email = "rmymullot@gmail.com";
    const tel = "0629511746";
    const cp = "33910";
    const ville = "Saint-Martin-de-Laye";
    
    const description = `Projet d'installation de borne de recharge électrique à domicile pour 2 véhicules (Kia e-Niro et Tesla Model 3, 80 km/jour). Maison équipée de 8 panneaux photovoltaïques. Besoins spécifiques : gestion du surplus photovoltaïque, pilotage heures creuses, délestage dynamique, application mobile de pilotage à distance. Attente de devis détaillé avec visite technique si nécessaire.`;

    const payload = new URLSearchParams({
        key: token,
        nom: nom,
        prenom: prenom,
        email: email,
        tel: tel,
        adresse1: "Saint-Martin-de-Laye",
        adresse2: "",
        cp: cp,
        ville: ville,
        cp_projet: cp,
        ville_projet: ville,
        pays: 'fr',
        tp: '1',          // 1: Particulier
        type_bien: '2',   // 2: Maison
        situation: '1',   // 1: Propriétaire
        delais: '2',      // 2: Dans les 6 mois
        description: description,
        cat_id: '164',     // 164: Pose de borne de recharge
        format_return: 'json',
        site_name: 'expertbornerecharge.com',
        consent_text: "J'accepte d'être contacté(e) par téléphone par ViteUnDevis.com et ses partenaires certifiés pour mon devis.",
        consent_date: new Date().toISOString(),
        consent_ip: "127.0.0.1",
        consent_url: "https://expertbornerecharge.com/contact"
    });

    console.log("📡 Submitting lead to ViteUnDevis production API (get.php)...");
    console.log("Payload description:", description);

    try {
        const response = await fetch('https://www.viteundevis.com/api/get.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': `partenaire-apivud-${token}`
            },
            body: payload
        });

        const text = await response.text();
        console.log("Status:", response.status);
        console.log("Raw Response:", text);

        try {
            const json = JSON.parse(text);
            console.log("\n✅ JSON Response:", JSON.stringify(json, null, 2));
        } catch (e) {
            console.log("Response is not JSON");
        }

    } catch (err) {
        console.error("❌ Error submitting lead:", err);
    }
}

submitLead();
