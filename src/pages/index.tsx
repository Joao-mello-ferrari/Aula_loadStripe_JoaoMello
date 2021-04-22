import {GetStaticProps} from 'next'
import Head from 'next/head'

import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

interface HomeProps{
  product:{
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section>
          <span>
            <img src="/assets/waving_hand.svg" alt="mão abanando"/>
            Hey, welcome
          </span>
          <h1>News about the <span>React</span> world</h1>
          <p>
            Get access to all publications <br/>
            <span>for {product.amount}/month</span>
          </p>

          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/assets/avatar.svg" alt="avatar"/>
      </main>

    </>
  )
}

export const getStaticProps: GetStaticProps = async() =>{
  const price = await stripe.prices.retrieve('price_1Ii1CPAL4tLloNaB2msUiDHt')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount/100),
  }

  return {
    props:{
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}