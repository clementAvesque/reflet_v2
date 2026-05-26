<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    Text_value: String,
    variant: {
        type: String,
        default: 'primary'
    }
})
console.log(props.Text_value)
</script>

<template>
    <button :class="['btn', `btn-${variant}`]">{{ props.Text_value }}</button>
</template>

<style scoped>
.btn {
    padding: 12px 30px;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: var(--black);
    color: white;
}

.btn-primary:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: transparent;
    color: var(--black);
    border: 2px solid var(--black);
}

.btn-secondary:hover {
    background-color: var(--black);
    color: white;
    transform: translateY(-2px);
}
</style>