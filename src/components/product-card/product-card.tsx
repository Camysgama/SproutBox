interface IProductCard {
  image: string;
  children: string;
}

export default function ProductCard({ children, image }: IProductCard) {
  return (
    <div className="flex h-[100px] w-[450px] items-center rounded-md bg-box px-14 py-6 shadow-md">
      <img className="mr-6 h-12 w-12 rounded-full" src={image} />
      <div className="text-sm">{children}</div>
    </div>
  );
}
