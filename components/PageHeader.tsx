import { SearchResult } from "@/types/Search";
import React from "react";
import Link from "next/link";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  goBack?: string;
}

const PageHeader = ({ title, subtitle, children, goBack }: PageHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 mb-12 bg-gray-800">
      {!!goBack && (
        <Link href={"/"} className="self-start mb-8">
          <button className="text-white bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded">
            Go Back
          </button>
        </Link>
      )}

      <div className="text-center mb-8 text-white">
        {!!title && <h1 className="text-4xl font-bold ">{title}</h1>}
        {!!subtitle && <h2 className="text-2xl ">{subtitle}</h2>}
      </div>

      {children}
    </div>
  );
};

export default PageHeader;
