/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51KOnepHuZMbHxf66s41fvVVpNoBzAIZ3MTAIg6CUQ0lVz1Z0fd25kbijK8m1ld1iTRDZQlAMo3tXvBnKnmvH3aPl001d8mAIcx'
);

export const bookTour = async tourId => {
  try {
    // Get checkout session from API
    const session = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    });
    console.log(session);

    // Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
