import { Card, Timeline, Typography, Button, Modal } from "antd";
import { SelectOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const { Title } = Typography;


export default function Home({ isServerInfo }) {
  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  const isInchDex = useMemo(() => (Moralis.Plugins?.oneInch ? true : false), [Moralis.Plugins?.oneInch]);

  async function donation(val) {
    let options = {
        contractAddress:"0x356d2E7a0d592bAd95E86d19479c37cfdBb68Ab9",
        functionName:"newDonation",
        abi:[{"inputs":[{"internalType":"string","name":"note","type":"string"}],"name":"newDonation","outputs":[],"stateMutability":"payable","type":"function"}],
        params:{
            note: "Thanks for your work bruder"
            },
        msgValue: Moralis.Units.ETH(val)
        }

        await contractProcessor.fetch({
          params: options,
          onSuccess: () => {
            let secondsToGo = 3;
            const modal = Modal.success({
              title: "Success!",
              content: `Thank you for your ${val} MATIC donation`,
            });
            setTimeout(() => {
              modal.destroy();

            }, secondsToGo*1000);
          }
          })
    
  }




  return (
    <div
      style={{ display: "flex", flexDirection: "column", textAlign: "center" }}
      >
        <Title> Interacting with smart contracts</Title>
        <div style={{ marginBottom: "10px"}}>
          <a
            href={"https://mumbai.polygonscan.com/address/0x356d2E7a0d592bAd95E86d19479c37cfdBb68Ab9"}
            target="_blank"
            rel="noreferrer">
              <SelectOutlined style= {{ marginRight: "5px"}}/>
              View on explorer
            </a>
        </div>
        <div>
          <Title level={3}> DONATE </Title>
          <Button onClick={() => donation(0.1)}>0.1 MATIC</Button>
        </div>
      </div>
  )





}