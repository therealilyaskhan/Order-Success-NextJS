export default function OrderDetails({ sessionData, locale }) {
  const amount = (sessionData.amount_subtotal / 100).toFixed(2);
  const currency = sessionData.currency.toUpperCase();
  const email = sessionData.customer_details.email;
  const name = sessionData.customer_details.name;
  const line1 = sessionData.shipping_details.address.line1;
  const line2 = sessionData.shipping_details.address.line2;
  const city = sessionData.shipping_details.address.city;
  const postalCode = sessionData.shipping_details.address.postal_code;
  const country = sessionData.shipping_details.address.country;
  const paymentStatus = sessionData.payment_status;

  const {
    thankYouLabel,
    orderConfirmedText,
    orderConfirmedSubText,
    orderDetailsLabel,
    contactInfoLabel,
    shippingAddressLabel,
    paymentDetailsLabel,
    shippingMethodLabel,
    shippingChargesLabel,
  } = locale;

  return (
    <div>
      <div className='order-success'>
        <div className='order-success__svg-wrapper'>
          <svg viewBox='0 0 512 512' className='order-success__svg'>
            <g>
              <linearGradient
                id='a'
                x1='86.294'
                x2='425.706'
                y1='425.706'
                y2='86.294'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-opacity='1' stop-color='#011c49' offset='0'></stop>
                <stop stop-opacity='1' stop-color='#00b67b' offset='1'></stop>
              </linearGradient>
              <path
                fill='url(#a)'
                fill-rule='evenodd'
                d='M256 16c132.549 0 240 107.451 240 240S388.548 496 256 496 16 388.549 16 256 123.451 16 256 16zm29.165 319.79 19.806 18.189a6.944 6.944 0 0 0 9.684-.272l35.348-33.84a6.938 6.938 0 0 0 .185-9.809 6.938 6.938 0 0 0-9.809-.191L309.58 339.36l-15.015-13.788c-2.822-2.594-7.216-2.411-9.806.409a6.94 6.94 0 0 0 .406 9.809zm-51.767-221.869h-3.929c-11.552.504-22.003 5.429-29.688 13.115-8.116 8.118-13.158 19.324-13.158 31.652v22.073h12.387v-22.073c0-8.912 3.651-17.017 9.528-22.896 5.885-5.88 13.987-9.531 22.896-9.531 8.915 0 17.017 3.652 22.894 9.531 5.885 5.879 9.536 13.984 9.536 22.896v22.073h12.381v-22.073c0-12.329-5.037-23.534-13.158-31.652-7.688-7.686-18.137-12.611-29.689-13.115zm84.129 151.741c-36.564 0-66.207 29.643-66.207 66.207 0 36.567 29.643 66.21 66.207 66.21 36.567 0 66.21-29.643 66.21-66.21 0-36.564-29.643-66.207-66.21-66.207zm-167.032-83.881a7.719 7.719 0 0 0-7.709 7.033l-14.451 157.228c-.406 4.401.916 8.342 3.894 11.603 2.975 3.264 6.777 4.944 11.2 4.944h100.082c-3.929-9.463-6.103-19.837-6.103-30.72 0-44.249 35.869-80.118 80.118-80.118 2.833 0 5.626.147 8.386.436l-5.825-63.374a7.724 7.724 0 0 0-7.71-7.033h-36.133v19.621a6.191 6.191 0 1 1-12.381 0V181.78H199.01v19.621c0 3.42-2.771 6.193-6.191 6.193s-6.196-2.773-6.196-6.193V181.78h-36.128z'
                clip-rule='evenodd'
                opacity='1'
                data-original='url(#a)'
              ></path>
            </g>
          </svg>
        </div>
        <h2 className='order-success__heading'>
          {thankYouLabel} {name}!
        </h2>
        <h3 className='order-success__subheading'>{orderConfirmedText}</h3>
        <p className='order-success__msg'>{orderConfirmedSubText}</p>
      </div>

      <div className='order-details'>
        <h2 className='order-details__heading order-deatils__label'>
          {orderDetailsLabel}
        </h2>
        <div className='order-details__content-box'>
          <div className='order-details__info-box-inner'>
            <h3 className='order-details__contact-info-label order-deatils__label'>
              {contactInfoLabel}
            </h3>
            <div
              id='order-details-email'
              className='order-details__email order-deatils__value'
            >
              {email}
            </div>
            <div
              id='order-details-name'
              className='order-details__name order-deatils__value'
            >
              {name}
            </div>
          </div>
          <div className='order-details__info-box-inner'>
            <h3 className='order-details__address-info-label order-deatils__label'>
              {shippingAddressLabel}
            </h3>
            <div
              id='order-details-line-1'
              className='order-details__line-1 order-deatils__value'
            >
              {line1}
            </div>
            <div
              id='order-details-line-2'
              className='order-details__line-2 order-deatils__value'
            >
              {line2}
            </div>
            <div
              id='order-details-city-postal'
              className='order-details__city-postal order-deatils__value'
            >
              {city}, {postalCode}
            </div>
            <div
              id='order-details-country'
              className='order-details__country order-deatils__value'
            >
              {country}
            </div>
          </div>
          <div className='order-details__info-box-inner'>
            <h3 className='order-details__payment-info-label order-deatils__label'>
              {paymentDetailsLabel}
            </h3>
            <div
              id='order-details-amount-currency'
              className='order-details__amount-currency order-deatils__value'
            >
              {amount} {currency}
            </div>
            <div
              id='order-details-payment-status'
              className='order-details__payment-status order-deatils__value'
            >
              {paymentStatus}
            </div>
          </div>
          <div className='order-details__info-box-inner'>
            <h3 className='order-details__shipping-info-label order-deatils__label'>
              {shippingMethodLabel}
            </h3>
            <div
              id='order-details-shipping'
              className='order-details__shipping order-deatils__value'
            >
              {shippingChargesLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
