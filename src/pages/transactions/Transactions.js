import { useAddress } from '@thirdweb-dev/react';
import { Row } from 'antd';
import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import TransactionContent from '../../components/TransactionContent';
import useHttp from '../../hooks/useHttp';
import "./Transactions.css"

const Transactions = () => {
    const [transactionList, setTransactionList] = useState([]);
    const address = useAddress();
    const {loading, request} = useHttp()

    useEffect(() => {
        if(address){
            getTransactions();
        }
    }, [address])

    const getTransactions = async () => {
        const data = await request({endpoint : `get-transactions/${address}`});
        setTransactionList(data)
        console.log(data)
    }
    
  return (
    <div className='transactions-container container'>
        {loading && <Loading />}
        <Row gutter={[48,48]}>

        {transactionList.map((transaction, key) => (
            <TransactionContent getTransactions={getTransactions} {...transaction} key={key} />
        ))}
        </Row>
    </div>
  )
}

export default Transactions