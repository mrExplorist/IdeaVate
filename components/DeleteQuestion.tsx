import { deleteQuestion } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { QuestionProp, RootState } from '@/utils/interfaces'
import { useRouter } from 'next/router'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { MdDeleteSweep } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const DeleteQuestion: React.FC<{ questionData: QuestionProp | null }> = ({ questionData }) => {
  // Route after deleting question to home page (index)
  const router = useRouter()
  const dispatch = useDispatch()
  const { setDeleteQuestionModal } = globalActions

  const { deleteQuestionModal } = useSelector((states: RootState) => states.globalStates)

  const handleDelete = async () => {
    if (!questionData?.id) return

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        // TODO: add question to blockchain

        deleteQuestion(questionData?.id)
          .then((tx) => {
            console.log(tx)
            resolve(tx)
            router.push('/')
          })
          .catch((err) => {
            alert(JSON.stringify(err))
            console.log(err)
            reject(err)
          })
      }),
      {
        pending: 'Approve transaction...',
        success: 'Idea Deleted successfully ✅!',
        error: 'Encountered error 🤯‼',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${deleteQuestionModal}`}
    >
      <div className="bg-[#16112F] text-[#BBBBBB] shadow-lg shadow-slate-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold" />
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={() => dispatch(setDeleteQuestionModal('scale-0'))}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center rounded-xl my-5 space-y-2">
            <MdDeleteSweep className="text-red-600" size={50} />
            <h4 className="text-[22.65px]">Delete Idea </h4>
            <p className="text-[14px]">Are you sure you want to delete this ?</p>
            <small className="text-xs italic">{questionData?.title}</small>
          </div>

          <div className="flex justify-center items-center space-x-2">
            <button
              className="text-sm border border-blue-600 rounded-full w-[150px] h-[48px] text-white
            right-2 sm:right-10 hover:bg-blue-700 transition-colors duration-300"
              onClick={() => dispatch(setDeleteQuestionModal('scale-0'))}
            >
              Cancel
            </button>
            <button
              className="text-sm border border-red-600 bg-red-600 rounded-full w-[150px] h-[48px] text-white
            right-2 sm:right-10 hover:bg-transparent transition-colors duration-300"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteQuestion
