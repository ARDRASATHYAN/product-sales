import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "../../ui/CArd";
import SaleItemList from "./components/SelectItemList";
import SaleItemForm from "./components/SaleItemForm";
import UnitSelector from "./components/UnitSelector";
import ProductSelector from "./components/ProductSelector";
import { fetchProductById, fetchProducts } from "../../../services/productapi/productapi";
import { createSale } from "../../../services/salesapi/salesapi";

const itemSchema = yup.object().shape({
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than 0")
    .required("Quantity is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  taxPercentage: yup
    .number()
    .typeError("Tax must be a number")
    .min(0, "Tax cannot be negative")
    .max(100, "Tax cannot exceed 100")
    .required("Tax percentage is required"),
});

const SalesForm = () => {
  const queryClient = useQueryClient();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [saleItems, setSaleItems] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(itemSchema),
    defaultValues: {
      quantity: 1,
      price: 0,
      taxPercentage: 0,
    },
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: productDetails } = useQuery({
    queryKey: ["productDetails", selectedProductId],
    queryFn: () => fetchProductById(selectedProductId),
    enabled: !!selectedProductId,
  });

  const mutation = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries(["sales"]);
      resetForm();
    },
  });

  const resetForm = () => {
    setSaleItems([]);
    setSelectedProductId(null);
    setSelectedUnitId(null);
    reset({ quantity: 1, price: 0, taxPercentage: 0 });
  };

  const handleUnitChange = (unitId) => {
    setSelectedUnitId(unitId);
    const unit = productDetails?.units.find((u) => u.productUnitId === Number(unitId));
    if (unit) setValue("price", unit.price); 
  };

  const onAddItem = (data) => {
    if (!selectedProductId) {
      alert("Select a product first");
      return;
    }
    if (!selectedUnitId) {
      alert("Select a unit first");
      return;
    }

    const newItem = {
      productId: selectedProductId,
      saleUnits: [{ productUnitId: selectedUnitId, quantity: Number(data.quantity) }],
      price: Number(data.price),
      taxPercentage: Number(data.taxPercentage),
    };

    setSaleItems((prev) => [...prev, newItem]);
    setSelectedProductId(null);
    setSelectedUnitId(null);
    reset({ quantity: 1, price: 0, taxPercentage: 0 });
  };

  const handleSubmitSale = () => {
    if (saleItems.length === 0) {
      alert("Add at least one item to the sale.");
      return;
    }

    saleItems.forEach((item) => {
      mutation.mutate({
        productId: item.productId,
        SaleUnits: item.saleUnits,
        price: item.price,
        taxPercentage: item.taxPercentage,
      });
    });
  };

  if (productsLoading) return <p>Loading products...</p>;

  return (
    <Card title="Create Sale">
      <ProductSelector
        products={products}
        selectedProductId={selectedProductId}
        onChange={setSelectedProductId}
      />

      {productDetails && (
        <UnitSelector
          units={productDetails.units}
          selectedUnitId={selectedUnitId}
          onChange={handleUnitChange}
        />
      )}

      {selectedUnitId && (
        <SaleItemForm
          register={register}
          errors={errors}
          onAdd={handleSubmit(onAddItem)}
        />
      )}

      <SaleItemList items={saleItems} onSubmit={handleSubmitSale} />
    </Card>
  );
};

export default SalesForm;
