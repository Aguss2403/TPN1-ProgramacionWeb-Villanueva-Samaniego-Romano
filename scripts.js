let student = JSON.parse(localStorage.getItem('students')) || [];
let currentPage = 1;
let rowsPerPage = 6;  // Cambiar a 'let' para poder actualizarlo
let filteredStudents = student;

// Función para generar legajo
const generateLegajo = () => {
  return Math.floor(Math.random() * 90000) + 10000; 
};

// Función para agregar estudiantes
const addStudents = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const legajo = generateLegajo();

  student.push({ name, lastName, legajo });

  localStorage.setItem('students', JSON.stringify(student));

  document.getElementById("name").value = "";
  document.getElementById("lastName").value = "";

  filteredStudents = student;

  window.location.href = "student.html";
  generateItemsPerPageOptions();
  renderTable();
};

// Función para renderizar la tabla
const renderTable = () => {
  const tbody = document.getElementById("bodytable");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedStudents = filteredStudents.slice(start, end);

  paginatedStudents.forEach((student) => {
    let row = document.createElement("tr");
    row.innerHTML =
      `<td>${student.name}</td><td>${student.lastName}</td><td>${student.legajo}</td>`;
    tbody.appendChild(row);
  });

  const rowsToFill = rowsPerPage - paginatedStudents.length;
  for (let i = 0; i < rowsToFill; i++) {
    let emptyRow = document.createElement("tr");
    emptyRow.innerHTML = "<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
    tbody.appendChild(emptyRow);
  }

  updatePagination();
};

// Función para actualizar la paginación
const updatePagination = () => {
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
  const paginationButtons = document.getElementById("paginationButtons");

  paginationButtons.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    let button = document.createElement("button");
    button.textContent = i;
    button.classList.add("pagination-button");
    
    if (i === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentPage = i;
      renderTable();
    });

    paginationButtons.appendChild(button);
  }
};

// Función para cambiar el número de items por página
const changeItemsPerPage = () => {
  const itemsPerPageSelect = document.getElementById("itemPerPageSelect");
  rowsPerPage = parseInt(itemsPerPageSelect.value, 10);  // Convertir a número entero
  currentPage = 1; 
  renderTable();
};

// Función para buscar en la tabla
const searchTable = () => {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();

  filteredStudents = student.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchInput) ||
      student.lastName.toLowerCase().includes(searchInput) ||
      student.legajo.toString().includes(searchInput)
    );
  });

  currentPage = 1;
  generateItemsPerPageOptions();
  renderTable();
};

// Función para generar las opciones del select de items por página
const generateItemsPerPageOptions = () => {
  const itemsPerPageSelect = document.getElementById("itemPerPageSelect");
  itemsPerPageSelect.innerHTML = "";

  const totalItems = filteredStudents.length;

  for (let i = 1; i <= totalItems; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    if (i === rowsPerPage) {
      option.selected = true;
    }
    itemsPerPageSelect.appendChild(option);
  }
};

// Inicializar al cargar la página
window.onload = () => {
  filteredStudents = student;
  generateItemsPerPageOptions();
  renderTable();
};