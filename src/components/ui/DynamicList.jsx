import React from "react";

const DynamicListSelect = ({
  fields,
  addItem,
  remove,
  register,
  selectOptions = [],
  selectField,
  inputFields = [],
  fieldArrayName,
  className = "",
  errors,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-wrap gap-2 items-center">
        
          <select
            {...register(`${fieldArrayName}.${index}.${selectField}`)}
            className="border rounded p-2"
          >
            {selectOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          {errors?.[index]?.unitId && (
      <p className="text-red-600">{errors[index].unitId.message}</p>
    )}

         
          {inputFields.map((input) => (
            <input
              key={input.name}
              type={input.type || "text"}
              placeholder={input.placeholder || ""}
              {...register(`${fieldArrayName}.${index}.${input.name}`, {
                valueAsNumber: input.type === "number",
              })}
              defaultValue={field[input.name] ?? input.defaultValue ?? ""}
              className="border rounded p-2 w-24"
            />
            
          ))}
          {errors?.[index]?.price && (
      <p className="text-red-600">{errors[index].price.message}</p>
    )}

        
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

    
      <button
        type="button"
        onClick={addItem}
        className="mt-2 text-blue-600 hover:underline"
      >
        + Add Unit
      </button>
    </div>
  );
};

export default DynamicListSelect;