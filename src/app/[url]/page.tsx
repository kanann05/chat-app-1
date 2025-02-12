"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "../Login";
import SignUp from "../SignUp";
import Home from '../page';
import {JSX} from 'react'

export default function Page({ params }: { params: Promise<{ url: string }> }) {
    const router = useRouter();
    const [page, setPage] = useState<string | null>(null);

    useEffect(() => {
        params.then((resolvedParams) => {
            const lowercasedPage = resolvedParams.url?.toLowerCase() || null;
            setPage(lowercasedPage);

            
        });
    }, [params, router]);

    const pages: Record<string, JSX.Element> = {

        login: <Login />,
        signup: <SignUp />
    };

    if (page === null) return <p>Loading...</p>; 

    return pages[page] || <Home />;
}
