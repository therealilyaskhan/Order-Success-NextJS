import Head from "next/head";
import OrderDetails from "../components/OrderDetails";
import ErrorComponent from "../components/ErrorComponent";

const localeTitles = {
  en: "Order Successful",
  de: "Bestellung erfolgreich",
};
const localeDescriptions = {
  en: "Thank you for your order",
  de: "Vielen Dank für Ihre Bestellung",
};

const Home = ({ sessionData, locale, hasError }) => {
  const getLocalizedComponent = (locale) => {
    const en = {
      thankYouLabel: "Thank You",
      orderConfirmedText: "Your order has been confirmed",
      orderConfirmedSubText:
        "You will receive an email once your order is ready.",
      orderDetailsLabel: "Order Details",
      contactInfoLabel: "Contact Information",
      shippingAddressLabel: "Shipping Address",
      paymentDetailsLabel: "Payment Details",
      shippingMethodLabel: "Shipping Method",
      shippingChargesLabel: "FREE",
    };
    const de = {
      thankYouLabel: "Danke",
      orderConfirmedText: "Ihre Bestellung ist bestätigt",
      orderConfirmedSubText:
        "Sie erhalten eine E-Mail, sobald Ihre Bestellung fertig ist.",
      orderDetailsLabel: "Bestelldetails",
      contactInfoLabel: "Kontaktinformationen",
      shippingAddressLabel: "Lieferadresse",
      paymentDetailsLabel: "Zahlungsdetails",
      shippingMethodLabel: "Versandart",
      shippingChargesLabel: "KOSTENLOS",
    };
    switch (locale) {
      case "en":
        return <OrderDetails sessionData={sessionData} locale={en} />;
      case "de":
      default:
        return <OrderDetails sessionData={sessionData} locale={de} />;
    }
  };

  const title = localeTitles[locale] || "Bestellung erfolgreich";
  const description =
    localeDescriptions[locale] || "Vielen Dank für Ihre Bestellung";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {hasError ? (
        <ErrorComponent
          noInfo={locale === "de" ? "Nichts gefunden!" : "Nothing found!"}
        />
      ) : (
        getLocalizedComponent(locale)
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const sessionId = query.session_id;
  const stripeId = query.stripe_account_id;
  const locale = query.lang || "de";

  if (!sessionId || !stripeId) {
    return {
      props: {
        hasError: true,
        locale,
      },
    };
  }

  // Make a request to the Node.js server with the session_id
  const res = await fetch(
    `https://session-retriever.vercel.app/order/success?session_id=${sessionId}&stripe_account_id=${stripeId}`
  );
  const sessionData = await res.json();

  return {
    props: {
      sessionData,
      locale,
      hasError: false,
    },
  };
}

export default Home;
