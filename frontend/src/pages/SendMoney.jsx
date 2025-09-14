import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import axios from "axios"
export default function SendMoney() {
    const [searchPParams]  = useSearchParams();
    const id  = searchPParams.get("id");
    const name = searchPParams.get("name");
    const [amount, setamount] = useState(0);

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                    <h2 class="text-3xl font-bold text-center"> Send Money</h2>

                    </div>
                     <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                         <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                          <h3 class="text-2xl font-semibold">{name}</h3>

                </div>
                 <div class="space-y-4">
                    <div class="space-y-2">
                        <label 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                        >
                            Amount (in Rs)
                        </label>
                        <input 
                        onChange={(e) => {
                            setamount(e.target.value);
                        }}
                        type="text"
                        placeholder="Enter amount"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        />
                </div>
                <button onClick={() => {
                    axios.post("http://localhost:3000/api/v1/account/transfer", {
                        to: id,
                        amount
                    }, {
                        headers : {
                            Authorization : "Bearer " + localStorage.getItem("token")
                    }
                }
                       
                    )
                }}
                className="ustify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                    Intiate Transfer
                </button>
        </div>
        </div>
        </div>
        </div>
        </div>
    )
}