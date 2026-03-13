import Capabilities from "@/components/Capabilities";
import CaseStudies from "@/components/CaseStudies";
import NavigationBar from "@/components/NavigationBar";
import OpeningStatement from "@/components/OpeningStatement";
import Research from "@/components/Research";
import Signal from "@/components/Signal";
import Thesis from "@/components/Thesis";

export default function Home() {
  return (
    <>
      <NavigationBar />
      <main>
        <OpeningStatement />
        <Thesis />
        <CaseStudies />
        <Capabilities />
        <Research />
        <Signal />
      </main>
    </>
  );
}
