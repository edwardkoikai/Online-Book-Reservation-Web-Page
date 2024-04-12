
function displayBooks(book){
    let card = document.createElement("li")
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

    `
    document.querySelector("#book-list").appendChild(card);

    // Attach event listener to the reserve button
    card.querySelector('.rsvBtn').addEventListener('click', () => {
        let copiesLeftParagraph = card.querySelector('.copies-left');
        reserveBook(card, copiesLeftParagraph);
    }); 
    card.querySelector('.wishlistBtn').addEventListener('click', () => {
        addToWishlist(book);
    });
    
}
function reserveBook(card, copiesLeftParagraph) {
    let remainingBooks = parseInt(copiesLeftParagraph.textContent.split(': ')[1]);
    
    if (remainingBooks > 0) {
        remainingBooks -= 1;
        copiesLeftParagraph.textContent = `Copies Left: ${remainingBooks}`;
        // console.log('Book reserved!');
        if (remainingBooks === 0) {
            card.querySelector('.rsvBtn').textContent = 'Not Available';
        }
    } else {
        alert('Book not in stock');
    }
}
function getAllBooks(){
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(bookData => bookData.forEach(book => displayBooks(book)))
    .catch(error => console.log(error))
}
let searchTitle = document.getElementById("search")
let searchButton = document.getElementById("searchBtn")
document.querySelector("#searchBtn").addEventListener("click", () =>{
    // e.preventDefault()
    const searchResult = searchTitle.value
    findBookTitle(searchResult)
})
function findBookTitle(searchResult){
    const allBooks = document.querySelectorAll(".card");
    for(const item of allBooks){
        const bookTitle = item.querySelector("h4").innerText.toLowerCase();
        if(bookTitle.includes(searchResult.toLowerCase())){
            item.style.display = "inline-block"
        }
        else{
            item.style.display = "none"
        }
    }
}
function addToWishlist(book) {
    let basketList = document.querySelector("#basket-list")
    let basketItem = document.createElement("li")
    basketItem.className ="card"
    basketItem.id = "basketItem"
    
    basketList.appendChild(basketItem)
    basketList.querySelector(".rmvBtn").addEventListener("click", deleteWishListItem)
}

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
    basketItem.querySelector(".remove-button").addEventListener("click", deleteWishListItem);
}

function deleteWishListItem(e){
    e.target.closest('.card').remove(); // Remove the whole basket item
}


function initialize(){
    getAllBooks();
}

initialize();

   

