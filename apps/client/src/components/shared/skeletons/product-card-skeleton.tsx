import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3" dir="rtl">
      <Skeleton className="h-[200px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[240px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
