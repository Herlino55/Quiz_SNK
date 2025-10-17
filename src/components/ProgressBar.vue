<template>
    <div>
        Etape {{ value }} / {{ max }}
        <progress :value="value" :max="max" />
    </div>
</template>

<script setup>
defineProps({
    value: Number,
    max: Number
})
</script>