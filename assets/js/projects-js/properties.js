document.addEventListener('DOMContentLoaded', function() {
  fetch("../json/properties.json")
    .then(response => response.json())
    .then(data => {
      displayProperties(data.properties_for_sale);
      
      const propertyForm = document.getElementById('propertyForm');
      propertyForm.addEventListener('submit', function(event) {
        event.preventDefault();
      
        const formData = new FormData(propertyForm);
        const newProperty = {
          property_id: Date.now(), // Using timestamp as a unique ID (can be improved)
          property_type: formData.get('propertyType'),
          address: {
            street: formData.get('street'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip_code: formData.get('zipCode')
          },
          price: parseInt(formData.get('price')),
          bedrooms: parseInt(formData.get('bedrooms')),
          bathrooms: parseInt(formData.get('bathrooms')),
          description: formData.get('description'),
          image_url: "../assets/images/property-images/1 (9).png" // Replace with your image URL
        };
      
        addProperty(newProperty);
        propertyForm.reset();
      });
    })
    .catch(error => console.log(error));

  function displayProperties(properties) {
    const propertiesList = document.getElementById('propertiesList');

    properties.forEach(property => {
      const propertyDiv = document.createElement('div');
      propertyDiv.classList.add('property');

      const title = document.createElement('h2');
      title.textContent = property.property_type;
      propertyDiv.appendChild(title);

      const image = document.createElement('img');
      image.src = property.image_url;
      image.alt = `${property.property_type} Image`;
      image.classList.add('property-image');
      propertyDiv.appendChild(image);

      const address = document.createElement('p');
      address.classList.add('property-address');
      address.textContent = `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zip_code}`;
      propertyDiv.appendChild(address);

      const description = document.createElement('p');
      description.classList.add('property-description');
      description.textContent = `Description: ${property.description}`;
      propertyDiv.appendChild(description);

      const bedrooms = document.createElement('p');
      bedrooms.classList.add('property-bedrooms');
      bedrooms.textContent = `Bedrooms: ${property.bedrooms}`;
      propertyDiv.appendChild(bedrooms);

      const bathrooms = document.createElement('p');
      bathrooms.classList.add('property-bathrooms');
      bathrooms.textContent = `Bathrooms: ${property.bathrooms}`;
      propertyDiv.appendChild(bathrooms);

      const price = document.createElement('p');
      price.classList.add('property-price');
      price.textContent = `Price: $${property.price}`;
      propertyDiv.appendChild(price);

      propertiesList.appendChild(propertyDiv);
    });
  }

  function addProperty(newProperty) {
    fetch('../json/properties.json')
      .then(response => response.json())
      .then(data => {
        data.properties_for_sale.push(newProperty);
        
        return fetch('../json/properties.json', {
          method: 'PUT', // Assuming properties.json is writable
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      })
      .then(() => {
        // Refresh the page to display updated properties
        location.reload();
      })
      .catch(error => console.log(error));
  }
});
