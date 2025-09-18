import toast from "react-hot-toast"

export const failedPayment = () => {toast.error("Failed to generate payment link")}

export const schoolAdded = () => {toast.success("School Added Successfully!")}
export const schoolAlreadyExist = () => {toast.error("School with this name already added!")}
export const schoolNameEnter = () => {toast.error("Please fill all the required fields!")}

export const phoneLengthIsGreater = () => {toast.error("Phone number is at least 10 digit")}
export const studentAdded = () => {toast.success("Student Added Successfully!")}
export const studentNameEnter = () => {toast.error("Please fill all the required fields!")}
export const studentAddingError = () => {toast.error("Failed to add student")}


export const orderAdded = () => {toast.success("Fee Paid Successfully!")}
export const orderNameEnter = () => {toast.error("Please fill all the required fields!")}
export const orderAddingError = () => {toast.error("Failed to pay")}

export const copyText = () => {toast.success("Copied to clipboard!")}
