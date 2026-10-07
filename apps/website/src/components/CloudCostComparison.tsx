import React from "react";
import { XCircle, CheckCircle2, TrendingDown, DollarSign, Server, Zap, ShieldAlert } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CloudCostComparison() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <Badge variant="outline" className="mb-2 text-xs">
          Economics & Architecture
        </Badge>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
          Why Client-Side Optimization Wins
        </h2>
        <p className="text-sm text-gray-400">
          Compressing on the user's device before sending bytes over the wire fundamentally redefines your cloud economics and user experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* The Old / Expensive Way */}
        <Card className="border-rose-500/20 bg-rose-950/10">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="destructive" className="bg-rose-500/20 text-rose-300 border-rose-500/30">
                The Costly Old Way
              </Badge>
              <span className="text-xs font-mono text-rose-400 font-bold">Cloud SaaS / Server APIs</span>
            </div>
            <CardTitle className="text-lg text-white">Upload Raw ➔ Process on Server</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-start gap-3">
                <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-200 block">Massive Payload Sizes</span>
                  <span className="text-xs text-gray-400">User uploads raw 15 MB iPhone photos, causing 30s delays and frequent upload dropouts.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-200 block">Heavy Cloudinary / AWS Bills</span>
                  <span className="text-xs text-gray-400">You pay monthly subscriptions and high bandwidth egress fees for every transformation.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="size-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-200 block">Server CPU Spikes & Memory Leaks</span>
                  <span className="text-xs text-gray-400">Running Node.js Sharp or ImageMagick on multiple simultaneous 4K images exhausts server RAM.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
              <span className="text-rose-300 font-medium">Estimated Monthly Cloud Cost</span>
              <span className="font-mono font-bold text-rose-400">$89 – $450+ / month</span>
            </div>
          </CardContent>
        </Card>

        {/* The Compressly Way */}
        <Card className="border-emerald-500/30 bg-emerald-950/10 shadow-lg shadow-emerald-500/5">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="success">
                The Compressly Way
              </Badge>
              <span className="text-xs font-mono text-emerald-400 font-bold">100% Client-Side SDK</span>
            </div>
            <CardTitle className="text-lg text-white">Optimize on Client ➔ Upload Tiny File</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-200 block">95% Payload Reduction in 150ms</span>
                  <span className="text-xs text-gray-400">Image is optimized down to ~300 KB inside the browser before it ever leaves the device.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-200 block">0$ Forever (Zero Cloud Fees)</span>
                  <span className="text-xs text-gray-400">Uses client hardware acceleration. 0 external API keys, 0 third-party subscriptions.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-gray-200 block">Zero Server CPU Load</span>
                  <span className="text-xs text-gray-400">Your backend simply saves a light, web-ready image. Zero image processing libraries required on the server.</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
              <span className="text-emerald-300 font-medium">Estimated Monthly Cloud Cost</span>
              <span className="font-mono font-bold text-emerald-400">$0.00 (Free & Open-Source)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
