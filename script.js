import * as THREE from "three"
import GUI from "lil-gui"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"



const gui = new GUI({ width: 300, title: "Options" })

if (window.location.href.endsWith("?dev")) {
  gui.show()
} else {
  gui.hide()
  console.log(
    "Add ?dev to show GUI options - https://threejs-geometry.vercel.app/?dev"
  )
}

const debugObject = {
  lineColor1: "#fff",
  lineColor2: "#666",
  bgColor1: "#dd0000",
  bgColor2: "#000",
}

const canvas = document.querySelector("canvas.webgl")
const canvas2 = document.querySelector("canvas.webgl2")

const scene = new THREE.Scene()
scene.background = new THREE.Color(debugObject.bgColor1)

const scene2 = new THREE.Scene()
scene2.background = new THREE.Color(debugObject.bgColor2)

const geometry = new THREE.BufferGeometry()
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute("position", positionsAttribute)

const material1 = new THREE.MeshBasicMaterial({
  color: debugObject.lineColor1,
  wireframe: true,
})
const material2 = new THREE.MeshBasicMaterial({
  color: debugObject.lineColor2,
  wireframe: true,
})

const mesh = new THREE.Mesh(geometry, material1)
scene.add(mesh)

const mesh2 = new THREE.Mesh(geometry, material2)
scene2.add(mesh2)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight / 2,
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / (sizes.height / 2)
  camera.updateProjectionMatrix()
  camera2.aspect = sizes.width / (sizes.height / 2)
  camera2.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height / 2)
  renderer2.setSize(sizes.width, sizes.height / 2)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener("dblclick", () => {
  const fullscreenElement = document.fullscreenElement
  fullscreenElement ? document.exitFullscreen() : canvas.requestFullscreen()
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

const camera2 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera2.position.z = 3
camera2.lookAt(mesh2.position)
scene2.add(camera2)

const controls = new OrbitControls(camera, canvas)
const controls2 = new OrbitControls(camera2, canvas2)
controls.enableDamping = true
controls2.enableDamping = true

const renderer = new THREE.WebGLRenderer({ canvas: canvas })
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 })
renderer.setSize(sizes.width, sizes.height)
renderer2.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const tick = () => {
  controls.update()
  controls2.update()
  renderer.render(scene, camera)
  renderer2.render(scene2, camera2)
  window.requestAnimationFrame(tick)
  camera.position.z = Math.sin(performance.now() * 0.0001) * 1
  camera2.position.z = Math.cos(performance.now() * 0.0001) * 1
  mesh.rotation.x += 0.001
  mesh.rotation.y += 0.0005
  mesh2.rotation.x += 0.001
  mesh2.rotation.y += 0.0005
}
tick()

const folder1 = gui.addFolder("Canvas 1")
folder1
  .addColor(debugObject, "lineColor1")
  .name("Line color 1")
  .onChange(() => {
    material1.color.set(debugObject.lineColor1)
  })
folder1
  .addColor(debugObject, "bgColor1")
  .name("Background color 1")
  .onChange(() => {
    scene.background.set(debugObject.bgColor1)
  })
folder1.add(mesh.position, "x").min(-1).max(1).step(0.05).name("Mesh X pos")
folder1.add(mesh.position, "y").min(-1).max(1).step(0.05).name("Mesh Y pos")
folder1.add(mesh.position, "z").min(-3).max(1).name("Mesh Z pos")
folder1.add(camera.position, "x").min(0).max(1).name("Camera X pos")
folder1.add(camera.position, "y").min(0).max(1).name("Camera Y pos")

const folder2 = gui.addFolder("Canvas 2")
folder2
  .addColor(debugObject, "lineColor2")
  .name("Line color 2")
  .onChange(() => {
    material2.color.set(debugObject.lineColor2)
  })
folder2
  .addColor(debugObject, "bgColor2")
  .name("Background color 2")
  .onChange(() => {
    scene2.background.set(debugObject.bgColor2)
  })
folder2.add(mesh2.position, "x").min(-1).max(1).step(0.05).name("Mesh X pos")
folder2.add(mesh2.position, "y").min(-1).max(1).step(0.05).name("Mesh Y pos")
folder2.add(mesh2.position, "z").min(-3).max(1).name("Mesh Z pos")
folder2.add(camera2.position, "x").min(0).max(1).name("Camera X pos")
folder2.add(camera2.position, "y").min(0).max(1).name("Camera Y pos")
