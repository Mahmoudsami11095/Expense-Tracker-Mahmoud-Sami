// State
let expenses = [];

// DOM Elements
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmountEl = document.getElementById('total-amount');
const highestExpenseTitleEl = document.getElementById('highest-expense-title');
const highestExpenseAmountEl = document.getElementById('highest-expense-amount');
const filterCategoryEl = document.getElementById('filter-category');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    // Set default date to today
    document.getElementById('date').valueAsDate = new Date();
});

// Event Listeners
expenseForm.addEventListener('submit', handleAddExpense);
filterCategoryEl.addEventListener('change', handleFilterChange);
expenseList.addEventListener('click', handleDeleteClick);

// Handlers
function handleAddExpense(e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (!title || isNaN(amount) || amount <= 0 || !date) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const newExpense = {
        id: Date.now().toString(),
        title,
        amount,
        category,
        date
    };

    addExpense(newExpense);
    expenseForm.reset();
    document.getElementById('date').valueAsDate = new Date(); // Reset date to today
}

function handleDeleteClick(e) {
    if (e.target.closest('.delete-btn')) {
        const id = e.target.closest('.delete-btn').dataset.id;
        deleteExpense(id);
    }
}

function handleFilterChange() {
    renderExpenses(filterCategoryEl.value);
}

// Core Functions
function addExpense(expense) {
    expenses.push(expense);
    saveToStorage();
    updateUI();
}

function deleteExpense(id) {
    const expenseExists = expenses.find(expense => expense.id === id);
    if (expenseExists) {
        expenses = expenses.filter(expense => expense.id !== id);
        saveToStorage();
        updateUI();
    }
}

function updateUI() {
    renderExpenses(filterCategoryEl.value);
    calculateTotal();
    updateHighestExpense();
}

function renderExpenses(filterCategory = 'All') {
    expenseList.innerHTML = '';

    const filteredExpenses = filterCategory === 'All'
        ? expenses
        : expenses.filter(expense => expense.category === filterCategory);

    if (filteredExpenses.length === 0) {
        expenseList.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-gray-400 py-8">
                    ${expenses.length === 0 ? 'No expenses added yet.' : 'No expenses found for this category.'}
                </td>
            </tr>
        `;
        return;
    }

    expenseList.innerHTML = filteredExpenses.map(({ id, title, category, date, amount }) => `
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition group">
            <td class="py-3 px-1 font-medium text-gray-800">${title}</td>
            <td class="py-3 px-1">
                <span class="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
                    ${category}
                </span>
            </td>
            <td class="py-3 px-1 text-gray-500">${formatDate(date)}</td>
            <td class="py-3 px-1 text-right font-bold text-gray-700">$${amount.toFixed(2)}</td>
            <td class="py-3 px-1 text-center">
                <button class="delete-btn text-red-400 hover:text-red-600 transition p-1 rounded-md hover:bg-red-50" data-id="${id}" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
}

function calculateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountEl.textContent = `$${total.toFixed(2)}`;
}

function updateHighestExpense() {
    if (expenses.length === 0) {
        highestExpenseTitleEl.textContent = '-';
        highestExpenseAmountEl.textContent = '$0.00';
        return;
    }

    // Using spread operator to find max amount, or sort
    const highest = [...expenses].sort((a, b) => b.amount - a.amount)[0];

    highestExpenseTitleEl.textContent = highest.title;
    highestExpenseAmountEl.textContent = `$${highest.amount.toFixed(2)}`;
}

// Helper Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Storage
function saveToStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadFromStorage() {
    const stored = localStorage.getItem('expenses');
    if (stored) {
        expenses = JSON.parse(stored);
        updateUI();
    }
}
