import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  // Currency symbol
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  // Change page
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  // Button array
  const btns = new Array(130).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=40&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error("Error response:", error.response);
          setError(
            `Server responded with status code ${error.response.status}`
          );
        } else if (error.request) {
          // Request was made but no response received
          console.error("Error request:", error.request);
          setError("Network error, no response received");
        } else {
          // Something else happened
          console.error("Error message:", error.message);
          setError("An unexpected error occurred");
        }
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error)
    return <ErrorComponent message={`Error While Fetching Coins: ${error}`} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"eur"}>EUR</Radio>
              <Radio value={"usd"}>USD</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                name={i.name}
                img={i.image}
                price={i.current_price}
                symbol={i.symbol}
                key={i.id}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
