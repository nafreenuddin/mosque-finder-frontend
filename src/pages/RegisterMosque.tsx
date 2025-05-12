import  { useState } from "react";
import LocationGate from "../components/LocationGate/LocationGate";
import KnowledgeModal from "../components/KnowledgeModal/KnowledgeModal";
// import your actual form when ready
import MosqueForm from "../features/mosque/MosqueForm";

export default function RegisterMosquePage() {
  //const [coords, setCoords]       = useState<{ lat: number; lng: number } | null>(null);
  //const [showKnowledge, setShow] = useState(true);

  const DEV_BYPASS = import.meta.env.VITE_DEV_BYPASS_COORDS === "true";

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    DEV_BYPASS ? { lat: 0, lng: 0 } : null
  );

  const [showKnowledge, setShow] = useState(!DEV_BYPASS);
  
  if (!coords && !DEV_BYPASS) {
  return <LocationGate onReady={(c) => setCoords(c)} />;
}
  
if (showKnowledge && !DEV_BYPASS) {
  return <KnowledgeModal open onClose={() => setShow(false)} />;
}
  // step 1: get coords
  if (!coords) {
    return <LocationGate onReady={(c) => setCoords(c)} />;
  }

  // step 2: show the knowledge modal once
  if (showKnowledge) {
    return <KnowledgeModal open={true} onClose={() => setShow(false)} />;
  }

  // step 3: render the actual form, coords injected
  return <MosqueForm initialCoords={coords} />;
}
