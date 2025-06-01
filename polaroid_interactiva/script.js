const flipCard = document.getElementById("flipCard")
const polaroidImage = document.getElementById("polaroidImage")
const flipSound = document.getElementById("flipSound")

let isFlipped = false
let isAnimating = false
const frontImage = "foto/frente.png"
const backImage = "foto/reverso.png"

// Diferentes tipos de animación
const animationTypes = ["flipping", "fade-transition", "slide-transition", "zoom-transition"]
let currentAnimationType = 0

// Función para crear efecto de partículas
function createSparkles(event) {
  const rect = flipCard.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "sparkle"

    const randomX = (Math.random() - 0.5) * 100
    const randomY = (Math.random() - 0.5) * 100

    sparkle.style.left = centerX + "px"
    sparkle.style.top = centerY + "px"
    sparkle.style.setProperty("--random-x", randomX + "px")
    sparkle.style.setProperty("--random-y", randomY + "px")

    document.body.appendChild(sparkle)

    setTimeout(() => sparkle.remove(), 1500)
  }
}

// Función para voltear la tarjeta con animación suave
function flipCardFunction(event) {
  if (isAnimating) return

  isAnimating = true

  // Crear efecto de partículas
  createSparkles(event)

  // Usar el tipo de animación actual
  const animationClass = animationTypes[currentAnimationType]
  flipCard.classList.add(animationClass)

  // Reproducir sonido
  flipSound.currentTime = 0
  flipSound.play().catch((error) => {
    console.log("No se pudo reproducir el sonido:", error)
  })

  // Cambiar la imagen a la mitad de la animación
  setTimeout(() => {
    isFlipped = !isFlipped

    if (isFlipped) {
      polaroidImage.src = backImage
      console.log("Mostrando imagen de reverso:", backImage)
    } else {
      polaroidImage.src = frontImage
      console.log("Mostrando imagen de frente:", frontImage)
    }

    // Quitar la clase de animación y permitir nuevos clics
    setTimeout(() => {
      flipCard.classList.remove(animationClass)
      isAnimating = false
    }, 100)
  }, 600) // Mitad de la duración de la animación más suave
}

// Función para cambiar el tipo de animación (opcional)
function changeAnimationType() {
  currentAnimationType = (currentAnimationType + 1) % animationTypes.length
  console.log("Tipo de animación cambiado a:", animationTypes[currentAnimationType])
}

// Event listeners
flipCard.addEventListener("click", flipCardFunction)

flipCard.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault()
    flipCardFunction(e)
  }
})

// Cambiar tipo de animación con doble clic (opcional)
flipCard.addEventListener("dblclick", (e) => {
  e.preventDefault()
  changeAnimationType()
})

// Verificar que las imágenes existen
function checkImages() {
  const testFront = new Image()
  const testBack = new Image()

  testFront.onload = () => console.log("✅ Imagen frontal cargada correctamente")
  testFront.onerror = () => console.error("❌ Error: No se pudo cargar foto/frente.png")
  testFront.src = frontImage

  testBack.onload = () => console.log("✅ Imagen de reverso cargada correctamente")
  testBack.onerror = () => console.error("❌ Error: No se pudo cargar foto/reverso.png")
  testBack.src = backImage
}

// Precargar ambas imágenes para transiciones más suaves
function preloadImages() {
  const frontImg = new Image()
  const backImg = new Image()
  frontImg.src = frontImage
  backImg.src = backImage
}

// Verificar imágenes al cargar la página
window.addEventListener("load", () => {
  checkImages()
  preloadImages()
})

// Agregar un toque de interactividad extra
flipCard.addEventListener("mouseenter", () => {
  if (!isAnimating) {
    polaroidImage.style.transform = "scale(1.02) rotateZ(1deg)"
  }
})

flipCard.addEventListener("mouseleave", () => {
  if (!isAnimating) {
    polaroidImage.style.transform = "scale(1) rotateZ(0deg)"
  }
})
