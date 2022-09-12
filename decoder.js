const decoderForm = document.getElementById('decoder')
decoderForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formValues = new FormData(decoderForm)
    console.log(formValues.get('code'))
})
