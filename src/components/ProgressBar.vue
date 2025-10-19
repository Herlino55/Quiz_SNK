<template>
    <div class="progress-container">
        <p class="progress-text">
            Avancement de l'Assaut : Étape <span class="current-step">{{ value }}</span> / <span class="max-steps">{{ max }}</span>
        </p>
        
        <progress :value="value" :max="max" class="progress-bar" />
    </div>
</template>

<script setup>
defineProps({
    value: Number,
    max: Number
})
</script>

<style scoped>
/* COULEURS THÉMATIQUES : 
    - Fond de la barre : Gris sombre (#34495E)
    - Remplissage : Rouge Vif (#E74C3C) ou Bleu/Vert (selon le contexte SNK)
*/

.progress-container {
    text-align: center;
    margin: 20px auto;
    padding: 15px 25px;
    background-color: rgba(0, 0, 0, 0.6); /* Fond sombre semi-transparent */
    border-radius: 8px;
    max-width: 90%;
    width: 450px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border: 1px solid #34495E; /* Bordure gris ardoise */
}

.progress-text {
    font-size: 1.1rem;
    color: #ECF0F1; /* Texte blanc cassé */
    margin-bottom: 10px;
    font-weight: 500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.current-step {
    font-weight: 900;
    color: #E74C3C; /* Rouge Vif pour l'étape actuelle */
    font-size: 1.3rem;
}

.max-steps {
    font-weight: 900;
    color: #BDC3C7; /* Gris clair */
    font-size: 1.3rem;
}

/* --- Style de la Barre de Progression --- */
.progress-bar {
    /* Style général pour le conteneur de la barre */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    height: 25px; /* Épaisseur de la barre */
    border: 2px solid #E74C3C; /* Bordure rouge alerte */
    border-radius: 4px;
    overflow: hidden; /* Important pour cacher les coins du remplissage */
    box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.8);
}

/* Style de la partie non remplie (le fond de la barre) pour Webkit (Chrome, Safari) */
.progress-bar::-webkit-progress-bar {
    background-color: #34495E; /* Gris ardoise foncé */
}

/* Style de la partie remplie (la progression) pour Webkit */
.progress-bar::-webkit-progress-value {
    background-color: #E74C3C; /* Rouge Vif comme jauge de tension/danger */
    transition: width 0.4s ease-in-out;
    /* Optionnel : un effet 3D pour simuler une jauge d'énergie */
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.7);
}

/* Style de la partie non remplie (le fond de la barre) pour Firefox */
.progress-bar::-moz-progress-bar {
    background-color: #E74C3C; /* Rouge Vif */
    /* Le remplissage est la seule partie que Firefox permet de styliser directement,
       le fond est par défaut */
    border-radius: 2px;
}

/* Pour que Firefox fonctionne bien, nous appliquons la couleur de fond du conteneur
   de la barre (qui est techniquement le fond visible) */
.progress-bar {
    background-color: #34495E;
}
</style>