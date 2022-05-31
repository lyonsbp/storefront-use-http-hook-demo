import { useEffect, useState } from "react";

async function getProducts(filter = "") {
  const path = `${process.env.PUBLIC_URL}/products.json`;

  try {
    const resp = await fetch(path);

    const { products } = await resp.json();
    const filteredData = products.filter(product => {
      return product.name.includes(filter) || product.category.includes(filter);
    });

    await delay(2000);

    return filter ? filteredData : products;
  } catch (err) {
    console.error(err);
    // call log service
  }
}

async function delay(ms) {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}

function useProducts(filter) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const reFetch = async () => {
    console.log("im refetching");
    setRefetchTrigger(!refetchTrigger);
  };

  useEffect(() => {
    const getSetProducts = async () => {
      setLoading(true);
      const data = await getProducts(filter);
      setData(data);
      setLoading(false);
    };
    getSetProducts();
  }, [refetchTrigger, filter]);

  return { loading, data, reFetch };
}

export { getProducts, useProducts };
