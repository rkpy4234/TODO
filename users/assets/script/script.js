const params = new URLSearchParams(window.location.search);
const fullname = params.get('fullname');
document.getElementById('sheetName').textContent = fullname;
function fetchUserData(sheetName) {
    const url = `https://script.google.com/macros/s/AKfycbyp6Zn1nTN794Gi4msy_ZjOuBPEBCGetUR-3GXi5Tq_HtKwotvvv2lLW6EXz72N7Kjs/exec?sheet=${sheetName}`;
    console.log(`Fetching data from: ${url}`);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
            } else {
                renderTable(data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No data found for the specified sheet.</td></tr>';
        return;
    }
    data.forEach((row, index) => {
        if (index === 0) return; 
        const tr = document.createElement('tr');
        tr.innerHTML = `

            <td>${row['Column A'] || ''}</td>
            <td>${row['Column B'] || ''}</td>
            <td>${row['Column C'] || ''}</td>
            <td>
                <span id="status-${index}">${row['Column D'] || 'No status'}</span>
                <button onclick="editStatus(${index}, '${row['Column D']}')" class="btn btn-primary btn-sm">Edit</button>
                <button onclick="updateStatus(${index})" style="display: none;" id="updateBtn-${index}" class="btn btn-success btn-sm">Update</button>
                <select style="display: none;" id="statusDropdown-${index}">
                    <option value="Pending">Pending</option>
                    <option value="Started">Started</option>
                    <option value="Completed">Completed</option>
                    <option value="Problems">Problems</option>
                    <option value="dont know">Problems</option>
                </select>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}
function editStatus(index, currentStatus) {
    document.getElementById(`status-${index}`).style.display = 'none';
    document.getElementById(`statusDropdown-${index}`).style.display = 'inline';
    document.getElementById(`updateBtn-${index}`).style.display = 'inline';
    document.getElementById(`statusDropdown-${index}`).value = currentStatus;
}
function updateStatus(index) {
    const newStatus = document.getElementById(`statusDropdown-${index}`).value;
    document.getElementById(`status-${index}`).textContent = newStatus;
    document.getElementById(`statusDropdown-${index}`).style.display = 'none';
    document.getElementById(`updateBtn-${index}`).style.display = 'none';
    document.getElementById(`status-${index}`).style.display = 'inline';
    const row = index + 1;  
    const url = `https://script.google.com/macros/s/AKfycbyp6Zn1nTN794Gi4msy_ZjOuBPEBCGetUR-3GXi5Tq_HtKwotvvv2lLW6EXz72N7Kjs/exec?sheet=${fullname}&row=${row}&status=${newStatus}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error updating data:', data.error);
            } else {
                console.log('Data updated successfully');
            }
        })
        .catch(error => console.error('Error updating data:', error));
}
if (fullname) {
    fetchUserData(fullname);
} else {
    console.error('Fullname not found in URL parameters');
}