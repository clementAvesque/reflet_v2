<script>
export default {
    data() {
        return {
            form: {
                couleurPreferee: '',
                couleurEvitee: '',
                styles: [],
                associationCouleur: '',
                contexte: '' 
            },
            submitted: false,
            loading: false,
            wheelPreviewPref: null,
            wheelPreviewEvit: null,
            customStyleInput: '', // Pour le style manuel
            customContexteInput: '', // Pour le contexte manuel (NOUVEAU)

            couleurs: [
                { label: 'Rouge',     hex: '#E8403A' },
                { label: 'Orange',    hex: '#F28F17' },
                { label: 'Jaune',     hex: '#F5C842' },
                { label: 'Vert',      hex: '#467948' },
                { label: 'Turquoise', hex: '#2BBFB0' },
                { label: 'Bleu',      hex: '#3A7BD5' },
                { label: 'Violet',    hex: '#7B5EA7' },
                { label: 'Rose',      hex: '#E8649A' },
                { label: 'Marron',    hex: '#8B5E3C' },
                { label: 'Beige',     hex: '#D4BFA0' },
                { label: 'Gris',      hex: '#9E9E9E' },
                { label: 'Noir',      hex: '#222222' },
                { label: 'Blanc',     hex: '#F5F5F5' },
            ],

            stylesDisponibles: [
                { value: 'streetwear',  label: 'Streetwear' },
                { value: 'large',       label: 'Large / Oversized' },
                { value: 'casual',      label: 'Casual' },
                { value: 'minimaliste', label: 'Minimaliste' },
                { value: 'classique',   label: 'Classique' },
                { value: 'sport',       label: 'Sportswear' },
                { value: 'boheme',      label: 'Bohème' },
                { value: 'elegant',     label: 'Élégant' },
            ],

            contextesDisponibles: [
                { value: 'travail',    label: 'Travail' },
                { value: 'sortie',     label: 'Sortie / Soirée' },
                { value: 'detente',    label: 'Détente' },
                { value: 'sport',      label: 'Sport' },
                { value: 'voyage',     label: 'Voyage' },
                { value: 'ceremonie',  label: 'Cérémonie' },
            ],

            wheelPreviewAssoc: null,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.drawWheel('wheelPref')
            this.drawWheel('wheelEvit')
            this.drawWheel('wheelAssoc')
        })
    },
    methods: {
        drawWheel(refName) {
            const canvas = this.$refs[refName]
            if (!canvas) return
            const ctx = canvas.getContext('2d')
            const cx = canvas.width / 2
            const cy = canvas.height / 2
            const r = cx - 4

            for (let angle = 0; angle < 360; angle++) {
                const start = (angle - 1) * Math.PI / 180
                const end   = (angle + 1) * Math.PI / 180
                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
                grad.addColorStop(0,   `hsla(${angle},0%,100%,1)`)
                grad.addColorStop(0.5, `hsla(${angle},100%,50%,1)`)
                grad.addColorStop(1,   `hsla(${angle},100%,20%,1)`)
                ctx.beginPath()
                ctx.moveTo(cx, cy)
                ctx.arc(cx, cy, r, start, end)
                ctx.closePath()
                ctx.fillStyle = grad
                ctx.fill()
            }

            const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.12)
            centerGrad.addColorStop(0,   '#ffffff')
            centerGrad.addColorStop(0.5, '#888888')
            centerGrad.addColorStop(1,   '#000000')
            ctx.beginPath()
            ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2)
            ctx.fillStyle = centerGrad
            ctx.fill()
        },

        getColorFromWheel(canvas, e) {
            const rect = canvas.getBoundingClientRect()
            const x = (e.clientX - rect.left) * (canvas.width / rect.width)
            const y = (e.clientY - rect.top)  * (canvas.height / rect.height)
            const ctx = canvas.getContext('2d')
            const p = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data
            return `#${[p[0],p[1],p[2]].map(v => v.toString(16).padStart(2,'0')).join('')}`
        },

        pickFromWheel(e, field) {
            const refName = field === 'couleurPreferee' ? 'wheelPref' : 'wheelEvit'
            const canvas = this.$refs[refName]
            if (!canvas) return
            const hex = this.getColorFromWheel(canvas, e)
            this.form[field] = hex
        },

        previewWheel(e, which) {
            const map = { pref: 'wheelPref', evit: 'wheelEvit', assoc: 'wheelAssoc' }
            const canvas = this.$refs[map[which]]
            if (!canvas) return
            const hex = this.getColorFromWheel(canvas, e)
            if (which === 'pref')  this.wheelPreviewPref  = hex
            else if (which === 'evit')  this.wheelPreviewEvit  = hex
            else                   this.wheelPreviewAssoc = hex
        },

        toggleStyle(val) {
            const idx = this.form.styles.indexOf(val)
            if (idx >= 0) this.form.styles.splice(idx, 1)
            else this.form.styles.push(val)
        },

        addCustomStyle() {
            const val = this.customStyleInput.trim()
            if (val && !this.form.styles.includes(val)) {
                this.form.styles.push(val)
                this.customStyleInput = ''
            }
        },

        // Nouvelle méthode pour définir un contexte manuel
        setCustomContexte() {
            const val = this.customContexteInput.trim()
            if (val) {
                this.form.contexte = val
                this.customContexteInput = ''
            }
        },

        async handleSubmit() {
            if (!this.form.couleurPreferee || !this.form.couleurEvitee || !this.form.styles.length || !this.form.associationCouleur || !this.form.contexte) return
            this.loading = true
            await new Promise(r => setTimeout(r, 900))
            this.submitted = true
            this.loading = false
        },

        reset() {
            this.form = { 
                couleurPreferee: '', 
                couleurEvitee: '', 
                styles: [], 
                associationCouleur: '',
                contexte: '' 
            }
            this.customStyleInput = ''
            this.customContexteInput = ''
            this.submitted = false
        },

        labelCouleur(hex) {
            const c = this.couleurs.find(c => c.hex === hex)
            return c ? c.label : hex
        },
        labelAssoc(val) {
            return this.labelCouleur(val) 
        },
        labelStyles() {
            return this.form.styles.map(s => {
                const found = this.stylesDisponibles.find(x => x.value === s)
                if (found) return found.label
                return s.charAt(0).toUpperCase() + s.slice(1)
            }).join(', ')
        },
        labelContexte() {
            const found = this.contextesDisponibles.find(c => c.value === this.form.contexte)
            // Si on trouve pas dans la liste (c'est un customs), on retourne la valeur directe
            return found ? found.label : this.form.contexte
        }
    }
}
</script>

