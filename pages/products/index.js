import { useState } from "react";
import { Grid, Center} from "@mantine/core";
import { BadgeCard } from "@/src/components/productsComponents/mainProd";
import Head from "next/head";

const Events = ({ productsList }) => {
  const [products, setProducts] = useState(productsList);

  const styles= {
    select: {
      backgroundColor: "transparet",
      padding: "10px",
      marginBottom: "10px",
      display: "inline",
      marginLeft: "10px",
      fontWeight: "600",
    },
    option: {
      fontWeight: "600",
    },
    title: {
      display: "inline",
      marginLeft: "30px",
      fontWeight: "bold",
      fontSize: "18px"
    },
    wrapper: {
      margin: "0 15px"
    }
  }

  async function handleChange(e) {
    const category = e.target.value;
    if (category != "Compléments Alimentaires") {
      const data = productsList.filter((product)=>product.category.includes(category) )
      setProducts(data);
    } else {
      setProducts(productsList);
    }
  }
  return (
    <>
      <Head>
        <title>Products</title>
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
    <div>
      <Center maw={400} h={100} mx="auto">
      <h2 style={{marginTop: "-30px"}}>Products:</h2>
    </Center>
    <div style={styles.wrapper}>
      <p style={styles.title}>Categories:</p>
      <select style={styles.select} onChange={handleChange}>
        <option style={styles.option}>Compléments Alimentaires</option>
        <option style={styles.option}>Gynecologie</option>
        <option style={styles.option}>Dermatologie</option>
        <option style={styles.option}>Pediatrie</option>
      </select>
    </div>
      <Grid style={{padding: "30px" }}>
        {products &&
          products.map((product) => {
            return (
            <Grid.Col sm={6} md={4} key={product.id}>
              <BadgeCard {...product} />
            </Grid.Col>
            );
          })}
    </Grid>
    </div>
    </>
  );
};

export default Events;

export async function getServerSideProps() {
  const { products } = await import("../../data/products.json");
  return {
    props: {
      productsList: products,
    },
  };
}