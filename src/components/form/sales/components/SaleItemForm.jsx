import Button from "../../../ui/Button";
import Input from "../../../ui/Input";


const SaleItemForm = ({
  quantity,
  price,
  taxPercentage,
  setQuantity,
  setPrice,
  setTaxPercentage,
  onAdd,
   register, 
   errors,
    
}) => (
  <div className="flex flex-col space-y-2 mt-2">
    
    <Input
    label="Quality"
      type="text"
      placeholder="Quantity"
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
       {...register("quantity")}
      className="border rounded p-1"
    />
    {errors.quantity && (
        <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
      )}
    <Input
    label="Price"
      type="text"
      placeholder="Price"
      value={price}
      onChange={(e) => setPrice(Number(e.target.value))}
      {...register("price")}
      className="border rounded p-1"
    />
     {errors.price && (
        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
      )}
    <Input
    label="Tax"
      type="text"
      placeholder="Tax %"
      value={taxPercentage}
      onChange={(e) => setTaxPercentage(Number(e.target.value))}
       {...register("taxPercentage")}
      className="border rounded p-1"
    />
    {errors.taxPercentage && (
        <p className="text-red-500 text-sm mt-1">{errors.taxPercentage.message}</p>
      )}
    <Button type="button" onClick={onAdd}>
      Add to Sale
    </Button>
  </div>
);

export default SaleItemForm;