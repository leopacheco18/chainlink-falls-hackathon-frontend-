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

      const result = await contract.callStatic.tokenURI( tokenId);
      const resultJson = await axios.get(result);
      const dataNFT = await contract.callStatic.NFTData( tokenId);
      let maticPrice = await contract.callStatic.getMaticPrice();
      maticPrice = ethers.utils.formatUnits( maticPrice , 8)
      let price = dataNFT[0];
      price = ethers.utils.formatUnits( price , 18)
      let currency = dataNFT[3];
      resultJson.data.price = price
      resultJson.data.owner = dataNFT[1]
      resultJson.data.status = dataNFT[2]
      resultJson.data.currency = currency;
      if(currency === 'MATIC'){
        resultJson.data.priceMatic = price;
        resultJson.data.priceUSD = parseFloat(price) * parseFloat(maticPrice);
      }else{
        resultJson.data.priceUSD = price;
        resultJson.data.priceMatic = parseFloat(price) * parseFloat(maticPrice);
      }
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
