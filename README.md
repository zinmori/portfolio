# Portfolio - Ezechiel AGBAN

Portfolio personnel migré de Vite + React vers Next.js 16

## 🚀 Technologies utilisées

- **Next.js 16** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations et transitions
- **EmailJS** - Service d'envoi d'emails
- **Vercel Analytics** - Suivi des performances

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.local.example .env.local

# Configurer vos clés EmailJS dans .env.local
```

## 🛠️ Développement

```bash
# Démarrer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build de production

```bash
# Créer un build optimisé
npm run build

# Démarrer le serveur de production
npm start
```

## 📝 Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=votre_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key
```

## 📂 Structure du projet

```
portfolio/
├── app/                    # App Router Next.js
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── src/
│   ├── components/        # Composants réutilisables
│   ├── pages/            # Sections de la page
│   ├── assets/           # Images et documents
│   └── index.css         # Styles globaux
├── public/               # Fichiers statiques
└── next.config.mjs       # Configuration Next.js
```

## 🔄 Migration de Vite vers Next.js

Les principales modifications effectuées :

1. **Routage** : Migration vers Next.js App Router
2. **Variables d'environnement** : `import.meta.env.VITE_*` → `process.env.NEXT_PUBLIC_*`
3. **Composants** : Ajout de `'use client'` pour les composants interactifs
4. **Fonts** : Utilisation de `next/font/google` pour l'optimisation des polices
5. **Images** : Configuration pour l'optimisation (désactivée pour export statique)

## 🚢 Déploiement

Le projet est optimisé pour le déploiement sur Vercel :

```bash
# Déploiement automatique via Vercel CLI
vercel
```

## 📄 Licence

© 2025 Ezechiel AGBAN. Tous droits réservés.
