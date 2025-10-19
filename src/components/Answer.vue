<template>
    <label :for="id" :class="['answer-label', classes]">
        
        <input 
            :disabled="disabled" 
            type="radio" 
            name="answer" 
            :id="id" 
            v-model="model" 
            :value="value" 
            @change="onChange"
            class="hidden-radio"
        >
        
        <span class="status-icon">
            <template v-if="classes.isRight">✔</template>
            <template v-else-if="classes.isWrong">✖</template>
        </span>

        <span class="choice-text">{{ value }}</span>

    </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    id: String,
    disabled: Boolean,
    value: String,
    correctAnswer: String
})
const emits = defineEmits(['change'])
const model = defineModel()
const classes = computed( () => ({
    // J'ai mis à jour les noms de classe pour correspondre à la convention CSS ici
    'isDisabled': props.disabled, 
    'isRight': props.disabled && props.value === props.correctAnswer,
    'isWrong': props.disabled && props.value !== props.correctAnswer && model.value === props.value,
    'isSelected': model.value === props.value && !props.disabled
}))

const onChange = (event) => {
    emits('change', event)
}
</script>

<style scoped>
/* COULEURS THÉMATIQUES : 
    - Rouge Vif (Faux) : #E74C3C
    - Vert Vif (Vrai) : #2ECC71
    - Bleu (Sélection) : #3498DB
    - Fond : #1A1A1A / #2C3E50 (Gris foncé)
*/

.hidden-radio {
    display: none;
}

.answer-label {
    /* Style du bloc cliquable */
    display: flex;
    align-items: center;
    padding: 14px 20px; /* Légèrement réduit pour être moins carré */
    background-color: #2C3E50; /* Gris foncé, moins noir que le fond de la carte */
    color: #ECF0F1; 
    border-radius: 8px; /* Coins plus doux */
    cursor: pointer;
    border: 1px solid #2C3E50; /* Bordure très fine, presque invisible */
    transition: all 0.3s ease-in-out;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4); /* Ombre plus douce */
    position: relative;
    text-align: left;
    font-size: 1.05rem; /* Légèrement plus fin */
    font-weight: 500;
}

.choice-text {
    flex-grow: 1;
}

/* --- 1. État Normal / Hover --- */
.answer-label:hover:not(.isDisabled) {
    background-color: #34495E; /* Léger assombrissement */
    /* Effet de lueur subtil pour l'interactivité */
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.4), 0 2px 5px rgba(0, 0, 0, 0.4); 
    transform: translateY(-1px); /* Mouvement réduit */
}

/* --- 2. État Sélectionné (Avant le feedback) --- */
.answer-label.isSelected {
    background-color: #3498DB; 
    border-color: #3498DB;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.8);
    transform: none;
    font-weight: 700; /* Texte en gras pour la sélection */
}

/* --- 3. État Désactivé (Feedback) --- */
.answer-label.isDisabled {
    cursor: default;
    opacity: 0.85; /* Moins de transparence */
}

/* --- 4. Statut de la Bonne Réponse (Vert) --- */
.answer-label.isRight {
    opacity: 1;
    background-color: #2ECC71; /* Vert Vif (Remplissage complet) */
    color: #1A1A1A; /* Texte sombre sur fond vif pour le contraste */
    border-color: #2ECC71; 
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.9); /* Lueur intense */
    transform: none; /* Pas de scale, moins agressif */
    font-weight: 700;
}

.answer-label.isRight .status-icon {
    color: #1A1A1A; /* Icône foncée sur fond clair */
    opacity: 1;
}

/* --- 5. Statut de la Mauvaise Réponse (Rouge) --- */
.answer-label.isWrong {
    opacity: 1;
    background-color: #E74C3C; /* Rouge Vif (Remplissage complet) */
    color: #1A1A1A; /* Texte sombre sur fond vif */
    border-color: #E74C3C; 
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.8);
}

.answer-label.isWrong .status-icon {
    color: #1A1A1A; /* Icône foncée sur fond clair */
    opacity: 1;
}

/* --- Icône de Statut (Checkmark/X) --- */
.status-icon {
    font-size: 1.2rem; /* Légèrement plus petite */
    margin-right: 12px;
    font-weight: 900;
    opacity: 0; 
    transition: opacity 0.3s ease;
}
</style>