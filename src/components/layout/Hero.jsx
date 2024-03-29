import Image from "next/image";
import Right from "../icons/Right.js";
import Link from "next/link.js";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-8 md:py-12">
        <h1 className="text-4xl font-semibold">
          <span className="text-primary">
            Lamera
          </span><br />
          <span className="text-3xl text-secondary">
          The finest chain of restaurants<br />
        and cafes <br />
        in Beni Suef&nbsp;
          </span>
       
        </h1>
        <p className="my-6 text-gray-500 ">
        أرقى سلسلة مطاعم وكافيهات في بني سويف        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
          <Link href={'/menu'}>order now</Link>

            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            <Link href={'/#about'}>Learn more</Link>

            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image src={'/1.jpg'} layout={'fill'} objectFit={'contain'} alt={'pizza'} />
      </div>
    </section>
  );
}