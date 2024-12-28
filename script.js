import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

const canvas = document.querySelector("canvas.webgl")

const scene = new THREE.Scene()
scene.background = new THREE.Color("skyblue")
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  color: "#dd0000",
  wireframe: true,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight / 2,
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / (sizes.height / 2)
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height / 2)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement
  fullscreenElement ? document.exitFullscreen() : canvas.requestFullscreen()
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const tick = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}
tick()
