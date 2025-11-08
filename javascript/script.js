/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                    /* UNIVERSAL*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

/*const thisPage = window.location.pathname.split("/").pop();

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {

  if (link.getAttribute("href") === thisPage) {
    link.classList.add("active");
  }
});

/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                        /*INDEX PAGE*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

/*const borrowButton = document.querySelector(".borrowButton");

borrowButton.addEventListener("click", () => {
  window.location.href = "../html/borrow.html";
});

const lendButton = document.querySelector(".lendBtn");

lendButton.addEventListener("click", () => {
  window.location.href = "../html/lend.html";
});

const buyButton = document.querySelector(".buyBtn");

buyButton.addEventListener("click", () => {
  window.location.href = "../html/buy.html";
});

const sellButton = document.querySelector(".sellBtn");

sellButton.addEventListener("click", () => {
  window.location.href = "../html/sell.html";
});


/*BOOKS CATEGORIES SCROLL*/

/*const categoryItems = document.querySelectorAll("#categoryList li");

categoryItems.forEach(async (li) => {
  const category = li.dataset.category;

  // Construct Google Books API URL
  // Use maxResults=1 to get one book cover per category
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}&maxResults=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const book = data.items[0].volumeInfo;

      // Replace img src with the book's thumbnail
      const img = li.querySelector(".cover");
      img.src = book.imageLinks?.thumbnail || "https://via.placeholder.com/150";

      // Optionally replace category title with the fetched book title
      const h2 = li.querySelector(".categoryH");
      h2.textContent = /*book.title ||*/ /*category;
    }
  } catch (error) {
    console.error(`Error fetching books for category "${category}":`, error);
  }
});


/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                            /*BORROW*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

/*const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const resultsSection = document.getElementById("results");

// Detect which page we are on
const currentPage = window.location.pathname.includes("buy") ? "buy" : "borrow";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  const filter = filterType.value;

  if (!query) return;

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${filter}:${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    resultsSection.innerHTML = "";

    if (!data.items) {
      resultsSection.innerHTML = "<p>No books found.</p>";
      return;
    }

    data.items.forEach((item) => {
      const book = item.volumeInfo;
      const title = book.title || "No title available";
      const authors = book.authors ? book.authors.join(", ") : "Unknown author";
      const description = book.description
        ? book.description.substring(0, 150) + "..."
        : "No description available.";
      const thumbnail = book.imageLinks?.thumbnail || "https://via.placeholder.com/150";

      // Change button text and link based on current page
      const buttonText = currentPage === "buy" ? "Buy Now" : "Borrow Now";
      const targetPage = currentPage === "buy" ? "buyPage.html" : "borrowPage.html";

      const bookHTML = `
        <div class="book">
          <img src="${thumbnail}" alt="${title} cover">
          <h3>${title}</h3>
          <p><strong>Author:</strong> ${authors}</p>
          <p>${description}</p>
          <button class="borrowBtn" onclick="goToAction('${encodeURIComponent(title)}', '${targetPage}')">
            ${buttonText}
          </button>
        </div>
      `;

      resultsSection.innerHTML += bookHTML;
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    resultsSection.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  }
});

function goToAction(title, targetPage) {
  window.location.href = `${targetPage}?book=${title}`;
}



/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                            /*LEND*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/




/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                            /*BUY*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/





/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                            /*SELL*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/





/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                        /*COMMUNITY*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

/*const openFormBtn = document.getElementById('openFormBtn');
const clubForm = document.getElementById('clubForm');
const cancelBtn = document.getElementById('cancelBtn');

// Open the form
openFormBtn.addEventListener('click', () => {
  clubForm.style.display = 'block';
});

// Close the form when Cancel is clicked
cancelBtn.addEventListener('click', () => {
  clubForm.style.display = 'none';
});

// Optional: Handle form submission
document.getElementById('clubFormContent').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Book Club Created Successfully!');
  clubForm.style.display = 'none';
});



/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                        /*ACCOUNT*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/




/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                        /*BOOKS BY CATEGORIES*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/





/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                        /*REVIEWS*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/




/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                        /*ACCOUNT*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------
   UNIVERSAL
--------------------------------------------------------------------------- */
const thisPage = window.location.pathname.split("/").pop();
const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {
  if (link.getAttribute("href") === thisPage) {
    link.classList.add("active");
  }
});

