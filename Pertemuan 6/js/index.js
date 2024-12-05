const productView = document.getElementById('product-view')
const loginBtn = document.getElementById('login-btn')
const profileBtn = document.getElementById('profile-btn')

function generateProductCard(product){
    const productCard = document.createElement('div')
    productCard.className = 'product-card'
    productCard.id = `product-${product.id}`
    productCard.innerHTML = `
        <div class="product-image">
            <img src="https://api-tpm.bncc.net${product.image}"/>
        </div>
        <div class="product-content">
            <div class="product-header">
                <div class="product-name">${product.name}</div>
                <p class="product-description">${product.description}</p>
            </div>
            <div class="product-detail">
                <p class="product-stock">Stock: ${product.stock}</p>
                <p class="product-price">Price: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR'}).format(product.price)}</p>
                <p class="production-date">Production Date: ${new Date(product.production_date).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
        </div>
    `

    let buttonWrapper = document.createElement('div')
    buttonWrapper.className = 'product-button-wrapper'
    if(sessionStorage.getItem('token')){
        const deleteBtn = document.createElement('button')
        deleteBtn.id = `delete-btn-${product.id}`
        deleteBtn.className = 'button danger-button'
        deleteBtn.innerText = 'Delete'

        const updateBtn = document.createElement('a')
        updateBtn.className = 'button primary-button'
        updateBtn.href = `/product.html?id=${product.id}`
        updateBtn.innerText = 'Update'

        buttonWrapper.append(updateBtn, deleteBtn)
    }

    if(buttonWrapper.hasChildNodes()) productCard.append(buttonWrapper)

    return productCard.outerHTML
}

async function deleteProduct(id){
    const result = await fetch("https://api-tpm.bncc.net/api/product/" + id, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem('token')
        }
    })
    .then(res => res.json())
    .catch(e => console.log(e))

    if(result.status === 200){
        const productToRemove = document.getElementById(`product-${id}`)
        productToRemove.remove()
        alert('Product delete success')
    }else{
        alert('Fail to remove product')
    }  
}

async function setProductView(){
    const productContent = await fetch("https://api-tpm.bncc.net/api/product", {
        headers: {
            "content-type": "application/json"
        }
    })
    .then(res => res.json())
    .catch(e => console.log(e))

    productView.innerHTML = productContent.data.reduce((html, product) => {
        return html += generateProductCard(product)
    }, "")

    productContent.data.forEach(product => {
        const deleteBtn = document.getElementById(`delete-btn-${product.id}`)
        deleteBtn.addEventListener('click', () => deleteProduct(product.id))
    });
}

if(sessionStorage.getItem('token')){
    loginBtn.style.display = 'none'
    profileBtn.style.display = 'flex'
}else{
    loginBtn.style.display = 'flex'
    profileBtn.style.display = 'none'
}

setProductView()