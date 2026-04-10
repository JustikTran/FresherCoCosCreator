"use client";
export default function PageLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-200">
            <main>{children}</main>
        </div>
    );
};