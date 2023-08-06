import { store } from '@/store'
import { globalActions } from '@/store/globalSlices'
import { ethers } from 'ethers'
import address from '@/artifacts/contractAddress.json'
import abi from '@/artifacts/contracts/AnswerToEarn.sol/AnswerToEarn.json'
import { QuestionProp } from '@/utils/interfaces'

const { setWallet } = globalActions
const ContractAddress = address.address
const ContractABI = abi.abi

let ethereum: any
let tx: any

if (typeof window !== 'undefined') {
  ethereum = (window as any).ethereum
}

const toWei = (num: number) => ethers.utils.parseEther(num.toString())

// fromWei function to convert wei to ether (1 ether = 10^18 wei)
const fromWei = (num: string) => ethers.utils.formatEther(num)

// getEtheriumContract function to create contract instance from ethers to interact with smart contract
const getEthereumContract = async () => {
  const accounts = await ethereum?.request?.({ method: 'eth_accounts' })
  const provider = accounts?.[0]
    ? new ethers.providers.Web3Provider(ethereum)
    : new ethers.providers.JsonRpcProvider(process.env.NEXT_APP_RPC_URL)
  const wallet = accounts?.[0] ? null : ethers.Wallet.createRandom()
  const signer = provider.getSigner(accounts?.[0] ? undefined : wallet?.address)

  const contract = new ethers.Contract(ContractAddress, ContractABI, signer)
  return contract
}
// connect to wallet and set wallet address to global state (redux)
const connectWallet = async () => {
  try {
    if (!ethereum) return reportError('Please Install MetaMask')
    const accounts = await ethereum.request?.({ method: 'eth_requestAccounts' })
    store.dispatch(setWallet(accounts?.[0]))
  } catch (error) {
    reportError(error)
  }
}

// check wallet address and set wallet address to global state (redux)
const checkWallet = async () => {
  try {
    if (!ethereum) return reportError('Please Install MetaMask')
    const accounts = await ethereum.request?.({ method: 'eth_accounts' }) // retrieve the user's accounts using the eth_accounts method of the ethereum object.

    // sets up event listeners for two Ethereum events: chainChanged and accountsChanged.
    ethereum.on('chainChanged', () => {
      window.location.reload()
    }) // The chainChanged event occurs when the user switches to a different Ethereum network, and in response, the DApp reloads the page to reflect the new network.
    ethereum.on('accountsChanged', async () => {
      store.dispatch(setWallet(accounts?.[0]))
      await checkWallet()
    }) // The accountsChanged event occurs when the user switches accounts within the same Ethereum network. In both cases, the DApp needs to update its state and UI to reflect the changes.

    if (accounts?.length) {
      store.dispatch(setWallet(accounts?.[0])) // set wallet address to global state (redux) if accounts found (wallet connected)
    } else {
      store.dispatch(setWallet('')) // set wallet address to global state (redux) if no accounts found (no wallet connected)
      reportError('Please connect Wallet , no accounts found')
    }
  } catch (error) {
    reportError(error)
  }
}

// get questions from smart contract and return questions to component (react)
const getQuestions = async (): Promise<QuestionProp[]> => {
  try {
    const contract = await getEthereumContract() // Create contract instance from ethers to interact with the smart contract
    const questions: QuestionProp[] = await contract.getQuestions() // Call getQuestions function from the smart contract

    console.log(questions) // Structure questions
    return structureQuestions(questions) // Return questions to component (react)
  } catch (error) {
    // Handle errors gracefully
    console.error('Error fetching questions:', error)
    throw new Error('Failed to fetch questions. Please try again later.')
  }
}

// structure questions

const structureQuestions = (questions: any[]): QuestionProp[] =>
  questions.map((question) => ({
    id: question.id,
    title: question.title,
    description: question.description,
    owner: question.owner,
    winner: question.winner,
    paidout: question.paidout,
    deleted: question.deleted,
    updated: Number(question.updated),
    created: Number(question.created),
    answers: Number(question.answers),
    tags: question.tags.split(',').map((tag: string) => tag.trim()),
    prize: Number(fromWei(question.prize)),
  }))

const reportError = (err: any) => {
  console.log(err)
}

export { connectWallet, checkWallet, getQuestions }