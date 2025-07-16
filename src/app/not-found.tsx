"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function NotFount(){
    return(
        <main className="w-full h-[100svh] flex flex-col items-center justify-center bg-white">
            <DotLottieReact src="/lottie/notFound.lottie" loop autoplay />
            <Link href="/" className="text-red-400 bg-blue-500">Home</Link >
        </main>

    );


}