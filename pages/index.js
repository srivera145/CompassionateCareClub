import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";
import Image from "next/image";
import PaymentForm from "../components/PaymentForm";
import styles from "../styles/Home.module.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CompassionateCareClub</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}
