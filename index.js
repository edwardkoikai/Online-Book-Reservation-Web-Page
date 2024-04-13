const scroll = new SmoothScroll('.navBar a[href*="#"]', {
    speed: 800
});
//function to retrieve book details from the json server
function getAllBooks() {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((bookData) => bookData.forEach((book) => displayBooks(book)))
      .catch((error) => console.log(error));
  }
function displayBooks(book) {
  let card = document.createElement("li");
  card.className = "card";
  let remainingBooks = book.inventory - book.books_sold;
  card.innerHTML = `
    <img src = "${book.cover}">
    <div class= "content">
    <h4>Title:${book.title}</h4>
    <p>Author: ${book.author}</p>
    <p>Year of Pub: ${book.yearOfPub}</p>
    <p>Price : Ksh.${book.price}</p>
    <p class="copies-left">Copies Left: ${remainingBooks}</p>
    <div class="bookButtons">
  <div class="reserveBtn">
    <button class="rsvBtn">Reserve</button>
  </div>
  <div class="wishlistBtn">
    <button id="wishlistBtn">Wishlist <img src="https://icons.veryicon.com/png/o/commerce-shopping/fine-edition-mall-icon/wishlist-1.png"></button>
  </div>
  </div>
    `;
  document.querySelector("#book-list").appendChild(card);

  // Attach event listener to the reserve button
  card.querySelector(".rsvBtn").addEventListener("click", () => {
    let copiesLeftParagraph = card.querySelector(".copies-left");
    reserveBook(card, copiesLeftParagraph);
  });
  //Attach event listener to the wishlist button
  card.querySelector(".wishlistBtn").addEventListener("click", () => {
    addToWishlist(book);
  });
}
//Function to handle the reserve book button
function reserveBook(card, copiesLeftParagraph) {
  let remainingBooks = parseInt(copiesLeftParagraph.textContent.split(": ")[1]);

  if (remainingBooks > 0) {
    remainingBooks -= 1;
    copiesLeftParagraph.textContent = `Copies Left: ${remainingBooks}`;
    // console.log('Book reserved!');
    if (remainingBooks === 0) {
      card.querySelector(".rsvBtn").textContent = "Not Available";
    }
  } else {
    alert("Book not in stock");
  }
}


//attaching event listener to the search button
let searchTitle = document.getElementById("search");
let searchButton = document.getElementById("searchBtn");
document.querySelector("#searchBtn").addEventListener("click", () => {
  // e.preventDefault()
  const searchResult = searchTitle.value;
  findBookTitle(searchResult);
  searchTitle.value = "";
});
//Function for handling search button
function findBookTitle(searchResult) {
  const allBooks = document.querySelectorAll(".card");
  for (const item of allBooks) {
    const bookTitle = item.querySelector("h4").innerText.toLowerCase();
    if (bookTitle.includes(searchResult.toLowerCase())) {
      item.style.display = "inline-block";
    } else {
      item.style.display = "none";
    }
  }
}

//Function for handling the wishlist button
function addToWishlist(book) {
  let basketList = document.querySelector("#basket-list");
  let basketItem = document.createElement("li");
  basketItem.className = "card";
  basketItem.innerHTML = `
        <img src="${book.cover}">
        <div class="content">
            <h4>Title: ${book.title}</h4>
            <p>Author: ${book.author}</p>
            <p>Year of Pub: ${book.yearOfPub}</p>
            <p>Price : Ksh.${book.price}</p>
            <div class="rmvbtn">
                <button class="remove-button">Remove</button>
            </div>
        </div>
    `;
    
  basketList.appendChild(basketItem);
  // attach event listener to the remove button
  basketItem
    .querySelector(".remove-button")
    .addEventListener("click", deleteWishListItem);
}

function deleteWishListItem(e) {
  e.target.closest(".card").remove(); // Remove the whole basket item
}
// Function for handling the feedback form submit event
function handleFeedBackForm(event) {
  event.preventDefault();
  const feedbackForm = document.getElementById("feedbackForm");
  const feedbackTextarea = document.getElementById("feedback");
  const feedbackValue = feedbackTextarea.value;
  if (feedbackValue.trim() === "") {
    alert("Please enter your feedback");
  } else {
    alert("Feedback Submited");
    console.log("Feedback submitted:", feedbackValue);
    feedbackForm.reset();
  }
}
// attach an event listener to the submit form button
document.querySelector("form").addEventListener("submit", handleFeedBackForm);
// function for initializing
function initialize() {
  getAllBooks();
}

initialize();
