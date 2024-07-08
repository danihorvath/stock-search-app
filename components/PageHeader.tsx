import React from "react";
import Link from "next/link";
import Button from "./Button";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  goBack?: string;
}

const PageHeader = ({ title, subtitle, children, goBack }: PageHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 mb-12 bg-gray-800">
      <div className="container">
        {!!goBack && (
          <Link href={"/"} className="self-start mb-8">
            <Button>Go Back</Button>
          </Link>
        )}

        <div className="text-center mb-8 text-white">
          {!!title && <h1 className="text-4xl font-bold ">{title}</h1>}
          {!!subtitle && <h2 className="text-2xl ">{subtitle}</h2>}
        </div>

        {children}
      </div>
    </div>
  );
};

export default PageHeader;
