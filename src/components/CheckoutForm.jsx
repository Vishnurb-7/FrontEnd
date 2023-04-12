import { PaymentElement,  } from "@stripe/react-stripe-js";
import {  useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Alert, AlertDescription, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertIcon, AlertTitle, Button, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { estimateId, paymentChange } from "../features/paymentSlice";

import userAxios from "../utils/userAxios";


export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch()
    const id = useSelector(estimateId)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/completion`,
            },
            redirect: "if_required",
        });
        if (error) {
            setMessage(error.message)
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            try {
                userAxios.get(`/payment/paymentDone/${id}`).then(async (res) => {
                    if (res.status === 201) {
                        await dispatch(paymentChange({ amount: "" }))

                        onOpen()
                    } else {
                        alert("server failed")
                    }
                })
            } catch (error) {
                alert("server failed")
            }

        } else {
            setMessage("Payment failed !. ");
        }

        // if (error.type === "card_error" || error.type === "validation_error") {
        //     setMessage(error.message);
        // } else {
        //     setMessage("An unexpected error occured.");
        // }

        setIsProcessing(false);
    };

   

    return (
        <>
            <form className="w-[100%] flex flex-col items-center" id="payment-form" onSubmit={handleSubmit}>
               
                <PaymentElement className="w-full" id="payment-element" />
                {message && <div className="text-red-500 text-lg m-4 text-center" id="payment-message">{message}</div>}
                <button className="mt-6 p-2 bg-green-400 hover:bg-green-500 rounded-xl w-32 hover:scale-105 hover:duration-300 hover:shadow-2xl" disabled={isProcessing || !stripe || !elements} type="submit" id="submit">
                    <span className="text-lg font-semibold" id="button-text">
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
            </form >
            <AlertDialog
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <Alert
                            status='success'
                            variant='subtle'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            height='300px'
                        // width='600px'
                        >
                            <AlertIcon boxSize='40px' mr={0} />
                            <AlertTitle mt={4} mb={8} fontSize='3xl'>
                                Payment Success!
                            </AlertTitle>
                            <AlertDescription maxWidth='sm'>
                                Thank you for considering us for the part of your event.
                            </AlertDescription>
                        </Alert>

                        <AlertDialogFooter>

                            <Link to={"/home"} className='text-lg w-32 text-center font-semibold border-2 border-black p-1 self-center rounded-full'>Home </Link>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}