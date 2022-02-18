import {Select, Button, Modal, Input} from 'antd'
import {ShoppingCartOutlined} from "@ant-design/icons";
import { useState } from 'react';
import { useMoralis } from 'react-moralis';

const {Option} = Select;
function Purchase({book}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [delivery, setDelivery] = useState("");
  const {Moralis, account, chainId} = useMoralis();

  const handleOk = async () => {

    // Get The Price of MATIC

    const options = {
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      chain: "eth"
    };
    const price = await Moralis.Web3API.token.getTokenPrice(options);
    const priceMatic = book.price / price.usdPrice;
    
    // Send Matic to book store owenr address

    const options1 = {
      type: "native", 
      amount: Moralis.Units.ETH(priceMatic), 
      receiver: "xxxxx"
    }
    let result = await Moralis.transfer(options1)


    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("Transaction");
    const transaction = new Transaction();

    transaction.set("Customer", account);
    transaction.set("Delivery", delivery);
    transaction.set("Product", book.name);

    transaction.save()
    setIsModalVisible(false);
  }

  return (
    <>
      <span className="price"> ${book.price}</span>
      <p>No Import Fees & Free Shipping Included</p>
      <h1 style={{ color: "green" }}> In Stock </h1>
      <h3>Quantity</h3>
      <Select defaultValue={1} style={{ width: "100%" }}>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
        <Option value={5}>5</Option>
      </Select>
      {chainId === "0x13881" &&
      <Button
      className="login"
      style={{ width: "100%", marginTop: "50px" }}
      onClick={()=>setIsModalVisible(true)}
    >
      <ShoppingCartOutlined /> Buy Now
    </Button>
      }
      
      <Modal
        title="Purchase Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={()=>setIsModalVisible(false)}
      >
        <div style={{ display: "flex" }}>
          <img src={book.image} alt="product" style={{ width: "200px" }}></img>
          <div>
            <h3>{book.name}</h3>
            <h2>${book.price}</h2>
            <h4>Delivery Address</h4>
            <Input onChange={(value) => setDelivery(value.target.value)}></Input>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Purchase