/* ---------------------------------------------------------------------------
   INDEX PAGE BUTTON NAVIGATION
--------------------------------------------------------------------------- */
function navigateButton(selector, targetPage) {
  const button = document.querySelector(selector);
  if (button) {
    button.addEventListener("click", () => {
      window.location.href = targetPage;
    });
  }
}

navigateButton(".borrowButton", "../html/borrow.html");
navigateButton(".lendBtn", "../html/lend.html");
navigateButton(".buyBtn", "../html/buy.html");
navigateButton(".sellBtn", "../html/sell.html");

/* ---------------------------------------------------------------------------
   BOOK CATEGORIES SCROLL / GALLERY
--------------------------------------------------------------------------- */
const categoryItems = document.querySelectorAll("#categoryList li");

categoryItems.forEach(async li => {
  const category = li.dataset.category;
  if (!category) return;

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}&maxResults=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const book = data.items[0].volumeInfo;
      const img = li.querySelector(".cover");
      const h2 = li.querySelector(".categoryH");

      if (img) {
        img.src = book.imageLinks?.thumbnail || "https://via.placeholder.com/150";
        img.alt = book.title || "Book cover";
      }

      if (h2) {
        h2.textContent = category; // Keep category name consistent
      }
    }
  } catch (error) {
    console.error(`Error fetching books for category "${category}":`, error);
  }
});

/* ---------------------------------------------------------------------------
   BORROW / BUY PAGE SEARCH
--------------------------------------------------------------------------- */
/*const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const resultsSection = document.getElementById("results");

// Safeguard: only run search if form exists
if (form && searchInput && filterType && resultsSection) {
  const currentPage = window.location.pathname.includes("buy") ? "buy" : "borrow";

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const query = searchInput.value.trim();
    const filter = filterType.value;
    if (!query) return;

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${filter}:${encodeURIComponent(query)}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      resultsSection.innerHTML = "";

      if (!data.items) {
        resultsSection.innerHTML = "<p>No books found.</p>";
        return;
      }

      data.items.forEach(item => {
        const book = item.volumeInfo;
        const title = book.title || "No title available";
        const authors = book.authors ? book.authors.join(", ") : "Unknown author";
        const description = book.description
          ? book.description.substring(0, 150) + "..."
          : "No description available.";
        const thumbnail = book.imageLinks?.thumbnail || "https://via.placeholder.com/150";

        const buttonText = currentPage === "buy" ? "Buy Now" : "Borrow Now";
        const targetPage = currentPage === "buy" ? "buyPage.html" : "borrowPage.html";

        const bookHTML = `
          <div class="book">
            <img src="${thumbnail}" alt="${title} cover">
            <h3>${title}</h3>
            <p><strong>Author:</strong> ${authors}</p>
            <p>${description}</p>
            <button class="actionBtn" data-title="${encodeURIComponent(title)}" data-target="${targetPage}">
              ${buttonText}
            </button>
          </div>
        `;

        resultsSection.insertAdjacentHTML("beforeend", bookHTML);
      });
    } catch (error) {
      console.error("Error fetching books:", error);
      resultsSection.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
  });

  // Handle all “Borrow/Buy Now” clicks safely
  resultsSection.addEventListener("click", e => {
    if (e.target.classList.contains("actionBtn")) {
      const title = e.target.dataset.title;
      const targetPage = e.target.dataset.target;
      if (title && targetPage) {
        window.location.href = `${targetPage}?book=${title}`;
      }
    }
  });
}*/


