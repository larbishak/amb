import { useEffect, useState } from "react";
import Head from "next/head";
import {  Badge, Table, Group, Text,  ScrollArea, createStyles,Button, Center} from '@mantine/core';
import { IconTrashXFilled } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    kbd: {
      fontSize: "23px",
      colro: "black"
    },

    button: {
    backgroundImage: `linear-gradient(135deg, ${theme.colors.teal[9]} 0%, ${
      theme.colors.teal[4]
    } 100%)`,
    marginLeft: "8px",
    padding: 0
    },
    badge: {
      color: theme.colors.teal[9]
    }

}))
const Cart = () => {
  const { classes } = useStyles();
  const styles={
    button: {
        padding: " 4px 20px",backgroundColor: "transparent", textDecoration: "none",color: "white", border: "none",
        display: "inline", fontWeight:"bold"
    },
    buttonClear: {
        padding: " 4px 20px",backgroundColor: "transparent", textDecoration: "none",color: "white", border: "none",
        display: "inline", fontWeight:"bold",  display: "flex", alignItems: "center"
    },
  }

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

  const rows = cart.map((item) => (
    <tr key={item.id}>
      <td>
        <Group spacing="sm">
          <div>
            <Text fz="sm" fw={500}>
              {item.product}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Text >{item.price} DA</Text>
      </td>
      <td>
        <Center>
        <Button className={classes.button}>
      <button onClick={() => handleQuantity(item.id, "+")} style={styles.button}>+</button>
</Button>
      <Text style={{display: "inline", fontSize: "20px",margin: "3px"}}>{item.quantity}</Text>
      <Button className={classes.button}>
      <button onClick={() => handleQuantity(item.id, "-")} style={styles.button}>-</button>
</Button>
</Center>
      </td>
      <td> {item.price * item.quantity} DA</td>
    </tr>
  ));

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
<>
            <Head>
                <title>Cart Page</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

    <div style={{margin: "0px 30px"}}>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Products</th>
            <th>Unit Price</th>
            <th> <Center> quantity </Center> </th>
            <th>sous total</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Center>
      <Text style={{fontSize: "20px"}}>total Price : {total_price} DA</Text>
          <br />
        <Badge className={classes.badge}>cash on delivery</Badge>
      </Center>
      <Button className={classes.button}>
      <button style={styles.buttonClear} onClick={handleClear}><IconTrashXFilled/>clear cart</button>
      </Button>




<form action="https://formsubmit.co/larbishak2003@gmail.com" method="POST">
        
        <Text style={{display: "inline", }}>Name:</Text>
     <input type="text" name="name" required style={{margin: "8px",padding: "8px", borderRadius: "5px"}} />
        <Text style={{display: "inline"}}>Phone:</Text>
     <input type="text" name="phone" required style={{margin: "8px",padding: "8px", borderRadius: "5px"}} />
        <Text style={{display: "inline"}}>Email:</Text>
     <input type="email" name="email" style={{margin: "8px",padding: "8px", borderRadius: "5px"}} />

     <input type="hidden" name="_subject" value="New Order!" />
     <input type="hidden" name="cart" value={JSON.stringify(cart)} />
     <input type="hidden" name="totalPrice" value={total_price} />
     <input type="hidden" name="_template" value="table" />
     {/*other email can be added to receive*/}
     <input type="hidden" name="_cc" value="ishak.larbi@inttic.dz" />
     <input type="hidden" name="_autoresponse" value="thanks for purchasing the following products we will contact you soon to confirm your order" />
      <br />
      <Center>
     <input type="submit" value={"confirm order"} style={{textDecoration: "none", outline: "none", color: "white",  backgroundColor: "#1aa078",border: "none", fontWeight: "bold", margin: "8px",padding: "14px", borderRadius: "5px"}} />
</Center>
      </form>
      </div>

</>
  );
};

export default Cart