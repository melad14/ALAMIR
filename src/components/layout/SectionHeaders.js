export default function SectionHeaders({subHeader,mainHeader}) {
  return (
    <>
      <h3 className="uppercase text-2xl text-gray-500 font-semibold leading-4 my-2">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic">
        {mainHeader}
      </h2>
    </>
  );
}