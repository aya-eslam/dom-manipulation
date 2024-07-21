// Array to store quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" }
];

// Function to load quotes from local storage
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    quotes = storedQuotes;
    showRandomQuote();
    populateCategoryFilter();
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to show a random quote
function showRandomQuote() {
    const filteredQuotes = filterQuotesByCategory();
    if (filteredQuotes.length === 0) {
        document.getElementById('quoteDisplay').textContent = 'No quotes available for the selected category.';
        return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    document.getElementById('quoteDisplay').textContent = `"${quote.text}" - ${quote.category}`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        showRandomQuote(); // Show the new quote immediately after adding
        populateCategoryFilter(); // Update category filter
    } else {
        alert('Please enter both quote and category.');
    }
}

// Function to export quotes to JSON
function exportToJson() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes = importedQuotes;
        saveQuotes();
        showRandomQuote();
        populateCategoryFilter();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    showRandomQuote(); // Show a new quote based on the current filter
    localStorage.setItem('selectedCategory', selectedCategory); // Save the filter selection
}

// Function to get filtered quotes
function filterQuotesByCategory() {
    const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
    if (selectedCategory === 'all') {
        return quotes;
    }
    return quotes.filter(quote => quote.category === selectedCategory);
}

// Function to populate the category filter dropdown
function populateCategoryFilter() {
    const categories = new Set(quotes.map(quote => quote.category));
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    categoryFilter.value = localStorage.getItem('selectedCategory') || 'all'; // Restore last selected filter
}

// Function to clear all quotes
function clearQuotes() {
    quotes = [];
    localStorage.removeItem('quotes');
    localStorage.removeItem('selectedCategory');
    showRandomQuote(); // Clear the display as well
    populateCategoryFilter(); // Update category filter
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Show a random quote on page load
document.addEventListener('DOMContentLoaded', loadQuotes);
// Initialize Data
function loadData() {
    const data = localStorage.getItem('myData');
    if (data) {
        return JSON.parse(data);
    }
    return []; // Return an empty array if no data is found
}

// Save Data
function saveData(data) {
    localStorage.setItem('myData', JSON.stringify(data));
}

// Example Usage
let data = loadData();

// Adding new item
data.push({ id: 1, text: 'New Item' });
saveData(data);

// Removing item
data = data.filter(item => item.id !== 1);
saveData(data);
