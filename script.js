// Lista completa de materias
const materias = [
  // Primer año
  { id: "matematicas", nombre: "Matemáticas", semestre: 1, desbloquea: ["estadistica1"] },
  { id: "bases", nombre: "Bases Sociológicas para el Trabajo Social", semestre: 1, desbloquea: ["antropologia"] },
  { id: "fundamentos", nombre: "Fundamentos del trabajo social", semestre: 1, desbloquea: ["disciplina"] },
  { id: "expresion", nombre: "Expresión Oral y escrita", semestre: 1 },
  { id: "autodesarrollo", nombre: "Autodesarrollo", semestre: 1 },

  { id: "estadistica1", nombre: "Estadística I", semestre: 2, prerequisitos: ["matematicas"], desbloquea: ["estadistica2", "poblacion"] },
  { id: "epistemologia", nombre: "Epistemología de las ciencias sociales", semestre: 2, desbloquea: ["investigacion1"] },
  { id: "disciplina", nombre: "Trabajo social como disciplina y profesión", semestre: 2, prerequisitos: ["fundamentos"], desbloquea: ["metodos"] },
  { id: "antropologia", nombre: "Antropología Social", semestre: 2, prerequisitos: ["bases"] },
  { id: "psicologia", nombre: "Psicología General", semestre: 2, desbloquea: ["psicosocial"] },
  { id: "informatica", nombre: "Informática Básica", semestre: 2 },

  // Segundo año
  { id: "estadistica2", nombre: "Estadística II", semestre: 3, prerequisitos: ["estadistica1"], desbloquea: ["investigacion2"] },
  { id: "investigacion1", nombre: "Investigación Social I", semestre: 3, prerequisitos: ["epistemologia"], desbloquea: ["investigacion2"] },
  { id: "metodos", nombre: "Métodos de Intervención Profesional", semestre: 3, prerequisitos: ["disciplina"], desbloquea: ["grupos", "planificacion"] },
  { id: "ecologia", nombre: "Ecología Humana", semestre: 3 },
  { id: "psicosocial", nombre: "Psicología Social", semestre: 3, prerequisitos: ["psicologia"] },
  { id: "teoria", nombre: "Teoría Socio-política", semestre: 3 },

  { id: "comunicacion", nombre: "Comunicación", semestre: 4 },
  { id: "poblacion", nombre: "Estudios de Población", semestre: 4, prerequisitos: ["estadistica1"], desbloquea: ["indicadores"] },
  { id: "grupos", nombre: "Trabajo Social con Grupo", semestre: 4, prerequisitos: ["metodos"], desbloquea: ["comunitario"] },
  { id: "tecnicas", nombre: "Técnicas Grupales", semestre: 4 },
  { id: "economia", nombre: "Economía Política", semestre: 4, desbloquea: ["estado"] },
  { id: "historia", nombre: "Historia Contemporánea de Venezuela", semestre: 4 },

  // Tercer año
  { id: "investigacion2", nombre: "Investigación Social II", semestre: 5, prerequisitos: ["estadistica2", "investigacion1"], desbloquea: ["investigacion3"] },
  { id: "legislacion", nombre: "Legislación Social", semestre: 5 },
  { id: "comunitario", nombre: "Trabajo Social en el ámbito comunitario", semestre: 5, prerequisitos: ["grupos"], desbloquea: ["practica1"] },
  { id: "planificacion", nombre: "Planificación Social", semestre: 5, prerequisitos: ["metodos"], desbloquea: ["proyectos", "indicadores"] },
  { id: "estado", nombre: "Estado y Política Social", semestre: 5, prerequisitos: ["economia"], desbloquea: ["gerencia", "seguridad"] },
  { id: "ingles", nombre: "Inglés", semestre: 5 },

  { id: "investigacion3", nombre: "Investigación Social III", semestre: 6, prerequisitos: ["investigacion2"], desbloquea: ["computacion"] },
  { id: "gerencia", nombre: "Administración y Gerencia Social", semestre: 6, prerequisitos: ["estado"], desbloquea: ["practica1"] },
  { id: "familia", nombre: "Trabajo Social con Individuo y Familia", semestre: 6, desbloquea: ["orientacion"] },
  { id: "proyectos", nombre: "Formulación y Evaluación de Proyectos Sociales", semestre: 6 },
  { id: "indicadores", nombre: "Indicadores Sociales", semestre: 6 },
  { id: "electiva1", nombre: "Electiva I", semestre: 6 },

  // Cuarto año
  { id: "practica1", nombre: "Prácticas de Trabajo Social I", semestre: 7, prerequisitos: ["comunitario", "gerencia"], desbloquea: ["practica2"] },
  { id: "seguridad", nombre: "Seguridad Social", semestre: 7, prerequisitos: ["estado"] },
  { id: "electiva2", nombre: "Electiva II", semestre: 7 },

  { id: "computacion", nombre: "Computación Aplicada a las Ciencias Sociales", semestre: 8, prerequisitos: ["investigacion3"] },
  { id: "practica2", nombre: "Prácticas de Trabajo Social II", semestre: 8, prerequisitos: ["practica1"], desbloquea: ["practica3"] },
  { id: "orientacion", nombre: "Orientación Familiar", semestre: 8, prerequisitos: ["familia"], desbloquea: ["practica3"] },

  // Quinto año
  { id: "practica3", nombre: "Prácticas de Trabajo Social III", semestre: 9, prerequisitos: ["practica2", "orientacion"] },

  { id: "grado", nombre: "Trabajo de Grado", semestre: 10 },
  { id: "seminario", nombre: "Seminario Servicio Comunitario", semestre: 10 },
];

// Función para generar toda la malla
function generarMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = ""; // limpia la malla antes de crearla

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

// Al hacer clic en una materia
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

// Desbloquea materias cuando se cumple el requisito
function desbloquear(id) {
  materias.filter(m => m.prerequisitos?.includes(id)).forEach(m => {
    const requisitos = m.prerequisitos.every(p => document.getElementById(p).classList.contains("aprobada"));
    if (requisitos) {
      const div = document.getElementById(m.id);
      div.classList.remove("bloqueada");
      div.classList.add("desbloqueada");
    }
  });
}

// Bloquea en cascada cuando se desaprueba una materia base
function bloquearDependientes(id) {
  materias.filter(m => m.prerequisitos?.includes(id)).forEach(m => {
    const div = document.getElementById(m.id);
    div.classList.remove("aprobada", "desbloqueada");
    div.classList.add("bloqueada");
    bloquearDependientes(m.id);
  });
}

// Botón de reiniciar: vuelve al estado original
document.getElementById("reiniciar").addEventListener("click", () => {
  generarMalla(); // vuelve a generar desde cero
});

// Ejecutar al cargar por primera vez
generarMalla();
