import Image from "next/image";

const HomeBanner = () => {
  return (
    <div>
      <a href="#" className="justify-center items-center overflow-hidden">
        <Image
          className="rounded-lg opacity-60 object-cover"
          src="https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </a>
    </div>
  );
}

export default HomeBanner;