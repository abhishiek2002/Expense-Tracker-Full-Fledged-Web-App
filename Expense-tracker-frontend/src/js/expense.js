// Expense Tracker Application - Main JavaScript File

import expenseClassInstance from "../utils/expensesServices.js";
import userClassInstance from "../utils/userServices.js";

// Global variables and state management
let expenses = [];

// Dummy leaderboard data
let leaderboardUsers = [
    { name: 'Alex Johnson', totalExpenses: 3450.75, expenses: 124 },
    { name: 'Sarah Wilson', totalExpenses: 2980.50, expenses: 98 },
    { name: 'Mike Chen', totalExpenses: 2750.25, expenses: 87 },
    { name: 'Emma Davis', totalExpenses: 2650.00, expenses: 95 },
    { name: 'Chris Brown', totalExpenses: 2420.30, expenses: 76 },
    { name: 'Lisa Garcia', totalExpenses: 2180.90, expenses: 82 },
    { name: 'David Miller', totalExpenses: 1950.75, expenses: 64 },
    { name: 'Jessica Taylor', totalExpenses: 1820.40, expenses: 71 },
    { name: 'Ryan Anderson', totalExpenses: 1680.20, expenses: 58 },
    { name: 'Amanda White', totalExpenses: 1540.80, expenses: 49 }
];

// DOM elements
const expenseForm = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');
const monthlyTotal = document.getElementById('monthly-total');
const expenseCount = document.getElementById('expense-count');
const currentMonthElement = document.getElementById('current-month');
const monthlyProgress = document.getElementById('monthly-progress');
const exportCsvBtn = document.getElementById('export-csv');
const leaderboard = document.getElementById('leaderboard');
const toast = document.getElementById('toast');

// Utility functions
function showToast(message, type = 'success') {
    const toastElement = document.getElementById('toast');
    const messageElement = toastElement.querySelector('.toast-message');
    
    messageElement.textContent = message;
    toastElement.className = `toast ${type} show`;
    
    setTimeout(() => {
        toastElement.classList.remove('show');
    }, 3000);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getCurrentMonth() {
    return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });
}

function getCategoryIcon(category) {
    const icons = {
        food: '🍔',
        transport: '🚗',
        entertainment: '🎬',
        shopping: '🛍️',
        health: '🏥',
        utilities: '⚡',
        other: '📝'
    };
    return icons[category] || '📝';
}

// Form validation
function validateForm(formData) {
    const errors = {};
    
    if (!formData.title || formData.title.trim().length < 2) {
        errors.title = 'Title must be at least 2 characters long';
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
        errors.amount = 'Please enter a valid amount greater than 0';
    }
    
    if (!formData.category) {
        errors.category = 'Please select a category';
    }
    
    if(formData.description.length > 255){
        errors.description = 'Description must be less than 255 digit';
    }
    
    return errors;
}

function showFieldErrors(errors) {
    // Clear all existing errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
    
    // Show new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
            errorElement.classList.add('show');
        }
    });
}

// Expense management functions
function addExpense(expense) {
    const newExpense = {
        id: expense.id,
        title: expense.title.trim(),
        amount: parseFloat(expense.amount),
        category: expense.category,
        createdAt: expense.createdAt,
    };
    
    expenses.unshift(newExpense); // Add to beginning for most recent first
    saveExpenses();
    renderExpenses();
    updateMonthlySummary();
    updateLeaderboard();
    
    showToast('Expense added successfully!');
}

async function deleteExpense(id) {
    const expenseIndex = expenses.findIndex(expense => expense.id == id);
    
    if (expenseIndex > -1) {
        console.log(`Deleting expense with ID: ${id}`);
        
        await expenseClassInstance.deleteExpenses(id);
        // Remove from local state
        const deletedExpense = expenses[expenseIndex];
        expenses.splice(expenseIndex, 1);
        saveExpenses();
        renderExpenses();
        updateMonthlySummary();
        updateLeaderboard();
        
        showToast(`Deleted "${deletedExpense.title}"`, 'success');
    }
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // // Update current user's total expenses
    // currentUser.totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    // localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Rendering functions
function renderExpenses() {
    if (expenses.length === 0) {
        expensesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <p>No expenses yet. Add your first expense above!</p>
            </div>
        `;
        return;
    }
    
    expensesList.innerHTML = expenses.map(expense => `
        <div class="expense-item" data-id="${expense.id}">
            <div class="expense-info">
                <h3>${getCategoryIcon(expense.category)} ${expense.title}</h3>
                <div class="expense-meta">
                    <span class="expense-category">${expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}</span>
                    <span class="expense-date">${formatDate(expense.createdAt)}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="expense-amount">${formatCurrency(expense.amount)}</div>
                <button class="btn btn-danger" title="Delete expense">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

function updateMonthlySummary() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Filter expenses for current month
    const monthlyExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.createdAt);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
    });
    
    const total = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const budget = 2000; // Fixed budget for demo
    const progressPercentage = Math.min((total / budget) * 100, 100);
    
    // Update DOM elements
    currentMonthElement.textContent = getCurrentMonth();
    monthlyTotal.textContent = formatCurrency(total);
    expenseCount.textContent = `${monthlyExpenses.length} expense${monthlyExpenses.length !== 1 ? 's' : ''}`;
    monthlyProgress.style.width = `${progressPercentage}%`;
    
    // Change progress bar color based on budget usage
    if (progressPercentage > 90) {
        monthlyProgress.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    } else if (progressPercentage > 70) {
        monthlyProgress.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
    } else {
        monthlyProgress.style.background = 'linear-gradient(90deg, #10b981, #059669)';
    }
}

