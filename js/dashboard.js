document.addEventListener('DOMContentLoaded', function () {
    // Show section function
    window.showSection = function (sectionId) {
        const sections = document.querySelectorAll('.dashboard-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    };

    // Set username
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('user-name').textContent = username;
    } else {
        window.location.href = 'index.html';
    }

    // Logout function
    window.logout = function () {
        sessionStorage.removeItem('username');
        window.location.href = 'index.html';
    };

    // Cancel form function
    window.cancelForm = function () {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => form.reset());
    };

    // Donation form submission
    document.getElementById('donation-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const donation = {};
        formData.forEach((value, key) => {
            donation[key] = value;
        });

        // Add donation to the list (this should be replaced with actual API call)
        const donationsList = document.getElementById('donations-list');
        const donationElement = document.createElement('div');
        donationElement.textContent = JSON.stringify(donation);
        donationsList.appendChild(donationElement);

        alert('Donation created successfully.');
        cancelForm();
    });

    // Fetch pending requests and donations
    fetch('requests.json')
        .then(response => response.json())
        .then(data => {
            const pendingRequestsElement = document.getElementById('pending-requests');
            data.requests.forEach(request => {
                const requestElement = document.createElement('div');
                requestElement.textContent = `Location: ${request.location}`;
                pendingRequestsElement.appendChild(requestElement);
            });
        });
});
