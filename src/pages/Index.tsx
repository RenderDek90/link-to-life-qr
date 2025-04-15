
import React from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-4">
          Link to Life QR
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Generate QR codes for URLs, text messages, and more. Customize colors and download your QR code in seconds.
        </p>
      </div>
      
      <div className="w-full max-w-lg">
        <QRCodeGenerator />
      </div>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2025 Link to Life QR • Share anything, anywhere</p>
      </footer>
    </div>
  );
};

export default Index;
