# FriedShop Admin - Scanner QR

Application admin pour scanner et valider les commandes FriedShop via QR codes.

## 🚀 Fonctionnalités

- **Scanner QR codes** des commandes en temps réel
- **Validation/Rejet** des commandes avec mise à jour Firebase
- **Historique** des commandes traitées
- **Interface responsive** et moderne
- **Connexion Firebase** pour synchronisation

## 📱 Utilisation

1. **Ouvrir l'application** dans un navigateur
2. **Cliquer sur "Démarrer le scanner"** pour activer la caméra
3. **Scanner le QR code** d'une commande
4. **Valider ou rejeter** la commande
5. **Voir l'historique** des commandes traitées

## ⚙️ Configuration

### 1. Configuration Firebase

Modifiez la configuration Firebase dans `index.html` :

```javascript
const firebaseConfig = {
    apiKey: "votre-api-key",
    authDomain: "votre-projet.firebaseapp.com",
    projectId: "votre-projet-id",
    storageBucket: "votre-projet.appspot.com",
    messagingSenderId: "123456789",
    appId: "votre-app-id"
};
```

### 2. Règles Firestore

Assurez-vous que les règles Firestore permettent la mise à jour des commandes :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Déploiement

#### Option 1: Serveur local
```bash
# Servir les fichiers statiques
python -m http.server 8080
# ou
npx serve .
```

#### Option 2: Hébergement web
- Uploadez les fichiers sur votre hébergeur
- Configurez HTTPS (requis pour la caméra)

## 🔧 Fonctionnement

### Génération QR Code (App principale)
- Quand un utilisateur passe commande
- QR code généré avec toutes les infos
- Téléchargeable et affichable

### Scanner Admin
- Scan du QR code via caméra
- Parsing des données de commande
- Affichage des détails
- Validation/Rejet avec mise à jour Firebase

### Synchronisation
- Statut mis à jour en temps réel
- Historique local des actions admin
- Notifications de succès/erreur

## 📋 Données QR Code

Le QR code contient :
```json
{
  "orderId": "CMD123456",
  "customerName": "Jean Dupont",
  "customerPhone": "+229 97 12 34 56",
  "total": 150000,
  "items": [...],
  "deliveryType": "delivery",
  "address": {...},
  "paymentMethod": "cash",
  "status": "pending",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

## 🛡️ Sécurité

- **HTTPS requis** pour accès caméra
- **Authentification Firebase** recommandée
- **Validation des données** QR code
- **Logs des actions** admin

## 📱 Compatibilité

- **Chrome/Safari** (mobile et desktop)
- **Firefox** (avec permissions caméra)
- **Edge** (versions récentes)
- **Caméra requise** pour le scan

## 🎨 Interface

- **Design moderne** avec Tailwind CSS
- **Animations fluides** et micro-interactions
- **Responsive** pour mobile et desktop
- **Feedback visuel** pour toutes les actions

## 🔄 Workflow

1. **Client** passe commande → QR généré
2. **Admin** scanne QR → Détails affichés
3. **Admin** valide → Statut "confirmed" dans Firebase
4. **Client** voit statut mis à jour dans son profil

## 🚨 Dépannage

### Caméra ne fonctionne pas
- Vérifiez HTTPS
- Autorisez l'accès caméra
- Testez sur un autre navigateur

### QR code non reconnu
- Vérifiez la qualité de l'image
- Assurez-vous que c'est un QR FriedShop
- Vérifiez la luminosité

### Erreur Firebase
- Vérifiez la configuration
- Contrôlez les règles Firestore
- Vérifiez la connexion internet

## 📞 Support

Pour toute question ou problème :
- Vérifiez la console navigateur
- Testez la configuration Firebase
- Contactez le support technique