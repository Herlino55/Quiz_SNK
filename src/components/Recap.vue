<template>
    <div :class="['recap-card', hasWon ? 'victory' : 'defeat']">
        <h3>RAPPORT DE MISSION</h3>
        
        <p class="message">
            {{ hasWon ? quiz.success_message : quiz.failure_message}}
        </p>

        <p class="score-display">
            Score Final : <span class="score-value">{{ score }}</span> / {{quiz.questions.length}}
        </p>

        <p class="result-status">
             {{ hasWon ? "VICTOIRE ! Mission Accomplie." : "DÉFAITE. Entraînez-vous davantage." }}
        </p>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
     quiz: Object,
     answers: Array
})

const score = computed( () => {
    return props.quiz.questions.reduce((acc, question, k) => {
        if(question.correct_answer === props.answers[k]){
            return  acc+1
        }
        return acc
    }, 0)
})

const hasWon = computed( () => score.value >= props.quiz.minimum_score)

</script>

<style scoped>
/* COULEURS THÉMATIQUES : 
    - Général : Sombre (Noir/Gris)
    - Victoire : Vert Vif (#2ECC71) / Succès
    - Défaite : Rouge Vif (#E74C3C) / Alerte
*/

.recap-card {
    /* Style général du panneau de résultat */
    background-color: #1a1a1a;
    padding: 40px 30px;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
    color: white;
    text-align: center;
    max-width: 600px;
    width: 100%;
    margin: 20px auto;
    font-family: 'Arial Black', sans-serif;
    /* Animation d'impact à l'apparition */
    animation: zoomIn 0.5s ease-out;
}

@keyframes zoomIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
}

h3 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-bottom: 2px solid; /* La couleur de la bordure changera avec le thème */
    padding-bottom: 10px;
}

.message {
    font-size: 1.2rem;
    font-style: italic;
    margin-bottom: 30px;
    padding: 10px;
    border-radius: 5px;
}

.score-display {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 15px;
}

.score-value {
    font-size: 2.5rem;
    font-weight: 900;
    margin: 0 5px;
}

.result-status {
    font-size: 1.8rem;
    font-weight: 900;
    margin-top: 30px;
    padding: 10px 0;
    border-top: 1px dashed;
    border-bottom: 1px dashed;
}

/* --- Thème de la VICTOIRE (Vert/Succès) --- */
.recap-card.victory {
    border: 3px solid #2ECC71; /* Vert Vif */
    box-shadow: 0 0 25px rgba(46, 204, 113, 0.6);
}

.victory h3, .victory .result-status {
    color: #2ECC71;
    border-color: #2ECC71;
}

.victory .score-value {
    color: #2ECC71;
    text-shadow: 0 0 10px #2ECC71;
}

.victory .message {
    background-color: rgba(46, 204, 113, 0.1);
}

/* --- Thème de la DÉFAITE (Rouge/Alerte) --- */
.recap-card.defeat {
    border: 3px solid #E74C3C; /* Rouge Vif */
    box-shadow: 0 0 25px rgba(231, 76, 60, 0.6);
    /* Animation de pulsation subtile pour l'alerte */
    animation: zoomIn 0.5s ease-out, pulseAlert 2s infinite alternate 0.5s; 
}

@keyframes pulseAlert {
    from { box-shadow: 0 0 25px rgba(231, 76, 60, 0.6); }
    to { box-shadow: 0 0 35px rgba(231, 76, 60, 0.9); }
}

.defeat h3, .defeat .result-status {
    color: #E74C3C;
    border-color: #E74C3C;
}

.defeat .score-value {
    color: #E74C3C;
    text-shadow: 0 0 10px #E74C3C;
}

.defeat .message {
    background-color: rgba(231, 76, 60, 0.1);
}
</style>