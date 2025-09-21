import Selector from "../../../ui/Selector";

const ProductSelector = ({ products, selectedProductId, onChange }) => {
  const options = products.map((p) => ({
    id: p.productId,
    label: p.productName,
  }));

  return (
    <Selector
      label="Product"
      options={options}
      value={selectedProductId}
      onChange={(val) => onChange(Number(val))}
      placeholder="-- Select Product --"
    />
  );
};

export default ProductSelector;