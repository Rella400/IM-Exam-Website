
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
        h2.textContent = category; 
      }
    }
  } catch (error) {
    console.error(`Error fetching books for category "${category}":`, error);
  }
});

/* ---------------------------------------------------------------------------
   BORROW / BUY PAGE SEARCH
--------------------------------------------------------------------------- */


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

  openFormBtn.addEventListener("click", () => {
    clubForm.style.display = "block";
  });


  cancelBtn.addEventListener("click", () => {
    clubForm.style.display = "none";
  });


  if (clubFormContent) {
    clubFormContent.addEventListener("submit", e => {
      e.preventDefault();
      alert("Book Club Created Successfully!");
      clubForm.style.display = "none";
    });
  }
}

/*REVIEWS SECTION*/

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".revStars").forEach(starBox => {
    const rating = parseFloat(starBox.dataset.rating);
    const percent = Math.min((rating / 5) * 100, 100);
    starBox.style.setProperty("--rating-percent", `${percent}%`);
  });


  document.querySelectorAll(".readMore").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const para = e.target.closest(".revPara");
      const moreText = para.querySelector(".moreText");

      if (moreText.style.display === "inline") {
        moreText.style.display = "none";
        e.target.textContent = "...Read More";
      } else {
        moreText.style.display = "inline";
        e.target.textContent = " Show Less";
      }
    });
  });
});


/*CLUB LISTINGS*/

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("threadModal");
  const closeModal = document.querySelector(".close");
  const threadDetails = document.getElementById("threadDetails");

  const threads = {
    1: {
      title: "Is 'To Kill a Mockingbird' still relevant today?",
      comments: [
        {
          author: "Noluthando M.",
          time: "2 hours ago",
          text: "Absolutely. It still teaches empathy, justice, and moral courage in a divided world."
        },
        {
          author: "Peter R.",
          time: "1 hour ago",
          text: "Yes, but younger readers find the language outdated. Maybe a modern adaptation could help."
        },
        {
          author: "Lerato K.",
          time: "30 minutes ago",
          text: "I read it last year. It’s timeless — Harper Lee’s message is universal."
        }
      ]
    },
    2: {
      title: "Best fantasy world-building in recent novels?",
      comments: [
        {
          author: "Sammy B.",
          time: "1 day ago",
          text: "I’m amazed by the detail in Brandon Sanderson’s Stormlight Archive series!"
        },
        {
          author: "Kabelo D.",
          time: "20 hours ago",
          text: "‘The Poppy War’ by R.F. Kuang has incredible world-building grounded in Chinese history."
        },
        {
          author: "Tina P.",
          time: "12 hours ago",
          text: "Don’t forget ‘The Priory of the Orange Tree’ — a masterpiece of fantasy lore."
        }
      ]
    },
    3: {
      title: "Books that changed your perspective on life?",
      comments: [
        {
          author: "Leah M.",
          time: "3 days ago",
          text: "‘Man’s Search for Meaning’ by Viktor Frankl helped me find purpose after loss."
        },
        {
          author: "James K.",
          time: "2 days ago",
          text: "‘The Alchemist’ made me realise the importance of following one’s dreams."
        },
        {
          author: "Zinhle T.",
          time: "1 day ago",
          text: "‘Atomic Habits’ shifted how I view progress and discipline in daily life."
        }
      ]
    }
  };

 
  document.querySelectorAll(".threadBtn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.thread;
      const thread = threads[id];

      threadDetails.innerHTML = `
        <div class="threadDiscussion">
          <h3>${thread.title}</h3>
          ${thread.comments.map(c => `
            <div class="comment">
              <p class="comment-author">${c.author}</p>
              <p class="comment-time">${c.time}</p>
              <p class="comment-text">${c.text}</p>
            </div>
          `).join("")}
        </div>
      `;

      modal.style.display = "block";
    });
  });

 
  closeModal.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

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

    /*LENDER SELECTION */
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

    /* SELLER SELECTION */
    const sellers = [
      { name: "Anele Mthembu", location: "2 km away", price: "R120" },
      { name: "Thabo Nkosi", location: "5 km away", price: "R100" },
      { name: "Lerato Dlamini", location: "3 km away", price: "R110" },
      { name: "Sibongile Khumalo", location: "7 km away", price: "R95" },
      { name: "Johan van der Merwe", location: "1 km away", price: "R130" }
    ];


    const sellerSelect = document.createElement("select");
    sellerSelect.id = "sellerSelect";
    sellerSelect.required = true;

    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Select a seller";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    sellerSelect.appendChild(placeholderOption);

  
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


  let books = JSON.parse(localStorage.getItem("lenderBooks")) || [];


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


    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        books.splice(index, 1);
        localStorage.setItem("sellerBooks", JSON.stringify(books));
        renderBooks();
      });
    });
  }


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
    let expanded = false; 
    let allBooks = [];   

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

  
    (async () => {
      await fetchBooks();
      renderBooks();
    })();

  
    viewMore.addEventListener("click", async e => {
      e.preventDefault();

      if (!expanded) {

        await fetchBooks();
      }

      expanded = !expanded;
      renderBooks();
    });
  });
});




