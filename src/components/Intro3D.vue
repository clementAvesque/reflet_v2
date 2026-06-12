<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const hidden = ref(false)
const progress = ref(0)

onMounted(() => {
  const canvas = document.getElementById('intro-canvas')
  if (!canvas) return

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0.8, 0.3, 2.2)
  camera.lookAt(-1.5, 0, 0)

  // Lumières
  scene.add(new THREE.AmbientLight(0xfff8f0, 0.55))

  const keyLight = new THREE.DirectionalLight(0xfff5e0, 2.2)
  keyLight.position.set(5, 8, 6)
  keyLight.castShadow = true
  keyLight.shadow.mapSize.set(1024, 1024)
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x7CFA8F, 0.6)
  fillLight.position.set(-4, 2, 3)
  scene.add(fillLight)

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.4)
  rimLight.position.set(-2, -3, -4)
  scene.add(rimLight)

  // Chargement du modèle GLB
  const loader = new GLTFLoader()
  let model = null

  loader.load(
    '/object_0.glb',
    (gltf) => {
      model = gltf.scene
      model.position.y = -4
      model.rotation.y = -0.6
      model.scale.setScalar(1)
      scene.add(model)
    },
    (progressEvent) => {
      if (progressEvent.lengthComputable) {
        progress.value = (progressEvent.loaded / progressEvent.total) * 100
      }
    }
  )

  // Particules
  const particles = []
  const pMatBase = new THREE.MeshBasicMaterial({ color: 0x467948, transparent: true, opacity: 0.0 })
  for (let i = 0; i < 55; i++) {
    const size = 0.022 + Math.random() * 0.03
    const p = new THREE.Mesh(
      Math.random() > 0.5
        ? new THREE.SphereGeometry(size, 6, 6)
        : new THREE.BoxGeometry(size, size, size),
      pMatBase.clone()
    )
    p.position.set(
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6
    )
    p.userData = {
      vx: (Math.random() - 0.5) * 0.006,
      vy: (Math.random() - 0.5) * 0.005,
      vz: (Math.random() - 0.5) * 0.003,
      maxOpacity: 0.15 + Math.random() * 0.45
    }
    scene.add(p)
    particles.push(p)
  }

  // Timeline animation
  let t = 0
  let introTime = 0
  let introComplete = false

  const PHASE1 = 1200
  const PHASE2 = 3000
  const PHASE3 = 4600

  const barFill = document.getElementById('intro-bar-fill')
  let progValue = 0
  const progressInterval = setInterval(() => {
    progValue += 100 / (PHASE3 / 50)
    if (barFill) barFill.style.width = Math.min(progValue, 100) + '%'
    if (progValue >= 100) clearInterval(progressInterval)
  }, 50)

  function easeOut3(x) { return 1 - Math.pow(1 - x, 3) }
  function easeInOut(x) { return x < 0.5 ? 2*x*x : 1-Math.pow(-2*x+2,2)/2 }

  function animLoop() {
    if (introComplete) return
    requestAnimationFrame(animLoop)
    t += 0.016
    introTime += 16

    if (model) {
      // Phase 1 : entrée
      if (introTime <= PHASE1) {
        const p = easeOut3(introTime / PHASE1)
        model.position.y = -4 + 4 * p
        model.rotation.y = -0.6 + 0.6 * p
        model.scale.setScalar(0.7 + 0.3 * p)
      }

      // Phase 2 : rotation douce
      if (introTime > PHASE1 && introTime <= PHASE2) {
        const p = (introTime - PHASE1) / (PHASE2 - PHASE1)
        model.rotation.y = Math.sin(t * 0.25) * 0.25 - 0.2
        model.position.y = Math.sin(t * 0.6) * 0.07
        model.scale.setScalar(1.0)

        particles.forEach(pt => {
          pt.material.opacity = Math.min(pt.material.opacity + 0.008, pt.userData.maxOpacity * Math.min(p * 3, 1))
          pt.position.x += pt.userData.vx
          pt.position.y += pt.userData.vy
          pt.position.z += pt.userData.vz
          if (Math.abs(pt.position.x) > 7) pt.userData.vx *= -1
          if (Math.abs(pt.position.y) > 5) pt.userData.vy *= -1
          if (Math.abs(pt.position.z) > 3) pt.userData.vz *= -1
        })
      }

      // Phase 3 : zoom + fade out
      if (introTime > PHASE2 && introTime <= PHASE3) {
        const p = easeInOut((introTime - PHASE2) / (PHASE3 - PHASE2))
        camera.position.z = 2.2 - p * 0.8
        camera.position.y = 0.3 + p * 0.4
        camera.lookAt(-1.5, p * 0.4, 0)

        particles.forEach(pt => { pt.material.opacity *= 0.97 })

        const introEl = document.getElementById('intro')
        if (introEl) introEl.style.opacity = 1 - p
      }

      if (introTime >= PHASE3) {
        introComplete = true
        hidden.value = true
        document.body.style.overflow = ''
      }
    }

    renderer.render(scene, camera)
  }

  document.body.style.overflow = 'hidden'
  animLoop()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>

<template>
  <div id="intro" :class="{ hidden }">
    <canvas id="intro-canvas"></canvas>
    <div id="intro-content">
      <div id="intro-logo"><span>REFLET</span></div>
      <div id="intro-sub">Une demande simple, une tenue déjà prête</div>
      <div id="intro-bar"><div id="intro-bar-fill"></div></div>
    </div>
  </div>
</template>

<style scoped>
#intro {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #e8f0e2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: opacity 0.8s ease, visibility 0.8s ease;
}

#intro.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

#intro-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

#intro-content {
  position: relative;
  z-index: 2;
  text-align: center;
  animation: fadeInUp 1.2s ease 0.5s both;
}

#intro-logo {
  font-family: 'Satoshi', sans-serif;
  font-size: clamp(4rem, 10vw, 9rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #1a2218;
  line-height: 1;
}

#intro-logo span {
  color: var(--primary-color);
}

#intro-sub {
  font-size: 0.95rem;
  color: rgba(26, 34, 24, 0.6);
  margin-top: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

#intro-bar {
  margin-top: 3rem;
  width: 200px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

#intro-bar-fill {
  height: 100%;
  width: 0%;
  background: #7CFA8F;
  transition: width 0.05s linear;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  #intro-logo {
    font-size: clamp(2.5rem, 8vw, 5rem);
  }

  #intro-sub {
    font-size: 0.85rem;
  }

  #intro-bar {
    width: 150px;
  }
}

@media (max-width: 480px) {
  #intro-logo {
    font-size: clamp(2rem, 6vw, 3.5rem);
  }

  #intro-sub {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
  }

  #intro-bar {
    width: 120px;
    margin-top: 2rem;
  }
}
</style>
