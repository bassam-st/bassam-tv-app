export default function WhatsAppButton() {
  const number = "967771997809";
  const msg = encodeURIComponent(
    "السلام عليكم، أريد إضافة اشتراك لتطبيق العائلة"
  );

  return (
    <a
      href={`https://wa.me/${number}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "#25D366",
        color: "#fff",
        padding: "12px 16px",
        borderRadius: 50,
        textDecoration: "none",
        fontWeight: "bold",
      }}
    >
      واتساب
    </a>
  );
}
