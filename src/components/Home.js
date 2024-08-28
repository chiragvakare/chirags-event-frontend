import { Card } from "./Card";
import { Banner } from "./Banner";
import { CuratedEvents } from "./CuratedEvents";
import { BringToTable } from "./BringToTable";
import { PrintAndReview } from "./PrintAndReview";
import { GetInTouch } from "./GetInTouch";

export const Home = () => {
   const user = localStorage.getItem('username');

    return <>
      <Banner />
      <CuratedEvents/>
      <BringToTable/>
      <Card/>
      <PrintAndReview/>
      <GetInTouch/>
      
    </>}