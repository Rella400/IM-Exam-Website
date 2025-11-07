/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                    /* UNIVERSAL*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

const thisPage = window.location.pathname.split("/").pop();

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {

  if (link.getAttribute("href") === thisPage) {
    link.classList.add("active");
  }
});

/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                        /*INDEX PAGE*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

const borrowButton = document.querySelector(".borrowButton");

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

const categoryItems = document.querySelectorAll("#categoryList li");

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
      h2.textContent = /*book.title ||*/ category;
    }
  } catch (error) {
    console.error(`Error fetching books for category "${category}":`, error);
  }
});


/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
                                                            /*BORROW*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/

const form = document.getElementById("searchForm");
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

const openFormBtn = document.getElementById('openFormBtn');
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

