"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Main from "@/components/layout/main";
import SectionLinCol from "@/components/layout/section-Lin-Col";
import SectionCol from "@/components/layout/section-Col";
//import Image from 'next/image'
//import Link from "next/link";

import TypeRacismList from "./_components/typeList";
import TypeRacismForm from "./_components/typePostForm";


export default function TypeRacismPage() {
  return (
    <>
    <Header></Header>

      <Main>
        <SectionLinCol>
          <TypeRacismList></TypeRacismList>

          <SectionCol>
            <h1>Veja relatos de racismo em diferentes regiões. Juntos, damos visibilidade ao problema e buscamos soluções.</h1>
          </SectionCol>

        </SectionLinCol>



        <SectionLinCol>
          <TypeRacismForm></TypeRacismForm>
        </SectionLinCol>
      </Main>
    
    <Footer></Footer>
    </>
  );
}
