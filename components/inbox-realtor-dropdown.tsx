import useRealtorsQuery from "@data/use-realtors.query";
import Select from "react-select-native";

const InboxRealtorDropdown: React.FC<React.SVGAttributes<{}>> = () => {
  const { data, isLoading, isError } = useRealtorsQuery();
  const isNotVisible = isLoading || isError;

  if (isNotVisible || !data) return <div />;

  const options = data.map(({ name, id }) => ({
    value: "Agence" + (name || "Unvailable"),
    label: id || "Unvailable",
  }));

  return (
    <div>
      <Select
        // onChange={(e) => handleChange(e)}
        options={options}
        value="ebin"
        defaultValue={options[0].value}
      />
    </div>
  );
};

export default InboxRealtorDropdown;
