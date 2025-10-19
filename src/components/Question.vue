<template>
    <div class="question-card">
        <div class="question-header">
            <h3> {{ question.question }} </h3>
        </div>

        <ul class="choice-list">
            <li v-for="(choice, index) in randomChoice" :key="choice" class="choice-item">
                <Answer 
                :id="`answer${index}`"
                :disabled="hasAnswer"
                :value="choice"
                v-model="answer"
                :correctAnswer="question.correct_answer"
                @change="onAnswer"
                />
            </li>
        </ul>

        <p v-if="answer" class="feedback-answer">
            Sélection : {{ answer }}
        </p>

        </div>
</template>

<script setup>
// Le script reste inchangé
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { shuffleArray } from './function/array';
import Answer from './Answer.vue';

const props = defineProps({
    question: Object
})
const answer = ref(null)
const emits = defineEmits(['answer'])

const hasAnswer = computed( () => answer.value !== null )

const randomChoice = computed( () => shuffleArray(props.question.choices))

let timer

const onAnswer = (e) => {
    // answer.value = e.currentTarget.value // Commenté, car v-model gère déjà ceci
    clearTimeout(timer)
    timer = setTimeout( () =>{
        emits('answer', answer.value)
    }, 1_000)
}

onMounted( () => {
    // Minuteur de 10 secondes pour le passage automatique
    timer = setTimeout( () =>{
        emits('answer', answer.value)
    }, 10_000)
})

onUnmounted( () =>{
    clearTimeout(timer)
})
</script>

<style scoped>
/* --- COULEURS ET POLICES SNK (Révisées) --- */
/* Rouge Vif (Accent Primaire) : #E74C3C */
/* Bleu Utilitaire (Accent Secondaire) : #3498DB */
/* Fond Sombre : #121212 (plus sombre et raffiné) */
/* Gris Clair : #BDC3C7 */

.question-card {
    padding: 35px; /* Légèrement plus de padding */
    background-color: #121212; /* Fond plus noir */
    border-radius: 12px; /* Coins plus doux */
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.8), 0 0 10px rgba(231, 76, 60, 0.1); /* Ombre diffuse */
    color: white;
    width: 100%;
    max-width: 650px; /* Légèrement plus étroit */
    margin: 0 auto;
    font-family: 'Segoe UI', Arial, sans-serif; /* Police plus lisible */
    border: 1px solid rgba(231, 76, 60, 0.2); /* Bordure très fine et subtile */
}

/* --- Style de la Question (Header) --- */
.question-header {
    background-color: transparent; /* Suppression du fond plein */
    padding: 0 0 15px 0; /* Plus de padding en bas seulement */
    margin: 0 0 30px 0; /* Espace après la question */
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    
    /* Ligne de séparation subtile avec ombre rouge/bleue */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
    box-shadow: 0 3px 5px rgba(231, 76, 60, 0.1);
}

.question-header h3 {
    font-size: 1.7rem; /* Légèrement plus petit */
    color: #ECF0F1; 
    margin: 0;
    font-weight: 700;
    /* Ombre de texte plus subtile pour un effet de lumière */
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3), 0 0 2px rgba(0, 0, 0, 1);
}

/* --- Style des Choix de Réponse --- */
.choice-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px; /* Espacement réduit pour l'élégance */
}

.choice-item {
    text-align: left;
}

/* --- Style pour le texte de débogage --- */
.feedback-answer {
    margin-top: 30px;
    font-size: 0.8rem; /* Plus petit */
    color: #3498DB; /* Couleur bleue pour l'information */
    text-align: right;
    font-style: normal;
    font-weight: 600;
    letter-spacing: 0.5px;
}
</style>