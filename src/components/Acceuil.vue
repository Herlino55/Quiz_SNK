<template>
    <div class="bg">
        <div class="info-toggle-container">
            <button class="toggle-btn" @click="ToggleToast" aria-label="Afficher les informations du Quiz">
                ?
            </button>
        </div>

        <div v-if="showToast" class="info-box">
            <h2>Règles de l'Enquête</h2>
            <p>Ce quiz vous mettra au défi sur la connaissance de l'univers de SNK. Préparez-vous à affronter les Titans du savoir !</p>
            <p>Vous aurez un delai de 10s pour chaque question </p>
            <p class="close-info" @click="ToggleToast">Compris</p>
        </div>

        <div class="container">
            <h1>Bienvenue, Soldat de l'Humanité !</h1>
            <p class="tagline">Le temps de l'Interrogation a sonné. Osez tester vos connaissances !</p>
            <p>Cliquez sur le bouton ci-dessous pour **démarrer l'Assaut** et rejoindre le Bataillon d'Exploration des Savoirs !</p>
            
            <RouterLink to="/quiz" class="btn btn-primary">
                Lancer l'Offensive
                <span class="icon">⚔️</span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const showToast = ref(false);

const ToggleToast = () => {
    showToast.value = !showToast.value;
}
</script>

<style scoped>
/* COULEURS THÉMATIQUES : 
    - Fond : Sombre (Nuit/Gris Ardoise)
    - Accent (SNK) : Rouge sang / Vert (Couleur du Bataillon)
*/

.bg {
    /* Utilisation de votre image de fond pour l'ambiance SNK */
    background-image: url('/bg1.jpg');
    background-color: #1a1a1a; /* Couleur de secours si l'image ne charge pas */
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    /* Un léger filtre sombre pour que le texte ressorte */
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4); 
}

/* --- Conteneur Principal du Texte --- */
.container {
    text-align: center;
    padding-top: 15vh;
    color: white;
    max-width: 900px;
    margin: 0 auto;
    /* Rendre le texte plus lisible sur l'image de fond */
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
}

.container h1 {
    font-family: 'Arial Black', sans-serif; /* Police percutante */
    font-size: 3.5rem;
    color: #E74C3C; /* Rouge Vif d'alerte/épique */
    margin-bottom: 0.8rem;
    letter-spacing: 2px;
}

.tagline {
    font-size: 1.5rem !important;
    font-weight: 500;
    margin: 10px 0 25px 0 !important;
    color: #ECF0F1 !important; /* Blanc cassé */
}

.container p {
    font-size: 1.2rem;
    margin: 10px 0;
    color: #BDC3C7;
}


/* --- Bouton d'Action Principal --- */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
    font-size: 1.4rem;
    font-weight: bold;
    padding: 15px 30px;
    cursor: pointer;
    text-decoration: none;
    border-radius: 5px; 
    transition: all 0.3s ease;
    /* Style plus agressif */
    box-shadow: 0 0 20px rgba(231, 76, 60, 0.6); 
}

.btn-primary {
    background-color: #E74C3C; /* Rouge Vif */
    border: 2px solid #C0392B;
    color: white;
    text-transform: uppercase;
}

.btn-primary:hover {
    background-color: #C0392B; /* Rouge plus foncé au survol */
    transform: scale(1.05); /* Effet d'expansion */
    box-shadow: 0 0 30px rgba(231, 76, 60, 0.8);
}

.icon {
    margin-left: 15px;
    font-size: 1.6rem;
    animation: pulse 1s infinite alternate; /* Animation pour l'icône */
}

@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
}

/* --- Bouton Info '?' et Conteneur --- */
.info-toggle-container {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
}

.toggle-btn {
    background-color: #3498DB; /* Bleu pour un bouton utilitaire */
    color: white;
    border: none;
    font-size: 1.1rem;
    font-weight: bold;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
}

.toggle-btn:hover {
    background-color: #2980B9;
    transform: rotate(15deg);
}

/* --- Boîte d'Information (Alerte/Toast) --- */
.info-box {
    position: absolute;
    top: 65px;
    right: 20px;
    max-width: 350px;
    padding: 20px;
    background-color: rgba(26, 26, 26, 0.95); /* Fond très sombre, semi-transparent */
    color: #ECF0F1; 
    border-radius: 8px;
    border: 1px solid #E74C3C; /* Bordure Rouge Alerte */
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
    animation: slideInRight 0.4s ease;
    z-index: 9;
}

.info-box h2 {
    color: #E74C3C;
    margin-top: 0;
    font-size: 1.6rem;
    border-bottom: 1px dashed #E74C3C;
    padding-bottom: 10px;
}

.info-box p {
    color: #BDC3C7;
}

.close-info {
    text-align: right;
    font-weight: bold;
    color: #3498DB !important; /* Bleu pour l'action */
    cursor: pointer;
    margin-top: 15px !important;
    transition: color 0.2s;
}

.close-info:hover {
    color: #2980B9 !important;
}

/* Animation de la boîte */
@keyframes slideInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
}
</style>