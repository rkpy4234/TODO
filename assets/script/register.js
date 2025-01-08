document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);
    const registerButton = document.getElementById('registerButton');
    registerButton.disabled = true;
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxgQ6IAY2cGHDl6dpdrk_6TDcpKrkXZthz4l03E-BfVnC9l4KpjL1DQVCnr7K_21Xkz/exec", {
            method: "POST",
            body: formData
        });
        const result = await response.text();
        alert(result);
        form.reset();
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering.");
    } finally {
        registerButton.disabled = false;
    }
});