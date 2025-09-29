// Simulated data
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: true },
    { id: 2, title: "1984", author: "George Orwell", available: true },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", available: false }
];

// Load issued books from local storage or initialize
let issuedBooks = JSON.parse(localStorage.getItem('issuedBooks')) || [];
let selectedBookId = null;

// Display issued books
function displayIssuedBooks() {
    const tableBody = document.getElementById('books-table');
    tableBody.innerHTML = '';
    issuedBooks.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${book.title}</td><td>${book.issueDate}</td><td>${book.dueDate}</td>`;
        tableBody.appendChild(row);
    });
}

// Simulate issuing a book
function issueBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book && book.available) {
        const issueDate = new Date().toLocaleDateString();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 2 weeks due date
        issuedBooks.push({ ...book, issueDate, dueDate, available: false });
        book.available = false;
        localStorage.setItem('issuedBooks', JSON.stringify(issuedBooks));
        displayIssuedBooks();
        alert(`${book.title} issued successfully! Due: ${dueDate.toLocaleDateString()}`);
    } else {
        alert("Book not available!");
    }
}

// Return a book
function returnBook() {
    if (selectedBookId) {
        issuedBooks = issuedBooks.filter(b => b.id !== selectedBookId);
        const book = books.find(b => b.id === selectedBookId);
        if (book) book.available = true;
        localStorage.setItem('issuedBooks', JSON.stringify(issuedBooks));
        displayIssuedBooks();
        alert("Book returned successfully!");
        selectedBookId = null;
    } else {
        alert("Select a book to return!");
    }
}

// Search books
function searchBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';
    const matchingBooks = books.filter(book => 
        book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)
    );
    if (matchingBooks.length > 0) {
        matchingBooks.forEach(book => {
            const div = document.createElement('div');
            div.textContent = `${book.title} by ${book.author} - ${book.available ? 'Available' : 'Not Available'}`;
            if (book.available) {
                const issueBtn = document.createElement('button');
                issueBtn.textContent = 'Issue';
                issueBtn.onclick = () => issueBook(book.id);
                div.appendChild(issueBtn);
            }
            resultsDiv.appendChild(div);
        });
    } else {
        resultsDiv.textContent = 'No books found.';
    }
}

// Logout (simple redirect simulation)
function logout() {
    alert("Logged out!");
    // In a real app, redirect to login page
    window.location.href = 'index.html'; // Refresh for demo
}

// Initial display
displayIssuedBooks();