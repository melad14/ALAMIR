 
export default function AddToCartButton({
  hasSizesOrExtras, onClick, basePrice
}) {
  if (!hasSizesOrExtras) {
    return (
      <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (from {basePrice} EGP)</span>
    </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      <span>Add to cart (from {basePrice} EGP)</span>
    </button>
  );
}