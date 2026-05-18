import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//pages
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import Footer from './Pages/Footer';
import AboutUs from './Pages/AboutUs';
import Enquire from './Pages/Enquire';
import Contact from './Pages/Contact.js';
import Ourproducts from './Pages/OurProducts/Ourproducts.js';
import Homecards from './Pages/Homecards.js';
import ScrollToTopButton from './Pages/ScrollToTopButton';

import OtherEqpTemp from "./Other Equipments/OtherEqpTemp.js";


//Trade Fairs
import Tradefairs from './Trade Fairs/Tradefairs.js';
import Ifat from './Trade Fairs/ifat.js';
import CompletedTradefair1 from './Trade Fairs/CompletedTradefair1';
import Ecosustain2025 from "./Trade Fairs/ecosustain2025.js"
import Ifat2025 from './Trade Fairs/ifat2025.js';


//Balers
import Baler from './Balers/Baler';
import Tyrescrapbaler from './Balers/Tyre scrap balers/Tyrescrapbaler';
import Plasticbaler from './Balers/Plastic balers/Plasticbaler';
import Pcb from './Balers/Pcb balers/pcb';
import Metalbaler from './Balers/Metal balers/Metalbaler';

import BLT150 from './Balers/Tyre scrap balers/Models/Blt150';
import BLT200 from './Balers/Tyre scrap balers/Models/Blt200';
import BLT250 from './Balers/Tyre scrap balers/Models/Blt250';

import BLP30 from './Balers/Plastic balers/Models/BLP30.js';
import Blp40 from './Balers/Plastic balers/Models/Blp40.js';
import Blp50 from './Balers/Plastic balers/Models/Blp50.js';

import Blc30 from './Balers/Pcb balers/Models/Blc30.js';
import Blc40 from './Balers/Pcb balers/Models/Blc40.js';
import Blc50 from './Balers/Pcb balers/Models/Blc50.js';

import Blm150 from './Balers/Metal balers/Models/Blm150.js';
import Blm200 from './Balers/Metal balers/Models/Blm200.js';
import Blm250 from './Balers/Metal balers/Models/Blm250.js';



//primary shredders
import Shredder from './Primary_Shredders/Shredder';
import Tyreshredder from './Primary_Shredders/Tyre shredders/Tyreshredder';
// import Metalshredder from './Primary_Shredders/Metal shredders/Metalshredder';
import Plasticshredder from './Primary_Shredders/Plastic shredders/Plasticshredder';
import Papershredder from './Primary_Shredders/Pcb shredders/papershredder';
import Ewaste from './Primary_Shredders/E-waste shredders/Ewaste.js';

import Sht6000 from './Primary_Shredders/Tyre shredders/Models/Sht6000.js';
import Sht8000 from './Primary_Shredders/Tyre shredders/Models/Sht8000.js';
import Sht12000 from './Primary_Shredders/Tyre shredders/Models/Sht12000.js';

import Shm4000 from './Primary_Shredders/Metal shredders/Shm4000.js';

import Shp100 from './Primary_Shredders/Plastic shredders/Models/Shp100.js';
import Shp200 from './Primary_Shredders/Plastic shredders/Models/Shp200.js';
import Shp150 from './Primary_Shredders/Plastic shredders/Models/Shp150.js';

import Shc6000 from './Primary_Shredders/Pcb shredders/Models/Shc6000.js';
import Shc12000 from './Primary_Shredders/Pcb shredders/Models/Shc12000.js';
import Shc8000 from './Primary_Shredders/Pcb shredders/Models/Shc8000.js';


//secondary shredders
import SecondaryShredder from './Secondary_Shredders/SecondaryShredder.js';
import SecondaryMetalshredder from './Secondary_Shredders/Metal s_shredder/SecondaryMetalshredder.js';
import SecondaryPlasticShredder from './Secondary_Shredders/Plastic s_shredder/SecondaryPlasticShredder.js';
import SecondaryPcb from './Secondary_Shredders/Pcb s_shredder/SecondaryPcb.js';
import RasperSecondaryshredders from './Secondary_Shredders/Rasper/Rasper_secondaryshredders.js';