async function updateLeaderboard() {
    // get top users from database or API
    const res = await userClassInstance.getTopUsers();
    const topUsers = ((res.data.users.length > 1) ? res.data.users : [res.data.users]) || leaderboardUsers; // Fallback to dummy data if API fails
    
    
    const maxExpenses = Math.max(...topUsers.map(user => user.totalExpenses));
    
    leaderboard.innerHTML = topUsers.map((user, index) => {
        const progressPercentage = (user.totalExpenses / maxExpenses) * 100;
        // const isCurrentUser = user.name === currentUser.name;
        const isCurrentUser = false;
        
        return `
            <div class="leaderboard-item ${isCurrentUser ? 'current-user' : ''}" 
                 style="--progress: ${progressPercentage}%">
                <div class="leaderboard-rank">${index + 1}</div>
                <div class="leaderboard-info">
                    <div class="leaderboard-name">
                        ${user.name} ${isCurrentUser ? '(You)' : ''}
                    </div>
                    <div class="leaderboard-expenses">
                        ${user.expenseCount} expenses
                    </div>
                </div>
                <div class="leaderboard-amount">
                    ${formatCurrency(user.totalExpenses)}
                </div>
            </div>
        `;
    }).join('');
}

// CSV Export functionality
function exportToCSV() {
    if (expenses.length === 0) {
        showToast('No expenses to export', 'error');
        return;
    }
    
    const headers = ['Title', 'Amount', 'Category', 'Date', 'Created At'];
    const csvContent = [
        headers.join(','),
        ...expenses.map(expense => [
            `"${expense.title}"`,
            expense.amount,
            expense.category,
            expense.date,
            new Date(expense.createdAt).toLocaleDateString()
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('CSV exported successfully!');
}

// Event handlers
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const expense = Object.fromEntries(formData.entries());
    
    // Validate form
    const errors = validateForm(expense);
    if (Object.keys(errors).length > 0) {
        showFieldErrors(errors);
        return;
    }
    
    // Clear any existing errors
    showFieldErrors({});
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    
    try {
        const res = await expenseClassInstance.addExpenses(expense);
        const expenseData = res.data.expense;
        addExpense(expenseData);
        event.target.reset();
        submitBtn.classList.remove('loading');
    } catch (error) {
        showFieldErrors({ form: 'Failed to add expense. Please try again.' });
        console.error('Error adding expense:', error);
    }


}

// loadExpenses function to fetch expenses from the server
async function loadExpenses() {
    try {
        const res = await expenseClassInstance.getExpenses();
        expenses = res.data.expenses;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        showToast('Failed to load expenses. Please try again.', 'error');
    }
}

// Initialize application
async function initializeApp() {
    
    // Render initial data
    await loadExpenses();
    renderExpenses();
    updateMonthlySummary();
    updateLeaderboard();
    
    // Add event listeners
    expenseForm.addEventListener('submit', handleFormSubmit);
    exportCsvBtn.addEventListener('click', exportToCSV);
    expensesList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const expenseItem = event.target.closest('.expense-item');
            const expenseId = expenseItem.dataset.id;
            
            deleteExpense(expenseId);
        }
    });
    
    // Add some demo expenses if none exist
    // if (expenses.length === 0) {
    //     const demoExpenses = [
    //         {
    //             title: 'Grocery Shopping',
    //             amount: 85.50,
    //             category: 'food',
    //             date: new Date().toISOString().split('T')[0]
    //         },
    //         {
    //             title: 'Gas Station',
    //             amount: 45.00,
    //             category: 'transport',
    //             date: new Date(Date.now() - 86400000).toISOString().split('T')[0] // Yesterday
    //         },
    //         {
    //             title: 'Movie Tickets',
    //             amount: 28.00,
    //             category: 'entertainment',
    //             date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0] // 2 days ago
    //         }
    //     ];
        
    //     demoExpenses.forEach(expense => {
    //         setTimeout(() => addExpense(expense), 500);
    //     });
    // }
    
    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('💰 Expense Tracker initialized successfully!');
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export functions for global access (for inline onclick handlers)
window.deleteExpense = deleteExpense;