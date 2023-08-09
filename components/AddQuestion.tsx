import { globalActions } from '@/store/globalSlices'
import { QuestionParams, RootState } from '@/utils/interfaces'
import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const AddQuestion: React.FC = () => {
  const dispatch = useDispatch()
  const { setAddQuestionModal } = globalActions

  const { addQuestionModal } = useSelector((states: RootState) => states.globalStates)

  const [question, setQuestion] = useState<QuestionParams>({
    title: '',
    description: '',
    prize: null,
    tags: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setQuestion((prev) => ({ ...prev, [name]: value }))
  }

  const closeModal = () => {
    dispatch(setAddQuestionModal('scale-0'))
    setQuestion({
      title: '',
      description: '',
      prize: null,
      tags: '',
    })
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${addQuestionModal}`}
    >
      <div className="bg-[#16112F] text-[#BBBBBB] shadow-lg shadow-pink-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Add idea</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
          </div>
          <form className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5">
            <label className="text-[12px]">Title</label>
            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                name="title"
                onChange={handleChange}
                placeholder="Idea title"
                className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm"
                value={question.title}
                required
              />
            </div>
            <label className="text-[12px]">ETH Price</label>
            <div className="py-4 w-full border border-[#212D4A] rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                name="prize"
                onChange={handleChange}
                type="number"
                min={0.01}
                step={0.01}
                placeholder="ETH e.g 0.02"
                className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm"
                value={question.prize !== null ? question.prize.toString() : ''}
                required
              />
            </div>
            <label className="text-[12px]">Tags</label>
            <div
              className="py-4 w-full border border-[#212D4A] 
              rounded-full flex items-center px-4 mb-3 mt-2"
            >
              <input
                name="tags"
                placeholder="Separate tags with commas, eg. php, css"
                className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm"
              />
            </div>

            <label className="text-[12px]">Idea</label>

            <textarea
              onChange={handleChange}
              placeholder="Drop your idea here"
              className="h-[162px] w-full bg-transparent border border-[#212D4A] rounded-xl py-3 px-3
              focus:outline-none focus:ring-0 resize-none
              placeholder-[#3D3857] text-sm"
              name="description"
              value={question.description}
              required
            />
          </form>

          <button
            className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] text-white
            right-2 sm:right-10 hover:bg-blue-700 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddQuestion
