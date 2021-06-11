import { useSelectedRealtor } from "@contexts/selected-realtor";
import useRealtorsQuery from "@data/use-realtors.query";

const InboxRealtorDropdown: React.FC<React.SVGAttributes<{}>> = () => {
  const { data, isLoading, isError } = useRealtorsQuery();
  const { realtor, setRealtor } = useSelectedRealtor();
  const isNotVisible = isLoading || isError;

  if (isNotVisible || !data) return <div />;

  const options = data.map((value) => ({
    value: value?.id!,
    label: "Agence " + value?.id!,
  }));

  return (
    <div>
      <select
        value={
          realtor
            ? options.find((r) => r.value === realtor.id)?.value
            : options[0].value
        }
        onChange={(e) => {
          e.preventDefault();
          const id = e.target.value;
          const realtor = data.find((d) => d?.id === parseInt(id));
          setRealtor(realtor!);
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InboxRealtorDropdown;
