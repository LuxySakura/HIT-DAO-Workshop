import {Button, styled, Typography} from "@mui/material";
import { ethers } from 'ethers';
import React, {useState} from 'react';


export const ConnectWallet = () => {
    const [address, setaddress] = useState('To be grasped......')

    const ConnectButton = styled(Button)({
        backgroundColor: '#9BE1C5',
        fontSize: 16,
    })

    const bindMetamask = async () => {
        // 利用ethers 创建一个provider实例
        let provider = new ethers.providers.Web3Provider(window.ethereum)
        // 根据Provider连接Metamask钱包，获取用户授权信息
        let signer = provider.getSigner()

        await provider.send('eth_requestAccounts', [])

        signer.getAddress().then((result) => {
            setaddress(result)
            console.log(address, '成功获取用户钱包地址');
        }).catch();

    }

    return (
        <div className="ConnectWallet">
            <ConnectButton variant="contained" onClick={bindMetamask}>
                Connect to your wallet
            </ConnectButton>
            <Typography variant="body1" gutterBottom>
                Here's your Address:<br/>{address}
            </Typography>
        </div>
    )
}