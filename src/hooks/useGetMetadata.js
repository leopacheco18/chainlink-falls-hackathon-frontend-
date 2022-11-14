import { useState } from "react";
import {ethers} from "ethers";
import AbiOpenMarket from '../mocks/AbiOpenMarket.json'
import axios from "axios";
const useGetMetadata = () => {
  const [loading, setLoading] = useState(false);

  const getMetadata = async (tokenId) => {
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        AbiOpenMarket,
        signer
      );

      console.log(process.env.REACT_APP_CONTRACT_ADDRESS, AbiOpenMarket, signer)

      const result = await contract.tokenURI( tokenId);
      const resultJson = await axios.get(result);
      setLoading(false);
      return resultJson.data;
    } catch (e) {
      setLoading(false);
      return e;
    }
  };

  return { getMetadata , loading};
};

export default useGetMetadata;
