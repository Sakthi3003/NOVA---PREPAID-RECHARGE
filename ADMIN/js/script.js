// side bar control
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.menu li').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
}


// filter

function filterByDays(days) {
    // Example function to filter subscribers by days
    console.log(`Filtering by ${days} days`);
    // Add your filtering logic here
}

// logout 
function logout() {
    document.getElementById('logoutPopup').style.display = 'block';
    setTimeout(function() {
        window.location.href = 'login.html';
    }, 2000);
}

// customers

const subscribers = [
    { id: 1, name: 'John Doe', planEndDate: '2025-02-20', planname: 'unlimited' },
    { id: 2, name: 'Jane Smith', planEndDate: '2025-02-22', planname: 'popular' },
    { id: 3, name: 'Alex Johnson', planEndDate: '2025-02-19', planname: 'popular' },
    { id: 4, name: 'Emily Davis', planEndDate: '2025-02-25', planname: 'data' },
    { id: 5, name: 'Michael Brown', planEndDate: '2025-02-23', planname: 'popular' },
];

let filteredSubscribers = [...subscribers];

function displaySubscribers(subscribersList) {
    const subscribersListElement = document.getElementById('subscribersList');
    subscribersListElement.innerHTML = '';

    subscribersList.forEach(subscriber => {
        const li = document.createElement('li');
        const endDate = new Date(subscriber.planEndDate);
        const today = new Date();
        const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        li.textContent = `${subscriber.name} (Ends: ${subscriber.planEndDate}, ${daysLeft} days left)`;
        li.style.cursor = 'pointer';
        li.onclick = () => displayTransactionDetails(subscriber.id);
        subscribersListElement.appendChild(li);
    });
}

function validateSubscriberName(name) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
}

function displayTransactionDetails(subscriberId) {
    const transactionTableBody = document.getElementById('transactionTableBody');
    const downloadButton = document.getElementById('downloadTransaction');

    transactionTableBody.innerHTML = '';

    const transactions = [
        { id: 'TX001', date: '2025-02-18', amount: '₹200', status: 'success' },
        { id: 'TX002', date: '2025-02-17', amount: '₹150', status: 'success' },
        { id: 'TX003', date: '2025-02-16', amount: '₹100', status: 'success' }
    ];

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${transaction.id}</td><td>${transaction.date}</td><td>${transaction.amount}</td>`;
        transactionTableBody.appendChild(row);
    });

    downloadButton.disabled = false;
}

document.getElementById('downloadTransaction').addEventListener('click', () => {
    alert('Transaction details downloaded (mocked)');
});

function searchSubscribers() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredList = filteredSubscribers.filter(subscriber => 
        subscriber.name.toLowerCase().includes(searchTerm)
    );
    displaySubscribers(filteredList);
}

function filterByDays(days) {
    const today = new Date();
    filteredSubscribers = (days === 0) ? [...subscribers] :
        subscribers.filter(subscriber => {
            const endDate = new Date(subscriber.planEndDate);
            const daysLeft = (endDate - today) / (1000 * 60 * 60 * 24);
            return daysLeft >= days - 1 && daysLeft <= days;
        });

    document.querySelectorAll('.filter-buttons button').forEach(button => button.classList.remove('active'));
    document.getElementById(days === 0 ? 'filterAll' : `filter${days}`).classList.add('active');

    displaySubscribers(filteredSubscribers);
}

displaySubscribers(subscribers);
