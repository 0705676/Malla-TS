document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Recuperar desde localStorage
  let ramosAprobados = JSON.parse(localStorage.getItem("ramosAprobados")) || [];

  // Desbloquear los ramos que dependen de uno aprobado
  function desbloquearRamosDependientes(nombreRamo) {
    const boton = document.querySelector(`.ramo[data-nombre="${nombreRamo}"]`);
    const desbloquea = boton?.getAttribute("data-desbloquea");
    if (desbloquea) {
      desbloquea.split(",").forEach(destino => {
        const ramoDestino = document.querySelector(`.ramo[data-nombre="${destino.trim()}"]`);
        if (ramoDestino && ramoDestino.classList.contains("bloqueado")) {
          ramoDestino.classList.remove("bloqueado");
          ramoDestino.classList.add("desbloqueado");
        }
      });
    }
  }

  // Marcar los aprobados y desbloquear sus dependientes
  ramosAprobados.forEach(nombre => {
    const boton = document.querySelector(`.ramo[data-nombre="${nombre}"]`);
    if (boton) {
      boton.classList.remove("bloqueado", "desbloqueado");
      boton.classList.add("aprobado");
      desbloquearRamosDependientes(nombre);
    }
  });

  // Inicializar los que no están aprobados
  ramos.forEach(boton => {
    const nombre = boton.getAttribute("data-nombre");
    if (!ramosAprobados.includes(nombre)) {
      if (!boton.classList.contains("bloqueado")) {
        boton.classList.add("desbloqueado");
      }
    }

    // Evento click
    boton.addEventListener("click", function () {
      if (boton.classList.contains("bloqueado") || boton.classList.contains("aprobado")) return;

      boton.classList.remove("desbloqueado");
      boton.classList.add("aprobado");

      if (!ramosAprobados.includes(nombre)) {
        ramosAprobados.push(nombre);
        localStorage.setItem("ramosAprobados", JSON.stringify(ramosAprobados));
      }

      desbloquearRamosDependientes(nombre);
    });
  });
});
// Mostrar frase motivadora
      const frases = [
        "¡Bien hecho! Otro paso hacia tu título 🎓",
        "¡Excelente trabajo, sigue así! 💪",
        "¡Un ramo menos, un sueño más cerca! 💼",
        "¡Estás construyendo tu futuro! 🚀",
        "¡Cada clic es una victoria! 🧠",
        "¡Orgullo trabajador/a social en formación! ❤️",
        "¡Ya casi llegas, no te detengas! 🏁",
        "¡Tu esfuerzo está dando frutos! 🌱",
        "¡Vamos que se puede! 🙌",
        "¡Eres inspiración! ✨"
      ];
      const frase = frases[Math.floor(Math.random() * frases.length)];
      alert(frase);
