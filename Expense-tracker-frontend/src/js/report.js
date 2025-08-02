// Update timestamp every minute
function updateTimestamp() {
  const now = new Date();
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  document.getElementById("timestamp").textContent = now.toLocaleDateString(
    "en-US",
    options
  );
}

// Fetch and render data
async function fetchData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    renderMonthlyExpenses(data.monthlyExpenses);
    renderMonthlySummary(data.monthlyExpenses);
    renderYearlySummary(data.yearlySummary);
    renderNotes(data.notes);

    document.getElementById("loading").style.display = "none";
    document.getElementById("content").style.display = "block";
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("loading").textContent =
      "Error loading data. Please try again later.";
  }
}

function renderMonthlyExpenses(expenses) {
  const tbody = document.getElementById("monthly-expenses-body");
  tbody.innerHTML = "";

  expenses.forEach((expense) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${formatDate(expense.date)}</td>
                    <td>${expense.title}</td>
                    <td>${expense.description}</td>
                    <td>${expense.category}</td>
                    <td class="income">${
                      expense.income > 0
                        ? "$" + expense.income.toLocaleString()
                        : "-"
                    }</td>
                    <td class="expense">${
                      expense.expense > 0
                        ? "$" + expense.expense.toLocaleString()
                        : "-"
                    }</td>
                `;
    tbody.appendChild(row);
  });
}

function renderMonthlySummary(expenses) {
  const totalIncome = expenses.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.expense, 0);
  const savings = totalIncome - totalExpense;

  document.getElementById("total-income").textContent =
    "$" + totalIncome.toLocaleString();
  document.getElementById("total-expense").textContent =
    "$" + totalExpense.toLocaleString();
  document.getElementById("total-savings").textContent =
    "$" + savings.toLocaleString();
}

function renderYearlySummary(yearlyData) {
  const tbody = document.getElementById("yearly-summary-body");
  tbody.innerHTML = "";

  yearlyData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${item.month}</td>
                    <td class="income">$${item.income.toLocaleString()}</td>
                    <td class="expense">$${item.expense.toLocaleString()}</td>
                    <td class="savings">$${item.savings.toLocaleString()}</td>
                `;
    tbody.appendChild(row);
  });
}

function renderNotes(notes) {
  const tbody = document.getElementById("notes-body");
  tbody.innerHTML = "";

  notes.forEach((note) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${formatDate(note.date)}</td>
                    <td>${note.title}</td>
                    <td>${note.notes}</td>
                `;
    tbody.appendChild(row);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function downloadReport() {
  window.print();
}

// Initialize
updateTimestamp();
setInterval(updateTimestamp, 60000);
fetchData();