import Rst4000 from './Secondary_Shredders/Rasper/models/Rst4000.js';
import Rst6000 from './Secondary_Shredders/Rasper/models/Rst6000.js';


//other eqipments
// import OtherEquipment from './Other Equipments/OtherEquipment';
import TumbleBackFeeder from './Other Equipments/Machines/TumbleBackFeeder';
import Conveyers from './Other Equipments/Machines/Conveyers';
import Vibrators from './Other Equipments/Machines/Vibrators';
import Classifiers from './Other Equipments/Machines/Classifiers';
import MagneticSteelSeparators from './Other Equipments/Machines/MagneticSteelSeparators';
import BeedwireRemover from './Other Equipments/Machines/BeedwireRemover';
import StripCutter from './Other Equipments/Machines/StripCutter';
import BlockCutter from './Other Equipments/Machines/BlockCutter';
import SidewallRemover from './Other Equipments/Machines/SidewallRemover';


import Tyrecutting from './Other Equipments/Machines/Tyrecutting';
import Tyrefolding from './Other Equipments/Machines/Tyrefolding';
import Tcpcr100 from './Other Equipments/Machines/Tcpcr100.js';
import Tcotr100 from './Other Equipments/Machines/Tcotr100.js';
import Tctb100 from './Other Equipments/Machines/Tctb100.js';
import Tftbr100 from './Other Equipments/Machines/Tftbr100.js';
import Tfpcr100 from './Other Equipments/Machines/Tfpcr100.js';



//blogs information of products 
import BalerBlog1 from './Blogs/Baler/BalerBlog1.js';
import BalerBlog2 from './Blogs/Baler/BalerBlog2.js';
import BalerBlog3 from './Blogs/Baler/BalerBlog3.js';
import BalerBlog4 from './Blogs/Baler/BalerBlog4.js';
import ShredderBlog1 from './Blogs/Primary-Shredders/ShredderBlog1.js';
import ShredderBlog2 from './Blogs/Primary-Shredders/ShredderBlog2.js';
import ShredderBlog3 from './Blogs/Primary-Shredders/ShredderBlog3.js';
import ShredderBlog4 from './Blogs/Primary-Shredders/ShredderBlog4.js';
import SecondaryShredderBlog1 from './Blogs/Secondary-Shredders/SecondaryShredderBlog1.js';
import SecondaryShredderBlog2 from './Blogs/Secondary-Shredders/SecondaryShredderBlog2.js';
import SecondaryShredderBlog3 from './Blogs/Secondary-Shredders/SecondaryShredderBlog3.js';
import SecondaryShredderBlog4 from './Blogs/Secondary-Shredders/SecondaryShredderBlog4.js';
import OtherEquipmentBlog1 from './Blogs/OtherEqp/OtherEquipmentBlog1.js';
import OtherEquipmentBlog2 from './Blogs/OtherEqp/OtherEquipmentBlog2.js';
import OtherEquipmentBlog3 from './Blogs/OtherEqp/OtherEquipmentBlog3.js';
import OtherEquipmentBlog4 from './Blogs/OtherEqp/OtherEquipmentBlog4.js';
import BlogLandingPage from './Blogs/BlogLandingPage.js';
import MetalShredderBlog from './Blogs/Primary-Shredders/MetalShredderBlog.js';
import PlasticBalerBlog from './Blogs/Baler/PlasticBalerBlog.js';
import TyreRecyclingBlog from './Blogs/OtherEqp/TyreRecyclingBlog.js';

