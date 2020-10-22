import React from 'react'
import {createStore} from './state'
import {createZone} from '/toasts'
import AppComponent from './components/AppComponent'

// ::TEMP::
import {createToast} from '/toasts'
import {createApi} from './api'

function createApp () {

  createZone('toast-zone')

  const store = createStore()

  // ::TEMP::

  // createToast('toast-zone', {
  //   text: '"Design" moved to trash.',
  //   duration: 9999,
  // })

  const api = createApi(store.dispatch.bind(store))
  const list0 = api.lists.create({title: 'Cooking', isAlive: false})

  api.lists.create({title: 'Design'})
  api.lists.create({title: 'Programming'})
  api.lists.create({title: 'Gamedev'})
  api.lists.create({title: 'Marketing'})

  for (let i=0; i < 100; i++) {
    const id = api.lists.create({isAlive: false, title: 'My Great List'})
    api.lists.update(id, list => ({
      title: list.title + ` ${list.id}`,
    }))
  }

  api.lists.create({isAlive: false, title: 'Making'})
  api.lists.create({isAlive: false, title: 'Outside'})
  api.lists.create({isAlive: false, title: 'Photography'})
  api.lists.create({isAlive: false, title: 'Project: Lathe'})
  api.lists.create({isAlive: false, title: 'Project: Milling Machine'})
  api.lists.create({isAlive: false, title: 'Remember'})
  api.lists.create({isAlive: false, title: 'Thoughts'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'AA Woodworking: New Project/Workshop Ideas Continued'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})
  api.lists.create({isAlive: false, title: 'Woodworking'})

  api.lists.create({title: 'ZZ Last'})

  api.lists.createNote(list0, {text: 'Table saw.', isDone: true})

  api.lists.createNote(list0, {text: 'Drafting table.', isDone: true})
  api.lists.createNote(list0, {text: 'Shelving.', isDone: true})
  api.lists.createNote(list0, {text: 'Precision grinding table.', isDone: true})
  api.lists.createNote(list0, {text: 'Router table.', isDone: true})
  api.lists.createNote(list0, {text: 'Horizontal drill.'})
  api.lists.createNote(list0, {text: '($) Tensioned strop.'})
  api.lists.createNote(list0, {text: 'Stone holder.'})
  api.lists.createNote(list0, {text: '(H) Mochi press.'})
  api.lists.createNote(list0, {text: 'New hand plane.'})
  api.lists.createNote(list0, {text: 'Tortilla press.'})
  api.lists.createNote(list0, {text: 'Drafting table.', isDone: true})
  api.lists.createNote(list0, {text: 'Shelving.', isDone: true})
  api.lists.createNote(list0, {text: 'Precision grinding table.', isDone: true})
  api.lists.createNote(list0, {text: 'Router table.', isDone: true})
  api.lists.createNote(list0, {text: 'Horizontal drill.'})
  api.lists.createNote(list0, {text: '($) Tensioned strop.'})
  api.lists.createNote(list0, {text: 'Stone holder.'})
  api.lists.createNote(list0, {text: '(H) Mochi press.'})
  api.lists.createNote(list0, {text: 'New hand plane.'})
  api.lists.createNote(list0, {text: 'Tortilla press.'})

  api.lists.createNote('16', {text: 'Drafting table.', isDone: true})
  api.lists.createNote('16', {text: 'Shelving.', isDone: true})
  api.lists.createNote('16', {text: 'Precision grinding table.', isDone: true})
  api.lists.createNote('16', {text: 'Router table.', isDone: true})
  api.lists.createNote('16', {text: 'Horizontal drill.'})
  api.lists.createNote('16', {text: '($) Tensioned strop.'})
  api.lists.createNote('16', {text: 'Stone holder.'})
  api.lists.createNote('16', {text: '(H) Mochi press.'})
  api.lists.createNote('16', {text: 'New hand plane.'})
  api.lists.createNote('16', {text: 'Tortilla press.'})
  api.lists.createNote('16', {text: 'Drafting table.', isDone: true})
  api.lists.createNote('16', {text: 'Shelving.', isDone: true})
  api.lists.createNote('16', {text: 'Precision grinding table.', isDone: true})
  api.lists.createNote('16', {text: 'Router table.', isDone: true})
  api.lists.createNote('16', {text: 'Horizontal drill.'})
  api.lists.createNote('16', {text: '($) Tensioned strop.'})
  api.lists.createNote('16', {text: 'Stone holder.'})
  api.lists.createNote('16', {text: '(H) Mochi press.'})
  api.lists.createNote('16', {text: 'New hand plane.'})
  api.lists.createNote('16', {text: 'Tortilla press.'})

  // api.workspace.setActiveList(list0)
  api.workspace.setActiveList('@@TRASH')

  // ::END TEMP::

  window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'ArrowUp') {
      event.preventDefault()
      api.workspace.cyclePrevList()
    } else if (event.ctrlKey && event.key === 'ArrowDown') {
      event.preventDefault()
      api.workspace.cycleNextList()
    }
  })

  return {
    store,
    component: <AppComponent store={store} />
  }

}

export {
  createApp,
}
