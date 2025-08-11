import {
  NotFoundProduct,
  ProductCardSkeleton,
  SectionTitle,
} from "@/components/shared";
import { ProductCard } from "../shop";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Product } from "@monorepo/types";

export const NewArrivals = () => {
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`
      );
      return res.data;
    },
  });

  const newArrivals = products
    ?.filter((product: Product) => !product.isRecentlyAdded)
    .slice(0, 10);

  return (
    <section className="container">
      <SectionTitle>أحدث المنتجات</SectionTitle>
      <div className="relative">
        <div className="ml-7">
          {isPending && (
            <div className="flex gap-6 mt-12">
              {Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          )}
          {isError && <NotFoundProduct title="لم يتم العثور على المنتجات" />}

          <div className="flex overflow-x-scroll gap-4 pb-6">
            {newArrivals?.map((product: Product) => (
              <div key={product._id} className="min-w-[250px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-y-0 top-0 left-0 z-20 w-12 h-full bg-gradient-to-r to-transparent transition-opacity duration-200 pointer-events-none from-background"></div>
      </div>
    </section>
  );
};
