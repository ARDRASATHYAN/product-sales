import Selector from "../../../ui/Selector";

const UnitSelector = ({ units, selectedUnitId, onChange }) => {
  const options = units.map((u) => ({
    id: u.productUnitId,
    label: `${u.unit.unitName} (${u.unit.unitAbbreviation}) - Price: ${u.price}`,
  }));

  return (
    <Selector
      label="Unit"
      options={options}
      value={selectedUnitId}
      onChange={(val) => onChange(Number(val))}
      placeholder="-- Select Unit --"
    />
  );
};

export default UnitSelector;