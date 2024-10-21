  // Get the current page URL
  const currentPage = window.location.pathname;
        
  // Select all list items
  const menuItems = document.querySelectorAll('aside a');

  // Loop through each item
  menuItems.forEach(item => {
      // Check if the href of the item matches the current page
      if(item.getAttribute('href') === currentPage) {
          // Add the active class to the parent li element
          item.parentElement.classList.add('active');
      }
  });
  // Toggle the sidebar
  $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });