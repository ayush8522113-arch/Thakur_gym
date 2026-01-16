import { useNavigate } from "react-router-dom";


const Memberships = () => {
  const navigate = useNavigate();  
  return (
<div className="memberships-container">

  <div className="membership-card gold">
    <h2>Gold Membership</h2>
    <p>Unlimited gym access, personal trainer, diet plan</p>
   <button
  onClick={() =>
    navigate("/payment", {
      state: { type: "gold", price: 1 }
    })
  }
>
  ₹1/ Month
</button>

  </div>

  <div className="membership-card silver">
    <h2>Silver Membership</h2>
    <p>Unlimited gym access with trainer guidance</p>
    <button
  onClick={() =>
    navigate("/payment", {
      state: { type: "silver", price: 1 }
    })
  }
>
  ₹1/ Month
</button>

  </div>

  <div className="membership-card bronze">
    <h2>Bronze Membership</h2>
    <p>Limited access to gym equipment</p>
    <button
  onClick={() =>
    navigate("/payment", {
      state: { type: "bronze", price: 1 }
    })
  }
>
  ₹1/ Month
</button>

  </div>

</div>

  );
};

export default Memberships;




