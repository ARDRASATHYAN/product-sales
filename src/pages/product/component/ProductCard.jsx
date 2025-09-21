export default function ProductCard({ productName, productDescription, units, productId }) {
  return (
    <div key={productId} className="border-b py-2">
      <h4 className="font-semibold">{productName}</h4>
      <p className="text-sm text-gray-600">{productDescription}</p>
      <p className="text-sm text-gray-800">
        Units:{" "}
        {units.map((u) => (
          <span key={u.productUnitId}>
            {u.unit.unitName} - ₹{u.price}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}
