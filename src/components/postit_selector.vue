<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['update:selection'])

const contextes = ref([
    { label: 'Professionnelle', image: '/postits/professionnelle.svg', selected: false, dark: false },
    { label: 'Sportivité',      image: '/postits/sportivite.svg',      selected: false, dark: true  },
    { label: 'Convivialité',    image: '/postits/convivialite.svg',    selected: false, dark: false },
    { label: 'Festivité',       image: '/postits/festivite.svg',       selected: false, dark: true  },
    { label: 'Mobilité',        image: '/postits/mobilite.svg',        selected: false, dark: false },
    { label: 'Sérénité',        image: '/postits/serenite.svg',        selected: false, dark: false },
])

const hasSelection = computed(() => contextes.value.some(t => t.selected))
const showAutreInput = ref(false)
const autreValeur = ref('')
const autresChips = ref([])

function toggleTag(index) {
    contextes.value[index].selected = !contextes.value[index].selected
    emitSelection()
}

function toggleAutreInput() {
    showAutreInput.value = !showAutreInput.value
    if (!showAutreInput.value) {
        autreValeur.value = ''
    }
    emitSelection()
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
    const selected = contextes.value.filter(t => t.selected).map(t => t.label)
    emit('update:selection', [...selected, ...autresChips.value])
}
</script>

<template>
    <div class="tags-container" :class="{ 'has-selection': hasSelection }">
        <div
            v-for="(tag, index) in contextes"
            :key="index"
            class="tag"
            :class="{ selected: tag.selected, dark: tag.dark }"
            @click="toggleTag(index)"
            :style="{ backgroundImage: `url(${tag.image})` }"
        >
            <span>{{ tag.label }}</span>
        </div>
    </div>

    <div class="autre-choix-wrapper">
        <button
            class="autre-choix-btn"
            :class="{ active: showAutreInput }"
            @click="toggleAutreInput"
        >
            {{ showAutreInput ? '✕ Annuler' : 'Ajouter un choix qui n\'est pas proposé' }}
        </button>

        <Transition name="slide">
            <div v-if="showAutreInput" class="input-row">
                <input
                    v-model="autreValeur"
                    class="autre-choix-input"
                    type="text"
                    placeholder="Ex: Élégance, Sport urbain..."
                    @keyup.enter="validerAutre"
                    autofocus
                />
                <button
                    class="valider-btn"
                    :disabled="!autreValeur.trim()"
                    @click="validerAutre"
                >
                    ✓
                </button>
            </div>
        </Transition>

        <TransitionGroup name="chip" tag="div" class="chips-wrapper">
            <span
                v-for="(chip, index) in autresChips"
                :key="chip + index"
                class="chip"
            >
                {{ chip }}
                <button class="chip-remove" @click="supprimerChip(index)">✕</button>
            </span>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.tags-container {
    margin-top: 80px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
    width: max-content;
    gap: 10px;
}

.tag {
    width: 200px;
    height: 200px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: filter 0.3s ease, transform 0.2s ease, opacity 0.3s ease;
    user-select: none;
}

.tag span {
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding: 0 10px;
    transition: color 0.3s ease;
}

.tag.dark span { color: white; }
.tag:not(.dark) span { color: black; }
.tag.selected.dark span { color: white; }
.tag.selected:not(.dark) span { color: black; }

.has-selection .tag:not(.selected) {
    opacity: 0.4;
    filter: brightness(0.6);
}

.has-selection .tag:not(.selected) span { color: black; }

.tag.selected {
    opacity: 1;
    filter: brightness(1);
    transform: translateY(-4px);
}

.tag:hover {
    transform: translateY(-4px);
    opacity: 1 !important;
    filter: brightness(1) !important;
}

/* Wrapper global */
.autre-choix-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 50px;
}

/* Bouton toggle */
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

.autre-choix-btn:hover { background-color: #c2da96; }

.autre-choix-btn.active {
    background-color: #6a9e3f;
    color: white;
    border-color: #4e7a28;
}

/* Input + bouton valider */
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

.autre-choix-input::placeholder { color: #93b870; }

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

/* Chips wrapper */
.chips-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
}

/* Chip individuelle */
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

.chip-remove:hover { color: #3a5e1f; }

/* Animations input */
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-8px);
}

/* Animations chips */
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