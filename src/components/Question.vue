<template>
    <div class="question">
        <h3> {{ question.question }} </h3>
        <ul>
            <li v-for="(choice, index) in randomChoice" :key="choice">
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
        {{ answer }}
         <!-- <button :disabled="!hasAnswer" @click="emits('answer', answer)">Question suivante</button> -->
    </div>
</template>

<script setup>
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
    // answer.value = e.currentTarget.value
    clearTimeout(timer)
    timer = setTimeout( () =>{
        emits('answer', answer.value)
    }, 1_000)
 }

 onMounted( () => {
    timer = setTimeout( () =>{
        emits('answer', answer)
    }, 10_000)
 })

 onUnmounted( () =>{
    clearTimeout(timer)
 })
</script>

<style scoped>
.question{
    padding-top: 2rem;
}
li {
    list-style: none;
}
.question button{
    margin-left: auto;
    display: block;
}
</style>