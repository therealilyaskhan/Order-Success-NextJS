import Head from "next/head";
import Script from "next/script";
import OrderDetails from "../components/OrderDetails";
import ErrorComponent from "../components/ErrorComponent";
import { useEffect } from "react";

const localeTitles = {
  en: "Order Successful",
  de: "Bestellung erfolgreich",
};
const localeDescriptions = {
  en: "Thank you for your order",
  de: "Vielen Dank für Ihre Bestellung",
};
const localizedLabels = {
  en: {
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
  },
  de: {
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
  },
};

const getLocalizedComponent = (locale, sessionData) => (
  <OrderDetails sessionData={sessionData} locale={localizedLabels[locale]} />
);

const getTitle = (locale) => localeTitles[locale] || localeTitles.de;
const getDescription = (locale) =>
  localeDescriptions[locale] || localeDescriptions.de;

const Home = ({ sessionData, locale, hasError }) => {
  // Facebook Pixel Purchase Event Trigger
  useEffect(() => {
    if (
      !hasError &&
      sessionData &&
      sessionData.amount_subtotal &&
      sessionData.currency
    ) {
      // Trigger the purchase event
      window.fbq("track", "Purchase", {
        value: (sessionData.amount_subtotal / 100).toFixed(2),
        currency: sessionData.currency.toUpperCase(),
      });
    }
  }, [sessionData, hasError]);

  const title = getTitle(locale);
  const description = getDescription(locale);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        {/* FACEBOOK PIXEL BASE CODE */}
        <Script id='facebook-pixel' strategy='beforeInteractive'>
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '536006748934294');
        `}
        </Script>
        <noscript>
          <img
            height='1'
            width='1'
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=536006748934294&ev=PageView&noscript=1`}
          />
        </noscript>
      </Head>
      {hasError ? (
        <ErrorComponent
          noInfo={locale === "de" ? "Nichts gefunden!" : "Nothing found!"}
        />
      ) : (
        getLocalizedComponent(locale, sessionData)
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  const {
    session_id: sessionId,
    stripe_account_id: stripeId,
    lang: locale = "de",
  } = query;

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
