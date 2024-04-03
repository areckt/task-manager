'use client'

import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const CreateContent = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [completed, setCompleted] = useState(false)
  const [important, setImportant] = useState(false)

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case 'title':
        setTitle(e.target.value)
        break
      case 'description':
        setDescription(e.target.value)
        break
      case 'date':
        setDate(e.target.value)
        break
      case 'completed':
        setCompleted(e.target.checked)
        break
      case 'important':
        setImportant(e.target.checked)
        break
      default:
        break
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const task = {
      title,
      description,
      date,
      completed,
      important,
    }

    try {
      const res = await axios.post('/api/tasks', task)
      if (res.data.err) {
        toast.error(res.data.error)
      }

      toast.success('Task created.')
    } catch (error) {
      toast.error('Something went wrong.')
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={handleChange('title')}
          placeholder="e.g, Watch a video from YouTube"
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          name="description"
          id="description"
          rows={4}
          onChange={handleChange('description')}
          placeholder="e.g, Watch a video about Next.js"
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          value={date}
          type="date"
          name="date"
          id="date"
          onChange={handleChange('date')}
        />
      </div>
      <div className="input-control">
        <label htmlFor="completed">Completed</label>
        <input
          value={completed.toString()}
          type="checkbox"
          name="completed"
          id="completed"
          onChange={handleChange('completed')}
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          value={important.toString()}
          onChange={handleChange('important')}
          type="checkbox"
          name="important"
          id="important"
        />
      </div>
      <div className="submit-btn">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default CreateContent
