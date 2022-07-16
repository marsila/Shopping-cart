let shop = document.getElementById('shop');


 // myCart.onclick= localStorage.clear();
//let basket = [];
// * we change this in order to store the basket info and reget it later after refresh ... *
let basket = JSON.parse(localStorage.getItem("basketData")) || [];

let generateCards = () => {
  return (shop.innerHTML = itemsDetails.map((x) => {
    let {id, name,price,details,img} = x;
    let search = basket.find((x) => x.id == id) || [];
    //console.log(id);
    
    return `
      <div id =item-${id} class="item">
        <img src=${img} alt="dress image" width="200" height="300"> 
        <div class="details">
          <h3>${name}</h3>
          <p>${details}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash"></i>
              <div id= ${id} class="quantity">
                ${search.quantity === undefined ? 0 : search.quantity}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus"></i>
            </div>          
          </div>
        </div>   
      </div>`;
  }).join(""));

}
 
generateCards();



let increment = (id) => {
  //let selectedItem = id;
  //console.log(selectedItem);
  let search= basket.find((x) => x.id === id );
  if (search === undefined)  {
    basket.push({
      id: id,
      quantity:1,
    });
  } else {
    search.quantity += 1;
  }
  
  
  //console.log(basket);
  updateQuantity(id);
  localStorage.setItem("basketData",JSON.stringify(basket));
    //updateQuantity(id);
}
let decrement = (id) => {
  //let selectedItem = id;
  let search= basket.find((x) => x.id === id );
  if (search === undefined ) return;
  else if(search.quantity === 0)  return;
  else {
    search.quantity -= 1;
  }
  updateQuantity(id);  
  
  basket = basket.filter((x) => x.quantity !== 0);
 
  //console.log(basket);
  //updateQuantity(id);
  localStorage.setItem("basketData",JSON.stringify(basket));
  
}

let updateQuantity = (id) => {
  let itemQuantity = document.getElementById(id);
  let search = basket.find((x) => x.id === id);
//console.log(search.quantity);
 itemQuantity.innerHTML = search.quantity;
  //console.log(search.quantity);
  /*
  if (search.quantity === undefined ){
    console.log("it's undefined!");
    //itemQuantity.innerHTML = "0 " 
  }
  else {
    //itemQuantity.innerHTML = search.quantity;
    console.log(search.quantity);
  }*/
    
  cartItems();
}

let cartItems = () => {
  let cartIcon = document.getElementById("cartAmount");
  /* 
   * ! my way of calculating the  cart iytems number
  */
 /*
  *    let cartAmount = 0;
  *    for (let index = 0; index < basket.length; index++) {
  *      const element = basket[index].quantity;
  *      cartAmount += element;
          
  *    }
 */
  
  //console.log(basket);
  cartIcon.innerHTML = basket.map((x) => x.quantity).reduce((x,y) => x+y, 0);
}

cartItems();