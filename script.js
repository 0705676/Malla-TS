document.addEventListener("DOMContentLoaded", () => {
  const materias = [
    // Aquí van TODAS TUS MATERIAS como ya las tienes (no las repito por espacio)
    // Puedes pegar la lista larga de materias aquí como antes
  ];

  const container = document.getElementById("malla-container");

  function crearMalla() {
    container.innerHTML = "";

    materias.forEach(m => {
      const div = document.createElement("div");
      div.classList.add("materia");

      if (m.prerequisitos) {
        div.classList.add("bloqueada");
      } else {
        div.classList.add("desbloqueada");
      }

      div.innerText = m.nombre;
      div.id = m.id;

      div.addEventListener("click", () => toggleMateria(m));
      container.appendChild(div);
    });
  }

  function toggleMateria(materia) {
    const div = document.getElementById(materia.id);
    if (div.classList.contains("bloqueada")) return;

    if (div.classList.contains("aprobada")) {
      div.classList.remove("aprobada");
      div.classList.add("desbloqueada");
      bloquearDependientes(materia.id);
    } else {
      div.classList.remove("desbloqueada");
      div.classList.add("aprobada");
      desbloquear(materia.id);
    }
  }

  function desbloquear(id) {
    materias.filter(m => m.prerequisitos?.includes(id)).forEach(m => {
      const requisitos = m.prerequisitos.every(p =>
        document.getElementById(p).classList.contains("aprobada")
      );
      if (requisitos) {
        const div = document.getElementById(m.id);
        div.classList.remove("bloqueada");
        div.classList.add("desbloqueada");
      }
    });
  }

  function bloquearDependientes(id) {
    materias.filter(m => m.prerequisitos?.includes(id)).forEach(m => {
      const div = document.getElementById(m.id);
      div.classList.remove("aprobada", "desbloqueada");
      div.classList.add("bloqueada");
      bloquearDependientes(m.id);
    });
  }

  // ✅ BOTÓN FUNCIONAL
  document.getElementById("reiniciar").addEventListener("click", () => {
    crearMalla(); // simplemente vuelve a crear la malla desde cero
  });

  crearMalla(); // crear al cargar
});
