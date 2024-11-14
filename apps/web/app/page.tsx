import Title from "@repo/ui/components/ui/title";
import {NavCard} from "~/app/components/navcard";

export default function MainPage() {
  return (
      <div className='p-4 flex flex-col gap-4 items-center'>
          <Title size="large" >KI-AI</Title> 
          <section className='text-center'>
          <p>Kiai is an ai playground</p>
          </section>
          <section className='flex flex-row gap-2 justify-center'>
         <NavCard title='Hugging Face' description='Test different Hugging Face products' href='/hf' />
         <NavCard title='Open AI' description='Open Ai Products' href='/oai' />
          </section>
      </div>
  )
}
