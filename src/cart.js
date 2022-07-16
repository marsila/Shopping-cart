let basket = JSON.parse(localStorage.getItem("basketData")) || [];

//console.log(basket);
let shoppingCartItems = document.getElementById("cartItems")
//let totalPrice = (x,y) => x * y;


let calculation = () => {
  let shoppingCartAmount = document.getElementById("cartAmount")
  shoppingCartAmount.innerHTML = basket.map((x) => x.quantity).reduce((x,y) => x+y, 0);
}

calculation();

let generateCartItems = () => {
  if(basket.length !== 0){
    return ( shoppingCartItems.innerHTML = basket.map((x) => {
        let {id, quantity} = x;
        let search = itemsDetails.find((y) => y.id == x.id) || [];        
        return `
          <div id =item-${search.id} class="item cart-items">
            <img src=${search.img} alt="dress image" width="150" height="100"> 
            
              <div class="cart-details">
                <div class="name-price">
                  <h3>${search.name}</h3>
                  <p class="cart-price"> $ ${search.price}</p>
                  <i class="bi bi-x close" onclick= "removeItem(${search.id})"></i>
                </div>                
                <div class="buttons">
                  <i onclick="decrement(${search.id})" class="bi bi-dash"></i>
                  <div id= ${search.id} class="quantity">
                    ${quantity}
                  </div>
                  <i onclick="increment(${search.id})" class="bi bi-plus"></i>
                </div>
                <div class="total-price" id="total-price">
                  <h3>$ ${quantity * search.price}</h3>
                </div>
              </div>              
              
          </div>`;
        
      }).join(""));     
    
  } else {
    shoppingCartItems.innerHTML = '';
    lable.innerHTML = `
      <h2>Your Cart is Empty</h2>
      <p>Take a look around, maybe you can find something intersting :)</p>
      <button class="back"><a href="index.html">Back to store</a></button>
    
    `
  }

}
 
generateCartItems();



let increment = (id) => {
  let search= basket.find((x) => x.id === id );  
  search.quantity += 1;  
  generateCartItems();
  updateQuantity(id);
  localStorage.setItem("basketData",JSON.stringify(basket));
}

let decrement = (id) => {
  let search= basket.find((x) => x.id === id );
  //console.log(search);
  if(search === undefined) return;
  else if (search === 0) return;
  else {
    search.quantity -= 1;
  }

  
  updateQuantity(id);  
  
  basket = basket.filter((x) => x.quantity !== 0);
  generateCartItems();
 
  localStorage.setItem("basketData",JSON.stringify(basket));
  
}

let updateQuantity = (id) => {
  let itemQuantity = document.getElementById(id);
  let search = basket.find((x) => x.id === id);
//console.log(search.quantity);
  itemQuantity.innerHTML = search.quantity;
  calculation();
  totalAmount();
}


let removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id);
  calculation();
  totalAmount();
  generateCartItems();

  localStorage.setItem("basketData", JSON.stringify(basket));
}

let clearCart = () => {
  basket = []; 
  console.log(basket.length);
  generateCartItems();
  localStorage.setItem("basketData", JSON.stringify(basket));
}

let totalAmount = () => {
  if (basket.length !== 0) {
    let totalBill = basket.map((x) => {
      let {id, quantity} = x;
      let search = itemsDetails.find((y) => y.id == id) || [];
      //console.log(quantity, search.price);
      return quantity*search.price;
    }).reduce((x,y) => x+y);
    document.getElementById("lable").innerHTML = `
      <h2>Total Bill : $ ${totalBill}</h2>
      <div>
        <button class="check-out" onclick="">Check Out </button>
        <button class ="clear-cart" onclick="clearCart()">Clear Cart</button>
      </div>
    `
  } else return;
}

totalAmount();

