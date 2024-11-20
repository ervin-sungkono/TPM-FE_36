const exampleForm = document.getElementById('form-example')

function onSubmitForm(e){
    e.preventDefault()

    const formData = new FormData(exampleForm)

    console.log(formData)
}