document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const filterType = document.getElementById("filterType");
  const resultsSection = document.getElementById("results");

  if (!searchForm || !searchInput || !filterType || !resultsSection) return;

  // Determine current page
  const currentPage = window.location.pathname.includes("buy.html") ? "buy" : "borrow";
  const buttonText = currentPage === "buy" ? "Buy Now" : "Borrow Now";
  const targetPage = currentPage === "buy" ? "buyPage.html" : "borrowPage.html";

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    const filter = filterType.value;

    if (!query) return;

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${filter}:${encodeURIComponent(query)}&maxResults=12`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      resultsSection.innerHTML = "";

      if (!data.items || data.items.length === 0) {
        resultsSection.innerHTML = "<p>No books found.</p>";
        return;
      }

      data.items.forEach((item) => {
        const book = item.volumeInfo;
        const title = book.title || "No title available";
        const authors = book.authors ? book.authors.join(", ") : "Unknown author";
        const description = book.description
          ? book.description.substring(0, 150) + "..."
          : "No description available.";
        const thumbnail = book.imageLinks?.thumbnail || "https://via.placeholder.com/150";

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = `
          <img src="${thumbnail}" alt="${title} cover">
          <h3>${title}</h3>
          <p><strong>Author:</strong> ${authors}</p>
          <p>${description}</p>
          <button class="borrowBtn">${buttonText}</button>
        `;

        // Add click listener for button
        const btn = bookDiv.querySelector(".borrowBtn");
        btn.addEventListener("click", () => {
          window.location.href = `${targetPage}?book=${encodeURIComponent(title)}`;
        });

        resultsSection.appendChild(bookDiv);
      });
    } catch (err) {
      console.error("Error fetching books:", err);
      resultsSection.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
  });
});

/* ---------------------------------------------------------------------------
   COMMUNITY PAGE (Book Club Form)
--------------------------------------------------------------------------- */
const openFormBtn = document.getElementById("openFormBtn");
const clubForm = document.getElementById("clubForm");
const cancelBtn = document.getElementById("cancelBtn");
const clubFormContent = document.getElementById("clubFormContent");

if (openFormBtn && clubForm && cancelBtn) {
  // Open form
  openFormBtn.addEventListener("click", () => {
    clubForm.style.display = "block";
  });

  // Cancel form
  cancelBtn.addEventListener("click", () => {
    clubForm.style.display = "none";
  });

  // Handle submission
  if (clubFormContent) {
    clubFormContent.addEventListener("submit", e => {
      e.preventDefault();
      alert("Book Club Created Successfully!");
      clubForm.style.display = "none";
    });
  }
}


/*BORROW PAGE REDIRECT*/

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const bookTitle = urlParams.get("book");

  const bookDetailsDiv = document.getElementById("bookDetails");
  const borrowForm = document.getElementById("borrowForm");

  if (!bookTitle) {
    bookDetailsDiv.innerHTML = "<p>No book selected.</p>";
    borrowForm.style.display = "none";
    return;
  }

  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}&maxResults=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      bookDetailsDiv.innerHTML = "<p>Book not found.</p>";
      borrowForm.style.display = "none";
      return;
    }

    const book = data.items[0].volumeInfo;
    const thumbnail = book.imageLinks?.thumbnail || "https://via.placeholder.com/200";
    const title = book.title || "No Title";
    const authors = book.authors ? book.authors.join(", ") : "Unknown Author";
    const description = book.description || "No description available.";

    bookDetailsDiv.innerHTML = `
      <img src="${thumbnail}" alt="${title} cover">
      <div class="bookInfo">
        <h2>${title}</h2>
        <p><strong>Author:</strong> ${authors}</p>
        <p>${description}</p>
      </div>
    `;

    // --- LENDER SELECTION ---
    const lenders = [
      { name: "Alice Smith", distance: "2 km", maxDays: 14 },
      { name: "Bob Johnson", distance: "5 km", maxDays: 21 },
      { name: "Carol Lee", distance: "3 km", maxDays: 7 },
      { name: "David Brown", distance: "8 km", maxDays: 14 },
      { name: "Eve Wilson", distance: "1 km", maxDays: 10 }
    ];

    const lenderSelect = document.createElement("select");
    lenderSelect.id = "lenderSelect";
    lenderSelect.required = true;

    lenders.forEach(lender => {
      const option = document.createElement("option");
      option.value = lender.name;
      option.textContent = `${lender.name} - ${lender.distance}, up to ${lender.maxDays} days`;
      lenderSelect.appendChild(option);
    });

    const lenderLabel = document.createElement("label");
    lenderLabel.htmlFor = "lenderSelect";
    lenderLabel.textContent = "Choose a lender:";

    borrowForm.insertBefore(lenderLabel, borrowForm.querySelector("#borrowDuration"));
    borrowForm.insertBefore(lenderSelect, borrowForm.querySelector("#borrowDuration"));

  } catch (err) {
    console.error("Error fetching book:", err);
    bookDetailsDiv.innerHTML = "<p>Could not load book details.</p>";
    borrowForm.style.display = "none";
  }

  // Handle borrow form submission
  borrowForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const duration = document.getElementById("borrowDuration").value;
    const lender = document.getElementById("lenderSelect").value;

    if (!fullName || !email || !lender) return;

    alert(`Success! You have borrowed "${bookTitle}" from ${lender} for ${duration} days.\nA confirmation has been sent to ${email}.`);

    borrowForm.reset();
  });
});


/*BUY PAGE REDIRECT*/

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const bookTitle = urlParams.get("book");

  const bookDetailsDiv = document.getElementById("bookDetails");
  const buyForm = document.getElementById("buyForm");

  if (!bookTitle) {
    bookDetailsDiv.innerHTML = "<p>No book selected.</p>";
    buyForm.style.display = "none";
    return;
  }

  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookTitle)}&maxResults=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      bookDetailsDiv.innerHTML = "<p>Book not found.</p>";
      buyForm.style.display = "none";
      return;
    }

    const book = data.items[0].volumeInfo;
    const thumbnail = book.imageLinks?.thumbnail || "https://via.placeholder.com/200";
    const title = book.title || "No Title";
    const authors = book.authors ? book.authors.join(", ") : "Unknown Author";
    const description = book.description || "No description available.";

    bookDetailsDiv.innerHTML = `
      <img src="${thumbnail}" alt="${title} cover">
      <div class="bookInfo">
        <h2>${title}</h2>
        <p><strong>Author:</strong> ${authors}</p>
        <p>${description}</p>
      </div>
    `;

    // --- SELLER SELECTION (Realistic People) ---
    const sellers = [
      { name: "Anele Mthembu", location: "2 km away", price: "R120" },
      { name: "Thabo Nkosi", location: "5 km away", price: "R100" },
      { name: "Lerato Dlamini", location: "3 km away", price: "R110" },
      { name: "Sibongile Khumalo", location: "7 km away", price: "R95" },
      { name: "Johan van der Merwe", location: "1 km away", price: "R130" }
    ];

    // Create seller select dropdown
    const sellerSelect = document.createElement("select");
    sellerSelect.id = "sellerSelect";
    sellerSelect.required = true;

    // Add a placeholder option
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Select a seller";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    sellerSelect.appendChild(placeholderOption);

    // Add seller options
    sellers.forEach(seller => {
      const option = document.createElement("option");
      option.value = seller.name;
      option.textContent = `${seller.name} - ${seller.location}, ${seller.price}`;
      sellerSelect.appendChild(option);
    });

    const sellerLabel = document.createElement("label");
    sellerLabel.htmlFor = "sellerSelect";
    sellerLabel.textContent = "Choose a seller:";

    buyForm.insertBefore(sellerLabel, buyForm.querySelector("button"));
    buyForm.insertBefore(sellerSelect, buyForm.querySelector("button"));

  } catch (err) {
    console.error("Error fetching book:", err);
    bookDetailsDiv.innerHTML = "<p>Could not load book details.</p>";
    buyForm.style.display = "none";
  }

  // --- Handle purchase form submission ---
  buyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const seller = document.getElementById("sellerSelect").value;

    if (!fullName || !email || !seller) return;

    alert(`✅ Success! You have purchased "${bookTitle}" from ${seller}.\nA confirmation has been sent to ${email}.`);

    buyForm.reset();
  });
});

/*LENDER ADD BOOK*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addBookForm");
  const bookList = document.getElementById("bookList");

  // Load saved books
  let books = JSON.parse(localStorage.getItem("lenderBooks")) || [];

  // Function to display books
  function renderBooks() {
    bookList.innerHTML = "";

    if (books.length === 0) {
      bookList.innerHTML = "<p>No books added yet.</p>";
      return;
    }

    books.forEach((book, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="book-info">
          <strong>${book.title}</strong> by ${book.author} <br>
          <em>${book.genre || "Unknown Genre"}</em>
        </div>
        <span class="book-status ${book.status.toLowerCase().replace(" ", "-")}">
          ${book.status}
        </span>
      `;
      bookList.appendChild(li);
    });
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBook = {
      title: document.getElementById("bookTitle").value.trim(),
      author: document.getElementById("bookAuthor").value.trim(),
      genre: document.getElementById("bookGenre").value.trim(),
      status: document.getElementById("bookStatus").value
    };

    books.push(newBook);
    localStorage.setItem("lenderBooks", JSON.stringify(books));

    form.reset();
    renderBooks();
  });

  renderBooks();
});

