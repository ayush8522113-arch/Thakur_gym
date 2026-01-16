export const openRazorpay = ({ amount, plan }) => {
  const options = {
    key: "rzp_live_S3kxjTMutQ1RzQ", // TEST KEY ONLY
    amount: amount * 100, // Razorpay uses paise
    currency: "INR",
    name: "Gym Membership",
    description: `${plan.toUpperCase()} Membership`,
    handler: function (response) {
      alert("Payment Successful 🎉");
      console.log("Payment Response:", response);
    },
    theme: {
      color: "#e60023"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
