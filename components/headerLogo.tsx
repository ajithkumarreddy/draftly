"use client";
import { useTheme } from "next-themes";
import { FileText } from "lucide-react";
import Link from "next/link";

const HeaderLogo = () => {
    const { theme } = useTheme();

    return (
        <Link href="/dashboard" className="header-logo flex flex-row items-center">
            <FileText className="mr-2" color={theme === "light" ? "#000000" : "#ffffff"} />
            <p className="text-xl font-semibold">Draftly</p>
        </Link>
    )
}

export default HeaderLogo;