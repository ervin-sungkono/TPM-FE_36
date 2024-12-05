const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', login)

async function login(e){
    e.preventDefault()

    const formData = new FormData(e.target)

    const payload = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const user = await fetch("https://api-tpm.bncc.net/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    // Error handling
    if(user.status === 200){
        // berhasil
        alert(user.data.message)
        sessionStorage.setItem('token', user.data.token)
        window.location.replace('/index.html')
    }else{
        const message = Array.isArray(user.data.message) ? user.data.message.join('\n') : user.data.message
        alert(message)
    }
}