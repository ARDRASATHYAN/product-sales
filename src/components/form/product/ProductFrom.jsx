import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DynamicListSelect from "../../ui/DynamicList";
import TextArea from "../../ui/TextArea";
import Card from "../../ui/Card";
import { fetchUnits } from "../../../services/unitapi/unitapi";
import { createProduct } from "../../../services/productapi/productapi";


const schema = yup.object().shape({
    name: yup.string().required("Product Name is required"),
    productCode: yup.string().required("Product Code is required"),
    description: yup.string().required("description Code is required"),
    units: yup
        .array()
        .of(
            yup.object().shape({
                unitId: yup.number().required("Unit is required"),
                price: yup
                    .number()
                    .typeError("Price must be a number")
                    .required("Price is required")
                    .min(0, "Price cannot be negative"),
            })
        )
        .min(1, "At least one unit is required"),
});

export default function ProductForm() {
    const queryClient = useQueryClient();
    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            productCode: "",
            description: "",
            units: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "units",
    });

    const { data: unitOptions = [], isLoading: unitsLoading } = useQuery({
        queryKey: ["units"],
        queryFn: fetchUnits,
    });

    useEffect(() => {
        if (unitOptions.length && fields.length === 0) {
            append({ unitId: unitOptions[0].unitId, price: 0 });
        }
    }, [unitOptions, fields.length]);

    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            reset();
        },
    });

    const onSubmit = (data) => {
        const payload = {
            productName: data.name,
            productCode: data.productCode,
            ProductDescription: data.description,
            units: data.units.map((u) => ({
                unitId: Number(u.unitId),
                price: Number(u.price),
            })),
        };
        mutation.mutate(payload);
    };

    if (unitsLoading) return <p>Loading units...</p>;

    return (
        <Card title="Add Product">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input label="Product Name" {...register("name")} error={errors.name?.message} />
                <Input label="Product Code" {...register("productCode")} error={errors.productCode?.message} />
                <TextArea label="Description" {...register("description")} error={errors.description?.message} />

                <DynamicListSelect
                    fields={fields}
                    addItem={() => append({ unitId: unitOptions[0]?.unitId, price: 0 })}
                    remove={remove}
                    register={register}
                    fieldArrayName="units"
                    selectField="unitId"
                    selectOptions={unitOptions.map((u) => ({
                        id: u.unitId,
                        label: `${u.unitName} (${u.unitAbbreviation})`,
                    }))}
                    inputFields={[
                        { name: "price", type: "text", defaultValue: 0, placeholder: "Price" },
                    ]}
                    errors={errors.units}
                />

                {errors.units && <p className="text-red-600">{errors.units.message}</p>}

                <Button type="submit" disabled={mutation.isLoading} className="bg-blue-300">
                    {mutation.isLoading ? "Saving..." : "Submit"}
                </Button>
            </form>
        </Card>
    );
}