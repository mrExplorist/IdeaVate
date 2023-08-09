import AddQuestion from '@/components/AddQuestion'
import Banner from '@/components/Banner'
import Empty from '@/components/Empty'
import Header from '@/components/Header'
import Questions from '@/components/Questions'
import { getQuestions } from '@/services/blockchain'
import { QuestionProp, RootState } from '@/utils/interfaces'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { globalStates } from '../store/states/globalStates'
import { globalActions } from '@/store/globalSlices'
import { useEffect } from 'react'

export default function Home({ questionsData }: { questionsData: QuestionProp[] }) {
  // console.log(questionsData)
  // getting questions from redux store
  const dispatch = useDispatch()

  const { setQuestions } = globalActions

  const { questions } = useSelector((states: RootState) => states.globalStates)

  // setting questions in redux store
  useEffect(() => {
    dispatch(setQuestions(questionsData))
  }, [dispatch, setQuestions, questionsData])

  return (
    <div>
      <Head>
        <title>IdeaVate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen w-screen pb-20 radial-gradient">
        <Header />
        <Banner questions={questionsData} />
        {questionsData.length > 0 ? <Questions questions={questionsData} /> : <Empty />}
        <AddQuestion />
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const data: QuestionProp[] = await getQuestions()
  return {
    props: { questionsData: JSON.parse(JSON.stringify(data)) },
  }
}
