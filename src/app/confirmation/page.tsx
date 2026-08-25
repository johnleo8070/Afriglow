import { redirect } from "next/navigation";

export default function ConfirmationRedirect() {
  redirect("/booking/confirmation");
}
