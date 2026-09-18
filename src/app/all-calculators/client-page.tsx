
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { allCalculators } from "@/lib/data";
import React from "react";
import AdBanner from "@/components/AdBanner";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import { useSearchParams } from "next/navigation";

const AllCalculatorsClient = () => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') || "";
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const filteredCalculators = allCalculators.filter(calc =>
    calc.name.toLowerCase().includes(search.toLowerCase()) ||
    calc.description.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (_category: string) => {
    return "bg-[#F2765E]";
  };

  return (
      <div className="min-h-screen bg-white text-black">
      
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ListingJsonLd items={allCalculators} breadcrumb={[{ name: "Home", path: "/" }, { name: "All Calculators", path: "/all-calculators" }]} />
        <div className="max-w-2xl mx-auto mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-black">
            All Calculators & Tools
          </h1>
          <p className="text-sm text-neutral-600 mb-5">
            Browse our complete collection of {allCalculators.length}+ calculators
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search calculators..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search calculators"
                className="pl-10 h-11 text-sm bg-white border-neutral-200 focus:border-[#F2765E]"
              />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-4 text-sm text-neutral-600">
            Showing {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredCalculators.map((calc, index) => {
                const Icon = calc.icon;
                return (
                  <React.Fragment key={calc.id}>
                    <Link
                      href={calc.path}
                      className="group"
                    >
                      <Card className="bg-white border border-neutral-200 p-4 shadow-sm h-full hover:border-[#F2765E] transition-all duration-200">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${getCategoryColor(calc.category)} flex items-center justify-center shrink-0`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm mb-0.5 text-black group-hover:text-[#F2765E] transition-colors">
                              {calc.name}
                            </h3>
                            <p className="text-[13px] text-neutral-600 line-clamp-2 mb-2">
                              {calc.description}
                            </p>
                            <div className="flex gap-2">
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FFF5F2] text-[#c25136] border border-[#F2765E]/25 capitalize">
                                {calc.category}
                              </span>
                              
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                    {(index + 1) % 18 === 0 && <div className="sm:col-span-2" key={`ad-${index}`}><AdBanner/></div>}
                  </React.Fragment>
                )
            })}
          </div>

          {filteredCalculators.length === 0 && (
            <div className="text-center py-10">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-sm text-neutral-600">No calculators found</p>
              <p className="text-neutral-600 mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
      </div>
  );
};

export default AllCalculatorsClient;
