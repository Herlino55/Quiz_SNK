<template>
  <div
    class="background-container"
    :style="{ backgroundImage: `url(${currentBackground})` }"
  >
    <audio ref="audioPlayer" autoplay loop></audio>

    <div class="container">
      <div v-if="state === 'error'" class="state-message error-state">
        <span class="icon">⚠️</span>
        <h1>Échec de l'Assaut</h1>
        <p>Impossible de charger le quiz. Vérifiez votre connexion ou l'état du Bataillon.</p>
        </div>

      <div v-if="state === 'loading'" class="state-message loading-state" aria-busy="true">
        <div class="spinner"></div>
        <h1>Analyse des Données...</h1>
      </div>

      <div v-if="state === 'idle'">
        <Quiz :quiz="quiz" />
      </div>

      <RouterLink to="/" v-if="state === 'idle'" class="btn btn-secondary cancel-link">
        <span class="icon">↩️</span> Retraite
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
// Le code Script est laissé intact, comme demandé.
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Quiz from './Quiz.vue'

const quiz = ref(null)
const state = ref('loading')

const backgroundImages = [
  '/bg4.png','/bg5.png','/bg6.png','/bg7.png','/bg8.png',
  '/bg9.png','/bg10.png','/bg11.png','/bg12.png','/bg13.png','/bg14.png',
  '/bg15.png','/bg16.png','/bg17.png','/bg18.png',
]

const musicTracks = [
  '/music1.mp3','/music2.mp3','/music3.mp3','/music4.mp3','/music5.mp3','/music6.mp3',
]

const currentBackground = ref('')
const audioPlayer = ref(null)

// Changer le fond aléatoirement
const setRandomBackground = () => {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length)
  currentBackground.value = backgroundImages[randomIndex]
}

// Jouer une musique aléatoire
const playRandomMusic = () => {
  const randomIndex = Math.floor(Math.random() * musicTracks.length)
  if (audioPlayer.value) {
    audioPlayer.value.src = musicTracks[randomIndex]
    audioPlayer.value.play().catch(() => {
      console.warn('Lecture automatique bloquée par le navigateur')
    })
  }
}

let backgroundInterval = null
let musicInterval = null

onMounted(() => {
  // Charger le quiz
  fetch('/quiz.json')
    .then(r => r.ok ? r.json() : Promise.reject('Impossible de récupérer le quiz'))
    .then(data => {
      quiz.value = data
      state.value = 'idle'
    })
    .catch(() => {
      state.value = 'error'
    })

  // Changer fond et musique toutes les 10s
  setRandomBackground()
  playRandomMusic()
  backgroundInterval = setInterval(setRandomBackground, 10000)
  musicInterval = setInterval(playRandomMusic, 40000)
})

onBeforeUnmount(() => {
  clearInterval(backgroundInterval)
  clearInterval(musicInterval)
})
</script>


<style scoped>
/* --- 1. Conteneur de Fond Épique --- */
.background-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  /* Transition plus douce pour l'effet de fond changeant */
  transition: background-image 1.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* --- 2. Conteneur Principal (Fenêtre du Quiz) --- */
.container {
  /* Arrière-plan semi-transparent et sombre */
  background: rgba(18, 18, 18, 0.9);
  padding: 3rem;
  border-radius: 12px;
  color: white;
  text-align: center;
  max-width: 800px;
  width: 90%;
  /* Bordure d'accentuation */
  border: 2px solid #E74C3C; /* Rouge Vif */
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.8), 0 0 15px rgba(231, 76, 60, 0.4);
  /* Animation d'apparition discrète */
  animation: fadeInDown 0.6s ease-out;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* --- 3. Styles d'États (Chargement et Erreur) --- */
.state-message {
  font-family: 'Arial Black', sans-serif;
  padding: 30px;
}

.state-message h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.loading-state h1 {
  color: #3498DB; /* Bleu pour l'état "en cours" */
}

.error-state {
  color: #E74C3C; /* Rouge pour l'alerte critique */
}

.error-state .icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 15px;
  animation: shake 0.5s infinite alternate;
}

@keyframes shake {
  0% { transform: translateX(0); }
  100% { transform: translateX(5px); }
}

/* Spinner de chargement */
.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: #3498DB; /* Bleu du bouton utilitaire */
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* --- 4. Lien Annuler (Retraite) --- */
.cancel-link {
  /* Le même style de bouton secondaire du quiz précédent */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  font-size: 1rem;
  font-weight: bold;
  padding: 8px 15px;
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  background-color: transparent;
  border: 2px solid #BDC3C7; /* Gris clair */
  color: #BDC3C7;
  text-transform: uppercase;
}

.cancel-link:hover {
  background-color: rgba(189, 195, 199, 0.1);
  color: white;
  border-color: white;
  transform: translateY(-1px);
}

.cancel-link .icon {
  margin-right: 8px;
}

/* --- 5. Autres éléments --- */
audio {
  display: none;
}
</style>