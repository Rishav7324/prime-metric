
'use client'

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { allCalculators } from "@/lib/data";

const AllCalculatorsClient = () => {
  const [search, setSearch] = useState("");

  const filteredCalculators = allCalculators.filter(calc =>
    calc.name.toLowerCase().includes(search.toLowerCase()) ||
    calc.description.toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "financial": return "from-blue-500 to-purple-600";
      case "health": return "from-pink-500 to-rose-600";
      case "math": return "from-emerald-500 to-teal-600";
      case "other": return "from-cyan-500 to-blue-600";
      case "tools": return "from-violet-500 to-purple-600";
      case "education": return "from-orange-500 to-amber-600";
      default: return "from-primary to-secondary";
    }
  };

  return (
      <div className="min-h-screen">
      

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            All Calculators & Tools
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Browse our complete collection of {allCalculators.length}+ calculators
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search calculators..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-14 text-lg glass-card border-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="mb-6 text-muted-foreground">
            Showing {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calc, index) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={calc.id}
                    href={calc.path}
                    className="group"
                  >
                    <Card className="glass-card p-6 h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCategoryColor(calc.category)} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                            {calc.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {calc.description}
                          </p>
                          <div className="flex gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
                              {calc.category}
                            </span>
                            {!calc.implemented && (
                              <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                Coming Soon
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
            })}
          </div>

          {filteredCalculators.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-muted-foreground">No calculators found</p>
              <p className="text-muted-foreground mt-2">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
      </div>
  );
};

export default AllCalculatorsClient;
