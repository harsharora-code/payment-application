import { useLocation, useNavigate } from "react-router-dom";
import { SendMoney } from "./SendMoney";

export function Done() {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>
        <p className="text-lg mb-6">
          You have successfully transferred <br />
          <span className="font-bold text-green-700">₹{amount}</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg border-l-black"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
