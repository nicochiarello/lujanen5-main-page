import Image from "next/image";
import { formatDate } from "../../utils/format-date";
import SimpleCard from "./cards/SimpleCard";
import FirstIndexCard from "./cards/FirstIndexCard";

const Latest = ({ latest }) => {
  return (
    <section className="w-full px-2 h-fit rounded-md grid sm:grid-cols-2 md:grid-cols-3 gap-[1rem] lg:gap-[calc(40px)]">
      {latest.slice(1, 6).map((i, key) => {
        return key === 0 ? (
        <FirstIndexCard blog={i}/>
        ) : (
        <SimpleCard blog={i}/>
        );
      })}
    </section>
  );
};

export default Latest;
