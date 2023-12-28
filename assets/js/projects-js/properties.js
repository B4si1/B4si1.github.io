document.addEventListener('DOMContentLoaded', function() {
  fetch("../json/properties.json")
    .then(response => response.json())
    .then(data => displayProperties(data.properties_for_sale))
    .catch(error => console.log(error));
});

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
