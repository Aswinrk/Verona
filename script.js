document.getElementById("payment-form").addEventListener("submit", function(event) {
  console.info('Hit payment form');
  event.preventDefault();
  
  // Prepare data to send in the POST request
  var email = document.getElementById('email').value;
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;

  function submitForm() {
    var form = document.getElementById('payment-form');
    var formData = new FormData(form);
  
    fetch('http://localhost:3000/submit-payment', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle plain text response
      return response.text();
    })
    .then(data => {
      console.log('Form submitted successfully:', data);
      // Show alert with the response message
      alert(data);
    })
    .catch(error => {
      console.error('There was a problem with the form submission:', error);
    });
    
  }

  submitForm(); // Call the submitForm function
});
