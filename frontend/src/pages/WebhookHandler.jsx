import { useEffect, useState } from "react";

export default function WebhookHandler() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchWebhookUpdates();
      setUpdates(data);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Webhook Updates</h2>
      <ul className="space-y-2">
        {updates.map(u => (
          <li key={u.collect_id} className="p-3 bg-gray-100 rounded shadow">
            <p><b>Order ID:</b> {u.custom_order_id}</p>
            <p><b>Status:</b> {u.status}</p>
            <p><b>Amount:</b> {u.order_amount}</p>
            <p><b>Transaction:</b> {u.transaction_amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
