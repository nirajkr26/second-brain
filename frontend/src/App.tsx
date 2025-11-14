import { useState } from "react"
import Button from "./components/Button"
import Card from "./components/Card"
import { CreateContent } from "./components/CreateContent"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"


function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
        <Button text="Share Brain" variant="secondary" startIcon={<ShareIcon />} />
        <Button onClick={()=>setModalOpen(true)} text="Add Content" variant="primary" startIcon={<PlusIcon />} />
      </div>


      <div className="flex gap-4">
        <Card type="twitter" link="https://x.com/akshaymarch7/status/1988866605145608584?s=20" title="chai" />
        <Card type="youtube" link="https://www.youtube.com/watch?v=Z_h3raLiLH0" title="Prashant Kishor" />
        <Card type="youtube" link="https://www.youtube.com/watch?v=uNZwUdfU43Q" title="Prashant Kishor" />
      </div>
      <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

export default App
