function displayBooks(book){
    let card = document.createElement("li")
    card.className = "card"
    card.innerHTML = `
    <img src = "${book.cover}">
    <div class= "content">
    <h4>Title:${book.title}</h4>
    <p>Author: ${book.author}</p>
    <p>Year of Pub: ${book.yearOfPub}</p>
    <p>Price : Ksh.${book.price}</p>
    <p>Copies Left: ${book.copiesleft}</p>
    </div>
    <div class="reserveBtn">
    <button>Reserve</button>
    </div>
    `
    document.querySelector("#book-list").appendChild(card)
}
function getAllBooks(){
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(bookData => bookData.forEach(book => displayBooks(book)))
    .catch(error => console.log(error))
}

function initialize(){
    getAllBooks();
}
initialize()