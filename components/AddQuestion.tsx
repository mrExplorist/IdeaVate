import { createQuestion } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { QuestionParams, RootState } from '@/utils/interfaces'
import React, { FormEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Listbox, Transition } from '@headlessui/react'
import { HiSelector } from 'react-icons/hi'

const AddQuestion: React.FC = () => {
  const dispatch = useDispatch()
  const { setAddQuestionModal } = globalActions
  const categories = [
    { id: 1, name: 'Productivity', unavailable: false },
    { id: 2, name: 'Social', unavailable: false },
    { id: 3, name: 'Tech', unavailable: false },
    { id: 4, name: 'Education', unavailable: true },
    { id: 5, name: 'Health', unavailable: false },
    { id: 6, name: 'Tool', unavailable: false },
    { id: 7, name: 'Fun', unavailable: false },
    { id: 8, name: 'Entertainment', unavailable: false },
    { id: 9, name: 'Extension', unavailable: false },
    { id: 10, name: 'Business', unavailable: false },
    { id: 11, name: 'Design', unavailable: false },
    { id: 12, name: 'Others', unavailable: false },
  ]
  const [category, setCategory] = useState(categories[2])
  const { addQuestionModal } = useSelector((states: RootState) => states.globalStates)

  const [question, setQuestion] = useState<QuestionParams>({
    title: '',
    description: '',
    prize: null,
    tags: '',
    category: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (
      !question.title ||
      !question.description ||
      !question.prize ||
      !question.tags ||
      !question.category
    )
      return
    console.log(question)
    await toast.promise(
      new Promise<void>((resolve, reject) => {
        // TODO: add question to blockchain

        createQuestion(question)
          .then((tx) => {
            closeModal()
            console.log(tx)
            resolve(tx)
          })
          .catch((err) => {
            alert(JSON.stringify(err))
            console.log(err)
            reject(err)
          })
      }),
      {
        pending: 'Approve transaction...',
        success: 'Idea added successfully 👌!',
        error: 'Encountered error 🤯‼',
      }
    )
  }

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
      category: '',
    })
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-400 ${addQuestionModal}`}
    >
      <div className="bg-[#16112F] text-[#BBBBBB] shadow-lg shadow-pink-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Add idea</p>
            <button onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5"
          >
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
                min={0.0001}
                step={0.0001}
                placeholder="ETH e.g 0.0002"
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
                value={question.tags}
                onChange={handleChange}
                required
              />
            </div>

            <label className="text-[12px]">Idea</label>

            <textarea
              placeholder="Drop your idea here"
              className="h-[162px] w-full bg-transparent border border-[#212D4A] rounded-xl py-3 px-3
              focus:outline-none focus:ring-0 resize-none
              placeholder-[#3D3857] text-sm"
              name="description"
              onChange={handleChange}
              value={question.description}
              required
            />

            <label className="text-[12px] p-2">Select Category</label>
            <Listbox
              value={category}
              onChange={setCategory}
              as="div"
              className="w-full relative z-10 tracking-wide text-sm "
            >
              <div className="flex justify-between w-full bg-transparent border border-[#212D4A] rounded-xl py-3 px-3 focus:outline-none focus:ring-0">
                <Listbox.Button className="flex items-center space-x-1 text-sm">
                  {category.name}
                </Listbox.Button>
                <HiSelector className="text-[#3D3857]" />
              </div>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Listbox.Options className="absolute max-h-40 overflow-y-auto w-full z-10 mt-2 space-y-1 bg-[#16112F] border border-[#212D4A] rounded-xl shadow-md scrollbar-thin scrollbar-thumb-[#16112F] scrollbar-track-slate-500  ">
                  {categories.map((category) => (
                    <Listbox.Option
                      as="span"
                      key={category.id}
                      value={category}
                      disabled={category.unavailable}
                      className="cursor-pointer"
                    >
                      {({ active, selected }) => (
                        <li
                          className={`pl-3 rounded-md pr-6 py-2 text-white ${
                            active ? 'bg-[#523CAF] text-white shadow-md' : 'text-gray-300'
                          }`}
                        >
                          {selected && <HiSelector className="mr-2 text-white" />}
                          {category.name}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
            <button
              type="submit"
              className="text-sm bg-blue-600 rounded-full w-[150px] h-[48px] text-white
            right-2 sm:right-10 hover:bg-blue-700 transition-colors duration-300 mt-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddQuestion
