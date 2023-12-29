const legends = document.querySelectorAll('fieldset legend');

    legends.forEach(function(legend) {
        legend.addEventListener('click', function() {
            const contentToToggle = this.nextElementSibling;
            const arrowIcon = this.querySelector('#arrowIcon');

            if (contentToToggle.style.display === 'none') {
                contentToToggle.style.display = 'block'; // Show the content
                arrowIcon.src = '../assets/images/arrowup.png'; // Change arrow icon to up
            } else {
                contentToToggle.style.display = 'none'; // Hide the content
                arrowIcon.src = '../assets/images/arrowdown.png'; // Change arrow icon to down
            }
        });
    });