js/community-connector.js

// Alert-yaar24 Community Connector
// Connects students with campus groups (NCC, Dance, Music, etc.)

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/25167734/uist0ix/'; // Copy from webhook test

// Campus groups available for matching
const CAMPUS_GROUPS = {
    'NCC': 'National Cadet Corps',
    'Dance': 'Dance Club', 
    'Music': 'Music Society',
    'Sports': 'Sports Club',
    'Tech': 'Technical Society',
    'Drama': 'Drama Club'
};

// Student interest registration function
function registerStudentInterests() {
    const formData = {
        student: {
            name: document.getElementById('studentName').value,
            email: document.getElementById('studentEmail').value, 
            phone: document.getElementById('studentPhone').value,
            hostel: document.getElementById('hostelBlock').value,
            branch: document.getElementById('academicBranch').value,
            year: document.getElementById('academicYear').value || 'First Year',
            interests: getSelectedInterests(),
            registeredAt: new Date().toISOString(),
            source: 'Alert-yaar24'
        }
    };

    // Send to Zapier automation
    fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage('Registration successful! Group coordinators will contact you soon.');
            clearForm();
        } else {
            throw new Error('Registration failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage('Registration failed. Please try again.');
    });
}

// Get selected interests from checkboxes
function getSelectedInterests() {
    const checkboxes = document.querySelectorAll('input[name="interests"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// Show success message
function showSuccessMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = `✅ ${message}`;
    document.getElementById('alertContainer').appendChild(alert);
    setTimeout(() => alert.remove(), 5000);
}