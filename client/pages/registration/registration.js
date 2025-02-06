document.addEventListener('DOMContentLoaded', function () {

  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault();

    // Get form data
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      mobile: document.getElementById('mobile').value,
      branch: document.getElementById('branch').value,
      gender: document.getElementById('gender').value,
      rollNumber: document.getElementById('rollNumber').value
    };

    // Send POST request
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful response
        console.log('Success:', data);
        if (data.acknowledged) {
          alert(`User detail of ${formData.firstName} saved successfully!`)
        }
        // window.location.href = 'http://127.0.0.1:3001/client/index.html';
        window.location.href = 'http://localhost:5173/#';
        // You can redirect or show a success message here
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        // You can show an error message to the user here
      });
  }

  // Function to fetch users list
  function getUsersList() {
    fetch('http://localhost:3000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle successful response
        console.log('Users List:', data);
        // Process the list of users data as needed
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
        // You can show an error message to the user here
      });
  }

  // Add event listener to form submission
  document.querySelector('form').addEventListener('submit', handleFormSubmission);

});
