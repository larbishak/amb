import { useEffect, useState } from "react";

const Cart = () => {
  const [valid, setValid] = useState(false);
  const [cart, setCart] = useState([]);

  // valid, setValid is used for the confirm order enable and disable
  useEffect(() => {
    // initialize current cart from the local Storage
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
    // for the disable button
    setValid(data.some((item) => item.quantity > 0));
  }, []);

  const total_price = cart.reduce((prev, curr) => {
    return parseInt(curr.price) * parseInt(curr.quantity) + parseInt(prev);
  }, 0);

  // increase decrease quantity
  const handleQuantity = (id, sign) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        sign === "-"
          ? item.quantity > 0
            ? item.quantity--
            : null
          : item.quantity++;
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setValid(cart.some((item) => item.quantity > 0));
  };

  const handleClear = () => {
    localStorage.setItem("cart", "[]");
    setCart([]);
    setValid(false);
  };

  const handleConfirm = (e) => {
    if(!valid) e.preventDefault()
    // TODO check the cart if its empty or something else
    localStorage.setItem("cart", "[]");
    setValid(false);
  };

  return (
    <div>
      {cart &&
        cart.map((item) => {
          return (
            <div key={item.id}>
              title: {item.product} quantity: {item.quantity} price:{" "}
              {item.price * item.quantity}
              {/* increase decrease*/}
              {"              "}
              <button onClick={() => handleQuantity(item.id, "+")}>+</button>
              {"              "}{" "}
              <button onClick={() => handleQuantity(item.id, "-")}>-</button>
            </div>
          );
        })}
      <p>total Price : {total_price}</p>
      <button onClick={handleClear}>clear cart</button>
        <br />

<form action="https://formsubmit.co/larbishak2003@gmail.com" method="POST">
        information:
        cash on delivery
        name:
     <input type="text" name="name" required />
        phone:
     <input type="text" name="phone" required />
        email:
     <input type="email" name="email" />

     <input type="hidden" name="_subject" value="New Order!" />
     <input type="hidden" name="cart" value={JSON.stringify(cart)} />
     <input type="hidden" name="totalPrice" value={total_price} />
     <input type="hidden" name="_template" value="table" />
     {/*other email can be added to receive*/}
     <input type="hidden" name="_cc" value="ishak.larbi@inttic.dz" />
     <input type="hidden" name="_autoresponse" value="thanks for purchasing the following products we will contact you soon to confirm your order" />
      </form>
        {/* TODO after show page of order and thanks page  all this in Modal*/}
    </div>
  );
};

export default Cart;
