export default function OrderDetails({ noInfo }) {
  return (
    <div>
      <div className='order-success'>
        <div className='order-success__svg-wrapper'>
          <svg className='order-success__svg' viewBox='0 0 24 24'>
            <g>
              <linearGradient
                id='b'
                x1='0'
                x2='0'
                y1='0'
                y2='24'
                gradientUnits='userSpaceOnUse'
              >
                <stop stop-opacity='1' stop-color='#7c008c' offset='0'></stop>
                <stop stop-opacity='1' stop-color='#ff0000' offset='1'></stop>
              </linearGradient>
              <clipPath id='a'>
                <path
                  d='M0 0h24v24H0z'
                  fill='#000000'
                  opacity='1'
                  data-original='#000000'
                ></path>
              </clipPath>
              <g
                fill='url(#b)'
                fill-rule='evenodd'
                clip-path='url(#a)'
                clip-rule='evenodd'
              >
                <path
                  d='M4.8 6c-.495 0-.957.419-1.005.9l-.003.027L2 20.964v.135a.9.9 0 0 0 .9.901h8.2a1 1 0 1 1 0 2H2.9C1.382 24 0 22.786 0 21.1v-.2a1 1 0 0 1 .008-.127L1.807 6.685C1.966 5.173 3.3 4 4.8 4h12.5c1.499 0 2.832 1.17 2.993 2.68l.598 4.385a1 1 0 1 1-1.982.27l-.6-4.4a1.06 1.06 0 0 1-.004-.035c-.048-.481-.51-.9-1.005-.9z'
                  fill=''
                  opacity='1'
                ></path>
                <path
                  d='M9 2c-.548 0-1 .452-1 1v5a1 1 0 0 1-2 0V3c0-1.652 1.348-3 3-3h4c1.652 0 3 1.348 3 3v5a1 1 0 1 1-2 0V3c0-.548-.452-1-1-1zM16.293 16.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414z'
                  fill=''
                  opacity='1'
                ></path>
                <path
                  d='M23.707 16.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0z'
                  fill=''
                  opacity='1'
                ></path>
              </g>
            </g>
          </svg>
        </div>
        <h2 className='order-success__heading'>{noInfo}</h2>
      </div>
    </div>
  );
}
