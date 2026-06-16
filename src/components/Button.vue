<template>
  <button :class="['btn', variant]" @click="$emit('click')">
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'primary'
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn.terciere {
  background-color: var(--secondary-color);

}

.btn:hover {
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.95);
}

.btn.primary {
  background-color: var(--third-color);
  color: white ;
}

.btn.btn-primary:hover {
  background-color: white;
  color: var(--third-color);
}

.btn.secondary {
  background-color: transparent;
  border: 2px solid #333;
  color: #333;
}

.btn.secondary:hover {
  background-color: #f0f0f0;
}
</style>
