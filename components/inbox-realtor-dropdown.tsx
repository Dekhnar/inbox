import { useSelectedRealtor } from "@contexts/selected-realtor";
import useRealtorsQuery from "@data/use-realtors.query";
import { useEffect } from "react";
import Select from "react-select-native";

const InboxRealtorDropdown: React.FC<React.SVGAttributes<{}>> = () => {
  const { data, isLoading, isError } = useRealtorsQuery();
  const { setRealtor } = useSelectedRealtor();
  const isNotVisible = isLoading || isError;
  const isVisible = !isNotVisible;

  useEffect(() => {
    if (isVisible && data) setRealtor(data[0]);
  }, [data]);

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
