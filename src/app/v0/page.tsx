import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FragmentTradingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-800">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-900 transform rotate-45"></div>
        </div>
        <span className="text-xl font-bold">FRAGMENT</span>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Deal Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">karenft138.t.me</h1>
          <span className="inline-block px-3 py-1 bg-green-600 text-green-100 rounded-full text-sm font-medium">
            Deal In Progress
          </span>
        </div>

        {/* Deal Price and Security Deposit */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-gray-400 text-sm">Deal Price</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 transform rotate-45"></div>
                <span className="text-2xl font-bold">3000</span>
              </div>
              <p className="text-gray-400 text-sm">~ $9255.9</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-gray-400 text-sm">Security Deposit</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 transform rotate-45"></div>
                <span className="text-2xl font-bold">150</span>
              </div>
              <p className="text-gray-400 text-sm">~ $462.8</p>
            </div>
          </div>
        </div>

        {/* How does this work? */}
        <div className="py-4">
          <button className="text-gray-400 text-sm hover:text-white transition-colors">
            How does this work?
          </button>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Telegram Username</span>
            <span className="text-blue-400">@karenft138</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white font-medium">Web Address</span>
            <span className="text-blue-400">t.me/karenft138</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-white font-medium">TON Web 3.0 Address</span>
            <span className="text-blue-400">karenft138.t.me</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium">
            Start Exchange
          </Button>

          <button className="w-full text-blue-400 hover:text-blue-300 transition-colors py-2">
            Subscribe to updates
          </button>
        </div>

        {/* KYC Information */}
        <Card className="bg-blue-600 border-blue-600 p-4">
          <p className="text-white text-center leading-relaxed">
            You do not need to complete KYC verification, as the buyer is a
            verified merchant on a Fragment that has a security deposit of{" "}
            <span className="inline-flex items-center gap-1">
              <div className="w-3 h-3 bg-white transform rotate-45"></div>
              25,000
            </span>
            .
          </p>
        </Card>

        {/* Trade Info */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold">Trade Info</h2>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-gray-400">Deal Status</p>
              <p className="text-white font-medium">Ready</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400">TON - Username</p>
              <p className="text-white font-medium">Swappable</p>
            </div>

            <div className="space-y-1">
              <p className="text-gray-400">Recipient</p>
              <p className="text-white font-medium text-xs">
                UQCFJEP4WZ_mpdo0_kME...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
}