/*============================
 GSAP Animations for Homepage
 ============================*/



gsap.registerPlugin(ScrollTrigger);


const heroTimeline = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });

heroTimeline
  .from(".hero h1", { opacity: 0, y: -50 })
  .from(".hero p", { opacity: 0, y: 20 }, "-=0.5")
  .from(".heroButtons button", { opacity: 0, y: 30, scale: 0.8, stagger: 0.2, ease: "back.out(1.7)" });


document.querySelectorAll(".heroButtons button").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 1.1, duration: 0.3, ease: "power1.out" });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, duration: 0.3, ease: "power1.out" });
  });
});


gsap.from(".categories li", {
  opacity: 0,
  y: 50,
  scale: 0.8,
  rotation: -5,
  duration: 1,
  stagger: 0.15,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".categories",
    start: "top 80%",
    toggleActions: "play none none none"
  }
});


/*GSAP FOR BORROW/BUY PAGE*/

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const filterType = document.getElementById("filterType");
  const resultsSection = document.getElementById("results");

  if (!searchForm || !searchInput || !filterType || !resultsSection) return;


  gsap.from(".actions li", {
    opacity: 0,
    x: -50,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  });


  gsap.from(".search", {
    opacity: 0,
    y: -30,
    duration: 0.8,
    delay: 0.5,
    ease: "power2.out"
  });

 
  function animateBooks() {
    const books = resultsSection.querySelectorAll(".book");
    gsap.fromTo(
      books,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)"
      }
    );
  }


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

        const btn = bookDiv.querySelector(".borrowBtn");
        btn.addEventListener("click", () => {
          window.location.href = `${targetPage}?book=${encodeURIComponent(title)}`;
        });

        resultsSection.appendChild(bookDiv);
      });


      animateBooks();

    } catch (err) {
      console.error("Error fetching books:", err);
      resultsSection.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
  });
});


/*CATEGORIES GSAP*/

document.addEventListener("DOMContentLoaded", () => {
  // === Animate Page Header ===
  gsap.from(".categoriesH1", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  // === Animate Each Category Container ===
  gsap.from(".categoryX", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2
  });

  // === Animate Category Titles with Timeline ===
  const titleTl = gsap.timeline();
  document.querySelectorAll(".categoryTitle").forEach((title, i) => {
    titleTl.from(title, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power1.out",
      delay: i * 0.1
    });
  });

  // === Animate Books on Scroll ===
  document.querySelectorAll(".categoryGrid").forEach(grid => {
    gsap.from(grid.children, {
      scrollTrigger: {
        trigger: grid,
        start: "top 80%", // start when grid top reaches 80% of viewport
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15
    });
  });

  // === Animate 'View More' links ===
  gsap.from(".viewMore", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power2.out",
    stagger: 0.2,
    delay: 0.5
  });
});


/* LEND PAGE GSAP*/

