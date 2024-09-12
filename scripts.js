let student = JSON.parse(localStorage.getItem('students')) || [];
let currentPage = 1;
const rowsPerPage = 5;
let filteredStudents = student;

const generateLegajo = () => {
  return Math.floor(Math.random() * 90000) + 10000; 
};

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
      "<td>" + student.name + "</td><td>" + student.lastName + "</td><td>" + student.legajo + "</td>";
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

const updatePagination = () => {
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const pageSelect = document.getElementById("pageSelect");
  pageSelect.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = `Página ${i}`;
    if (i === currentPage) {
      option.selected = true;
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
  const searchInput = document.getElementById("searchInput").value.toLowerCase();

  filteredStudents = student.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchInput) ||
      student.lastName.toLowerCase().includes(searchInput) ||
      student.legajo.toString().includes(searchInput)
    );
  });

  renderTable();
};


window.onload = () => {
  renderTable();
};
