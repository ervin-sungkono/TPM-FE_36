const productForm = document.getElementById('product-form')
const productImageInput = document.getElementById('product_image')
const previewImage = document.getElementById('product-img-preview')

productForm.addEventListener('submit', submitProduct)
productImageInput.addEventListener('change', showPreviewImage)

const queryParams = new URLSearchParams(window.location.search)
const id = queryParams.get('id')

async function setProductForm(){
    const productContent = await fetch("https://api-tpm.bncc.net/api/product", {
        headers: {
            "content-type": "application/json"
        }
    })
    .then(res => res.json())
    .catch(e => console.log(e))

    const product = productContent.data.find(product => product.id == id)

    Object.entries(product).forEach(([key, value]) => {
        if(key !== 'image') document.forms['product-form'][key].value = value
        else{
            previewImage.src = `https://api-tpm.bncc.net${value}`
        }
    })
}

if(id) setProductForm()

async function showPreviewImage(e){
    const file = e.target.files[0]
    if(file.size > 2048000){
        e.target.value = null
        return alert('File size too large, max 2048 Kb')
    }else{
        const base64 = await getBase64(file)
        previewImage.src = base64
    }
}

async function submitProduct(e){
    e.preventDefault()

    const formData = new FormData(e.target)

    const file = formData.get('product_image')
    if(file.size > 2048000){
        return alert('File size too large, max 2048 Kb')
    }
    formData.append('image', await getBase64(file))

    if(id){
        updateProduct(formData, id)
    }else{
        createProduct(formData)
    }
}

async function updateProduct(formData, id){
    try{
        const result = await fetch("https://api-tpm.bncc.net/api/product/" + id, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: formData
        })
        .then(res => res.json())
        .catch(e => console.log(e))

        if(result.status === 200){
            alert('Product update success')
        }else{
            const message = Array.isArray(result.data.message) ? result.data.message.join('\n') : result.data.message
            alert(message)
        }
    }catch(e){
        console.log(e)
    } 
}

async function createProduct(formData){
    try{
        const result = await fetch("https://api-tpm.bncc.net/api/product", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: formData
        })
        .then(res => res.json())
        .catch(e => console.log(e))

        if(result.status === 200){
            alert('Product create success')
        }else{
            const message = Array.isArray(result.data.message) ? result.data.message.join('\n') : result.data.message
            alert(message)
        }
    }catch(e){
        console.log(e)
    } 
}

function getBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
    })
}