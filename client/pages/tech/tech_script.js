let slideIndex = 0;

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (n) {
    slideIndex = n;
  } else {
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

function currentSlide(n) {
  showSlides(n);
}

function startSlideShow() {
  setInterval(showSlides, 2000); // Change image every 2 seconds
}

startSlideShow();
document.addEventListener('DOMContentLoaded', function () {
  function displayUsersList() {
    fetch('http://localhost:3000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const totalCount = document.getElementById('totalCount');
        const userCards = document.getElementById('userCards');

        // Display total count at the top of the list
        totalCount.textContent = `Total Users: ${data.length}`;

        // Clear user cards
        userCards.innerHTML = '';

        // Iterate over each user and create a card for them
        data.reverse().forEach(user => {
          // Create card element
          const card = document.createElement('div');
          card.classList.add('user-card');

          // Populate card with user information
          card.innerHTML = `
                      <p class="color-white"><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
                      <p class="color-white"><strong>Email:</strong> ${user.email}</p>
                      <p class="color-white"><strong>Branch:</strong> ${user.branch}</p>
                      <p class="color-white"><strong>Roll Number:</strong> ${user.rollNumber}</p>
                  `;

          // Append card to user list
          userCards.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  displayUsersList();
});
