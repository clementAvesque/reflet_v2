<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const containerRef = ref(null)
const isHovering = ref(false)
const isDragging = ref(false)

onMounted(() => {
  if (!containerRef.value) return

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  containerRef.value.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(25, containerRef.value.clientWidth / containerRef.value.clientHeight, 0.1, 100)
  camera.position.set(4.5, 0.5, 5)
  camera.lookAt(0, 0, 0)

  // Lumières
  scene.add(new THREE.AmbientLight(0xfff8f0, 0.6))

  const keyLight = new THREE.DirectionalLight(0xfff5e0, 2)
  keyLight.position.set(5, 6, 5)
  keyLight.castShadow = true
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0x7CFA8F, 0.5)
  fillLight.position.set(-4, 2, 3)
  scene.add(fillLight)

  // Chargement du modèle
  const loader = new GLTFLoader()
  let model = null

  loader.load('/object_0.glb', (gltf) => {
    model = gltf.scene
    model.scale.setScalar(2.5)
    scene.add(model)
  })

  // Contrôles de souris
  let mouseX = 0
  let mouseY = 0
  let targetRotationX = 0
  let targetRotationY = 0

  const canvas = renderer.domElement

  canvas.addEventListener('mouseenter', () => {
    isHovering.value = true
  })

  canvas.addEventListener('mouseleave', () => {
    isHovering.value = false
    isDragging.value = false
  })

  canvas.addEventListener('mousedown', () => {
    isDragging.value = true
  })

  canvas.addEventListener('mouseup', () => {
    isDragging.value = false
  })

  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging.value) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    targetRotationY = (x - 0.5) * Math.PI
    targetRotationX = (y - 0.5) * Math.PI * 0.5
  })

  // Animation
  let animationId = null

  function animate() {
    animationId = requestAnimationFrame(animate)

    if (model) {
      // Smooth rotation
      if (isDragging.value) {
        model.rotation.y += (targetRotationY - model.rotation.y) * 0.1
        model.rotation.x += (targetRotationX - model.rotation.x) * 0.1
      } else {
        // Rotation automatique quand pas de drag
        model.rotation.y += 0.005
      }
    }

    renderer.render(scene, camera)
  }

  animate()

  // Resize
  const handleResize = () => {
    if (!containerRef.value) return
    const w = containerRef.value.clientWidth
    const h = containerRef.value.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
    cancelAnimationFrame(animationId)
    renderer.dispose()
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="hero-3d-container"
    :class="{ dragging: isDragging }"
  ></div>
</template>

<style scoped>
.hero-3d-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  transition: cursor 0.2s;
}

.hero-3d-container.dragging {
  cursor: grabbing;
}

.hero-3d-container :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

@media (max-width: 768px) {
  .hero-3d-container {
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .hero-3d-container {
    min-height: 300px;
  }
}
</style>
