import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/api"; // your axios instance


const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="payment-error">
        <h2>No membership selected</h2>
        <button onClick={() => navigate("/memberships")}>
          Go to Memberships
        </button>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      // 1️⃣ Create order from backend
      const { data } = await axios.post("/payments/create-order", {
        membershipType: state.type,
        amount: state.price
      });

      // 2️⃣ Open Razorpay popup
      const options = {
        key: data.key, // PUBLIC KEY from backend
        amount: state.price * 100,
        currency: "INR",
        name: "Gym Membership",
        description: `${state.type.toUpperCase()} Membership`,
        order_id: data.orderId,

        handler: async (response) => {
          // 3️⃣ Verify payment on backend
          await axios.post("/payments/verify", response);
          alert("Payment successful! Await admin approval.");
          navigate("/"); // or user dashboard
        },

        theme: {
          color: "#e60023"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error(error);
      alert("Please Login first and then try again.");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">

        <h1>Checkout</h1>

        <div className="plan-info">
          <p className="label">Membership Plan</p>
          <p className="value">{state.type.toUpperCase()}</p>
        </div>

        <div className="plan-info">
          <p className="label">Duration</p>
          <p className="value">30 Days</p>
        </div>

        <div className="plan-info">
          <p className="label">Amount</p>
          <p className="value price">₹{state.price}</p>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Proceed to Pay
        </button>

        <p className="secure-text">
          🔒 Secure payment powered by Razorpay
        </p>

      </div>
    </div>
  );
};

export default Payment;
