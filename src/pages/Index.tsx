
import React from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className={`w-full ${isMobile ? 'max-w-full' : 'max-w-3xl'} text-center mb-6`}>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-3">
          Link to Life QR
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto text-sm md:text-base">
          Generate QR codes for URLs, text messages, and contacts. Customize and share instantly.
        </p>
      </div>
      
      <div className="w-full max-w-lg">
        <QRCodeGenerator />
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-xs">
        <p>© 2025 Link to Life QR • Share anything, anywhere</p>
      </footer>
    </div>
  );
};

export default Index;
