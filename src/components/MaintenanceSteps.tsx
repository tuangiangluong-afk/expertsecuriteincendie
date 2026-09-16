"use client";

export default function MaintenanceSteps() {
    const steps = [
        { title: "1. Visite technique", desc: "Relevé des équipements existants et du registre de sécurité (obligatoire)." },
        { title: "2. Devis détaillé", desc: "Chiffrage du matériel, de la pose et du contrat de suivi annuel." },
        { title: "3. Mise en conformité", desc: "Pose et vérification par un technicien certifié APSAD." },
        { title: "4. Suivi annuel", desc: "Vérification annuelle, étiquetage daté et attestation remise au responsable." }
    ];

    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 max-w-5xl">
                <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">Comment se passe la maintenance ?</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {steps.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="text-4xl font-black text-red-100 mb-2">0{i + 1}</div>
                            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                            <p className="text-sm text-slate-600">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
