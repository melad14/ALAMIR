 
import ReactFlyingItem from 'react-flying-item';
export default function AddToCartButton({
  hasSizesOrExtras, onClick, basePrice, image
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <ReactFlyingItem
          targetTop={'5%'}
          targetLeft={'95%'}
          src={image}>
          <div onClick={onClick}>
            Add to cart {basePrice} EGP
          </div>
        </ReactFlyingItem>
      </div>
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