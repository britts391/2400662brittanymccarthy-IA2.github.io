/* 
Name:  T'shara Shaw
Class: Friday UE2 7-9pm

Product Catalogue:
Product List (Using Arrays & Objects)
Create an array of product objects in JavaScript. Each product should have:
`name`
`price`
`description`
`image`
An updated product list must be kept on localStorage, as AllProducts. 
Display the product list dynamically on the website. 
Each product should have an “Add to Cart” button.

*/

const allProducts = 
[
    {
        id: 1,
        name: "Baby Shower Packages",
        price: 170000, 
        description: "Beautiful baby shower themes including Baby Bear and Winnie the Pooh.",
        image:"Assets/babyshowerpackagecover.jpg",
        category: "Baby Shower"
    },
    {
        id: 2,
        name:"Birthday Packages",
        price: 65000, 
        description: "Simple and extravagant birthday packages.",
        image:"Assets/birthdaypackagecover.jpg",
        category:"Birthday"
    },
    {
        id: 3,
        name:"Wedding Packages",
        price:250000,
        description: "Elegant wedding packages including Pink Blossom, Classic, and Blinding Lights.",
        image:"Assets/weddingpackagecover.jpg",
        category: "Wedding"
    }
];

// Initialize AllProducts in localStorage if not exists
function initializeProducts() 
{
    if (!localStorage.getItem("AllProducts")) 
        {
        localStorage.setItem("AllProducts", JSON.stringify(allProducts));
        console.log("AllProducts initialized with", allProducts.length, "products");
    }
}

// Get all products
function getAllProducts() 
{
    return JSON.parse(localStorage.getItem("AllProducts")) || [];
}

// Initialize on page load

initializeProducts();

