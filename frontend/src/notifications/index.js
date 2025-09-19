import toast from "react-hot-toast"

export const failedPayment = () => {toast.error("Failed to generate payment link")}
export const adminAccess = () => {toast.error("Please Enter Correct Admin Email and Password")}
export const phoneLengthIsGreater = () => {toast.error("Phone number is at least 10 digit")}
export const copyText = () => {toast.success("Copied to clipboard!")}
