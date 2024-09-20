/* 
QUERY PARAMETERS EXPECTED:
-session_id = The stripe payment session id for which the info is to be retrieved (required*)
-stripe_account_id = The id of the account on which the payment record exists (required*)
-lang = Language of page, default is 'de' german (optional)
*/

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

const Home = ({ sessionData, locale, hasError, newQueryParams }) => {
  const title = getTitle(locale);
  const description = getDescription(locale);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='icon'
          href={!hasError ? "/favicon.ico" : "/faviconerror.ico"}
        />
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
    utm_term: utmTerm,
  } = query;

  if (!sessionId || !stripeId) {
    return {
      props: {
        hasError: true,
        locale,
      },
    };
  }

  // pass the UUID key to the server to get the queryString contaning info about the ad against the key:
  const fbAdDataFetch = await fetch(
    `https://session-retriever.vercel.app/get-data/${utmTerm}`
  );
  const fbAdQueryObj = await fbAdDataFetch.json();
  /*
  SAMPLE RESPONSE:
  {
    "utm_medium": "paid",
    "utm_id": "120212287035680162",
    "utm_content": "120212287184820162",
    "utm_campaign": "120212287035680162",
    "fbclid": "IwY2xjawFToSRleHRuA2FlbQEwAAEdTNPE8IuDTgiE-rBLXTnfkcE_JfWH-jeU3BRk2MeLylbK0MaptKc-15KX_aem_ijG5AstIgfVostZONxjmfA",
    "utm_source": "facebook",
    "campaign_id": "120212287035670162",
    "ad_id": "120212287184820162"
  }
  */

  // Build the new query parameters for the redirect
  const newQueryParams = new URLSearchParams({
    session_id: sessionId,
    stripe_account_id: stripeId,
    lang: locale,
    redis_id: utmTerm,
    ...fbAdQueryObj, // This will spread the parameters from fbAdQueryObj
  }).toString();

  const newUrl = `/order-success?${newQueryParams}`;

  return {
    redirect: {
      destination: newUrl,
      permanent: false, // Use a 302 (temporary) redirect
    },
  };
}

export default Home;
