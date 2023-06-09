import { Button, DatePicker, Input, Switch, Form, InputNumber, Select } from "antd";
import React, { useState, useCallback, useRef } from "react";
import { utils, BigNumber, constants } from "ethers";
import { notification } from "antd";

import generateSignatures from "../helpers/generateSignatures";
import uploadSignature from "../helpers/uploadSignature";
import { initialNetwork } from "../constants";
import { Typography, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "../App.css";

const { Title, Paragraph } = Typography;

export default function ExampleUI({
  address,
  userSigner,
  mainnetProvider,
  localProvider,
  tx,
  readContracts,
  writeContracts,
  targetNetwork,
}) {
  const [auctioningTokenAmount, setAuctioningTokenAmount] = useState(0);
  const [biddingTokenAmount, setBiddingTokenAmount] = useState(0);
  const [isPrivateAuction, setIsPrivateAuction] = useState(false);
  console.log(readContracts?.EasyAuction);

  const auctionFormRef = useRef(null);

  const onFinish = useCallback(
    async values => {
      const {
        auctioningToken,
        biddingToken,
        orderCancellationEndDate,
        auctionEndDate,
        auctionedSellAmount,
        minBuyAmount,
        minimumBiddingAmountPerOrder,
        minimumFundingThreshold,
        isAtomicClosureAllowed,
        isPrivateAuction,
        signersAddress,
        whitelistAddresses,
      } = values;
      const currentAuctionCount = (await readContracts?.EasyAuction?.auctionCounter()).toNumber();

      const auctioningTokenAddress = auctioningToken;
      const biddingTokenAddress = biddingToken;
      const orderCancellationEndDateTimestamp = orderCancellationEndDate.unix();
      const auctionEndDateTimestamp = auctionEndDate.unix();
      const auctionedSellAmountInWei = BigNumber.from(utils.parseUnits("" + auctionedSellAmount, 18)).toString();
      const minBuyAmountInWei = BigNumber.from(utils.parseUnits("" + minBuyAmount, 18)).toString();
      const minimumBiddingAmountPerOrderInWei = BigNumber.from(
        utils.parseUnits("" + minimumBiddingAmountPerOrder, 18),
      ).toString();
      const minimumFundingThresholdInWei = BigNumber.from(
        utils.parseUnits("" + minimumFundingThreshold, 18),
      ).toString();
      const isAtomicClosureAllowedBool = !!isAtomicClosureAllowed;
      let accessManagerAddress = constants.AddressZero;
      let accessManagerContractData = "0x";
      if (!!isPrivateAuction && signersAddress) {
        accessManagerAddress = "0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53";
        accessManagerContractData = utils.defaultAbiCoder.encode(["address"], [signersAddress]);
      }
      console.log({
        auctioningTokenAddress,
        biddingTokenAddress,
        orderCancellationEndDateTimestamp,
        auctionEndDateTimestamp,
        auctionedSellAmountInWei,
        minBuyAmountInWei,
        minimumBiddingAmountPerOrderInWei,
        minimumFundingThresholdInWei,
        isAtomicClosureAllowedBool,
        accessManagerAddress,
        accessManagerContractData,
      });
      tx(
        writeContracts.EasyAuction.initiateAuction(
          auctioningTokenAddress,
          biddingTokenAddress,
          orderCancellationEndDateTimestamp,
          auctionEndDateTimestamp,
          auctionedSellAmountInWei,
          minBuyAmountInWei,
          minimumBiddingAmountPerOrderInWei,
          minimumFundingThresholdInWei,
          isAtomicClosureAllowedBool,
          accessManagerAddress,
          accessManagerContractData,
        ),
        async update => {
          console.log("📡 Easy Auction Transaction Update:", update);
          if (update && (update.status === "confirmed" || update.status === 1)) {
            console.log(" 🍾 Easy Auction Transaction " + update.hash + " finished!");
            console.log(
              " ⛽️ " +
                update.gasUsed +
                "/" +
                (update.gasLimit || update.gas) +
                " @ " +
                parseFloat(update.gasPrice) / 1000000000 +
                " gwei",
            );
            if (!!isPrivateAuction && signersAddress) {
              onGenerateSignatures({ auctionId: currentAuctionCount + 1, whitelistAddresses });
            }
          }
        },
      );
    },
    [readContracts?.EasyAuction, onGenerateSignatures],
  );

  const onFinishFailed = () => {};
  const onGenerateSignatures = useCallback(
    async values => {
      const { auctionId, whitelistAddresses } = values;

      const signatures = await generateSignatures(
        whitelistAddresses,
        userSigner,
        auctionId,
        "0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53",
      );

      await Promise.all(
        signatures.map(async signature => {
          const { user, signature: auctioneerSignedMessage } = signature;
          await uploadSignature(targetNetwork.chainId, auctionId, user, auctioneerSignedMessage);
        }),
      );
    },
    [targetNetwork.chainId, userSigner],
  );

  const approveAuctioningToken = useCallback(async () => {
    if (auctioningTokenAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    /* look how you call setPurpose on your contract: */
    /* notice how you pass a call back for tx updates too */
    const result = tx(
      writeContracts.AuctioningToken.mint(
        address,
        // "" + auctioningTokenAmount * 10 ** 18,
        BigNumber.from(utils.parseUnits("" + auctioningTokenAmount, 18)),
      ),
      update => {
        console.log("📡 Transaction Update:", update);
        if (update && (update.status === "confirmed" || update.status === 1)) {
          console.log(" 🍾 Transaction " + update.hash + " finished!");
          console.log(
            " ⛽️ " +
              update.gasUsed +
              "/" +
              (update.gasLimit || update.gas) +
              " @ " +
              parseFloat(update.gasPrice) / 1000000000 +
              " gwei",
          );

          tx(
            writeContracts.AuctioningToken.approve(
              initialNetwork.easyAuctionAddress,
              BigNumber.from(utils.parseUnits("" + auctioningTokenAmount, 18)),
            ),
            update => {
              console.log("📡 Transaction Update:", update);
              if (update && (update.status === "confirmed" || update.status === 1)) {
                console.log(" 🍾 Transaction " + update.hash + " finished!");
                console.log(
                  " ⛽️ " +
                    update.gasUsed +
                    "/" +
                    (update.gasLimit || update.gas) +
                    " @ " +
                    parseFloat(update.gasPrice) / 1000000000 +
                    " gwei",
                );
              }
            },
          );
        }
      },
    );
    console.log("awaiting metamask/web3 confirm result...", result);
    console.log(await result);
  }, [auctioningTokenAmount, address, writeContracts.AuctioningToken]);

  const approveBiddingToken = useCallback(async () => {
    if (biddingTokenAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    /* look how you call setPurpose on your contract: */
    /* notice how you pass a call back for tx updates too */
    const result = tx(
      writeContracts.BiddingToken.mint(address, BigNumber.from(utils.parseUnits("" + biddingTokenAmount, 18))),
      update => {
        console.log("📡 Transaction Update:", update);
        if (update && (update.status === "confirmed" || update.status === 1)) {
          console.log(" 🍾 Transaction " + update.hash + " finished!");
          console.log(
            " ⛽️ " +
              update.gasUsed +
              "/" +
              (update.gasLimit || update.gas) +
              " @ " +
              parseFloat(update.gasPrice) / 1000000000 +
              " gwei",
          );

          tx(
            writeContracts.BiddingToken.approve(
              initialNetwork.easyAuctionAddress,
              BigNumber.from(utils.parseUnits("" + biddingTokenAmount, 18)),
            ),
            update => {
              console.log("📡 Transaction Update:", update);
              if (update && (update.status === "confirmed" || update.status === 1)) {
                console.log(" 🍾 Transaction " + update.hash + " finished!");
                console.log(
                  " ⛽️ " +
                    update.gasUsed +
                    "/" +
                    (update.gasLimit || update.gas) +
                    " @ " +
                    parseFloat(update.gasPrice) / 1000000000 +
                    " gwei",
                );
              }
            },
          );
        }
      },
    );
    console.log("awaiting metamask/web3 confirm result...", result);
    console.log(await result);
  }, [biddingTokenAmount, address, writeContracts.BiddingToken]);

  const onSettleAuction = useCallback(
    async values => {
      const { auctionId } = values;
      const result = await tx(writeContracts.EasyAuction.settleAuction(auctionId), update => {
        console.log("📡 Transaction Update:", update);
        if (update && (update.status === "confirmed" || update.status === 1)) {
          console.log(" 🍾 Transaction " + update.hash + " finished!");
          console.log(
            " ⛽️ " +
              update.gasUsed +
              "/" +
              (update.gasLimit || update.gas) +
              " @ " +
              parseFloat(update.gasPrice) / 1000000000 +
              " gwei",
          );
          notification.info({
            message: `Auction ID: ${auctionId} has been settled`,
            description: "",
            placement: "topRight",
          });
        }
      });
    },
    [writeContracts?.EasyAuction],
  );

  return (
    <div className="main">
      <Form
        name="Initiate Auction Form"
        ref={auctionFormRef}
        labelCol={{ style: { width: "35%", whiteSpace: "initial" } }}
        wrapperCol={{ flex: 1 }}
        colon={false}
        initialValues={{
          remember: true,
          auctioningToken: writeContracts?.AuctioningToken?.address || "",
          biddingToken: writeContracts?.BiddingToken?.address || "",
          accessManagerContractAddress: "0xE0AD16EB7Ea467C694E6cFdd5E7D61FE850e8B53",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="formParent"
        labelAlign="left"
        labelWrap
      >
        <Form.Item
          className="formItem"
          label="Auctioning Token address"
          name="auctioningToken"
          rules={[{ required: true, message: "Please input the address of the auctioning token" }]}
        >
          <div className="itemParent">
            <Tooltip title="Enter the address of the token you want to auction.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <Input style={{ backgroundColor: "transparent", color: "#FFFFFF" }} />
          </div>
        </Form.Item>
        <Form.Item
          label="Bidding Token address"
          name="biddingToken"
          rules={[{ required: true, message: "Please input the address of the bidding token" }]}
        >
          <div className="itemParent">
            <Tooltip title="Enter the address of the token that will be used for bidding.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <Input style={{ backgroundColor: "transparent", color: "#FFFFFF" }} />
          </div>
        </Form.Item>
        <Form.Item
          label="Order Cancellation End Date"
          name="orderCancellationEndDate"
          rules={[{ required: true, message: "Please enter the order cancellation end date" }]}
        >
          <div className="itemParent">
            <Tooltip title="Select the last date and time by which bidders can cancel orders.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <DatePicker
              style={{ width: "100%", backgroundColor: "transparent", color: "#FFFFFF" }}
              onChange={date => {
                console.log(auctionFormRef.current);
                auctionFormRef.current?.setFieldsValue({ orderCancellationEndDate: date });
              }}
              showTime
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Auction End Date"
          name="auctionEndDate"
          rules={[{ required: true, message: "Please enter the auction end date" }]}
        >
          <div className="itemParent">
            <Tooltip title="Select the date and time by which the auction will end.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <DatePicker
              style={{ width: "100%", backgroundColor: "transparent", textColor: "#FFFFFF" }}
              onChange={date => {
                console.log(auctionFormRef.current);
                auctionFormRef.current?.setFieldsValue({ auctionEndDate: date });
              }}
              showTime
              colorText="#FFFFFF"
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Auctioned Sell Amount"
          name="auctionedSellAmount"
          rules={[{ required: true, message: "Please input the auctioned sell amount" }]}
        >
          <div className="itemParent">
            <Tooltip title="Enter the number of  tokens you want to auction.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <InputNumber
              onChange={setAuctioningTokenAmount}
              style={{ width: "100%", backgroundColor: "transparent", color: "#FFFFFF" }}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Minimum Buy Amount"
          name="minBuyAmount"
          rules={[{ required: true, message: "Please input the minimum buy amount" }]}
        >
          <div className="itemParent">
            <Tooltip title="Enter the limit price you are willing to accept for the tokens you are about to auction.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <InputNumber style={{ width: "100%", backgroundColor: "transparent", color: "#FFFFFF" }} />
          </div>
        </Form.Item>
        <Form.Item
          label="Minimum Bidding Amount Per Order"
          name="minimumBiddingAmountPerOrder"
          rules={[{ required: true, message: "Please input the minimum bidding amount per order." }]}
        >
          <div className="itemParent">
            <Tooltip title="Enter the minimum price you are willing to accept for the auctioned tokens.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <InputNumber
              onChange={setBiddingTokenAmount}
              style={{ width: "100%", backgroundColor: "transparent", color: "#FFFFFF" }}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="Minimum Funding Threshold"
          name="minimumFundingThreshold"
          rules={[{ required: true, message: "Please input the minimum funding threshold." }]}
        >
          <div className="itemParent">
            <Tooltip title="Enter the minimum number of bidding tokens you want from the auction. If the sum of bids doesn't go above this threshold, the auction will fail.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <InputNumber style={{ width: "100%", backgroundColor: "transparent", color: "#FFFFFF" }} />
          </div>
        </Form.Item>
        <Form.Item
          label="Is Atomic Closure Allowed?"
          name="isAtomicClosureAllowed"
          valuePropName="isAtomicClosureAllowed"
          rules={[{ required: false, message: "Is Atomic Closure Allowed?" }]}
        >
          <div className="itemParent">
            <Tooltip title="Toggle to allow the auction to be closed atomically, whereby the last bid will be submitted along with the settlement transaction, which can enable atomic arbitrage.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <Switch />
          </div>
        </Form.Item>
        <Form.Item
          label="Is Private Auction?"
          name="isPrivateAuction"
          valuePropName="isPrivateAuction"
          rules={[{ required: false, message: "Is Private Auction?" }]}
        >
          <div className="itemParent">
            <Tooltip title="Toggle to allow only certain addresses to take part in your auction. If not toggled, your auction will be considered Public.">
              <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
            </Tooltip>
            <Switch onChange={setIsPrivateAuction} />
          </div>
        </Form.Item>
        {isPrivateAuction && (
          <>
            <Form.Item
              label="Private Auctions Signers Address"
              name="signersAddress"
              rules={[{ required: true, message: "Please input the signersAddress." }]}
            >
              <div className="itemParent">
                <Tooltip title="Enter the wallet address of the individual who will be signing addresses to take part in this auction. Typically the address of the auctioneer.">
                  <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
                </Tooltip>
                <Input style={{ backgroundColor: "transparent", color: "#FFFFFF" }} />
                {/* <AddressInput style={{ width: "100%" }} /> */}
              </div>
            </Form.Item>
            <Form.Item
              label="Whitelist addresses"
              name="whitelistAddresses"
              rules={[{ required: true, message: "Please input the Whitelist addresses." }]}
            >
              <div className="itemParent">
                <Tooltip title="Enter each wallet address, followed by pressing the 'Enter/Return' key, to whitelist addresses for your private auction. Note that you will have to sign each wallet address (with the address entered in the Private Auction Signer field) once you proceed to Launch the auction.">
                  <QuestionCircleOutlined style={{ color: "#FFFFFF" }} />
                </Tooltip>
                <Select mode="tags" tokenSeparators={[","]} style={{ backgroundColor: "transparent" }} />
              </div>
            </Form.Item>
          </>
        )}
        <Paragraph className="requiredDescription">
          *<span>Required</span>
        </Paragraph>
        <Button className="button" type="primary" htmlType="submit">
          Launch
        </Button>
      </Form>
    </div>
  );
}
