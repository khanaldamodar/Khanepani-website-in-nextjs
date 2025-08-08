// "use client";
import { Suspense,} from "react";
import SearchComponent from "@/components/global/SearchPage";
export default function SearchPage() {
  return (

    <Suspense fallback={<div className="p-4">Loading search page...</div>}>
    <SearchComponent/>
    </Suspense>
  );
}
