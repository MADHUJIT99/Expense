// DOM elements
const addEntry = document.getElementById('add-entry');
const getentry = document.getElementById('get-entry');
const category = document.getElementById('category');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const show = document.getElementById('show');

addEntry.addEventListener('click', async function() {
    if(category.value && amount.value && date.value){
    const respObj = await fetch('/add-entry', {
        method: 'POST',
        body: JSON.stringify({
            "category": category.value,
            "amount": amount.value,
            "date": date.value
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    category.value=''
    amount.value=''
    date.value=''
    alert("your entries are added successfully")
}else{
    alert("Type the entries first")
}
    
    
});

getentry.addEventListener('click', async function() {
    try {
        const getObj = await fetch('/get-data', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!getObj.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await getObj.json();

        // Check if the data is an array
        if (Array.isArray(data)) {
            // Iterate over the array and display each entry
            show.innerHTML = '';
            data.forEach(entry => {
                show.innerHTML += `<p>Category: ${entry.category}, Amount: ${entry.amount}</p> Date: ${entry.date}</p>`;
            });

            // Show the #show element after getting entries
            show.style.display = 'block';
        } else {
            console.error('Unexpected data format:', data);
        }
    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
});
