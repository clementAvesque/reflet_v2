<template>
  <section id="color-preferences">
    <h2>Vos préférences de couleurs</h2>
    <p>Choisir une tenue, reconnaitre les couleurs, associer les vêtement... autant de défis qui prennent du temps et créent de la dépendance.</p>

    <div class="cards-container">
      <div class="color-card" v-for="(item, index) in colorCards" :key="index">
        <h3>{{ item.title }}</h3>
        <p class="desc">{{ item.description }}</p>

        <div class="picker-area">
          <!-- Carré SL -->
          <div
            class="sl-square"
            :style="{ background: `hsl(${item.hue}, 100%, 50%)` }"
            @mousedown="(e) => startDragSL(e, index)"
            ref="squares"
          >
            <div class="sl-white"></div>
            <div class="sl-black"></div>
            <div
              class="sl-cursor"
              :style="{
                left: item.s + '%',
                top: (100 - item.l) + '%'
              }"
            ></div>
          </div>

          <!-- Barre teinte verticale -->
          <div
            class="hue-bar"
            @mousedown="(e) => startDragHue(e, index)"
            ref="hueBars"
          >
            <div
              class="hue-cursor"
              :style="{ top: (item.hue / 360) * 100 + '%' }"
            ></div>
          </div>
        </div>

        <p class="color-code">
          <span class="color-dot" :style="{ backgroundColor: item.hex }"></span>
          {{ item.hex }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['update:colors'])

const colorCards = reactive([
  {
    title: 'Votre couleurs préférée',
    description: 'La couleur qu\'il porte le plus souvent',
    hue: 0,
    s: 80,
    l: 50,
    hex: '#FF2929'
  },
  {
    title: 'La couleurs que vous y associer',
    description: 'La couleur avec laquelle la couleur préférée s\'associe le mieux',
    hue: 10,
    s: 75,
    l: 55,
    hex: '#FF4422'
  },
  {
    title: 'La couleurs non voulu',
    description: 'La couleur choisie le moins possible dans le choix de tenue forte',
    hue: 5,
    s: 70,
    l: 60,
    hex: '#FF5544'
  }
])

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function updateHex(index) {
  const c = colorCards[index]
  // Convertir S/L du carré en vraie luminosité HSL
  const s = c.s
  const l = c.l * (1 - c.s / 200) + c.s / 200 * (c.l > 50 ? 100 - c.l : c.l)
  c.hex = hslToHex(c.hue, c.s, c.l)
  emit('update:colors', {
    preferred: colorCards[0].hex,
    associated: colorCards[1].hex,
    unwanted: colorCards[2].hex
  })
}

// Drag sur le carré SL
function startDragSL(e, index) {
  const el = e.currentTarget

  function onMove(ev) {
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (ev.clientY - rect.top) / rect.height))
    colorCards[index].s = Math.round(x * 100)
    colorCards[index].l = Math.round((1 - y) * 100)
    updateHex(index)
  }

  function onUp() {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  onMove(e)
}

// Drag sur la barre de teinte
function startDragHue(e, index) {
  const el = e.currentTarget

  function onMove(ev) {
    const rect = el.getBoundingClientRect()
    const y = Math.max(0, Math.min(1, (ev.clientY - rect.top) / rect.height))
    colorCards[index].hue = Math.round(y * 360)
    updateHex(index)
  }

  function onUp() {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  onMove(e)
}
</script>

<style scoped>
#color-preferences {
  background-color: var(--primary-color);
  color: var(--white);
  padding: 5% 10%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

#color-preferences h2 {
  font-size: var(--h2-size);
  margin: 0;
}

#color-preferences > p {
  color: var(--grey-light);
  font-size: 14px;
  max-width: 60%;
  margin: 0;
}

.cards-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.color-card {
  background-color: var(--white);
  color: var(--primary-color);
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.color-card h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
}

.desc {
  font-size: 12px;
  color: grey;
  margin: 0;
}

.picker-area {
  display: flex;
  flex-direction: row;
  gap: 10px;
  min-height: 200px;
  user-select: none;
}

/* Carré saturation/luminosité */
.sl-square {
  flex: 1;
  min-height: 200px;
  border-radius: 10px;
  position: relative;
  cursor: crosshair;
  overflow: hidden;
}

.sl-white {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, white, transparent);
  border-radius: 10px;
}

.sl-black {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, black);
  border-radius: 10px;
}

.sl-cursor {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 3px rgba(0,0,0,0.5);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2;
}

/* Barre teinte */
.hue-bar {
  width: 18px;
  border-radius: 10px;
  position: relative;
  cursor: ns-resize;
  background: linear-gradient(
    to bottom,
    hsl(0, 100%, 50%),
    hsl(30, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(150, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(210, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(330, 100%, 50%),
    hsl(360, 100%, 50%)
  );
}

.hue-cursor {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 8px;
  border-radius: 4px;
  border: 2px solid white;
  box-shadow: 0 0 3px rgba(0,0,0,0.4);
  pointer-events: none;
}

.color-code {
  font-size: 12px;
  color: grey;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
}
</style>