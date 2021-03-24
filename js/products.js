function renderProducts(products, sortOrder = 'ascending') {
    const productsContainer = document.querySelector('.product-list');
    const sortedProducts = products.slice()
                            .sort( (a, b) => sortOrder === 'ascending' ? a.price - b.price
                                                                           : b.price - a.price );
    productsContainer.innerHTML = '';
    for (const product of sortedProducts) {
        productsContainer.innerHTML += `
            <article>
                <h3>${product.title}</h3>
                <img src="img/${product.image}" alt="${product.title}">
                <p>${product.description}</p>
                <div class="button-container">
                    <button class="button card-button">Info</button>
                    <button class="button card-button">${product.price} - Buy</button>
                </div>
            </article>`
    }
}

// function getByAjaxAndRenderProducts(order){
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState === 4 && xhr.status === 200){
//             const products = JSON.parse(xhr.responseText);
//             renderProducts(products, order);
//         }
//     }
//     xhr.open('GET', 'products.json', true);
//     xhr.send();
// }

// getByAjaxAndRenderProducts('ascending');

async function fetchProducts(order){
    const response = await fetch('products.json');
    const products = await response.json();
    renderProducts(products, order);
}

// function fetchProducts(order){
//     fetch('products.json')
//         .then(response => response.json())
//         .then(products => renderProducts(products, order));
// }

fetchProducts('ascending');

// renderProducts(JSON.parse(productsJSON));

const sortAscendingButton = document.querySelector('.sort-asc');
const sortDescendingButton = document.querySelector('.sort-desc');

sortAscendingButton.addEventListener('click', sortProductAscending);
sortDescendingButton.addEventListener('click', sortProductDescending);

function sortProductAscending() {
    sortDescendingButton.classList.remove('active');
    sortAscendingButton.classList.add('active');
    fetchProducts('ascending');
}

function sortProductDescending() {
    sortDescendingButton.classList.add('active');
    sortAscendingButton.classList.remove('active');
    fetchProducts('descending');
}