<template>
    <main id="perso-page">

        <!-- Hero -->
        <section id="perso-hero">
            <div class="hero-inner">
                <span class="eyebrow">Personnalisation</span>
                <h1>Reflet, à votre image.</h1>
                <p>Dites-nous vos préférences : Reflet s'adapte à votre style et vous propose des tenues qui vous ressemblent vraiment.</p>
            </div>
            <div class="hero-deco" aria-hidden="true">
                <svg viewBox="0 0 400 400" fill="none">
                    <circle cx="200" cy="200" r="180" stroke="#ffffff22" stroke-width="1"/>
                    <circle cx="200" cy="200" r="120" stroke="#ffffff33" stroke-width="1"/>
                    <circle cx="200" cy="200" r="60"  stroke="#ffffff44" stroke-width="1.5"/>
                    <circle cx="200" cy="200" r="8"   fill="#ffffff66"/>
                </svg>
            </div>
        </section>

        <!-- Corps -->
        <section id="perso-body">

            <div id="perso-form-wrap">

                <!-- Formulaire -->
                <div v-if="!submitted" class="form-card">
                    <h2>Vos préférences</h2>
                    <p class="form-subtitle">Chaque choix aide Reflet à mieux vous habiller chaque matin.</p>

                    <form @submit.prevent="handleSubmit" novalidate>

                        <!-- 1. Couleur préférée -->
                        <div class="field">
                            <label>Votre couleur préférée</label>
                            <p class="field-hint">La couleur que vous portez le plus volontiers.</p>
                            <div class="color-grid">
                                <button
                                    v-for="c in couleurs"
                                    :key="c.hex"
                                    type="button"
                                    class="color-dot"
                                    :class="{ selected: form.couleurPreferee === c.hex, avoid: form.couleurEvitee === c.hex }"
                                    :style="{ background: c.hex }"
                                    :title="c.label"
                                    :aria-label="c.label"
                                    :disabled="form.couleurEvitee === c.hex"
                                    @click="form.couleurPreferee = c.hex"
                                >
                                    <span v-if="form.couleurPreferee === c.hex" class="dot-check" aria-hidden="true">✓</span>
                                </button>
                            </div>

                            <!-- Wheel préférée -->
                            <details class="wheel-details">
                                <summary class="wheel-summary">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style="flex-shrink:0">
                                        <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1"/>
                                        <path d="M7 1a6 6 0 0 1 5.2 3L7 7Z" fill="#E8403A"/>
                                        <path d="M12.2 4A6 6 0 0 1 7 13V7Z" fill="#F5C842"/>
                                        <path d="M7 13a6 6 0 0 1-5.2-3L7 7Z" fill="#467948"/>
                                        <path d="M1.8 10A6 6 0 0 1 7 1v6Z" fill="#3A7BD5"/>
                                    </svg>
                                    Couleur introuvable dans la liste ? Choisir sur le cercle
                                </summary>
                                <div class="wheel-wrap">
                                    <div class="wheel-canvas-wrap">
                                        <canvas
                                            ref="wheelPref"
                                            class="color-wheel"
                                            width="180"
                                            height="180"
                                            @click="pickFromWheel($event, 'couleurPreferee')"
                                            @mousemove="previewWheel($event, 'pref')"
                                            @mouseleave="wheelPreviewPref = null"
                                        ></canvas>
                                        <div class="wheel-cursor" v-if="form.couleurPreferee && !couleurs.find(c => c.hex === form.couleurPreferee)" :style="{ background: form.couleurPreferee }"></div>
                                    </div>
                                    <div class="wheel-side">
                                        <div class="wheel-preview-box" :style="{ background: wheelPreviewPref || form.couleurPreferee || '#eee' }"></div>
                                        <span class="wheel-hex">{{ wheelPreviewPref || form.couleurPreferee || '—' }}</span>
                                        <p class="wheel-tip">Survolez pour prévisualiser, cliquez pour sélectionner.</p>
                                    </div>
                                </div>
                            </details>

                            <div v-if="form.couleurPreferee" class="color-selected-label">
                                <span class="swatch-mini" :style="{ background: form.couleurPreferee }"></span>
                                {{ labelCouleur(form.couleurPreferee) }} sélectionné
                            </div>
                        </div>

                        <!-- 2. Couleur évitée -->
                        <div class="field">
                            <label>Couleur que vous n'aimez pas</label>
                            <p class="field-hint">Reflet évitera de vous la proposer.</p>
                            <div class="color-grid">
                                <button
                                    v-for="c in couleurs"
                                    :key="c.hex"
                                    type="button"
                                    class="color-dot"
                                    :class="{ selected: form.couleurEvitee === c.hex, 'avoid-selected': form.couleurEvitee === c.hex, pref: form.couleurPreferee === c.hex }"
                                    :style="{ background: c.hex }"
                                    :title="c.label"
                                    :aria-label="c.label"
                                    :disabled="form.couleurPreferee === c.hex"
                                    @click="form.couleurEvitee = c.hex"
                                >
                                    <span v-if="form.couleurEvitee === c.hex" class="dot-check" aria-hidden="true">✕</span>
                                </button>
                            </div>

                            <!-- Wheel évitée -->
                            <details class="wheel-details">
                                <summary class="wheel-summary">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style="flex-shrink:0">
                                        <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1"/>
                                        <path d="M7 1a6 6 0 0 1 5.2 3L7 7Z" fill="#E8403A"/>
                                        <path d="M12.2 4A6 6 0 0 1 7 13V7Z" fill="#F5C842"/>
                                        <path d="M7 13a6 6 0 0 1-5.2-3L7 7Z" fill="#467948"/>
                                        <path d="M1.8 10A6 6 0 0 1 7 1v6Z" fill="#3A7BD5"/>
                                    </svg>
                                    Couleur introuvable dans la liste ? Choisir sur le cercle
                                </summary>
                                <div class="wheel-wrap">
                                    <div class="wheel-canvas-wrap">
                                        <canvas
                                            ref="wheelEvit"
                                            class="color-wheel"
                                            width="180"
                                            height="180"
                                            @click="pickFromWheel($event, 'couleurEvitee')"
                                            @mousemove="previewWheel($event, 'evit')"
                                            @mouseleave="wheelPreviewEvit = null"
                                        ></canvas>
                                    </div>
                                    <div class="wheel-side">
                                        <div class="wheel-preview-box" :style="{ background: wheelPreviewEvit || form.couleurEvitee || '#eee' }"></div>
                                        <span class="wheel-hex">{{ wheelPreviewEvit || form.couleurEvitee || '—' }}</span>
                                        <p class="wheel-tip">Survolez pour prévisualiser, cliquez pour sélectionner.</p>
                                    </div>
                                </div>
                            </details>

                            <div v-if="form.couleurEvitee" class="color-selected-label avoid-label">
                                <span class="swatch-mini" :style="{ background: form.couleurEvitee }"></span>
                                {{ labelCouleur(form.couleurEvitee) }} à éviter
                            </div>
                        </div>

                        <!-- 3. CONTEXTE (Avec input manuel) -->
                        <div class="field">
                            <label>Dans quel contexte voulez-vous vous habiller ?</label>
                            <p class="field-hint">Sélectionnez la situation principale.</p>
                            <div class="chips-grid radio-group">
                                <label 
                                    v-for="c in contextesDisponibles"
                                    :key="c.value"
                                    class="chip"
                                    :class="{ active: form.contexte === c.value }"
                                >
                                    <input 
                                        type="radio" 
                                        :name="'contexte'" 
                                        :value="c.value" 
                                        v-model="form.contexte"
                                        class="sr-only"
                                    >
                                    {{ c.label }}
                                </label>
                            </div>

                            <!-- Toggle pour autre événement (NOUVEAU) -->
                            <details class="wheel-details">
                                <summary class="wheel-summary">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style="flex-shrink:0">
                                        <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    Autre événement non listé ?
                                </summary>
                                <div class="custom-style-wrap">
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            v-model="customContexteInput" 
                                            @keyup.enter="setCustomContexte"
                                            placeholder="Ex: Entretien, Baptême, Première date..."
                                            class="custom-input"
                                        >
                                        <button 
                                            type="button" 
                                            @click="setCustomContexte"
                                            class="add-style-btn"
                                        >
                                            Définir
                                        </button>
                                    </div>
                                </div>
                            </details>
                        </div>

                        <!-- 4. Style vestimentaire -->
                        <div class="field">
                            <label>Votre style vestimentaire</label>
                            <p class="field-hint">Sélectionnez un ou plusieurs styles qui vous correspondent.</p>
                            <div class="chips-grid">
                                <button
                                    v-for="s in stylesDisponibles"
                                    :key="s.value"
                                    type="button"
                                    class="chip"
                                    :class="{ active: form.styles.includes(s.value) }"
                                    @click="toggleStyle(s.value)"
                                >
                                    {{ s.label }}
                                </button>
                                <button
                                    v-for="(customStyle, index) in form.styles.filter(s => !stylesDisponibles.find(x => x.value === s))"
                                    :key="'custom-'+index"
                                    type="button"
                                    class="chip custom-chip"
                                    :class="{ active: true }"
                                    @click="toggleStyle(customStyle)"
                                >
                                    {{ customStyle }}
                                </button>
                            </div>

                            <!-- Toggle pour ajouter un style manuel -->
                            <details class="wheel-details">
                                <summary class="wheel-summary">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style="flex-shrink:0">
                                        <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                    Votre style n'est pas dans la liste ? Ajoutez-le ici
                                </summary>
                                <div class="custom-style-wrap">
                                    <div class="input-group">
                                        <input 
                                            type="text" 
                                            v-model="customStyleInput" 
                                            @keyup.enter="addCustomStyle"
                                            placeholder="Ex: Punk, Vintage, Hypebeast..."
                                            class="custom-input"
                                        >
                                        <button 
                                            type="button" 
                                            @click="addCustomStyle"
                                            class="add-style-btn"
                                        >
                                            Ajouter
                                        </button>
                                    </div>
                                </div>
                            </details>
                        </div>

                        <!-- 5. Association de couleurs -->
                        <div class="field">
                            <label>Couleur que vous aimez associer</label>
                            <p class="field-hint">La couleur avec laquelle vous aimez combiner vos tenues.</p>
                            <div class="color-grid">
                                <button
                                    v-for="c in couleurs"
                                    :key="c.hex"
                                    type="button"
                                    class="color-dot"
                                    :class="{ selected: form.associationCouleur === c.hex }"
                                    :style="{ background: c.hex }"
                                    :title="c.label"
                                    :aria-label="c.label"
                                    @click="form.associationCouleur = c.hex"
                                >
                                    <span v-if="form.associationCouleur === c.hex" class="dot-check" aria-hidden="true">✓</span>
                                </button>
                            </div>

                            <!-- Wheel association -->
                            <details class="wheel-details">
                                <summary class="wheel-summary">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style="flex-shrink:0">
                                        <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1"/>
                                        <path d="M7 1a6 6 0 0 1 5.2 3L7 7Z" fill="#E8403A"/>
                                        <path d="M12.2 4A6 6 0 0 1 7 13V7Z" fill="#F5C842"/>
                                        <path d="M7 13a6 6 0 0 1-5.2-3L7 7Z" fill="#467948"/>
                                        <path d="M1.8 10A6 6 0 0 1 7 1v6Z" fill="#3A7BD5"/>
                                    </svg>
                                    Couleur introuvable dans la liste ? Choisir sur le cercle
                                </summary>
                                <div class="wheel-wrap">
                                    <div class="wheel-canvas-wrap">
                                        <canvas
                                            ref="wheelAssoc"
                                            class="color-wheel"
                                            width="180"
                                            height="180"
                                            @click="pickFromWheel($event, 'associationCouleur')"
                                            @mousemove="previewWheel($event, 'assoc')"
                                            @mouseleave="wheelPreviewAssoc = null"
                                        ></canvas>
                                    </div>
                                    <div class="wheel-side">
                                        <div class="wheel-preview-box" :style="{ background: wheelPreviewAssoc || form.associationCouleur || '#eee' }"></div>
                                        <span class="wheel-hex">{{ wheelPreviewAssoc || form.associationCouleur || '—' }}</span>
                                        <p class="wheel-tip">Survolez pour prévisualiser, cliquez pour sélectionner.</p>
                                    </div>
                                </div>
                            </details>

                            <div v-if="form.associationCouleur" class="color-selected-label">
                                <span class="swatch-mini" :style="{ background: form.associationCouleur }"></span>
                                {{ labelCouleur(form.associationCouleur) }} sélectionné
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="btn-primary"
                            :class="{ loading }"
                            :disabled="!form.couleurPreferee || !form.couleurEvitee || !form.styles.length || !form.associationCouleur || !form.contexte"
                        >
                            <span v-if="!loading">Enregistrer mes préférences</span>
                            <span v-else class="loader-dots">
                                <span></span><span></span><span></span>
                            </span>
                        </button>

                    </form>
                </div>

                <!-- Confirmation -->
                <div v-else class="form-card confirmation">
                    <div class="confirm-icon" aria-hidden="true">
                        <svg viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="23" stroke="#467948" stroke-width="2"/>
                            <path d="M14 24l7 7 13-14" stroke="#467948" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h2>Préférences enregistrées !</h2>
                    <p>Reflet a bien pris en compte vos choix et adaptera ses suggestions à votre profil.</p>

                    <div class="confirm-recap">
                        <div class="recap-row">
                            <span class="recap-label">Couleur préférée</span>
                            <span class="recap-val">
                                <span class="swatch-mini" :style="{ background: form.couleurPreferee }"></span>
                                {{ labelCouleur(form.couleurPreferee) }}
                            </span>
                        </div>
                        <div class="recap-row">
                            <span class="recap-label">À éviter</span>
                            <span class="recap-val">
                                <span class="swatch-mini" :style="{ background: form.couleurEvitee }"></span>
                                {{ labelCouleur(form.couleurEvitee) }}
                            </span>
                        </div>
                        <div class="recap-row">
                            <span class="recap-label">Contexte</span>
                            <span class="recap-val">{{ labelContexte() }}</span>
                        </div>
                        <div class="recap-row">
                            <span class="recap-label">Style</span>
                            <span class="recap-val">{{ labelStyles() }}</span>
                        </div>
                        <div class="recap-row">
                            <span class="recap-label">Association</span>
                            <span class="recap-val">{{ labelAssoc(form.associationCouleur) }}</span>
                        </div>
                    </div>

                    <button class="btn-outline" @click="reset">Modifier mes préférences</button>
                </div>
            </div>

            <!-- Sidebar -->
            <div id="perso-info">
                <div class="info-block">
                    <span class="info-label">Pourquoi ces infos ?</span>
                    <p>Reflet utilise vos préférences pour vous suggérer des tenues cohérentes chaque matin, en évitant les couleurs que vous n'aimez pas et en valorisant votre style.</p>
                </div>
                <div class="info-divider"></div>
                <div class="info-block">
                    <span class="info-label">Modifiable à tout moment</span>
                    <p>Vos préférences sont sauvegardées dans votre profil et peuvent être mises à jour quand vous le souhaitez.</p>
                </div>
                <div class="info-divider"></div>
                <div class="info-block">
                    <span class="info-label">Confidentialité</span>
                    <p>Ces données restent sur votre appareil et ne sont jamais partagées.</p>
                </div>
            </div>

        </section>

    </main>