/*SELLER DETAILS*/

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sellForm");
  const bookList = document.getElementById("bookList");

  let books = JSON.parse(localStorage.getItem("sellerBooks")) || [];

  // Render books
  function renderBooks() {
    bookList.innerHTML = "";

    if (books.length === 0) {
      bookList.innerHTML = "<p>No books uploaded yet.</p>";
      return;
    }

    books.forEach((book, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="book-info">
          <strong>${book.title}</strong> by ${book.author} <br>
          <span class="book-condition">${book.condition}</span> |
          <em>${book.category}</em>
        </div>
        <span class="book-price">R${book.price}</span>
        <button class="delete-btn" data-index="${index}">Remove</button>
      `;
      bookList.appendChild(li);
    });

    // Add delete functionality
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        books.splice(index, 1);
        localStorage.setItem("sellerBooks", JSON.stringify(books));
        renderBooks();
      });
    });
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBook = {
      title: document.getElementById("bookTitle").value.trim(),
      author: document.getElementById("bookAuthor").value.trim(),
      category: document.getElementById("bookCategory").value,
      condition: document.getElementById("bookCondition").value,
      price: document.getElementById("bookPrice").value
    };

    books.push(newBook);
    localStorage.setItem("sellerBooks", JSON.stringify(books));
    form.reset();
    renderBooks();
  });

  renderBooks();
});

/* CATEGORIES PAGE */
document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".categoryX");

  categories.forEach(categoryDiv => {
    const categoryName = categoryDiv.dataset.category;
    const grid = categoryDiv.querySelector(".categoryGrid");
    const viewMore = categoryDiv.querySelector(".viewMore");

    let startIndex = 0;
    const maxResultsPerFetch = 4;
    let expanded = false; // Track toggle state
    let allBooks = [];    // Store all loaded books

    async function fetchBooks() {
      const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(categoryName)}&startIndex=${startIndex}&maxResults=${maxResultsPerFetch}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.items) return;

        data.items.forEach(item => {
          const book = item.volumeInfo;
          const thumbnail = book.imageLinks?.thumbnail || "https://via.placeholder.com/150";
          const title = book.title || "No Title";
          allBooks.push({ thumbnail, title });
        });

        startIndex += maxResultsPerFetch;
      } catch (err) {
        console.error(`Error fetching books for ${categoryName}:`, err);
      }
    }

    function renderBooks() {
      grid.innerHTML = "";

      const booksToShow = expanded ? allBooks.length : Math.min(4, allBooks.length);

      allBooks.slice(0, booksToShow).forEach(book => {
        const img = document.createElement("img");
        img.src = book.thumbnail;
        img.alt = book.title;
        img.title = book.title;
        grid.appendChild(img);
      });

      viewMore.textContent = expanded ? "...show less" : "...view more";
    }

    // Load initial 4 books
    (async () => {
      await fetchBooks();
      renderBooks();
    })();

    // Toggle expand/collapse
    viewMore.addEventListener("click", async e => {
      e.preventDefault();

      if (!expanded) {
        // Fetch next batch of books if not already loaded enough
        await fetchBooks();
      }

      expanded = !expanded;
      renderBooks();
    });
  });
});