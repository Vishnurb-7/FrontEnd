import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import { useSelector } from "react-redux";
import { amount } from "../../features/paymentSlice";
import Navebar from "../../components/NavBar";
import userAxios from "../../utils/userAxios";

function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const payAmount = useSelector(amount)

    useEffect(() => {
        userAxios.get("/payment/config").then(async (r) => {
            const { publishableKey } = await r.data;
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);
    useEffect(() => {
        userAxios.post("/payment/createPaymentIntent", { payAmount }).then(async (result) => {
            const { clientSecret } = await result.data;
            setClientSecret(clientSecret);
        });
    }, []);

    return (
        <div className="">
            <Navebar />
            <div className="flex flex-col justify-center items-center w-full h-[927px]">
                <h1 className="text-3xl mb-8 drop-shadow-2xl droshadow- md:text-4xl font-Viaoda font-semibold">Make your payment here!</h1>
                <div className="bg-white p-10 rounded-2xl shadow-2xl md:w-[34%]">
                    {clientSecret && stripePromise && (
                        < Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm />
                        </Elements>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default Payment;