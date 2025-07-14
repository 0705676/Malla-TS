document.addEventListener("DOMContentLoaded", () => {
  const materias = [
    // Primer año
    { id: "matematicas", nombre: "Matemáticas", desbloquea: ["estadistica1"] },
    { id: "bases", nombre: "Bases Sociológicas para el Trabajo Social", desbloquea: ["antropologia"] },
    { id: "fundamentos", nombre: "Fundamentos del trabajo social", desbloquea: ["disciplina"] },
    { id: "expresion", nombre: "Expresión Oral y escrita" },
    { id: "autodesarrollo", nombre: "Autodesarrollo" },

    { id: "estadistica1", nombre: "Estadística I", prerequisitos: ["matematicas"], desbloquea: ["estadistica2", "poblacion"] },
    { id: "epistemologia", nombre: "Epistemología de las ciencias sociales", desbloquea: ["investigacion1"] },
    { id: "disciplina", nombre: "Trabajo social como disciplina y profesión", prerequisitos: ["fundamentos"], desbloquea: ["metodos"] },
    { id: "antropologia", nombre: "Antropología Social", prerequisitos: ["bases"] },
    { id: "psicologia", nombre: "Psicología General", desbloquea: ["psicosocial"] },
    { id: "informatica", nombre: "Informática Básica" },

    // Segundo año
    { id: "estadistica2", nombre: "Estadística II", prerequisitos: ["estadistica1"], desbloquea: ["investigacion2"] },
    { id: "investigacion1", nombre: "Investigación Social I", prerequisitos: ["epistemologia"], desbloquea: ["investigacion2"] },
    { id: "metodos", nombre: "Métodos de Intervención Profesional", prerequisitos: ["disciplina"], desbloquea: ["grupos", "planificacion"] },
    { id: "ecologia", nombre: "Ecología Humana" },
    { id: "psicosocial", nombre: "Psicología Social", prerequisitos: ["psicologia"] },
    { id: "teoria", nombre: "Teoría Socio-política" },

    { id: "comunicacion", nombre: "Comunicación" },
    { id: "poblacion", nombre: "Estudios de Población", prerequisitos: ["estadistica1"], desbloquea: ["indicadores"] },
    { id: "grupos", nombre: "Trabajo Social con Grupo", prerequisitos: ["metodos"], desbloquea: ["comunitario"] },
    { id: "tecnicas", nombre: "Técnicas Grupales" },
    { id: "economia", nombre: "Economía Política", desbloquea: ["estado"] },
    { id: "historia", nombre: "Historia Contemporánea de Venezuela" },

    // Tercer año
    { id: "investigacion2", nombre: "Investigación Social II", prerequisitos: ["estadistica2", "investigacion1"], desbloquea: ["investigacion3"] },
    { id: "legislacion", nombre: "Legislación Social" },
    { id: "comunitario", nombre: "Trabajo Social en el ámbito comunitario", prerequisitos: ["grupos"], desbloquea: ["practica1"] },
    { id: "planificacion", nombre: "Planificación Social", prerequisitos: ["metodos"], desbloquea: ["proyectos", "indicadores"] },
    { id: "estado", nombre: "Estado y Política Social", prerequisitos: ["economia"], desbloquea: ["gerencia", "seguridad"] },
    { id: "ingles", nombre: "Inglés" },

    { id: "investigacion3", nombre: "Investigación Social III", prerequisitos: ["investigacion2"], desbloquea: ["computacion"] },
    { id: "gerencia", nombre: "Administración y Gerencia Social", prerequisitos: ["estado"], desbloquea: ["practica1"] },
    { id: "familia", nombre: "Trabajo Social con Individuo y Familia", desbloquea: ["orientacion"] },
    { id: "proyectos", nombre: "Formulación y Evaluación de Proyectos Sociales" },
    { id: "indicadores", nombre: "Indicadores Sociales" },
    { id: "electiva1", nombre: "Electiva I" },

    // Cuarto año
    { id: "practica1", nombre: "Prácticas de Trabajo Social I", prerequisitos: ["comunitario", "gerencia"], desbloquea: ["practica2"] },
    { id: "seguridad", nombre: "Seguridad Social", prerequisitos: ["estado"] },
    { id: "electiva2", nombre: "Electiva II" },

    { id: "computacion", nombre: "Computación Aplicada a las Ciencias Sociales", prerequisitos: ["investigacion3"] },
    { id: "practica2", nombre: "Prácticas de Trabajo Social II", prerequisitos: ["practica1"], desbloquea: ["practica3"] },
    { id: "orientacion", nombre: "Orientación Familiar", prerequisitos: ["familia"], desbloquea: ["practica3"] },

    // Quinto año
    { id: "practica3", nombre: "Prácticas de Trabajo Social III", prerequisitos: ["practica2", "orientacion"] },
    { id: "grado", nombre: "Trabajo de Grado" },
    { id: "seminario", nombre: "Seminario Servicio Comunitario" },
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

  document.getElementById("reiniciar").addEventListener("click", () => {
    crearMalla();
  });

  crearMalla();
});