//propages
import Tyrebalerpage from './Prodpages/Tyrebalerpage.js';
import Plasticbalerpage from './Prodpages/Plasticbalerpage.js';
import Metalbalerpage from './Prodpages/Metalbalerpage.js';
import PCBpage from './Prodpages/pcbpage.js';
import Tyreshredderpage from './Prodpages/Tyreshredderpage.js';
import Plasticshredderpage from './Prodpages/Plasticshredderpage.js';
import Metalshredderpage from './Prodpages/Metalshredderpage.js';
import Crushingmachinepage from './Prodpages/Crushingmachinepage.js';
import PaperCardboardShredderpage from './Prodpages/PaperCardboardShredderpage.js';
import RelatedEquipments from './Other Equipments/Machines/RelatedEquipments.js';
import MSWBlog from './Blogs/Baler/MSWBlog.js';
import DustCollector from './Other Equipments/Machines/DustCollector.js';
import VibroHopper from './Other Equipments/Machines/VibroHopper.js';
import FibreSeparator from './Other Equipments/Machines/FibreSeparator.js';
import SteelCleaning from './Other Equipments/Machines/SteelCleaning.js';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* pages */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/homecards" element={<Homecards />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/enquire" element={<Enquire />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/ourproducts" element={<Ourproducts />} />
        <Route exact path="/other-equipment" element={<OtherEqpTemp />} />


        {/* tradefairs */}
        <Route exact path="/Tradefairs" element={<Tradefairs />} />
        <Route exact path="/ifat" element={<Ifat />} />
        <Route exact path="/completedTradefair1" element={<CompletedTradefair1 />} />
        <Route exact path="/ecosustain2025" element={<Ecosustain2025 />} />
        <Route exact path="/ifat2025" element={<Ifat2025 />} />


        {/*Balers*/}
        <Route exact path="/balers" element={<Baler />} />
        <Route exact path="/tyre-scrap-balers" element={<Tyrescrapbaler />} />
        <Route exact path="/plasticbaler" element={<Plasticbaler />} />
        <Route exact path="/pcb" element={<Pcb />} />
        <Route exact path="/metalbaler" element={<Metalbaler />} />

        <Route exact path="/blt150" element={<BLT150 />} />
        <Route exact path="/blt200" element={<BLT200 />} />
        <Route exact path="/blt250" element={<BLT250 />} />

        <Route exact path="/blp30" element={<BLP30 />} />
        <Route exact path="/blp40" element={<Blp40 />} />
        <Route exact path="/blp50" element={<Blp50 />} />

        <Route exact path="/blc30" element={<Blc30 />} />
        <Route exact path="/blc40" element={<Blc40 />} />
        <Route exact path="/blc50" element={<Blc50 />} />

        <Route exact path="/blm150" element={<Blm150 />} />
        <Route exact path="/blm200" element={<Blm200 />} />
        <Route exact path="/blm250" element={<Blm250 />} />


        {/* Primary_Shredders */}
        <Route exact path="/primary-shredder" element={<Shredder />} />
        <Route exact path="/tyreshredder" element={<Tyreshredder />} />
        {/* <Route exact path="/metalshredder" element={<Metalshredder />} /> */}
        <Route exact path="/plasticshredder" element={<Plasticshredder />} />
        <Route exact path="/papershredder" element={<Papershredder />} />
        <Route exact path="/ewaste" element={<Ewaste />} />

        <Route exact path="/sht6000" element={<Sht6000 />} />
        <Route exact path="/sht8000" element={<Sht8000 />} />
        <Route exact path="/sht12000" element={<Sht12000 />} />

        <Route exact path="/shm4000" element={<Shm4000 />} />

        <Route exact path="/shp100" element={<Shp100 />} />
        <Route exact path="/shp200" element={<Shp200 />} />
        <Route exact path="/shp150" element={<Shp150 />} />

        <Route exact path="/shc6000" element={<Shc6000 />} />
        <Route exact path="/shc8000" element={<Shc8000 />} />
        <Route exact path="/shc12000" element={<Shc12000 />} />


        {/* secondaryshredders */}
        <Route exact path="/secondary-shredder" element={<SecondaryShredder />} />
        <Route exact path="/rasper_secondaryshredders" element={<RasperSecondaryshredders />} />
        <Route path="/secondarymetalshredder" element={<SecondaryMetalshredder />} />
        <Route path="/secondaryplasticshredder" element={<SecondaryPlasticShredder />} />
        <Route path="/secondarypcb" element={<SecondaryPcb />} />

        <Route exact path="/rst4000" element={<Rst4000 />} />
        <Route exact path="/rst6000" element={<Rst6000 />} />



        {/* other eqipments */}
        {/* <Route path="/other-equipment" element={<OtherEquipment />} /> */}
        <Route path="/tumble-back-feeder" element={<TumbleBackFeeder />} />
        <Route path="/feeding-discharge-conveyers" element={<Conveyers />} />
        <Route path="/vibrators" element={<Vibrators />} />
        <Route path="/classifiers" element={<Classifiers />} />
        <Route path="/magnetic-steel-separators" element={<MagneticSteelSeparators />} />
        <Route path="/beedwire-remover" element={<BeedwireRemover />} />
        <Route path="/strip-cutter" element={<StripCutter />} />
        <Route path="/block-cutter" element={<BlockCutter />} />
        <Route path="/sidewall-remover" element={<SidewallRemover />} />
        <Route path="/dust-collector" element={<DustCollector />} />
        <Route path="/vibro-hopper" element={<VibroHopper />} />
        <Route path="/fibre-seperator" element={<FibreSeparator />} />
        <Route path="/steel-cleaning" element={<SteelCleaning/>} />


        <Route exact path="/tyrecutting" element={<Tyrecutting />} />
        <Route exact path="/tyrefolding" element={<Tyrefolding />} />
        <Route exact path="/tfpcr100" element={<Tfpcr100 />} />
        <Route exact path="/tftbr100" element={<Tftbr100 />} />
        <Route exact path="/tcpcr100" element={<Tcpcr100 />} />
        <Route exact path="/tctb100" element={<Tctb100 />} />
        <Route exact path="/tcotr100" element={<Tcotr100 />} />
        <Route exact path="/related-equipment" element={<RelatedEquipments />} />


        {/* blogs pages */}
        <Route exact path="/bloglandingpage" element={<BlogLandingPage />} />
        <Route exact path="/baler-info" element={<BalerBlog1 />} />
        <Route exact path="/plastic-baler-info" element={<PlasticBalerBlog />} />
        <Route exact path="/baler-scrap-management" element={<BalerBlog2 />} />
        <Route exact path="/tyre-balers-machine" element={<BalerBlog3 />} />
        <Route exact path="/baler-for-tyres" element={<BalerBlog4 />} />
        <Route exact path="/primary-shredder-waste-management" element={<ShredderBlog1 />} />
        <Route exact path="/recycling-process-with-shredder-machines" element={<ShredderBlog2 />} />
        <Route exact path="/primary-shredders-for-tyres" element={<ShredderBlog3 />} />
        <Route exact path="/industrial-primary-shredders" element={<ShredderBlog4 />} />
        <Route exact path="/metal-shredders" element={<MetalShredderBlog />} />
        <Route exact path="/industrial-secondary-shredder" element={<SecondaryShredderBlog1 />} />
        <Route exact path="/secondaryshredder-blog2" element={<SecondaryShredderBlog2 />} />
        <Route exact path="/secondaryshredder-blog3" element={<SecondaryShredderBlog3 />} />
        <Route exact path="/secondaryshredder-blog4" element={<SecondaryShredderBlog4 />} />
        <Route exact path="/otherequipment-blog1" element={<OtherEquipmentBlog1 />} />
        <Route exact path="/otherequipment-blog2" element={<OtherEquipmentBlog2 />} />
        <Route exact path="/otherequipment-blog3" element={<OtherEquipmentBlog3 />} />
        <Route exact path="/otherequipment-blog4" element={<OtherEquipmentBlog4 />} />
        <Route exact path="/tyre-recycling-plant-manufacturers" element={<TyreRecyclingBlog />} />
        <Route exact path="/munipical-waste-management" element={<MSWBlog />} />


        {/* propages */}
        <Route exact path="/tyrebalerpage" element={<Tyrebalerpage />} />
        <Route exact path="/plasticbalerpage" element={<Plasticbalerpage />} />
        <Route exact path="/metalbalerpage" element={<Metalbalerpage />} />
        <Route exact path="/pcbpage" element={<PCBpage />} />
        <Route exact path="/tyreshredderpage" element={<Tyreshredderpage />} />
        <Route exact path="/plasticshredderpage" element={<Plasticshredderpage />} />
        <Route exact path="/metalshredderpage" element={<Metalshredderpage />} />
        <Route exact path="/crushingmachinepage" element={<Crushingmachinepage />} />
        <Route exact path="/papercardboardshredderpage" element={<PaperCardboardShredderpage />} />



      </Routes>
      <Footer />
      <ScrollToTopButton />
    </Router>

  );
}

export default App;