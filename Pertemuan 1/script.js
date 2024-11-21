const exampleForm = document.getElementById('form-example')

function onSubmitForm(e){
    e.preventDefault()

    const data = new FormData(e.target)

    const text = data.get('text')
    const password = data.get('password')
    const email = data.get('email')

    let errorMessage = []
    if(!text){
        errorMessage.push("Text is required")
    }
    if(!password){
        errorMessage.push("Password is required")
    }
    else if(password.length < 8){
        errorMessage.push("Password length must be at least 8")
    }
    if(!email){
        errorMessage.push("Email is required")
    }
    if(errorMessage.length > 0){
        alert(errorMessage.join('\n'))
    }else{
        // No error, send the form data
        e.target.submit()
    }
}

exampleForm.addEventListener("submit", onSubmitForm)