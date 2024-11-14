
  import Title from "@repo/ui/components/ui/title";
  import {NavCard} from "~/app/components/navcard";



export default function PlaytroundPage() {
    return (
        <div className='p-4 flex flex-col gap-4'>
            <Title size="large" >Huggin Face Playground</Title> 
            <section >
                <p>Here you can play around with the Hugging Face API. This is a simple playground to test the API and see the results.</p>
                <p>For more information on the API, please visit the <a href='https://huggingface.co/'>Hugging Face website</a>.</p>
            </section>
            <section className='flex flex-raw gap-2'>
               <NavCard title='Question Answering' description='Answer question uppon a give document' href='/hf/questionanswering' />
               <NavCard title='Question Answering' description='Answer question uppon a give document' href='/hf/questionanswering' />
               <NavCard title='Question Answering' description='Answer question uppon a give document' href='/hf/questionanswering' />
               <NavCard title='Question Answering' description='Answer question uppon a give document' href='/hf/questionanswering' />
            </section>
        </div>
    )
}