</template>

<style scoped>
@font-face {
    font-family: "Satoshi";
    src: url("../font/Satoshi-Variable.ttf") format("truetype");
}

* { box-sizing: border-box; }

#perso-page {
    font-family: "Satoshi", system-ui, sans-serif;
    color: var(--grey-dark, #494949);
    overflow-x: hidden;
}

/* ── HERO ─────────────────────────────────────── */
#perso-hero {
    background-color: var(--primary-color, #467948);
    color: white;
    padding: 8% 10% 6%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.hero-inner {
    position: relative;
    z-index: 1;
    max-width: 600px;
}

.eyebrow {
    display: inline-block;
    font-size: clamp(0.7rem, 1.2vw, 0.85rem);
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.65;
    margin-bottom: 16px;
}

#perso-hero h1 {
    font-size: clamp(2.4rem, 5vw, 5rem);
    font-weight: 700;
    line-height: 1.05;
    margin: 0 0 20px;
    color: white;
}

#perso-hero p {
    font-size: clamp(0.95rem, 1.6vw, 1.2rem);
    line-height: 1.65;
    opacity: 0.85;
    max-width: 480px;
    margin: 0;
}

.hero-deco {
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
    width: clamp(200px, 35vw, 420px);
    opacity: 0.6;
    pointer-events: none;
}

.hero-deco svg { width: 100%; height: 100%; }

/* ── BODY ─────────────────────────────────────── */
#perso-body {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 60px;
    padding: 6% 10%;
    align-items: start;
}

/* ── FORM CARD ────────────────────────────────── */
.form-card {
    background: white;
    border: 1px solid #e8e8e8;
    border-radius: 24px;
    padding: 40px 44px;
}

.form-card h2 {
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 700;
    color: var(--primary-color, #467948);
    margin: 0 0 6px;
}

.form-subtitle {
    font-size: 0.875rem;
    color: #888;
    margin: 0 0 36px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 36px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

label {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--primary-color, #467948);
}

.field-hint {
    font-size: 0.85rem;
    color: #999;
    margin: 0 0 4px;
}

/* ── COLOR GRID ───────────────────────────────── */
.color-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.color-dot {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2.5px solid transparent;
    cursor: pointer;
    position: relative;
    transition: transform 0.15s, border-color 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    outline: none;
}

.color-dot:hover:not(:disabled) {
    transform: scale(1.12);
}

.color-dot:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
}

.color-dot.selected {
    border-color: var(--primary-color, #467948);
    transform: scale(1.15);
    box-shadow: 0 0 0 3px #46794830;
}

.dot-check {
    font-size: 14px;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    line-height: 1;
}

.color-selected-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--primary-color, #467948);
    margin-top: 2px;
}

.avoid-label { color: #c0392b; }

.swatch-mini {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.12);
    flex-shrink: 0;
}

/* ── WHEEL ────────────────────────────────────── */
.wheel-details {
    margin-top: 4px;
}

.wheel-details[open] .wheel-summary {
    color: var(--primary-color, #467948);
}

.wheel-summary {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    color: #888;
    cursor: pointer;
    list-style: none;
    user-select: none;
    padding: 6px 0;
    transition: color 0.15s;
}

.wheel-summary::-webkit-details-marker { display: none; }

.wheel-summary:hover {
    color: var(--primary-color, #467948);
}

.wheel-wrap {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 16px 0 8px;
}

.wheel-canvas-wrap {
    position: relative;
    flex-shrink: 0;
}

.color-wheel {
    display: block;
    border-radius: 50%;
    cursor: crosshair;
    border: 2px solid #e8e8e8;
    width: 160px;
    height: 160px;
}

.wheel-side {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.wheel-preview-box {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    border: 1.5px solid #e0e0e0;
    transition: background 0.05s;
}

.wheel-hex {
    font-size: 0.78rem;
    font-weight: 600;
    color: #555;
    font-family: monospace;
    letter-spacing: 0.04em;
}

.wheel-tip {
    font-size: 0.75rem;
    color: #aaa;
    line-height: 1.4;
    margin: 0;
    max-width: 140px;
}

/* ── CHIPS & RADIO GROUP ───────────────────────── */
.chips-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.chip {
    font-family: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 9px 18px;
    border-radius: 50px;
    border: 1.5px solid #dde8dd;
    background: #f7f9f7;
    color: #555;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.radio-group .chip:hover {
    border-color: var(--secondary-color, #73BB86);
    background: #edf5ee;
}

.radio-group .chip.active {
    background: var(--primary-color, #467948);
    border-color: var(--primary-color, #467948);
    color: white;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

.chip:not(.radio-group .chip):hover {
    border-color: var(--secondary-color, #73BB86);
    background: #edf5ee;
}

.chip.active:not(.radio-group .chip) {
    background: var(--primary-color, #467948);
    border-color: var(--primary-color, #467948);
    color: white;
}

.custom-chip {
    border-style: dashed;
}

/* ── CUSTOM INPUT (Style & Contexte) ───────────── */
.custom-style-wrap {
    padding: 12px 0 4px;
}

.input-group {
    display: flex;
    gap: 10px;
    align-items: center;
}

.custom-input {
    flex: 1;
    padding: 10px 16px;
    border-radius: 50px;
    border: 1.5px solid #dde8dd;
    background: #f7f9f7;
    font-family: inherit;
    font-size: 0.875rem;
    color: #555;
    outline: none;
    transition: border-color 0.15s, background 0.15s;
}

.custom-input:focus {
    border-color: var(--secondary-color, #73BB86);
    background: white;
}

.add-style-btn {
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 50px;
    background: var(--secondary-color, #73BB86);
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
}

.add-style-btn:hover {
    background: #65a976;
}

/* ── ASSOCIATIONS ─────────────────────────────── */
.assoc-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.assoc-card {
    font-family: inherit;
    background: #f7f9f7;
    border: 1.5px solid #dde8dd;
    border-radius: 14px;
    padding: 14px 12px 12px;
    cursor: pointer;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: border-color 0.15s, background 0.15s, transform 0.15s;
}

.assoc-card:hover {
    border-color: var(--secondary-color, #73BB86);
    background: #edf5ee;
    transform: translateY(-2px);
}

.assoc-card.active {
    border-color: var(--primary-color, #467948);
    background: white;
    box-shadow: 0 0 0 3px #46794820;
}

.assoc-swatches {
    display: flex;
    gap: 4px;
}

.assoc-swatch {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.08);
    flex-shrink: 0;
}

.assoc-label {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--primary-color, #467948);
    line-height: 1.2;
}

.assoc-desc {
    font-size: 0.72rem;
    color: #999;
    line-height: 1.3;
}

/* ── BOUTON SUBMIT ────────────────────────────── */
.btn-primary {
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 14px 32px;
    background: var(--primary-color, #467948);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    align-self: flex-start;
    transition: background 0.2s, transform 0.15s, opacity 0.2s;
    min-width: 240px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
}

.btn-primary:hover:not(:disabled) {
    background: #3a6540;
    transform: translateY(-1px);
}

.btn-primary:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
}

.btn-primary.loading { pointer-events: none; opacity: 0.8; }

.loader-dots { display: flex; gap: 5px; align-items: center; }
.loader-dots span {
    width: 7px; height: 7px;
    background: white;
    border-radius: 50%;
    animation: dot-bounce 1s infinite ease-in-out;
}
.loader-dots span:nth-child(2) { animation-delay: 0.15s; }
.loader-dots span:nth-child(3) { animation-delay: 0.3s; }

@keyframes dot-bounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
    40%           { transform: translateY(-6px); opacity: 1; }
}

/* ── CONFIRMATION ─────────────────────────────── */
.confirmation {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    padding: 50px 44px;
}

.confirm-icon svg { width: 64px; height: 64px; }

.confirmation h2 {
    font-size: 1.6rem;
    color: var(--primary-color, #467948);
    margin: 0;
}

.confirmation > p {
    color: #666;
    line-height: 1.6;
    max-width: 360px;
    margin: 0;
}

.confirm-recap {
    width: 100%;
    max-width: 360px;
    background: #f7f9f7;
    border-radius: 14px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
    margin-top: 4px;
}

.recap-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.recap-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #aaa;
}

.recap-val {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--primary-color, #467948);
    display: flex;
    align-items: center;
    gap: 6px;
}

.btn-outline {
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 12px 28px;
    background: transparent;
    color: var(--primary-color, #467948);
    border: 1.5px solid var(--primary-color, #467948);
    border-radius: 50px;
    cursor: pointer;
    margin-top: 8px;
    transition: background 0.2s, color 0.2s;
}

.btn-outline:hover {
    background: var(--primary-color, #467948);
    color: white;
}

/* ── SIDEBAR ──────────────────────────────────── */
#perso-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 8px;
}

.info-block {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.info-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--secondary-color, #73BB86);
}

.info-block p {
    font-size: 0.875rem;
    color: #777;
    line-height: 1.6;
    margin: 0;
}

.info-divider {
    height: 1px;
    background: #e5ede5;
}

/* ── RESPONSIVE ───────────────────────────────── */
@media (max-width: 960px) {
    #perso-body {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 8% 6%;
    }
    .hero-deco { display: none; }
    #perso-info {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
    }
    .info-block { min-width: 200px; flex: 1; }
    .info-divider { display: none; }
    .assoc-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
    .form-card { padding: 28px 20px; }
    #perso-hero { padding: 14% 6% 10%; }
    .assoc-grid { grid-template-columns: repeat(2, 1fr); }
    .wheel-wrap { flex-direction: column; align-items: flex-start; }
    .input-group { flex-direction: column; align-items: stretch; }
    .add-style-btn { width: 100%; }
}
</style>