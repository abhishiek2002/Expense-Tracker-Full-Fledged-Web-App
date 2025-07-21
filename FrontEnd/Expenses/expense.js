import expenseClassInstance from "../Services/expensesServices.js";

window.addEventListener("DOMContentLoaded", async () => {
  const res = await expenseClassInstance.getExpenses();
  const expenses = res.data.expenses;

  for (const expense of expenses) {
    display(expense);
  }
});

const expenseForm = document.getElementById("expenseForm");

expenseForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const amount = parseInt(expenseForm.amount.value);
  const description = expenseForm.description.value;
  const category = expenseForm.category.value;

  try {
    const res = await expenseClassInstance.addExpenses({
      amount,
      description,
      category,
    });
    const expense = res.data.expense;
    display(expense);
  } catch (error) {
    const errorFieldEl = document.getElementById("errorField");
    // console.log(error.message);
    errorFieldEl.textContent = error.message;
  }

  expenseForm.amount.value = "";
  expenseForm.description.value = "";
  expenseForm.category.value = "";
});

function display(expense) {
  const expenseListEl = document.getElementById("expenseList");

  const divEl = document.createElement("div");

  divEl.className = "expense";
  divEl.id = expense.id;
  divEl.innerHTML = `<span>${expense.amount}</span> - 
            <span>${expense.description}</span> - 
            <span>${expense.category}</span>
            <button type="button" class="delete-btn">DELETE</button>`;

  // const deleteBtn = divEl.querySelector('.delete-btn');
  // deleteBtn.addEventListener()

  expenseListEl.appendChild(divEl);
}

// delete expense functionality

const expenseListEl = document.getElementById("expenseList");

expenseListEl.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const id = event.target.parentElement.id;

    try {
      const res = await expenseClassInstance.deleteExpenses(parseInt(id));
      if (res) {
        event.target.parentElement.remove();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});
