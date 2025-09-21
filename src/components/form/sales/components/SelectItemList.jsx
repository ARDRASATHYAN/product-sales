import Button from "../../../ui/Button";


const SaleItemList = ({ items, onSubmit }) => (
  <div className="mt-4 border p-2 rounded">
    <h3 className="font-bold mb-2">Sale Items</h3>
    <ul>
      {items.map((item, idx) => (
        <li key={idx}>
          Product ID: {item.productId}, Unit ID: {item.saleUnits[0].productUnitId}, Quantity: {item.saleUnits[0].quantity}, Price: {item.price}, Tax: {item.taxPercentage}%
        </li>
      ))}
    </ul>
    <Button type="button" onClick={onSubmit} className="mt-2">
      Submit Sale
    </Button>
  </div>
);

export default SaleItemList;