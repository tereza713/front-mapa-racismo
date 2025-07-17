'use client'
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Main from "@/components/layout/main";
import FormularioLogin from "../_components/formsLogin";
import SectionLinCol from "@/components/layout/section-Lin-Col";
//import SectionCol from "@/components/layout/section-Col";
//import Image from 'next/image'
//import Link from "next/link";



export default function CreateCountPage(){
      return (
        <>
        <Header></Header>
            <Main>
                <SectionLinCol>
                    <h1 className="text-2xl font-bold mb-6">Libere seu acesso ao site, faça seu login!</h1>
                    <FormularioLogin></FormularioLogin>
                </SectionLinCol>
            </Main>
    
        <Footer></Footer>
        </>
      );
}