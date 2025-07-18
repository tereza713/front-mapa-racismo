'use client'
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Main from "@/components/layout/main";
import SectionLinCol from "@/components/layout/section-Lin-Col";
import SectionCol from "@/components/layout/section-Col";
//import Image from 'next/image'
//import Link from "next/link";
import OccurrenceList from "./components/OccurrenceList";
import OccurrencePostForm from "./components/OccurrencePostForm";

export default function OccurencesPage() {
  return (
    <>
    <Header>
    </Header>
    <Main>

      <SectionCol>
          <h1>Veja relatos de racismo em diferentes regiões. Juntos, damos visibilidade ao problema e buscamos soluções.</h1>
      </SectionCol>

      <SectionLinCol>
        <OccurrenceList></OccurrenceList>
      </SectionLinCol>

      <SectionCol>
          <h1>Relate aqui situações de racismo.</h1> 
          <p>Sua denúncia é fundamental para promover mudanças e conscientização.</p>
      </SectionCol>
      <SectionLinCol>
        <OccurrencePostForm></OccurrencePostForm>
      </SectionLinCol>
    </Main>
    


    <Footer></Footer>
    </>
  );
}
