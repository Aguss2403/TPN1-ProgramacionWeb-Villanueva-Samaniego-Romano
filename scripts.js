let student = [];
let currentPage = 1;
const rowsPerPage = 5;
let filteredStudents = student;

const addStudents = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;

  student.push({ name, lastName });
  console.log(student);

  // Limpiar el campo del formulario
  document.getElementById("name").value = "";
  document.getElementById("lastName").value = "";

  // Actualizamos la lista de estudiantes filtrados
  filteredStudents = student;

  // Renderizamos la tabla con los nuevos datos
  renderTable();
};

const renderTable = () => {
  const tbody = document.getElementById("bodytable");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedStudents = filteredStudents.slice(start, end);

  paginatedStudents.forEach((student) => {
    let row = document.createElement("tr");
    row.innerHTML =
      "<td>" + student.name + "</td><td>" + student.lastName + "</td>";
    tbody.appendChild(row);
  });

  const rowsToFill = rowsPerPage - paginatedStudents.length;
  for (let i = 0; i < rowsToFill; i++) {
    let emptyRow = document.createElement("tr");
    emptyRow.innerHTML = "<td>&nbsp;</td><td>&nbsp;</td>";
    tbody.appendChild(emptyRow);
  }

  updatePagination();
};

const updatePagination = () => {
  const totalPages = Math.ceil(student.length / rowsPerPage);

  // Actualizamos el selector de páginas
  const pageSelect = document.getElementById("pageSelect");
  pageSelect.innerHTML = ""; // Limpiar el contenido previo del select

  for (let i = 1; i <= totalPages; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = `Página ${i}`;
    if (i === currentPage) {
      option.selected = true; // Selecciona la página actual
    }
    pageSelect.appendChild(option);
  }

  document.getElementById(
    "pageNumber"
  ).innerText = `Página ${currentPage} de ${totalPages}`;
};

const changePageSelect = () => {
  const pageSelect = document.getElementById("pageSelect");
  currentPage = parseInt(pageSelect.value);
  renderTable();
};


const searchTable = () => {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();

  filteredStudents = student.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchInput) ||
      student.lastName.toLowerCase().includes(searchInput)
    );
  });

  renderTable();
};

window.onload = () => {
  renderTable();
};
