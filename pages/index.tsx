import AddQuestion from '@/components/AddQuestion'
import Banner from '@/components/Banner'
import Empty from '@/components/Empty'
import Header from '@/components/Header'
import Questions from '@/components/Questions'
import { getQuestions } from '@/services/blockchain'
import { QuestionProp } from '@/utils/interfaces'
import Head from 'next/head'

export default function Home({ questions }: { questions: QuestionProp[] }) {
  return (
    <div>
      <Head>
        <title>IdeaVate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen w-screen pb-20 radial-gradient">
        <Header />
        <Banner />
        {questions.length > 0 ? <Questions questions={questions} /> : <Empty />}
        <AddQuestion />
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const data: QuestionProp[] = await getQuestions()
  return {
    props: { questions: JSON.parse(JSON.stringify(data)) },
  }
}
