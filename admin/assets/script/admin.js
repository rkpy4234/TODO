const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
if (!username) {
    window.location.href = '../index.html';  
}
document.getElementById('redirectToViewWork').addEventListener('click', () => {
    if (username) {
        window.location.href = `viewwork.html?username=${encodeURIComponent(username)}`;
    } else {
        alert('Username is not defined!');
    }
});
const fetchSheetNames = async () => {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzchFoFJT1k6slmzTy0f9cdoIafg9CoJ5-Jz4FVbI5M3IIrkaAef82-CBEpYOFRQ0uu/exec?action=getSheetNames'); // Replace with your deployment URL
        const data = await response.json();
        const select = document.getElementById('sheetName');
        data.sheetNames.forEach(sheet => {
            const option = document.createElement('option');
            option.value = sheet.name;
            option.textContent = sheet.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching sheet names:', error);
    }
};
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = true; 
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const sheetName = document.getElementById('sheetName').value;
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzchFoFJT1k6slmzTy0f9cdoIafg9CoJ5-Jz4FVbI5M3IIrkaAef82-CBEpYOFRQ0uu/exec?action=submitData', { // Replace with your deployment URL
            method: 'POST',
            body: JSON.stringify({ title, description, sheetName })
        });
        const result = await response.json();
        alert(result.message);
        document.getElementById('registerForm').reset();

    } catch (error) {
        console.error('Error submitting data:', error);
        alert('Failed to submit data');
    } finally {
        submitButton.disabled = false; 
    }
});
fetchSheetNames();