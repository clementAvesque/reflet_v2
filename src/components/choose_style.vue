<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['update:selection'])

const styles = ref([
    { label: 'Décontracté', image: '/style/decontracte.svg', selected: false },
    { label: 'Classique', image: '/style/classique.svg', selected: false },
    { label: 'Tenue de travail', image: '/style/travail.svg', selected: false },
    { label: 'Sport', image: '/style/sport.svg', selected: false },
    { label: 'Bohème', image: '/style/boheme.svg', selected: false },
])

const hasSelection = computed(() => styles.value.some(s => s.selected))
const showAutreInput = ref(false)
const autreValeur = ref('')
const autresChips = ref([])

function toggleStyle(index) {
    styles.value[index].selected = !styles.value[index].selected
    emitSelection()
}

function toggleAutreInput() {
    showAutreInput.value = !showAutreInput.value
    if (!showAutreInput.value) autreValeur.value = ''
}

function validerAutre() {
    const val = autreValeur.value.trim()
    if (!val) return
    autresChips.value.push(val)
    autreValeur.value = ''
    emitSelection()
}

function supprimerChip(index) {
    autresChips.value.splice(index, 1)
    emitSelection()
}

function emitSelection() {
    const selected = styles.value.filter(s => s.selected).map(s => s.label)
    emit('update:selection', [...selected, ...autresChips.value])
}
</script>

<template>
    <div class="styles-container" :class="{ 'has-selection': hasSelection }">
        <div
            v-for="(style, index) in styles"
            :key="index"
            class="style-card"
            :class="{ selected: style.selected }"
            @click="toggleStyle(index)"
        >
            <div class="card-img" :style="{ backgroundImage: `url(${style.image})` }">
                <div class="card-overlay" />
                <div class="check-icon" v-if="style.selected">✓</div>
                <span class="card-label">{{ style.label }}</span>
            </div>
        </div>
    </div>

    <div class="autre-choix-wrapper">
        <button class="autre-choix-btn" :class="{ active: showAutreInput }" @click="toggleAutreInput">
            {{ showAutreInput ? '✕ Annuler' : '+ Ajouter un choix qui n\'est pas proposé' }}
        </button>

        <Transition name="slide">
            <div v-if="showAutreInput" class="input-row">
                <input
                    v-model="autreValeur"
                    class="autre-choix-input"
                    type="text"
                    placeholder="Ex: Streetwear, Vintage..."
                    @keyup.enter="validerAutre"
                    autofocus
                />
                <button class="valider-btn" :disabled="!autreValeur.trim()" @click="validerAutre">✓</button>
            </div>
        </Transition>

        <TransitionGroup name="chip" tag="div" class="chips-wrapper">
            <span v-for="(chip, index) in autresChips" :key="chip + index" class="chip">
                {{ chip }}
                <button class="chip-remove" @click="supprimerChip(index)">✕</button>
            </span>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.styles-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: max-content;
    gap: 2%;
}

.style-card {
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.3s ease;
    user-select: none;
    width: 15vw;
}

.style-card:hover {
    transform: translateY(-4px);
    opacity: 1 !important;
    filter: none !important;
}

.card-img {
    position: relative;
    aspect-ratio: 272 / 352;
    border-radius: 16px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    border: 3px solid transparent;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.style-card.selected .card-img {
    border-radius: 40px;
    border-color: #6a9e3f;
    box-shadow: 0 0 0 2px #6a9e3f40;
}

.card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.2s ease;
}

.style-card.selected .card-overlay {
    background: rgba(106, 158, 63, 0.15);
}

.check-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #6a9e3f;
    color: white;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    z-index: 2;
}

.card-label {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    font-size: 14px;
    font-weight: 600;
    color: white;
    text-align: center;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
    z-index: 2;
    padding: 0 8px;
}

.has-selection .style-card:not(.selected) {
    opacity: 0.45;
    filter: grayscale(30%);
}

.autre-choix-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
}

.autre-choix-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 999px;
    border: 2px solid #6a9e3f;
    background-color: #d4e8b0;
    color: #3a5e1f;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    white-space: nowrap;
}

.autre-choix-btn:hover {
    background-color: #c2da96;
}

.autre-choix-btn.active {
    background-color: #6a9e3f;
    color: white;
    border-color: #4e7a28;
}

.input-row {
    display: flex;
    align-items: center;
    gap: 6px;
}

.autre-choix-input {
    width: 220px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 2px solid #6a9e3f;
    background-color: white;
    color: #3a5e1f;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.autre-choix-input:focus {
    border-color: #4e7a28;
    box-shadow: 0 0 0 3px rgba(106, 158, 63, 0.2);
}

.autre-choix-input::placeholder {
    color: #93b870;
}

.valider-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 2px solid #6a9e3f;
    background-color: #6a9e3f;
    color: white;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease, opacity 0.2s ease;
    flex-shrink: 0;
}

.valider-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.valider-btn:not(:disabled):hover {
    background-color: #4e7a28;
}

.chips-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
}

.chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    background-color: #d4e8b0;
    border: 2px solid #6a9e3f;
    color: #3a5e1f;
    font-size: 14px;
    font-weight: 500;
}

.chip-remove {
    background: none;
    border: none;
    cursor: pointer;
    color: #6a9e3f;
    font-size: 11px;
    padding: 0;
    line-height: 1;
    display: flex;
    align-items: center;
    transition: color 0.15s ease;
}

.chip-remove:hover {
    color: #3a5e1f;
}

.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-8px);
}

.chip-enter-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.chip-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.chip-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.chip-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>