document.addEventListener("DOMContentLoaded", () => {


  const detailsTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });

  detailsTimeline
    .from(".details h2", { y: 30, opacity: 0 })          
    .from(".details p", { y: 20, opacity: 0 }, "-=0.4")   
    .from(".add-book-section", { x: 50, opacity: 0 }, "-=0.4")
    .from(".book-list-section", { x: -50, opacity: 0 }, "-=0.4");


  const addBookBtn = document.querySelector("#addBookForm button");
  if (addBookBtn) {
    addBookBtn.addEventListener("mouseenter", () => {
      gsap.to(addBookBtn, { scale: 1.05, duration: 0.2, ease: "power1.inOut" });
    });
    addBookBtn.addEventListener("mouseleave", () => {
      gsap.to(addBookBtn, { scale: 1, duration: 0.2, ease: "power1.inOut" });
    });
  }


  const bookList = document.getElementById("bookList");
  const addBookForm = document.getElementById("addBookForm");

  if (addBookForm && bookList) {
    addBookForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("bookTitle").value.trim();
      const author = document.getElementById("bookAuthor").value.trim();
      const genre = document.getElementById("bookGenre").value.trim();
      const status = document.getElementById("bookStatus").value;

      if (!title || !author) return;

      const li = document.createElement("li");
      li.innerHTML = `<strong>${title}</strong> by ${author} <em>(${genre || "No genre"}) - ${status}</em>`;
      li.style.opacity = 0;
      li.style.transform = "translateY(20px)";
      bookList.appendChild(li);

      gsap.to(li, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });

      addBookForm.reset();
    });
  }

});


/*COMMUNITY PAGE GSAP*/

document.addEventListener("DOMContentLoaded", () => {

  gsap.from(".reviewBox", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3, 
    ease: "power2.out",
    onComplete: () => console.log("Reviews animation complete")
  });

  gsap.from("#openFormBtn", {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    delay: 0.5,
    ease: "elastic.out(1, 0.5)"
  });


  gsap.from(".listing", {
    opacity: 0,
    x: -100,
    duration: 1,
    stagger: 0.25,
    ease: "power1.out"
  });

 
  const threadTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });
  threadTimeline.from(".thread", { opacity: 0, y: 50, stagger: 0.2 })
                .from(".threadBtn", { opacity: 0, scale: 0.8, stagger: 0.2 }, "-=0.5");


  const viewMoreLinks = document.querySelectorAll(".view, .joinBtn");
  viewMoreLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, { scale: 1.1, duration: 0.3, ease: "power1.out" });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, { scale: 1, duration: 0.3, ease: "power1.out" });
    });
  });

 
  const modal = document.getElementById("threadModal");
  const modalContent = document.querySelector(".modal-content");

  const animateModalIn = () => {
    gsap.fromTo(modalContent, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
  };

  document.querySelectorAll(".threadBtn").forEach(btn => {
    btn.addEventListener("click", animateModalIn);
  });
});


/*ACCOUNT GSAP*/

document.addEventListener("DOMContentLoaded", () => {

  // =============================
  // PROFILE SECTION ANIMATION
  // =============================
  gsap.from(".profileContent", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".profileImg", {
    scale: 0,
    duration: 1,
    delay: 0.5,
    ease: "elastic.out(1, 0.5)"
  });

  gsap.from(".profileContent p", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.2,
    delay: 1
  });

  // =============================
  // TRANSACTION TABLE ANIMATION
  // =============================
  gsap.from(".transaction table tbody tr", {
    opacity: 0,
    x: -50,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.5,
    ease: "power1.out"
  });

  // =============================
  // SETTINGS SECTION ANIMATION
  // =============================
  gsap.from(".settings p", {
    opacity: 0,
    x: 30,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.5,
    ease: "power2.out"
  });

  /*gsap.from(".settings h2", {
    opacity: 0,
    y: -20,
    duration: 1,
    ease: "power2.out"
  });*/

  // =============================
  // OPTIONAL TIMELINE FOR SEQUENTIAL ENTRANCE
  // =============================
  const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" } });
  tl.from(".profile h2", { opacity: 0, y: -30 })
    .from(".transaction h2", { opacity: 0, y: -30 }, "-=0.5")
    .from(".settings h2", { opacity: 0, y: -30 }, "-=0.5");

});






