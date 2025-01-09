   const urlParams = new URLSearchParams(window.location.search);
   const username = urlParams.get('username');
   if (!username) {
       window.location.href = '../index.html'; 
   }
   console.log(`Username: ${username}`); 
   const fetchSheetNames = async () => {
       try {
           const response = await fetch('https://script.google.com/macros/s/AKfycbwDWAfAuWWhxZlXyKWAgfP6DZvljYFXcrhTiacvNBRUrKJuJ9_a2U1ei4zjBTsoki8E/exec?action=getSheetNames'); // Replace with your deployment URL
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
   const fetchSheetData = async (sheetName) => {
       try {
           const response = await fetch(`https://script.google.com/macros/s/AKfycbwDWAfAuWWhxZlXyKWAgfP6DZvljYFXcrhTiacvNBRUrKJuJ9_a2U1ei4zjBTsoki8E/exec?action=getSheetData&sheetName=${sheetName}`); // Replace with your deployment URL
           const data = await response.json();
           const tableBody = document.querySelector('#dataTable tbody');
           tableBody.innerHTML = '';

           data.rows.forEach(row => {
               const tr = document.createElement('tr');
               for (let i = 0; i < 4; i++) { 
                   const td = document.createElement('td');
                   td.textContent = row[i] || ''; 
                   tr.appendChild(td);
               }
               tableBody.appendChild(tr);
           });
       } catch (error) {
           console.error('Error fetching sheet data:', error);
           alert('Failed to fetch sheet data');
       }
   };
   document.getElementById('viewButton').addEventListener('click', () => {
       const sheetName = document.getElementById('sheetName').value;
       if (sheetName) {
           fetchSheetData(sheetName);
       } else {
           alert('Please select a sheet');
       }
   });
      document.getElementById('backtohome').addEventListener('click', () => {
        if (username) {
            window.location.href = `admin.html?username=${encodeURIComponent(username)}`;
        } else {
            alert('Username is not defined!');
        }
    });
   fetchSheetNames();