'use client'
import { createContext, useState, useContext, useEffect } from 'react'
import themes from './themes'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useUser } from '@clerk/nextjs'

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {
  const { user } = useUser()
  const [selectedTheme, setSelectedTheme] = useState(0)
  const [collapsed, setCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [tasks, setTasks] = useState([])
  const theme = themes[selectedTheme]

  const allTasks = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get('/api/tasks')
      if (res.statusText == 'OK') {
        setTasks(res.data)
      } else {
        toast.error("Couldn't load the tasks.")
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const deleteTask = async (id) => {
    setIsLoading(true)
    try {
      const res = await axios.delete(`/api/tasks/${id}`)
      if (res.statusText == 'OK') {
        toast.success('Task deleted')
        setTasks(tasks.filter((t) => t.id !== id))
      } else {
        toast.error('Something went wrong')
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
      setIsLoading(false)
    }
  }

  const completedTasks = tasks.filter((t) => t.isCompleted === true)
  const incompleteTasks = tasks.filter((t) => t.isCompleted === false)
  const importantTasks = tasks.filter((t) => t.isImportant === true)

  useEffect(() => {
    if (user) allTasks()
  }, [user])

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        incompleteTasks,
        importantTasks,
        collapsed,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)
