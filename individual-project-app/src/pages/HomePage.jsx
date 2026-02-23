import { getState, saveState } from "../scripts/storage"

export default function HomePage() {
  saveState('f1Auth', {isAdmin:false, error:null})//test
  console.log(getState('f1Auth'))//test

  return(
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-5xl font-extrabold mb-4 uppercase tracking-tighter">Welcome</h1>
      <p className="text-lg opacity-80 mb-8 max-w-2xl text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </div>
  )
}